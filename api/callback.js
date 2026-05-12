export default async function handler(req, res) {
  const { code } = req.query;

  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      client_id: process.env.OAUTH_CLIENT_ID,
      client_secret: process.env.OAUTH_CLIENT_SECRET,
      code,
    }),
  });

  const data = await tokenRes.json();

  if (data.error || !data.access_token) {
    res.setHeader('Content-Type', 'text/html');
    return res.send('<script>window.opener.postMessage("authorization:github:error","*");window.close();</script>');
  }

  const payload = JSON.stringify({ token: data.access_token, provider: 'github' });

  res.setHeader('Content-Type', 'text/html');
  res.send(
    '<script>' +
    '(function(){' +
    'function done(e){' +
    'window.opener.postMessage("authorization:github:success:' + payload.replace(/"/g, '\\"') + '",e.origin);' +
    'window.removeEventListener("message",done);}' +
    'window.addEventListener("message",done);' +
    'window.opener.postMessage("authorizing:github","*");' +
    '})();' +
    '</script>'
  );
}
