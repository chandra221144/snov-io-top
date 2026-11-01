// Hand-authored explanatory diagrams. SVG so they stay crisp, tiny and accessible.
// These illustrate concepts we already explain in text — no invented product screenshots.
const F = {
  font: `font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif`,
  navy: '#0f1b4c',
  blue: '#2455e6',
  red: '#d93a40',
  green: '#16a34a',
  amber: '#d97706',
  grey: '#64748b',
  line: '#c7d2e8',
  light: '#f3f6ff',
};

const wrap = (w, h, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" style="max-width:100%;height:auto">${body}</svg>`;

const txt = (x, y, s, o = '') =>
  `<text x="${x}" y="${y}" font-family="${F.font}" font-size="${o.size || 14}" fill="${o.fill || F.navy}" font-weight="${o.weight || 500}" text-anchor="${o.anchor || 'start'}"${o.ls ? ` letter-spacing="${o.ls}"` : ''}>${s}</text>`;

const box = (x, y, w, h, o = '') =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.rx || 10}" fill="${o.fill || '#fff'}" stroke="${o.stroke || F.line}" stroke-width="${o.sw || 1.5}"${o.dash ? ' stroke-dasharray="5 5"' : ''}/>`;

const arrow = (x1, y1, x2, y2, o = '') =>
  `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${o.stroke || F.line}" stroke-width="${o.sw || 2}" fill="none" marker-end="url(#${o.marker || 'ah'})"/>`;

const defs = `<defs>
<marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="${F.line}"/></marker>
<marker id="ahb" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="${F.blue}"/></marker>
</defs>`;

