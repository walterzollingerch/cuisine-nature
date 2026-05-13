import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.query.key !== process.env.NEWSLETTER_ADMIN_KEY) {
    return res.status(401).end();
  }

  const emails = await kv.smembers('subscribers');
  const contacts = await Promise.all((emails || []).map(e => kv.get(`sub:${e}`)));
  const active = contacts.filter(c => c && !c.unsubscribed);

  if (req.query.format === 'csv') {
    const rows = [
      'Vorname,Nachname,E-Mail,Datum',
      ...active.map(c =>
        `"${c.vorname}","${c.nachname}","${c.email}","${new Date(c.createdAt).toLocaleDateString('de-CH')}"`
      ),
    ].join('\n');
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="newsletter-kontakte.csv"');
    return res.send(rows);
  }

  res.json({ contacts: active });
}
