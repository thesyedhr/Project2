#!/bin/bash
sed -i 's/url: '"'"'https:\/\/images.unsplash.com\/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=1200'"'"',/url: '"'"'https:\/\/images.unsplash.com\/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=1200'"'"',/g' src/App.tsx
sed -i 's/title: '"'"'Nike SB Dunk Low Pro'"'"',/title: '"'"'Nike Air Force 1 \\'07'"'"',/g' src/App.tsx
