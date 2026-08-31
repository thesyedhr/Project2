import { ReviewsCarousel } from "./components/ReviewsCarousel";
import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Bell, X, Menu, Search, ArrowRight, Truck, ShieldCheck, RefreshCcw, ChevronLeft, ChevronRight, Star, CheckCircle2, Quote, Heart, Flame } from 'lucide-react';
import { products, Product, Brand } from './data';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { ProductImage } from './components/ProductImage';
import { LogoIcon, Logo } from './components/Logo';

const heroImages = [
  {
    url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=1200',
    title: 'Nike Air Force 1 \'07',
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
];

export default function App() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [activeBrand, setActiveBrand] = useState<Brand | 'All' | 'About' | 'Hero'>('Hero');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<{ product: Product; quantity: number }[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVaultAccessOpen, setIsVaultAccessOpen] = useState(false);
  const [isDropsModalOpen, setIsDropsModalOpen] = useState(false);
  const [notifiedDrops, setNotifiedDrops] = useState<string[]>([]);
  const [emailPromptDropId, setEmailPromptDropId] = useState<string | null>(null);
  const [notifyEmail, setNotifyEmail] = useState('');

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [heroImageIndex, setHeroImageIndex] = useState(0);
  const [prevHeroImageIndex, setPrevHeroImageIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);

  const brandSlogans: Record<Brand, string> = {
    'Nike': 'Just Do It.',
    'Adidas': 'Impossible Is Nothing.',
    'New Balance': 'Fearlessly Independent Since 1906.',
    'ASICS': 'Sound Mind, Sound Body.',
    'Puma': 'Forever Faster.',
    'Vans': 'Off The Wall.',
    'Converse': 'Shoes Are Boring. Wear Sneakers.',
    'Reebok': 'Life Is Not A Spectator Sport.',
  };

  useEffect(() => {
    if (isCartOpen || isWishlistOpen || isMobileMenuOpen || isVaultAccessOpen || isDropsModalOpen || quickViewProduct !== null || emailPromptDropId !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isCartOpen, isWishlistOpen, isMobileMenuOpen, isVaultAccessOpen, isDropsModalOpen, quickViewProduct, emailPromptDropId]);

  // Global search shortcut (Cmd+K / Ctrl+K / Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
        setTimeout(() => searchInputRef.current?.focus(), 50);
      } else if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
        setSearchQuery('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  const handleNextSlide = () => {
    setSlideDirection(1);
    setHeroImageIndex((prev) => (prev + 1) % heroImages.length);
  };

  const handlePrevSlide = () => {
    setSlideDirection(-1);
    setHeroImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNextSlide();
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const allBrands = ['Nike', 'Adidas', 'New Balance', 'ASICS', 'Puma', 'Vans', 'Converse', 'Reebok'] as const;

  // Scroll Spy for brands
  useEffect(() => {
    let ticking = false;

    const handleScrollSpy = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const triggerY = 220; // 220px from top of viewport (below floating sticky header)

          // 1. Check About (Release Calendar) section
          const aboutEl = document.getElementById('release-calendar');
          if (aboutEl && aboutEl.getBoundingClientRect().top <= triggerY) {
            setActiveBrand('About');
            ticking = false;
            return;
          }

          // 2. Collect existing brand section elements in layout order
          const brandEls = allBrands
            .map((b) => ({ brand: b, el: document.getElementById(`brand-${b}`) }))
            .filter((item): item is { brand: Brand; el: HTMLElement } => item.el !== null);

          const firstBrandTop = brandEls.length > 0 ? brandEls[0].el.getBoundingClientRect().top : Infinity;

          // If trigger line is inside brand sections (Nike and beyond)
          if (triggerY >= firstBrandTop && brandEls.length > 0) {
            for (let i = 0; i < brandEls.length; i++) {
              const currentRect = brandEls[i].el.getBoundingClientRect();
              const nextEl = brandEls[i + 1]?.el;
              const nextTop = nextEl
                ? nextEl.getBoundingClientRect().top
                : (aboutEl ? aboutEl.getBoundingClientRect().top : currentRect.bottom);

              if (triggerY >= currentRect.top && triggerY < nextTop) {
                setActiveBrand(brandEls[i].brand);
                ticking = false;
                return;
              }
            }
          }

          // 3. Check if in "ALL" zone (Featured Brands down to first brand section)
          const featuredEl = document.getElementById('featured-brands');
          const featuredTop = featuredEl ? featuredEl.getBoundingClientRect().top : firstBrandTop;

          if (triggerY >= featuredTop && triggerY < firstBrandTop) {
            setActiveBrand('All');
            ticking = false;
            return;
          }

          // 4. Otherwise in Hero section (above Featured Brands)
          setActiveBrand('Hero');

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy();

    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);
  const filteredProductsSearch = products.filter(p => {
    return p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
           p.brand.toLowerCase().includes(searchQuery.toLowerCase());
  });
  const trendingProducts = products.filter(p => p.trending).slice(0, 4);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col relative z-0 bg-white">
      

      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none p-3 sm:p-4">
        <LayoutGroup id="header-nav">
          <motion.nav 
            layout
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              layout: { 
                type: "spring", 
                stiffness: 280, 
                damping: 26, 
                mass: 0.7 
              },
              duration: 0.8, 
              ease: [0.16, 1, 0.3, 1] 
            }}
            className="pointer-events-auto w-fit max-w-[96vw] bg-zinc-50/90 backdrop-blur-2xl border border-zinc-200/80 shadow-md rounded-full relative overflow-hidden"
          >
            <motion.div layout="position" className="px-4 sm:px-6 flex items-center justify-between gap-4 sm:gap-8 h-14 sm:h-16">
              {/* Logo Area */}
              <motion.div layout="position" className="flex items-center flex-shrink-0">
                <button 
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="p-2 mr-2 lg:hidden text-zinc-900 hover:bg-black/5 rounded-full transition-colors"
                  aria-label="Open navigation menu"
                >
                  <Menu className="w-5 h-5" strokeWidth={2.5} />
                </button>
                <a href="#" className="flex items-center group">
                  <motion.div 
                    layout="position"
                    whileHover={{ scale: 1.05, rotate: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-zinc-900 text-white flex items-center justify-center border border-zinc-700/60 shadow-sm transition-colors duration-300 w-8 h-8 rounded-full shrink-0 group-hover:bg-zinc-800"
                  >
                    <LogoIcon className="w-4 h-4" />
                  </motion.div>
                  <motion.span 
                    layout="position"
                    className="font-display font-bold tracking-wider ml-3 text-zinc-900 text-xl hidden sm:inline whitespace-nowrap group-hover:text-zinc-700 transition-colors"
                  >
                    SHOEMANIA
                  </motion.span>
                </a>
              </motion.div>

              {/* Desktop Filters */}
              <motion.div layout="position" className="hidden lg:flex items-center gap-1 flex-shrink-0">
                <motion.button
                  layout="position"
                  transition={{ type: "spring", stiffness: 280, damping: 26, mass: 0.7 }}
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setActiveBrand('All');
                  }}
                  className={`relative px-3.5 py-1.5 rounded-full font-sans text-xs sm:text-[13px] font-bold tracking-wide uppercase whitespace-nowrap flex-shrink-0 transition-colors duration-300 ${activeBrand === 'All' ? 'text-zinc-900' : 'text-zinc-600 hover:text-zinc-900 hover:bg-black/5'}`}
                >
                  {activeBrand === 'All' && (
                    <motion.div layoutId="active-pill" className="absolute inset-0 bg-black/5 backdrop-blur-xl border border-black/5 rounded-full -z-10" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
                  )}
                  ALL
                </motion.button>
                {allBrands.map((brand) => (
                  <motion.button
                    key={brand}
                    layout="position"
                    transition={{ type: "spring", stiffness: 280, damping: 26, mass: 0.7 }}
                    onClick={() => {
                      document.getElementById(`brand-${brand}`)?.scrollIntoView({ behavior: 'smooth' });
                      setActiveBrand(brand);
                    }}
                    className={`relative px-3.5 py-1.5 rounded-full font-sans text-xs sm:text-[13px] font-bold tracking-wide uppercase whitespace-nowrap flex-shrink-0 transition-colors duration-300 ${activeBrand === brand ? 'text-zinc-900' : 'text-zinc-600 hover:text-zinc-900 hover:bg-black/5'}`}
                  >
                    {activeBrand === brand && (
                      <motion.div layoutId="active-pill" className="absolute inset-0 bg-black/5 backdrop-blur-xl border border-black/5 rounded-full -z-10" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
                    )}
                    {brand}
                  </motion.button>
                ))}
                <motion.button 
                  layout="position"
                  transition={{ type: "spring", stiffness: 280, damping: 26, mass: 0.7 }}
                  onClick={() => document.getElementById('release-calendar')?.scrollIntoView({ behavior: 'smooth' })}
                  className={`relative px-3.5 py-1.5 rounded-full font-sans text-xs sm:text-[13px] font-bold tracking-wide uppercase whitespace-nowrap flex-shrink-0 transition-colors duration-300 ${activeBrand === 'About' ? 'text-zinc-900' : 'text-zinc-600 hover:text-zinc-900 hover:bg-black/5'} hidden xl:block`}
                >
                  {activeBrand === 'About' && (
                    <motion.div layoutId="active-pill" className="absolute inset-0 bg-black/5 backdrop-blur-xl border border-black/5 rounded-full -z-10" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
                  )}
                  About
                </motion.button>
              </motion.div>

              {/* Actions */}
              <motion.div layout="position" className="flex items-center gap-2 flex-shrink-0">
                <AnimatePresence mode="popLayout" initial={false}>
                  {isSearchOpen ? (
                    <motion.div
                      key="search-bar-open"
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ 
                        layout: { type: "spring", stiffness: 280, damping: 26, mass: 0.7 },
                        opacity: { duration: 0.18 },
                        scale: { duration: 0.18 }
                      }}
                      className="flex items-center gap-2 pr-0.5 overflow-hidden"
                    >
                      {/* Header Aesthetic Search Input Capsule */}
                      <div className="flex items-center bg-black/5 backdrop-blur-xl border border-black/5 rounded-full h-9 sm:h-10 px-4 transition-all duration-200">
                        <input
                          ref={searchInputRef}
                          type="text"
                          placeholder="Search shoes..."
                          value={searchQuery}
                          onChange={(e) => {
                            setSearchQuery(e.target.value);
                            if (e.target.value.trim()) {
                              const el = document.getElementById('products-top');
                              if (el) {
                                const rect = el.getBoundingClientRect();
                                if (rect.top > 350 || rect.bottom < 50) {
                                  el.scrollIntoView({ behavior: 'smooth' });
                                }
                              }
                            }
                          }}
                          className="w-36 sm:w-52 bg-transparent text-xs sm:text-sm font-sans font-medium text-zinc-900 placeholder:text-zinc-500 focus:outline-none focus:ring-0 pr-1"
                          autoFocus
                        />
                        <Search className="w-4 h-4 text-zinc-600 shrink-0" strokeWidth={2} />
                      </div>

                      {/* Close X Button matching Hero Shop Collection button styling */}
                      <button
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-zinc-800/60 backdrop-blur-xl border border-zinc-600/50 text-white flex items-center justify-center shadow-sm shrink-0 cursor-pointer"
                        title="Close Search (Esc)"
                      >
                        <X className="w-4 h-4 text-white" strokeWidth={2.5} />
                      </button>
                    </motion.div>
                  ) : (
                    <motion.button 
                      key="search-icon-btn"
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      transition={{ 
                        layout: { type: "spring", stiffness: 280, damping: 26, mass: 0.7 },
                        duration: 0.15 
                      }}
                      onClick={() => {
                        setIsSearchOpen(true);
                        setTimeout(() => searchInputRef.current?.focus(), 60);
                      }}
                      className="p-2.5 text-zinc-900 hover:bg-black/5 rounded-full transition-colors"
                      title="Search Shoes (⌘K)"
                    >
                      <Search className="w-5 h-5" strokeWidth={2.5} />
                    </motion.button>
                  )}
                </AnimatePresence>
                
                <motion.button 
                  layout="position"
                  transition={{ type: "spring", stiffness: 280, damping: 26, mass: 0.7 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsWishlistOpen(true)}
                  className="p-2.5 text-zinc-900 hover:bg-black/5 rounded-full transition-colors relative hidden sm:block"
                  title="Wishlist"
                >
                  <Heart className="w-5 h-5" strokeWidth={2.5} fill={wishlist.length > 0 ? "currentColor" : "none"} />
                  {wishlist.length > 0 && (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
                  )}
                </motion.button>
                <motion.button 
                  layout="position"
                  transition={{ type: "spring", stiffness: 280, damping: 26, mass: 0.7 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsCartOpen(true)}
                  className="p-2 text-zinc-900 hover:bg-black/5 rounded-full transition-colors relative"
                  title="Shopping Bag"
                >
                  <ShoppingBag className="w-4.5 h-4.5" strokeWidth={2.5} />
                  <AnimatePresence>
                    {cartCount > 0 && (
                      <motion.span 
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute top-0.5 right-0.5 translate-x-1 -translate-y-1 w-[18px] h-[18px] bg-zinc-900 text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm border border-zinc-700"
                      >
                        {cartCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.nav>
        </LayoutGroup>
      </div>

      {/* Hero Section */}
      <div id="hero" className="scroll-spy-section relative overflow-hidden pt-12 lg:pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 lg:pt-20 lg:pb-24 mt-[48px] relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-10"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-[70px] font-bold text-zinc-900 leading-[1.1] lg:leading-[75px] mb-6 drop-shadow-sm font-display tracking-tight">
                THE ULTIMATE <br />
                <span className="text-zinc-500">SNEAKER</span> <br />
                DESTINATION.
              </h1>
              <p className="text-[14px] leading-relaxed text-left text-zinc-700 mb-8 max-w-lg font-sans drop-shadow-sm">
                Discover the latest releases and timeless classics from the world's most iconic brands. Specially curated collections from Nike, Adidas, New Balance, and more.
              </p>
              <motion.button 
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                onClick={() => {
                  document.getElementById('products-top')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 bg-zinc-800/60 backdrop-blur-xl border border-zinc-600/50 text-white px-5 py-2 rounded-full font-sans text-sm font-bold tracking-wider uppercase hover:bg-zinc-700/80 transition-all shadow-sm"
              >
                Shop Collection <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>

              {/* Features Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-2xl text-left pr-0 mt-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-50/80 backdrop-blur-xl border border-zinc-200/50 shadow-sm flex items-center justify-center text-zinc-900 flex-shrink-0">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xs text-zinc-900 tracking-wide uppercase">Free Shipping</h3>
                    <p className="text-zinc-500 font-medium text-xs mt-0.5">Over $150</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-50/80 backdrop-blur-xl border border-zinc-200/50 shadow-sm flex items-center justify-center text-zinc-900 flex-shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xs text-zinc-900 tracking-wide uppercase">100% Authentic</h3>
                    <p className="text-zinc-500 font-medium text-xs mt-0.5">Guaranteed</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-50/80 backdrop-blur-xl border border-zinc-200/50 shadow-sm flex items-center justify-center text-zinc-900 flex-shrink-0">
                    <RefreshCcw className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xs text-zinc-900 tracking-wide uppercase">Easy Returns</h3>
                    <p className="text-zinc-500 font-medium text-xs mt-0.5">30-day policy</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
              className="relative block h-[320px] sm:h-[420px] lg:h-full lg:min-h-[520px] group mt-8 lg:mt-0"
            >
              <div className="absolute inset-0 rounded-[3rem] overflow-hidden shadow-md bg-zinc-100 border border-zinc-200/60">
                {/* Underlying base image to prevent black screen flashes */}
                <img
                  src={heroImages[prevHeroImageIndex].url}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <AnimatePresence initial={false} custom={slideDirection}>
                  <motion.img
                    key={heroImageIndex}
                    src={heroImages[heroImageIndex].url}
                    alt={heroImages[heroImageIndex].title}
                    custom={slideDirection}
                    initial={(dir: number) => ({
                      x: dir > 0 ? '100%' : '-100%',
                    })}
                    animate={{
                      x: '0%',
                    }}
                    exit={(dir: number) => ({
                      x: dir > 0 ? '-100%' : '100%',
                    })}
                    transition={{
                      type: "spring",
                      stiffness: 150,
                      damping: 30,
                      mass: 0.8,
                    }}
                    onAnimationComplete={() => setPrevHeroImageIndex(heroImageIndex)}
                    className="absolute inset-0 w-full h-full object-cover z-10"
                  />
                </AnimatePresence>

                

                {/* Image caption badge - Dark translucent glass blurred pill */}
                <div className="absolute top-6 left-6 z-20 bg-white/80 backdrop-blur-xl border border-zinc-200/60 px-5 py-2.5 rounded-full text-zinc-900 font-sans text-sm font-bold tracking-wider uppercase flex items-center gap-3 shadow-sm">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500/60 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
                  </span>
                  <div className="h-5 overflow-hidden relative inline-flex items-center">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={heroImageIndex}
                        initial={{ opacity: 0, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, filter: 'blur(4px)' }}
                        transition={{ duration: 0.3 }}
                        className="whitespace-nowrap inline-block text-zinc-900 font-display font-bold text-[15px] tracking-wider"
                      >
                        {heroImages[heroImageIndex].title}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Navigation arrows */}
                <button
                  onClick={handlePrevSlide}
                  className="absolute left-6 top-1/2 -translate-y-1/2 z-20 text-white/90 mix-blend-difference flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out hover:scale-110 active:scale-95"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-10 h-10" strokeWidth={2} />
                </button>
                <button
                  onClick={handleNextSlide}
                  className="absolute right-6 top-1/2 -translate-y-1/2 z-20 text-white/90 mix-blend-difference flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out hover:scale-110 active:scale-95"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-10 h-10" strokeWidth={2} />
                </button>

                {/* Slide indicator dots */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
                  {heroImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSlideDirection(idx > heroImageIndex ? 1 : -1);
                        setHeroImageIndex(idx);
                      }}
                      className={`h-2 rounded-full transition-all duration-500 ${idx === heroImageIndex ? 'w-6 bg-zinc-900' : 'w-2 bg-zinc-300 hover:bg-zinc-400'}`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Featured Brands */}
                <section id="featured-brands" className="scroll-spy-section py-16 lg:py-24 relative">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center text-center mb-12">
                      <div className="flex flex-col items-center">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 text-white text-[10px] font-bold tracking-[0.2em] uppercase mb-4 shadow-sm">
                          <Star className="w-3 h-3 text-yellow-400" /> Premium Partners
                        </div>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-zinc-900 uppercase tracking-tight text-center mb-3 drop-shadow-sm">FEATURED BRANDS</h2>
                        <p className="text-zinc-600 font-sans font-medium text-lg drop-shadow-sm text-center">Explore our curated collection of industry leaders.</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-4 md:h-[850px]">
                      {/* Top Row */}
                      <div className="flex flex-col md:flex-row gap-4 flex-1 md:hover:flex-[3] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]">
                        {[
                          { title: 'NIKE', id: 'Nike', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800' },
                          { title: 'ADIDAS', id: 'Adidas', image: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&q=80&w=800' }
                        ].map((brand, index) => (
                          <motion.div 
                            key={brand.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            onClick={() => {
                              setActiveBrand(brand.id as Brand);
                              document.getElementById('products-top')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="relative w-full h-[300px] md:h-auto flex-1 md:hover:flex-[2.5] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-[2rem] overflow-hidden group cursor-pointer shadow-sm border border-black/5"
                          >
                            <img src={brand.image} alt={brand.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" />
                            <div className="absolute inset-0 bg-black/10 transition-colors duration-1000" />
                            
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                              <div className="bg-black/30 backdrop-blur-xl border border-white/10 px-6 sm:px-8 py-5 sm:py-6 min-w-[180px] sm:min-w-[200px] md:min-w-[240px] rounded-3xl flex flex-col items-center gap-3 sm:gap-4 transition-all duration-500 delay-0 group-hover:delay-[300ms] opacity-100 sm:opacity-0 sm:group-hover:opacity-100 group-hover:scale-105 shadow-xl">
                                <h3 className="text-white font-display text-2xl md:text-3xl font-bold tracking-tight text-center">{brand.title}</h3>
                                <button className="px-5 py-2 bg-white/10 backdrop-blur-lg border border-white/20 text-white shadow-xl rounded-full text-[10px] md:text-xs font-bold tracking-wider uppercase transition-all duration-300 hover:bg-white/20 hover:scale-105">
                                  Shop Now
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Bottom Row */}
                      <div className="flex flex-col md:flex-row gap-4 flex-1 md:hover:flex-[2] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]">
                        {[
                          { title: 'NEW BALANCE', id: 'New Balance', image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=800' },
                          { title: 'ASICS', id: 'Asics', image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=800' },
                          { title: 'PUMA', id: 'Puma', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800' }
                        ].map((brand, index) => (
                          <motion.div 
                            key={brand.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
                            onClick={() => {
                              setActiveBrand(brand.id as Brand);
                              document.getElementById('products-top')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="relative w-full h-[300px] md:h-auto flex-1 md:hover:flex-[2.5] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-[2rem] overflow-hidden group cursor-pointer shadow-sm border border-black/5"
                          >
                            <img src={brand.image} alt={brand.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" />
                            <div className="absolute inset-0 bg-black/10 transition-colors duration-1000" />
                            
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                              <div className="bg-black/30 backdrop-blur-xl border border-white/10 px-6 sm:px-8 py-5 min-w-fit rounded-3xl flex flex-col items-center gap-3 transition-all duration-500 delay-0 group-hover:delay-[300ms] opacity-100 sm:opacity-0 sm:group-hover:opacity-100 group-hover:scale-105 shadow-xl">
                                <h3 className="text-white font-display text-xl md:text-2xl font-bold tracking-tight text-center leading-tight whitespace-nowrap">{brand.title}</h3>
                                <button className="px-5 py-2 bg-white/10 backdrop-blur-lg border border-white/20 text-white shadow-xl rounded-full text-[10px] md:text-xs font-bold tracking-wider uppercase transition-all duration-300 hover:bg-white/20 hover:scale-105">
                                  Shop Now
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
          
                {/* The Vault Section */}
                <section id="the-vault" className="scroll-spy-section py-16 lg:py-24 relative mb-12">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  {/* Subtle background glow to match the image */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-tr from-blue-400/20 via-pink-400/20 to-purple-400/20 blur-[120px] rounded-full pointer-events-none -z-10" />
                  
                  <div className="flex flex-col items-center justify-center mb-16 gap-2 text-center relative z-10">
                    <div className="flex flex-col items-center">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 text-white text-[10px] font-bold tracking-[0.2em] uppercase mb-4 shadow-sm">
                        <ShieldCheck className="w-3 h-3 text-emerald-400" /> Authenticated Grails
                      </div>
                      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-zinc-900 uppercase tracking-tight text-center mb-3 drop-shadow-sm">THE VAULT</h2>
                      <p className="text-zinc-600 font-sans font-medium text-lg drop-shadow-sm text-center">Extremely rare, deadstock archival pieces. Sourced globally.</p>
                    </div>
                  </div>
          
                  <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 md:h-[550px]">
                    {[
                      { name: 'DIOR 1 HIGH', year: '2020', price: '$7,500', bg: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=800' },
                      { name: 'TS DUNK LOW', year: '2020', price: '$2,100', bg: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800' },
                      { name: 'OW AIR FORCE', year: '2017', price: '$4,200', bg: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800' }
                    ].map((grail, index) => (
                      <motion.div 
                        key={grail.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
                        className="relative flex-1 md:hover:flex-[3.5] w-full min-w-0 h-[360px] md:h-[450px] md:hover:h-[550px] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-[2rem] overflow-hidden group cursor-pointer shadow-sm border border-black/5 snap-center"
                      >
                        <img 
                          src={grail.bg} 
                          alt={grail.name} 
                          className="absolute inset-0 w-full h-full object-cover" 
                          style={index === 0 ? {
                            transform: `scale(1.55)`,
                            objectPosition: `50% 50%`
                          } : undefined}
                        />
                        <div className="absolute inset-0 bg-black/10 transition-colors duration-1000" />
                        
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                          <div className="bg-black/30 backdrop-blur-xl border border-white/10 px-6 sm:px-8 py-5 min-w-fit rounded-3xl flex flex-col items-center justify-center gap-3 transition-all duration-500 delay-0 group-hover:delay-[300ms] opacity-100 sm:opacity-0 sm:group-hover:opacity-100 group-hover:scale-105 shadow-xl">
                            <h3 className="text-white font-display text-xl md:text-2xl font-bold tracking-tight text-center leading-tight uppercase drop-shadow-sm whitespace-nowrap">
                              {grail.name}
                            </h3>
                            
                            <div className="flex items-center justify-center gap-2 w-full">
                              <span className="text-white/80 font-bold text-[11px] tracking-wider">{grail.year}</span>
                              <span className="w-1 h-1 rounded-full bg-white/50" />
                              <span className="text-white font-bold text-[11px] tracking-wider">{grail.price}</span>
                            </div>
          
                            <button 
                              onClick={() => setIsVaultAccessOpen(true)}
                              className="px-5 py-2 bg-white/10 backdrop-blur-lg border border-white/20 text-white shadow-xl rounded-full text-[10px] md:text-xs font-bold tracking-wider uppercase transition-all duration-300 whitespace-nowrap flex items-center justify-center hover:bg-white/20 hover:scale-105">
                              Request Access
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  </div>
                </section>
          
          
                {/* Trending Section */}
                <section id="trending-now" className="scroll-spy-section py-16 lg:py-24 relative">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center text-center mb-12">
                      <div className="flex flex-col items-center">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 text-white text-[10px] font-bold tracking-[0.2em] uppercase mb-4 shadow-sm">
                          <Flame className="w-3 h-3 text-orange-400" /> Hot Right Now
                        </div>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-zinc-900 uppercase tracking-tight text-center mb-3 drop-shadow-sm">TRENDING NOW</h2>
                        <p className="text-zinc-600 font-sans font-medium text-lg drop-shadow-sm text-center">The most sought-after styles this week.</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                      {trendingProducts.map((product, index) => (
                        <motion.div 
                          key={product.id} 
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          onClick={() => setQuickViewProduct(product)}
                          className="relative group flex flex-col bg-zinc-50/80 backdrop-blur-xl border border-zinc-200/60 p-4 shadow-sm rounded-[2rem] transition-all duration-300 hover:bg-white/60 hover:scale-[1.03] hover:z-10 hover:shadow-xl cursor-pointer"
                        >
                          <div className="relative aspect-square bg-zinc-100/50 rounded-[1.5rem] mb-4 overflow-hidden shadow-inner">
                            <ProductImage 
                              src={product.image} 
                              brand={product.brand}
                              alt={product.name}
                              hueRotate={product.hueRotate}
                              className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                            />
                            <button 
                              onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                              className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2.5 bg-zinc-800/60 backdrop-blur-xl border border-zinc-600/50 shadow-sm text-white font-bold tracking-wider text-[9px] uppercase opacity-100 scale-100 translate-y-0 sm:opacity-0 sm:scale-95 sm:translate-y-4 sm:group-hover:opacity-100 sm:group-hover:scale-100 sm:group-hover:translate-y-0 transition-all duration-500 delay-0 group-hover:delay-[300ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-zinc-700/80 hover:shadow-md hover:scale-[1.02] rounded-full flex items-center justify-center whitespace-nowrap"
                            >
                              ADD TO CART
                            </button>
                          </div>
                          <div className="flex justify-between items-start gap-4 px-2 pb-2">
                            <div>
                              <h3 className="font-display text-lg font-medium text-zinc-900 leading-tight">
                                {product.name}
                              </h3>
                              <p className="text-zinc-600 font-medium text-sm mt-1">{product.brand}</p>
                            </div>
                            <p className="font-bold text-zinc-900">${product.price}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </section>
          
          
          
                {/* Manifesto Section */}
                <section id="manifesto" className="scroll-spy-section py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative z-10 flex justify-center">
                  <div className="max-w-6xl w-full relative">
          
                    <div className="bg-zinc-50/80 backdrop-blur-2xl border border-zinc-200/60 rounded-[3rem] shadow-sm p-6 sm:p-12 md:p-16 lg:p-24 relative overflow-hidden flex flex-col items-center">
                      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 leading-[1.1] text-center mb-10 sm:mb-16 md:mb-24">
                        CURATING THE BEST,<br />IGNORING THE REST.
                      </h2>
          
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 lg:gap-16 w-full max-w-5xl">
                        <div className="flex flex-col items-center text-center">
                          <span className="text-5xl font-display text-zinc-300 mb-4 leading-none">"</span>
                          <p className="text-zinc-600 font-sans text-sm md:text-base leading-relaxed font-medium mb-6 flex-1">
                            Sneakers are modern architecture for your feet—wearable history, raw emotion, and the universal canvas of self-expression.
                          </p>
                          <p className="text-xs font-bold tracking-widest text-zinc-900 uppercase">— The Culture</p>
                        </div>
                        
                        <div className="flex flex-col items-center text-center">
                          <span className="text-5xl font-display text-zinc-300 mb-4 leading-none">"</span>
                          <p className="text-zinc-600 font-sans text-sm md:text-base leading-relaxed font-medium mb-6 flex-1">
                            True luxury is zero compromise. Every grail is hand-verified and authenticated so you walk with 100% unshakeable confidence.
                          </p>
                          <p className="text-xs font-bold tracking-widest text-zinc-900 uppercase">— The Standard</p>
                        </div>
                        
                        <div className="flex flex-col items-center text-center">
                          <span className="text-5xl font-display text-zinc-300 mb-4 leading-none">"</span>
                          <p className="text-zinc-600 font-sans text-sm md:text-base leading-relaxed font-medium mb-6 flex-1">
                            Great design doesn't just follow trends—it defines entire eras. We bring the world's most iconic silhouettes directly to your door.
                          </p>
                          <p className="text-xs font-bold tracking-widest text-zinc-900 uppercase">— The Journey</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

      {/* Mobile Filters (Sticky for Main Grid) */}
      <div className="lg:hidden sticky top-20 z-30 bg-white/80 backdrop-blur-xl border-y border-zinc-200/50 px-4 py-4 flex gap-4 overflow-x-auto snap-x hide-scrollbar">
        {['All', ...allBrands].map((brand) => (
          <button
            key={brand}
            onClick={() => {
              setActiveBrand(brand as Brand | 'All');
              if (brand === 'All') window.scrollTo({ top: 0, behavior: 'smooth' });
              else document.getElementById(`brand-${brand}`)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`flex-shrink-0 font-display text-sm tracking-wide uppercase px-6 py-2 rounded-full snap-start transition-all border ${
              activeBrand === brand 
                ? 'bg-zinc-900/80 backdrop-blur-md text-white border-zinc-700/50 shadow-sm' 
                : 'bg-zinc-100/80 backdrop-blur-md border-zinc-200 text-zinc-700'
            }`}
          >
            {brand}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <main id="products-top" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full relative scroll-mt-24">
        {searchQuery ? (
          <div>
            <div className="mb-12 border-b border-black/10 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-zinc-900 mb-2 drop-shadow-sm uppercase tracking-tight">
                  Search Results
                </h2>
                <p className="text-zinc-600 font-sans font-medium text-sm sm:text-base drop-shadow-sm">
                  {filteredProductsSearch.length} {filteredProductsSearch.length === 1 ? 'product' : 'products'} found for <span className="font-bold text-zinc-900">"{searchQuery}"</span>
                </p>
              </div>
              <button 
                onClick={() => setSearchQuery('')}
                className="self-start sm:self-auto px-4 py-2 rounded-full bg-zinc-900 text-white hover:bg-zinc-800 text-xs font-bold uppercase tracking-wider transition-colors shadow-sm inline-flex items-center gap-1.5"
              >
                <X className="w-3.5 h-3.5" /> Clear Search
              </button>
            </div>

            {filteredProductsSearch.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center justify-center bg-zinc-50/60 rounded-3xl border border-zinc-200/60 p-8">
                <div className="w-14 h-14 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 mb-4 border border-zinc-200">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display font-bold text-zinc-900 mb-2 uppercase tracking-tight">No matching sneakers found</h3>
                <p className="text-zinc-500 text-sm max-w-md mb-6 font-sans">We couldn't find anything matching "{searchQuery}". Try searching for brands like Nike, Adidas, New Balance or models like Dunk, Samba, Air Force.</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-5 py-2.5 bg-zinc-900 text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors shadow-sm"
                >
                  Browse Full Collection
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                {filteredProductsSearch.map((product, index) => (
                  <motion.div 
                    key={product.id} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    onClick={() => setQuickViewProduct(product)}
                    className="relative group flex flex-col bg-zinc-50/80 backdrop-blur-xl border border-zinc-200/60 p-4 shadow-sm rounded-[2rem] transition-all duration-300 hover:bg-white/60 hover:scale-[1.03] hover:z-10 hover:shadow-xl cursor-pointer"
                  >
                    <div className="relative aspect-square bg-zinc-100/50 rounded-[1.5rem] mb-4 overflow-hidden shadow-inner">
                      {product.isNew && (
                        <span className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur-md border border-zinc-200/60 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                          New
                        </span>
                      )}
                      {product.featured && !product.isNew && (
                        <span className="absolute top-4 left-4 z-10 bg-zinc-900/80 backdrop-blur-md border border-zinc-700/50 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                          Featured
                        </span>
                      )}
                      <ProductImage 
                        src={product.image} 
                        brand={product.brand}
                        alt={product.name}
                        hueRotate={product.hueRotate}
                        className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      />
                      <button 
                        onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2.5 bg-zinc-800/60 backdrop-blur-xl border border-zinc-600/50 shadow-sm text-white font-bold tracking-wider text-[9px] uppercase opacity-100 scale-100 translate-y-0 sm:opacity-0 sm:scale-95 sm:translate-y-4 sm:group-hover:opacity-100 sm:group-hover:scale-100 sm:group-hover:translate-y-0 transition-all duration-500 delay-0 group-hover:delay-[300ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-zinc-700/80 hover:shadow-md hover:scale-[1.02] rounded-full flex items-center justify-center whitespace-nowrap"
                      >
                        ADD TO CART
                      </button>
                    </div>
                    <div className="flex justify-between items-start gap-4 px-2 pb-2">
                      <div>
                        <h3 className="font-display text-lg font-medium text-zinc-900 leading-tight">
                          {product.name}
                        </h3>
                        <p className="text-zinc-600 font-medium text-sm mt-1">{product.category}</p>
                      </div>
                      <p className="font-bold text-zinc-900">${product.price}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-24">
            {allBrands.map((brand) => {
              const brandProducts = products.filter(p => p.brand === brand);
              if (brandProducts.length === 0) return null;
              return (
                <div key={brand} id={`brand-${brand}`} className="scroll-spy-section scroll-mt-32">
                  <div className="mb-12 border-b border-black/10 pb-8 flex flex-col items-center text-center">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-zinc-900 uppercase tracking-tight text-center">{brand}</h2>
                    <p className="mt-0 text-zinc-500 font-sans font-semibold text-xs sm:text-sm tracking-[0.25em] uppercase">
                      {brandSlogans[brand as Brand]}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                    {brandProducts.map((product, index) => (
                      <motion.div 
                        key={product.id} 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        onClick={() => setQuickViewProduct(product)}
                        className="relative group flex flex-col bg-zinc-50/80 backdrop-blur-xl border border-zinc-200/60 p-4 shadow-sm rounded-[2rem] transition-all duration-300 hover:bg-white/60 hover:scale-[1.03] hover:z-10 hover:shadow-xl cursor-pointer"
                      >
                        <div className="relative aspect-square bg-zinc-100/50 rounded-[1.5rem] mb-4 overflow-hidden shadow-inner">
                          {product.isNew && (
                            <span className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur-md border border-zinc-200/60 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                              New
                            </span>
                          )}
                          {product.featured && !product.isNew && (
                            <span className="absolute top-4 left-4 z-10 bg-zinc-900/80 backdrop-blur-md border border-zinc-700/50 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                              Featured
                            </span>
                          )}
                          <ProductImage 
                            src={product.image} 
                            brand={product.brand}
                            alt={product.name}
                            hueRotate={product.hueRotate}
                            className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                          />
                          <button 
                            onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                            className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2.5 bg-zinc-800/60 backdrop-blur-xl border border-zinc-600/50 shadow-sm text-white font-bold tracking-wider text-[9px] uppercase opacity-100 scale-100 translate-y-0 sm:opacity-0 sm:scale-95 sm:translate-y-4 sm:group-hover:opacity-100 sm:group-hover:scale-100 sm:group-hover:translate-y-0 transition-all duration-500 delay-0 group-hover:delay-[300ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-zinc-700/80 hover:shadow-md hover:scale-[1.02] rounded-full flex items-center justify-center whitespace-nowrap"
                          >
                            ADD TO CART
                          </button>
                        </div>
                        <div className="flex justify-between items-start gap-4 px-2 pb-2">
                          <div>
                            <h3 className="font-display text-lg font-medium text-zinc-900 leading-tight">
                              {product.name}
                            </h3>
                            <p className="text-zinc-600 font-medium text-sm mt-1">{product.category}</p>
                          </div>
                          <p className="font-bold text-zinc-900">${product.price}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
</main>
      {/* Release Calendar Section */}
      <section id="release-calendar" className="scroll-spy-section py-16 lg:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center mb-12 gap-6">
            <div className="max-w-2xl flex flex-col items-center">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-zinc-900 tracking-tight uppercase drop-shadow-sm mb-4">RELEASE CALENDAR</h2>
              <p className="text-zinc-600 font-sans font-medium text-[17px] leading-[21px] -mt-[5px]">Mark your calendars. The most anticipated drops of the season, carefully curated and authenticated by our experts.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { id: 'drop1', brand: 'Nike', price: 215, category: 'Upcoming Drop', name: "JRDN 4 'BRED REIMAGINED'", date: "FEB 17", hype: "HIGH", img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800" },
              { id: 'drop2', brand: 'Nike', price: 150, category: 'Upcoming Drop', name: "TS OLIVE LOW", date: "MAR 02", hype: "MAX", img: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=800" },
              { id: 'drop3', brand: 'Nike', price: 190, category: 'Upcoming Drop', name: "KOBE 8 'COURT PURPLE'", date: "APR 15", hype: "HIGH", img: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=800" }
            ].map((drop, idx) => (
              <motion.div 
                key={drop.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                onClick={() => setQuickViewProduct({ id: drop.id, name: drop.name, brand: drop.brand as any, price: drop.price, image: drop.img, category: drop.category })}
                className="relative group bg-zinc-50/80 backdrop-blur-xl border border-zinc-200/60 p-5 shadow-sm rounded-[2.5rem] transition-all duration-300 hover:bg-white/60 hover:scale-[1.02] hover:shadow-xl cursor-pointer overflow-hidden flex flex-col"
              >
                <div className="relative w-full aspect-[4/3] bg-zinc-100 rounded-[1.5rem] mb-5 overflow-hidden shadow-inner">
                  <img src={drop.img} alt={drop.name} className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110" />
                  <div className="absolute top-4 right-4 bg-zinc-900/80 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full font-bold tracking-widest text-[10px] uppercase shadow-sm">
                    {drop.date}
                  </div>
                </div>
                <div className="flex flex-col gap-1 px-2 pb-2 flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Hype: <span className={drop.hype === 'MAX' ? 'text-red-500 font-extrabold' : 'text-zinc-800 font-extrabold'}>{drop.hype}</span></span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-zinc-900 leading-tight uppercase tracking-tight">{drop.name}</h3>
                  <div className="mt-auto pt-4 border-t border-zinc-200/60 flex items-center justify-between">
                    <span className="text-lg font-display font-bold text-zinc-900">${drop.price}</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        if (notifiedDrops.includes(drop.id)) {
                          setNotifiedDrops(prev => prev.filter(id => id !== drop.id));
                        } else {
                          setEmailPromptDropId(drop.id);
                        }
                      }}
                      className={`px-4 py-2 rounded-full font-bold text-[10px] flex items-center gap-1.5 transition-colors uppercase tracking-widest shadow-sm ${notifiedDrops.includes(drop.id) ? 'bg-zinc-900/80 border border-zinc-700/50 text-white hover:bg-zinc-800/80' : 'bg-zinc-800/60 border border-zinc-600/50 text-white hover:bg-zinc-700/80'}`}
                    >
                      {notifiedDrops.includes(drop.id) ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Bell className="w-3.5 h-3.5" />}
                      {notifiedDrops.includes(drop.id) ? 'Notified' : 'Notify Me'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 flex justify-center">
            <button onClick={() => setIsDropsModalOpen(true)} className="flex items-center justify-center gap-2 px-8 py-4 bg-zinc-800/60 backdrop-blur-xl border border-zinc-600/50 shadow-sm text-white rounded-full font-bold tracking-wider text-[11px] uppercase transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-zinc-700/80 hover:shadow-xl hover:scale-[1.03] active:scale-[0.96] w-full md:w-auto md:px-12">
              View All Drops <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
      
      <div id="about" className="scroll-spy-section">

      {/* Join the Club / Newsletter */}
      <section className="py-16 lg:py-24 relative px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-zinc-50/80 backdrop-blur-xl border border-zinc-200/60 rounded-[3rem] shadow-sm p-6 sm:p-12 md:p-20 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 text-center lg:text-left">
            
            <div className="relative z-10 lg:w-1/2">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-zinc-900 tracking-tight uppercase mb-4 drop-shadow-sm">STAY IN THE LOOP</h2>
              <p className="text-zinc-600 font-sans text-lg font-medium drop-shadow-sm max-w-md mx-auto lg:mx-0">Join our exclusive mailing list to get first access to drops, restocks, and curated editorials.</p>
            </div>
            <div className="relative z-10 w-full lg:w-1/2 flex flex-col sm:flex-row gap-4 max-w-lg mx-auto lg:mx-0 lg:max-w-none">
              <input 
                type="email" 
                placeholder="ENTER YOUR EMAIL" 
                className="flex-1 bg-white border border-zinc-200/80 rounded-full px-8 py-4 outline-none focus:bg-white/90 focus:border-zinc-400 transition-all text-[13px] leading-[20px] font-bold tracking-widest text-zinc-900 placeholder:text-zinc-500 shadow-inner"
              />
              <button className="px-8 py-4 bg-zinc-800/60 backdrop-blur-xl border border-zinc-600/50 text-white rounded-full font-bold tracking-[0.2em] text-[14px] uppercase transition-all hover:bg-zinc-700/80 hover:scale-[1.02] shadow-md whitespace-nowrap flex items-center justify-center">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Customer Reviews */}
      <section id="verified-reviews" className="scroll-spy-section py-16 lg:py-24 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-10">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-zinc-900 uppercase tracking-tight text-center mb-3">
            VERIFIED REVIEWS
          </h2>
          <p className="text-zinc-600 font-sans font-medium text-[17px] text-center -mt-[5px]">
            Real feedback from verified collectors and sneaker enthusiasts.
          </p>
        </div>

        {/* Rating Summary Pill */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12 bg-zinc-100/90 border border-zinc-200/80 rounded-full px-6 py-2.5 max-w-fit mx-auto">
          <div className="flex items-center gap-1 text-zinc-900">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-zinc-900 text-zinc-900" />
            ))}
          </div>
          <span className="font-sans font-bold text-zinc-900 text-sm tracking-wide uppercase">
            4.9 / 5.0 Rating
          </span>
          <span className="text-zinc-300">•</span>
          <span className="text-zinc-600 font-sans font-medium text-sm">
            2,450+ Verified Orders
          </span>
        </div>

        {/* Reviews Carousel */}
        <ReviewsCarousel />
      </section>

      {/* Community / Instagram Feed */}
      <section className="relative pb-24">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <h2 className="text-[40px] font-bold text-zinc-900 font-display mb-2 uppercase tracking-wide drop-shadow-sm">@SHOEMANIA ON THE STREETS</h2>
          <p className="text-zinc-600 font-sans font-medium text-[17px] -mt-[10px] -mb-[15px] drop-shadow-sm">Tag us to be featured.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 gap-4">
          {[
            'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1617251137884-f135eccf6942?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1528701800487-ba01fea498c0?auto=format&fit=crop&q=80&w=600'
          ].map((img, i) => (
            <div key={i} className="aspect-square relative group overflow-hidden cursor-pointer rounded-[2rem] shadow-sm border border-zinc-200/60 bg-zinc-50/80 backdrop-blur-md">
              <img src={img} onError={(e) => e.currentTarget.src='https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=800'} alt={`Community ${i+1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 p-2 rounded-[2rem]" />
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 backdrop-blur-[2px] transition-all duration-300 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-[2rem]">
                <span className="text-zinc-900 font-display font-bold tracking-widest text-lg px-6 py-2 bg-white/90 backdrop-blur-md rounded-full border border-zinc-200 shadow-md">VIEW</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer / About Section */}
      <footer className="bg-zinc-50/80 backdrop-blur-2xl border-t border-zinc-200/60 text-zinc-900 py-16 lg:py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
            <div>
              <div className="mb-6">
                <Logo size="lg" />
              </div>
              <p className="text-zinc-600 font-sans max-w-sm">
                The premier destination for authentic performance and lifestyle footwear. Minimal design, maximum performance.
              </p>
            </div>
            <div>
              <h4 className="font-display text-lg tracking-wider mb-6">SHOP</h4>
              <ul className="space-y-4 font-sans text-zinc-600">
                <li><button onClick={() => { setActiveBrand('All'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-zinc-900 transition-colors">All Shoes</button></li>
                {allBrands.map(brand => (
                  <li key={brand}><button onClick={() => { setActiveBrand(brand as Brand); document.getElementById(`brand-${brand}`)?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-zinc-900 transition-colors">{brand}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-display text-lg tracking-wider mb-6">SUPPORT</h4>
              <ul className="space-y-4 font-sans text-zinc-600">
                <li><a href="#" className="hover:text-zinc-900 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-zinc-900 transition-colors">Shipping & Returns</a></li>
                <li><a href="#" className="hover:text-zinc-900 transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-zinc-900 transition-colors">Size Guide</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display text-lg tracking-wider mb-6">NEWSLETTER</h4>
              <p className="text-zinc-600 font-sans mb-4">Subscribe for the latest drops and exclusive offers.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="flex-1 bg-white border border-zinc-200/80 text-zinc-900 px-5 py-3 font-sans focus:outline-none focus:border-zinc-400 focus:bg-white/90 rounded-full placeholder:text-zinc-500 transition-all text-sm shadow-inner"
                />
                <button className="bg-zinc-800/60 backdrop-blur-xl border border-zinc-600/50 text-white px-7 py-3 font-bold tracking-widest uppercase hover:bg-zinc-700/80 hover:scale-[1.02] transition-all rounded-full text-xs shadow-md flex items-center justify-center whitespace-nowrap">
                  Join
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-white/60 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500 font-sans">
            <p>&copy; {new Date().getFullYear()} ShoeMania. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-zinc-900 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-zinc-900 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-zinc-900/40 backdrop-blur-md"
              onClick={() => setQuickViewProduct(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl bg-zinc-50/90 backdrop-blur-2xl border border-zinc-200/60 p-6 md:p-10 shadow-2xl rounded-[2.5rem] flex flex-col md:flex-row gap-8 md:gap-12 items-center pointer-events-auto overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-6 right-6 p-2 bg-zinc-200/50 hover:bg-zinc-200 text-zinc-600 rounded-full transition-colors z-10"
              >
                <X size={20} />
              </button>
              
              <div className="w-full md:w-1/2 aspect-square bg-zinc-100/50 rounded-[2rem] overflow-hidden shadow-inner relative flex-shrink-0">
                <ProductImage 
                  src={quickViewProduct.image} 
                  brand={quickViewProduct.brand}
                  alt={quickViewProduct.name}
                  hueRotate={quickViewProduct.hueRotate}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="w-full md:w-1/2 flex flex-col items-start text-left">
                <div className="w-full flex justify-between items-center mb-2">
                  <span className="text-zinc-500 font-bold tracking-widest text-[10px] md:text-xs uppercase">
                    {quickViewProduct.brand}
                  </span>
                  <div className="flex items-center gap-0.5">
                    <Star className="w-3.5 h-3.5 fill-zinc-900 text-zinc-900" />
                    <Star className="w-3.5 h-3.5 fill-zinc-900 text-zinc-900" />
                    <Star className="w-3.5 h-3.5 fill-zinc-900 text-zinc-900" />
                    <Star className="w-3.5 h-3.5 fill-zinc-900 text-zinc-900" />
                    <Star className="w-3.5 h-3.5 fill-zinc-900 text-zinc-900" />
                    <span className="text-[10px] font-bold text-zinc-900 ml-1.5">4.9</span>
                    <span className="text-[10px] text-zinc-500 ml-1">(42)</span>
                  </div>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-zinc-900 leading-tight mb-2">
                  {quickViewProduct.name}
                </h2>
                <p className="text-zinc-600 font-medium text-sm md:text-base mb-6">
                  {quickViewProduct.category}
                </p>
                
                <p className="font-display text-3xl md:text-4xl font-bold text-zinc-900 mb-8">
                  ${quickViewProduct.price}
                </p>
                
                <div className="w-full flex gap-3">
                  {quickViewProduct.category === 'Upcoming Drop' ? (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        if (notifiedDrops.includes(quickViewProduct.id)) {
                          setNotifiedDrops(prev => prev.filter(id => id !== quickViewProduct.id));
                        } else {
                          setEmailPromptDropId(quickViewProduct.id);
                        }
                      }}
                      className={`flex-1 py-4 backdrop-blur-xl shadow-md font-bold tracking-wider text-sm uppercase rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex items-center justify-center gap-2 ${notifiedDrops.includes(quickViewProduct.id) ? 'bg-zinc-900/80 border border-zinc-700/50 text-white hover:bg-zinc-800/80' : 'bg-zinc-800/60 border border-zinc-600/50 text-white hover:bg-zinc-700/80'}`}
                    >
                      {notifiedDrops.includes(quickViewProduct.id) ? <CheckCircle2 className="w-5 h-5" /> : <Bell className="w-5 h-5" />}
                      {notifiedDrops.includes(quickViewProduct.id) ? 'NOTIFIED' : 'NOTIFY ME'}
                    </button>
                  ) : (
                    <button 
                      onClick={() => {
                        addToCart(quickViewProduct);
                        setQuickViewProduct(null);
                      }}
                      className="flex-1 py-4 bg-zinc-800/60 backdrop-blur-xl border border-zinc-600/50 shadow-md text-white font-bold tracking-wider text-sm uppercase rounded-full transition-all duration-300 hover:bg-zinc-700/80 hover:shadow-lg hover:-translate-y-1"
                    >
                      ADD TO CART
                    </button>
                  )}
                  <button 
                    onClick={() => toggleWishlist(quickViewProduct.id)}
                    className="p-4 bg-zinc-50/80 backdrop-blur-2xl border border-zinc-200/60 shadow-sm text-zinc-900 rounded-full transition-all duration-300 hover:bg-white flex items-center justify-center group"
                  >
                    <Heart className="w-6 h-6 transition-transform group-hover:scale-110" strokeWidth={2} fill={wishlist.includes(quickViewProduct.id) ? "currentColor" : "none"} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Drops Modal */}
      <AnimatePresence>
        {isDropsModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setIsDropsModalOpen(false)}
              className="fixed inset-0 bg-zinc-900/40 backdrop-blur-xl z-[90]"
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl bg-zinc-50/80 backdrop-blur-2xl border border-zinc-200/60 shadow-sm rounded-[3rem] flex flex-col max-h-[85vh] overflow-hidden z-[100]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-center px-8 py-7 border-b border-zinc-200/60 bg-zinc-50/90 relative">
                <h2 className="font-display text-2xl font-bold tracking-tight text-zinc-900 uppercase text-center w-full">ALL UPCOMING DROPS</h2>
                <button 
                  onClick={() => setIsDropsModalOpen(false)}
                  className="absolute right-8 p-2 text-zinc-500 hover:text-zinc-900 bg-white/80 backdrop-blur-xl border border-zinc-200/60 rounded-full transition-colors shadow-sm"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto hide-scrollbar px-8 py-6">
                <div className="space-y-6">
                  {[
                    { id: 'drop1', name: "JRDN 4 'BRED REIMAGINED'", brand: 'Nike', price: 215, category: "Upcoming Drop", date: "FEB 17", hype: "HIGH", img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800" },
                    { id: 'drop2', name: "TS OLIVE LOW", brand: 'Nike', price: 150, category: "Upcoming Drop", date: "MAR 02", hype: "MAX", img: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=800" },
                    { id: 'drop3', name: "KOBE 8 'COURT PURPLE'", brand: 'Nike', price: 190, category: "Upcoming Drop", date: "APR 15", hype: "HIGH", img: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=800" },
                    { id: 'drop4', name: "NIKE SB DUNK 'FUTURA'", brand: 'Nike', price: 135, category: "Upcoming Drop", date: "MAY 22", hype: "MAX", img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800" },
                    { id: 'drop5', name: "YEEZY 350 'TURTLE DOVE'", brand: 'Adidas', price: 230, category: "Upcoming Drop", date: "JUN 10", hype: "HIGH", img: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&q=80&w=800" },
                  ].map((drop, idx) => (
                    <div key={idx} className="flex gap-6 bg-white/60 backdrop-blur-xl border border-zinc-200/60 p-4 rounded-[1.5rem] shadow-sm hover:shadow-md hover:bg-white/90 transition-all duration-300 group">
                      <div 
                        onClick={() => setQuickViewProduct({ id: drop.id, name: drop.name, brand: drop.brand as any, price: drop.price, image: drop.img, category: drop.category })}
                        className="w-24 h-24 bg-zinc-100/50 rounded-xl flex-shrink-0 overflow-hidden shadow-inner p-1 border border-zinc-200/60 relative cursor-pointer"
                      >
                        <img src={drop.img} alt={drop.name} className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-center min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Hype: <span className={drop.hype === 'MAX' ? 'text-red-500 font-extrabold' : 'text-zinc-800 font-extrabold'}>{drop.hype}</span></span>
                          <span className="text-[10px] font-bold tracking-widest text-zinc-800 uppercase bg-zinc-200/50 px-2 py-1 rounded-full">{drop.date}</span>
                        </div>
                        <h3 
                          onClick={() => setQuickViewProduct({ id: drop.id, name: drop.name, brand: drop.brand as any, price: drop.price, image: drop.img, category: drop.category })}
                          className="font-display font-bold text-lg text-zinc-900 uppercase truncate mt-1 cursor-pointer hover:text-zinc-600 transition-colors"
                        >
                          {drop.name}
                        </h3>
                        <div className="mt-2 flex">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              if (notifiedDrops.includes(drop.id)) {
                                setNotifiedDrops(prev => prev.filter(id => id !== drop.id));
                              } else {
                                setEmailPromptDropId(drop.id);
                              }
                            }}
                            className={`px-3 py-1.5 rounded-full font-bold text-[10px] flex items-center gap-1.5 transition-colors uppercase tracking-widest shadow-sm ${notifiedDrops.includes(drop.id) ? 'bg-zinc-900/80 border border-zinc-700/50 text-white hover:bg-zinc-800/80' : 'bg-zinc-800/60 border border-zinc-600/50 text-white hover:bg-zinc-700/80'}`}
                          >
                            {notifiedDrops.includes(drop.id) ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Bell className="w-3.5 h-3.5" />}
                            {notifiedDrops.includes(drop.id) ? 'Notified' : 'Notify Me'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Cart Modal */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-zinc-900/40 backdrop-blur-xl z-[90]"
            />
            
            {/* Modal */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl bg-zinc-50/80 backdrop-blur-2xl border border-zinc-200/60 shadow-sm rounded-[3rem] flex flex-col max-h-[85vh] overflow-hidden z-[100]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-8 py-7 border-b border-zinc-200/60 bg-zinc-50/90">
                <h2 className="font-display text-2xl font-bold tracking-widest text-zinc-900 uppercase">YOUR CART ({cartCount})</h2>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 -mr-2 text-zinc-500 hover:text-zinc-900 bg-white/80 backdrop-blur-xl border border-zinc-200/60 rounded-full transition-colors shadow-sm"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto hide-scrollbar px-8 py-6">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-zinc-500 py-12">
                    <div className="w-24 h-24 bg-zinc-50 border border-zinc-200 rounded-full flex items-center justify-center mb-6 shadow-inner">
                      <ShoppingBag className="w-10 h-10 opacity-40" />
                    </div>
                    <p className="font-display text-lg tracking-widest uppercase text-zinc-900">Your cart is empty</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="mt-6 px-6 py-3 bg-zinc-800/60 backdrop-blur-xl border border-zinc-600/50 shadow-md text-white rounded-full font-sans font-bold hover:bg-zinc-700/80 transition-colors uppercase tracking-wider text-sm"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cartItems.map((item) => (
                      <div key={item.product.id} className="flex gap-6 bg-white/60 backdrop-blur-xl border border-zinc-200/60 p-4 rounded-[1.5rem] shadow-sm hover:shadow-md hover:bg-white/90 transition-all duration-300">
                        <div className="w-24 h-24 bg-zinc-100/50 rounded-xl flex-shrink-0 overflow-hidden shadow-inner p-1 border border-zinc-200/60">
                          <ProductImage 
                            src={item.product.image} 
                            brand={item.product.brand}
                            alt={item.product.name}
                            hueRotate={item.product.hueRotate}
                            className="w-full h-full rounded-lg"
                          />
                        </div>
                        <div className="flex-1 flex flex-col">
                          <div className="flex justify-between mb-1">
                            <h3 className="font-display text-lg text-zinc-900 font-medium">{item.product.name}</h3>
                            <p className="font-bold text-zinc-900">${item.product.price}</p>
                          </div>
                          <p className="text-zinc-600 font-medium text-sm mb-auto">{item.product.brand}</p>
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center bg-white border border-zinc-200 rounded-lg shadow-sm overflow-hidden">
                              <button 
                                className="px-3 py-1.5 text-zinc-600 hover:text-zinc-900 hover:bg-white/50 transition-colors"
                                onClick={() => {
                                  if (item.quantity > 1) {
                                    setCartItems(prev => prev.map(i => 
                                      i.product.id === item.product.id ? { ...i, quantity: i.quantity - 1 } : i
                                    ));
                                  } else {
                                    removeFromCart(item.product.id);
                                  }
                                }}
                              >
                                -
                              </button>
                              <span className="px-3 py-1.5 font-bold text-zinc-900 bg-white/20 min-w-[2rem] text-center">{item.quantity}</span>
                              <button 
                                className="px-3 py-1.5 text-zinc-600 hover:text-zinc-900 hover:bg-white/50 transition-colors"
                                onClick={() => {
                                  setCartItems(prev => prev.map(i => 
                                    i.product.id === item.product.id ? { ...i, quantity: i.quantity + 1 } : i
                                  ));
                                }}
                              >
                                +
                              </button>
                            </div>
                            <button 
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-sm text-zinc-500 hover:text-red-500 font-bold transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="border-t border-zinc-200/60 p-6 bg-zinc-50/80 backdrop-blur-md shadow-[0_-20px_40px_rgba(0,0,0,0.05)]">
                  <div className="flex justify-between items-end mb-6">
                    <span className="text-zinc-600 font-sans uppercase text-sm font-bold tracking-wider">Subtotal</span>
                    <span className="font-display text-3xl font-bold text-zinc-900">${cartTotal.toFixed(2)}</span>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="w-full bg-zinc-800/60 backdrop-blur-xl border border-zinc-600/50 shadow-md text-white py-4 font-display text-lg uppercase tracking-wider hover:bg-zinc-700/80 transition-colors rounded-full"
                  >
                    Checkout
                  </motion.button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Wishlist Modal */}
      <AnimatePresence>
        {isWishlistOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setIsWishlistOpen(false)}
              className="fixed inset-0 bg-zinc-900/40 backdrop-blur-xl z-[90]"
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl bg-zinc-50/80 backdrop-blur-2xl border border-zinc-200/60 shadow-sm rounded-[3rem] flex flex-col max-h-[85vh] overflow-hidden z-[100]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-8 py-7 border-b border-zinc-200/60 bg-zinc-50/90">
                <h2 className="font-display text-2xl font-bold tracking-widest text-zinc-900 uppercase">Wishlist</h2>
                <button 
                  onClick={() => setIsWishlistOpen(false)}
                  className="p-2 -mr-2 text-zinc-500 hover:text-zinc-900 bg-white/80 backdrop-blur-xl border border-zinc-200/60 rounded-full transition-colors shadow-sm"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto hide-scrollbar px-8 py-6">
                {wishlist.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-zinc-500 py-12">
                    <div className="w-24 h-24 bg-zinc-50 border border-zinc-200 rounded-full flex items-center justify-center mb-6 shadow-inner">
                      <Heart className="w-10 h-10 opacity-40" />
                    </div>
                    <p className="font-display text-lg tracking-widest uppercase text-zinc-900">Your wishlist is empty</p>
                    <button 
                      onClick={() => setIsWishlistOpen(false)}
                      className="mt-6 px-6 py-3 bg-zinc-800/60 backdrop-blur-xl border border-zinc-600/50 shadow-md text-white rounded-full font-sans font-bold hover:bg-zinc-700/80 transition-colors uppercase tracking-wider text-sm"
                    >
                      Explore Products
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {wishlist.map((id) => {
                      const product = products.find(p => p.id === id);
                      if (!product) return null;
                      return (
                        <div key={product.id} className="flex gap-6 bg-white/60 backdrop-blur-xl border border-zinc-200/60 p-4 rounded-[1.5rem] shadow-sm hover:shadow-md hover:bg-white/90 transition-all duration-300">
                          <div className="w-24 h-24 bg-zinc-100/50 rounded-2xl flex-shrink-0 overflow-hidden shadow-inner p-1 border border-zinc-200/60">
                            <ProductImage 
                              src={product.image} 
                              brand={product.brand}
                              alt={product.name}
                              hueRotate={product.hueRotate}
                              className="w-full h-full rounded-lg mix-blend-multiply"
                            />
                          </div>
                          <div className="flex-1 flex flex-col justify-center">
                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">{product.brand}</span>
                            <h3 className="font-display font-bold text-zinc-900 text-lg leading-tight mb-2">{product.name}</h3>
                            <span className="font-sans font-bold text-zinc-900">${product.price.toFixed(2)}</span>
                          </div>
                          <div className="flex flex-col gap-2 justify-center ml-2">
                            <button 
                              onClick={() => {
                                addToCart(product);
                                setWishlist(prev => prev.filter(id => id !== product.id));
                                setIsWishlistOpen(false);
                              }}
                              className="w-10 h-10 rounded-full bg-zinc-800/60 backdrop-blur-xl border border-zinc-600/50 text-white hover:bg-zinc-700/80 transition-all flex items-center justify-center shadow-md group relative hover:scale-105"
                              title="Move to Cart"
                            >
                              <ShoppingBag className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => toggleWishlist(product.id)}
                              className="w-10 h-10 rounded-full bg-white/80 border border-zinc-200/60 text-red-500 hover:bg-red-50 hover:border-red-200 transition-all flex items-center justify-center shadow-sm hover:scale-105"
                              title="Remove from Wishlist"
                            >
                              <Heart className="w-5 h-5" fill="currentColor" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Vault Access Modal */}
      <AnimatePresence>
        {isVaultAccessOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setIsVaultAccessOpen(false)}
              className="fixed inset-0 bg-zinc-900/40 backdrop-blur-xl z-[90]"
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md bg-zinc-50/80 backdrop-blur-2xl border border-zinc-200/60 shadow-sm rounded-[3rem] flex flex-col overflow-hidden z-[100] text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-10 flex flex-col items-center">
                <div className="w-16 h-16 bg-white/60 rounded-full flex items-center justify-center mb-6 border border-zinc-200/60 shadow-sm">
                  <ShieldCheck className="w-8 h-8 text-zinc-900" />
                </div>
                <h2 className="font-display text-3xl font-bold tracking-widest text-zinc-900 uppercase mb-3">Request Access</h2>
                <p className="text-zinc-600 font-sans text-sm mb-8 leading-relaxed">
                  The Vault contains extremely rare, deadstock archival pieces. Access is granted to verified collectors only.
                </p>
                
                <div className="w-full space-y-4">
                  <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    className="w-full bg-white/60 border border-zinc-200/60 rounded-xl px-5 py-4 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 transition-colors font-sans text-sm shadow-sm"
                  />
                  <button 
                    onClick={() => {
                      setIsVaultAccessOpen(false);
                    }}
                    className="w-full bg-zinc-800/60 backdrop-blur-xl border border-zinc-600/50 shadow-md text-white rounded-full px-5 py-4 font-bold tracking-widest uppercase text-[11px] hover:bg-zinc-700/80 transition-colors"
                  >
                    Submit Request
                  </button>
                </div>
              </div>
              <button 
                onClick={() => setIsVaultAccessOpen(false)}
                className="absolute top-6 right-6 p-2 text-zinc-500 hover:text-zinc-900 transition-colors bg-white/80 rounded-full border border-zinc-200/60 shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Email Notify Prompt Modal */}
      <AnimatePresence>
        {emailPromptDropId && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-zinc-900/40 backdrop-blur-md"
              onClick={() => setEmailPromptDropId(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md bg-zinc-50/90 backdrop-blur-2xl border border-zinc-200/60 p-8 shadow-2xl rounded-[2.5rem] flex flex-col items-center pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setEmailPromptDropId(null)}
                className="absolute top-6 right-6 p-2 bg-zinc-200/50 hover:bg-zinc-200 text-zinc-600 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="w-16 h-16 bg-zinc-900 text-white rounded-full flex items-center justify-center mb-6 shadow-md">
                <Bell className="w-8 h-8" />
              </div>
              
              <h2 className="font-display text-2xl font-bold tracking-tight text-zinc-900 uppercase text-center mb-2">NOTIFY ME</h2>
              <p className="text-zinc-600 font-sans text-sm text-center mb-8 px-4 leading-relaxed">
                Enter your email to receive an alert the moment this grail drops. 
              </p>
              
              <form 
                className="w-full flex flex-col gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (notifyEmail.trim()) {
                    setNotifiedDrops(prev => [...prev, emailPromptDropId]);
                    setEmailPromptDropId(null);
                    setNotifyEmail('');
                  }
                }}
              >
                <input 
                  type="email" 
                  required
                  placeholder="ENTER YOUR EMAIL"
                  value={notifyEmail}
                  onChange={(e) => setNotifyEmail(e.target.value)}
                  className="w-full px-6 py-4 bg-white/80 border border-zinc-200/80 rounded-full font-sans text-sm outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all shadow-sm placeholder:text-zinc-400 placeholder:tracking-widest"
                />
                <button 
                  type="submit"
                  className="w-full py-4 bg-zinc-900 text-white font-bold tracking-wider text-sm uppercase rounded-full transition-all duration-300 hover:bg-zinc-800 shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" /> CONFIRM
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Navigation Drawer Modal */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[110] flex flex-col justify-end sm:justify-center items-center p-0 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-zinc-900/50 backdrop-blur-xl z-[90]"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            <motion.div 
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-lg bg-zinc-50/95 backdrop-blur-2xl border-t sm:border border-zinc-200/80 shadow-2xl rounded-t-[2.5rem] sm:rounded-[2.5rem] p-6 sm:p-8 flex flex-col max-h-[85vh] overflow-y-auto hide-scrollbar z-[100]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-zinc-200/60">
                <div className="flex items-center gap-2">
                  <div className="bg-zinc-900 text-white flex items-center justify-center w-8 h-8 rounded-full">
                    <LogoIcon className="w-4 h-4" />
                  </div>
                  <span className="font-display font-bold text-zinc-900 text-xl tracking-wider uppercase">SHOEMANIA</span>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-zinc-500 hover:text-zinc-900 bg-white/80 rounded-full border border-zinc-200/60 shadow-sm"
                  aria-label="Close navigation menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Actions Bar */}
              <div className="grid grid-cols-3 gap-3 my-6">
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsSearchOpen(true);
                  }}
                  className="flex flex-col items-center justify-center p-3 bg-white/80 border border-zinc-200/60 rounded-2xl hover:bg-white transition-colors"
                >
                  <Search className="w-5 h-5 text-zinc-800 mb-1" />
                  <span className="text-[10px] font-bold tracking-wider text-zinc-700 uppercase">Search</span>
                </button>
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsWishlistOpen(true);
                  }}
                  className="relative flex flex-col items-center justify-center p-3 bg-white/80 border border-zinc-200/60 rounded-2xl hover:bg-white transition-colors"
                >
                  <Heart className="w-5 h-5 text-zinc-800 mb-1" />
                  <span className="text-[10px] font-bold tracking-wider text-zinc-700 uppercase">Wishlist</span>
                  {wishlist.length > 0 && (
                    <span className="absolute top-2 right-2 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      {wishlist.length}
                    </span>
                  )}
                </button>
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsCartOpen(true);
                  }}
                  className="relative flex flex-col items-center justify-center p-3 bg-white/80 border border-zinc-200/60 rounded-2xl hover:bg-white transition-colors"
                >
                  <ShoppingBag className="w-5 h-5 text-zinc-800 mb-1" />
                  <span className="text-[10px] font-bold tracking-wider text-zinc-700 uppercase">Cart</span>
                  {cartCount > 0 && (
                    <span className="absolute top-2 right-2 w-4 h-4 bg-zinc-900 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Brand Filter List */}
              <div className="mb-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3 px-1">Filter By Brand</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setActiveBrand('All');
                      setIsMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors border ${
                      activeBrand === 'All' 
                        ? 'bg-zinc-900 text-white border-zinc-900 shadow-sm' 
                        : 'bg-white border-zinc-200/80 text-zinc-700 hover:bg-zinc-100'
                    }`}
                  >
                    ALL BRANDS
                  </button>
                  {allBrands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => {
                        setActiveBrand(brand as Brand);
                        setIsMobileMenuOpen(false);
                        document.getElementById(`brand-${brand}`)?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors border ${
                        activeBrand === brand 
                          ? 'bg-zinc-900 text-white border-zinc-900 shadow-sm' 
                          : 'bg-white border-zinc-200/80 text-zinc-700 hover:bg-zinc-100'
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Section Links */}
              <div className="border-t border-zinc-200/60 pt-6 space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3 px-1">Explore Sections</h3>
                {[
                  { label: 'Featured Brands', id: 'featured-brands' },
                  { label: 'The Vault (Grails)', id: 'the-vault' },
                  { label: 'Trending Now', id: 'trending-now' },
                  { label: 'Manifesto', id: 'manifesto' },
                  { label: 'Release Calendar', id: 'release-calendar' },
                  { label: 'Verified Reviews', id: 'verified-reviews' },
                ].map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      document.getElementById(sec.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full text-left px-4 py-3 rounded-2xl bg-white/60 hover:bg-white border border-zinc-200/60 font-display font-bold text-zinc-900 text-sm tracking-wider uppercase transition-all flex items-center justify-between"
                  >
                    {sec.label}
                    <ArrowRight className="w-4 h-4 text-zinc-400" />
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
