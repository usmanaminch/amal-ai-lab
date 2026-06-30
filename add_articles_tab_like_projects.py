
from pathlib import Path
import re

p = Path("index.html")
if not p.exists():
    raise SystemExit("❌ index.html not found. Run this from $HOME/Documents/amals-ai-workshop")

html = p.read_text(encoding="utf-8")

# Remove Debate Article Studio project card if it exists
html = re.sub(
    r'\s*<article[^>]*class=["\'][^"\']*project-card[^"\']*["\'][^>]*>.*?projects/debate-article-studio/index\.html.*?</article>',
    '',
    html,
    flags=re.S | re.I
)

def find_section_end(text, start):
    tag_re = re.compile(r'</?section\b[^>]*>', re.I)
    depth = 0
    for m in tag_re.finditer(text, start):
        tag = m.group(0)
        if tag.startswith("</"):
            depth -= 1
            if depth == 0:
                return m.end()
        else:
            depth += 1
    return None

# Add Articles tab like Projects tab
if 'data-tab="articles"' not in html and "data-tab='articles'" not in html and 'href="#articles"' not in html:
    projects_button = re.search(r'<button([^>]*data-tab=["\']projects["\'][^>]*)>(.*?)</button>', html, flags=re.I | re.S)
    if projects_button:
        attrs = projects_button.group(1)
        attrs = re.sub(r'data-tab=["\']projects["\']', 'data-tab="articles"', attrs, flags=re.I)
        attrs = re.sub(r'\sactive\b', '', attrs)
        article_button = f'<button{attrs}>Articles</button>'
        html = html[:projects_button.end()] + "\n        " + article_button + html[projects_button.end():]
    else:
        projects_link = re.search(r'<a([^>]*href=["\']#projects["\'][^>]*)>(.*?)</a>', html, flags=re.I | re.S)
        if projects_link:
            attrs = projects_link.group(1)
            attrs = re.sub(r'href=["\']#projects["\']', 'href="#articles"', attrs, flags=re.I)
            attrs = re.sub(r'\sactive\b', '', attrs)
            article_link = f'<a{attrs}>Articles</a>'
            html = html[:projects_link.end()] + "\n        " + article_link + html[projects_link.end():]
        else:
            nav_match = re.search(r'(<nav[^>]*>)', html, flags=re.I)
            if nav_match:
                html = html[:nav_match.end()] + '\n        <button class="tab-button" data-tab="articles" type="button">Articles</button>' + html[nav_match.end():]
            else:
                html = html.replace("<body>", '<body>\n  <nav class="bottom-tabs"><button class="tab-button" data-tab="articles" type="button">Articles</button></nav>', 1)

articles_section = '''
    <section id="articles" class="tab-panel">
      <div class="section-heading">
        <p class="eyebrow">Student Writing</p>
        <h2>Articles</h2>
        <p>
          Finished opinion articles, debate pieces, and writing projects go here.
        </p>
      </div>

      <div class="project-grid">
        <article class="project-card featured">
          <p class="project-tag">Opinion Article</p>
          <h3>Why Should Schools Enforce Dress Codes?</h3>
          <p>
            An opinion article explaining why reasonable dress codes can help reduce bullying,
            limit distractions, and support student safety while still being fair.
          </p>
          <ul>
            <li>Topic: school dress codes</li>
            <li>Skills: claim, reasons, other side, response, and conclusion</li>
            <li>Focus: respectful debate writing and student voice</li>
          </ul>
          <a class="button primary" href="articles/dress-codes/index.html">Read Article</a>
        </article>
      </div>
    </section>
'''

# Add Articles section after Projects section
if 'id="articles"' not in html and "id='articles'" not in html:
    projects_start = re.search(r'<section([^>]*id=["\']projects["\'][^>]*)>', html, flags=re.I)
    if projects_start:
        end = find_section_end(html, projects_start.start())
        if end:
            html = html[:end] + "\n" + articles_section + html[end:]
        else:
            html = html.replace("</main>", articles_section + "\n  </main>", 1)
    else:
        html = html.replace("</main>", articles_section + "\n  </main>", 1)

p.write_text(html, encoding="utf-8")
print("✅ Added Articles tab like Projects and added the dress code article card.")
