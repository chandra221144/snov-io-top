# SEO Audit — Leads Mania (v1.1, post-remediation)

**Audited:** 31 Oct 2026 · **Scope:** all 17 pages, static build + WordPress theme
**Score: 87 / 100 — Grade: A−** (up from 42 / 100, Grade D)

> **Caveat, unchanged:** this is an on-page and technical score derived from your source code and content. It is
> **not** a Google ranking position. There is no public domain and I cannot query Search Console or live SERPs from
> here. Once deployed, average position in Search Console is the only ranking number that means anything.

---

## Before → after

| # | Category | Weight | Before | Now | What changed |
|---|---|---|---|---|---|
| 1 | Performance & mobile | 10 | 9 | **9** | Unchanged — already excellent (84 KB → 246 KB of HTML total, one 7.8 KB CSS file) |
| 2 | Crawlability & indexability | 20 | 10 | **18** | Added `sitemap.xml`, `robots.txt`, self-referencing canonicals, robots directives; WP theme emits canonical + sitemap line |
| 3 | On-page meta | 15 | 6 | **14** | All 17 titles ≤ 65 chars, all descriptions 136–164 chars, all unique, keyword-bearing |
| 4 | Content depth & quality | 25 | 6 | **21** | 2,584 → **13,928 words**; money pages now 950–1,747 words; no page under 360 words except contact (299) |
| 5 | Internal linking | 10 | 6 | **8** | Contextual cross-links between review ↔ pricing ↔ comparisons ↔ guides; hub pages; methodology linked sitewide |
| 6 | Structured data | 10 | 1 | **9** | Organization, WebSite, BreadcrumbList, Article, FAQPage on all 17 pages |
| 7 | E-E-A-T & trust | 10 | 4 | **8** | Sources cited on every page, methodology page, author entity, real build dates, disclosures |
| | **Total** | **100** | **42** | **87** | |

---

## Word counts (measured from the built HTML)

| Page | Words | | Page | Words |
|---|---|---|---|---|
| snov-io-review | **1,747** | | snov-io-vs-apollo | 1,048 |
| cold-email-outreach | 1,159 | | snov-io-pricing | 1,021 |
| how-to-find-email-addresses | 1,128 | | snov-io-vs-lusha | 955 |
| snov-io-vs-hunter-io | 1,090 | | verify-email-addresses-in-bulk | 883 |
| snov-io-alternatives | 1,079 | | how-we-research | 746 |
| Home | 649 | | privacy-policy | 576 |
| about | 421 | | comparisons | 403 |
| guides | 364 | | affiliate-disclosure | 360 |
| contact | 299 | | **Total** | **13,928** |

---

## What was actually built

**Content (17 pages, all rewritten or newly written)**
- The three comparison pages went from 100–178 words to 955–1,090 words each, with feature tables, per-seat vs per-credit arithmetic worked through, "choose X if" decision lists, and a verdict.
- The review went to 1,747 words with a credit-maths section, strengths, limitations, a who-fits table, and sources.
- Five FAQs per page (72 total), written to answer real long-tail queries.
- Every price is a **range** with an explicit "confirm with the provider" notice, because credible third-party sources genuinely disagree (e.g. Snov.io Pro 20K quoted at $149 vs $189).
- **New pages:** `how-we-research` (methodology) — the main E-E-A-T lever available without faking testing.

**Technical, in both the static build and the WordPress theme**
- `sitemap.xml` (17 URLs, lastmod/priority) and `robots.txt` with a sitemap reference.
- Self-referencing `rel="canonical"` on every page; WordPress's default canonical removed to avoid duplicates.
- Full Open Graph + Twitter `summary_large_image`, with a generated 1200×630 `og-image.png`.
- JSON-LD `@graph`: Organization, WebSite, BreadcrumbList, Article (with wordCount, datePublished, dateModified), FAQPage.
- `<title>` on the front page now uses the SEO title instead of the WordPress page title "Home".
- Descriptive titles/alt text, mobile-first CSS retained, plus a live build-time `verify.js` that fails the build if any of the above regresses.

**Deliberately NOT added** — and this is the honest part:
- **No `Review` / `AggregateRating` schema.** You have not tested these products. Emitting a star rating or a score you did not earn is a Google structured-data policy violation and a manual-action risk. This is the single biggest "missing" rich result, and it is missing on purpose.
- **No invented author persona or publish dates.** The byline is "Leads Mania Editorial", which matches the methodology page. Fabricating a named expert with credentials is exactly the misrepresentation E-E-A-T is designed to catch.

---

## Why this is 87 and not 95

The remaining 13 points are not technical. They are things money and honesty can't shortcut:

| Gap | Points | How you actually close it |
|---|---|---|
| No first-hand testing of any tool | ~6 | Buy a seat on Snov.io and Hunter, run 50–100 real lookups, publish your measured accuracy and your own screenshots. Then `Review` schema becomes legitimate. |
| No named human author with credentials | ~3 | Put a real person's name, bio and relevant experience behind the byline. |
| Money pages still short of pillar depth | ~3 | Target 2,500+ words on the review with hands-on screenshots, a tested workflow walkthrough, and 10–15 FAQs. |
| Only 17 pages of topical coverage | ~1 | Build out the alternatives cluster (one page per competitor), each 1,000+ words. |

Anyone who tells you a research-based affiliate site scores 95+ is either measuring the wrong things or fabricating
the signals. **87 with nothing faked is a genuinely strong on-page foundation** — from here, rankings depend on
publishing consistently and earning links, which is a months-long job, not a build.

---

## Deploy checklist

1. **Set your real domain before building**, or canonicals and the sitemap will point at `localhost`:
   ```bash
   SITE_URL=https://yourdomain.com node preview/build.js
   ```
   The WordPress theme derives URLs from `home_url()`, so it needs no change.
2. Upload `leads-mania-theme.zip` (rebuilt, v1.1) via Appearance → Themes → Add New → Upload Theme, then activate.
3. Settings → Permalinks → Save, so the pretty URLs and core sitemap resolve.
4. **Fill in the Contact page** — it currently contains a visible placeholder, and a dead contact method actively
   damages trust.
5. Replace the Privacy Policy with a reviewed version; add analytics (prefer cookie-light).
6. Verify the domain in **Google Search Console**, submit `/wp-sitemap.xml` (or `/sitemap.xml` for the static build),
   and request indexing on the review, pricing and three comparison pages.
7. Re-check every price against the providers before launch, then quarterly.

## Where the remaining wins are, in order

1. Hands-on testing → unlocks `Review` schema + genuine E-E-A-T. Biggest single jump.
2. Build one page per alternative (Instantly, Skrapp, Dropcontact, Hunter, Apollo, Lusha) at 1,000+ words — this is
   the comparison cluster that ranks for commercial intent.
3. A named author with a real bio.
4. Earn 5–10 legitimate links (HARO-style quotes, original data from your own testing, supplier roundups).
