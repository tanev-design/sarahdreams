// api/reviews.js — Shared guest reviews for SarahDream.
//
// Same dependency-free Vercel KV / Upstash REST pattern as slots.js.
// Reviews live in a Redis LIST `reviews` (newest first), each a JSON string
// { name, text, rating, date }. Capped to the latest 60. Degrades gracefully
// when no store is connected (returns empty list / stored:false).

const KV_URL =
  process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '';
const KV_TOKEN =
  process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '';

const KEY = 'reviews';
const MAX = 60;

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

async function kv(command) {
  const r = await fetch(KV_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${KV_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(command),
  });
  if (!r.ok) throw new Error('KV ' + r.status);
  return (await r.json()).result;
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Type', 'application/json');
  const configured = Boolean(KV_URL && KV_TOKEN);

  try {
    if (req.method === 'GET') {
      if (!configured) return res.status(200).json({ reviews: [], stored: false });
      const raw = (await kv(['LRANGE', KEY, '0', String(MAX - 1)])) || [];
      const reviews = raw
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
      await kv(['LPUSH', KEY, JSON.stringify(review)]);
      await kv(['LTRIM', KEY, '0', String(MAX - 1)]);
      return res.status(200).json({ ok: true, stored: true, review });
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  } catch (err) {
    return res.status(200).json({ ok: true, stored: false, degraded: true });
  }
};
