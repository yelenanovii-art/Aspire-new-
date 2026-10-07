// Post-build prerender: render each route in headless Chrome and write static
// HTML (with its baked-in <title>, meta, canonical and content) to
// dist/<route>/index.html. Gives crawlers and AI answer engines real per-page
// HTML without executing JS. The SPA still hydrates on load.
//
// Also writes dist/sitemap.xml from the same route list, so the sitemap can
// never drift from the pages that actually exist.
//
// Usage: node scripts/prerender.mjs   (run after `vite build`)
// Chrome path can be overridden with CHROME_BIN (or CHROME_PATH, which
// netlify-plugin-chromium sets during a Netlify build).
import { execFileSync, spawn } from 'node:child_process'
import { mkdirSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { INSIGHTS } from '../src/data/insights.js'
import { SERVICES, CASES, ABOUT_BAND, WORK_BAND, PAGE_MEDIA } from '../src/data/site.js'
import { ESTATE, AI } from '../src/data/verticals.js'
import { TEAM, ONSITE, FILM } from '../src/data/site.js'

// Must match src/config.js: the apex is what Netlify answers 200 on.
const SITE_URL = 'https://aspireagencymarketing.com'

// Static routes, then one per service from the content data — so adding a
// service to src/data/site.js adds its prerendered page and sitemap entry.
const ROUTES = [
  '/',
  '/services',
  ...SERVICES.map((s) => `/services/${s.slug}`),
  '/services/go-to-market/quiz',
  `/${ESTATE.slug}`,
  `/${AI.slug}`,
  '/tech',
  '/work',
  ...CASES.map((c) => `/work/${c.slug}`),
  '/insights',
  ...INSIGHTS.map((a) => `/insights/${a.slug}`),
  '/about',
  '/fit',
  '/contact',
  // A turnstile in front of the booking calendar, not a landing page: it is
  // prerendered so a direct hit works, and excluded from the sitemap below.
  '/book',
  '/privacy',
  '/terms',
  '/cookies',
]

// Search-priority hints, highest first. Anything unlisted gets the default.
const PRIORITY = {
  '/': '1.0', '/services': '0.9', '/contact': '0.9', '/fit': '0.9',
  [`/${ESTATE.slug}`]: '0.9', [`/${AI.slug}`]: '0.9',
  '/work': '0.8', '/about': '0.8',
}
// Pages that exist but should not be offered to search.
const NO_INDEX = new Set(['/book'])
const priorityFor = (r) => PRIORITY[r] || (r.startsWith('/services/') ? '0.85' : '0.3')
const changefreqFor = (r) => (r === '/' ? 'weekly' : /^\/(privacy|terms|cookies)$/.test(r) ? 'yearly' : 'monthly')

const PORT = 4193
const DIST = 'dist'

if (!existsSync(DIST)) {
  console.error('dist/ not found — run `vite build` first.')
  process.exit(1)
}

// ── sitemap.xml ────────────────────────────────────────────────────────────
// Written before the Chrome check so a host without Chrome still ships a
// correct sitemap alongside the SPA build.
const today = new Date().toISOString().slice(0, 10)
// Image entries per route. This is a visual business, so the portfolio should
// be discoverable in image search, not just the pages that contain it.
const IMAGES = {
  '/': ONSITE.map((o) => o.src),
  '/about': [...TEAM.filter((m) => m.photo).map((m) => m.photo), ...ABOUT_BAND.map((b) => b.src)],
  [`/${ESTATE.slug}`]: [ESTATE.film.src, ...ESTATE.gallery.filter((g) => g.src).map((g) => g.src)],
  ...Object.fromEntries(
    SERVICES.filter((sv) => sv.photo).map((sv) => [`/services/${sv.slug}`, [sv.photo.src]])
  ),
  '/services/content-creation': [
    ...FILM.map((f) => f.poster),
    ...(SERVICES.find((sv) => sv.slug === 'content-creation')?.photo
      ? [SERVICES.find((sv) => sv.slug === 'content-creation').photo.src] : []),
  ],
  '/work': WORK_BAND.map((b) => b.src),
  '/services': PAGE_MEDIA.services.map((m) => m.src),
}
const imageTags = (r) =>
  (IMAGES[r] || [])
    .filter((src) => src && !/\.(mp4|webm|mov)$/i.test(src))
    .map((src) => `\n    <image:image><image:loc>${SITE_URL}${src}</image:loc></image:image>`)
    .join('')

const sitemap =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"' +
  ' xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n' +
  ROUTES.filter((r) => !NO_INDEX.has(r)).map(
    (r) =>
      `  <url><loc>${SITE_URL}${r === '/' ? '/' : r + '/'}</loc><lastmod>${today}</lastmod>` +
      `<changefreq>${changefreqFor(r)}</changefreq><priority>${priorityFor(r)}</priority>` +
      `${imageTags(r)}</url>`
  ).join('\n') +
  '\n</urlset>\n'
writeFileSync(join(DIST, 'sitemap.xml'), sitemap)
console.log(`prerender: wrote sitemap.xml (${ROUTES.length} URLs)`)

// ── Locate Chrome ──────────────────────────────────────────────────────────
function findChrome() {
  const candidates = [
    process.env.CHROME_BIN,
    process.env.CHROME_PATH, // set by netlify-plugin-chromium
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/opt/build/repo/node_modules/chromium/lib/chromium/chrome-linux/chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ].filter(Boolean)
  for (const c of candidates) {
    try {
      if (existsSync(c)) return c
    } catch {}
  }
  return null
}
const CHROME = findChrome()

if (!CHROME) {
  // On CI, silently shipping an un-prerendered SPA would drop every page's
  // static HTML — the whole point of this step — and nobody would notice until
  // rankings moved. Fail the build there; locally it stays a soft warning.
  if (process.env.NETLIFY || process.env.CI) {
    console.error(
      'prerender: no Chrome on the build host, so no static HTML would be written.\n' +
        '  Load netlify-plugin-chromium (it sets CHROME_PATH) or set CHROME_BIN.\n' +
        '  Failing rather than deploying a JS-only site.'
    )
    process.exit(1)
  }
  console.warn('⚠ Chrome not found — skipping prerender (SPA build). Set CHROME_BIN to enable per-page static HTML.')
  process.exit(0)
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
async function waitForServer(url, tries = 40) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url)
      if (res.ok) return true
    } catch {}
    await sleep(250)
  }
  return false
}

