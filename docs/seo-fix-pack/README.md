# phianinfotec.com SEO fix pack: developer handover

Source: page audit of 23 November 2026 (`../phianinfotec-page-audit.md`). The site is an Angular 18.2.14 client-side app on Hostinger. Nothing in this pack has been applied or tested on the server.

**The core problem:** the server sends a 3.9 KB shell (`<title>Phian</title>`, empty `<app-root>`) for every URL, including URLs that do not exist. Titles, descriptions, canonicals, headings and all body text only exist after JavaScript runs.

## What is in this folder

| File | Use |
|---|---|
| `index-head.html` | Static `<head>` defaults and the trimmed font link for `src/index.html` |
| `schema-sitewide.json` | Replacement for the JSON-LD block in `src/index.html` |
| `htaccess-stage1.txt` | Redirect and 404 rules to merge into `.htaccess` now |
| `htaccess-stage2-prerender.txt` | Full `.htaccess` for after prerendering |
| `prerender-routes.txt` | All 49 sitemap routes plus `/404`, for the prerender config |
| `homepage-copy.md` | Every homepage text and markup change, before and after |
| `llms.txt` | Goes in `public/` (or `src/assets` root copy) so `/llms.txt` is a real file |
| `owner-inputs.md` | What Dev must supply before the bracketed copy can ship |
| `verify.sh` | Acceptance checks: `bash verify.sh` (live) or `bash verify.sh https://staging…` |

## Stage 1: same day, no architecture change

1. **Static head defaults.** Paste `index-head.html` into `src/index.html`. Do not hard-code a canonical or `og:url` yet (reason is in the file).
2. **seo.service.ts.**
   - Use `Title.setTitle` and `Meta.updateTag`, never `addTag`, so the static defaults are replaced and not duplicated.
   - Home route: new title and description from `homepage-copy.md` block 1.
   - Case-study routes: pass each page's own hero image as `og:image` (all currently fall back to `team.jpg`).
   - Not-found route: add `<meta name="robots" content="noindex">` and remove it on navigation away. Until Stage 2 this is the only way to keep junk URLs out of the index.
3. **Schema.** Replace the JSON-LD in `index.html` with `schema-sitewide.json`. Changes: company LinkedIn, Instagram and Facebook in `sameAs` (was the founder's personal LinkedIn only), `info@` as the contact email, a `WebSite` node, and one `ProfessionalService` node per office.
4. **Fonts.** Leave only Bricolage Grotesque in `index.html`. Move the other two stylesheets (17 families) into the route that uses them.
5. **.htaccess.** Merge `htaccess-stage1.txt`: non-www to www, `/team` to `/about` as a real 301, trailing-slash and `/index.html` duplicates, and real 404s for missing files.
6. **llms.txt.** Ship the real file. Today `/llms.txt` returns the HTML shell.
7. **Homepage content.** Apply `homepage-copy.md` blocks 2 to 11. Blocks 6 (case-study results), 7 (testimonial roles) and one FAQ answer in block 8 (the free brand review) still contain `[brackets]` that wait on `owner-inputs.md`; everything else can go now.
8. **Sitemap.** Remove `/case-study/nsh-hospital` and `/case-study/mukunda` if they duplicate `/work-nsh-hospital` and `/work-mukunda-group`, then enable the matching 301s. Decide whether `/blog/*` and `/insights` stay as two sections; the homepage only links to `/insights`.

## Stage 2: prerender every route

This is the fix that moves the technical score. After it, each URL returns its own complete HTML and unknown URLs return 404.

### Option A: stay on Angular 18

```bash
ng add @angular/ssr
```

Then in `angular.json`, under `projects.<app>.architect.build.options`:

```json
"server": "src/main.server.ts",
"prerender": {
  "routesFile": "prerender-routes.txt",
  "discoverRoutes": true
},
"ssr": false
```

- `"ssr": false` means static files only, no Node server, which is what Hostinger shared hosting needs. Delete the generated `server.ts`.
- Copy `prerender-routes.txt` to the project root. Parameterised routes (`/blog/:slug`, `/case-study/:slug`) are not discovered automatically, which is why they are listed.
- Add a `{ path: '404', component: NotFoundComponent }` route so `/404/index.html` is generated for `ErrorDocument`.
- Output is `dist/<app>/browser/`, with one `index.html` per route. Upload that folder's contents to `public_html`.

### Option B: upgrade to Angular 19 or later first

Newer versions replace the options above with `"outputMode": "static"` and a server routes file:

```ts
// src/app/app.routes.server.ts
import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '404', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Prerender },
];
```

Parameterised routes supply their slugs through `getPrerenderParams`. Check https://angular.dev/guide/ssr for the exact shape in the version you land on; the API was a developer preview in 19.

### What will break during prerender, and the fix

The build runs every component in Node, where there is no browser.

- **Browser-only APIs** (`window`, `document`, `localStorage`, `IntersectionObserver`, `matchMedia`, video playback, the scramble and marquee animations, counters): move into `afterNextRender(() => { … })` or guard with `isPlatformBrowser(inject(PLATFORM_ID))`.
- **Initial state is what gets indexed.** Whatever the template renders before any animation runs is the HTML crawlers receive. Counters must render final values (`homepage-copy.md` block 4), and reveal-on-scroll elements must not start as `opacity: 0` without a no-JS fallback.
- **Hydration.** Add `provideClientHydration()` to `app.config.ts` so the browser reuses the prerendered DOM and does not flash.
- **seo.service.ts now runs at build time**, so each route's title, description, canonical, `og:url` and JSON-LD land in its static HTML. The canonical can now be set per route safely.

### Deploy

1. Deploy to a staging subdomain with `htaccess-stage2-prerender.txt` as `.htaccess`.
2. `bash verify.sh https://staging.phianinfotec.com` until the Stage 2 section passes.
3. Deploy to production, run `bash verify.sh`, then resubmit `sitemap.xml` in Google Search Console and Bing Webmaster Tools.

## Stage 3: checks only the account owner can run

- **Bot access.** Requests carrying a Googlebot or Bingbot user-agent got `403`, and GPTBot got `429`, from a normal connection. This is probably Hostinger rejecting spoofed bots, but confirm: Search Console > URL Inspection > Test live URL on the homepage, and look in hPanel (CDN and security settings) for any AI-bot or crawler blocking.
- **Old URLs.** Search Console > Pages > "Not found" and "Page with redirect" list the old WordPress URLs still indexed. Add a 301 for each to rule 2 of the `.htaccess`.
- **Rendered check.** After Stage 2, View Source (not Inspect) on three pages should show the full text.

## Acceptance

`verify.sh` prints PASS or FAIL per check. Baseline on 23 November 2026 against the live site: 1 passed, 18 failed (the one pass is "a real route still returns 200"). Stage 1 is done when its section is all PASS; same for Stage 2.

The script's text checks were self-tested against a local mock of a fixed page. Its redirect checks could not be exercised there, and the `.htaccess` rules themselves have not been run on any server.
