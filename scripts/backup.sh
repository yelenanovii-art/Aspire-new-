#!/usr/bin/env bash
# A full backup of the website and the material it was made from.
#
# Writes ~/Aspire-Backup-YYYY-MM-DD containing the repository as a restorable
# git bundle, the built site, the source media masters, the Netlify config and
# form submissions, plus a checksum manifest. Nothing is moved or deleted.
#
#   bash scripts/backup.sh
set -euo pipefail

REPO="$(cd "$(dirname "$0")/.." && pwd)"
DEST="$HOME/Aspire-Backup-$(date +%F)"
# Read from the local Netlify link rather than hardcoded, so the repository
# carries no account identifier. `netlify link` sets this up once per machine.
SITE_ID="$(python3 -c "import json;print(json.load(open('$REPO/.netlify/state.json'))['siteId'])" 2>/dev/null || true)"

echo "Backing up to $DEST"
rm -rf "$DEST"
mkdir -p "$DEST"/{01-website-source/current-files,02-built-site,04-netlify-config}
mkdir -p "$DEST"/03-source-media/{ise-2026,drive-media,wix-media,raw-clips,email-signature}

echo "  repository (full history, one restorable file)"
git -C "$REPO" bundle create "$DEST/01-website-source/aspire-web-full-history.bundle" --all >/dev/null 2>&1
git bundle verify "$DEST/01-website-source/aspire-web-full-history.bundle" >/dev/null
git -C "$REPO" archive --format=tar HEAD | (cd "$DEST/01-website-source/current-files" && tar xf -)

echo "  built site"
[ -d "$REPO/dist" ] || (cd "$REPO" && npm run build >/dev/null 2>&1)
cp -R "$REPO/dist/." "$DEST/02-built-site/"

echo "  source media"
cp -R "$HOME/Downloads/ISE 2026/." "$DEST/03-source-media/ise-2026/" 2>/dev/null || true
cp -R "$HOME/Downloads/aspire-drive-media/." "$DEST/03-source-media/drive-media/" 2>/dev/null || true
cp -R "$HOME/Downloads/aspire-wix-media/." "$DEST/03-source-media/wix-media/" 2>/dev/null || true
cp -R "$HOME/Downloads/signature-b/." "$DEST/03-source-media/email-signature/" 2>/dev/null || true
cp "$HOME/Downloads/"*MWC*.mp4 "$DEST/03-source-media/raw-clips/" 2>/dev/null || true
cp "$HOME/Downloads/"*IDM*.mp4 "$DEST/03-source-media/raw-clips/" 2>/dev/null || true

echo "  netlify config and form submissions"
cp "$REPO/netlify.toml" "$DEST/04-netlify-config/"
for call in getSite:site-settings listSiteForms:forms listSiteSubmissions:form-submissions; do
  api="${call%%:*}"; out="${call##*:}"
  netlify api "$api" --data "{\"site_id\":\"$SITE_ID\"}" > "$DEST/04-netlify-config/$out.json" 2>/dev/null || true
done

echo "  checksums"
( cd "$DEST" && find . -type f ! -name 'MANIFEST-*' -print0 | sort -z \
    | xargs -0 shasum -a 256 > MANIFEST-sha256.txt )

{
  echo "ASPIRE WEBSITE BACKUP"
  echo "Taken: $(date '+%d %B %Y, %H:%M %Z')"
  echo "Commit: $(git -C "$REPO" rev-parse HEAD)"
  echo "Files:  $(find "$DEST" -type f ! -name 'MANIFEST-*' | wc -l | tr -d ' ')"
  echo "Size:   $(du -sh "$DEST" | cut -f1)"
  echo
  echo "To verify later:  cd '$DEST' && shasum -a 256 -c MANIFEST-sha256.txt | grep -v OK"
  echo "To restore code:  git clone 01-website-source/aspire-web-full-history.bundle aspire-web"
} > "$DEST/INVENTORY.txt"

cat "$DEST/INVENTORY.txt"
