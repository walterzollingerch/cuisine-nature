import { kv } from '@vercel/kv';
import { makeToken, sendEmail } from './_shared.js';

export default async function handler(req, res) {
  const { email, token } = req.query;

  if (!email || !token || token !== makeToken(`unsub:${email}`)) {
    return res.redirect('/');
  }

  const existing = await kv.get(`sub:${email}`);
  if (existing) {
    await kv.set(`sub:${email}`, { ...existing, unsubscribed: true, unsubscribedAt: Date.now() });
  }
  await kv.srem('subscribers', email);

  await sendEmail(email, 'Newsletter-Abmeldung bestätigt', `
    <p>Sie wurden erfolgreich vom Cuisine Nature AG Newsletter abgemeldet.</p>
    <p style="font-family:sans-serif;color:#666;">Auf Wiedersehen und herzliche Grüsse<br/>Cuisine Nature AG</p>
  `);

  await sendEmail('zollinger@tomtalent.ch', 'Newsletter-Abmeldung', `
    <p><strong>${email}</strong> hat sich vom Newsletter abgemeldet.</p>
  `);

  res.redirect('/newsletter-abgemeldet/');
}
