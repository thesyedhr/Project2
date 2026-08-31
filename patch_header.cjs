const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(
/className="pointer-events-auto transition-all duration-\[800ms\] ease-out w-full max-w-\[95%\] 2xl:max-w-\[95rem\] bg-black\/10 backdrop-blur-3xl shadow-\[0_4px_16px_rgba\(0,0,0,0\.08\)\] rounded-\[2rem\] border border-black\/10"/,
'className="pointer-events-auto transition-all duration-[800ms] ease-out w-full max-w-[95%] 2xl:max-w-[95rem] bg-white/90 backdrop-blur-3xl shadow-[0_8px_32px_rgba(0,0,0,0.06)] rounded-[2rem] border border-zinc-200/50"'
);

fs.writeFileSync('src/App.tsx', code);
