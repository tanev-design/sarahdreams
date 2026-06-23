// api/slots.js — Shared appointment availability for SarahDream.
//
// Stores booked slots in Vercel KV / Upstash Redis through its REST API.
// Dependency-free on purpose: it uses the global `fetch` (Node 18+ on Vercel)
// and the REST env vars that Vercel injects automatically when you connect a
// KV / Upstash Redis store to the project. Because package*.json is gitignored,
// we must NOT rely on any npm package here.
//
// Data model: a single Redis SET named "bookings" whose members are
// "YYYY-MM-DD HH:MM" strings. SADD is atomic + idempotent, so concurrent
// bookings can never clobber each other.
//
// Graceful degradation: if no store is connected yet (env vars missing) or the
// store errors, GET returns an empty map and POST reports stored:false — the
// website keeps working (email notification + per-device memory) until KV is on.

const KV_URL =
  process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '';
const KV_TOKEN =
  process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '';

const BOOKINGS_KEY = 'bookings';
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^([01]\d|2[0-3]):00$/; // whole-hour slots 00:00–23:00

async function kv(command) {
  // command e.g. ["SMEMBERS","bookings"] or ["SADD","bookings","2026-06-20 20:00"]
  const r = await fetch(KV_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${KV_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
  });
  if (!r.ok) throw new Error('KV ' + r.status);
  const data = await r.json();
  return data.result;
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Type', 'application/json');

  const configured = Boolean(KV_URL && KV_TOKEN);

  try {
    if (req.method === 'GET') {
      if (!configured) return res.status(200).json({ slots: {}, stored: false });
      const members = (await kv(['SMEMBERS', BOOKINGS_KEY])) || [];
      const slots = {};
      for (const m of members) {
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

      // Reject dates outside a sane window to limit griefing.
      const day = new Date(date + 'T00:00:00');
      const min = new Date(); min.setHours(0, 0, 0, 0); min.setDate(min.getDate() - 1);
      const max = new Date(); max.setHours(0, 0, 0, 0); max.setDate(max.getDate() + 730);
      if (isNaN(day.getTime()) || day < min || day > max) {
        return res.status(400).json({ ok: false, error: 'out_of_range' });
      }

      if (!configured) return res.status(200).json({ ok: true, stored: false });

      await kv(['SADD', BOOKINGS_KEY, date + ' ' + time]);
      const members = (await kv(['SMEMBERS', BOOKINGS_KEY])) || [];
      const times = members
        .filter((m) => String(m).startsWith(date + ' '))
        .map((m) => String(m).split(' ')[1]);
      return res.status(200).json({ ok: true, stored: true, date, times });
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  } catch (err) {
    // Never block a booking because the store hiccupped.
    return res.status(200).json({ ok: true, stored: false, degraded: true });
  }
};
