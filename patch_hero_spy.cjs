const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(/useState<Brand \| 'All' \| 'About'>\('All'\)/, "useState<Brand | 'All' | 'About' | 'Hero'>('Hero')");

code = code.replace(/let mostVisibleId = 'products-top'; \/\/ default to All/, "let mostVisibleId = 'hero';");

code = code.replace(
/const brand = mostVisibleId === 'products-top' \? 'All' : mostVisibleId\.replace\('brand-', ''\);\n\s*setActiveBrand\(brand === 'about' \? 'About' : brand as Brand \| 'All'\);/g,
`let brand = mostVisibleId === 'products-top' ? 'All' : mostVisibleId.replace('brand-', '');
            if (brand === 'about') brand = 'About';
            if (brand === 'hero') brand = 'Hero';
            setActiveBrand(brand as Brand | 'All' | 'About' | 'Hero');`
);

code = code.replace(/{[\s\n]*\/\* Hero Section \*\/[\s\n]*<div className="relative overflow-hidden pt-12 lg:pt-16">/,
`{/* Hero Section */}
      <div id="hero" className="scroll-spy-section relative overflow-hidden pt-12 lg:pt-16">`
);

fs.writeFileSync('src/App.tsx', code);
