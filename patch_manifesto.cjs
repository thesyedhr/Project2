const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

const oldManifesto = `{/* Manifesto Section */}
      <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto bg-zinc-900/70 backdrop-blur-2xl border border-zinc-700/50 rounded-[3rem] shadow-md p-16 lg:p-24 text-center">
          <h2 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-lg">
            CURATING THE BEST.<br />IGNORING THE REST.
          </h2>
        </div>
      </section>`;

const newManifesto = `{/* Manifesto Section */}
      <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative z-10 flex justify-center">
        <div className="max-w-5xl w-full relative">
          {/* Subtle background glow to make the glass effect visible over white */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-zinc-200/80 rounded-full blur-[80px] -z-10" />
          
          <div className="bg-zinc-50/80 backdrop-blur-2xl border border-zinc-200/60 rounded-[3rem] shadow-sm p-16 lg:p-24 text-center relative overflow-hidden">
            {/* Minimalist Accent */}
            <div className="flex justify-center mb-10">
              <div className="w-12 h-1 bg-zinc-900 rounded-full"></div>
            </div>
            
            <h2 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-zinc-900 leading-[1.1]">
              CURATING THE BEST.<br />
              <span className="text-zinc-400">IGNORING THE REST.</span>
            </h2>
          </div>
        </div>
      </section>`;

code = code.replace(oldManifesto, newManifesto);
fs.writeFileSync('src/App.tsx', code);
