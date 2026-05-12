export default function handler(req, res) {
  const { host } = req.headers;
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const redirect_uri = `${protocol}://${host}/api/callback`;
  const url = `https://github.com/login/oauth/authorize?client_id=${process.env.OAUTH_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=repo,user`;
  res.redirect(url);
}
