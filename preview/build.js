// Builds (1) theme content.json for the WordPress theme and (2) the static preview site,
// including full SEO head tags, JSON-LD, sitemap.xml and robots.txt.
const fs = require('fs');
const path = require('path');
const content = require('./content');
const FIGURES = require('./figures');
const FIG_DIR = path.join(__dirname, '..', 'theme', 'leads-mania-theme', 'assets', 'figures');

const SITE = content.SITE;
const ICONS = {"check":"<svg viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M20 6 9 17l-5-5\"/></svg>","search":"<svg viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"11\" cy=\"11\" r=\"7\"/><path d=\"m20 20-3.5-3.5\"/></svg>","shield":"<svg viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z\"/><path d=\"m9 12 2 2 4-4\"/></svg>","clock":"<svg viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 7v5l3 2\"/></svg>"};
const THEME = path.join(__dirname, '..', 'theme', 'leads-mania-theme');
const OUT = path.join(__dirname, 'site');
const AFFILIATE = 'https://snov.io?fp_ref=mrck20';

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const url = (slug = '') => '/' + String(slug).replace(/^\/+|\/+$/g, '') + (slug ? '/' : '');
const button = (label = 'Try Snov.io Free') =>
  `<a class="button" href="${AFFILIATE}" target="_blank" rel="sponsored nofollow noopener">${esc(label)} <span aria-hidden="true">↗</span></a>`;

const figureHtml = (slug) => {
  const f = FIGURES[slug];
  if (!f) return `<!-- unknown figure: ${slug} -->`;
  return `<figure class="fig"><img src="/figures/${slug}.svg" alt="${esc(f.alt)}" width="${f.w}" height="${f.h}" loading="lazy" decoding="async">${
    f.caption ? `<figcaption>${esc(f.caption)}</figcaption>` : ''
  }</figure>`;
};

const shortcodes = (html = '') =>
  html
    .replace(/\[url:([a-z0-9-]+)\]/g, (_, s) => url(s))
    .replace(/\[affiliate:([^\]]+)\]/g, (_, t) => button(t))
    .replace(/\[fig:([a-z0-9-]+)\]/g, (_, t) => figureHtml(t));

// A single honest timestamp: the moment this build ran.
const BUILD_ISO = new Date().toISOString();
const BUILD_DATE = BUILD_ISO.slice(0, 10);

const NAV = [
  ['Home', ''],
  ['Reviews', 'snov-io-review'],
  ['Comparisons', 'comparisons'],
  ['Guides', 'guides'],
  ['Pricing', 'snov-io-pricing'],
  ['About', 'about'],
];

const header = ({ title, description, canonical, jsonld = [], ogType = "article" }) => `<!doctype html><html lang="en-US"><head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<meta property="og:type" content="${ogType}">
<meta property="og:locale" content="${SITE.locale}">
<meta property="og:site_name" content="${esc(SITE.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${SITE.url}/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${SITE.url}/og-image.png">
<link rel="stylesheet" href="/style.css">
${jsonld.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n')}
</head><body class="home page"><div class="progress" id="progress"></div>
<header class="header"><div class="wrap nav"><a class="logo" href="${url()}">leads mania<span>.</span></a><span class="badge">Independent reviews</span><nav class="links" aria-label="Main navigation">${NAV.map(
  ([label, slug]) => `<a href="${url(slug)}">${label}</a>`
).join('')}</nav>${button()}</div></header><main>`;

