from pathlib import Path
import re

FAVICON_BLOCK = """  <!-- Day 30 favicon: A + cupcake + sparkle -->
  <link rel="icon" href="/assets/favicons/favicon.ico" sizes="any">
  <link rel="icon" type="image/svg+xml" href="/assets/favicons/favicon.svg">
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicons/favicon-32.png">
  <link rel="apple-touch-icon" href="/assets/favicons/apple-touch-icon.png">
  <meta name="theme-color" content="#ff8ab8">
"""

html_files = list(Path(".").glob("*.html")) + list(Path("projects").glob("**/*.html")) + list(Path("recipes").glob("**/*.html"))

changed = 0

for path in html_files:
    html = path.read_text(encoding="utf-8")

    if "</head>" not in html:
        continue

    # Remove older favicon/theme links to avoid browser picking the wrong one.
    html = re.sub(r'\s*<link[^>]+rel=["\'](?:icon|shortcut icon|apple-touch-icon)["\'][^>]*>\n?', "\n", html, flags=re.I)
    html = re.sub(r'\s*<link[^>]+rel=["\'][^"\']*icon[^"\']*["\'][^>]*>\n?', "\n", html, flags=re.I)
    html = re.sub(r'\s*<meta[^>]+name=["\']theme-color["\'][^>]*>\n?', "\n", html, flags=re.I)

    if "Day 30 favicon: A + cupcake + sparkle" not in html:
        html = html.replace("</head>", FAVICON_BLOCK + "</head>")

    path.write_text(html, encoding="utf-8")
    changed += 1

print(f"Installed Day 30 favicon links into {changed} HTML files.")
