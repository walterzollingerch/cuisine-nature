import { kv } from '@vercel/kv';
import { makeToken, sendEmail, unsubUrl } from './_shared.js';

export default async function handler(req, res) {
  const { email, token, vorname, nachname } = req.query;

  if (!email || !token || token !== makeToken(`confirm:${email}`)) {
    return res.redirect('/');
  }

  const data = { email, vorname: vorname || '', nachname: nachname || '', confirmed: true, unsubscribed: false, createdAt: Date.now() };
  await kv.set(`sub:${email}`, data);
  await kv.sadd('subscribers', email);

  await sendEmail(email, 'Willkommen beim Cuisine Nature AG Newsletter', `
    <p>Liebe/r ${vorname},</p>
    <p>Ihre Anmeldung ist bestätigt. Wir freuen uns, Sie über Neuigkeiten zu informieren.</p>
    <br/>
    <p style="font-family:sans-serif;">Mit freundlichen Grüssen<br/>Cuisine Nature AG</p>
    <hr style="border:none;border-top:1px solid #eee;margin:24px 0;"/>
    <p style="font-size:11px;color:#999;font-family:sans-serif;"><a href="${unsubUrl(email)}" style="color:#999;">Newsletter abbestellen</a></p>
  `);

  await sendEmail('zollinger@tomtalent.ch', 'Newsletter-Anmeldung bestätigt', `
    <p><strong>${vorname} ${nachname}</strong> (${email}) hat die Newsletter-Anmeldung bestätigt.</p>
  `);

  res.redirect('/newsletter-bestaetigt/');
}
