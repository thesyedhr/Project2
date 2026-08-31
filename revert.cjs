const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

const targetStr = `{activeBrand === 'All' && (\n        <>\n          {/* Featured Brands */}`;
const endStr = `        </>\n      )}\n\n      {/* Mobile Filters (Sticky for Main Grid) */}`;

code = code.replace(targetStr, `{/* Featured Brands */}`);
code = code.replace(endStr, `\n      {/* Mobile Filters (Sticky for Main Grid) */}`);

fs.writeFileSync('src/App.tsx', code);
console.log("Reverted");
