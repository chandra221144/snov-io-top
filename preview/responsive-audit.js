// Responsive audit. No browser is available in this sandbox, so overflow is
// verified by measurement: table min-content width is estimated from font
// metrics, and the CSS is checked for the rules that must exist at each
// breakpoint. Fails loudly if a page can still scroll sideways on a phone.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, 'site');
const CSS = fs.readFileSync(path.join(ROOT, 'style.css'), 'utf8');

const pages = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name === 'index.html') pages.push(p);
  }
})(ROOT);

// Calibrated against DejaVu Sans at 14px: average lowercase glyph ~7.0px,
// uppercase/digits ~8.4px, plus 12px padding and 1px border per cell.
const charWidth = (ch) => (/[A-Z0-9]/.test(ch) ? 8.4 : /[\s.,:;!|]/.test(ch) ? 4.2 : 7.0);
const textWidth = (s) =>
  s.replace(/<[^>]+>/g, '').replace(/&[a-z]+;/g, 'x').split('').reduce((w, c) => w + charWidth(c), 0);

const MIN_PHONE = 320; // smallest viewport we promise to support

let fails = 0;
const fail = (m) => { console.log('  FAIL ' + m); fails++; };
const pass = (m) => console.log('  ok   ' + m);

console.log('=== CSS rule coverage ===');
const required = [
  ['viewport meta handled in HTML', null],
  ['min-width:0 guard on grid children', /\.card,\.grid>\*[^{]*\{min-width:0\}/],
  ['global max-width on media', /img,svg,video,iframe\{max-width:100%/],
  ['table scroll wrapper', /\.table-scroll\{overflow-x:auto/],
  ['stacked tables under 650px', /\.table-scroll thead\{position:absolute/],
  ['tablet breakpoint 1024', /@media\(max-width:1024px\)/],
  ['phone breakpoint 650', /@media\(max-width:650px\)/],
  ['small phone breakpoint 480', /@media\(max-width:480px\)/],
  ['tiny phone breakpoint 360', /@media\(max-width:360px\)/],
  ['text-size-adjust', /-webkit-text-size-adjust:100%/],
  ['overflow-wrap on content', /\.content[^{]*\{overflow-wrap:break-word\}/],
  ['touch tap targets', /@media\(hover:none\)/],
  ['reduced motion support', /prefers-reduced-motion/],
];
for (const [label, re] of required) {
  if (re === null) continue;
  re.test(CSS) ? pass(label) : fail(label + ' — missing from style.css');
}

console.log('\n=== Per-page responsive checks ===');
let tableCount = 0, widestTable = 0, widestWhere = '';

for (const file of pages) {
  const html = fs.readFileSync(file, 'utf8');
  const slug = path.dirname(path.relative(ROOT, file)) || '/';
  const main = (html.split('<main>')[1] || '').split('</main>')[0];

  // 1. viewport meta
  if (!/name="viewport" content="width=device-width, initial-scale=1"/.test(html)) fail(`${slug} viewport meta`);

  // 2. every table wrapped, every body cell labelled
  const rawTables = (main.match(/<table>/g) || []).length;
  const wrapped = (main.match(/<div class="table-scroll"><table>/g) || []).length;
  if (rawTables !== wrapped) fail(`${slug} ${rawTables} tables but only ${wrapped} wrapped`);
  const tds = (main.match(/<td(?![^>]*data-label)/g) || []).length;
  if (tds > 0) fail(`${slug} ${tds} <td> without data-label`);

  // 3. measure each table's intrinsic min-content width
  for (const t of main.matchAll(/(<div class="table-scroll">)?<table>([\s\S]*?)<\/table>/g)) {
    const isWrapped = Boolean(t[1]);
    tableCount++;
    const rows = [...t[2].matchAll(/<tr>([\s\S]*?)<\/tr>/g)];
    const cols = [];
    for (const r of rows) {
      const cells = [...r[1].matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g)].map((c) => textWidth(c[1]));
      cells.forEach((w, i) => (cols[i] = Math.max(cols[i] || 0, w)));
    }
    const width = cols.reduce((s, w) => s + w + 25, 0); // + padding + border
    if (width > widestTable) { widestTable = width; widestWhere = slug; }
    // A wrapped table is allowed to be wide (it scrolls / stacks), but an
    // unwrapped one would break the page. Only unwrapped ones are fatal.
    if (width > MIN_PHONE && !isWrapped) fail(`${slug} unwrapped ${Math.round(width)}px table`);
  }

  // 4. images must carry intrinsic dimensions to prevent layout shift
  for (const img of main.matchAll(/<img[^>]*>/g)) {
    if (!/width="\d+"/.test(img[0]) || !/height="\d+"/.test(img[0])) fail(`${slug} img without width/height`);
    if (!/alt="/.test(img[0])) fail(`${slug} img without alt`);
  }

  // 5. no hard-coded widths that exceed the smallest phone
  for (const m of html.matchAll(/style="[^"]*width:\s*(\d+)px/g)) {
    if (Number(m[1]) > MIN_PHONE) fail(`${slug} inline fixed width ${m[1]}px`);
  }

  // 6. no unbreakable long token (long email/URL) outside a break-word context
  const longTokens = (main.replace(/<[^>]+>/g, ' ').match(/\S{45,}/g) || []).filter((t) => !/^https?:/.test(t));
  if (longTokens.length) fail(`${slug} long unbreakable token: ${longTokens[0].slice(0, 50)}`);
}

console.log(`  tables checked: ${tableCount}`);
console.log(`  widest table intrinsic width: ${Math.round(widestTable)}px (${widestWhere})`);
console.log(`  all ${pages.length} pages checked`);

console.log('\n=== Breakpoint behaviour simulation ===');
// Sum up what each breakpoint does to the main layout containers.
const sim = [
  ['≥1025px', 'hero 2-col, cards 3/4-col, tables scroll', /@media\(max-width:1024px\)/],
  ['851–1024px', 'hero 2-col tighter, cards 2-col', /\.grid\{grid-template-columns:repeat\(2,1fr\)\}/],
  ['651–850px', 'cards 2-col, feature stacks', /@media\(max-width:850px\)/],
  ['≤650px', 'everything 1-col, tables restack as cards', /\.table-scroll td\{display:block/],
  ['≤480px', 'narrower gutters, smaller type, footer 1-col', /\.footer-grid\{grid-template-columns:1fr\}/],
  ['≤360px', 'smallest type, compact CTA', /\.nav>\.button span\{display:none\}/],
];
for (const [range, desc, re] of sim) {
  re.test(CSS) ? pass(`${range}: ${desc}`) : fail(`${range}: rule missing`);
}

console.log(fails ? `\n${fails} RESPONSIVE CHECK(S) FAILED` : '\nALL RESPONSIVE CHECKS PASSED');
process.exit(fails ? 1 : 0);
