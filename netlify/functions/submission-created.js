exports.handler = async (event) => {
  const payload = JSON.parse(event.body).payload;
  const { email, vorname, nachname } = payload.data;

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) return { statusCode: 200 };

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Cuisine Nature <onboarding@resend.dev>',
      to: email,
      subject: 'Willkommen beim Cuisine Nature Newsletter',
      html: `
        <p>Liebe/r ${vorname} ${nachname}</p>
        <p>Sie haben sich erfolgreich für unseren Newsletter angemeldet. Wir freuen uns, Sie bald über Neuigkeiten von Cuisine Nature zu informieren.</p>
        <br/>
        <p>Mit freundlichen Grüssen<br/>Veronica & René<br/>Cuisine Nature</p>
      `,
    }),
  });

  return { statusCode: 200 };
};
