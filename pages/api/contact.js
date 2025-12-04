import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
  const { name, email, message } = req.body || {};
  if (!email || !message) return res.status(400).json({ error: 'Missing fields' });
  const sgKey = process.env.SENDGRID_API_KEY;
  if (!sgKey) return res.status(500).json({ error: 'Email not configured' });
  await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${sgKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: process.env.ADMIN_EMAIL || process.env.FROM_EMAIL || 'you@example.com' }] }],
      from: { email: process.env.FROM_EMAIL || 'noreply@' + (process.env.SITE_DOMAIN || 'example.com') },
      subject: `Contact form: ${name || 'New message'}`,
      content: [{ type: 'text/plain', value: `From: ${name} <${email}>\n\n${message}` }]
    })
  });
  return res.json({ ok: true });
}
