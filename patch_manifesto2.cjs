const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

const oldManifesto = `{/* Manifesto Section */}
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

const newManifesto = `{/* Manifesto Section */}
      <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative z-10 flex justify-center">
        <div className="max-w-6xl w-full relative">
          {/* Subtle background glow to make the glass effect visible over white */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-zinc-200/60 rounded-full blur-[100px] -z-10" />

          <div className="bg-zinc-50/80 backdrop-blur-2xl border border-zinc-200/60 rounded-[3rem] shadow-sm p-12 md:p-16 lg:p-24 relative overflow-hidden flex flex-col items-center">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 leading-[1.1] text-center mb-16 md:mb-24">
              CURATING THE BEST.<br />IGNORING THE REST.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 lg:gap-16 w-full max-w-5xl">
              <div className="flex flex-col items-center text-center">
                <span className="text-5xl font-display text-zinc-300 mb-4 leading-none">"</span>
                <p className="text-zinc-600 font-sans text-sm md:text-base leading-relaxed font-medium mb-6 flex-1">
                  Sneakers aren't just footwear. They are wearable art, living history, and a universal language of expression.
                </p>
                <p className="text-xs font-bold tracking-widest text-zinc-900 uppercase">— The Culture</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <span className="text-5xl font-display text-zinc-300 mb-4 leading-none">"</span>
                <p className="text-zinc-600 font-sans text-sm md:text-base leading-relaxed font-medium mb-6 flex-1">
                  We authenticate and verify every single pair, ensuring you only step out in one-hundred percent guaranteed authenticity.
                </p>
                <p className="text-xs font-bold tracking-widest text-zinc-900 uppercase">— The Standard</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <span className="text-5xl font-display text-zinc-300 mb-4 leading-none">"</span>
                <p className="text-zinc-600 font-sans text-sm md:text-base leading-relaxed font-medium mb-6 flex-1">
                  From timeless retro classics to the most elusive modern drops, we bring the world's finest silhouettes directly to your door.
                </p>
                <p className="text-xs font-bold tracking-widest text-zinc-900 uppercase">— The Journey</p>
              </div>
            </div>
          </div>
        </div>
      </section>`;

code = code.replace(oldManifesto, newManifesto);
fs.writeFileSync('src/App.tsx', code);
