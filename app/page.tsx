"use client"

import React, { useEffect, useState, useRef, useCallback } from "react";
// Router functionality handled with native History API
import { Heart, User, Search, ShoppingCart, Menu, X, Star, Truck, Shield, ChevronLeft, ChevronRight, Calendar, Pause, Play, VolumeX, Volume2, Sparkles, Instagram, Facebook, Youtube, Mail, MessageCircle, Globe } from "lucide-react";
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
import { AdminAuthProvider, useAdminAuth } from './contexts/AdminAuthContext';
import { Product, CartItem, Appointment, Page, ReelVideo } from './types';
import { IconButton } from './components/common';
import DevConsoleMessage from './components/common/DevConsoleMessage';
import { products, heroSlides, reelsVideos, DISCOUNT_PERCENTAGE, getDiscountMultiplier } from './constants/products';

const VideoReelCard = ({ video }: { video: ReelVideo }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
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
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play();
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
};

function DeeceeHairApp(): React.ReactElement {
  const { isAuthenticated, user } = useAuth();
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
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<string>("USD");
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [wishlistProductIds, setWishlistProductIds] = useState<number[]>([]);
  const [profileDefaultTab, setProfileDefaultTab] = useState<"profile" | "orders" | "addresses" | "wishlist" | "security">("profile");

  // Currency data with exchange rates (1 USD = 86.50 INR)
  // All prices stored in USD, converted to local currency
  const currencies = {
    USD: { symbol: "$", rate: 1, name: "USA (USD)" },
    INR: { symbol: "₹", rate: 86.50, name: "India (INR)" },
    EUR: { symbol: "€", rate: 0.92, name: "Europe (EUR)" },
    GBP: { symbol: "£", rate: 0.79, name: "UK (GBP)" },
    AED: { symbol: "د.إ", rate: 3.67, name: "UAE (AED)" },
    AUD: { symbol: "A$", rate: 1.52, name: "Australia (AUD)" },
    CAD: { symbol: "C$", rate: 1.38, name: "Canada (CAD)" },
    SGD: { symbol: "S$", rate: 1.34, name: "Singapore (SGD)" },
  };

  // Function to convert price from USD to selected currency
  const convertPrice = useCallback((priceInUSD: number): string => {
    const converted = priceInUSD * currencies[selectedCurrency as keyof typeof currencies].rate;
    return `${currencies[selectedCurrency as keyof typeof currencies].symbol}${Math.round(converted).toLocaleString()}`;
  }, [selectedCurrency]);

  // Hero slideshow auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Route mapping constants
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

  const Header = useCallback(() => (
    <header className="bg-[#FFFBFF]/95 border-b border-[#D3AB9E]/20 shadow-sm backdrop-blur-md">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <button
              onClick={() => navigateTo("home")}
              className="flex items-center space-x-2 focus:outline-none rounded px-2 py-1 transition-all duration-200 hover:opacity-80"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              <span className="text-2xl sm:text-3xl font-light text-[#D3AB9E] select-none tracking-wide">DEECEE</span>
              <span className="text-2xl sm:text-3xl font-light text-[#2C2C2C] select-none tracking-wide">HAIR</span>
            </button>
            <nav className="hidden lg:flex space-x-8 ml-12">
              <button
                onClick={() => navigateTo("bestsellers")}
                className="text-xs font-light text-[#2C2C2C] hover:text-[#D3AB9E] transition-all duration-300 focus:outline-none px-3 py-2 relative group tracking-widest uppercase"
              >
                Bestsellers
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#D3AB9E] group-hover:w-full transition-all duration-500"></span>
              </button>
              <button
                onClick={() => navigateTo("shop")}
                className="text-xs font-light text-[#2C2C2C] hover:text-[#D3AB9E] transition-all duration-300 focus:outline-none px-3 py-2 relative group tracking-widest uppercase"
              >
                Women
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#D3AB9E] group-hover:w-full transition-all duration-500"></span>
              </button>
              <button
                onClick={() => navigateTo("shop", "mans")}
                className="text-xs font-light text-[#2C2C2C] hover:text-[#D3AB9E] transition-all duration-300 focus:outline-none px-3 py-2 relative group tracking-widest uppercase"
              >
                Men
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#D3AB9E] group-hover:w-full transition-all duration-500"></span>
              </button>
              <button
                onClick={() => navigateTo("appointment")}
                className="text-xs font-light text-[#2C2C2C] hover:text-[#D3AB9E] transition-all duration-300 focus:outline-none px-3 py-2 relative group tracking-widest uppercase"
              >
                Appointment
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#D3AB9E] group-hover:w-full transition-all duration-500"></span>
              </button>
              <button
                onClick={() => navigateTo("about")}
                className="text-xs font-light text-[#2C2C2C] hover:text-[#D3AB9E] transition-all duration-300 focus:outline-none px-3 py-2 relative group tracking-widest uppercase"
              >
                About
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#D3AB9E] group-hover:w-full transition-all duration-500"></span>
              </button>
              <button
                onClick={() => navigateTo("contact")}
                className="text-xs font-light text-[#2C2C2C] hover:text-[#D3AB9E] transition-all duration-300 focus:outline-none px-3 py-2 relative group tracking-widest uppercase"
              >
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#D3AB9E] group-hover:w-full transition-all duration-500"></span>
              </button>
            </nav>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                className="flex items-center space-x-1 px-3 py-2 text-[#2C2C2C] hover:text-[#D3AB9E] rounded-lg transition-all duration-300 focus:outline-none group"
              >
                <Globe className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span className="text-xs font-light hidden sm:inline tracking-wider">{selectedCurrency}</span>
              </button>

              {showCurrencyDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-[#D3AB9E]/30 rounded-lg shadow-xl z-50 py-2 animate-slideDown">
                  {Object.entries(currencies).map(([code, data]) => (
                    <button
                      key={code}
                      onClick={() => {
                        setSelectedCurrency(code);
                        setShowCurrencyDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-[#EBD8D0]/30 hover:text-[#D3AB9E] transition-colors font-light ${
                        selectedCurrency === code ? 'bg-[#EBD8D0]/30 text-[#D3AB9E]' : 'text-[#2C2C2C]'
                      }`}
                    >
                      <span className="font-medium">{data.symbol}</span> {data.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="hidden sm:flex items-center space-x-2">
              <button className="p-2 text-[#2C2C2C] hover:text-[#D3AB9E] transition-all duration-300 rounded-full hover:bg-[#EBD8D0]/20">
                <Heart className="w-5 h-5" />
              </button>
              <button
                onClick={() => {
                  if (isAuthenticated) {
                    navigateTo("profile");
                  } else {
                    setShowLogin(true);
                  }
                }}
                className="p-2 text-[#2C2C2C] hover:text-[#D3AB9E] transition-all duration-300 rounded-full hover:bg-[#EBD8D0]/20"
              >
                <User className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={() => setSearchOpen((v) => !v)}
              className="p-2 text-[#2C2C2C] hover:text-[#D3AB9E] transition-all duration-300 rounded-full hover:bg-[#EBD8D0]/20"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigateTo("cart")}
              className="relative p-2 text-[#2C2C2C] hover:text-[#D3AB9E] transition-all duration-300 rounded-full hover:bg-[#EBD8D0]/20"
            >
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D3AB9E] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-light">
                  {cart.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="lg:hidden p-2 text-[#2C2C2C] hover:text-[#D3AB9E] focus:outline-none rounded-full hover:bg-[#EBD8D0]/20 transition-all duration-300"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {searchOpen && (
          <div className="pb-4">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-3 border border-[#D3AB9E]/30 rounded-none focus:outline-none focus:border-[#D3AB9E] transition-all bg-[#FFFBFF] text-[#2C2C2C] placeholder:text-gray-400 font-light"
            />
          </div>
        )}
      </div>
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFBFF] border-t border-[#D3AB9E]/20 py-4 px-4 animate-slideDown">
          <nav className="flex flex-col space-y-2">
            <button onClick={() => {
              if (isAuthenticated) {
                navigateTo("profile");
              } else {
                setShowLogin(true);
              }
              setMobileMenuOpen(false);
            }} className="text-sm font-light text-[#2C2C2C] hover:text-[#D3AB9E] hover:bg-[#EBD8D0]/20 transition-all duration-300 text-left focus:outline-none px-4 py-3 tracking-wide uppercase">
              Profile
            </button>
            <button onClick={() => { navigateTo("bestsellers"); setMobileMenuOpen(false); }} className="text-sm font-light text-[#2C2C2C] hover:text-[#D3AB9E] hover:bg-[#EBD8D0]/20 transition-all duration-300 text-left focus:outline-none px-4 py-3 tracking-wide uppercase">
              Bestsellers
            </button>
            <button onClick={() => { navigateTo("shop"); setMobileMenuOpen(false); }} className="text-sm font-light text-[#2C2C2C] hover:text-[#D3AB9E] hover:bg-[#EBD8D0]/20 transition-all duration-300 text-left focus:outline-none px-4 py-3 tracking-wide uppercase">
              Women
            </button>
            <button onClick={() => { navigateTo("shop", "mans"); setMobileMenuOpen(false); }} className="text-sm font-light text-[#2C2C2C] hover:text-[#D3AB9E] hover:bg-[#EBD8D0]/20 transition-all duration-300 text-left focus:outline-none px-4 py-3 tracking-wide uppercase">
              Men
            </button>
            <button onClick={() => { navigateTo("appointment"); setMobileMenuOpen(false); }} className="text-sm font-light text-[#2C2C2C] hover:text-[#D3AB9E] hover:bg-[#EBD8D0]/20 transition-all duration-300 text-left focus:outline-none px-4 py-3 tracking-wide uppercase">
              Appointment
            </button>
            <button onClick={() => { navigateTo("about"); setMobileMenuOpen(false); }} className="text-sm font-light text-[#2C2C2C] hover:text-[#D3AB9E] hover:bg-[#EBD8D0]/20 transition-all duration-300 text-left focus:outline-none px-4 py-3 tracking-wide uppercase">
              About
            </button>
            <button onClick={() => { navigateTo("contact"); setMobileMenuOpen(false); }} className="text-sm font-light text-[#2C2C2C] hover:text-[#D3AB9E] hover:bg-[#EBD8D0]/20 transition-all duration-300 text-left focus:outline-none px-4 py-3 tracking-wide uppercase">
              Contact
            </button>
            <button onClick={() => { navigateTo("terms"); setMobileMenuOpen(false); }} className="text-sm font-light text-[#2C2C2C] hover:text-[#D3AB9E] hover:bg-[#EBD8D0]/20 transition-all duration-300 text-left focus:outline-none px-4 py-3 tracking-wide uppercase">
              Terms
            </button>
            <button onClick={() => { navigateTo("privacy"); setMobileMenuOpen(false); }} className="text-sm font-light text-[#2C2C2C] hover:text-[#D3AB9E] hover:bg-[#EBD8D0]/20 transition-all duration-300 text-left focus:outline-none px-4 py-3 tracking-wide uppercase">
              Privacy
            </button>
          </nav>
        </div>
      )}
    </header>
  ), [cart.length, mobileMenuOpen, navigateTo, searchOpen, isAuthenticated, selectedCurrency, showCurrencyDropdown]);

  const HomePage = useCallback(() => (
    <div className="w-full bg-[#FFFBFF]">
      {/* Hero Section - Image Slideshow */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Slideshow */}
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            {/* Overlay with elegant gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#D3AB9E]/60 via-[#EBD8D0]/40 to-[#EAC9C1]/50"></div>
          </div>
        ))}

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-8">
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white tracking-tight animate-fade-in-up drop-shadow-lg" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {heroSlides[currentSlide].title}
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl text-white/95 font-light tracking-wide animate-fade-in-up animation-delay-200 drop-shadow-md" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {heroSlides[currentSlide].subtitle}
              </p>
            </div>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400 drop-shadow-md" style={{ fontFamily: "'Inter', sans-serif" }}>
              {heroSlides[currentSlide].description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 animate-fade-in-up animation-delay-600">
              <button
                onClick={() => navigateTo("shop")}
                className="group px-10 py-4 bg-white text-[#D3AB9E] rounded-none font-light text-sm tracking-widest uppercase transition-all duration-500 hover:bg-[#D3AB9E] hover:text-white shadow-lg hover:shadow-xl relative overflow-hidden"
              >
                <span className="relative z-10">Explore Collection</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D3AB9E]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </button>
              <button
                onClick={() => navigateTo("appointment")}
                className="group px-10 py-4 border-2 border-white text-white rounded-none font-light text-sm tracking-widest uppercase transition-all duration-500 hover:bg-white hover:text-[#D3AB9E] backdrop-blur-sm"
              >
                Book Consultation
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all duration-300 group"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all duration-300 group"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1 transition-all duration-300 ${
                index === currentSlide
                  ? 'w-8 bg-white'
                  : 'w-6 bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="py-20 md:py-32 bg-[#FEFEFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <p className="text-sm tracking-[0.3em] uppercase text-[#D3AB9E] font-light">Curated Selection</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-[#2C2C2C]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Bestsellers
            </h2>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#D3AB9E] to-transparent mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {products.filter(p => p.isBestseller).map((product, index) => (
              <div
                key={product.id}
                className="group cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${index * 0.15}s` }}
                onClick={() => handleProductClick(product)}
              >
                <div className="relative overflow-hidden bg-[#EBD8D0]/30 aspect-[3/4] mb-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 backdrop-blur-sm text-[#D3AB9E] px-4 py-1.5 text-xs tracking-wider uppercase font-light">
                      Bestseller
                    </span>
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <h3 className="text-xl md:text-2xl font-light text-[#2C2C2C]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-center gap-3">
                    <p className="text-lg text-[#D3AB9E] font-light">{convertPrice(product.price)}</p>
                    <p className="text-sm text-gray-400 line-through font-light">{convertPrice(product.price * getDiscountMultiplier())}</p>
                  </div>
                  <button className="text-sm tracking-wider uppercase text-[#D3AB9E] group-hover:tracking-widest transition-all duration-300 font-light">
                    Discover →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-[#EBD8D0]/20 to-[#FEFEFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <p className="text-sm tracking-[0.3em] uppercase text-[#D3AB9E] font-light">Fresh Arrivals</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-[#2C2C2C]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              New Collection
            </h2>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#D3AB9E] to-transparent mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {products.filter(p => p.isNew).map((product, index) => (
              <div
                key={product.id}
                className="group cursor-pointer animate-scale-in"
                style={{ animationDelay: `${index * 0.15}s` }}
                onClick={() => handleProductClick(product)}
              >
                <div className="relative overflow-hidden bg-[#EAC9C1]/20 aspect-[3/4] mb-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#D3AB9E]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 backdrop-blur-sm text-[#2C2C2C] px-4 py-1.5 text-xs tracking-wider uppercase font-light flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> New
                    </span>
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <h3 className="text-xl md:text-2xl font-light text-[#2C2C2C]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-center gap-3">
                    <p className="text-lg text-[#D3AB9E] font-light">{convertPrice(product.price)}</p>
                    <p className="text-sm text-gray-400 line-through font-light">{convertPrice(product.price * getDiscountMultiplier())}</p>
                  </div>
                  <button className="text-sm tracking-wider uppercase text-[#D3AB9E] group-hover:tracking-widest transition-all duration-300 font-light">
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-20 md:py-32 bg-[#FEFEFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <p className="text-sm tracking-[0.3em] uppercase text-[#D3AB9E] font-light">Texture Collection</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-[#2C2C2C]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Find Your Perfect Match
            </h2>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#D3AB9E] to-transparent mx-auto"></div>
            <p className="text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
              Explore our premium collections in various textures, each carefully crafted to complement your natural beauty
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { type: "Straight", image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/straight-extensions.png", description: "Sleek & Sophisticated" },
              { type: "Wavy", image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/wavy-extensions.png", description: "Effortlessly Elegant" },
              { type: "Curly", image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/curly-extensions.png", description: "Naturally Beautiful" },
            ].map((item, index) => (
              <div
                key={item.type}
                className="group cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
                onClick={() => { setFilterCategory(item.type.toLowerCase()); setCurrentPage("shop"); }}
              >
                <div className="relative overflow-hidden aspect-[4/5] mb-4 bg-[#EBD8D0]/20">
                  <img
                    src={item.image}
                    alt={item.type}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2C2C2C]/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-xs tracking-[0.2em] uppercase mb-2 opacity-80">{item.description}</p>
                    <h3 className="text-3xl md:text-4xl font-light mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      {item.type}
                    </h3>
                    <div className="w-12 h-px bg-white opacity-0 group-hover:opacity-100 group-hover:w-20 transition-all duration-500"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Men's Collection */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-[#FEFEFF] to-[#EBD8D0]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <p className="text-sm tracking-[0.3em] uppercase text-[#D3AB9E] font-light">For Him</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-[#2C2C2C]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Men's Collection
            </h2>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#D3AB9E] to-transparent mx-auto"></div>
            <p className="text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
              Premium hair solutions crafted for the modern gentleman
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {products.filter(p => p.isMans).map((product, index) => (
              <div
                key={product.id}
                className="group cursor-pointer animate-slide-in-left"
                style={{ animationDelay: `${index * 0.15}s` }}
                onClick={() => handleProductClick(product)}
              >
                <div className="relative overflow-hidden bg-[#D3AB9E]/10 aspect-[3/4] mb-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2C2C2C]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                <div className="text-center space-y-2">
                  <h3 className="text-xl md:text-2xl font-light text-[#2C2C2C]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-center gap-3">
                    <p className="text-lg text-[#D3AB9E] font-light">{convertPrice(product.price)}</p>
                    <p className="text-sm text-gray-400 line-through font-light">{convertPrice(product.price * getDiscountMultiplier())}</p>
                  </div>
                  <button className="text-sm tracking-wider uppercase text-[#D3AB9E] group-hover:tracking-widest transition-all duration-300 font-light">
                    Explore →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Style Reels */}
      <section className="py-20 md:py-32 bg-[#FEFEFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <p className="text-sm tracking-[0.3em] uppercase text-[#D3AB9E] font-light">Get Inspired</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-[#2C2C2C]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Style Gallery
            </h2>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#D3AB9E] to-transparent mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reelsVideos.map((video, index) => (
              <div key={video.id} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <VideoReelCard video={video} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-[#EBD8D0]/30 via-[#EAC9C1]/20 to-[#D3AB9E]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <p className="text-sm tracking-[0.3em] uppercase text-[#D3AB9E] font-light">Testimonials</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-[#2C2C2C]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Client Stories
            </h2>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#D3AB9E] to-transparent mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              { name: "Priya S.", review: "The quality is exceptional. These extensions blend seamlessly with my natural hair and feel incredibly soft." },
              { name: "Anjali M.", review: "I'm absolutely in love! The texture is so natural and the color match is perfect. Best investment I've made." },
              { name: "Neha K.", review: "Outstanding service and premium quality hair. The extensions have transformed my look completely." },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm p-8 space-y-6 animate-fade-in-up border border-[#D3AB9E]/20 hover:shadow-lg transition-shadow duration-500"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex gap-1 justify-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#D3AB9E] fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic font-light leading-relaxed text-center" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem' }}>
                  "{testimonial.review}"
                </p>
                <div className="text-center">
                  <p className="text-[#2C2C2C] font-medium tracking-wider text-sm uppercase">{testimonial.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  ), [navigateTo, convertPrice, handleProductClick, setFilterCategory, setCurrentPage]);

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
        <div className="h-20"></div>
      )}
      <main className="w-full">
        {currentPage === "home" && <HomePage />}
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
        <footer className="bg-gradient-to-b from-[#EBD8D0]/30 to-[#D3AB9E]/10 border-t border-[#D3AB9E]/20 py-16 sm:py-20 w-full relative overflow-hidden">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 sm:gap-16 mb-16">
            {/* Brand Section */}
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-center space-x-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                <span className="text-3xl sm:text-4xl font-light text-[#D3AB9E] select-none tracking-wide">DEECEE</span>
                <span className="text-3xl sm:text-4xl font-light text-[#2C2C2C] select-none tracking-wide">HAIR</span>
              </div>
              <p className="text-[#2C2C2C]/70 text-sm sm:text-base max-w-md leading-relaxed font-light">
                Elevating beauty through premium, handcrafted hair extensions. Experience luxury that transforms.
              </p>
              <div className="space-y-3">
                <h5 className="text-xs tracking-[0.2em] uppercase text-[#D3AB9E] font-light">Connect With Us</h5>
                <div className="flex space-x-3">
                  <a
                    href="https://www.instagram.com/deeceehairofficial"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-[#D3AB9E]/30 hover:bg-[#D3AB9E] hover:border-[#D3AB9E] text-[#D3AB9E] hover:text-white flex items-center justify-center transition-all duration-300 group"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4 transition-transform group-hover:scale-110" />
                  </a>
                  <a
                    href="https://www.facebook.com/hairdeecee"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-[#D3AB9E]/30 hover:bg-[#D3AB9E] hover:border-[#D3AB9E] text-[#D3AB9E] hover:text-white flex items-center justify-center transition-all duration-300 group"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-4 h-4 transition-transform group-hover:scale-110" />
                  </a>
                  <a
                    href="https://www.youtube.com/@deeceehair"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-[#D3AB9E]/30 hover:bg-[#D3AB9E] hover:border-[#D3AB9E] text-[#D3AB9E] hover:text-white flex items-center justify-center transition-all duration-300 group"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-4 h-4 transition-transform group-hover:scale-110" />
                  </a>
                  <a
                    href="mailto:info@deeceehairs.com"
                    className="w-10 h-10 border border-[#D3AB9E]/30 hover:bg-[#D3AB9E] hover:border-[#D3AB9E] text-[#D3AB9E] hover:text-white flex items-center justify-center transition-all duration-300 group"
                    aria-label="Email"
                  >
                    <Mail className="w-4 h-4 transition-transform group-hover:scale-110" />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xs tracking-[0.2em] uppercase text-[#D3AB9E] font-light mb-6">
                Explore
              </h4>
              <ul className="space-y-3 text-sm text-[#2C2C2C]/70 font-light">
                <li>
                  <button
                    onClick={() => navigateTo("about")}
                    className="hover:text-[#D3AB9E] hover:translate-x-1 transition-all duration-300 focus:outline-none inline-flex items-center group"
                    type="button"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo("shop")}
                    className="hover:text-[#D3AB9E] hover:translate-x-1 transition-all duration-300 focus:outline-none inline-flex items-center group"
                    type="button"
                  >
                    Shop Collection
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo("bestsellers")}
                    className="hover:text-[#D3AB9E] hover:translate-x-1 transition-all duration-300 focus:outline-none inline-flex items-center group"
                    type="button"
                  >
                    Bestsellers
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo("contact")}
                    className="hover:text-[#D3AB9E] hover:translate-x-1 transition-all duration-300 focus:outline-none inline-flex items-center group"
                    type="button"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-xs tracking-[0.2em] uppercase text-[#D3AB9E] font-light mb-6">
                Information
              </h4>
              <ul className="space-y-3 text-sm text-[#2C2C2C]/70 font-light">
                <li>
                  <button
                    onClick={() => navigateTo("terms")}
                    className="hover:text-[#D3AB9E] hover:translate-x-1 transition-all duration-300 focus:outline-none inline-flex items-center group"
                    type="button"
                  >
                    Terms & Conditions
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo("privacy")}
                    className="hover:text-[#D3AB9E] hover:translate-x-1 transition-all duration-300 focus:outline-none inline-flex items-center group"
                    type="button"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo("appointment")}
                    className="hover:text-[#D3AB9E] hover:translate-x-1 transition-all duration-300 focus:outline-none inline-flex items-center group"
                    type="button"
                  >
                    Book Appointment
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-[#D3AB9E]/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
              <div className="flex flex-col items-center md:items-start space-y-3">
                <p className="text-xs text-[#2C2C2C]/60 select-none font-light tracking-wide">
                  © {new Date().getFullYear()} DEECEE HAIR. All rights reserved.
                </p>
                <div className="flex items-center space-x-2 text-xs text-[#2C2C2C]/50 font-light">
                  <span>Designed with</span>
                  <span className="text-[#D3AB9E]">♥</span>
                  <span>by</span>
                  <a
                    href="https://github.com/Deepak5310"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D3AB9E] hover:text-[#C4988A] transition-colors"
                  >
                    Deepak
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-8 text-xs text-[#2C2C2C]/60 font-light">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-[#D3AB9E]" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="w-4 h-4 text-[#D3AB9E]" />
                  <span>Free Shipping</span>
                </div>
              </div>
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
