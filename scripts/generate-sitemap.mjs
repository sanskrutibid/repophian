// Rebuilds public/sitemap.xml from prerender-routes.txt (every page that is prerendered, except /404).
// Run:  npm run sitemap
// Keeps the existing <lastmod> and image entries of URLs already in the sitemap, uses the post date for /blog/* pages,
// and today's date for a brand-new page. Edit LASTMOD below when a page really changes.
import fs from 'fs';

const SITE = 'https://www.phianinfotec.com';
const OUT = 'public/sitemap.xml';
const routes = fs.readFileSync('prerender-routes.txt', 'utf8').split('\n').map(s => s.trim()).filter(Boolean).filter(r => r !== '/404');
const today = new Date().toISOString().slice(0, 10);

// keep what is already in the sitemap
const old = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '';
const keep = {};
for (const m of old.matchAll(/<url><loc>([^<]+)<\/loc>(?:<lastmod>([^<]+)<\/lastmod>)?(.*?)<\/url>/gs)) keep[m[1]] = { lastmod: m[2], images: m[3] };

// blog post dates come from src/app/core/blog.data.ts ("27 March 2026" -> 2026-03-27)
const MONTHS = { January: 1, February: 2, March: 3, April: 4, May: 5, June: 6, July: 7, August: 8, September: 9, October: 10, November: 11, December: 12 };
const blog = {};
const data = fs.readFileSync('src/app/core/blog.data.ts', 'utf8');
for (const m of data.matchAll(/slug:\s*'([^']+)'[\s\S]*?date:\s*'(\d+) (\w+) (\d{4})'/g))
  blog[m[1]] = `${m[4]}-${String(MONTHS[m[3]]).padStart(2, '0')}-${String(m[2]).padStart(2, '0')}`;

const LASTMOD = {}; // e.g. { '/about': '2026-11-27' }

const body = routes.map(r => {
  const loc = SITE + (r === '/' ? '/' : r);
  const k = keep[loc] || {};
  const lastmod = LASTMOD[r] || (r.startsWith('/blog/') && blog[r.slice(6)]) || k.lastmod || today;
  return `  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod>${k.images || ''}</url>`;
});
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${body.join('\n')}\n</urlset>\n`;
fs.writeFileSync(OUT, xml);
console.log(`sitemap: ${routes.length} URLs written to ${OUT}`);
