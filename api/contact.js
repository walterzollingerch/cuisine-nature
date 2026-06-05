import { sendEmail } from './newsletter/_shared.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, email, telefon, anlass, personen, datum, budget, nachricht } = req.body;
  if (!name || !email || !anlass || !personen || !datum) return res.status(400).json({ error: 'Pflichtfelder fehlen' });

  const empfaenger = 'events@cuisinenature.ch';

  // E-Mail an Cuisine Nature
  await sendEmail(empfaenger, `Neue Anfrage (${anlass}) von ${name}`, `
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>E-Mail:</strong> ${email}</p>
    ${telefon ? `<p><strong>Telefon:</strong> ${telefon}</p>` : ''}
    <p><strong>Anlass:</strong> ${anlass}</p>
    <p><strong>Anzahl Personen:</strong> ${personen}</p>
    <p><strong>Wunschdatum:</strong> ${datum}</p>
    ${budget ? `<p><strong>Budgetrahmen:</strong> ${budget}</p>` : ''}
    ${nachricht ? `<p><strong>Nachricht:</strong><br/>${nachricht.replace(/\n/g, '<br/>')}</p>` : ''}
  `);

  // Bestätigung an Anfragesteller
  await sendEmail(email, 'Ihre Anfrage bei Cuisine Nature AG', `
    <p>Guten Tag ${name}</p>
    <p>Vielen Dank für Ihre Anfrage. Wir haben Ihre Nachricht erhalten und melden uns in Kürze bei Ihnen.</p>
    <br/>
    <p style="color:#666;font-size:0.9em;">
      <strong>Ihre Angaben:</strong><br/>
      Anlass: ${anlass}<br/>
      Anzahl Personen: ${personen}<br/>
      Wunschdatum: ${datum}<br/>
      ${budget ? `Budgetrahmen: ${budget}<br/>` : ''}
      ${nachricht ? `Nachricht: ${nachricht.replace(/\n/g, '<br/>')}` : ''}
    </p>
    <br/>
    <p>Mit freundlichen Grüssen<br/>Cuisine Nature AG<br/>Seestrasse 513, 8038 Zürich</p>
  `);

  res.status(200).json({ success: true });
}
