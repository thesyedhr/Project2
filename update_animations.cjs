const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Smoother slider transition using a beautiful spring
content = content.replace(
  /transition=\{\{\s*duration: 0\.7,\s*ease: \[0\.16, 1, 0\.3, 1\],\s*\}\}/g,
  `transition={{
                      type: "spring",
                      stiffness: 150,
                      damping: 30,
                      mass: 0.8,
                    }}`
);

// 2. Add staggered hero text animation
const oldHeroText = `<h1 className="text-5xl lg:text-[70px] font-bold text-zinc-900 leading-[1.1] lg:leading-[75px] mb-6 drop-shadow-sm font-display tracking-tight">
                THE ULTIMATE <br />
                <span className="text-zinc-500">SNEAKER</span> <br />
                DESTINATION.
              </h1>
              <p className="text-[14px] leading-relaxed text-left text-zinc-700 mb-8 max-w-lg font-sans drop-shadow-sm">`;

const newHeroText = `<h1 className="text-5xl lg:text-[70px] font-bold text-zinc-900 leading-[1.1] lg:leading-[75px] mb-6 drop-shadow-sm font-display tracking-tight flex flex-col">
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

content = content.replace(oldHeroText, newHeroText);

fs.writeFileSync('src/App.tsx', content);
