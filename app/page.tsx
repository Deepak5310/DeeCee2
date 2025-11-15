"use client"

import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { Heart, User, Search, ShoppingCart, Menu, X, Star, Truck, Shield, ChevronLeft, ChevronRight, Pause, Play, VolumeX, Volume2, Sparkles, Instagram, Facebook, Youtube, Mail, Globe } from "lucide-react";
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ContactPage from './pages/ContactPage';
import AppointmentPage from './pages/AppointmentPage';
import TermsPage from './pages/TermsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import AboutUsPage from './pages/AboutUsPage';
import ProfilePage from './pages/ProfilePage';
import BestsellersPage from './pages/BestsellersPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import VerificationPage from './pages/VerificationPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AdminAuthProvider } from './contexts/AdminAuthContext';
import { Product, CartItem, Appointment, Page, ReelVideo } from './types';
import { IconButton } from './components/common';
import DevConsoleMessage from './components/common/DevConsoleMessage';
import { products, heroSlides, reelsVideos, DISCOUNT_PERCENTAGE, getDiscountMultiplier } from './constants/products';

// Constants
const TRANSFORMATION_IMAGES = [
  "images/before-after-1.webp",
  "images/before-after-2.webp",
  "images/before-after-3.webp",
  "images/before-after-4.webp",
  "images/before-after-5.webp",
  "images/before-after-6.webp"
] as const;

const LANDSCAPE_BANNER_IMAGES = [
  { image: "images/home-1.webp", name: "Hair Extensions" },
  { image: "images/home-2.webp", name: "Wigs" },
  { image: "images/home-3.webp", name: "Hair Toppers" },
  { image: "images/home-4.webp", name: "Men's Hair Patches" }
] as const;

const FEATURED_COLLECTIONS = [
  { type: "Straight", image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/straight-extensions.png" },
  { type: "Wavy", image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/wavy-extensions.png" },
  { type: "Curly", image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/curly-extensions.png" },
] as const;

const TESTIMONIALS = [
  { name: "Priya S.", review: "Amazing quality! The hair extensions blend perfectly with my natural hair." },
  { name: "Anjali M.", review: "Best purchase ever! The texture is so soft and natural looking." },
  { name: "Neha K.", review: "Excellent service and the hair quality is outstanding. Highly recommend!" },
] as const;

const CURRENCIES = {
  USD: { symbol: "$", rate: 1, name: "USA (USD)" },
  INR: { symbol: "₹", rate: 86.50, name: "India (INR)" },
  EUR: { symbol: "€", rate: 0.92, name: "Europe (EUR)" },
  GBP: { symbol: "£", rate: 0.79, name: "UK (GBP)" },
  AED: { symbol: "د.إ", rate: 3.67, name: "UAE (AED)" },
  AUD: { symbol: "A$", rate: 1.52, name: "Australia (AUD)" },
  CAD: { symbol: "C$", rate: 1.38, name: "Canada (CAD)" },
  SGD: { symbol: "S$", rate: 1.34, name: "Singapore (SGD)" },
} as const;

const ROUTE_TO_PAGE: Record<string, Page> = {
  '/': 'home',
  '/shop': 'shop',
  '/cart': 'cart',
  '/checkout': 'checkout',
  '/contact': 'contact',
  '/appointment': 'appointment',
  '/product': 'product',
  '/terms': 'terms',
  '/privacy': 'privacy',
  '/about': 'about',
  '/profile': 'profile',
  '/bestsellers': 'bestsellers',
  '/admin': 'admin-login',
  '/admin/login': 'admin-login',
  '/admin/dashboard': 'admin-dashboard'
};

const PAGE_TO_ROUTE: Record<Page, string> = {
  home: '/',
  shop: '/shop',
  cart: '/cart',
  checkout: '/checkout',
  contact: '/contact',
  appointment: '/appointment',
  product: '/product',
  terms: '/terms',
  privacy: '/privacy',
  about: '/about',
  profile: '/profile',
  bestsellers: '/bestsellers',
  'admin-login': '/admin/login',
  'admin-dashboard': '/admin/dashboard'
};

// Circular progress navigation component
const CircularProgressDot = React.memo(({ index, isActive, onClick }: { index: number; isActive: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="relative w-6 h-6 flex items-center justify-center group"
    aria-label={`Transformation ${index + 1}`}
  >
    <svg className="absolute inset-0 w-6 h-6 -rotate-90">
      <circle cx="12" cy="12" r="10" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1.5" fill="none" />
      {isActive && (
        <circle
          key={`progress-${index}`}
          cx="12" cy="12" r="10"
          stroke="#ffffff"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="62.83"
          strokeDashoffset="62.83"
          className="animate-[progress_4s_linear_forwards]"
        />
      )}
    </svg>
    <div className={`w-1.5 h-1.5 rounded-full transition-all z-10 ${isActive ? "bg-white scale-125" : "bg-white/50 group-hover:bg-white/70"}`} />
  </button>
));
CircularProgressDot.displayName = 'CircularProgressDot';

const VideoReelCard = React.memo(({ video }: { video: ReelVideo }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      isPlaying ? videoRef.current.pause() : videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch(() => {});
      setIsPlaying(true);
      setIsMuted(true);
    }
  }, [video.src]);

  return (
    <div className="relative w-full h-[32rem] rounded-xl overflow-hidden shadow-lg bg-gray-100 group">
      <video
        ref={videoRef}
        src={video.src}
        loop
        muted={isMuted}
        autoPlay
        playsInline
        className="w-full h-full object-cover transition-opacity duration-700"
        onClick={togglePlay}
      />
      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={(e) => { e.stopPropagation(); togglePlay(); }}
          className="p-3 rounded-full bg-white/30 backdrop-blur-sm text-white hover:bg-white/50 transition mr-2"
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); toggleMute(); }}
          className="p-3 rounded-full bg-white/30 backdrop-blur-sm text-white hover:bg-white/50 transition"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
        </button>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white text-sm font-medium">
        {video.description}
      </div>
    </div>
  );
});
VideoReelCard.displayName = 'VideoReelCard';