const footer = () => `</main><footer class="footer"><div class="wrap"><div class="footer-grid"><div><a class="logo" href="${url()}">leads mania<span>.</span></a><p>Clearer choices for better outreach. Independent, research-based guides for people building meaningful business connections.</p></div><div><h4>Explore</h4><a href="${url('snov-io-review')}">Snov.io review</a><a href="${url('snov-io-pricing')}">Pricing guide</a><a href="${url('snov-io-alternatives')}">Alternatives</a><a href="${url('snov-io-vs-apollo')}">vs Apollo.io</a></div><div><h4>Learn</h4><a href="${url('comparisons')}">Comparisons</a><a href="${url('guides')}">Guides</a><a href="${url('how-to-find-email-addresses')}">Find email addresses</a><a href="${url('verify-email-addresses-in-bulk')}">Verify in bulk</a></div><div><h4>Information</h4><a href="${url('about')}">About us</a><a href="${url('how-we-research')}">How we research</a><a href="${url('contact')}">Contact</a><a href="${url('affiliate-disclosure')}">Affiliate disclosure</a><a href="${url('privacy-policy')}">Privacy policy</a></div></div><div class="footer-bottom">Some links on this site are affiliate links. If you buy through them, we may earn a commission at no extra cost to you. Leads Mania is independent and is not Snov.io. &nbsp; © ${new Date().getFullYear()} Leads Mania.</div></div></footer><div class="mobile-cta">${button()}</div><script>addEventListener('scroll',function(){var h=document.documentElement;document.getElementById('progress').style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100||0)+'%';},{passive:true});</script></body></html>`;

// ---------- structured data ----------
const orgNode = {
  '@type': 'Organization',
  '@id': `${SITE.url}/#organization`,
  name: SITE.name,
  url: `${SITE.url}/`,
  description: SITE.tagline,
  logo: { '@type': 'ImageObject', url: `${SITE.url}/og-image.png` },
};
const siteNode = {
  '@type': 'WebSite',
  '@id': `${SITE.url}/#website`,
  url: `${SITE.url}/`,
  name: SITE.name,
  description: SITE.tagline,
  publisher: { '@id': `${SITE.url}/#organization` },
  inLanguage: 'en-US',
};
const faqNode = (faq = []) =>
  faq.length
    ? {
        '@type': 'FAQPage',
        mainEntity: faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }
    : null;
const breadcrumbNode = (title, slug) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE.url}/` },
    { '@type': 'ListItem', position: 2, name: title, item: `${SITE.url}${url(slug)}` },
  ],
});
const articleNode = (title, description, slug, words) => ({
  '@type': 'Article',
  '@id': `${SITE.url}${url(slug)}#article`,
  headline: title,
  description,
  inLanguage: 'en-US',
  wordCount: words,
  datePublished: BUILD_ISO,
  dateModified: BUILD_ISO,
  mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE.url}${url(slug)}` },
  author: { '@id': `${SITE.url}/#organization` },
  publisher: { '@id': `${SITE.url}/#organization` },
  isAccessibleForFree: true,
});

const graph = (nodes) => ({ '@context': 'https://schema.org', '@graph': nodes.filter(Boolean) });

// ---------- shared blocks ----------
const trustBar = () =>
  '<div class="trust-bar"><div class="wrap">' +
  '<span><i>' + ICONS.search + '</i>Research-based, sources cited</span>' +
  '<span><i>' + ICONS.shield + '</i>No paid placements</span>' +
  '<span><i>' + ICONS.check + '</i>Independently owned</span>' +
  '<span><i>' + ICONS.clock + '</i>Reviewed ' + BUILD_DATE + '</span>' +
  '</div></div>';
const faqBlock = (faq = []) =>
  faq.length
    ? `<section class="faq"><h2>Frequently asked questions</h2>${faq
        .map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`)
        .join('')}</section>`
    : '';

const authorBox = `<aside class="author-box"><div class="avatar" aria-hidden="true">LM</div><div><strong>${esc(
  SITE.author
)}</strong><p>Research-based reviews of lead generation and cold outreach software. Every factual claim is cited to its source, and no testing claims are made that we have not performed. <a href="${url(
  'how-we-research'
)}">How we research →</a></p></div></aside>`;

const metaLine = `<p class="meta-line">Reviewed ${BUILD_DATE} · Research-based · Sources cited</p>`;

