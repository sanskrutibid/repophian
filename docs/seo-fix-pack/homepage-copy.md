# Homepage copy and markup replacements

Each block shows what is on the page now and what replaces it. Text in `[square brackets]` needs a real value from Dev before it goes live; see `owner-inputs.md`. Do not ship a bracket.

## 1. Page title, description and H1 (seo.service.ts, home route)

| Field | Now | Replace with |
|---|---|---|
| Title | Phian \| 360-Degree Brand Management Company in Nagpur and Kolkata (65 chars) | Phian Infotec \| Branding & Marketing Agency in Nagpur (53 chars) |
| Meta description | Phian builds, runs and grows brands with one senior team: strategy, creative, media, technology and reputation, for businesses across Central and East India. | One senior team for brand strategy, content, ads, web, SEO and PR. Nagpur and Kolkata offices. Book a free brand review. (120 chars) |
| og:title, twitter:title | same as title | same as new title |
| og:image on case-study pages | team.jpg on every page | that page's own hero image (work-nsh.jpg, work-max.jpg, and so on) |

**Why the keyword changes:** "brand management … Nagpur" returns mostly job boards. Buyers search "branding agency in Nagpur" and "digital marketing agency in Nagpur". Keep "360-degree brand management" as the positioning line in the body.

## 2. Hero: make the H1 visible

Now: the H1 has class `vh` (clipped to 1×1 px) and the first screen is only the showreel.

Replace with a visible block above or over the showreel:

```html
<section class="hero">
  <p class="eyebrow">360-degree branding and marketing agency · Nagpur and Kolkata</p>
  <h1>The Nagpur branding agency that runs your whole brand, not one piece of it.</h1>
  <p class="lead">
    Phian Infotec is a branding and marketing agency in Swavalambi Nagar, Nagpur, with an
    office in New Town, Kolkata. Since 2012 we have planned strategy, content, ads, websites,
    search and PR as one system for brands including NSH Critical Care Hospital, Baidyanath
    and Swetal Logistics Park.
  </p>
  <a class="btn btn-primary" href="/contact">Book a free brand review</a>
  <a class="btn btn-ghost" href="https://wa.me/917709809577?text=Hi%20Phian%2C%20I%27d%20like%20a%20free%20brand%20review.">WhatsApp us</a>
</section>
```

## 3. Showreel video

Now: two `<video>` elements (desktop 3.3 MB and mobile 5.3 MB), both with `src` set and `preload="auto"`, so every visitor's browser can start fetching both.

Replace with one element that only loads the matching file, and only its metadata until play:

```html
<video muted loop playsinline preload="metadata"
       poster="/assets/video/phian-showreel-poster.jpg"
       aria-label="Phian Infotec showreel">
  <source src="/assets/video/phian-showreel-mobile.mp4" media="(max-width: 767px)" type="video/mp4">
  <source src="/assets/video/phian-showreel.mp4" type="video/mp4">
</video>
```

If the two-section layout has to stay, set `src` on a video only when its section is visible (`matchMedia`), and leave the other with `data-src` only. Also re-encode the mobile file: it is larger than the desktop one.

## 4. Stats counters

Now: the numbers are `0+` in the DOM until the block scrolls into view, then count up. Anything that reads the page without scrolling gets "0+ years", and a scraper caught "8+ years, 274+ clients, 1 offices" mid-animation.

Replace with the pattern already used for the scramble headline (real text for machines, animation for eyes):

```html
<div class="proof ag-proof">
  <div><strong><span class="vh">14+</span><span aria-hidden="true" data-count="14" data-suffix="+">14+</span></strong> years of industry excellence</div>
  <div><strong><span class="vh">500+</span><span aria-hidden="true" data-count="500" data-suffix="+">500+</span></strong> client success stories</div>
  <div><strong><span class="vh">100+</span><span aria-hidden="true" data-count="100" data-suffix="+">100+</span></strong> expert creatives</div>
  <div><strong><span class="vh">2</span><span aria-hidden="true" data-count="2">2</span></strong> offices, Nagpur and Kolkata</div>
</div>
```

The counter script animates only the `aria-hidden` span, and the template renders it at its final value so the prerendered HTML is correct. Note the space after `</strong>`: today the text runs together as "14+years".

**Mumbai (confirmed by Dev, 23 November 2026):** Shriram Tower, Chembur is a contact address only, with no team there. The stat stays at 2 offices. So the page agrees with itself, relabel "Mumbai office" as "Mumbai address" in the menu, the footer and the `/mumbai` page heading, and keep Mumbai out of the schema.

## 5. "Founded in 2012…" paragraph

Now:
> Founded in 2012 by Debojyoti Ghosh, Phian Infotec has grown into a creative powerhouse that disrupts industries through digital strategy, web development and data-driven marketing. Our mission is to craft powerful visual stories that leave lasting impressions on every digital platform.

Replace with:
> Founded in 2012 by Debojyoti Ghosh, Phian Infotec is a branding and marketing agency headquartered in Nagpur with an office in Kolkata. The senior team that plans your strategy stays on your account, and reports every month on leads, sales and reputation.

## 6. Case-study section

Now: seven separate `<h2>` headings, four of them with the same sub-line ("Positioning, branding, PR and digital marketing for …") and no result.

**Status (v98):** done for Mediskin, Mukunda, Vaultstone, IIT-Home and NSH (see `APPLIED-IN-THIS-ZIP.md`). The brackets below remain only for Max Healthcare, Baidyanath, Haldiram's, Swetal and Samira. Original plan: one `<h2>` and seven `<h3>` cards, each with one result line:

