LEADS MANIA — WORDPRESS THEME
Version 1.1 — SEO-complete build

INSTALLATION
1. In WordPress, go to Appearance > Themes > Add New > Upload Theme.
2. Upload leads-mania-theme.zip and activate it. Requires a self-hosted WordPress installation or a WordPress.com plan that permits custom themes.
3. On activation, the theme creates the Home, review, comparisons, pricing, alternatives, guides, methodology and trust pages if their slugs do not already exist. Existing pages with the same slugs are not overwritten. If your site already has a static front page, the theme does not change it. To use the new homepage, choose Settings > Reading > A static page > Home.
4. Go to Settings > Permalinks and save if links need refreshing.
5. Internal links and affiliate buttons in editable page content use [url:page-slug] and [affiliate:Button text]. The affiliate URL is set in functions.php.
6. This theme is intended for a new site; back up an existing site before activating. Deactivating the theme does not delete the created pages.

WHAT THE THEME OUTPUTS IN <head>
- Per-page meta description, sourced from the _lm_description post meta seeded from content.json.
- Self-referencing rel="canonical" on every page (WordPress's default canonical is removed).
- Open Graph and Twitter summary_large_image tags, using og-image.png (1200x630) in the theme root.
- JSON-LD @graph on every page: Organization, WebSite, BreadcrumbList, Article, and FAQPage.
- robots meta directive allowing large image previews and full snippets.
- robots.txt: appends a Sitemap line pointing at WordPress core sitemaps (/wp-sitemap.xml).
- The front page uses its SEO title from content.json instead of the WordPress page title "Home".

FAQ PAGES
Each entry in content.json may carry a "faq" array of {"q": "...", "a": "..."} objects. The theme renders a visible
FAQ section from that array and emits FAQPage structured data from the same source, so the markup can never drift from
the visible text — which is a requirement of Google's structured data policies. Edit the copy in content.json and
re-seed, or edit the FAQ section on the page directly.

DELIBERATELY NOT INCLUDED
- Review / AggregateRating schema. The site has not tested these products, so publishing a rating would be a
  fabrication and a structured-data policy violation. Do not add one unless you actually test the products.
- Fake publish or update dates. The theme uses real WordPress post dates.
- Fake author personas. The byline is "Leads Mania Editorial", which matches the research-based methodology page.

BEFORE LAUNCH — REQUIRED
- Add a real contact method to the Contact page. It currently contains a visible placeholder.
- Customize the About page and confirm the organisation details.
- Privacy Policy is a draft, not legal advice. Customize for your actual hosting, analytics and affiliate setup, and
  obtain legal review.
- Verify every product description, price, plan term and affiliate program detail against the providers. Prices are
  published as ranges because third-party sources disagree; they must be re-checked before launch and periodically
  after.
- The affiliate link https://snov.io?fp_ref=mrck20 is marked sponsored/nofollow/noopener. Confirm affiliate disclosure
  and consent mechanisms satisfy your jurisdiction.
- Replace og-image.png if you rebrand; keep it at 1200x630.
- No analytics, signup forms, external fonts or SEO plugin are bundled. If you install an SEO plugin, disable this
  theme's description/canonical/robots output or you will emit duplicates. WordPress core sitemaps already cover
  indexing, so a sitemap plugin is optional.
- Test desktop, mobile, links and theme/plugin compatibility before publishing.
