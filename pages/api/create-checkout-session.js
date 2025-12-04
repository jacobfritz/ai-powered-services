import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({error:'Method not allowed'});
  try {
    const { items, customer_email, briefs } = req.body;
    if (!items || !items.length) return res.status(400).json({ error: 'No items' });
    const line_items = items.map(i => ({ price: i.price, quantity: i.quantity }));
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      customer_email,
      metadata: { briefs: JSON.stringify(briefs || {}) },
      success_url: `${process.env.SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.SITE_URL}/canceled`
    });
    return res.json({ sessionId: session.id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