const figures = {
  /* 1 — the credit pipeline. The single most useful diagram on the site. */
  'credits-pipeline': {
    w: 800,
    h: 250,
    alt: 'Diagram showing that finding an email costs one Snov.io credit and verifying it costs another, so one usable verified contact costs about two credits.',
    caption:
      'How credits turn into usable contacts. One credit finds an address, a second verifies it — so a finished contact costs about two credits.',
    svg: wrap(
      800,
      250,
      defs +
        txt(400, 28, 'One verified contact = about 2 credits', { size: 16, weight: 750, anchor: 'middle' }) +
        // step 1
        box(24, 58, 210, 96) +
        txt(44, 86, '1. FIND', { size: 11, weight: 800, fill: F.blue, ls: '1' }) +
        txt(44, 112, 'Email address', { size: 16, weight: 700 }) +
        txt(44, 134, '− 1 credit', { size: 14, fill: F.grey }) +
        // arrow 1
        arrow(240, 106, 288, 106, { stroke: F.blue, marker: 'ahb' }) +
        // step 2
        box(294, 58, 210, 96) +
        txt(314, 86, '2. VERIFY', { size: 11, weight: 800, fill: F.blue, ls: '1' }) +
        txt(314, 112, 'Is it deliverable?', { size: 16, weight: 700 }) +
        txt(314, 134, '− 1 credit', { size: 14, fill: F.grey }) +
        // arrow 2
        arrow(510, 106, 558, 106, { stroke: F.blue, marker: 'ahb' }) +
        // result
        `<rect x="564" y="58" width="212" height="96" rx="10" fill="${F.navy}"/>` +
        txt(584, 86, 'RESULT', { size: 11, weight: 800, fill: '#8caaff', ls: '1' }) +
        txt(584, 112, '1 verified contact', { size: 16, weight: 750, fill: '#fff' }) +
        txt(584, 134, '= 2 credits total', { size: 14, fill: '#c3cff0' }) +
        // consequence
        box(24, 178, 752, 46, { fill: F.light, stroke: '#dfe6ff' }) +
        txt(44, 206, 'So a 1,000-credit Starter plan yields roughly 500 fully verified contacts — not 1,000.', {
          size: 14,
          fill: '#31406b',
          weight: 600,
        })
    ),
  },

  /* 2 — cost per verified lead by plan (calculated from cited prices). */
  'cost-per-lead': {
    w: 800,
    h: 300,
    alt: 'Bar chart of approximate cost per verified lead by Snov.io plan: about 8 cents on Starter falling to about 1.5 cents on the largest tier.',
    caption:
      'Approximate cost per verified contact, calculated as plan price ÷ half the credit allowance. Higher tiers are roughly five times cheaper per contact.',
    svg: wrap(
      800,
      300,
      defs +
        txt(24, 30, 'Approximate cost per verified contact', { size: 15, weight: 750 }) +
        txt(24, 50, 'Calculated from published plan prices; each contact costs about 2 credits.', { size: 12, fill: F.grey }) +
        (() => {
          // [plan label, price per verified contact, relative bar length]
          const rows = [
            ['Starter ~$39', '~$0.08', 430],
            ['Pro 5K ~$99', '~$0.04', 215],
            ['Pro 20K ~$189', '~$0.02', 108],
            ['Pro 50K ~$369', '~$0.015', 81],
          ];
          let out = '';
          rows.forEach((r, i) => {
            const y = 84 + i * 50;
            const w = Math.max(r[2], 10);
            out += txt(24, y + 20, r[0], { size: 13, weight: 650 });
            out += `<rect x="200" y="${y}" width="${w}" height="28" rx="5" fill="${
              i === 0 ? F.red : F.blue
            }" opacity="${1 - i * 0.15}"/>`;
            out += txt(200 + w + 12, y + 19, r[1], { size: 13, weight: 750, fill: F.navy });
          });
          out += txt(24, 288, 'Figures are approximate and change with plan revisions — confirm current pricing with the provider.', {
            size: 11,
            fill: F.grey,
          });
          return out;
        })()
    ),
  },

  /* 3 — verification result outcomes. */
  'verification-results': {
    w: 800,
    h: 330,
    alt: 'Flow diagram of email verification outcomes: valid addresses are safe to send, invalid should be deleted, catch-all should be limited, and unknown should be retried rather than treated as valid.',
    caption:
      'What verification actually returns. Only "valid" is safe to send freely; catch-all and unknown are the two results that quietly damage deliverability.',
    svg: wrap(
      800,
      330,
      defs +
        txt(400, 26, 'Email verification outcomes', { size: 15, weight: 750, anchor: 'middle' }) +
        box(300, 46, 200, 58, { fill: F.light, stroke: '#dfe6ff' }) +
        txt(400, 72, 'Email address', { size: 15, weight: 700, anchor: 'middle' }) +
        txt(400, 92, 'syntax · DNS · SMTP', { size: 11, fill: F.grey, anchor: 'middle' }) +
        arrow(400, 104, 400, 132, { stroke: F.blue, marker: 'ahb' }) +
        // four outcomes
        [{ x: 20, label: 'VALID', note: 'Mailbox exists', act: 'Send freely', c: F.green },
         { x: 213, label: 'INVALID', note: 'No such mailbox', act: 'Delete \u2014 never send', c: F.red },
         { x: 406, label: 'CATCH-ALL', note: 'Accepts everything', act: 'Cap or exclude', c: F.amber },
         { x: 599, label: 'UNKNOWN', note: 'Server refused', act: 'Retry, do not send', c: F.grey }]
          .map((o) =>
            arrow(400, 132, o.x + 90, 158, { stroke: F.line }) +
            box(o.x, 158, 181, 128) +
            `<rect x="${o.x}" y="158" width="181" height="6" rx="3" fill="${o.c}"/>` +
            txt(o.x + 90, 190, o.label, { size: 12, weight: 800, fill: o.c, anchor: 'middle', ls: '1' }) +
            txt(o.x + 90, 218, o.note, { size: 12.5, fill: F.grey, anchor: 'middle' }) +
            txt(o.x + 90, 258, o.act, { size: 13, weight: 700, anchor: 'middle' })
          ).join('') +
        txt(400, 316, 'Snov.io charges a credit for valid and invalid results; unknown results are not charged.', {
          size: 11,
          fill: F.grey,
          anchor: 'middle',
        })
    ),
  },

  /* 4 — the deliverability stack, to show verification is only one layer. */
  'deliverability-stack': {
    w: 800,
    h: 300,
    alt: 'Stack diagram showing four layers that decide inbox placement — SPF DKIM and DMARC authentication, domain warm-up, list quality, and engagement — with verification covering only the list quality layer.',
    caption:
      'Verification only fixes one layer. Inbox placement depends on authentication, warm-up, list quality and engagement together.',
    svg: wrap(
      800,
      300,
      defs +
        txt(24, 28, 'What actually decides inbox placement', { size: 15, weight: 750 }) +
        [['Authentication', 'SPF \u00b7 DKIM \u00b7 DMARC published for the sending domain', F.navy, 'Required'],
         ['Warm-up', 'Gradual volume increase on a new domain or mailbox', F.blue, 'Weeks, not days'],
         ['List quality', 'Verified addresses; catch-all capped; traps removed', F.green, 'Verification helps here'],
         ['Engagement', 'Replies, complaints and unsubscribes over time', F.amber, 'Ongoing']]
          .map((l, i) => {
            const y = 52 + i * 54;
            const highlight = l[2] === F.green;
            return (
              box(24, y, 752, 44, { fill: highlight ? '#f0fdf4' : '#fff', stroke: highlight ? '#bbf7d0' : F.line }) +
              `<rect x="24" y="${y}" width="6" height="44" rx="3" fill="${l[2]}"/>` +
              txt(46, y + 21, l[0], { size: 14, weight: 750 }) +
              txt(46, y + 37, l[1], { size: 11.5, fill: F.grey }) +
              txt(758, y + 27, l[3], { size: 11, weight: 700, fill: l[2], anchor: 'end' })
            );
          }).join('')
    ),
  },

  /* 5 — email pattern reading. */
  'email-patterns': {
    w: 800,
    h: 280,
    alt: 'Table of common business email address patterns such as first.last and first initial plus last name, with an example address for each.',
    caption:
      'Reading a domain’s address pattern from one confirmed address is faster than guessing. Verify per address — patterns can differ by office.',
    svg: wrap(
      800,
      280,
      defs +
        txt(24, 28, 'Common business email patterns', { size: 15, weight: 750 }) +
        [['first.last@', 'jane.doe@company.com', 'Most common in larger organisations'],
         ['first@', 'jane@company.com', 'Small companies and startups'],
         ['flast@ / f.last@', 'jdoe@company.com', 'Common in EU and APAC'],
         ['first_last@', 'jane_doe@company.com', 'Legacy systems, mid-size firms'],
         ['role@', 'sales@company.com', 'Shared inbox \u2014 avoid for 1:1 outreach']]
          .map((r, i) => {
            const y = 54 + i * 44;
            return (
              box(24, y, 752, 36, { fill: i % 2 ? '#fff' : F.light, stroke: '#e5e9f5' }) +
              `<text x="42" y="${y + 23}" font-family="ui-monospace,SFMono-Regular,Menlo,monospace" font-size="13" font-weight="700" fill="${F.blue}">${r[0]}</text>` +
              `<text x="220" y="${y + 23}" font-family="ui-monospace,SFMono-Regular,Menlo,monospace" font-size="12.5" fill="${F.navy}">${r[1]}</text>` +
              txt(420, y + 23, r[2], { size: 11.5, fill: F.grey })
            );
          }).join('')
    ),
  },
};

module.exports = figures;
