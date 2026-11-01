// Practical guides plus the two hub pages.
module.exports = {
  'how-to-find-email-addresses': {
    title: 'How to Find Professional Email Addresses in 2026',
    description:
      'A step-by-step guide to finding verified professional email addresses: pattern inference, catch-all domains, verification order and the legal rules to respect.',
    content: `
<blockquote><strong>Quick take:</strong> Finding emails is a three-step loop — identify the pattern, test candidate addresses, then verify before sending. Skipping the third step is the single most common cause of bounced campaigns and burned sending domains.</blockquote>
<p>This guide is method-based rather than tool-based: the same process works whether you use Snov.io, Hunter.io, Apollo or a manual approach. Where a tool helps, we say so without pretending it replaces judgement.</p>

<h2>Step 1: Understand email address patterns</h2>
<p>Almost all business addresses follow a small number of conventions built from a first name, a last name and a company domain. Learning to read the pattern on a domain is faster than blind searching.</p>
<ul>
  <li><code>first.last@company.com</code> — most common in larger, English-speaking organisations</li>
  <li><code>first@company.com</code> — common in small companies and startups</li>
  <li><code>f.last@company.com</code> or <code>firstl@company.com</code> — common in Europe and Asia</li>
  <li><code>first_last@company.com</code> — common in mid-size firms with legacy systems</li>
  <li><code>role@company.com</code> — <code>sales@</code>, <code>info@</code>, <code>support@</code>; real but usually a shared inbox</li>
</ul>
[fig:email-patterns]
<p>To identify a domain's pattern, find one address you already know is correct — a press contact, a support address, a name in a public filing — and compare it to that person's name. One confirmed address usually reveals the convention for the whole company.</p>
<p class="notice">Trap: a company may use different patterns for different offices, or for acquisitions. Verify per address, not per company.</p>

<h2>Step 2: Gather candidate addresses without guessing wildly</h2>
<p>Pattern inference gets you a candidate; it does not get you a contact. Combine several sources so you are selecting from evidence rather than inventing strings:</p>
<ol>
  <li><strong>Company team and about pages.</strong> Names, titles and sometimes direct addresses. Free and reliable.</li>
  <li><strong>Public documents.</strong> Filings, press releases, conference programmes and PDFs often contain addresses that marketing pages omit.</li>
  <li><strong>Professional profiles.</strong> Titles confirm the person exists and tell you whether they are the right decision-maker.</li>
  <li><strong>Email finder tools.</strong> Domain search returns the pattern plus known addresses; person search returns candidates with a confidence score.</li>
  <li><strong>Verification of the domain's mail setup.</strong> Check whether the domain publishes SPF and DMARC records — a well-configured domain is easier to verify against.</li>
</ol>

<h2>Step 3: Verify before you send</h2>
<p>Verification is not optional. A finder returns a candidate and a confidence estimate; a verifier tells you whether the mailbox will accept mail. The results you will see:</p>
<ul>
  <li><strong>Valid</strong> — the mailbox exists and accepts mail. Send.</li>
  <li><strong>Invalid</strong> — the mailbox does not exist. Discard immediately; sending guarantees a hard bounce.</li>
  <li><strong>Accept-all / catch-all</strong> — the server accepts every address, so existence cannot be proven. These are the risky middle. Treat them as unverified and expect a higher bounce rate if you mail them at volume.</li>
  <li><strong>Unknown / greylisted</strong> — the server refused to answer. Retry later; do not assume valid.</li>
  <li><strong>Disposable / role-based</strong> — technically deliverable but low-value for one-to-one outreach.</li>
</ul>
<p>A reasonable working policy: send freely to verified valid, drop invalid, and cap catch-all addresses to a small share of any single campaign so one batch cannot wreck your domain reputation.</p>

<h2>Step 4: Order your work to save money</h2>
<p>Most tools charge for both finding and verifying — Snov.io, for instance, consumes roughly two credits per finished contact. That makes the order of operations a budget decision:</p>
<ol>
  <li><strong>Qualify the account first.</strong> Confirm the company fits your criteria before spending a credit on anyone there.</li>
  <li><strong>Find the decision-maker, not the first name you see.</strong> One verified address for the right person beats five for the wrong ones.</li>
  <li><strong>Verify in a batch, not one by one.</strong> Bulk verification lets you drop invalid addresses before they reach a campaign.</li>
  <li><strong>Re-verify old lists.</strong> A list built six months ago has decayed. Job changes and company shutdowns are constant.</li>
</ol>

<h2>Step 5: Know the legal boundaries</h2>
<p>How you obtained an address determines whether you may email it. Two frameworks dominate:</p>
<ul>
  <li><strong>GDPR (EU/UK)</strong> — B2B outreach generally requires a lawful basis, most often legitimate interests, plus a clear identity, a stated purpose and an easy opt-out in every message. Corporate addresses are still personal data.</li>
  <li><strong>CAN-SPAM (US)</strong> — primarily requires accurate headers, a truthful subject line, a physical address and a working opt-out honoured within 10 business days.</li>
</ul>
<p>This is general information, not legal advice. Rules differ by country, and enforcement practice changes. If outbound is central to your business, have your process reviewed by someone qualified in your jurisdiction.</p>

<h2>A repeatable checklist</h2>
<ol>
  <li>Define the account list by fit criteria, not by whoever you can find.</li>
  <li>Identify the company's email pattern from one known address.</li>
  <li>Find the specific decision-maker; confirm their title is current.</li>
  <li>Generate candidates, then verify every one.</li>
  <li>Drop invalid, quarantine catch-all, retry unknown.</li>
  <li>Send in small batches and watch bounce rate before scaling.</li>
  <li>Log source and verification date so you can re-check later.</li>
</ol>

<h2>Where tools fit</h2>
<p>An email finder with built-in verification shortens steps 2–4 considerably, and an all-in-one suite keeps the verified result next to the campaign that will use it. Our <a href="[url:snov-io-review]">Snov.io review</a> covers how that works in practice, and the <a href="[url:snov-io-vs-hunter-io]">Snov.io vs Hunter.io comparison</a> explains the difference between a person database and a domain-based finder.</p>
<p>Next in this series: <a href="[url:verify-email-addresses-in-bulk]">how to verify emails in bulk</a> and <a href="[url:cold-email-outreach]">cold email for beginners</a>.</p>`,
    faq: [
      {
        q: 'How accurate are email finding tools?',
        a: 'Independent comparisons report pattern-based finders around 85% accuracy, with a per-result confidence score. Accuracy varies significantly by industry, region and company size, which is why verifying before sending matters more than any headline percentage.',
      },
      {
        q: 'What is a catch-all email domain?',
        a: 'A domain configured to accept mail for every address, whether or not the mailbox exists. Verification cannot confirm whether a specific person has an address there, so catch-all results should be treated as unverified and kept to a small proportion of any campaign.',
      },
      {
        q: 'Is it legal to email someone whose address I found online?',
        a: 'It depends on jurisdiction and how you use the address. Under GDPR you generally need a lawful basis such as legitimate interests plus clear identification and an opt-out; under CAN-SPAM you need accurate headers, a physical address and a working unsubscribe. This is general information, not legal advice.',
      },
      {
        q: 'Do I need to verify addresses that a finder just returned?',
        a: 'Yes. A finder infers or retrieves an address; a verifier checks whether the mailbox will accept mail. Unverified discovery is the most common cause of hard bounces, which directly damage sender reputation.',
      },
    ],
  },

  'verify-email-addresses-in-bulk': {
    title: 'How to Verify Emails in Bulk Before You Send',
    description:
      'How bulk email verification works, what each result status means, safe bounce thresholds, catch-all policy and a repeatable list-hygiene routine for cold outreach.',
    content: `
<blockquote><strong>Quick take:</strong> Bulk verification exists to protect one thing — your sending reputation. Verify before every campaign, delete invalid addresses, cap catch-alls, and keep hard bounces under about 2–3% of sends. A clean list is worth more than better copy.</blockquote>
<p>Deliverability problems are usually blamed on the sending tool. In practice the list is the cause far more often. This guide covers what verification actually checks, how to read the results, and the thresholds worth enforcing.</p>

<h2>What a verifier does</h2>
<p>A verifier runs a sequence of checks and returns a single verdict plus detail:</p>
<ol>
  <li><strong>Syntax validation</strong> — is the address structurally valid? Catches typos and malformed exports.</li>
  <li><strong>DNS and MX lookup</strong> — does the domain exist and is it configured to receive mail at all?</li>
  <li><strong>SMTP handshake</strong> — does the mail server accept the recipient? This is the real test, and it is why verification needs a live connection.</li>
  <li><strong>Role and disposable detection</strong> — flags <code>info@</code>, <code>sales@</code> and throwaway domains.</li>
  <li><strong>Duplicate and known-bad matching</strong> — removes repeats and previously observed traps.</li>
</ol>
<p>Because step 3 depends on remote servers answering, verification is probabilistic. Some servers refuse to respond, which is exactly why "unknown" is a distinct outcome rather than a pass or a fail.</p>

<h2>Reading the results</h2>
${`<table><thead><tr><th>Result</th><th>Meaning</th><th>What to do</th></tr></thead><tbody>
<tr><td>Valid</td><td>Mailbox exists and accepts mail</td><td>Send</td></tr>
<tr><td>Invalid</td><td>Mailbox does not exist</td><td>Delete. Never send</td></tr>
<tr><td>Accept-all / catch-all</td><td>Server accepts every address</td><td>Cap at a small share of the campaign, or exclude</td></tr>
<tr><td>Unknown / greylisted</td><td>Server refused to answer</td><td>Retry later; do not treat as valid</td></tr>
<tr><td>Disposable</td><td>Temporary address provider</td><td>Exclude</td></tr>
<tr><td>Role-based</td><td>Shared inbox such as sales@</td><td>Exclude from one-to-one outreach</td></tr>
</tbody></table>`}

[fig:verification-results]

<h2>Why bounces hurt so much</h2>
<p>A hard bounce is a permanent failure: the mailbox does not exist. Mailbox providers interpret a high hard-bounce rate as evidence that a sender does not know their recipients — the signature of a spammer. The consequences are gradual and then sudden: delivery moves from inbox to spam folder, then to rejection at the gateway.</p>
<p>Common working thresholds, which vary by provider and volume:</p>
<ul>
  <li><strong>Hard bounce rate</strong> — keep under about 2–3%; treat anything above as a stop signal.</li>
  <li><strong>Spam complaint rate</strong> — Google's published guidance for bulk senders is to stay well under 0.1%, and it should be treated as a ceiling rather than a target.</li>
  <li><strong>Domain reputation</strong> — check Google Postmaster Tools and your provider's dashboard weekly.</li>
</ul>
<p class="notice">These are widely used operational guidelines, not a guarantee of inbox placement. Authentication, sending behaviour and content all matter alongside list quality.</p>

[fig:deliverability-stack]

<h2>A bulk verification routine</h2>
<ol>
  <li><strong>Deduplicate first.</strong> You should not pay to verify the same address three times.</li>
  <li><strong>Normalise the file.</strong> One address per row, lowercase, no stray punctuation, no merge fields left in the email column.</li>
  <li><strong>Verify the whole list in one run.</strong> Partial verification is worse than none, because it leaves you with unknown quality and false confidence.</li>
  <li><strong>Segment by result.</strong> Export valid, catch-all and unknown into separate lists.</li>
  <li><strong>Send to valid first.</strong> Add catch-all in a later, smaller batch only after the first batch performs cleanly.</li>
  <li><strong>Re-verify anything older than 90 days.</strong> Lists decay continuously through job changes and company closures.</li>
  <li><strong>Watch the first 100 sends.</strong> Early bounce behaviour tells you whether the list is safe before you scale.</li>
</ol>

<h2>Verification is not deliverability</h2>
<p>A verified list can still land in spam. Verification only removes the addresses that cannot receive. Inbox placement depends on three further things:</p>
<ul>
  <li><strong>Authentication</strong> — publish SPF, DKIM and DMARC records for the sending domain. Non-negotiable since Google and Yahoo tightened bulk-sender requirements.</li>
  <li><strong>Reputation</strong> — warm up new domains gradually instead of sending 1,000 messages on day one.</li>
  <li><strong>Engagement</strong> — treat opens, replies and complaint rates as feedback, and cut segments that consistently ignore you.</li>
</ul>
<p>See <a href="[url:cold-email-outreach]">cold email for beginners</a> for the authentication and warm-up setup, and our <a href="[url:snov-io-review]">Snov.io review</a> for how built-in verification fits into a send workflow.</p>`,
    faq: [
      {
        q: 'What bounce rate is acceptable for cold email?',
        a: 'A common operational target is keeping hard bounces under about 2–3% of sends. Above that, mailbox providers begin to treat the sending domain as untrustworthy and inbox placement degrades.',
      },
      {
        q: 'Should I email catch-all addresses?',
        a: 'Cautiously. Catch-all servers accept mail for every address, so existence cannot be confirmed and bounce risk is higher. Many teams exclude them entirely, or cap them at a small proportion of a single campaign.',
      },
      {
        q: 'How often should I re-verify an email list?',
        a: 'Re-verify anything older than about 90 days before a new campaign. Contacts change jobs and companies close, so an untouched list loses a meaningful share of validity within a few months.',
      },
      {
        q: 'Does verification guarantee my email lands in the inbox?',
        a: 'No. Verification only confirms that an address can receive mail. Inbox placement also depends on SPF, DKIM and DMARC authentication, domain reputation and warm-up, and recipient engagement with your messages.',
      },
    ],
  },

  'cold-email-outreach': {
    title: 'Cold Email for Beginners: Setup and Best Practices',
    description:
      'A beginner-friendly cold email guide covering domain authentication, warm-up, list quality, sequence structure, reply handling and the metrics to track.',
    content: `
<blockquote><strong>Quick take:</strong> Cold email works when it is small, relevant and technically correct. Set up a separate sending domain with SPF, DKIM and DMARC, warm it up slowly, email a verified list of people who genuinely fit, and write short messages a human would answer.</blockquote>
<p>Most cold email advice is optimisation advice, which is useless if the foundation is broken. This guide covers the foundation first, in the order you should actually do the work.</p>

<h2>1. Use a separate sending domain</h2>
<p>Do not send cold outreach from your primary business domain. If the sending reputation degrades, you do not want to lose your transactional and customer mail with it. A common pattern is a near-variant such as <code>getcompany.com</code> or a dedicated subdomain, with a real website and a mailbox a human reads.</p>
<p>Set the display name to a person, not to "Sales Team". Reply-to should reach someone who will answer.</p>

<h2>2. Authenticate the domain properly</h2>
<p>Three DNS records do the work, and all three are required in practice:</p>
<ul>
  <li><strong>SPF</strong> — lists the servers allowed to send as your domain. Keep it under the DNS lookup limit; too many includes will silently break it.</li>
  <li><strong>DKIM</strong> — cryptographically signs messages so they cannot be altered in transit. Provided by your sending platform as a DNS record.</li>
  <li><strong>DMARC</strong> — tells receivers what to do when SPF or DKIM fail, and where to send reports. Start at <code>p=none</code> to collect data, then move to quarantine or reject once legitimate mail is passing.</li>
</ul>
<p>Google and Yahoo both tightened requirements for bulk senders, including authentication and easy one-click unsubscribe. Skipping this step is the most common reason a technically fine campaign never reaches an inbox.</p>

<h2>3. Warm up before you scale</h2>
<p>A new domain has no sending history, so sudden volume reads as suspicious. Warm-up gradually increases daily sends while mailbox warm-up tools generate real engagement between your own mailboxes. The practical rule: start with a handful of messages per day per mailbox and increase over several weeks, not days.</p>
<p>A common ceiling for a single warmed mailbox is in the region of 30–50 cold emails per day. Volume above that belongs on more mailboxes, not on one.</p>

<h2>4. Build a list you can defend</h2>
<p>The list is where most campaigns are won. Before writing a word of copy:</p>
<ul>
  <li>Define who should <em>not</em> receive the message, then exclude them.</li>
  <li>Verify every address — invalid entries create the bounces that destroy the domain you just warmed.</li>
  <li>Cap catch-all addresses and exclude role addresses from one-to-one outreach.</li>
  <li>Record where each contact came from and when you verified it.</li>
</ul>
<p>Our guides on <a href="[url:how-to-find-email-addresses]">finding professional addresses</a> and <a href="[url:verify-email-addresses-in-bulk]">bulk verification</a> cover the mechanics.</p>

<h2>5. Write a message a human would answer</h2>
<p>Structure matters less than honesty. A reliable shape for a first email:</p>
<ol>
  <li><strong>Why you are writing to this specific person</strong> — one sentence. If it could be sent to anyone, it is not a reason.</li>
  <li><strong>The problem, in their language</strong> — one or two sentences, no jargon.</li>
  <li><strong>What you do about it</strong> — one sentence, concrete.</li>
  <li><strong>A small ask</strong> — a question, not a calendar link. "Worth a look?" outperforms "Book a 30-minute demo."</li>
  <li><strong>A clear identity and an easy out</strong> — who you are and how to stop hearing from you.</li>
</ol>
<p>Keep the first message under about 120 words. Plain text or lightly formatted HTML usually beats a designed template. One link maximum, and never a shortened or tracking-heavy URL.</p>

<h2>6. Follow up, then stop</h2>
<p>Most replies come from follow-ups, not the first email. Two to four touches spaced a few days apart is plenty. Each follow-up should add something — a different angle, a relevant example — rather than repeat "just bumping this". Reply detection matters here: a sequence that keeps sending after someone answers looks broken and destroys trust. This is one of the features we look at in the <a href="[url:snov-io-review]">Snov.io review</a>.</p>

<h2>7. Track a small number of metrics</h2>
${`<table><thead><tr><th>Metric</th><th>What it tells you</th><th>Rough signal</th></tr></thead><tbody>
<tr><td>Hard bounce rate</td><td>List quality</td><td>Keep under ~2–3%</td></tr>
<tr><td>Spam complaint rate</td><td>Reputation risk</td><td>Well under 0.1%</td></tr>
<tr><td>Reply rate</td><td>Message-market fit</td><td>Track the trend, not a target</td></tr>
<tr><td>Positive reply rate</td><td>Real interest</td><td>The only number that predicts revenue</td></tr>
<tr><td>Unsubscribe rate</td><td>Relevance</td><td>Rising means targeting drifted</td></tr>
</tbody></table>`}
<p>Ignore open rates as a primary signal. Privacy features now pre-fetch images, so opens are inflated and unreliable.</p>

<h2>8. Stay on the right side of the rules</h2>
<p>Under GDPR you need a lawful basis for processing personal data, clear identification of who you are, and an easy way to object. Under CAN-SPAM you need accurate headers, a physical address and a working opt-out honoured within 10 business days. Every message should make it obvious how to stop receiving mail. This is general information, not legal advice — get your process reviewed for your jurisdiction.</p>

<h2>A realistic first 30 days</h2>
<ol>
  <li><strong>Days 1–7:</strong> buy the sending domain, publish SPF, DKIM and DMARC, create two or three mailboxes, start warm-up.</li>
  <li><strong>Days 8–14:</strong> write the first message, build and verify a list of 100 well-fitted prospects.</li>
  <li><strong>Days 15–21:</strong> send 20–30 per day, watch bounces and replies, iterate on the first two sentences.</li>
  <li><strong>Days 22–30:</strong> add one follow-up step, raise volume only if bounce rate is clean, review positive replies.</li>
</ol>
<p>If reply quality is poor at this stage, the problem is almost always targeting rather than copy.</p>`,
    faq: [
      {
        q: 'How many cold emails should I send per day?',
        a: 'A common working ceiling is around 30–50 cold emails per day per warmed mailbox. Higher volume should come from more mailboxes and domains rather than from pushing a single one harder.',
      },
      {
        q: 'Should I send cold email from my main domain?',
        a: 'No. Use a separate sending domain or subdomain so that any reputation damage cannot affect your transactional and customer email. Warm the new domain up gradually before increasing volume.',
      },
      {
        q: 'Do I need SPF, DKIM and DMARC for cold email?',
        a: 'Yes, all three in practice. Mailbox providers including Google and Yahoo require authentication for bulk senders, and missing records are a leading cause of messages failing to reach the inbox.',
      },
      {
        q: 'How many follow-ups should a cold email sequence have?',
        a: 'Two to four touches in total is typically enough, each adding a new angle rather than repeating the first message. Sequences should stop automatically when someone replies.',
      },
      {
        q: 'Are open rates still useful?',
        a: 'Only loosely. Privacy features pre-fetch tracking pixels, so opens are inflated and inconsistent. Reply rate and positive reply rate are far more reliable indicators of whether a campaign is working.',
      },
    ],
  },

  comparisons: {
    title: 'Lead Generation Tool Comparisons',
    description:
      'Side-by-side comparisons of Snov.io, Hunter.io, Apollo.io and Lusha on pricing model, database coverage, accuracy and outreach features, with clear verdicts.',
    content: `
<p>Choosing a prospecting tool is rarely about which one is "best". It is about which pricing model and data shape fit how your team actually works. These comparisons put the deciding factors side by side — cost per verified lead, who pays per seat versus per credit, and where each tool is genuinely weak.</p>
<h2>Available comparisons</h2>
<ul>
  <li><a href="[url:snov-io-vs-hunter-io]"><strong>Snov.io vs Hunter.io</strong></a> — an all-in-one outreach suite against a focused, per-account email finder. The clearest example of scope deciding the purchase.</li>
  <li><a href="[url:snov-io-vs-apollo]"><strong>Snov.io vs Apollo.io</strong></a> — credit-based workflow versus the largest searchable database, with the per-seat arithmetic worked through.</li>
  <li><a href="[url:snov-io-vs-lusha]"><strong>Snov.io vs Lusha</strong></a> — email workflow versus phone-number accuracy, and why most teams end up with both.</li>
</ul>
<h2>How to read these comparisons</h2>
<p>Every figure comes from a linked third-party source, and prices are shown as ranges because published numbers disagree. Nothing on this site is presented as the result of our own paid testing — see our <a href="[url:how-we-research]">research methodology</a>.</p>
<h2>The three questions that decide it</h2>
<ol>
  <li><strong>Does cost scale with people or with volume?</strong> Per-seat pricing punishes headcount; credit pricing punishes heavy prospecting months.</li>
  <li><strong>What is your cost per verified contact?</strong> Not per credit. A cheap credit that needs two attempts is not cheap.</li>
  <li><strong>Where does your process break?</strong> Fix the bottleneck — data, verification, or sending — instead of replacing everything.</li>
</ol>
<p>If you are still deciding whether Snov.io itself is right, start with the <a href="[url:snov-io-review]">full review</a> and the <a href="[url:snov-io-pricing]">pricing breakdown</a>.</p>`,
    faq: [
      {
        q: 'Which lead generation tool is best overall?',
        a: 'There is no single best. Apollo suits teams that need a large searchable database and built-in calling; Hunter suits email-only lookups on a budget; Snov.io suits small teams wanting discovery, verification and sequencing in one subscription; Lusha is the choice when phone numbers are the priority.',
      },
      {
        q: 'Are these comparisons based on hands-on testing?',
        a: 'No. They are compiled from provider documentation and independent third-party reviews, all cited on each page. We do not present any figure as the result of our own paid testing.',
      },
    ],
  },

  guides: {
    title: 'Lead Generation and Cold Email Guides',
    description:
      'Practical guides to finding verified email addresses, bulk verification and a cold email setup that protects deliverability and respects recipients.',
    content: `
<p>These guides cover the three skills that decide whether outbound works: finding the right contact, proving the address is deliverable, and sending in a way that reaches an inbox instead of a spam folder.</p>
<h2>Start here</h2>
<ul>
  <li><a href="[url:how-to-find-email-addresses]"><strong>How to find professional email addresses</strong></a> — email patterns, catch-all domains, verification order and the legal basics. The foundation everything else depends on.</li>
  <li><a href="[url:verify-email-addresses-in-bulk]"><strong>How to verify emails in bulk</strong></a> — what each verification result means, safe bounce thresholds, and a list-hygiene routine you can repeat before every campaign.</li>
  <li><a href="[url:cold-email-outreach]"><strong>Cold email for beginners</strong></a> — a separate sending domain, SPF/DKIM/DMARC, warm-up, sequence structure and the metrics worth tracking.</li>
</ul>
<h2>The order that matters</h2>
<p>Most people start with copywriting because it feels like the creative part. It is the last step. A perfect message sent to an unverified list from an unauthenticated domain fails before it is read. Work in this order:</p>
<ol>
  <li>Authenticate the sending domain and warm it up.</li>
  <li>Build and verify the list.</li>
  <li>Write a short, specific message.</li>
  <li>Follow up two or three times, then stop.</li>
</ol>
<h2>Tooling</h2>
<p>An all-in-one suite compresses steps 1–3 into one workflow, which is the main argument for a product like Snov.io. Our <a href="[url:snov-io-review]">Snov.io review</a> covers the credit model and limitations, and the <a href="[url:comparisons]">comparisons section</a> covers the alternatives if you would rather assemble separate tools.</p>`,
    faq: [
      {
        q: 'What should I learn first about cold email?',
        a: 'Domain authentication and list verification. Copywriting is the last step — a well-written message sent from an unauthenticated domain to an unverified list will not reach an inbox.',
      },
      {
        q: 'Do these guides assume a paid tool?',
        a: 'No. The methods are tool-agnostic: identifying email patterns, verifying addresses, publishing SPF, DKIM and DMARC, and structuring sequences work with any provider or even manually at small scale.',
      },
    ],
  },
};
