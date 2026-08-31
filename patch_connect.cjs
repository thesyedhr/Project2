const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

const targetStr = `{/* Featured Brands */}`;
const endStr = `</section>\n\n      {/* Mobile Filters (Sticky for Main Grid) */}`;

const startIndex = code.indexOf(targetStr);
const endIndex = code.indexOf(endStr);

if (startIndex === -1 || endIndex === -1) {
  console.log("Could not find boundaries");
  process.exit(1);
}

const before = code.substring(0, startIndex);
const middle = code.substring(startIndex, endIndex + `</section>`.length);
const after = code.substring(endIndex + `</section>`.length);

const newMiddle = `{activeBrand === 'All' && (\n        <>\n          ` + middle.split('\n').join('\n          ') + `\n        </>\n      )}`;

code = before + newMiddle + after;
fs.writeFileSync('src/App.tsx', code);
console.log("Patched successfully");
