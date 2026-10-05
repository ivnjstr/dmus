This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Contact form email

The Contact popup emails each inquiry to the client's mailbox (GoDaddy Professional Email powered by Titan) from a Server Action, `components/contact-modal/send-inquiry.ts`. It needs these environment variables. Set them in Vercel (Production), and for local testing in `.env.local`, which is git-ignored. Never commit them.

| Variable | Value |
| --- | --- |
| `SMTP_HOST` | `smtpout.secureserver.net` |
| `SMTP_PORT` | `465` (SSL) |
| `SMTP_USER` | The sending mailbox's full address, e.g. `hello@marketingwithdmus.com` |
| `SMTP_PASSWORD` | That mailbox's password (secret) |
| `CONTACT_TO_EMAIL` | The address inquiries are delivered to |

None of them starts with `NEXT_PUBLIC_`, so they stay on the server. If any is missing, the form shows an error instead of pretending to send.

## Maintenance mode (temporary)

While `MAINTENANCE_MODE` is `true`, `proxy.ts` shows the "We'll be back soon" page (`app/maintenance/page.tsx`) at every page address, with HTTP 503, `Retry-After: 3600` and `X-Robots-Tag: noindex, nofollow`. Assets and the Contact popup keep working. Any other value, or no value, leaves the site exactly as normal.

| Variable | Value |
| --- | --- |
| `MAINTENANCE_MODE` | `true` turns it on; anything else turns it off |
| `MAINTENANCE_BYPASS_SECRET` | Optional, a long random string. Open any URL with `?preview=<secret>` to see the real site (a 30-day cookie); `?preview=off` to see the maintenance page again |

On Vercel, change the variables in Settings → Environment Variables (Production), then redeploy. To remove the feature completely, delete `proxy.ts`, `app/maintenance/` and the two variables.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
