const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

if (!content.includes('import { ReviewsCarousel }')) {
  content = content.replace(
    /import \{ motion, AnimatePresence \} from 'framer-motion';/,
    "import { motion, AnimatePresence } from 'framer-motion';\nimport { ReviewsCarousel } from './components/ReviewsCarousel';"
  );
  fs.writeFileSync('src/App.tsx', content);
  console.log("Fixed import.");
}
