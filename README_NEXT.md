AI-Powered Services — Next.js + Vercel (Fully Automated)

This project is prepared for Vercel. It includes:
- Frontend (Next.js pages)
- API routes for Stripe checkout, webhook (AI generation), contact form, health

Required environment variables (set these in Vercel project settings):
- SITE_URL: https://yourdomain.com
- SITE_DOMAIN: yourdomain.com
- FROM_EMAIL: noreply@yourdomain.com
- ADMIN_EMAIL: your admin email
- STRIPE_SECRET_KEY: sk_test or sk_live
- STRIPE_WEBHOOK_SECRET: (from Stripe Dashboard)
- SENDGRID_API_KEY: (or modify contact/webhook to use another provider)
- OPENAI_API_KEY: (or other AI provider key)
- GA_MEASUREMENT_ID: (optional)

Deployment steps:
1) Create a new project on Vercel (https://vercel.com/new) and upload this folder.
2) Add the environment variables above.
3) Deploy.
4) In Stripe Dashboard -> Webhooks, add endpoint: https://<YOUR_SITE>/api/webhook and copy signing secret to STRIPE_WEBHOOK_SECRET.
5) Test checkout in Stripe test mode and verify emails are delivered.

Security notes:
- Keep all keys secret.
- Webhook code triggers AI generation synchronously; for production consider offloading to a job queue to avoid timeouts/cost spikes.