// Chrome occasionally dies mid-render for reasons that have nothing to do with
// the page — a crashpad failure, or the machine being under memory pressure
// with a browser already open. It surfaced as the build failing on a different
// route every run, which is the worst kind of failure because it looks like a
// content bug. One retry after a short pause clears it; a route that fails
// twice is a real problem and should still stop the build.
function renderRoute(url) {
  const args = [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--virtual-time-budget=6000',
    '--run-all-compositor-stages-before-draw',
    '--dump-dom',
    url,
  ]
  const opts = { encoding: 'utf8', maxBuffer: 1024 * 1024 * 128 }
  try {
    return execFileSync(CHROME, args, opts)
  } catch (first) {
    console.log(`  retrying ${url} after a render failure`)
    execFileSync('/bin/sleep', ['2'])
    try {
      return execFileSync(CHROME, args, opts)
    } catch {
      throw first
    }
  }
}

const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], { stdio: 'ignore' })

try {
  const up = await waitForServer(`http://localhost:${PORT}/`)
  if (!up) throw new Error('preview server did not start')

  let n = 0
  for (const route of ROUTES) {
    const html = renderRoute(`http://localhost:${PORT}${route}`)
    const outDir = route === '/' ? DIST : join(DIST, route)
    mkdirSync(outDir, { recursive: true })
    const doc = html.trimStart().toLowerCase().startsWith('<!doctype') ? html : '<!doctype html>\n' + html
    writeFileSync(join(outDir, 'index.html'), doc)
    n++
    console.log(`prerendered ${route}`)
  }
  // The router already falls back to <NotFound> for unmatched paths, and
  // useSeo stamps those "noindex, follow". Render one such path and write it as
  // 404.html, which Netlify (and most static hosts) serve for unknown URLs.
  // Deliberately NOT in ROUTES, so it stays out of sitemap.xml.
  const notFound = renderRoute(`http://localhost:${PORT}/_404`)
  if (!/noindex/.test(notFound)) throw new Error('404 render is missing its noindex tag')
  const notFoundDoc = notFound.trimStart().toLowerCase().startsWith('<!doctype')
    ? notFound
    : '<!doctype html>\n' + notFound
  writeFileSync(join(DIST, '404.html'), notFoundDoc)
  console.log('prerendered 404.html')

  console.log(`\n✓ prerendered ${n} routes + 404.html into dist/`)
} finally {
  server.kill()
}
