from pathlib import Path
import re

index_path = Path("projects/habitflow-app/index.html")

if not index_path.exists():
    raise SystemExit("Could not find projects/habitflow-app/index.html. Run this from the amals-ai-workshop folder.")

html = index_path.read_text(encoding="utf-8")

head_inserts = [
    '<link rel="manifest" href="manifest.json">',
    '<meta name="theme-color" content="#2563eb">',
    '<meta name="apple-mobile-web-app-capable" content="yes">',
    '<meta name="apple-mobile-web-app-title" content="HabitFlow">',
    '<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">',
    '<link rel="apple-touch-icon" href="icons/icon-192.png">'
]

for item in head_inserts:
    key = item.split(" ")[0] + " " + item.split(" ")[1] if " " in item else item
    # Simple duplicate check using the most important href/name values
    if item not in html:
        html = html.replace("</head>", f"  {item}\n</head>")

register_script = """
<script>
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(error => {
      console.log("HabitFlow service worker registration failed:", error);
    });
  });
}
</script>
"""

if "navigator.serviceWorker.register" not in html:
    html = html.replace("</body>", f"{register_script}\n</body>")

index_path.write_text(html, encoding="utf-8")

print("HabitFlow PWA install code added to index.html")
