# Aspire — Agency Website

Marketing site for Aspire Agency Marketing (Barcelona). Multi-page, prerendered
for search, built on the brand's own monochrome identity with a single deep-teal
accent.

> Standalone project. Independent of `rck-web` and the older
> `aspire-agency-web-new` — its own dependencies, ports and build.

## Stack

- [Vite](https://vitejs.dev/) + [React 18](https://react.dev/)
- Plain CSS with design tokens (`src/index.css`) + component styles (`src/styles/site.css`)
- No UI framework, no router library — a ~60-line History-API router (`src/hooks/useRoute.js`)
- Post-build prerender to real static HTML per route (`scripts/prerender.mjs`)

## Develop

```bash
npm install      # first time only
npm run dev      # dev server  → http://localhost:5190
npm run build    # production build → dist/ (includes prerender)
npm run build:spa # build without the prerender step
npm run preview  # preview the production build → http://localhost:4190
```

## Brand

The identity comes from the "Aspire." wordmark: a high-contrast Didone serif,
black on white. The site follows it — monochrome, editorial — and spends colour
only where it has to work.

The accent lives in one block at the top of `src/index.css` (seven variables,
including `--accent-rgb` for the translucent hero glows). Nothing else in the
codebase hardcodes it, so changing the accent is a single edit.

| Token | Value | Use |
|-------|-------|-----|
| `--ink` | `#0E0E10` | text, dark sections, the wordmark |
| `--page` | `#FFFFFF` | page background |
| `--page-alt` | `#F4F3F1` | alternating sections, form panel |
| `--accent` | `#0D5C6B` | CTA fills, the logo's period, rules, hover |
| `--accent-600` | `#0A4A57` | teal **on white** — 9.9:1, well past AA for text/links |
| `--muted` | `#6E6E6E` | secondary text, eyebrow labels |

**Type.** Headings are [Inter Tight](https://fonts.google.com/specimen/Inter+Tight)
and body text is Inter — one superfamily, so the site loads a single type system
and nothing clashes. A high-contrast Didone was tried first and dropped: it went
wispy below ~28px, exactly where card and step titles sit.

Swapping the display face is four variables (`--display`, `--display-w`,
`--display-w-light`, `--display-ls`) in `src/index.css` plus the Google Fonts
link in `index.html`. Nothing else hardcodes a heading weight or tracking.

The wordmark itself is set as live text (`src/components/Logo.jsx`), not an
image, so it stays crisp at any size and inverts cleanly on dark. It keeps the
Didone via its own `--wordmark` token, deliberately independent of `--display`:
it is the logo, so it should not change when the heading font does. The original
PNG is kept at `public/brand/aspire-wordmark.png`.

## Structure

```
index.html              meta, fonts, JSON-LD, Netlify form declaration
scripts/prerender.mjs   post-build static HTML + sitemap.xml
src/
├── main.jsx            entry
├── App.jsx             route table + redirects
├── config.js           contact details, form endpoint, booking URL, socials
├── index.css           design tokens + base
├── styles/site.css     all component + section styles
├── data/site.js        ← all content: services, cases, stats, FAQ, testimonials
├── hooks/              useRoute, useReveal, useCountUp, useSeo, useJsonLd
├── components/         Nav, Footer, LeadForm, CaseCard, Faq, CTABand, …
└── pages/              Home, Services, ServiceDetail, Work, About, Contact, Legal, NotFound
```

### Adding or editing content

Almost everything lives in **`src/data/site.js`**. Adding a service there gives
you its page, its nav dropdown entry, its footer link, its sitemap entry and its
prerendered HTML — the only other edit is one line in the `ROUTES` table in
`src/App.jsx`.

## Routes

| Path | Page |
|------|------|
| `/` | Home |
| `/services` | Services index |
| `/services/sales` | In-Person & Digital Sales |
| `/services/business-development` | Business Development |
| `/services/social-media` | Social Media Management |
| `/services/content-creation` | Content Creation |
| `/real-estate` | Real estate and yachting content |
| `/ai-systems` | Custom AI dashboards and integrations |
| `/work` | Client cases |
| `/about` | About Aspire and the team |
| `/contact` | Book a discovery call |
| `/privacy`, `/terms`, `/cookies` | Legal |

Old and likely-guessed URLs (`/our-work`, `/about-us`, `/get-started`,
`/realestate`, `/yachting`, `/ai`, `/cookie-policy`, …) redirect to their
canonical page in `App.jsx`, so nothing already linked or indexed 404s.

### Photos and video

`/real-estate` is built around media that does not exist yet. Every frame is a
`MediaSlot`: it renders an intentional placeholder stating what belongs there
and the crop to shoot for, and becomes the real asset the moment a file is set.
Nothing ever looks broken, so the page can be shown to a client before the
shoot.

1. Drop files into `public/media/estate/` (see the README there).
2. Set `src` on the matching entry in `src/data/verticals.js`.

Video is detected from the extension and plays muted, looping and inline. Team
photos work the same way via `public/photos/team/`.

### Motion and glow

`src/hooks/useInteractions.js` holds the pointer-driven effects: an ambient glow
that follows the cursor across dark sections (`useGlow`), a spotlight on the card
under the pointer (`useSpotlight`), a magnetic pull on primary buttons
(`useMagnetic`), and a once-only draw trigger for the charts (`useDrawOnce`).

Three rules apply to all of it:

1. **Nothing runs under `prefers-reduced-motion`.**
2. **Nothing runs on a coarse pointer.** A hover glow on a touchscreen costs
   listeners and can never fire.
3. **Every `pointermove` writes through one `requestAnimationFrame`**, so a fast
   cursor cannot queue more style writes than the browser can paint.

`useSpotlight` attaches a single listener to a grid container and resolves the
hovered card with `closest()`, rather than one listener per card.

None of it is load bearing: with JavaScript off, or motion reduced, every
element still renders in its final state. The heading reveal uses `clip-path`
rather than splitting words into spans, which would break text selection,
screen readers and `text-wrap: balance`.

### Cookies

`src/lib/consent.js` holds the consent state and `CookieConsent.jsx` is the
banner. Declining is one click with the same visual weight as accepting, which
is what EU and Spanish guidance require.

**No analytics are loaded at all right now.** The gate exists so that when you
add them, they load only for visitors who chose it:

```js
import { hasAnalyticsConsent } from './lib/consent'
if (hasAnalyticsConsent()) { /* load the tag here */ }
```

The banner never renders during prerender, so it is not baked into the static
HTML of all 14 routes. The footer "Cookie settings" link reopens it.

## Before launch

1. **Wire the form.** Set `VITE_FORM_ENDPOINT` in `.env.local` to a Formspree or
   Web3Forms endpoint. Without it the form falls back to Netlify Forms (which
   only works on a deployed Netlify site); on the dev server it shows the
   success state without sending, and logs a warning.
2. **Set the booking link.** `VITE_BOOKING_URL` points every "Book a free call"
   CTA at your scheduler. Until it is set, they all fall back to `/contact` —
   never a dead link.
3. **Add social URLs.** `VITE_SOCIAL_LINKEDIN`, `VITE_SOCIAL_INSTAGRAM`,
   `VITE_SOCIAL_YOUTUBE`. Until set, the footer icons render inert rather than
   linking to `#`.
4. **Add `public/og.png`** (1200×630) for link previews. The meta tags already
   point at it.
5. **Check the legal pages.** `src/pages/Legal.jsx` describes what this site
   actually does (a contact form, no tracking cookies). Have it reviewed, and
   update it if analytics are ever added.
6. **Verify the performance figures** in `PERFORMANCE` in `src/data/site.js`
   (8% engagement, 12% conversion) — they are carried over from the live site
   and are marked `// VERIFY`.

```bash
# .env.local
VITE_FORM_ENDPOINT=https://formspree.io/f/xxxxxxxx
VITE_BOOKING_URL=https://calendly.com/your-slug/15min
VITE_SOCIAL_LINKEDIN=https://www.linkedin.com/company/...
```

## Deploy

Deploy `dist/` to any static host. On Netlify the included `public/_redirects`
handles the SPA fallback; the prerendered `dist/<route>/index.html` files take
precedence, so crawlers get real HTML and visitors still get the SPA.

The prerender step needs Chrome. It finds it automatically on macOS, and on
Netlify via `netlify-plugin-chromium` (which sets `CHROME_PATH`). Without
Chrome the build **fails on CI** rather than silently shipping a JS-only site;
locally it degrades to a warning and a plain SPA build.
