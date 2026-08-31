const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Update Scroll Spy Logic
code = code.replace(
`          if (mostVisibleId) {
            let brand = mostVisibleId === 'products-top' ? 'All' : mostVisibleId.replace('brand-', '');
            if (brand === 'about') brand = 'About';
            if (brand === 'hero') brand = 'Hero';
            setActiveBrand(brand as Brand | 'All' | 'About' | 'Hero');
          }`,
`          if (mostVisibleId) {
            let brand = mostVisibleId;
            if (['products-top', 'featured-brands', 'the-vault', 'trending-now', 'manifesto'].includes(mostVisibleId)) {
                brand = 'All';
            } else {
                brand = mostVisibleId.replace('brand-', '');
            }
            if (brand === 'about') brand = 'About';
            if (brand === 'hero') brand = 'Hero';
            setActiveBrand(brand as Brand | 'All' | 'About' | 'Hero');
          }`
);

// 2. Add scroll-spy-section class and IDs to sections
code = code.replace(
`{/* Featured Brands */}
                <section className="py-16 lg:py-24 relative">`,
`{/* Featured Brands */}
                <section id="featured-brands" className="scroll-spy-section py-16 lg:py-24 relative">`
);

code = code.replace(
`{/* The Vault Section */}
                <section className="py-16 lg:py-24 relative mb-12">`,
`{/* The Vault Section */}
                <section id="the-vault" className="scroll-spy-section py-16 lg:py-24 relative mb-12">`
);

code = code.replace(
`{/* Trending Section */}
                <section className="py-16 lg:py-24 relative">`,
`{/* Trending Section */}
                <section id="trending-now" className="scroll-spy-section py-16 lg:py-24 relative">`
);

code = code.replace(
`{/* Manifesto Section */}
                <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative z-10 flex justify-center">`,
`{/* Manifesto Section */}
                <section id="manifesto" className="scroll-spy-section py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative z-10 flex justify-center">`
);

fs.writeFileSync('src/App.tsx', code);
console.log("Patched scrollspy");
