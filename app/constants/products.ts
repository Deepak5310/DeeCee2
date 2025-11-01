import { Product } from "@/app/types";
import { Gift, Package, Truck, Sparkles } from "lucide-react";

// Discount Configuration
export const DISCOUNT_PERCENTAGE = 20; // Change this value to update discount across the site

export const products: Product[] = [
  {
    id: 1,
    name: "Bulk Hair Bundle",
    price: 150, // Base price (6 inch)
    image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/bulk-hair-bundle1.jpeg",
    images: [
      "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/bulk-hair-bundle1.jpeg",
      "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/bulk-hair-bundle2.jpeg"
    ],
    colors: ["Black", "Brown", "Blonde", "Auburn"],
    sizes: ['6"', '8"', '10"', '12"', '14"', '16"', '18"', '20"', '22"', '24"', '26"', '28"', '30"', '32"'],
    textures: ["Straight", "Wavy", "Curly", "Deep Wave"],
    sizePricing: {
      '6"': 150,
      '8"': 210,
      '10"': 270,
      '12"': 330,
      '14"': 390,
      '16"': 510,
      '18"': 620,
      '20"': 690,
      '22"': 760,
      '24"': 860,
      '26"': 980,
      '28"': 1120,
      '30"': 1220,
      '32"': 1300,
    },
    category: "straight",
    isBestseller: true,
    description: "Premium quality bulk hair bundles perfect for professional styling. Made from 100% human hair with natural texture and shine. Ideal for creating custom wigs, extensions, and various hairstyles. Can be colored, styled, and heat-treated just like your natural hair. Available in sizes from 6 to 32 inches with pricing based on length. Choose from Straight, Wavy, Curly, or Deep Wave textures."
  },
  {
    id: 2,
    name: "Machine Weft Bundle",
    price: 24, // Base price (8" Straight)
    image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/machine-weft-bundle1.png",
    images: [
      "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/machine-weft-bundle1.png",
      "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/machine-weft-bundle2.png"
    ],
    colors: ["Black", "Brown", "Honey Blonde"],
    sizes: ['8"', '10"', '12"', '14"', '16"', '18"', '20"', '22"', '24"', '26"', '28"', '30"', '32"'],
    textures: ["Straight", "Wavy", "Curly", "Deep Wave (DW)", "Loose Wave (LW)", "Body Wave (BW)", "Water Wave (WW)", "Kinky Curly (KC)", "Kinky Straight (KST)", "Body Straight (BST)"],
    sizeTexturePricing: {
      '8"': {
        'Straight': 24, 'Wavy': 24,
        'Curly': 27, 'Deep Wave (DW)': 27, 'Loose Wave (LW)': 27, 'Body Wave (BW)': 27, 'Water Wave (WW)': 27,
        'Kinky Curly (KC)': 28, 'Kinky Straight (KST)': 28, 'Body Straight (BST)': 28
      },
      '10"': {
        'Straight': 28, 'Wavy': 28,
        'Curly': 31, 'Deep Wave (DW)': 31, 'Loose Wave (LW)': 31, 'Body Wave (BW)': 31, 'Water Wave (WW)': 31,
        'Kinky Curly (KC)': 32, 'Kinky Straight (KST)': 32, 'Body Straight (BST)': 32
      },
      '12"': {
        'Straight': 32, 'Wavy': 32,
        'Curly': 35, 'Deep Wave (DW)': 35, 'Loose Wave (LW)': 35, 'Body Wave (BW)': 35, 'Water Wave (WW)': 35,
        'Kinky Curly (KC)': 36, 'Kinky Straight (KST)': 36, 'Body Straight (BST)': 36
      },
      '14"': {
        'Straight': 38, 'Wavy': 38,
        'Curly': 41, 'Deep Wave (DW)': 41, 'Loose Wave (LW)': 41, 'Body Wave (BW)': 41, 'Water Wave (WW)': 41,
        'Kinky Curly (KC)': 42, 'Kinky Straight (KST)': 42, 'Body Straight (BST)': 42
      },
      '16"': {
        'Straight': 48, 'Wavy': 48,
        'Curly': 51, 'Deep Wave (DW)': 51, 'Loose Wave (LW)': 51, 'Body Wave (BW)': 51, 'Water Wave (WW)': 51,
        'Kinky Curly (KC)': 52, 'Kinky Straight (KST)': 52, 'Body Straight (BST)': 52
      },
      '18"': {
        'Straight': 65, 'Wavy': 65,
        'Curly': 68, 'Deep Wave (DW)': 68, 'Loose Wave (LW)': 68, 'Body Wave (BW)': 68, 'Water Wave (WW)': 68,
        'Kinky Curly (KC)': 69, 'Kinky Straight (KST)': 69, 'Body Straight (BST)': 69
      },
      '20"': {
        'Straight': 74, 'Wavy': 74,
        'Curly': 77, 'Deep Wave (DW)': 77, 'Loose Wave (LW)': 77, 'Body Wave (BW)': 77, 'Water Wave (WW)': 77,
        'Kinky Curly (KC)': 78, 'Kinky Straight (KST)': 78, 'Body Straight (BST)': 78
      },
      '22"': {
        'Straight': 84, 'Wavy': 84,
        'Curly': 87, 'Deep Wave (DW)': 87, 'Loose Wave (LW)': 87, 'Body Wave (BW)': 87, 'Water Wave (WW)': 87,
        'Kinky Curly (KC)': 88, 'Kinky Straight (KST)': 88, 'Body Straight (BST)': 88
      },
      '24"': {
        'Straight': 90, 'Wavy': 90,
        'Curly': 93, 'Deep Wave (DW)': 93, 'Loose Wave (LW)': 93, 'Body Wave (BW)': 93, 'Water Wave (WW)': 93,
        'Kinky Curly (KC)': 94, 'Kinky Straight (KST)': 94, 'Body Straight (BST)': 94
      },
      '26"': {
        'Straight': 102, 'Wavy': 102,
        'Curly': 105, 'Deep Wave (DW)': 105, 'Loose Wave (LW)': 105, 'Body Wave (BW)': 105, 'Water Wave (WW)': 105,
        'Kinky Curly (KC)': 106, 'Kinky Straight (KST)': 106, 'Body Straight (BST)': 106
      },
      '28"': {
        'Straight': 114, 'Wavy': 114,
        'Curly': 117, 'Deep Wave (DW)': 117, 'Loose Wave (LW)': 117, 'Body Wave (BW)': 117, 'Water Wave (WW)': 117,
        'Kinky Curly (KC)': 118, 'Kinky Straight (KST)': 118, 'Body Straight (BST)': 118
      },
      '30"': {
        'Straight': 120, 'Wavy': 120,
        'Curly': 123, 'Deep Wave (DW)': 123, 'Loose Wave (LW)': 123, 'Body Wave (BW)': 123, 'Water Wave (WW)': 123,
        'Kinky Curly (KC)': 124, 'Kinky Straight (KST)': 124, 'Body Straight (BST)': 124
      },
      '32"': {
        'Straight': 132, 'Wavy': 132,
        'Curly': 135, 'Deep Wave (DW)': 135, 'Loose Wave (LW)': 135, 'Body Wave (BW)': 135, 'Water Wave (WW)': 135,
        'Kinky Curly (KC)': 136, 'Kinky Straight (KST)': 136, 'Body Straight (BST)': 136
      }
    },
    category: "wavy",
    isNew: true,
    description: "Luxurious machine weft hair bundles featuring premium quality textures. Double-stitched wefts ensure durability and minimal shedding. Easy to install and blend seamlessly with natural hair. Perfect for adding volume and length with a natural-looking finish. Available in 13 sizes (8-32 inches) and 10 different textures with pricing based on size and texture combination."
  },
  {
    id: 3,
    name: "Lace Closer",
    price: 88, // $88 (was ₹7,630)
    image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/lace-closer1.png",
    images: [
      "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/lace-closer1.png",
      "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/lace-closer2.png"
    ],
    colors: ["Black", "Dark Brown", "Chestnut"],
    sizes: ['14"', '18"', '22"'],
    category: "curly",
    isBestseller: true,
    description: "Premium lace closure piece for creating a natural-looking hairline and part. Made with high-quality Swiss lace that blends invisibly with your scalp. Features pre-plucked hairline and baby hairs for a realistic appearance. Perfect for completing your hair extension look with a flawless finish."
  },
  {
    id: 4,
    name: "Lace Frontal",
    price: 145, // $145 (was ₹12,510)
    image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/lace-frontal1.jpg",
    images: [
      "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/lace-frontal1.jpg",
      "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/lace-frontal2.jpg"
    ],
    colors: ["Black", "Brown", "Blonde", "Red"],
    sizes: ['18"', '22"', '26"'],
    category: "wavy",
    isNew: true,
    description: "13x4 ear-to-ear lace frontal for versatile styling options. Create natural-looking hairlines and part your hair anywhere you desire. Made with transparent HD lace for seamless blending. Pre-plucked with baby hairs and bleached knots for an ultra-realistic appearance."
  },
  {
    id: 5,
    name: "Full Lace Wig",
    price: 410, // $410 (was ₹35,499)
    image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/full-lace-wig.jpg",
    colors: ["Black", "Brown", "Ombre"],
    sizes: ['16"', '20"', '24"'],
    category: "wavy",
    description: "Luxurious full lace wig hand-crafted with premium human hair. Complete 360-degree lace cap allows for versatile styling including high ponytails and updos. Adjustable straps and combs ensure secure, comfortable fit. Pre-styled and ready to wear with minimal customization needed."
  },
  {
    id: 6,
    name: "Lace Frontel Wig",
    price: 507, // $507 (was ₹43,899)
    image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/alopecia-wig.jpg",
    colors: ["Black", "Dark Brown"],
    sizes: ['14"', '18"', '22"'],
    category: "straight",
    description: "Medical-grade wig specially designed for those experiencing hair loss or alopecia. Features breathable, soft cap construction for all-day comfort. Ultra-realistic hairline with hand-tied strands creates an undetectable appearance. Hypoallergenic materials suitable for sensitive scalps."
  },
  {
    id: 7,
    name: "Mens Premium Hair Toppers",
    price: 58, // $58 (was ₹4,999)
    image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/men-patch1.png",
    images: [
      "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/men-patch1.png",
      "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/men-patch2.png"
    ],
    colors: ["Black", "Brown", "Gray"],
    sizes: ["S", "M", "L"],
    category: "mans",
    isBestseller: true,
    isMans: true,
    description: "Discreet and natural-looking hair topper designed specifically for men. Perfect for covering thinning areas or bald spots. Features breathable base with secure clips for all-day wear. Blends seamlessly with existing hair and can be styled with heat tools."
  },
  {
    id: 8,
    name: "Gents Patch",
    price: 69, // $69 (was ₹5,999)
    image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/old-men-patch1.png",
    images: [
      "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/old-men-patch1.png",
      "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/old-men-patch2.png"
    ],
    colors: ["Black", "Brown", "Blonde"],
    sizes: ["S", "M", "L"],
    category: "mans",
    isNew: true,
    isMans: true,
    description: "Complete hair replacement system for men featuring advanced attachment technology. Ultra-thin polyurethane base creates an invisible hairline. Can be worn during sports, swimming, and daily activities. Easy to maintain and style, providing confidence and natural appearance."
  },
];

