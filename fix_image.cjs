const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Container
content = content.replace(
  'className="absolute inset-0 rounded-[3rem] overflow-hidden shadow-sm bg-zinc-100 border border-zinc-200/60 p-12"',
  'className="absolute inset-0 rounded-[3rem] overflow-hidden shadow-md bg-zinc-100 border border-zinc-200/60"'
);

// Base image
content = content.replace(
  'className="absolute inset-0 w-full h-full object-contain mix-blend-multiply scale-[1.15]"',
  'className="absolute inset-0 w-full h-full object-cover"'
);

// Animated image
content = content.replace(
  'className="absolute inset-0 w-full h-full object-contain mix-blend-multiply scale-[1.15] z-10"',
  'className="absolute inset-0 w-full h-full object-cover z-10"'
);

fs.writeFileSync('src/App.tsx', content);
