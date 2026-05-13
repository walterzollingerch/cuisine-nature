import crypto from 'crypto';

const BASE_URL = 'https://cuisine-nature.vercel.app';

export function makeToken(input) {
  return crypto.createHmac('sha256', process.env.NEWSLETTER_SECRET).update(input).digest('hex');
}

export function unsubUrl(email) {
  const token = makeToken(`unsub:${email}`);
  return `${BASE_URL}/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}&token=${token}`;
}

export async function sendEmail(to, subject, html) {
  return fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Cuisine Nature AG <newsletter@tomtalent.ch>',
      to,
      subject,
      html,
    }),
  });
}
