const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

// Logo SM Box
code = code.replace(
  /w-7 h-7 rounded-md text-xs shrink-0/,
  'w-8 h-8 rounded-md text-sm shrink-0'
);

// Logo SHOEMANIA text
code = code.replace(
  /className="font-display font-bold tracking-wide mt-\[2px\] text-zinc-900 text-base hidden md:block whitespace-nowrap overflow-hidden origin-left"/,
  'className="font-display font-bold tracking-wide mt-[2px] text-zinc-900 text-lg hidden md:block whitespace-nowrap overflow-hidden origin-left"'
);

// Shop All button
code = code.replace(
  /className={`relative px-3 py-1\.5 rounded-full font-sans text-\[10px\] sm:text-xs font-bold tracking-\[0\.2em\] uppercase whitespace-nowrap flex-shrink-0 transition-all duration-300 \${activeBrand === 'All'/,
  'className={`relative px-3 py-1.5 rounded-full font-sans text-xs sm:text-[13px] font-bold tracking-[0.2em] uppercase whitespace-nowrap flex-shrink-0 transition-all duration-300 ${activeBrand === \'All\''
);

// Brand buttons
code = code.replace(
  /className={`relative px-3 py-1\.5 rounded-full font-sans text-\[10px\] sm:text-xs font-bold tracking-\[0\.2em\] uppercase whitespace-nowrap flex-shrink-0 transition-all duration-300 \${activeBrand === brand/,
  'className={`relative px-3 py-1.5 rounded-full font-sans text-xs sm:text-[13px] font-bold tracking-[0.2em] uppercase whitespace-nowrap flex-shrink-0 transition-all duration-300 ${activeBrand === brand'
);

// About button
code = code.replace(
  /className={`relative px-3 py-1\.5 rounded-full font-sans text-\[10px\] sm:text-xs font-bold tracking-\[0\.2em\] uppercase whitespace-nowrap flex-shrink-0 transition-all duration-300 \${activeBrand === 'About'/,
  'className={`relative px-3 py-1.5 rounded-full font-sans text-xs sm:text-[13px] font-bold tracking-[0.2em] uppercase whitespace-nowrap flex-shrink-0 transition-all duration-300 ${activeBrand === \'About\''
);

// Search input
code = code.replace(
  /transition-all text-xs font-medium text-zinc-900 placeholder:text-zinc-500"/,
  'transition-all text-sm font-medium text-zinc-900 placeholder:text-zinc-500"'
);

// Search icon
code = code.replace(
  /<Search className="w-\[18px\] h-\[18px\]"/,
  '<Search className="w-5 h-5"'
);

// Bag icon
code = code.replace(
  /<ShoppingBag className="w-\[18px\] h-\[18px\]"/,
  '<ShoppingBag className="w-5 h-5"'
);

// Menu icon
code = code.replace(
  /<Menu className="w-\[18px\] h-\[18px\]"/,
  '<Menu className="w-5 h-5"'
);

// Cart count pill
code = code.replace(
  /className="absolute top-0 right-0 w-4 h-4 bg-zinc-900\/90 backdrop-blur-sm border border-zinc-700 text-white text-\[9px\] font-bold flex items-center justify-center rounded-full shadow-sm"/,
  'className="absolute top-0 right-0 translate-x-1 -translate-y-1 w-[18px] h-[18px] bg-zinc-900/90 backdrop-blur-sm border border-zinc-700 text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm"'
);


fs.writeFileSync('src/App.tsx', code);
