const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Upgrade product card interactions
content = content.replace(
  /className="relative group bg-zinc-50\/80 backdrop-blur-xl border border-zinc-200\/60 p-5 shadow-sm rounded-\[2\.5rem\] transition-all duration-300 hover:bg-white\/60 hover:scale-\[1\.02\] hover:shadow-xl cursor-pointer overflow-hidden flex flex-col"/g,
  'whileHover={{ scale: 1.03, y: -4 }}\n                  whileTap={{ scale: 0.98 }}\n                  transition={{ type: "spring", stiffness: 400, damping: 30 }}\n                  className="relative group bg-zinc-50/80 backdrop-blur-xl border border-zinc-200/60 p-5 shadow-sm rounded-[2.5rem] transition-colors duration-500 hover:bg-white hover:shadow-2xl cursor-pointer overflow-hidden flex flex-col"'
);

// Smooth out the product card image scaling
content = content.replace(
  /className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/g,
  'className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"'
);

// Upgrade Add to Cart buttons
content = content.replace(
  /className="w-10 h-10 rounded-full bg-zinc-900 text-white flex items-center justify-center transition-transform group-hover:scale-110 active:scale-95 shadow-sm"/g,
  'className="w-10 h-10 rounded-full bg-zinc-900 text-white flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110 group-hover:shadow-lg active:scale-90 shadow-sm"'
);

// Upgrade Vault cards interactions
content = content.replace(
  /className="relative flex-1 md:hover:flex-\[3\.5\] min-w-\[280px\] md:min-w-0 h-\[400px\] md:h-\[450px\] md:hover:h-\[550px\] transition-all duration-1000 ease-\[cubic-bezier\(0\.16,1,0\.3,1\)\] rounded-\[2rem\] overflow-hidden group cursor-pointer shadow-sm border border-black\/5 snap-center"/g,
  'className="relative flex-1 md:hover:flex-[3.5] min-w-[280px] md:min-w-0 h-[400px] md:h-[450px] md:hover:h-[550px] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-[2rem] overflow-hidden group cursor-pointer shadow-sm hover:shadow-2xl border border-black/5 snap-center active:scale-[0.99]"'
);

fs.writeFileSync('src/App.tsx', content);
