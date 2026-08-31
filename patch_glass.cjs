const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

// Features
code = code.replace(/bg-white\/50 backdrop-blur-md border border-white\/50/g, 'bg-zinc-50/80 backdrop-blur-xl border border-zinc-200/50');

// Product Cards
code = code.replace(/bg-white\/40 backdrop-blur-md border border-white\/60/g, 'bg-zinc-50/80 backdrop-blur-xl border border-zinc-200/60');
code = code.replace(/bg-white\/50 rounded-\[1\.5rem\]/g, 'bg-zinc-100/50 rounded-[1.5rem]');
code = code.replace(/bg-white\/50 backdrop-blur-2xl border border-white\/60/g, 'bg-white/90 backdrop-blur-2xl border border-zinc-200/80');

// Mobile filter
code = code.replace(/bg-white\/50 backdrop-blur-xl border-y border-white\/50/g, 'bg-white/80 backdrop-blur-xl border-y border-zinc-200/50');
code = code.replace(/bg-white\/50 backdrop-blur-md border-white\/50/g, 'bg-zinc-100/80 backdrop-blur-md border-zinc-200');

// Newsletter
code = code.replace(/bg-white\/40 backdrop-blur-xl border border-white\/60 rounded-\[3rem\]/g, 'bg-zinc-50/80 backdrop-blur-xl border border-zinc-200/60 rounded-[3rem]');
code = code.replace(/bg-white\/60 backdrop-blur-md border border-white\/80/g, 'bg-white border border-zinc-200/80');

// Community
code = code.replace(/border border-white\/50 bg-white\/30 backdrop-blur-md/g, 'border border-zinc-200/60 bg-zinc-50/80 backdrop-blur-md');
code = code.replace(/bg-white\/60 backdrop-blur-md rounded-full border border-white\/50/g, 'bg-white/90 backdrop-blur-md rounded-full border border-zinc-200');

// Footer
code = code.replace(/bg-white\/50 backdrop-blur-2xl border-t border-white\/60/g, 'bg-zinc-50/80 backdrop-blur-2xl border-t border-zinc-200/60');
code = code.replace(/bg-white\/30 backdrop-blur-xl border border-white\/40/g, 'bg-white border border-zinc-200/80');
code = code.replace(/bg-white\/50 backdrop-blur-md border border-white\/40/g, 'bg-zinc-100/80 backdrop-blur-md border border-zinc-200/80');

// Cart Modal
code = code.replace(/bg-white\/80 backdrop-blur-3xl border border-white\/60/g, 'bg-white/90 backdrop-blur-3xl border border-zinc-200/80');
code = code.replace(/border-b border-white\/50 bg-white\/30/g, 'border-b border-zinc-200/60 bg-zinc-50/80');
code = code.replace(/bg-white\/50 backdrop-blur-md border border-white\/50/g, 'bg-white border border-zinc-200');
code = code.replace(/bg-white\/60 rounded-xl flex-shrink-0/g, 'bg-zinc-100/50 rounded-xl flex-shrink-0');
code = code.replace(/border border-white\/50/g, 'border border-zinc-200/60');
code = code.replace(/bg-white\/50 backdrop-blur-md border border-white\/60/g, 'bg-white border border-zinc-200');
code = code.replace(/border-t border-white\/50 p-6 bg-white\/50/g, 'border-t border-zinc-200/60 p-6 bg-zinc-50/80');

// General hover replacements for white bg elements
code = code.replace(/hover:bg-white\/60/g, 'hover:bg-zinc-100/80');
code = code.replace(/hover:bg-white\/80/g, 'hover:bg-white');
code = code.replace(/hover:border-white/g, 'hover:border-zinc-300');

fs.writeFileSync('src/App.tsx', code);
