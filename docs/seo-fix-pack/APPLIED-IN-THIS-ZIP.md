# What this zip already applies from the SEO fix pack

Version v101. Changes since v97 are listed under "Added in v98 to v101" below.

The v97 base built cleanly with `npm ci && ng build`. The v98 changes (HTML, CSS, one video) were checked by reading the files, but v98 has not been built or run: run `npm ci && ng build` and click through the homepage slider and the five case-study pages before uploading. Not tested on a live server.

## Applied (Stage 1)
| Fix pack item | Where |
|---|---|
| Static head defaults (title, description, og, twitter, locale) | `src/index.html` |
| Fonts: only Bricolage Grotesque in `index.html`; Devanagari font removed (unused); the 15 logo fonts now load on first use | `src/index.html`, `src/app/shared/brand-logo/brand-logo.component.ts` |
| Sitewide schema: company LinkedIn/Instagram/Facebook, info@ email, WebSite node, Nagpur and Kolkata ProfessionalService nodes (no Mumbai) | `src/index.html` |
| Home title and description | `src/app/pages/home/home.component.ts` |
| seo.service: per-page image size, `og:locale`, noindex only on 404 | `src/app/core/seo.service.ts` |
| Case-study pages pass their own og:image (12 pages) | `src/app/pages/work-*`, `case-study-*` |
| Visible homepage H1 + hero with WhatsApp and tap-to-call | `home.component.html`, `styles.css` |
| Stat counters render real text for machines (`vh` + `data-count`), space after number | `home.component.html`, `core/effects.service.ts` |
| "Founded in 2012" paragraph, footer blurb, company LinkedIn link | `home.component.html`, `footer.component.html` |
| Case studies: one section heading, each slide title is now an h3 | `home.component.html`, `styles.css` |
| FAQ replaced (7 answers) | `home.component.html` |
| Alt text on the six service-card photos | `home.component.html` |
| width/height added to 135 images that had none; `:where(img[width][height]){height:auto}` keeps layout safe | all page templates, `styles.css` |
| Mumbai is an address only: menu, footer, About card, `/mumbai` page, WhatsApp number | header, footer, about, mumbai |
| `.htaccess`: non-www to www, `/team` 301, `/index.html` and trailing slash 301, real 404 for missing files, no-cache for HTML | `src/.htaccess` |
| `llms.txt` is a real file at `/llms.txt` | `public/llms.txt`, `angular.json` |

## Added later: homepage enquiry form (block 11)
Closing band at the bottom of the homepage with WhatsApp, tap-to-call and a 3-field form (name, phone, business). The form posts to `/enquiry.php` (`src/enquiry.php`), which emails the details to **info@phianinfotec.com**. It has a spam trap and a limit of 8 enquiries per hour per visitor. Success is shown only when the server confirms the mail was sent; otherwise visitors see call/WhatsApp/email buttons. Test after upload: open `https://www.phianinfotec.com/enquiry.php?health=1` (should say mail() available), then send one test enquiry. Check the spam folder the first time. The mailbox info@phianinfotec.com must exist on Hostinger.

## Added in v98 to v101: case-study results and showreel
One-line results for five case studies, supplied by the owner, now appear in two places each: the case-study page (a "Result" line above the info box) and the `/case-study` card.

| Case study | Result line |
|---|---|
| Mediskin | Ranked in the top 5 on Google Search and on generative search engines. |
| Mukunda | Built a strong lead ecosystem that now drives steady customer acquisition. |
| Vaultstone | Now among the top results on ChatGPT, Gemini and Google. |
| IIT-Home | Stronger social media engagement and a wider, stronger brand reach. |
| NSH Hospital | Top rankings on every search engine, 5X the social engagement of the previous year, and a steep rise in sales. |

* The homepage slider is unchanged from v97: the original 7 slides (NSH, Max Healthcare, Baidyanath, Haldiram's, Swetal, Samira, Mukunda). The five result lines appear on the case-study pages and the `/case-study` cards, not in the slider.
* The "headline results stay as placeholders" note on `/work` was removed.
* **Showreel:** the mobile MP4 was re-encoded from 5.3 MB to 2.5 MB (720x1280, same 63 s, same poster), now smaller than the desktop file (3.3 MB). A frame check against the old file showed no visible quality loss.
* The first showreel section on the homepage had `aria-label="1 of 7"` by mistake; it now reads "Phian showreel".
* The numbers above are the owner's claims and are not verified by the developer. Keep screenshots or reports (Search Console, analytics, ranking exports) on file for each one.

## NOT applied
* **Stage 2 prerender: code is in place (v101), not yet built or tested.** Config, server entry files, guards, hydration and the `/404` route are applied; see `PRERENDER-STEPS.md`. You still need to run `npm install`, `npx ng build`, fix any build errors, and test on staging before production.
* **Blocked on owner answers** (`owner-inputs.md`): results for Max Healthcare, Baidyanath, Haldiram's, Swetal and Samira, testimonial roles (block 7), the "What is the free brand review?" FAQ (an HTML comment marks the spot).
* **Sitemap / duplicate case studies.** `/case-study/nsh-hospital` and `/case-study/mukunda` are separate pages here; confirm they duplicate `/work-*` before enabling the 301s in `.htaccess`.
* **Showreel.** Done in v98 (see above).
* **Stage 3 and off-site clean-up** (bot access checks, Justdial, Google Business Profile, spelling) are account-owner tasks. They cannot be done from the code; the steps are in `README.md` (Stage 3) and `owner-inputs.md` (off-site clean-up).
