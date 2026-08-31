const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Shop Collection button
content = content.replace(
  /whileHover=\{\{ scale: 1\.02 \}\}\s*whileTap=\{\{ scale: 0\.98 \}\}/g,
  'whileHover={{ scale: 1.04 }}\n                whileTap={{ scale: 0.96 }}\n                transition={{ type: "spring", stiffness: 400, damping: 25 }}'
);

// View All Drops button
content = content.replace(
  /className="flex items-center justify-center gap-2 px-8 py-4 bg-zinc-800\/60 backdrop-blur-xl border border-zinc-600\/50 shadow-sm text-white rounded-full font-bold tracking-wider text-\[11px\] uppercase transition-all duration-300 hover:bg-zinc-700\/80 hover:shadow-md hover:scale-\[1\.02\] w-full md:w-auto md:px-12"/g,
  'className="flex items-center justify-center gap-2 px-8 py-4 bg-zinc-800/60 backdrop-blur-xl border border-zinc-600/50 shadow-sm text-white rounded-full font-bold tracking-wider text-[11px] uppercase transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-zinc-700/80 hover:shadow-xl hover:scale-[1.03] active:scale-[0.96] w-full md:w-auto md:px-12"'
);

// Subscribe button
content = content.replace(
  /className="bg-zinc-900 text-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-all hover:bg-black active:scale-95 whitespace-nowrap shadow-sm hover:shadow-md"/g,
  'className="bg-zinc-900 text-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-black hover:scale-[1.03] active:scale-[0.96] whitespace-nowrap shadow-sm hover:shadow-lg"'
);

// Navigation arrows in hero (Prev/Next)
content = content.replace(
  /className="absolute left-4 top-1\/2 -translate-y-1\/2 z-20 w-11 h-11 rounded-full bg-white\/80 backdrop-blur-xl border border-zinc-200\/60 text-zinc-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 active:scale-95 shadow-md"/g,
  'className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/80 backdrop-blur-xl border border-zinc-200/60 text-zinc-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-white hover:scale-[1.15] active:scale-[0.9] shadow-md"'
);
content = content.replace(
  /className="absolute right-4 top-1\/2 -translate-y-1\/2 z-20 w-11 h-11 rounded-full bg-white\/80 backdrop-blur-xl border border-zinc-200\/60 text-zinc-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 active:scale-95 shadow-md"/g,
  'className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/80 backdrop-blur-xl border border-zinc-200/60 text-zinc-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-white hover:scale-[1.15] active:scale-[0.9] shadow-md"'
);


fs.writeFileSync('src/App.tsx', content);
