const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Replace animation logic
content = content.replace(
  /initial=\{\(dir: number\) => \(\{\s*opacity: 0,\s*x: dir > 0 \? '100%' : '-100%',\s*scale: 1\.05,\s*\}\)\}/g,
  "initial={(dir: number) => ({\n                      x: dir > 0 ? '100%' : '-100%',\n                    })}"
);

content = content.replace(
  /animate=\{\{\s*opacity: 1,\s*x: '0%',\s*scale: 1,\s*\}\}/g,
  "animate={{\n                      x: '0%',\n                    }}"
);

content = content.replace(
  /exit=\{\(dir: number\) => \(\{\s*opacity: 0,\s*x: dir > 0 \? '-25%' : '25%',\s*scale: 0\.96,\s*\}\)\}/g,
  "exit={(dir: number) => ({\n                      x: dir > 0 ? '-100%' : '100%',\n                    })}"
);

// We need to keep the transition block the same but just in case, let's make sure we hit the right places.

// Replace dots container
content = content.replace(
  'className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-white/80 backdrop-blur-xl border border-zinc-200/60 px-4 py-2 rounded-full shadow-sm"',
  'className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2"'
);

fs.writeFileSync('src/App.tsx', content);