```html
<h2>Work that moved a number.</h2>

<h3>NSH Critical Care Hospital: [RESULT, e.g. "OPD enquiries up X% in Y months"]</h3>
<p>Positioning, branding, PR and digital marketing for a Nagpur critical-care hospital and diagnostic centre.</p>

<h3>Max Healthcare: [RESULT]</h3>
<p>[One line on what Phian did and in which city or unit.]</p>

<h3>Baidyanath: [RESULT]</h3>
<p>[One line on what Phian did for Baidyanath Asli Ayurved.]</p>

<h3>Haldiram's: [RESULT]</h3>
<p>[One line. The photo is the Nagpur Factory Price Outlet, so say so if that was the brief.]</p>

<h3>Swetal Logistics Park: [RESULT, e.g. "X occupier enquiries from Y states"]</h3>
<p>A national demand-generation push and a brochure rebuilt around the questions occupiers ask.</p>

<h3>Samira Habitats: [RESULT]</h3>
<p>Social content, a pitch deck and AI video for a plotted development on the Konkan coast.</p>

<h3>Mukunda Group: [RESULT]</h3>
<p>A new group logo and palette, and a plotted-project portfolio that looks like one brand.</p>
```

The case-study pages themselves state no figures either, so the same results should be added there.

## 7. Testimonials

Now: a name and "Client review" under each quote.

Replace "Client review" with role and company for each person:

| Name on site | Role | Company |
|---|---|---|
| Swapnil Gote | [role] | [company] |
| Aditya Buradkar | [role] | [company] |
| Supriya Bansod | [role] | [company] |
| Manoj | [full name, role] | [company] |
| Dhanashree | [full name, role] | [company] |
| Madhu Chandra | [role] | [company] |

If these came from Google reviews, say "Google review" and link to the profile. A quote that cannot be attributed is better removed.

## 8. FAQ

Now: seven answers left over from the old digital-marketing site. Two contradict the rest of the page (services list mobile development and influencer marketing; industries list eCommerce and technology).

Replace all seven with:

**What does Phian Infotec do?**
We are a 360-degree branding and marketing agency. Six disciplines, planned together: brand strategy and identity, content and creative, media and performance, web, tech and CRM, search and intelligence, and PR and reputation.

**How much does branding or marketing cost?**
Every engagement is quoted after the free brand review, before any work starts. The price depends on which of the six disciplines you take and for how long.

**How long does a project take?**
A brand identity takes 2 to 3 weeks and a website 2 to 4 weeks. Monthly retainers start within 3 days of sign-off.

**Can we hire you for just one service?**
Yes. Take one discipline or all six. Either way it is planned against the whole brand, so your website, ads and PR say the same thing.

**Which industries do you specialise in?**
Real estate, healthcare, hospitality and F&B, education, B2B and industrial, and fashion and D2C.

**Do you work with businesses outside Nagpur and Kolkata?**
Yes. Our teams sit in Nagpur and Kolkata and we work with clients across Central and East India, and on national campaigns such as Swetal Logistics Park.

**What is the free brand review?**
[Two sentences from Dev: what you look at, how long it takes, and what the business owner walks away with.]

**How do you report results?**
One plain-language report a month covering leads, sales and reputation: what worked, what did not, and what changes next.

Keep the `<details><summary>` markup; it is already crawlable.

## 9. Footer blurb

Now:
> We empower brands with smart digital strategies and creative branding that increase visibility, engagement and real business growth.

Replace with:
> Phian Infotec is a 360-degree branding and marketing agency in Nagpur and Kolkata. One senior team for strategy, content, media, web, search and PR.

Also in the footer: point the LinkedIn icon at `https://www.linkedin.com/company/phian-infotec` (it currently opens the founder's personal profile).

## 10. Images

**Width and height.** 71 of 96 images have no `width` and `height`, so the layout shifts as they load. Add the intrinsic size to every `<img>`. The case-study images are:

| File | width | height |
|---|---|---|
| work-nsh.jpg | 1376 | 768 |
| work-max.jpg | 1376 | 768 |
| home-baidyanath-panel.jpg | 1060 | 1359 |
| home-haldirams-store.jpg | 1447 | 1087 |
| home-swetal.jpg | 1600 | 780 |
| samira-height.jpg | 822 | 604 |
| home-mukunda.jpg | 1600 | 903 |

**Alt text.** Lower priority than the audit implied: most of the 60 empty `alt=""` are decorative (icon art, the second copy of each client logo, card thumbnails inside a link that already has text), and empty alt is correct for those. Add alt text only to the six service-card photos, reusing the titles already in the sitemap:

| File | alt |
|---|---|
| brand-studio.jpg | Brand strategy team reviewing identity work |
| content.jpg | Content creator shooting a reel in a studio |
| performance.jpg | Performance marketer reading campaign dashboards |
| web-devs.jpg | Web developers building a website and CRM |
| search.jpg | SEO specialist reviewing keyword rankings on a laptop |
| team.jpg | Phian team planning a brand strategy together |

## 11. Contact options on the homepage

Now: one path, the "Book a brand review" button to `/contact`. Phone numbers are only in the menu and footer.

Add:
- The WhatsApp button from block 2, repeated in the closing call-to-action band.
- A tappable phone number beside the main button on mobile: `<a href="tel:+917709809577">Call +91 77098 09577</a>` (the Nagpur line; Kolkata is +91 79721 00822).
- A three-field form (name, phone, business) in the closing band, posting to the same handler as `/contact`.
