const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

const heroImagesRegex = /const heroImages = \[\s*\{[\s\S]*?\];/;
const newHeroImages = `const heroImages = [
  {
    url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=1200',
    title: 'Nike Air Force 1 \\'07',
  },
  {
    url: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&q=80&w=1200',
    title: 'Nike Air Max 90',
  },
  {
    url: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=1200',
    title: 'Nike Air Max 270 React',
  },
  {
    url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1200',
    title: 'Nike Air Max 270 React Yellow',
  },
];`;

content = content.replace(heroImagesRegex, newHeroImages);

fs.writeFileSync('src/App.tsx', content);
