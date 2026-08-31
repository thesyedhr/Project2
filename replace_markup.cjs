const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Replace the container
content = content.replace(
  'className="absolute inset-0 rounded-[3rem] overflow-hidden shadow-md bg-zinc-950"',
  'className="absolute inset-0 rounded-[3rem] overflow-hidden shadow-sm bg-zinc-100 border border-zinc-200/60 p-12"'
);

// Replace the base image class
content = content.replace(
  'className="absolute inset-0 w-full h-full object-cover"',
  'className="absolute inset-0 w-full h-full object-contain mix-blend-multiply scale-[1.15]"'
);

// Replace the motion.img class
content = content.replace(
  'className="absolute inset-0 w-full h-full object-cover z-10"',
  'className="absolute inset-0 w-full h-full object-contain mix-blend-multiply scale-[1.15] z-10"'
);

// Remove the vignette
content = content.replace(
  '{/* Subtle vignette gradient overlay */}\n                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30 pointer-events-none" />',
  ''
);

// Change the badge from dark to light
content = content.replace(
  'className="absolute top-6 left-6 z-20 bg-black/20 backdrop-blur-xl px-4 py-2 rounded-full text-white font-sans text-xs font-bold tracking-wider uppercase flex items-center gap-2.5"',
  'className="absolute top-6 left-6 z-20 bg-white/80 backdrop-blur-xl border border-zinc-200/60 px-4 py-2 rounded-full text-zinc-900 font-sans text-xs font-bold tracking-wider uppercase flex items-center gap-2.5 shadow-sm"'
);

// Change the kinetic title shift text-white to text-zinc-900
content = content.replace(
  'className="whitespace-nowrap inline-block text-white font-bold tracking-wider"',
  'className="whitespace-nowrap inline-block text-zinc-900 font-bold tracking-wider"'
);

// Change arrows from dark to light
content = content.replace(
  /className="absolute left-4 top-1\/2 -translate-y-1\/2 z-20 w-11 h-11 rounded-full bg-black\/20 backdrop-blur-xl text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black\/60 hover:scale-110 active:scale-95 shadow-xl"/g,
  'className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/80 backdrop-blur-xl border border-zinc-200/60 text-zinc-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 active:scale-95 shadow-md"'
);
content = content.replace(
  /className="absolute right-4 top-1\/2 -translate-y-1\/2 z-20 w-11 h-11 rounded-full bg-black\/20 backdrop-blur-xl text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black\/60 hover:scale-110 active:scale-95 shadow-xl"/g,
  'className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/80 backdrop-blur-xl border border-zinc-200/60 text-zinc-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 active:scale-95 shadow-md"'
);

// Change pagination dots
content = content.replace(
  'className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/20 backdrop-blur-xl px-4 py-2 rounded-full shadow-xl"',
  'className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-white/80 backdrop-blur-xl border border-zinc-200/60 px-4 py-2 rounded-full shadow-sm"'
);
content = content.replace(
  /className=\{`h-2 rounded-full transition-all duration-500 \$\{\s*idx === heroImageIndex \? 'w-6 bg-white' : 'w-2 bg-white\/40 hover:bg-white\/80'\s*\}\`\}/g,
  'className={`h-2 rounded-full transition-all duration-500 ${idx === heroImageIndex ? \'w-6 bg-zinc-900\' : \'w-2 bg-zinc-300 hover:bg-zinc-400\'}`}'
);

fs.writeFileSync('src/App.tsx', content);
