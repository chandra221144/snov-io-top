// Single source of truth for all site content.
// Shape: slug -> { title, description, content (HTML), faq: [{q, a}] }
const money = require('./money');
const comparisons = require('./comparisons');
const guides = require('./guides');
const site = require('./site');

const all = { ...site, ...money, ...comparisons, ...guides };

// Clean the odd apostrophe variants and normalise whitespace inside HTML text nodes only.
module.exports = all;
module.exports.SITE = {
  name: 'Leads Mania',
  tagline: 'Independent reviews and guides for lead generation and cold email tools',
  author: 'Leads Mania Editorial',
  locale: 'en_US',
  // Set SITE_URL at build time to your production domain so canonicals are correct.
  url: (process.env.SITE_URL || 'http://localhost:8080').replace(/\/$/, ''),
};
