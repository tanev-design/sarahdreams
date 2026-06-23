const { createClient } = require('redis');

const BOOKINGS_KEY = 'bookings';
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^([01]\d|2[0-3]):00$/;

const configured = Boolean(process.env.REDIS_URL);
let redisClient = null;

async function getRedis() {
  if (!configured) return null;
  if (!redisClient) {
    redisClient = createClient({ url: process.env.REDIS_URL });
    redisClient.on('error', err => console.error('Redis Client Error', err));
    await redisClient.connect();
  }
  return redisClient;
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Type', 'application/json');

  try {
    if (req.method === 'GET') {
      if (!configured) return res.status(200).json({ slots: {}, stored: false });
      const client = await getRedis();
      const members = await client.sMembers(BOOKINGS_KEY);
      const slots = {};
      for (const m of (members || [])) {
        const parts = String(m).split(' ');
        if (parts.length !== 2) continue;
        const [d, t] = parts;
        if (!DATE_RE.test(d) || !TIME_RE.test(t)) continue;
        (slots[d] = slots[d] || []).push(t);
      }
      return res.status(200).json({ slots, stored: true });
    }

    if (req.method === 'POST') {
      let body = req.body;
      if (typeof body === 'string') {
        try { body = JSON.parse(body); } catch (_) { body = {}; }
      }
      body = body || {};
      const date = String(body.date || '').trim();
      const time = String(body.time || '').trim();

      if (!DATE_RE.test(date) || !TIME_RE.test(time)) {
        return res.status(400).json({ ok: false, error: 'bad_slot' });
      }

      const day = new Date(date + 'T00:00:00');
      const min = new Date(); min.setHours(0, 0, 0, 0); min.setDate(min.getDate() - 1);
      const max = new Date(); max.setHours(0, 0, 0, 0); max.setDate(max.getDate() + 730);
      if (isNaN(day.getTime()) || day < min || day > max) {
        return res.status(400).json({ ok: false, error: 'out_of_range' });
      }

      if (!configured) return res.status(200).json({ ok: true, stored: false });

      const client = await getRedis();
      await client.sAdd(BOOKINGS_KEY, date + ' ' + time);
      const members = await client.sMembers(BOOKINGS_KEY);
      const times = (members || [])
        .filter((m) => String(m).startsWith(date + ' '))
        .map((m) => String(m).split(' ')[1]);
      return res.status(200).json({ ok: true, stored: true, date, times });
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  } catch (err) {
    console.error('Slots API Error:', err);
    return res.status(200).json({ ok: true, stored: false, degraded: true });
  }
};
