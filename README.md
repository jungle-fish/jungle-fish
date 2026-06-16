# Jungle Fish — Landing Page

Marketing website for Jungle Fish, an eco-sanctuary in Costa Rica combining sustainable tourism, permaculture, aquaculture, and the $JFISH token ecosystem.

Single-page landing site with English/Spanish support, scroll animations, and sections for about, payments, Stronghold integration, volunteering, and contact.

## Tech stack

- **Next.js 16** (App Router)
- **React 19** + **TypeScript**
- **Tailwind CSS 4**
- **Framer Motion**
- **pnpm**

## Getting started

**Requirements:** Node.js 20+, pnpm

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `pnpm dev`     | Start development server |
| `pnpm build`   | Production build         |
| `pnpm start`   | Run production build     |
| `pnpm lint`    | Run ESLint               |

## Project structure

```
app/                    # Next.js app shell (layout, page, globals)
components/
  landing/              # Page sections (Hero, About, JFish, etc.)
  layout/               # Header, Footer, Section, Container
  motion/               # Animations (FadeIn, SectionReveal, …)
  ui/                   # Button, Card, CTA
lib/
  contact.ts            # Email, phone, social URLs
  i18n/                 # EN/ES translations
  volunteer/            # Volunteer form helpers
public/                 # Icons, images, static assets
```

## Landing sections

1. Hero — video background, primary CTAs
2. About — ecosystem overview and experiences
3. Payments — cash, card, USDC, $JFISH
4. $JFISH — Stellar network info and contact
5. Stronghold — payment infrastructure and workshops
6. Visit — contact and location
7. Volunteer — application form (mailto)

## Configuration

**Contact & social links** — edit `lib/contact.ts`.

**Copy (EN/ES)** — edit `lib/i18n/translations/en.ts` and `es.ts`.

**Remote images** — allowed hostnames are listed in `next.config.ts`.

No environment variables are required for the current build.

## Deployment

### Development / preview (Vercel)

1. Push the repository to GitHub.
2. Import the project in [Vercel](https://vercel.com/new).
3. Use defaults: Framework **Next.js**, build command **`pnpm run build`**.
4. Deploy — Vercel provides a preview URL (e.g. `*.vercel.app`).

Preview deployments run automatically on pull requests when connected to GitHub.

### Production (GoDaddy)

Standard GoDaddy shared hosting does not run Next.js server-side out of the box. Options for production:

- **Static export** — add `output: 'export'` to `next.config.ts` and upload the `out/` folder to GoDaddy.
- **VPS / Node hosting** — run `pnpm build` then `pnpm start` on a server with Node.js.
- **DNS only** — host on Vercel (or similar) and point the GoDaddy domain via DNS.

Choose based on whether you need SSR/API routes (this project currently does not).

## License

Private — all rights reserved.
