const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Quick view modal
content = content.replace(
  /initial=\{\{ opacity: 0, scale: 0\.95 \}\}\n\s*animate=\{\{ opacity: 1, scale: 1 \}\}\n\s*exit=\{\{ opacity: 0, scale: 0\.95 \}\}/g,
  'initial={{ opacity: 0, scale: 0.96, y: 20 }}\n            animate={{ opacity: 1, scale: 1, y: 0 }}\n            exit={{ opacity: 0, scale: 0.96, y: 20 }}\n            transition={{ type: "spring", stiffness: 300, damping: 25 }}'
);

// Menu panels (Cart, Wishlist) sliding from right
content = content.replace(
  /initial=\{\{ x: '100%' \}\}\n\s*animate=\{\{ x: 0 \}\}\n\s*exit=\{\{ x: '100%' \}\}\n\s*transition=\{\{ type: 'tween', duration: 0\.3 \}\}/g,
  'initial={{ x: "100%", opacity: 0.5 }}\n              animate={{ x: 0, opacity: 1 }}\n              exit={{ x: "100%", opacity: 0.5 }}\n              transition={{ type: "spring", stiffness: 250, damping: 30, mass: 0.8 }}'
);

// Mobile menu sliding from top
content = content.replace(
  /initial=\{\{ opacity: 0, y: -20 \}\}\n\s*animate=\{\{ opacity: 1, y: 0 \}\}\n\s*exit=\{\{ opacity: 0, y: -20 \}\}\n\s*className="md:hidden/g,
  'initial={{ opacity: 0, y: -20, scale: 0.98 }}\n              animate={{ opacity: 1, y: 0, scale: 1 }}\n              exit={{ opacity: 0, y: -20, scale: 0.98 }}\n              transition={{ type: "spring", stiffness: 300, damping: 25 }}\n              className="md:hidden'
);


fs.writeFileSync('src/App.tsx', content);
