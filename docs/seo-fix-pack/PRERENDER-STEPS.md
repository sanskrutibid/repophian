# Prerender (Stage 2): what is already in this zip, and what you run

## Where `prerender-routes.txt` lives
`prerender-routes.txt` sits in the project ROOT, in the same folder as `angular.json` and `package.json`:

```
phianinfotecnewwebsite-main/
  angular.json
  package.json
  prerender-routes.txt      <-- here (50 lines: 49 sitemap routes + /404)
  src/
```
`angular.json` points to it as `"routesFile": "prerender-routes.txt"` (path is relative to the workspace root). A copy is also kept in `docs/seo-fix-pack/`.

## Already done in this zip (v101)
| File | Change |
|---|---|
| `angular.json` | `server`, `prerender` (routesFile + discoverRoutes) and `"ssr": false` added under `build > options` |
| `src/main.server.ts` | new, server entry |
| `src/app/app.config.server.ts` | new, server config |
| `src/app/app.config.ts` | `provideClientHydration()` added |
| `src/app/app.routes.ts` | `/404` route added above `**` |
| `src/app/app.component.ts` | animations and browser code skipped when there is no `window` |
| `src/app/pages/home/home.component.ts` | showreel code skipped when there is no `window` |
| `src/app/layout/header/header.component.ts` | `document` use guarded (menu lock, drop-downs) |
| `src/app/pages/careers/careers.component.ts` | `document` use in `ngOnDestroy` guarded |
| `tsconfig.app.json` | `src/main.server.ts` added to `files` |
| `package.json` | `@angular/platform-server` and `@angular/ssr` (^18.2.0) added |

`server.ts` is intentionally NOT used (static hosting, no Node server). Delete it if `ng add` created one.

## What you run
```bash
npm install            # once, to sync package-lock.json with the two new packages
npx ng build
```
Output: `dist/phian-website/browser/`, one `index.html` per route.

Quick check:
```bash
ls dist/phian-website/browser/about/index.html
ls dist/phian-website/browser/404/index.html
grep -o "<title>[^<]*" dist/phian-website/browser/about/index.html
grep -c "<h1" dist/phian-website/browser/about/index.html
```
If a build error says `window is not defined` / `document is not defined`, it names the file and line: wrap that code in `if (typeof window === 'undefined') return;` (or `typeof document`) and build again.

## Deploy (staging first)
1. Upload the CONTENTS of `dist/phian-website/browser/` to the staging subdomain.
2. Replace `.htaccess` there with `docs/seo-fix-pack/htaccess-stage2-prerender.txt` (renamed to `.htaccess`). The build copies the Stage 1 `.htaccess` from `src/`; Stage 2 removes the single-page fallback so unknown URLs return a real 404.
3. `bash docs/seo-fix-pack/verify.sh https://staging.phianinfotec.com`
4. Click through homepage slider, showreel, menu, preloader, enquiry form and a case-study page.
5. Then production, and resubmit `sitemap.xml` in Search Console and Bing.

Not tested: this zip has not been built (no internet where it was prepared), and the Stage 2 `.htaccess` has not run on any server.
