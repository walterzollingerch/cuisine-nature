import { sendEmail } from './newsletter/_shared.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, email, telefon, anlass, nachricht } = req.body;
  if (!name || !email || !nachricht) return res.status(400).json({ error: 'Pflichtfelder fehlen' });

  // E-Mail an Cuisine Nature
  await sendEmail('zollinger@tomtalent.ch', `Neue Anfrage von ${name}`, `
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>E-Mail:</strong> ${email}</p>
    ${telefon ? `<p><strong>Telefon:</strong> ${telefon}</p>` : ''}
    ${anlass ? `<p><strong>Anlass:</strong> ${anlass}</p>` : ''}
    <p><strong>Nachricht:</strong><br/>${nachricht.replace(/\n/g, '<br/>')}</p>
  `);

  // Bestätigung an Anfragesteller
  await sendEmail(email, 'Ihre Anfrage bei Cuisine Nature AG', `
    <p>Guten Tag ${name}</p>
    <p>Vielen Dank für Ihre Anfrage. Wir haben Ihre Nachricht erhalten und melden uns in Kürze bei Ihnen.</p>
    <br/>
    <p style="color:#666;font-size:0.9em;"><strong>Ihre Nachricht:</strong><br/>${nachricht.replace(/\n/g, '<br/>')}</p>
    <br/>
    <p>Mit freundlichen Grüssen<br/>Cuisine Nature AG<br/>Seestrasse 513, 8038 Zürich</p>
  `);

  res.status(200).json({ success: true });
}
