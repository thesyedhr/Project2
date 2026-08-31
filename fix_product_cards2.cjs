const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Replace the old tailwind scale hover with motion hover
const oldClassRegex = /className="relative group flex flex-col bg-zinc-50\/80 backdrop-blur-xl border border-zinc-200\/60 p-4 shadow-sm rounded-\[2rem\] transition-all duration-300 hover:bg-white\/60 hover:scale-\[1\.03\] hover:z-10 hover:shadow-xl cursor-pointer"/g;

const newProps = `whileHover={{ scale: 1.03, y: -4, transition: { type: "spring", stiffness: 400, damping: 30, delay: 0 } }}
                          whileTap={{ scale: 0.98, transition: { type: "spring", stiffness: 400, damping: 30, delay: 0 } }}
                          className="relative group flex flex-col bg-zinc-50/80 backdrop-blur-xl border border-zinc-200/60 p-4 shadow-sm rounded-[2rem] transition-colors duration-500 hover:bg-white hover:z-10 hover:shadow-2xl cursor-pointer"`;

content = content.replace(oldClassRegex, newProps);


// Fix the duplicate transition in Drops section
content = content.replace(
  /whileHover=\{\{ scale: 1\.03, y: -4 \}\}\s*whileTap=\{\{ scale: 0\.98 \}\}\s*transition=\{\{ type: "spring", stiffness: 400, damping: 30 \}\}/g,
  `whileHover={{ scale: 1.03, y: -4, transition: { type: "spring", stiffness: 400, damping: 30, delay: 0 } }}
                  whileTap={{ scale: 0.98, transition: { type: "spring", stiffness: 400, damping: 30, delay: 0 } }}`
);

fs.writeFileSync('src/App.tsx', content);
