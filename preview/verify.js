// Automated SEO verification: checks every page for the signals that decide
// indexability, rich results and E-E-A-T. Exits non-zero if any hard check fails.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, 'site');
const pages = [];
const walk = (d) =>
  fs.readdirSync(d, { withFileTypes: true }).forEach((e) => {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name === 'index.html') pages.push(p);
  });
walk(ROOT);

const text = (h) => h.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim();
const jsonLd = (h) => [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));

let fails = 0;
const fail = (msg) => { console.log('  FAIL ' + msg); fails++; };
const ok = (msg) => console.log('  ok   ' + msg);

const rows = [];
for (const file of pages) {
  const html = fs.readFileSync(file, 'utf8');
  const slug = path.dirname(path.relative(ROOT, file)) === '.' ? '/' : '/' + path.dirname(path.relative(ROOT, file)) + '/';
  const main = (html.split('<main>')[1] || '').split('</main>')[0];
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  const canonical = (html.match(/rel="canonical" href="([^"]*)"/) || [])[1] || '';
  const ld = jsonLd(html).flatMap((g) => g['@graph'] || []);
  const ldTypes = ld.map((n) => n['@type']);
  const h1s = (main.match(/<h1[\s>]/g) || []).length;
  const words = text(main).split(' ').filter(Boolean).length;

  // hard checks
  if (!title) fail(`${slug} missing <title>`);
  if (title.length > 65) fail(`${slug} title too long (${title.length})`);
  if (!desc) fail(`${slug} missing meta description`);
  if (desc.length < 120 || desc.length > 165) fail(`${slug} meta description length ${desc.length} (need 120-165)`);
  if (!canonical) fail(`${slug} missing canonical`);
  if (h1s !== 1) fail(`${slug} has ${h1s} h1 elements`);
  if (!ldTypes.includes('Organization')) fail(`${slug} missing Organization schema`);
  if (!ldTypes.includes('WebSite')) fail(`${slug} missing WebSite schema`);
  if (slug !== '/' && !ldTypes.includes('BreadcrumbList')) fail(`${slug} missing BreadcrumbList`);
  if (slug !== '/' && !ldTypes.includes('Article')) fail(`${slug} missing Article schema`);
  if (!/og:image/.test(html) || !/twitter:card/.test(html)) fail(`${slug} missing social card tags`);

  // FAQ schema must match visible text
  const faqNode = ld.find((n) => n['@type'] === 'FAQPage');
  const visibleFaq = text((main.match(/<section class="faq">[\s\S]*?<\/section>/) || [''])[0]);
  let faqOk = 'n/a';
  if (faqNode) {
    faqOk = faqNode.mainEntity.every((q) => visibleFaq.includes(q.name)) ? 'match' : 'MISMATCH';
    if (faqOk === 'MISMATCH') fail(`${slug} FAQ schema does not match visible FAQ text`);
  }

  rows.push({ slug, words, title: title.length, desc: desc.length, faq: faqNode ? faqNode.mainEntity.length : 0, faqOk, types: ldTypes.length });
}

console.log('\n=== PER-PAGE ===');
console.log('slug'.padEnd(36), 'words', 'title', 'desc', 'faq', 'schema');
for (const r of rows.sort((a, b) => a.words - b.words))
  console.log(r.slug.padEnd(36), String(r.words).padStart(5), String(r.title).padStart(5), String(r.desc).padStart(4), String(r.faq).padStart(3), String(r.types).padStart(6), r.faqOk === 'match' ? '✓' : '');

const total = rows.reduce((s, r) => s + r.words, 0);
console.log('\n=== TOTALS ===');
console.log('pages:', rows.length, '| total words:', total, '| avg words:', Math.round(total / rows.length));
console.log('pages with FAQ schema:', rows.filter((r) => r.faq > 0).length + '/' + rows.length);
console.log('pages under 300 words:', rows.filter((r) => r.words < 300).length);

// link integrity
const links = new Set();
for (const file of pages) {
  const html = fs.readFileSync(file, 'utf8');
  (html.match(/href="(\/[^"#]*)"/g) || []).forEach((h) => links.add(h.slice(6, -1)));
}
const dead = [...links].filter((l) => {
  const f = path.join(ROOT, l);
  return !(fs.existsSync(f) || fs.existsSync(path.join(f, 'index.html')));
});
console.log('internal links:', links.size, '| dead:', dead.length ? dead.join(', ') : 'none');
if (dead.length) fails += dead.length;

for (const f of ['sitemap.xml', 'robots.txt', 'og-image.png']) {
  if (!fs.existsSync(path.join(ROOT, f))) fail(`missing ${f}`);
}

console.log(fails ? `\n${fails} CHECK(S) FAILED` : '\nALL CHECKS PASSED');
process.exit(fails ? 1 : 0);