// ---------- responsive table enhancement ----------
// Wide data tables cannot shrink below their content on a phone, which forces the
// whole page to scroll sideways. Wrap each table for horizontal scroll on tablets and
// stamp data-label on every cell so it can restack as a card list on small screens.
const enhanceTables = (html) =>
  html.replace(/<table>([\s\S]*?)<\/table>/g, (match, inner) => {
    const heads = [...inner.matchAll(/<th[^>]*>([\s\S]*?)<\/th>/g)].map((m) =>
      m[1].replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').trim()
    );
    const stamped = inner.replace(/<tr>([\s\S]*?)<\/tr>/g, (row, cells) => {
      if (/<th[\s>]/.test(cells)) return row; // leave the header row alone
      let i = 0;
      return (
        '<tr>' +
        cells.replace(/<td([^>]*)>([\s\S]*?)<\/td>/g, (whole, attrs, content) => {
          const label = (heads[i++] || '').replace(/"/g, '&quot;');
          return `<td${attrs} data-label="${label}">${content}</td>`;
        }) +
        '</tr>'
      );
    });
    return `<div class="table-scroll"><table>${stamped}</table></div>`;
  });

// ---------- page assembly ----------
const words = (html) =>
  String(html)
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean).length;

const NO_NOTICE = ['about', 'contact', 'affiliate-disclosure', 'privacy-policy', 'how-we-research'];

const pageHtml = (slug, item) => {
  const title = `${item.title} | ${SITE.name}`;
  const canonical = `${SITE.url}${url(slug)}`;
  const body = enhanceTables(shortcodes(item.content));
  const wc = words(body) + words(faqBlock(item.faq));
  return `${header({
    title,
    description: item.description,
    canonical,
    jsonld: [
      graph([
        orgNode,
        siteNode,
        breadcrumbNode(item.title, slug),
        articleNode(item.title, item.description, slug, wc),
        faqNode(item.faq),
      ]),
    ],
  })}
<article class="wrap article"><nav class="breadcrumb" aria-label="Breadcrumb"><a href="${url()}">Home</a> / <span>${
    esc(item.title)
  }</span></nav><h1>${esc(item.title)}</h1>${
    NO_NOTICE.includes(slug)
      ? ''
      : `<p class="notice">Some links may be affiliate links. We may earn a commission at no extra cost to you. <a href="${url(
          'affiliate-disclosure'
        )}">Learn more</a>.</p>`
  }${trustBar()}${slug === 'affiliate-disclosure' || slug === 'privacy-policy' ? '' : metaLine}<div class="content">${body}</div>${
    slug === 'affiliate-disclosure' || slug === 'privacy-policy' || slug === 'contact' ? '' : authorBox
  }${faqBlock(item.faq)}</article>${footer()}`;
};

const homeHtml = () => {
  const item = content.home;
  const title = `${item.title} | ${SITE.name}`;
  const canonical = `${SITE.url}/`;
  const sections = `
<section class="hero"><div class="wrap hero-grid"><div><span class="eyebrow">Independent insights for smarter outreach</span><h1>Find the right leads.<br><em>Choose the right tools.</em></h1><p>Honest reviews, practical comparisons, and straightforward guides to help you build a better outreach workflow — without the guesswork.</p><div class="hero-actions"><a class="button" href="${url(
    'snov-io-review'
  )}">Read the Snov.io review <span>→</span></a><a class="button outline" href="${url(
    'guides'
  )}">Explore the guides</a></div><div class="trust"><span>Independent perspective</span><span>Pros &amp; cons, clearly explained</span><span>Sources cited</span></div></div><div class="verdict"><div class="top"><span>In the spotlight</span><span class="pill">FEATURED REVIEW</span></div><h3>Snov.io, explained.</h3><p>One workspace for finding, verifying, and reaching out to prospects. But is it the right fit for you?</p><ul><li>Email finding and verification</li><li>Drip campaigns and warm-up</li><li>Credit maths, explained</li></ul><a class="button" href="${url(
    'snov-io-review'
  )}">See the full review →</a><p style="font-size:11px;text-align:center;margin:12px 0 0">Affiliate links help support this site.</p></div></div></section>
${trustBar()}

