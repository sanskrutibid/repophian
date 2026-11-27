#!/usr/bin/env bash
# Acceptance checks for the phianinfotec.com SEO fix pack.
# Usage:  bash verify.sh                      (checks https://www.phianinfotec.com)
#         bash verify.sh https://staging.x.y  (checks a staging host)
# Reads the RAW server response with curl, i.e. what a crawler sees before JavaScript.

BASE="${1:-https://www.phianinfotec.com}"
BASE="${BASE%/}"
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126 Safari/537.36"
pass=0; fail=0

ok()  { echo "  PASS  $1"; pass=$((pass+1)); }
bad() { echo "  FAIL  $1"; [ -n "$2" ] && echo "        got: $2"; fail=$((fail+1)); }

raw()    { curl -s -m 20 -A "$UA" "$1"; }
status() { curl -s -o /dev/null -m 20 -A "$UA" -w "%{http_code}" "$1"; }
redir()  { curl -s -o /dev/null -m 20 -A "$UA" -w "%{http_code} %{redirect_url}" "$1"; }
ctype()  { curl -s -o /dev/null -m 20 -A "$UA" -w "%{content_type}" "$1"; }

HOME_HTML="$(raw "$BASE/")"
ABOUT_HTML="$(raw "$BASE/about")"
title_of() { printf '%s' "$1" | tr '\n' ' ' | sed -n 's/.*<title>\([^<]*\)<\/title>.*/\1/p'; }

echo "Checking $BASE"
echo
echo "STAGE 1"

t="$(title_of "$HOME_HTML")"
case "$t" in *Agency*|*agency*) ok "raw title describes the business";; *) bad "raw title describes the business" "$t";; esac

printf '%s' "$HOME_HTML" | grep -qi '<meta name="description"' \
  && ok "raw HTML has a meta description" || bad "raw HTML has a meta description"

printf '%s' "$HOME_HTML" | grep -qi 'property="og:title"' \
  && ok "raw HTML has og:title (link previews)" || bad "raw HTML has og:title (link previews)"

n="$(printf '%s' "$HOME_HTML" | grep -o 'fonts.googleapis.com/css2' | wc -l | tr -d ' ')"
[ "$n" -le 1 ] && ok "one Google Fonts stylesheet in index.html" || bad "one Google Fonts stylesheet in index.html" "$n stylesheets"

printf '%s' "$HOME_HTML" | grep -q 'linkedin.com/company/phian-infotec' \
  && ok "schema sameAs has the company LinkedIn" || bad "schema sameAs has the company LinkedIn"

printf '%s' "$HOME_HTML" | grep -q '"WebSite"' \
  && ok "schema has a WebSite node" || bad "schema has a WebSite node"

if [ "$BASE" = "https://www.phianinfotec.com" ]; then
  r="$(redir "https://phianinfotec.com/about")"
  [ "$r" = "301 https://www.phianinfotec.com/about" ] && ok "non-www 301s to www" || bad "non-www 301s to www" "$r"
fi

r="$(redir "$BASE/team/")"
case "$r" in "301 "*"/about") ok "/team/ 301s to /about";; *) bad "/team/ 301s to /about" "$r";; esac

r="$(redir "$BASE/about/")"
case "$r" in "301 "*"/about") ok "/about/ 301s to /about";; *) bad "/about/ 301s to /about" "$r";; esac

s="$(status "$BASE/assets/images/this-file-does-not-exist.png")"
[ "$s" = "404" ] && ok "missing asset returns 404" || bad "missing asset returns 404" "$s"

c="$(ctype "$BASE/llms.txt")"
case "$c" in text/plain*) ok "/llms.txt is a real text file";; *) bad "/llms.txt is a real text file" "$c";; esac

echo
echo "STAGE 2 (prerender)"

printf '%s' "$HOME_HTML" | grep -qi '<h1' \
  && ok "raw home HTML contains an <h1>" || bad "raw home HTML contains an <h1>"

w="$(printf '%s' "$HOME_HTML" | sed -e 's/<script[^>]*>[^<]*<\/script>//g' -e 's/<style[^>]*>[^<]*<\/style>//g' -e 's/<[^>]*>/ /g' | wc -w | tr -d ' ')"
[ "$w" -ge 500 ] && ok "raw home HTML has body text ($w words)" || bad "raw home HTML has body text (need 500+ words)" "$w words"

printf '%s' "$HOME_HTML" | grep -qi "rel=\"canonical\" href=\"https://www.phianinfotec.com/\"" \
  && ok "raw home HTML has its canonical" || bad "raw home HTML has its canonical"

ta="$(title_of "$ABOUT_HTML")"
case "$ta" in *About*) ok "/about has its own raw title";; *) bad "/about has its own raw title" "$ta";; esac

printf '%s' "$ABOUT_HTML" | grep -qi 'rel="canonical" href="https://www.phianinfotec.com/about"' \
  && ok "/about has its own raw canonical" || bad "/about has its own raw canonical"

if printf '%s' "$HOME_HTML" | grep -q '>14+<' && ! printf '%s' "$HOME_HTML" | grep -q '>0+<'; then
  ok "stats render final values, not 0+"
else
  bad "stats render final values, not 0+"
fi

s="$(status "$BASE/this-page-does-not-exist-xyz")"
[ "$s" = "404" ] && ok "unknown URL returns 404" || bad "unknown URL returns 404" "$s"

s="$(status "$BASE/work-nsh-hospital")"
[ "$s" = "200" ] && ok "a real route still returns 200" || bad "a real route still returns 200" "$s"

echo
echo "Result: $pass passed, $fail failed"
[ "$fail" -eq 0 ]
