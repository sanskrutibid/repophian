// Runs automatically after `npm run build` (postbuild). Fails the build if a prerendered page is wrong,
// for example the "homepage shows the Swetal page" mistake: root index.html must be the HOME page.
// Checks per route in prerender-routes.txt: file exists, canonical = that route's own URL, title is unique.
// Also checks sitemap/robots/llms/google verification files and index.csr.html are in the output.
import fs from 'fs';
import path from 'path';

const SITE = 'https://www.phianinfotec.com';
const DIR = process.argv[2] || 'dist/phian-website/browser';
const routes = fs.readFileSync('prerender-routes.txt', 'utf8').split('\n').map(s => s.trim()).filter(Boolean);
const errors = [];
const titles = new Map();

for (const r of routes) {
  const file = path.join(DIR, r === '/' ? 'index.html' : r + '/index.html');
  if (!fs.existsSync(file)) { errors.push(`missing file for ${r}: ${file}`); continue; }
  const html = fs.readFileSync(file, 'utf8');
  const title = (html.match(/<title[^>]*>([^<]*)/i) || [])[1];
  const canon = (html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"/i) || html.match(/<link[^>]*href="([^"]*)"[^>]*rel="canonical"/i) || [])[1];
  const want = SITE + (r === '/' ? '/' : r);
  if (!title) errors.push(`${r}: no <title>`);
  if (canon !== want) errors.push(`${r}: canonical is "${canon}", expected "${want}"`);
  if (title) {
    if (titles.has(title)) errors.push(`${r}: same <title> as ${titles.get(title)} ("${title}")`);
    else titles.set(title, r);
  }
}

const home = fs.existsSync(path.join(DIR, 'index.html')) ? fs.readFileSync(path.join(DIR, 'index.html'), 'utf8') : '';
if (/swetal/i.test((home.match(/<title[^>]*>([^<]*)/i) || [])[1] || '')) errors.push('ROOT index.html has the Swetal title: it is not the home page');

for (const f of ['index.csr.html', 'robots.txt', 'sitemap.xml', 'llms.txt', 'google71a9a8e18945e62d.html', '.htaccess'])
  if (!fs.existsSync(path.join(DIR, f))) errors.push(`missing in output: ${f}`);

const sm = fs.existsSync(path.join(DIR, 'sitemap.xml')) ? fs.readFileSync(path.join(DIR, 'sitemap.xml'), 'utf8') : '';
for (const r of routes.filter(r => r !== '/404')) {
  const loc = SITE + (r === '/' ? '/' : r);
  if (!sm.includes(`<loc>${loc}</loc>`)) errors.push(`sitemap.xml has no entry for ${r} (run: npm run sitemap)`);
}

if (errors.length) {
  console.error(`\nBUILD CHECK FAILED (${errors.length}):\n - ` + errors.join('\n - '));
  console.error('\nDo NOT upload this build.');
  process.exit(1);
}
console.log(`build check OK: ${routes.length} pages, each with its own title and canonical; root index.html is the home page.`);
