const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add the import
if (!content.includes('ReviewsCarousel')) {
  content = content.replace(
    /import \{ Star, CheckCircle2 \} from 'lucide-react';/,
    "import { Star, CheckCircle2 } from 'lucide-react';\nimport { ReviewsCarousel } from './components/ReviewsCarousel';"
  );
}

// 2. Replace the old review carousel
const reviewsRegex = /\{\/\* Reviews Carousel \*\/\}([\s\S]*?)<\/section>/;
const replacement = `{/* Reviews Carousel */}
        <ReviewsCarousel />
      </section>`;

if (reviewsRegex.test(content)) {
  content = content.replace(reviewsRegex, replacement);
  fs.writeFileSync('src/App.tsx', content);
  console.log("Successfully replaced reviews section.");
} else {
  console.log("Failed to find reviews section.");
}
