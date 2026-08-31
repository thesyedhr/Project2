sed -i 's/<\/main>/<\/main>\n      <div id="about" className="scroll-spy-section">/g' src/App.tsx
sed -i 's/<footer id="about" className="scroll-spy-section bg-white\/50 backdrop-blur-2xl border-t border-white\/60 text-zinc-900 py-16 lg:py-24 relative z-10">/<footer className="bg-white\/50 backdrop-blur-2xl border-t border-white\/60 text-zinc-900 py-16 lg:py-24 relative z-10">/g' src/App.tsx
sed -i 's/<\/footer>/<\/footer>\n      <\/div>/g' src/App.tsx
