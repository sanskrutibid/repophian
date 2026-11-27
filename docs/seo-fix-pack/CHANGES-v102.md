# v102: "old page / home page on every refresh" fix

Cause: the old `.htaccess` sent every address that had no folder to `/index.html`, which in a prerendered build is the
prerendered HOME page. Hard refresh therefore showed the home page (or a stale copy) and Angular could not hydrate it.

Changes
* `src/.htaccess` (also saved as `docs/seo-fix-pack/htaccess-v102-prerender.txt`):
  prerendered folder when it exists, otherwise `/index.csr.html` (empty client-side shell). Never `/index.html`.
  Added 301s for `/work-mediskin` and `/work-mukunda-nagpur-real-estate` (they are client-side redirects in `app.routes.ts` and have no prerendered folder).
  Hashed JS/CSS get a 1-year immutable cache; HTML is always `no-cache`.
* `src/styles.css`: the platforms marquee (`.chips-mq`) is forced to one line.

Deploy checklist
1. `npm ci && npx ng build`
2. Check that `dist/phian-website/browser/index.csr.html` exists (the new `.htaccess` needs it).
3. Delete everything in `public_html` except `.htaccess` backups, then upload the CONTENTS of `dist/phian-website/browser/` (all folders, all `main-*.js`, `chunk-*.js`, `styles-*.css`, `index.html`, `index.csr.html`, `.htaccess`).
4. hPanel > Cache > Clear cache. Test in Incognito.
5. `curl -I https://www.phianinfotec.com/about` must give 200 (not 301), and `/some-random-url` must give 200 with the shell (Angular shows the 404 page).
Not built or tested on a server here (no network / node_modules).
