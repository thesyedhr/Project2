const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(
/className="absolute bottom-4 left-1\/2 -translate-x-1\/2 w-\[70%\] max-w-\[160px\] bg-white\/90 backdrop-blur-2xl border border-zinc-200\/80 shadow-md text-zinc-900 font-bold tracking-\[0\.2em\] text-\[10px\] uppercase py-2\.5 translate-y-\[150%\] group-hover:translate-y-0 transition-all duration-\[800ms\] ease-\[cubic-bezier\(0\.16,1,0\.3,1\)\] hover:bg-white hover:border-zinc-300 hover:scale-\[1\.05\] rounded-full flex items-center justify-center whitespace-nowrap"/g,
'className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2.5 bg-zinc-50/80 backdrop-blur-xl border border-zinc-200/60 shadow-sm text-zinc-900 font-bold tracking-widest text-[9px] uppercase opacity-0 scale-95 translate-y-4 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-white/90 hover:shadow-md hover:scale-[1.02] rounded-full flex items-center justify-center whitespace-nowrap"'
);

// Make "Quick Add" say "Add to Cart" as well for consistency
code = code.replace(/>\s*Quick Add\s*<\/button>/g, '>\n                    ADD TO CART\n                  </button>');

// Ensure all "Add to Cart" are uppercase
code = code.replace(/>\s*Add to Cart\s*<\/button>/g, '>\n                    ADD TO CART\n                  </button>');

fs.writeFileSync('src/App.tsx', code);
