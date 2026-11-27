# v103/v104: robots.txt, sitemap.xml and Google verification moved to `public/`

| Change | Where |
|---|---|
| New `public/` folder: everything inside is copied to the site root on build (`angular.json`: `{ glob: "**/*", input: "public", output: "/" }`) | `public/`, `angular.json` |
| `robots.txt`, `sitemap.xml`, `llms.txt` moved from `src/` to `public/` (old single-file asset entries removed) | `public/` |
| `google71a9a8e18945e62d.html` (Search Console verification) added, served at `/google71a9a8e18945e62d.html`. Do not delete it, or Google drops the verification. | `public/` |
| `robots.txt`: all pages allowed, form handlers (`/enquiry.php`, `/apply.php`) and `/404` not crawled, sitemap line points to `https://www.phianinfotec.com/sitemap.xml` | `public/robots.txt` |
| `sitemap.xml` rebuilt from `prerender-routes.txt`: all 49 pages, one `<url>` each, `<lastmod>` on every URL (blog posts were missing it; now their post dates). `/404` is not listed. | `public/sitemap.xml` |
| `npm run sitemap` regenerates the sitemap from `prerender-routes.txt` when a page is added | `scripts/generate-sitemap.mjs`, `package.json` |

## v104: guard against the "homepage shows the Swetal page" mistake
The cause of the live problem could not be reproduced from the code (the routes file has `/` first, and each route is rendered
on its own). It is a build-output or upload problem, so the build now checks itself.
* `scripts/verify-build.mjs` runs automatically after `npm run build` (`postbuild`). It FAILS the build if:
  root `index.html` is not the home page (or has the Swetal title), any page's canonical is not its own URL, two pages share a title,
  a prerendered file is missing, a page is missing from `sitemap.xml`, or `robots.txt`, `llms.txt`, the Google verification file,
  `index.csr.html` or `.htaccess` is missing from the output.
* Self-tested here against a mock `dist` (passes when correct; fails with 3 errors when the Swetal file is copied to the root).
  It has not been run against a real Angular build.
* Deploy: build with `npm run build` (not `npx ng build`, which skips the check). Upload the CONTENTS of `dist/phian-website/browser/`
  and never copy a page's `index.html` over the root one. Then confirm with
  `curl -s https://www.phianinfotec.com/ | grep -o '<title>[^<]*'`.

## Decisions
* `/case-study/nsh-hospital` and `/case-study/mukunda` are NOT duplicates of `/work-nsh-hospital` and `/work-mukunda-group`
  (different titles, different stories: breast-cancer awareness campaign vs. PR/branding; content strategy vs. logo and brand system).
  So no 301 is added and all four stay in the sitemap. The two commented 301 lines in `.htaccess` stay commented.
* `/work-mediskin` and `/work-mukunda-nagpur-real-estate` are 301s in `.htaccess` and are not in the sitemap.

## Add a new page later
1. Add the route to `src/app/app.routes.ts` and one line to `prerender-routes.txt`.
2. `npm run sitemap`, then build.

## Not done (needs your account)
* Google Search Console: Sitemaps > add `sitemap.xml` > Submit. Bing Webmaster Tools: same.
* The urgent root `index.html` problem (homepage showing the Swetal page) is a deploy-side issue: after `npx ng build`,
  open `dist/phian-website/browser/index.html`, check `<title>` is the home title, and upload that file. Then run
  `curl -s https://www.phianinfotec.com/ | grep -o '<title>[^<]*'`.
* Still waiting on owner answers (`owner-inputs.md`): free brand review text, results for 5 case studies, testimonial roles.
* Not built or run here (no node_modules / network). Run `npm ci && npx ng build` and check `dist/phian-website/browser/` has
  `robots.txt`, `sitemap.xml`, `llms.txt`, `google71a9a8e18945e62d.html`, `index.csr.html`.