<section class="section"><div class="wrap feature"><div><span class="tag">The starting point</span><h2>Better outreach starts with better information.</h2><p>Tools should make your work simpler, not add to the noise. We break down what matters, where a tool may fall short, and who it's best suited for — then cite where every figure came from.</p><a class="button outline" href="${url(
    'how-we-research'
  )}">How we research →</a></div><div class="feature-box"><span class="tag">Featured tool / 01</span><div class="big">Snov.io</div><p>Email finder, verifier, drip campaigns and a lightweight CRM — one credit-based subscription.</p><p><a href="${url(
    'snov-io-review'
  )}"><strong>Read the review →</strong></a></p></div></div></section>

<section class="section soft"><div class="wrap"><div class="section-head"><div><span class="tag">Make the comparison</span><h2>Find your best fit.</h2></div><p>Different tools work for different workflows. Start with the questions that change your bill.</p></div><div class="grid">${[
    ['01', 'Snov.io vs Hunter.io', 'All-in-one workflow or a focused, cheaper email finder?', 'snov-io-vs-hunter-io'],
    ['02', 'Snov.io vs Apollo.io', 'Credit-based suite or the largest searchable database?', 'snov-io-vs-apollo'],
    ['03', 'Snov.io alternatives', 'Seven options compared on price, coverage and fit.', 'snov-io-alternatives'],
  ]
    .map(
      ([n, t, d, s]) =>
        `<a class="card" href="${url(s)}"><span class="icon">${n}</span><h3>${t}</h3><p>${d}</p><span class="arrow">Explore comparison →</span></a>`
    )
    .join('')}</div></div></section>

<section class="section"><div class="wrap"><div class="panel-fig"><div><span class="tag">The cost nobody shows you</span><h2>A "lead" costs two credits, not one.</h2><p>Finding an address spends a credit. Verifying it spends another. So a 1,000-credit plan yields roughly 500 contacts you can actually email — and the entry tier works out about five times more expensive per contact than the largest.</p><p><a href="${url('snov-io-pricing')}"><strong>See the full cost breakdown →</strong></a></p></div><div>${figureHtml('credits-pipeline')}</div></div></div></section>

<section class="section soft"><div class="wrap"><div class="section-head"><div><span class="tag">Made for the way you work</span><h2>Good leads, for every team.</h2></div><p>Whether you're working solo or growing an agency, find a workflow that fits.</p></div><div class="grid four">${[
    ['✳', 'Freelancers', 'Find relevant prospects without adding complexity.'],
    ['↗', 'Agencies', 'Build repeatable prospecting workflows for clients.'],
    ['◎', 'Recruiters', 'Connect with potential candidates thoughtfully.'],
    ['↔', 'Link builders', 'Find the right contacts for relevant outreach.'],
  ]
    .map(
      ([i, t, d]) => `<div class="card"><span class="icon">${i}</span><h3>${t}</h3><p>${d}</p></div>`
    )
    .join('')}</div></div></section>

<section class="section"><div class="wrap"><div class="section-head"><div><span class="tag">The practical library</span><h2>Learn, then put it to work.</h2></div><a href="${url('guides')}"><strong>All guides →</strong></a></div><div class="grid">${[
    ['GUIDE', 'How to find professional email addresses', 'Pattern the domain, then verify before you ever send.', 'how-to-find-email-addresses'],
    ['DELIVERABILITY', 'How to verify emails in bulk', 'What each result means, and the bounce thresholds to hold.', 'verify-email-addresses-in-bulk'],
    ['OUTREACH', 'Cold email for beginners', 'Authentication, warm-up, sequences, and the metrics that matter.', 'cold-email-outreach'],
  ]
    .map(
      ([tag, t, d, s]) =>
        `<a class="card" href="${url(s)}"><span class="tag">${tag}</span><h3>${t}</h3><p>${d}</p><span class="arrow">Read the guide →</span></a>`
    )
    .join('')}</div></div></section>

