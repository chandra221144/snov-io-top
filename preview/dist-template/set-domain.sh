#!/usr/bin/env bash
# Sets your real domain in every canonical tag, og:url, sitemap and robots file.
#
# Usage:  ./set-domain.sh https://yourdomain.com
#
# Run this ONCE before uploading. Without it, the canonical tags point at
# https://YOUR-DOMAIN.com and search engines will ignore your real pages.
set -euo pipefail

PLACEHOLDER="https://YOUR-DOMAIN.com"

if [ $# -ne 1 ]; then
  echo "Usage: $0 https://yourdomain.com"
  echo "Example: $0 https://leadsmania.com"
  exit 1
fi

DOMAIN="${1%/}"

case "$DOMAIN" in
  http://*|https://*) ;;
  *) echo "ERROR: include the scheme, e.g. https://yourdomain.com"; exit 1 ;;
esac

FILES=$(cd "$(dirname "$0")" && grep -rl "$PLACEHOLDER" . --include='*.html' --include='*.xml' --include='*.txt' 2>/dev/null || true)

if [ -z "$FILES" ]; then
  echo "No placeholder found. Has this already been run? Checking for an existing domain..."
  grep -rh -o 'rel="canonical" href="[^"]*"' . --include='*.html' 2>/dev/null | head -3 || true
  exit 0
fi

# macOS and Linux sed disagree about -i, so use a temp file per file.
COUNT=0
for f in $FILES; do
  tmp=$(mktemp)
  sed "s|$PLACEHOLDER|$DOMAIN|g" "$f" > "$tmp"
  mv "$tmp" "$f"
  COUNT=$((COUNT + 1))
done

echo "Updated $COUNT files."
echo
echo "Canonical now reads:"
grep -h -o 'rel="canonical" href="[^"]*"' index.html 2>/dev/null | head -1 || true
echo
echo "Next: upload the contents of this folder to your hosting root, then submit"
echo "$DOMAIN/sitemap.xml in Google Search Console."
