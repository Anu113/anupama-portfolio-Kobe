#!/bin/sh
# Prints resume.html to PDF with Chrome: a copy to send (with phone) and the
# site's /resume.pdf (no phone). Run from anywhere.
cd "$(dirname "$0")"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
SRC="file://$(pwd)/resume.html"
for v in send public; do
  if [ "$v" = send ]; then out="$(pwd)/Anupama-Mishra-Resume.pdf"; q=""; else out="$(pwd)/../public/resume.pdf"; q="?public"; fi
  "$CHROME" --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=8000 \
    --print-to-pdf="$out" "$SRC$q" 2>/dev/null
  echo "wrote $out"
done