<section class="section soft"><div class="wrap"><div class="section-head"><div><span class="tag">Our approach</span><h2>Clarity over the hype.</h2></div><p>Choosing software shouldn't require deciphering a sales pitch.</p></div><div class="grid steps"><div class="card"><span class="icon">01</span><h3>Read the primary source</h3><p>We start with the provider's own pricing and feature documentation, and treat marketing claims as claims.</p></div><div class="card"><span class="icon">02</span><h3>Cross-check independently</h3><p>Every price and coverage figure is checked against third-party reviews. When sources disagree, we show the range.</p></div><div class="card"><span class="icon">03</span><h3>Show the maths</h3><p>Cost per verified lead, per-seat versus per-credit. We publish the working so you can check it.</p></div></div></div></section>

<section class="section soft"><div class="wrap"><div class="article-faq">${faqBlock(item.faq)}</div></div></section>

<section class="section"><div class="wrap feature"><div><span class="tag">Ready to explore?</span><h2>Make your next move a confident one.</h2><p>Start with our Snov.io review, or work out the real cost first.</p></div><div>${button(
    'Explore Snov.io'
  )} <p style="font-size:12px;margin-top:12px">Affiliate link. We may earn a commission at no extra cost to you.</p></div></div></section>`;

  return `${header({
    title,
    description: item.description,
    canonical,
    ogType: 'website',
    jsonld: [
      graph([
        orgNode,
        { ...siteNode, potentialAction: { '@type': 'ReadAction', target: [`${SITE.url}/`] } },
        faqNode(item.faq),
      ]),
    ],
  })}${sections}${footer()}`;
};

// ---------- write theme content.json ----------
const themeData = {};
for (const [slug, item] of Object.entries(content)) {
  if (slug === 'SITE') continue;
  themeData[slug] = {
    title: item.title,
    description: item.description,
    content: item.content.trim(),
    faq: item.faq || [],
  };
}
fs.writeFileSync(path.join(THEME, 'content.json'), JSON.stringify(themeData, null, 2) + '\n');

// ---------- write static preview ----------
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
fs.copyFileSync(path.join(THEME, 'style.css'), path.join(OUT, 'style.css'));
// Diagrams: written to the theme (for WordPress) and copied into the static build.
fs.mkdirSync(FIG_DIR, { recursive: true });
fs.mkdirSync(path.join(OUT, 'figures'), { recursive: true });
const figureManifest = {};
for (const [slug, f] of Object.entries(FIGURES)) {
  fs.writeFileSync(path.join(FIG_DIR, `${slug}.svg`), f.svg);
  fs.copyFileSync(path.join(FIG_DIR, `${slug}.svg`), path.join(OUT, 'figures', `${slug}.svg`));
  figureManifest[slug] = { alt: f.alt, caption: f.caption || '', w: f.w, h: f.h };
}
fs.writeFileSync(path.join(FIG_DIR, 'figures.json'), JSON.stringify(figureManifest, null, 2) + '\n');

// Social card used by the og:image / twitter:image tags.
const ogSource = path.join(THEME, 'og-image.png');
if (fs.existsSync(ogSource)) fs.copyFileSync(ogSource, path.join(OUT, 'og-image.png'));
fs.writeFileSync(path.join(OUT, 'index.html'), homeHtml());

const sitemapEntries = [['', BUILD_DATE]];
for (const [slug, item] of Object.entries(themeData)) {
  if (slug === 'home') continue;
  const dir = path.join(OUT, slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), pageHtml(slug, item));
  sitemapEntries.push([slug, BUILD_DATE]);
}

fs.writeFileSync(
  path.join(OUT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries
    .map(
      ([s, d]) =>
        `  <url>\n    <loc>${SITE.url}/${s ? s + '/' : ''}</loc>\n    <lastmod>${d}</lastmod>\n    <changefreq>${s ? 'monthly' : 'weekly'}</changefreq>\n    <priority>${s ? '0.7' : '1.0'}</priority>\n  </url>`
    )
    .join('\n')}\n</urlset>\n`
);
fs.writeFileSync(
  path.join(OUT, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`
);

console.log(
  `Built ${sitemapEntries.length} pages + sitemap + robots into ${OUT}; theme content.json written (${Object.keys(themeData).length} entries).`
);