export const promoMessages = [
  { text: "100% Premium Human Hair Extensions - Authentic Quality", icon: Sparkles },
  { text: "Trusted by Thousands of Happy Customers Across India", icon: Sparkles },
  { text: "Expert Styling Consultation Available - Book Your Appointment", icon: Gift },
  { text: "Can Be Colored, Styled & Heat-Treated Like Natural Hair", icon: Sparkles },
  { text: "Fast & Secure Delivery - We Ship Pan India", icon: Truck },
  { text: "All Products Come With Quality Assurance", icon: Package },
  { text: "From Straight to Curly - Perfect Match for Every Style", icon: Sparkles },
];

export const heroSlides = [
  { image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/hero1.jpg", title: "Luxurious Hair", subtitle: "Extensions", description: "Transform your look with our premium collection" },
  { image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/hero2.jpg", title: "Natural Beauty", subtitle: "Redefined", description: "100% human hair for the perfect blend" },
  { image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/hero3.jpg", title: "Premium Quality", subtitle: "Guaranteed", description: "Silky smooth textures that last" },
  { image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/hero4.jpg", title: "Your Style", subtitle: "Elevated", description: "From straight to curly, we have it all" },
  { image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/hero5.jpg", title: "Confidence", subtitle: "Unleashed", description: "Feel beautiful every single day" },
];

export const reelsVideos = [
  { id: 1, src: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/videos/reel1.mp4", description: "Silky Straight Transformation" },
  { id: 2, src: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/videos/reel2.mp4", description: "Wavy Hair Styling Tips" },
  { id: 3, src: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/videos/reel3.mp4", description: "Curly Hair Care Routine" },
  { id: 4, src: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/videos/reel5.mp4", description: "Deep Wave Extensions Look" },
];

// Helper functions for pricing with discount
export const getOriginalPrice = (currentPrice: number): number => {
  return currentPrice / (1 - DISCOUNT_PERCENTAGE / 100);
};

export const getDiscountMultiplier = (): number => {
  return 1 / (1 - DISCOUNT_PERCENTAGE / 100);
};

// Get price for a product based on selected size and texture
export const getProductPrice = (product: Product, selectedSize: string, selectedTexture?: string): number => {
  // If product has size-texture-based pricing (e.g., Machine Weft Bundle)
  if (product.sizeTexturePricing && selectedSize && selectedTexture) {
    const sizePrice = product.sizeTexturePricing[selectedSize];
    if (sizePrice && sizePrice[selectedTexture] !== undefined) {
      return sizePrice[selectedTexture];
    }
  }

  // If product has size-based pricing only (e.g., Bulk Hair Bundle)
  if (product.sizePricing && selectedSize && product.sizePricing[selectedSize]) {
    return product.sizePricing[selectedSize];
  }

  // Return default price
  return product.price;
};