function DeeceeHairApp(): React.ReactElement {
  const { isAuthenticated, user } = useAuth();

  // State management
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedTexture, setSelectedTexture] = useState("");
  const [selectedBaseSize, setSelectedBaseSize] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState("all");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [transformationSlide, setTransformationSlide] = useState(0);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<keyof typeof CURRENCIES>("USD");
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [wishlistProductIds, setWishlistProductIds] = useState<number[]>([]);
  const [profileDefaultTab, setProfileDefaultTab] = useState<"profile" | "orders" | "addresses" | "wishlist" | "security">("profile");
  const [isScrolled, setIsScrolled] = useState(false);

  // Memoized currency conversion function
  const convertPrice = useCallback((priceInUSD: number): string => {
    const { symbol, rate } = CURRENCIES[selectedCurrency];
    const converted = priceInUSD * rate;
    return `${symbol}${Math.round(converted).toLocaleString()}`;
  }, [selectedCurrency]);

  // Auto-slide effects
  useEffect(() => {
    const interval = setInterval(() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length), 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setTransformationSlide((prev) => (prev + 1) % TRANSFORMATION_IMAGES.length), 4000);
    return () => clearInterval(interval);
  }, []);

  // Handle scroll event for header background
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync current page with URL pathname on mount
  useEffect(() => {
    const pathname = window.location.pathname;

    // Handle dynamic product routes
    if (pathname.startsWith('/product/')) {
      const productId = pathname.split('/')[2];
      const product = products.find(p => p.id === parseInt(productId));
      if (product) {
        setSelectedProduct(product);
        setCurrentPage('product');
        return;
      }
    }

    // Handle shop category routes
    if (pathname === '/shop/women') {
      setCurrentPage('shop');
      setFilterCategory('all');
      return;
    }
    if (pathname === '/shop/men') {
      setCurrentPage('shop');
      setFilterCategory('mans');
      return;
    }

    const page = ROUTE_TO_PAGE[pathname] || 'home';
    setCurrentPage(page);
  }, []);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const pathname = window.location.pathname;

      // Handle dynamic product routes
      if (pathname.startsWith('/product/')) {
        const productId = pathname.split('/')[2];
        const product = products.find(p => p.id === parseInt(productId));
        if (product) {
          setSelectedProduct(product);
          setCurrentPage('product');
          return;
        }
      }

      // Handle shop category routes
      if (pathname === '/shop/women') {
        setCurrentPage('shop');
        setFilterCategory('all');
        return;
      }
      if (pathname === '/shop/men') {
        setCurrentPage('shop');
        setFilterCategory('mans');
        return;
      }

      const page = ROUTE_TO_PAGE[pathname] || 'home';
      setCurrentPage(page);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = useCallback((page: Page, category = "all") => {
    // Check if trying to access profile without login
    if (page === "profile" && !isAuthenticated) {
      setShowLogin(true);
      return;
    }

    setCurrentPage(page);
    setFilterCategory(category);
    setMobileMenuOpen(false);

    // Update URL based on page without navigation
    if (typeof window !== 'undefined') {
      let url = PAGE_TO_ROUTE[page];

      // Handle shop category URLs
      if (page === 'shop') {
        if (category === 'mans') {
          url = '/shop/men';
        } else {
          url = '/shop/women';
        }
      }

      window.history.pushState({}, '', url);
    }
  }, [isAuthenticated]);

  const handleProductClick = useCallback((product: Product) => {
    setSelectedProduct(product);
    // Auto-select Black color if available
    const blackColor = product.colors.find(color => color.toLowerCase().includes('black') || color === 'Black');
    setSelectedColor(blackColor || "");

    // Auto-select first base size if product has baseSizes
    if (product.baseSizes && product.baseSizes.length > 0) {
      setSelectedBaseSize(product.baseSizes[0]);
    } else {
      setSelectedBaseSize("");
    }

    // Auto-select first texture if available
    if (product.textures && product.textures.length > 0) {
      setSelectedTexture(product.textures[0]);
    } else {
      setSelectedTexture("");
    }

    // Auto-select size based on product
    if (product.id === 1 && product.sizes.includes('6"')) {
      // Bulk Hair Bundle - default to 6"
      setSelectedSize('6"');
    } else if (product.id === 2 && product.sizes.includes('8"')) {
      // Machine Weft Bundle - default to 8"
      setSelectedSize('8"');
    } else if (product.baseSizes && product.sizes.includes('8"')) {
      // Products with base sizes (like Lace Frontal) - default to 8"
      setSelectedSize('8"');
    } else {
      setSelectedSize("");
    }

    setCurrentPage("product");
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', `/product/${product.id}`);
    }
  }, []);

  const addToCart = useCallback(() => {
    if (!selectedProduct || !selectedColor || !selectedSize) {
      if (typeof window !== 'undefined') {
        alert("Please select color and size");
      }
      return;
    }

    // Check if base size is required but not selected
    if (selectedProduct.baseSizes && selectedProduct.baseSizes.length > 0 && !selectedBaseSize) {
      if (typeof window !== 'undefined') {
        alert("Please select base size");
      }
      return;
    }

    // Check if texture is required but not selected
    if (selectedProduct.textures && selectedProduct.textures.length > 0 && !selectedTexture) {
      if (typeof window !== 'undefined') {
        alert("Please select texture");
      }
      return;
    }

    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) =>
        item.product.id === selectedProduct.id &&
        item.color === selectedColor &&
        item.size === selectedSize &&
        item.texture === selectedTexture &&
        item.baseSize === selectedBaseSize
      );
      if (existingItemIndex !== -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex] = { ...newCart[existingItemIndex], quantity: newCart[existingItemIndex].quantity + 1 };
        return newCart;
      } else {
        return [...prevCart, {
          product: selectedProduct,
          color: selectedColor,
          size: selectedSize,
          texture: selectedTexture,
          baseSize: selectedBaseSize,
          quantity: 1
        }];
      }
    });

    if (typeof window !== 'undefined') {
      alert("Added to cart!");
    }
  }, [selectedProduct, selectedColor, selectedSize, selectedTexture, selectedBaseSize]);

  const updateQuantity = useCallback((index: number, delta: number) => {
    setCart((prevCart) => prevCart.map((item, i) => (i === index ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item)));
  }, []);

  const removeFromCart = useCallback((index: number) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  }, []);

  // Wishlist functions
  const toggleWishlist = useCallback(async (product: Product) => {
    if (!isAuthenticated || !user?.email) {
      alert('Please login to add items to wishlist');
      setShowLogin(true);
      return;
    }

    const { addToWishlist, removeFromWishlist, getWishlistItemId } = await import('./services/wishlistService');

    const isInWishlist = wishlistProductIds.includes(product.id);

    if (isInWishlist) {
      // Remove from wishlist
      const itemId = await getWishlistItemId(user.email, product.id);
      if (itemId) {
        const success = await removeFromWishlist(itemId);
        if (success) {
          setWishlistProductIds(prev => prev.filter(id => id !== product.id));
          if (typeof window !== 'undefined') {
            alert('Removed from wishlist!');
          }
        }
      }
    } else {
      // Add to wishlist
      const itemId = await addToWishlist(
        user.email,
        product.id,
        product.name,
        product.price,
        product.image,
        product.category
      );
      if (itemId) {
        setWishlistProductIds(prev => [...prev, product.id]);
        if (typeof window !== 'undefined') {
          alert('Added to wishlist! ❤️');
        }
      } else {
        // Already exists
        if (typeof window !== 'undefined') {
          alert('Already in wishlist!');
        }
      }
    }
  }, [isAuthenticated, user, wishlistProductIds]);

  // Load wishlist on auth change
  useEffect(() => {
    const loadWishlist = async () => {
      if (isAuthenticated && user?.email) {
        const { getUserWishlist } = await import('./services/wishlistService');
        const items = await getUserWishlist(user.email);
        setWishlistProductIds(items.map(item => item.productId));
      } else {
        setWishlistProductIds([]);
      }
    };
    loadWishlist();
  }, [isAuthenticated, user]);

  // Determine if current slide needs dark text (only on home page)
  const isDarkSlide = currentPage === 'home' && !isScrolled && (currentSlide === 0 || currentSlide === 2);
  const isLightSlide = currentPage === 'home' && !isScrolled && (currentSlide === 1 || currentSlide === 3 || currentSlide === 4);

  // For non-home pages, always use scrolled/solid styling
  const shouldUseSolidHeader = currentPage !== 'home' || isScrolled;

  const Header = useCallback(() => (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled || currentPage !== 'home'
        ? 'bg-white border-b border-gray-200 shadow-md'
        : 'bg-transparent'
    }`}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={() => navigateTo("home")}
              className="flex items-center space-x-2 focus:outline-none rounded px-2 py-1 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <span className="text-xl sm:text-2xl font-bold select-none text-rose-600 drop-shadow-sm">DEECEE</span>
              <span className={`text-xl sm:text-2xl font-light select-none transition-colors duration-300 ${
                shouldUseSolidHeader ? 'text-gray-800' : isDarkSlide ? 'text-gray-800 drop-shadow-sm' : 'text-white drop-shadow-lg'
              }`}>HAIR</span>
            </button>
            <nav className="hidden lg:flex space-x-6 ml-8">
              <button
                onClick={() => navigateTo("bestsellers")}
                className={`text-sm font-medium transition-all duration-200 focus:outline-none rounded px-3 py-2 relative group hover:scale-105 active:scale-95 ${
                  shouldUseSolidHeader ? 'text-gray-700 hover:text-rose-600' : isDarkSlide ? 'text-gray-800 hover:text-gray-900' : 'text-white hover:text-white/80'
                }`}
              >
                Bestsellers
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${
                  shouldUseSolidHeader ? 'bg-rose-600' : isDarkSlide ? 'bg-gray-800' : 'bg-white'
                }`}></span>
              </button>
              <button
                onClick={() => navigateTo("shop")}
                className={`text-sm font-medium transition-all duration-200 focus:outline-none rounded px-3 py-2 relative group hover:scale-105 active:scale-95 ${
                  shouldUseSolidHeader ? 'text-gray-700 hover:text-rose-600' : isDarkSlide ? 'text-gray-800 hover:text-gray-900' : 'text-white hover:text-white/80'
                }`}
              >
                Shop for Women
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${
                  shouldUseSolidHeader ? 'bg-rose-600' : isDarkSlide ? 'bg-gray-800' : 'bg-white'
                }`}></span>
              </button>
              <button
                onClick={() => navigateTo("shop", "mans")}
                className={`text-sm font-medium transition-all duration-200 focus:outline-none rounded px-3 py-2 relative group hover:scale-105 active:scale-95 ${
                  shouldUseSolidHeader ? 'text-gray-700 hover:text-rose-600' : isDarkSlide ? 'text-gray-800 hover:text-gray-900' : 'text-white hover:text-white/80'
                }`}
              >
                Shop for Men
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${
                  shouldUseSolidHeader ? 'bg-rose-600' : isDarkSlide ? 'bg-gray-800' : 'bg-white'
                }`}></span>
              </button>
              <button
                onClick={() => navigateTo("appointment")}
                className={`text-sm font-medium transition-all duration-200 focus:outline-none rounded px-3 py-2 relative group hover:scale-105 active:scale-95 ${
                  shouldUseSolidHeader ? 'text-gray-700 hover:text-rose-600' : isDarkSlide ? 'text-gray-800 hover:text-gray-900' : 'text-white hover:text-white/80'
                }`}
              >
                Book Appointment
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${
                  shouldUseSolidHeader ? 'bg-rose-600' : isDarkSlide ? 'bg-gray-800' : 'bg-white'
                }`}></span>
              </button>
              <button
                onClick={() => navigateTo("about")}
                className={`text-sm font-medium transition-all duration-200 focus:outline-none rounded px-3 py-2 relative group hover:scale-105 active:scale-95 ${
                  shouldUseSolidHeader ? 'text-gray-700 hover:text-rose-600' : isDarkSlide ? 'text-gray-800 hover:text-gray-900' : 'text-white hover:text-white/80'
                }`}
              >
                About Us
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${
                  shouldUseSolidHeader ? 'bg-rose-600' : isDarkSlide ? 'bg-gray-800' : 'bg-white'
                }`}></span>
              </button>
              <button
                onClick={() => navigateTo("contact")}
                className={`text-sm font-medium transition-all duration-200 focus:outline-none rounded px-3 py-2 relative group hover:scale-105 active:scale-95 ${
                  shouldUseSolidHeader ? 'text-gray-700 hover:text-rose-600' : isDarkSlide ? 'text-gray-800 hover:text-gray-900' : 'text-white hover:text-white/80'
                }`}
              >
                Contact Us
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${
                  shouldUseSolidHeader ? 'bg-rose-600' : isDarkSlide ? 'bg-gray-800' : 'bg-white'
                }`}></span>
              </button>
            </nav>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Currency Selector - Hidden on mobile */}
            <div className="relative hidden lg:block">
              <button
                onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 focus:outline-none group ${
                  shouldUseSolidHeader ? 'text-gray-700 hover:text-rose-600 hover:bg-rose-50' : isDarkSlide ? 'text-gray-800 hover:text-gray-900 hover:bg-gray-100/20' : 'text-white hover:text-white/80 hover:bg-white/10'
                }`}
              >
                <Globe className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span className="text-sm font-medium">{selectedCurrency}</span>
              </button>

              {showCurrencyDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-50 py-2 animate-slideDown">
                  {Object.entries(CURRENCIES).map(([code, data]) => (
                    <button
                      key={code}
                      onClick={() => {
                        setSelectedCurrency(code as keyof typeof CURRENCIES);
                        setShowCurrencyDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-rose-50 hover:text-rose-600 transition-colors ${
                        selectedCurrency === code ? 'bg-rose-50 text-rose-600 font-medium' : 'text-gray-700'
                      }`}
                    >
                      <span className="font-medium">{data.symbol}</span> {data.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="hidden sm:flex items-center space-x-2">
              <IconButton icon={Heart} isScrolled={shouldUseSolidHeader} isDarkSlide={isDarkSlide} />
              <IconButton
                icon={User}
                isScrolled={shouldUseSolidHeader}
                isDarkSlide={isDarkSlide}
                onClick={() => {
                  if (isAuthenticated) {
                    navigateTo("profile");
                  } else {
                    setShowLogin(true);
                  }
                }}
              />
            </div>
            {/* Search and Cart - Hidden on mobile */}
            <div className="hidden lg:flex items-center space-x-2">
              <IconButton icon={Search} onClick={() => setSearchOpen((v) => !v)} isScrolled={shouldUseSolidHeader} isDarkSlide={isDarkSlide} />
              <IconButton icon={ShoppingCart} onClick={() => navigateTo("cart")} badge={cart.length} isScrolled={shouldUseSolidHeader} isDarkSlide={isDarkSlide} />
            </div>
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className={`lg:hidden p-2 focus:outline-none rounded-lg transition-all duration-200 active:scale-90 ${
                shouldUseSolidHeader ? 'text-gray-700 hover:text-rose-600 hover:bg-rose-50' : isDarkSlide ? 'text-gray-800 hover:text-gray-900 hover:bg-gray-100/20' : 'text-white hover:text-white/80 hover:bg-white/10'
              }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 transform rotate-0 transition-transform duration-200" /> : <Menu className="w-6 h-6 transform rotate-0 transition-transform duration-200" />}
            </button>
          </div>
        </div>
        {searchOpen && (
          <div className="pb-4">
            <input type="text" placeholder="Search for products..." className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all" />
          </div>
        )}
      </div>
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 py-4 px-4 animate-slideDown">
          <nav className="flex flex-col space-y-3">
            {/* Search Bar */}
            <div className="mb-2">
              <input type="text" placeholder="Search for products..." className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all" />
            </div>

            {/* Cart Button */}
            <button onClick={() => { navigateTo("cart"); setMobileMenuOpen(false); }} className="text-sm font-medium text-gray-700 hover:text-rose-600 hover:bg-rose-50 transition-all duration-200 text-left focus:outline-none rounded-lg px-4 py-3 active:scale-95 transform flex items-center justify-between">
              <span className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Cart
              </span>
              {cart.length > 0 && (
                <span className="bg-rose-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>

            {/* Currency Selector */}
            <div className="border-t border-gray-200 pt-3 mt-2">
              <div className="text-xs font-semibold text-gray-500 uppercase px-4 mb-2">Select Currency</div>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(CURRENCIES).map(([code, data]) => (
                  <button
                    key={code}
                    onClick={() => {
                      setSelectedCurrency(code as keyof typeof CURRENCIES);
                    }}
                    className={`text-sm font-medium transition-all duration-200 text-left focus:outline-none rounded-lg px-4 py-2 active:scale-95 transform ${
                      selectedCurrency === code ? 'bg-rose-600 text-white' : 'text-gray-700 hover:text-rose-600 hover:bg-rose-50'
                    }`}
                  >
                    <span className="font-medium">{data.symbol}</span> {code}
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 pt-3 mt-2"></div>

            <button onClick={() => {
              if (isAuthenticated) {
                navigateTo("profile");
              } else {
                setShowLogin(true);
              }
              setMobileMenuOpen(false);
            }} className="text-sm font-medium text-gray-700 hover:text-rose-600 hover:bg-rose-50 transition-all duration-200 text-left focus:outline-none rounded-lg px-4 py-3 active:scale-95 transform">
              My Profile
            </button>
            <button onClick={() => { navigateTo("bestsellers"); setMobileMenuOpen(false); }} className="text-sm font-medium text-gray-700 hover:text-rose-600 hover:bg-rose-50 transition-all duration-200 text-left focus:outline-none rounded-lg px-4 py-3 active:scale-95 transform">
              Bestsellers
            </button>
            <button onClick={() => { navigateTo("shop"); setMobileMenuOpen(false); }} className="text-sm font-medium text-gray-700 hover:text-rose-600 hover:bg-rose-50 transition-all duration-200 text-left focus:outline-none rounded-lg px-4 py-3 active:scale-95 transform">
              Shop for Women
            </button>
            <button onClick={() => { navigateTo("shop", "mans"); setMobileMenuOpen(false); }} className="text-sm font-medium text-gray-700 hover:text-rose-600 hover:bg-rose-50 transition-all duration-200 text-left focus:outline-none rounded-lg px-4 py-3 active:scale-95 transform">
              Shop for Men
            </button>
            <button onClick={() => { navigateTo("appointment"); setMobileMenuOpen(false); }} className="text-sm font-medium text-gray-700 hover:text-rose-600 hover:bg-rose-50 transition-all duration-200 text-left focus:outline-none rounded-lg px-4 py-3 active:scale-95 transform">
              Book Appointment
            </button>
            <button onClick={() => { navigateTo("about"); setMobileMenuOpen(false); }} className="text-sm font-medium text-gray-700 hover:text-rose-600 hover:bg-rose-50 transition-all duration-200 text-left focus:outline-none rounded-lg px-4 py-3 active:scale-95 transform">
              About Us
            </button>
            <button onClick={() => { navigateTo("contact"); setMobileMenuOpen(false); }} className="text-sm font-medium text-gray-700 hover:text-rose-600 hover:bg-rose-50 transition-all duration-200 text-left focus:outline-none rounded-lg px-4 py-3 active:scale-95 transform">
              Contact Us
            </button>
            <button onClick={() => { navigateTo("terms"); setMobileMenuOpen(false); }} className="text-sm font-medium text-gray-700 hover:text-rose-600 hover:bg-rose-50 transition-all duration-200 text-left focus:outline-none rounded-lg px-4 py-3 active:scale-95 transform">
              Terms & Conditions
            </button>
            <button onClick={() => { navigateTo("privacy"); setMobileMenuOpen(false); }} className="text-sm font-medium text-gray-700 hover:text-rose-600 hover:bg-rose-50 transition-all duration-200 text-left focus:outline-none rounded-lg px-4 py-3 active:scale-95 transform">
              Privacy Policy
            </button>
          </nav>
        </div>
      )}
    </header>
  ), [cart.length, mobileMenuOpen, navigateTo, searchOpen, isAuthenticated, selectedCurrency, showCurrencyDropdown, isScrolled, currentSlide, isDarkSlide, currentPage, shouldUseSolidHeader]);

  // Memoized Video Section - to prevent re-renders when hero slider changes
  const PromoVideoSection = useMemo(() => (
    <section className="bg-black">
      <div className="w-full bg-black">
        <div className="relative w-full bg-black" style={{ aspectRatio: '4.13' }}>
          <video autoPlay loop muted playsInline preload="auto" className="w-full h-full object-cover block">
            <source src="/videos/promo-video.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  ), []);

  // Hero Slider Section - to only re-render when currentSlide changes
  const HomePageTop = useCallback(() => (
    <>
      <section className="relative h-[20vh] sm:h-[32vh] md:h-[40vh] lg:h-[80vh] flex items-center justify-center overflow-hidden -mt-16 pt-16">
        {heroSlides.map((slide, index) => (
          <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"}`} style={{ backgroundImage: `url('${slide.image}')`, backgroundSize: "cover", backgroundPosition: "center" }} />
        ))}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-600/40 via-transparent to-rose-600/40" />
        <button onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)} className="hidden lg:flex absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full hover:bg-white/30 transition z-30" aria-label="Previous slide">
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)} className="hidden lg:flex absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full hover:bg-white/30 transition z-30" aria-label="Next slide">
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <div className="absolute bottom-1 sm:bottom-2 md:bottom-3 lg:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-1.5 z-30">
          {heroSlides.map((_, index) => (
            <button key={index} onClick={() => setCurrentSlide(index)} className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${index === currentSlide ? "bg-white w-4 sm:w-6" : "bg-white/50 hover:bg-white/70"}`} aria-label={`Go to slide ${index + 1}`} />
          ))}
        </div>
      </section>

      {/* Landscape Banner Section */}
      <section className="py-4 sm:py-6 md:py-8 lg:py-10">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
            {LANDSCAPE_BANNER_IMAGES.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 aspect-square w-full">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <p className="mt-2 text-xs sm:text-sm md:text-base font-semibold text-gray-800 text-center">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  ), [currentSlide]);

  // Content Section - to not re-render when hero slider changes
  const HomePageBottom = useCallback(() => (
    <>

      <section className="py-2 sm:py-3 md:py-4 lg:py-6" style={{backgroundColor: '#f4f4f4'}}>
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">Bestsellers</h2>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-4 mb-2 sm:mb-3 md:mb-4 lg:mb-6">Our most loved products, trusted by thousands of customers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-6 lg:gap-8">
            {products.filter(p => p.isBestseller).map((product) => (
              <div key={product.id} className="group cursor-pointer rounded-2xl shadow-lg overflow-hidden bg-white hover:shadow-2xl transition-all duration-300" onClick={() => handleProductClick(product)}>
                <div className="relative overflow-hidden aspect-video">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-rose-600 text-white px-2.5 py-1 md:px-3 md:py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" /> Bestseller
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5 lg:p-6">
                    <h3 className="text-lg sm:text-xl md:text-xl lg:text-2xl font-bold text-white mb-1.5 md:mb-2 truncate">{product.name}</h3>
                    <div className="flex items-center gap-2 mb-1.5 md:mb-2 flex-wrap">
                      <p className="text-white text-base md:text-lg font-semibold">{convertPrice(product.price)}</p>
                      <p className="text-white/70 line-through text-sm">{convertPrice(product.price * getDiscountMultiplier())}</p>
                      <span className="text-xs font-semibold bg-green-500 text-white px-2 py-0.5 rounded">{DISCOUNT_PERCENTAGE}% OFF</span>
                    </div>
                    <button className="text-white underline hover:no-underline text-xs sm:text-sm md:text-base">Shop Now →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button
              onClick={() => navigateTo("bestsellers")}
              className="bg-rose-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-rose-700 transition"
            >
              View All Bestsellers
            </button>
          </div>
        </div>
      </section>

      {/* Featured Photo Section */}
      <section className="h-[20vh] sm:h-[28vh] md:h-[32vh] lg:h-[80vh] w-auto relative overflow-hidden">
        <img
          src="/images/6.webp"
          alt="Featured Collection"
          className="w-full h-full object-cover"
        />
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div> */}
      </section>

      <section className="py-2 sm:py-3 md:py-4 lg:py-6" style={{backgroundColor: '#f4f4f4'}}>
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">New Arrivals</h2>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-4 mb-2 sm:mb-3 md:mb-4 lg:mb-6">Discover our latest collection of premium hair extensions</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-6 lg:gap-8">
            {products.filter(p => p.isNew).map((product) => (
              <div key={product.id} className="group cursor-pointer rounded-2xl shadow-lg overflow-hidden bg-white hover:shadow-2xl transition-all duration-300" onClick={() => handleProductClick(product)}>
                <div className="relative overflow-hidden aspect-video">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-green-600 text-white px-2.5 py-1 md:px-3 md:py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 fill-current" /> New
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5 lg:p-6">
                    <h3 className="text-lg sm:text-xl md:text-xl lg:text-2xl font-bold text-white mb-1.5 md:mb-2 truncate">{product.name}</h3>
                    <div className="flex items-center gap-2 mb-1.5 md:mb-2 flex-wrap">
                      <p className="text-white text-base md:text-lg font-semibold">{convertPrice(product.price)}</p>
                      <p className="text-white/70 line-through text-sm">{convertPrice(product.price * getDiscountMultiplier())}</p>
                      <span className="text-xs font-semibold bg-green-500 text-white px-2 py-0.5 rounded">{DISCOUNT_PERCENTAGE}% OFF</span>
                    </div>
                    <button className="text-white underline hover:no-underline text-xs sm:text-sm md:text-base">Shop Now →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hair Transformations Slideshow */}
      <section className="py-2 sm:py-3 md:py-4 lg:py-6" style={{backgroundColor: '#f4f4f4'}}>
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-2 sm:mb-3 md:mb-4 lg:mb-6">
            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">Hair Transformations</h2>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-4">See the amazing transformations our customers have achieved</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <div className="relative aspect-[3/4] md:aspect-video bg-gray-100">
                <img
                  src={TRANSFORMATION_IMAGES[transformationSlide]}
                  alt={`Hair Transformation ${transformationSlide + 1}`}
                  className="w-full h-full object-cover transition-opacity duration-1000"
                  loading="lazy"
                />

                {/* Navigation Dots Overlay */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2.5 z-20">
                  {TRANSFORMATION_IMAGES.map((_, index) => (
                    <CircularProgressDot
                      key={index}
                      index={index}
                      isActive={index === transformationSlide}
                      onClick={() => setTransformationSlide(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-2 sm:py-3 md:py-4 lg:py-6" style={{backgroundColor: '#f4f4f4'}}>
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4 text-center">Featured Collections</h2>
          <p className="text-sm md:text-base text-gray-600 text-center max-w-2xl mx-auto px-4 mb-2 sm:mb-3 md:mb-4 lg:mb-6">Discover our premium hair extensions in various textures to match your style</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-6 lg:gap-8">
            {FEATURED_COLLECTIONS.map((item) => (
              <div key={item.type} className="group cursor-pointer" onClick={() => { setFilterCategory(item.type.toLowerCase()); navigateTo("shop"); }}>
                <div className="relative overflow-hidden rounded-2xl shadow-lg aspect-video">
                  <img src={item.image} alt={`${item.type} Extensions`} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5 lg:p-6">
                    <h3 className="text-lg sm:text-xl md:text-xl lg:text-2xl font-bold text-white mb-1.5 md:mb-2">{item.type} Extensions</h3>
                    <button className="text-white underline hover:no-underline text-xs sm:text-sm md:text-base">Shop Now →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-2 sm:py-3 md:py-4 lg:py-6" style={{backgroundColor: '#f4f4f4'}}>
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">Mans Collection</h2>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-4 mb-2 sm:mb-3 md:mb-4 lg:mb-6">Premium hair solutions designed specifically for men</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-6 lg:gap-8">
            {products.filter(p => p.isMans).map((product) => (
              <div key={product.id} className="group cursor-pointer rounded-2xl shadow-lg overflow-hidden bg-white hover:shadow-2xl transition-all duration-300" onClick={() => handleProductClick(product)}>
                <div className="relative overflow-hidden aspect-video">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5 lg:p-6">
                    <h3 className="text-lg sm:text-xl md:text-xl lg:text-2xl font-bold text-white mb-1.5 md:mb-2 truncate">{product.name}</h3>
                    <div className="flex items-center gap-2 mb-1.5 md:mb-2 flex-wrap">
                      <p className="text-white text-base md:text-lg font-semibold">{convertPrice(product.price)}</p>
                      <p className="text-white/70 line-through text-sm">{convertPrice(product.price * getDiscountMultiplier())}</p>
                      <span className="text-xs font-semibold bg-green-500 text-white px-2 py-0.5 rounded">{DISCOUNT_PERCENTAGE}% OFF</span>
                    </div>
                    <button className="text-white underline hover:no-underline text-xs sm:text-sm md:text-base">Shop Now →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6 md:mt-8">
            <button
              onClick={() => { setFilterCategory("mans"); setCurrentPage("shop"); }}
              className="bg-rose-600 text-white px-5 md:px-6 py-2.5 md:py-3 rounded-lg font-semibold hover:bg-rose-700 transition text-sm md:text-base"
            >
              View All Mans Products
            </button>
          </div>
        </div>
      </section>

      <section className="py-2 sm:py-3 md:py-4 lg:py-6" style={{backgroundColor: '#f4f4f4'}}>
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 sm:mb-12 text-center">Style Inspiration & Reels</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {reelsVideos.map((video) => (
              <VideoReelCard key={video.id} video={video} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20 bg-rose-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 sm:mb-12 text-center">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {TESTIMONIALS.map((testimonial) => (
              <div key={testimonial.name} className="bg-white p-4 sm:p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex mb-4">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic text-sm sm:text-base">\"{testimonial.review}\"</p>
                <p className="font-semibold text-gray-900 text-sm sm:text-base">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  ), [navigateTo, convertPrice, transformationSlide, handleProductClick]);

  // Check if current page is admin page
  const isAdminPage = currentPage === 'admin-login' || currentPage === 'admin-dashboard';

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Developer Console Message */}
      <DevConsoleMessage />

      {/* Fixed Header Wrapper - Hidden for admin pages */}
      {!isAdminPage && (
        <div className="fixed top-0 left-0 right-0 z-[9999] w-full bg-white shadow-sm">
          <Header />
        </div>
      )}
      {/* Spacer - Hidden for admin pages */}
      {!isAdminPage && (
        <div className="h-16"></div>
      )}
      <main className="w-full">
        {currentPage === "home" && ( <div className="w-auto"> <HomePageTop /> {PromoVideoSection} <HomePageBottom /> </div> )}
        {currentPage === "shop" && (
          <ShopPage
            products={products}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            onProductClick={handleProductClick}
            convertPrice={convertPrice}
            wishlistProductIds={wishlistProductIds}
            onToggleWishlist={toggleWishlist}
          />
        )}
        {currentPage === "product" && selectedProduct && (
          <ProductPage
            product={selectedProduct}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            selectedTexture={selectedTexture}
            setSelectedTexture={setSelectedTexture}
            selectedBaseSize={selectedBaseSize}
            setSelectedBaseSize={setSelectedBaseSize}
            onAddToCart={addToCart}
            onBackToShop={() => navigateTo("shop")}
            convertPrice={convertPrice}
            isInWishlist={wishlistProductIds.includes(selectedProduct.id)}
            onToggleWishlist={toggleWishlist}
          />
        )}
        {currentPage === "cart" && (
          <CartPage
            cart={cart}
            onUpdateQuantity={updateQuantity}
            onRemoveFromCart={removeFromCart}
            onContinueShopping={() => navigateTo("shop")}
            onProceedToCheckout={() => {
              if (!isAuthenticated) {
                setShowLogin(true);
              } else {
                navigateTo("checkout");
              }
            }}
            convertPrice={convertPrice}
          />
        )}
        {currentPage === "checkout" && (
          <CheckoutPage
            cart={cart}
            convertPrice={convertPrice}
            onBackToCart={() => navigateTo("cart")}
            onOrderSuccess={() => {
              setCart([]);
              setProfileDefaultTab("orders");
              navigateTo("profile");
            }}
          />
        )}
        {currentPage === "contact" && <ContactPage />}
        {currentPage === "appointment" && (
          <AppointmentPage
            appointments={appointments}
            setAppointments={setAppointments}
            onNavigateHome={() => navigateTo("home")}
          />
        )}
        {currentPage === "terms" && <TermsPage />}
        {currentPage === "privacy" && <PrivacyPolicyPage />}
        {currentPage === "about" && <AboutUsPage />}
        {currentPage === "profile" && (
          <ProfilePage
            onNavigateToLogin={() => setShowLogin(true)}
            onNavigateHome={() => navigateTo("home")}
            defaultTab={profileDefaultTab}
          />
        )}
        {currentPage === "bestsellers" && (
          <BestsellersPage
            products={products}
            onProductClick={handleProductClick}
            onBackToHome={() => navigateTo("home")}
            convertPrice={convertPrice}
          />
        )}
        {currentPage === "admin-login" && (
          <AdminLoginPage
            onLoginSuccess={() => navigateTo("admin-dashboard")}
            onBackToHome={() => navigateTo("home")}
          />
        )}
        {currentPage === "admin-dashboard" && (
          <AdminDashboardPage
            onLogout={() => navigateTo("admin-login")}
          />
        )}
      </main>

      {/* Login Modal */}
      {showLogin && (
        <LoginPage
          onClose={() => setShowLogin(false)}
          onSwitchToSignup={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
          onLoginSuccess={() => {
            setShowLogin(false);
            setCurrentPage("profile");
          }}
          onNeedsVerification={() => {
            setShowVerification(true);
          }}
          onForgotPassword={() => {
            setShowLogin(false);
            setShowForgotPassword(true);
          }}
        />
      )}

      {/* Signup Modal */}
      {showSignup && (
        <SignupPage
          onClose={() => setShowSignup(false)}
          onSwitchToLogin={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
          onSignupSuccess={() => {
            setShowSignup(false);
            setShowVerification(true);
          }}
        />
      )}

      {/* Verification Modal */}
      {showVerification && (
        <VerificationPage
          onClose={() => setShowVerification(false)}
          onVerificationSuccess={() => {
            setShowVerification(false);
            setCurrentPage("profile");
          }}
        />
      )}

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <ForgotPasswordPage
          onClose={() => setShowForgotPassword(false)}
          onBackToLogin={() => {
            setShowForgotPassword(false);
            setShowLogin(true);
          }}
        />
      )}

      {/* Footer - Hidden for admin pages */}
      {!isAdminPage && (
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-4 sm:py-6 w-full relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-600/5 rounded-full blur-3xl"></div>

        <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Brand Section */}
            <div>
              <div className="flex items-center mb-3">
                <span className="text-xl sm:text-2xl font-bold text-rose-600 select-none">DEECEE</span>
                <span className="text-xl sm:text-2xl font-light text-white select-none ml-2">HAIR</span>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm mb-4 leading-relaxed">
                Premium quality hair extensions for the modern woman. Transform your look with our 100% authentic textures.
              </p>
              <div className="flex space-x-2">
                <a
                  href="https://www.instagram.com/deeceehairofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gray-800 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://www.facebook.com/hairdeecee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://www.youtube.com/@deeceehair"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="mailto:info@deeceehairs.com"
                  className="w-8 h-8 bg-gray-800 hover:bg-rose-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold mb-3 text-sm sm:text-base text-white">Quick Links</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
                <li>
                  <button onClick={() => navigateTo("about")} className="hover:text-rose-500 transition-colors" type="button">About Us</button>
                </li>
                <li>
                  <button onClick={() => navigateTo("shop")} className="hover:text-rose-500 transition-colors" type="button">Shop</button>
                </li>
                <li>
                  <button onClick={() => navigateTo("bestsellers")} className="hover:text-rose-500 transition-colors" type="button">Bestsellers</button>
                </li>
                <li>
                  <button onClick={() => navigateTo("contact")} className="hover:text-rose-500 transition-colors" type="button">Contact</button>
                </li>
                <li>
                  <button onClick={() => navigateTo("appointment")} className="hover:text-rose-500 transition-colors" type="button">Book Appointment</button>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-bold mb-3 text-sm sm:text-base text-white">Legal</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
                <li>
                  <button onClick={() => navigateTo("terms")} className="hover:text-rose-500 transition-colors" type="button">Terms & Conditions</button>
                </li>
                <li>
                  <button onClick={() => navigateTo("privacy")} className="hover:text-rose-500 transition-colors" type="button">Privacy Policy</button>
                </li>
              </ul>
              <div className="mt-4 space-y-2">
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <Shield className="w-3 h-3 text-rose-600" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <Truck className="w-3 h-3 text-rose-600" />
                  <span>Free Shipping</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700/50 pt-4">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
              <p className="text-xs text-gray-400 select-none">
                &copy; {new Date().getFullYear()} DEECEE HAIR. All rights reserved.
              </p>
              <a
                href="https://github.com/Deepak5310"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-500 hover:text-rose-400 transition-colors"
              >
                Crafted by <span className="text-rose-500">Deepak</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
      )}

      {/* Floating WhatsApp Button - Hidden for admin pages */}
      {!isAdminPage && (
        <a
          href="https://wa.me/919351455595"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#25D366] hover:bg-[#128C7E] rounded-full flex items-center justify-center shadow-2xl hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] transition-all duration-300 hover:scale-110 active:scale-95 group animate-bounce hover:animate-none"
          aria-label="Contact us on WhatsApp"
        >
        <svg
          viewBox="0 0 24 24"
          className="w-9 h-9 fill-white group-hover:scale-110 transition-transform"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>
      )}
    </div>
  );
}

// AuthProvider with AdminAuthProvider
export default function DeeceeHair(): React.ReactElement {
  return (
    <AuthProvider>
      <AdminAuthProvider>
        <DeeceeHairApp />
      </AdminAuthProvider>
    </AuthProvider>
  );
}
