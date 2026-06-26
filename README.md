# Bowline Federal Technologies — Public Website

Public capability/credibility website for **Bowline Federal Technologies, LLC**.
A static brochure site: no login, no database, no payments. Its job is to present
the firm as a professional, legitimate federal IT services provider to
contracting officers, prime contractors, and teaming partners.

---

## Stack

| Concern   | Choice                                  |
| --------- | --------------------------------------- |
| Framework | [Astro](https://astro.build) (static `output: "static"`) |
| Styling   | Tailwind CSS v4 (via `@tailwindcss/vite`) |
| Fonts     | Self-hosted via `@fontsource` — Space Grotesk, IBM Plex Sans, IBM Plex Mono (no Google Fonts CDN) |
| Forms     | [Web3Forms](https://web3forms.com) (dedicated key — see below) |
| Host      | **Vercel** (static)                     |
| Package manager | npm                               |

Astro ships **zero JavaScript** by default; the only client script is a tiny
inline `IntersectionObserver` for a subtle scroll-reveal (it degrades to fully
visible with JS off or reduced-motion on).

## Local development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs static site to ./dist
npm run preview  # serve the built ./dist locally
```

`npm run build` also fails on TypeScript / Astro errors, so it doubles as a check.

## Deployment — Vercel

Vercel auto-detects Astro. If configuring manually:

- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Install command:** `npm install`

The static output in `dist/` can also be dropped on any static host
(Cloudflare Pages, Netlify, S3+CloudFront) without modification.

### Before you ship: set the production domain

`site` in [`astro.config.mjs`](astro.config.mjs) is set to a placeholder
(`https://www.bowlinefederal.com`). It drives canonical URLs, Open Graph URLs,
the form redirect, and the sitemap. Update it to the real domain, and update the
`Sitemap:` line in [`public/robots.txt`](public/robots.txt) to match.

---

## Entity isolation (read this)

This site must read as the work of an independent firm with **no visible
connection to any other business or individual**. Concretely:

- The codebase shares **no** scaffold, component, color, font, layout, asset,
  analytics property, or form backend with any other site.
- There are **no** references anywhere (markup, comments, meta tags, alt text,
  filenames, commit messages) to any related entity, owner, spouse, family, or
  "sister company." Keep it that way in future edits and commits.
- **Contact backend** is a dedicated Web3Forms account/key, independent of the
  host and of any other entity (see below).
- **Hosting note:** Vercel is fine, but if any related entity also deploys on
  Vercel, keep them strictly separated: a **separate Vercel project**, a
  **separate domain**, and **no shared org-level analytics or environment**. Do
  not place both sites under one shared analytics property. The form backend is
  already independent of the host, which is the part that matters for data.

---

## Populating PENDING fields

Every company fact lives in **one file**:
[`src/config/company.ts`](src/config/company.ts). Nothing is hardcoded in
markup. Fields that are not yet assigned are `null`; the `display()` helper
renders them as **"Available upon request"** (or hides the row), so a visitor
never sees a raw placeholder.

To go live, edit `company.ts` and replace these `null` values with real data:

| Field            | What to set                                                  |
| ---------------- | ------------------------------------------------------------ |
| `uei`            | SAM.gov Unique Entity ID once registered                     |
| `cageCode`       | CAGE code once issued                                        |
| `email`          | The BFT-dedicated mailbox (e.g. `contracts@bowlinefederal.com`) — not shared with any other entity |
| `phone`          | The BFT-dedicated phone line                                 |
| `hubzoneOffice`  | HUBZone-qualifying office address, when finalized            |
| `principal.name` | The principal's name, when you choose to publish it (stays hidden while `null`) |

**Certification statuses** are in the same file (`certifications` array). They
are intentionally honest — SDVOSB / HUBZone / 8(a) / MBE are shown as
**in process**, not awarded. Update each entry's `status` and `statusLabel` as
standings change (`status` accepts `"in-process"`, `"eligible"`, or `"held"`).
The same applies to the `credentials` array (`held: true/false`).

> **Compliance note:** Do not mark a certification `held` until it is actually
> awarded. Misrepresenting certification status on a federal-facing site is a
> real problem, not a cosmetic one.

---

## Wiring the contact form

The contact form ([`src/pages/contact.astro`](src/pages/contact.astro)) posts to
Web3Forms using a **dedicated** access key.

1. Create an account at [web3forms.com](https://web3forms.com) **for Bowline
   Federal only** (use the BFT mailbox as the destination — do not reuse another
   entity's account or key).
2. Copy the access key.
3. Paste it into `web3formsKey` in
   [`src/config/company.ts`](src/config/company.ts), replacing
   `REPLACE_WITH_BFT_WEB3FORMS_ACCESS_KEY`.
4. Rebuild / redeploy.

Until a real key is in place the form returns a `4xx` on submit — expected.
The form includes a hidden honeypot (`botcheck`) and redirects to `/thank-you`
on success.

### Future: Unified Ops rollup (not built here)

There is a clearly-commented `TODO` in `contact.astro`. Web3Forms retains every
submission in its own dashboard/API, so a **separate** future job can read the
submission **count** (a single integer, no PII) and report it as a Unified Ops
rollup metric. No UO integration exists in this static site, and **no submitter
PII should ever be forwarded to UO** — count only.

---

## Project structure

```
bowline-federal/
├── astro.config.mjs          # site URL, static output, sitemap, tailwind
├── tsconfig.json
├── DESIGN.md                 # design system (palette, type, components, bans)
├── public/
│   ├── robots.txt
│   ├── favicon.svg
│   └── og-default.svg        # Open Graph image (navy, branded, no people)
└── src/
    ├── config/company.ts     # SINGLE SOURCE OF TRUTH — all company facts
    ├── styles/global.css      # Tailwind v4 @theme tokens + base styles
    ├── layouts/BaseLayout.astro   # head/meta/OG/JSON-LD + chrome
    ├── components/            # Header, Footer, Cta, SectionHeading,
    │                          #   CertificationStack, CompetencyCard,
    │                          #   NetworkMotif, Wordmark
    └── pages/                 # index, capabilities, differentiators,
                               #   principal, corporate-data, contact,
                               #   thank-you, 404
```

## Content honesty (by design)

- No fabricated clients, dollar figures, contract numbers, or past performance.
- No invented metrics (uptime %, response times, etc.).
- The Principal page states plainly that BFT is a new entity and that past
  performance reflects the principal's individual experience.
- Set-aside certifications are presented as in-application, never as awarded.
