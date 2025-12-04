import Stripe from 'stripe';
import fetch from 'node-fetch';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function generateDeliverable(orderId, briefs) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('Missing OPENAI_API_KEY');
  const results = {};
  for (const [serviceId, brief] of Object.entries(briefs || {})) {
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'system', content: 'You are an assistant that creates deliverables based on briefs.' }, { role: 'user', content: brief }],
        max_tokens: 800
      })
    });
    const data = await resp.json();
    const text = data?.choices?.[0]?.message?.content || JSON.stringify(data);
    results[serviceId] = { type: 'text', content: text };
  }
  return results;
}

async function sendEmail(to, subject, text) {
  const sgKey = process.env.SENDGRID_API_KEY;
  if (!sgKey) throw new Error('Missing SENDGRID_API_KEY');
  await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${sgKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: process.env.FROM_EMAIL || 'noreply@' + (process.env.SITE_DOMAIN || 'example.com') },
      subject,
      content: [{ type: 'text/plain', value: text }]
    })
  });
}

export const config = { api: { bodyParser: false } };

async function buffer(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event;
  try {
    const raw = await buffer(req);
    event = stripe.webhooks.constructEvent(raw, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const briefsMeta = session.metadata?.briefs;
    let briefs = {};
    try { briefs = JSON.parse(briefsMeta || '{}'); } catch(e){ briefs = {}; }

    try {
      const results = await generateDeliverable(session.id, briefs);
      const to = session.customer_email;
      let bodyText = `Thank you for your order! Delivered items:\n\n`;
      for (const [k,v] of Object.entries(results)) {
        bodyText += `Service: ${k}\n`;
        if (v.type === 'text') bodyText += v.content + '\n\n';
        else bodyText += JSON.stringify(v) + '\n\n';
      }
      await sendEmail(to, 'Your AI-Powered Services Deliverables', bodyText);
    } catch (e) {
      console.error('AI generation or email failed:', e);
      try { await sendEmail(process.env.ADMIN_EMAIL || process.env.FROM_EMAIL, 'AI Generation Failure', `Order ${session.id} failed: ${e.message}`); } catch(err){ console.error('Admin email failed', err); }
    }
  }

  res.json({ received: true });
}
