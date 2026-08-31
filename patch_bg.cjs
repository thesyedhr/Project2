const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Remove the dynamic glass background
code = code.replace(
/\{\/\* Dynamic Glass Background \*\/\}\s*<div className="fixed inset-0 z-\[-1\] bg-gradient-to-br from-slate-100 via-stone-100 to-zinc-200 overflow-hidden pointer-events-none">\s*<div className="absolute top-\[-10%\] left-\[-10%\] w-\[40%\] h-\[40%\] rounded-full bg-blue-400\/20 blur-\[100px\] mix-blend-multiply" \/>\s*<div className="absolute top-\[20%\] right-\[-10%\] w-\[50%\] h-\[50%\] rounded-full bg-purple-400\/20 blur-\[120px\] mix-blend-multiply" \/>\s*<div className="absolute bottom-\[-10%\] left-\[20%\] w-\[60%\] h-\[60%\] rounded-full bg-rose-300\/20 blur-\[120px\] mix-blend-multiply" \/>\s*<\/div>/,
""
);

// 2. Set min-h-screen bg to white
code = code.replace(
/<div className="min-h-screen flex flex-col relative z-0">/,
'<div className="min-h-screen flex flex-col relative z-0 bg-white">'
);

// 3. Update header glass to be a little darker (black/5)
code = code.replace(
/className="pointer-events-auto transition-all duration-\[800ms\] ease-out w-full max-w-\[95%\] 2xl:max-w-\[95rem\] bg-white\/40 backdrop-blur-3xl shadow-\[0_4px_16px_rgba\(0,0,0,0\.04\)\] rounded-\[2rem\] border border-white\/10"/,
'className="pointer-events-auto transition-all duration-[800ms] ease-out w-full max-w-[95%] 2xl:max-w-[95rem] bg-black/5 backdrop-blur-3xl shadow-[0_4px_16px_rgba(0,0,0,0.05)] rounded-[2rem] border border-black/5"'
);

fs.writeFileSync('src/App.tsx', code);
