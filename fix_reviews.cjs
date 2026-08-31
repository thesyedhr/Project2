const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

const reviewsRegex = /\{\/\* Reviews Grid \*\/\}([\s\S]*?)<\/section>/;

const newReviewsGrid = `{/* Reviews Carousel */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 px-4 sm:px-8 -mx-4 sm:-mx-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {[
            {
              name: 'Marcus Vance',
              location: 'New York, NY',
              badge: 'Verified Buyer',
              shoe: 'Off-White x Nike Air Force 1',
              rating: 5,
              title: 'Unbeatable authenticity & speed',
              review: 'Double boxed with full verification tags. Came in flawless deadstock condition. ShoeMania is hands down my most trusted source for high-tier grails.',
              date: '2 days ago',
              initials: 'MV',
            },
            {
              name: 'Elena Rostova',
              location: 'Los Angeles, CA',
              badge: 'Verified Buyer',
              shoe: 'New Balance X-90 Suede',
              rating: 5,
              title: 'Art-piece packaging & zero flaws',
              review: 'Passed independent third-party authentication with flying colors. The attention to detail in packaging and original box preservation is next level.',
              date: '1 week ago',
              initials: 'ER',
            },
            {
              name: 'Devon Hayes',
              location: 'Chicago, IL',
              badge: 'Verified Buyer',
              shoe: 'Adidas Yeezy Boost 350 V2',
              rating: 5,
              title: 'Found my grail in under 48 hours',
              review: 'I had been hunting this colorway for over two years. Delivered pristine with flawless stitching, genuine tags, and perfect fit.',
              date: '2 weeks ago',
              initials: 'DH',
            },
            {
              name: 'Sarah Jenkins',
              location: 'Miami, FL',
              badge: 'Verified Buyer',
              shoe: 'Nike SB Dunk Low Pro',
              rating: 5,
              title: 'Insane fast shipping',
              review: 'Was blown away by how quickly this arrived. Grails verified, crisp box. Will be coming back for more.',
              date: '3 weeks ago',
              initials: 'SJ',
            },
            {
              name: 'Liam Carter',
              location: 'London, UK',
              badge: 'Verified Buyer',
              shoe: 'Air Jordan 1 Retro High',
              rating: 5,
              title: 'Pristine authentication',
              review: 'The peace of mind I get shopping here is unmatched. They authenticate perfectly, and the shoe was absolutely flawless.',
              date: '1 month ago',
              initials: 'LC',
            },
            {
              name: 'Chloe Tran',
              location: 'Toronto, ON',
              badge: 'Verified Buyer',
              shoe: 'Nike Air Max 270 React',
              rating: 5,
              title: 'Incredible customer service',
              review: 'Had a question about sizing and support got back to me instantly. The shoes fit perfectly and look phenomenal in person.',
              date: '1 month ago',
              initials: 'CT',
            },
            {
              name: 'James Wilson',
              location: 'Sydney, AU',
              badge: 'Verified Buyer',
              shoe: 'TS Dunk Low',
              rating: 5,
              title: 'Holy grail acquired',
              review: 'Been looking for these forever. The condition is absolutely perfect. Could not be happier with the purchase experience.',
              date: '1 month ago',
              initials: 'JW',
            },
            {
              name: 'Maya Patel',
              location: 'Austin, TX',
              badge: 'Verified Buyer',
              shoe: 'JRDN 4 \\'BRED REIMAGINED\\'',
              rating: 5,
              title: 'Best drop experience',
              review: 'The drop was so smooth and the shipping was immediate. No bots, just pure sneakerhead heaven. A+ service.',
              date: '2 months ago',
              initials: 'MP',
            },
            {
              name: 'David Kim',
              location: 'Seattle, WA',
              badge: 'Verified Buyer',
              shoe: 'KOBE 8 \\'COURT PURPLE\\'',
              rating: 5,
              title: 'Perfect transaction',
              review: 'Box was beautifully protected, came with all the original accessories. Flawless execution from start to finish.',
              date: '2 months ago',
              initials: 'DK',
            },
            {
              name: 'Anna Dubois',
              location: 'Paris, FR',
              badge: 'Verified Buyer',
              shoe: 'DIOR 1 HIGH',
              rating: 5,
              title: 'Luxury treatment',
              review: 'For a piece this rare and expensive, the handling was perfect. Everything arrived in immaculate condition. 10/10.',
              date: '3 months ago',
              initials: 'AD',
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-zinc-50/70 hover:bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between text-left min-w-[320px] max-w-[320px] sm:min-w-[400px] sm:max-w-[400px] snap-center snap-always"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-zinc-900 text-zinc-900" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-700 bg-white px-3 py-1 rounded-full border border-zinc-200/80 shadow-2xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-zinc-900" />
                    {item.badge}
                  </span>
                </div>
                <h3 className="font-sans font-bold text-zinc-900 text-lg tracking-tight mb-2.5">
                  {item.title}
                </h3>
                <p className="text-zinc-600 font-sans text-sm sm:text-base leading-relaxed mb-6 font-normal">
                  "{item.review}"
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-200/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-900 text-white font-sans text-xs font-bold flex items-center justify-center tracking-wider shrink-0">
                    {item.initials}
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-sans font-bold text-zinc-900 text-sm tracking-wide uppercase leading-tight truncate">{item.name}</p>
                    <p className="text-xs text-zinc-500 font-medium tracking-wide mt-0.5 truncate">{item.shoe}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>`;

if (reviewsRegex.test(content)) {
  content = content.replace(reviewsRegex, newReviewsGrid);
  fs.writeFileSync('src/App.tsx', content);
  console.log("Successfully replaced reviews");
} else {
  console.log("Failed to find reviews section");
}
