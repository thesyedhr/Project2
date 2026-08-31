const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Revert Hero text
const currentHeroText = `<h1 className="text-5xl lg:text-[70px] font-bold text-zinc-900 leading-[1.1] lg:leading-[75px] mb-6 drop-shadow-sm font-display tracking-tight flex flex-col">
                <div className="overflow-hidden"><motion.span className="block" initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>THE ULTIMATE</motion.span></div>
                <div className="overflow-hidden"><motion.span className="block text-zinc-500" initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>SNEAKER</motion.span></div>
                <div className="overflow-hidden"><motion.span className="block" initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}>DESTINATION.</motion.span></div>
              </h1>
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="text-[14px] leading-relaxed text-left text-zinc-700 mb-8 max-w-lg font-sans drop-shadow-sm"
              >`;

const oldHeroText = `<h1 className="text-5xl lg:text-[70px] font-bold text-zinc-900 leading-[1.1] lg:leading-[75px] mb-6 drop-shadow-sm font-display tracking-tight">
                THE ULTIMATE <br />
                <span className="text-zinc-500">SNEAKER</span> <br />
                DESTINATION.
              </h1>
              <p className="text-[14px] leading-relaxed text-left text-zinc-700 mb-8 max-w-lg font-sans drop-shadow-sm">`;

content = content.replace(currentHeroText, oldHeroText);
// Make sure to also fix the closing </motion.p>
content = content.replace(
  'Discover the latest releases and timeless classics from the world\'s most iconic brands. Specially curated collections from Nike, Adidas, New Balance, and more.\n              </motion.p>',
  'Discover the latest releases and timeless classics from the world\'s most iconic brands. Specially curated collections from Nike, Adidas, New Balance, and more.\n              </p>'
);


// Revert Product Cards
const newProductCard = `whileHover={{ scale: 1.03, y: -4, transition: { type: "spring", stiffness: 400, damping: 30, delay: 0 } }}
                          whileTap={{ scale: 0.98, transition: { type: "spring", stiffness: 400, damping: 30, delay: 0 } }}
                          className="relative group flex flex-col bg-zinc-50/80 backdrop-blur-xl border border-zinc-200/60 p-4 shadow-sm rounded-[2rem] transition-colors duration-500 hover:bg-white hover:z-10 hover:shadow-2xl cursor-pointer"`;

const oldProductCard = `className="relative group flex flex-col bg-zinc-50/80 backdrop-blur-xl border border-zinc-200/60 p-4 shadow-sm rounded-[2rem] transition-all duration-300 hover:bg-white/60 hover:scale-[1.03] hover:z-10 hover:shadow-xl cursor-pointer"`;

content = content.replaceAll(newProductCard, oldProductCard);

// Revert Drops Cards
const newDropsCard = `whileHover={{ scale: 1.03, y: -4, transition: { type: "spring", stiffness: 400, damping: 30, delay: 0 } }}
                  whileTap={{ scale: 0.98, transition: { type: "spring", stiffness: 400, damping: 30, delay: 0 } }}
                  className="relative group bg-zinc-50/80 backdrop-blur-xl border border-zinc-200/60 p-5 shadow-sm rounded-[2.5rem] transition-colors duration-500 hover:bg-white hover:shadow-2xl cursor-pointer overflow-hidden flex flex-col"`;

const oldDropsCard = `className="relative group bg-zinc-50/80 backdrop-blur-xl border border-zinc-200/60 p-5 shadow-sm rounded-[2.5rem] transition-all duration-300 hover:bg-white/60 hover:scale-[1.02] hover:shadow-xl cursor-pointer overflow-hidden flex flex-col"`;

content = content.replaceAll(newDropsCard, oldDropsCard);

// Revert Vault Cards
const newVaultCard = `className="relative flex-1 md:hover:flex-[3.5] min-w-[280px] md:min-w-0 h-[400px] md:h-[450px] md:hover:h-[550px] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-[2rem] overflow-hidden group cursor-pointer shadow-sm hover:shadow-2xl border border-black/5 snap-center active:scale-[0.99]"`;

const oldVaultCard = `className="relative flex-1 md:hover:flex-[3.5] min-w-[280px] md:min-w-0 h-[400px] md:h-[450px] md:hover:h-[550px] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-[2rem] overflow-hidden group cursor-pointer shadow-sm border border-black/5 snap-center"`;

content = content.replaceAll(newVaultCard, oldVaultCard);

fs.writeFileSync('src/App.tsx', content);
