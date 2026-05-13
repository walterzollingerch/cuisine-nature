import { kv } from '@vercel/kv';
import { makeToken, sendEmail } from './_shared.js';

const BASE_URL = 'https://cuisine-nature.vercel.app';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, vorname, nachname } = req.body;
  if (!email || !vorname) return res.status(400).json({ error: 'Pflichtfelder fehlen' });

  const existing = await kv.get(`sub:${email}`);
  if (existing?.confirmed && !existing?.unsubscribed) {
    return res.status(200).json({ success: true });
  }

  await kv.set(`sub:${email}`, { email, vorname, nachname: nachname || '', confirmed: false, createdAt: Date.now() }, { ex: 86400 });

  const token = makeToken(`confirm:${email}`);
  const confirmUrl = `${BASE_URL}/api/newsletter/confirm?email=${encodeURIComponent(email)}&token=${token}&vorname=${encodeURIComponent(vorname)}&nachname=${encodeURIComponent(nachname || '')}`;

  await sendEmail(email, 'Bitte bestätigen Sie Ihre Newsletter-Anmeldung', `
    <p>Liebe/r ${vorname},</p>
    <p>Bitte bestätigen Sie Ihre Anmeldung für den Cuisine Nature AG Newsletter:</p>
    <p><a href="${confirmUrl}" style="display:inline-block;background:#A2CB71;color:#000;padding:12px 28px;text-decoration:none;border-radius:50px;font-family:sans-serif;">Anmeldung bestätigen</a></p>
    <p>Falls Sie sich nicht angemeldet haben, können Sie diese E-Mail ignorieren.</p>
    <br/>
    <p style="font-family:sans-serif;">Mit freundlichen Grüssen<br/>Cuisine Nature AG</p>
  `);

  await sendEmail('zollinger@tomtalent.ch', 'Neue Newsletter-Anmeldung (ausstehend)', `
    <p><strong>${vorname} ${nachname}</strong> (${email}) hat sich angemeldet. Bestätigung ausstehend.</p>
  `);

  res.status(200).json({ success: true });
}
