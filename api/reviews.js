const { createClient } = require('redis');

// Soft filter — masks only the worst words (keeps first letter).
const BAD = ['fuck', 'fucking', 'shit', 'cunt', 'bitch', 'whore', 'slut',
  'nigger', 'faggot', 'asshole', 'motherfucker', 'retard', 'dick', 'pussy'];
function soft(s) {
  let o = String(s);
  BAD.forEach((w) => {
    o = o.replace(new RegExp('\\b' + w + '\\b', 'gi'),
      (m) => m[0] + '*'.repeat(Math.max(1, m.length - 1)));
  });
  return o;
}

const KEY = 'reviews';
const MAX = 60;
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
      if (!configured) return res.status(200).json({ reviews: [], stored: false });
      const client = await getRedis();
      const raw = await client.lRange(KEY, 0, MAX - 1);
      const reviews = (raw || [])
        .map((x) => { try { return JSON.parse(x); } catch (_) { return null; } })
        .filter(Boolean);
      return res.status(200).json({ reviews, stored: true });
    }

    if (req.method === 'POST') {
      let b = req.body;
      if (typeof b === 'string') { try { b = JSON.parse(b); } catch (_) { b = {}; } }
      b = b || {};
      const name = String(b.name || '').trim().slice(0, 40);
      const text = String(b.text || '').trim().slice(0, 400);
      let rating = parseInt(b.rating, 10);
      if (!(rating >= 1 && rating <= 5)) rating = 5;
      if (name.length < 2 || text.length < 3) {
        return res.status(400).json({ ok: false, error: 'invalid' });
      }
      const review = {
        name: soft(name), text: soft(text), rating,
        date: new Date().toISOString().slice(0, 10),
      };
      if (!configured) return res.status(200).json({ ok: true, stored: false, review });
      const client = await getRedis();
      await client.lPush(KEY, JSON.stringify(review));
      await client.lTrim(KEY, 0, MAX - 1);
      return res.status(200).json({ ok: true, stored: true, review });
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  } catch (err) {
    console.error('Reviews API Error:', err);
    return res.status(200).json({ ok: true, stored: false, degraded: true });
  }
};
