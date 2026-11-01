// Minimal static server for the generated preview (clean URLs like /snov-io-review/).
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, 'site');
// Zips live in the repo root, outside the generated site, so a rebuild never wipes them.
const REPO = path.join(__dirname, '..');
const PORT = process.env.PORT || 8080;

// The generated site is gitignored, so a fresh checkout/sandbox has no output.
// Build it on startup rather than serving a blank page.
if (!fs.existsSync(path.join(ROOT, 'index.html'))) {
  console.log('No generated site found — building…');
  require('./build.js');
}
const DOWNLOADS = {
  'leads-mania-static.zip': {
    label: 'Static website (recommended)',
    note: 'Upload-ready. Any host, no WordPress.',
  },
  'leads-mania-theme.zip': {
    label: 'WordPress theme',
    note: 'Only if you are installing WordPress.',
  },
};

const downloadIndex = () => {
  const rows = Object.entries(DOWNLOADS)
    .filter(([f]) => fs.existsSync(path.join(REPO, f)))
    .map(([f, d]) => {
      const mb = (fs.statSync(path.join(REPO, f)).size / 1048576).toFixed(2);
      return `<li style="margin:0 0 18px"><a href="/download/${f}" download style="font-weight:750;font-size:17px">${d.label}</a><br><span style="font-size:13px;color:#5b6785">${f} \u00b7 ${mb} MB \u00b7 ${d.note}</span></li>`;
    })
    .join('');
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Download \u2014 Leads Mania</title><link rel="stylesheet" href="/style.css"></head><body><header class="header"><div class="wrap nav"><a class="logo" href="/">leads mania<span>.</span></a></div></header><main><div class="wrap article"><h1>Download your website</h1><p>Right-click \u2192 Save, or click to download directly.</p><ul style="list-style:none;padding:0;margin:30px 0">${rows}</ul><p class="notice" style="font-size:14px">Before uploading the static zip, run <code>./set-domain.sh https://yourdomain.com</code> inside it, or send me your domain and I will rebuild it baked-in.</p></div></main></body></html>`;
};

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

http
  .createServer((req, res) => {
    let pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);

    // --- download route (serves the zips as attachments) ---
    if (pathname === '/download' || pathname === '/download/') {
      const html = downloadIndex();
      res.writeHead(200, { 'Content-Type': TYPES['.html'], 'Cache-Control': 'no-store' });
      return res.end(html);
    }
    if (pathname.startsWith('/download/')) {
      const name = path.basename(pathname);
      const zip = path.join(REPO, name);
      if (!name.endsWith('.zip') || !fs.existsSync(zip)) {
        res.writeHead(404, { 'Content-Type': TYPES['.html'], 'Cache-Control': 'no-store' });
        return res.end('<h1>404</h1><p>No such download. <a href="/download/">See available files</a>.</p>');
      }
      const stat = fs.statSync(zip);
      res.writeHead(200, {
        'Content-Type': 'application/zip',
        'Content-Length': stat.size,
        'Content-Disposition': `attachment; filename="${name}"`,
        'Cache-Control': 'no-store',
      });
      return fs.createReadStream(zip).pipe(res);
    }

    let file = path.join(ROOT, path.normalize(pathname).replace(/^(\.\.[/\\])+/, ''));
    if (pathname.endsWith('/')) file = path.join(file, 'index.html');
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    if (!fs.existsSync(file) && fs.existsSync(file + '.html')) file += '.html';

    if (!fs.existsSync(file)) {
      const notFound = path.join(ROOT, 'index.html');
      res.writeHead(200, { 'Content-Type': TYPES['.html'], 'Cache-Control': 'no-store' });
      return res.end(fs.readFileSync(notFound));
    }
    // no-store: this is a preview server, so a stale cached CSS/HTML is never what we want.
    res.writeHead(200, {
      'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    res.end(fs.readFileSync(file));
  })
  .listen(PORT, '0.0.0.0', () => console.log(`Leads Mania preview on http://0.0.0.0:${PORT}`));
