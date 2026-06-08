const fs = require("fs");
const filePath = "index.html";
let html = fs.readFileSync(filePath, "utf8");

const old = `  right: max(16px, calc((100vw - min(calc(100vw - 32px), 464px)) / 2));
  width: 44px;
  height: 44px;
  border-radius: 50%;`;

const neo = `  right: calc(max(16px, calc((100vw - min(calc(100vw - 32px), 464px)) / 2)) + 8px);
  width: 44px;
  height: 44px;
  border-radius: 50%;`;

if (!html.includes(old)) { console.error("❌ not found"); process.exit(1); }
html = html.replace(old, neo);
fs.writeFileSync(filePath, html, "utf8");
console.log("✅ done");
