# v105: showreel video and platforms marquee broken after a hard refresh

Symptom: locally and right after a push the homepage video plays and the platforms strip (under "Web, Tech and CRM") is one line.
After a hard refresh (full page load) the video does not play and the strip shows the same line 4 times, one under the other.

Likely cause (could not run a real Angular build here, so this is the explanation that fits, not a measured result):
since prerendering was added (v101), a full page load shows the prerendered HTML first and Angular "hydrates" it. The site's page effects
(`effects.service.ts`: marquees, counters, text animations) and the showreel code rebuild parts of that DOM by hand, which collides with
hydration. Moving between pages with the menu does not hit this, which is why it only shows on refresh.

Change
* `src/app/app.config.ts`: `provideClientHydration()` removed. The browser now starts the app fresh on every load, exactly as before
  prerendering (this is the behaviour the video and the strip worked with). The prerendered HTML is unchanged, so Google still reads
  full pages. Cost: a brief blank moment while the page script loads, as in the old client-side build.
* `src/app/core/effects.service.ts`: the marquee builder skips an element that already contains `.mq-in`, so it can never wrap twice.
* CSS and the video code are unchanged. Checked in headless Chrome: with the current `styles.css` the strip is one row in both states
  (prerendered, and after the script wraps it into 4 sets).

After deploy
1. `npm ci && npm run build` (must print "build check OK"), upload the CONTENTS of `dist/phian-website/browser/`, hPanel > Cache > Clear cache.
2. Test in Incognito: open `/`, press Ctrl+Shift+R five times. The video must keep playing and the strip must stay one line.
3. If it still repeats, send a screenshot of DevTools > Console (red errors) and DevTools > Elements for `.chips-mq`.
