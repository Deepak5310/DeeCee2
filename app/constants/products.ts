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
    name: "Lace Closure",
    price: 36, // Base price (4x4/2x6/3x5 8" NS/NW/NC)
    image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/lace-closer1.png",
    images: [
      "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/lace-closer1.png",
      "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/lace-closer2.png"
    ],
    colors: ["Black", "Dark Brown", "Chestnut"],
    sizes: ['8"', '10"', '12"', '14"', '16"', '18"', '20"', '22"', '24"', '26"'],
    baseSizes: ["4x4", "2x6", "3x5", "5x5", "6x6"],
    textures: ["Natural Straight (NS)", "Natural Wavy (NW)", "Natural Curly (NC)", "Deep Wave (DW)", "Loose Wave (LW)", "Body Wave (BW)", "Kinky Straight (KS)", "Kinky Curly (KC)", "Water Wave (WW)"],
    baseSizeTexturePricing: {
      "4x4": {
        '8"': { 'Natural Straight (NS)': 36, 'Natural Wavy (NW)': 36, 'Natural Curly (NC)': 36, 'Deep Wave (DW)': 39, 'Loose Wave (LW)': 39, 'Body Wave (BW)': 39, 'Kinky Straight (KS)': 39, 'Kinky Curly (KC)': 39, 'Water Wave (WW)': 39 },
        '10"': { 'Natural Straight (NS)': 40, 'Natural Wavy (NW)': 40, 'Natural Curly (NC)': 40, 'Deep Wave (DW)': 43, 'Loose Wave (LW)': 43, 'Body Wave (BW)': 43, 'Kinky Straight (KS)': 43, 'Kinky Curly (KC)': 43, 'Water Wave (WW)': 43 },
        '12"': { 'Natural Straight (NS)': 43, 'Natural Wavy (NW)': 43, 'Natural Curly (NC)': 43, 'Deep Wave (DW)': 46, 'Loose Wave (LW)': 46, 'Body Wave (BW)': 46, 'Kinky Straight (KS)': 46, 'Kinky Curly (KC)': 46, 'Water Wave (WW)': 46 },
        '14"': { 'Natural Straight (NS)': 48, 'Natural Wavy (NW)': 48, 'Natural Curly (NC)': 48, 'Deep Wave (DW)': 51, 'Loose Wave (LW)': 51, 'Body Wave (BW)': 51, 'Kinky Straight (KS)': 51, 'Kinky Curly (KC)': 51, 'Water Wave (WW)': 51 },
        '16"': { 'Natural Straight (NS)': 52, 'Natural Wavy (NW)': 52, 'Natural Curly (NC)': 52, 'Deep Wave (DW)': 55, 'Loose Wave (LW)': 55, 'Body Wave (BW)': 55, 'Kinky Straight (KS)': 55, 'Kinky Curly (KC)': 55, 'Water Wave (WW)': 55 },
        '18"': { 'Natural Straight (NS)': 64, 'Natural Wavy (NW)': 64, 'Natural Curly (NC)': 64, 'Deep Wave (DW)': 67, 'Loose Wave (LW)': 67, 'Body Wave (BW)': 67, 'Kinky Straight (KS)': 67, 'Kinky Curly (KC)': 67, 'Water Wave (WW)': 67 },
        '20"': { 'Natural Straight (NS)': 68, 'Natural Wavy (NW)': 68, 'Natural Curly (NC)': 68, 'Deep Wave (DW)': 71, 'Loose Wave (LW)': 71, 'Body Wave (BW)': 71, 'Kinky Straight (KS)': 71, 'Kinky Curly (KC)': 71, 'Water Wave (WW)': 71 },
        '22"': { 'Natural Straight (NS)': 72, 'Natural Wavy (NW)': 72, 'Natural Curly (NC)': 72, 'Deep Wave (DW)': 75, 'Loose Wave (LW)': 75, 'Body Wave (BW)': 75, 'Kinky Straight (KS)': 75, 'Kinky Curly (KC)': 75, 'Water Wave (WW)': 75 },
        '24"': { 'Natural Straight (NS)': 83, 'Natural Wavy (NW)': 83, 'Natural Curly (NC)': 83, 'Deep Wave (DW)': 79, 'Loose Wave (LW)': 79, 'Body Wave (BW)': 79, 'Kinky Straight (KS)': 79, 'Kinky Curly (KC)': 79, 'Water Wave (WW)': 79 },
        '26"': { 'Natural Straight (NS)': 83, 'Natural Wavy (NW)': 83, 'Natural Curly (NC)': 83, 'Deep Wave (DW)': 83, 'Loose Wave (LW)': 83, 'Body Wave (BW)': 83, 'Kinky Straight (KS)': 83, 'Kinky Curly (KC)': 83, 'Water Wave (WW)': 83 }
      },
      "2x6": {
        '8"': { 'Natural Straight (NS)': 36, 'Natural Wavy (NW)': 36, 'Natural Curly (NC)': 36, 'Deep Wave (DW)': 39, 'Loose Wave (LW)': 39, 'Body Wave (BW)': 39, 'Kinky Straight (KS)': 39, 'Kinky Curly (KC)': 39, 'Water Wave (WW)': 39 },
        '10"': { 'Natural Straight (NS)': 40, 'Natural Wavy (NW)': 40, 'Natural Curly (NC)': 40, 'Deep Wave (DW)': 43, 'Loose Wave (LW)': 43, 'Body Wave (BW)': 43, 'Kinky Straight (KS)': 43, 'Kinky Curly (KC)': 43, 'Water Wave (WW)': 43 },
        '12"': { 'Natural Straight (NS)': 43, 'Natural Wavy (NW)': 43, 'Natural Curly (NC)': 43, 'Deep Wave (DW)': 46, 'Loose Wave (LW)': 46, 'Body Wave (BW)': 46, 'Kinky Straight (KS)': 46, 'Kinky Curly (KC)': 46, 'Water Wave (WW)': 46 },
        '14"': { 'Natural Straight (NS)': 48, 'Natural Wavy (NW)': 48, 'Natural Curly (NC)': 48, 'Deep Wave (DW)': 51, 'Loose Wave (LW)': 51, 'Body Wave (BW)': 51, 'Kinky Straight (KS)': 51, 'Kinky Curly (KC)': 51, 'Water Wave (WW)': 51 },
        '16"': { 'Natural Straight (NS)': 52, 'Natural Wavy (NW)': 52, 'Natural Curly (NC)': 52, 'Deep Wave (DW)': 55, 'Loose Wave (LW)': 55, 'Body Wave (BW)': 55, 'Kinky Straight (KS)': 55, 'Kinky Curly (KC)': 55, 'Water Wave (WW)': 55 },
        '18"': { 'Natural Straight (NS)': 64, 'Natural Wavy (NW)': 64, 'Natural Curly (NC)': 64, 'Deep Wave (DW)': 67, 'Loose Wave (LW)': 67, 'Body Wave (BW)': 67, 'Kinky Straight (KS)': 67, 'Kinky Curly (KC)': 67, 'Water Wave (WW)': 67 },
        '20"': { 'Natural Straight (NS)': 68, 'Natural Wavy (NW)': 68, 'Natural Curly (NC)': 68, 'Deep Wave (DW)': 71, 'Loose Wave (LW)': 71, 'Body Wave (BW)': 71, 'Kinky Straight (KS)': 71, 'Kinky Curly (KC)': 71, 'Water Wave (WW)': 71 },
        '22"': { 'Natural Straight (NS)': 72, 'Natural Wavy (NW)': 72, 'Natural Curly (NC)': 72, 'Deep Wave (DW)': 75, 'Loose Wave (LW)': 75, 'Body Wave (BW)': 75, 'Kinky Straight (KS)': 75, 'Kinky Curly (KC)': 75, 'Water Wave (WW)': 75 },
        '24"': { 'Natural Straight (NS)': 83, 'Natural Wavy (NW)': 83, 'Natural Curly (NC)': 83, 'Deep Wave (DW)': 79, 'Loose Wave (LW)': 79, 'Body Wave (BW)': 79, 'Kinky Straight (KS)': 79, 'Kinky Curly (KC)': 79, 'Water Wave (WW)': 79 },
        '26"': { 'Natural Straight (NS)': 83, 'Natural Wavy (NW)': 83, 'Natural Curly (NC)': 83, 'Deep Wave (DW)': 83, 'Loose Wave (LW)': 83, 'Body Wave (BW)': 83, 'Kinky Straight (KS)': 83, 'Kinky Curly (KC)': 83, 'Water Wave (WW)': 83 }
      },
      "3x5": {
        '8"': { 'Natural Straight (NS)': 36, 'Natural Wavy (NW)': 36, 'Natural Curly (NC)': 36, 'Deep Wave (DW)': 39, 'Loose Wave (LW)': 39, 'Body Wave (BW)': 39, 'Kinky Straight (KS)': 39, 'Kinky Curly (KC)': 39, 'Water Wave (WW)': 39 },
        '10"': { 'Natural Straight (NS)': 40, 'Natural Wavy (NW)': 40, 'Natural Curly (NC)': 40, 'Deep Wave (DW)': 43, 'Loose Wave (LW)': 43, 'Body Wave (BW)': 43, 'Kinky Straight (KS)': 43, 'Kinky Curly (KC)': 43, 'Water Wave (WW)': 43 },
        '12"': { 'Natural Straight (NS)': 43, 'Natural Wavy (NW)': 43, 'Natural Curly (NC)': 43, 'Deep Wave (DW)': 46, 'Loose Wave (LW)': 46, 'Body Wave (BW)': 46, 'Kinky Straight (KS)': 46, 'Kinky Curly (KC)': 46, 'Water Wave (WW)': 46 },
        '14"': { 'Natural Straight (NS)': 48, 'Natural Wavy (NW)': 48, 'Natural Curly (NC)': 48, 'Deep Wave (DW)': 51, 'Loose Wave (LW)': 51, 'Body Wave (BW)': 51, 'Kinky Straight (KS)': 51, 'Kinky Curly (KC)': 51, 'Water Wave (WW)': 51 },
        '16"': { 'Natural Straight (NS)': 52, 'Natural Wavy (NW)': 52, 'Natural Curly (NC)': 52, 'Deep Wave (DW)': 55, 'Loose Wave (LW)': 55, 'Body Wave (BW)': 55, 'Kinky Straight (KS)': 55, 'Kinky Curly (KC)': 55, 'Water Wave (WW)': 55 },
        '18"': { 'Natural Straight (NS)': 64, 'Natural Wavy (NW)': 64, 'Natural Curly (NC)': 64, 'Deep Wave (DW)': 67, 'Loose Wave (LW)': 67, 'Body Wave (BW)': 67, 'Kinky Straight (KS)': 67, 'Kinky Curly (KC)': 67, 'Water Wave (WW)': 67 },
        '20"': { 'Natural Straight (NS)': 68, 'Natural Wavy (NW)': 68, 'Natural Curly (NC)': 68, 'Deep Wave (DW)': 71, 'Loose Wave (LW)': 71, 'Body Wave (BW)': 71, 'Kinky Straight (KS)': 71, 'Kinky Curly (KC)': 71, 'Water Wave (WW)': 71 },
        '22"': { 'Natural Straight (NS)': 72, 'Natural Wavy (NW)': 72, 'Natural Curly (NC)': 72, 'Deep Wave (DW)': 75, 'Loose Wave (LW)': 75, 'Body Wave (BW)': 75, 'Kinky Straight (KS)': 75, 'Kinky Curly (KC)': 75, 'Water Wave (WW)': 75 },
        '24"': { 'Natural Straight (NS)': 83, 'Natural Wavy (NW)': 83, 'Natural Curly (NC)': 83, 'Deep Wave (DW)': 79, 'Loose Wave (LW)': 79, 'Body Wave (BW)': 79, 'Kinky Straight (KS)': 79, 'Kinky Curly (KC)': 79, 'Water Wave (WW)': 79 },
        '26"': { 'Natural Straight (NS)': 83, 'Natural Wavy (NW)': 83, 'Natural Curly (NC)': 83, 'Deep Wave (DW)': 83, 'Loose Wave (LW)': 83, 'Body Wave (BW)': 83, 'Kinky Straight (KS)': 83, 'Kinky Curly (KC)': 83, 'Water Wave (WW)': 83 }
      },
      "5x5": {
        '10"': { 'Natural Straight (NS)': 47, 'Natural Wavy (NW)': 47, 'Natural Curly (NC)': 47, 'Deep Wave (DW)': 50, 'Loose Wave (LW)': 50, 'Body Wave (BW)': 50, 'Kinky Straight (KS)': 50, 'Kinky Curly (KC)': 50, 'Water Wave (WW)': 50 },
        '12"': { 'Natural Straight (NS)': 49, 'Natural Wavy (NW)': 49, 'Natural Curly (NC)': 49, 'Deep Wave (DW)': 52, 'Loose Wave (LW)': 52, 'Body Wave (BW)': 52, 'Kinky Straight (KS)': 52, 'Kinky Curly (KC)': 52, 'Water Wave (WW)': 52 },
        '14"': { 'Natural Straight (NS)': 50, 'Natural Wavy (NW)': 50, 'Natural Curly (NC)': 50, 'Deep Wave (DW)': 53, 'Loose Wave (LW)': 53, 'Body Wave (BW)': 53, 'Kinky Straight (KS)': 53, 'Kinky Curly (KC)': 53, 'Water Wave (WW)': 53 },
        '16"': { 'Natural Straight (NS)': 56, 'Natural Wavy (NW)': 56, 'Natural Curly (NC)': 56, 'Deep Wave (DW)': 59, 'Loose Wave (LW)': 59, 'Body Wave (BW)': 59, 'Kinky Straight (KS)': 59, 'Kinky Curly (KC)': 59, 'Water Wave (WW)': 59 },
        '18"': { 'Natural Straight (NS)': 72, 'Natural Wavy (NW)': 72, 'Natural Curly (NC)': 72, 'Deep Wave (DW)': 76, 'Loose Wave (LW)': 76, 'Body Wave (BW)': 76, 'Kinky Straight (KS)': 76, 'Kinky Curly (KC)': 76, 'Water Wave (WW)': 76 },
        '20"': { 'Natural Straight (NS)': 86, 'Natural Wavy (NW)': 86, 'Natural Curly (NC)': 86, 'Deep Wave (DW)': 90, 'Loose Wave (LW)': 90, 'Body Wave (BW)': 90, 'Kinky Straight (KS)': 90, 'Kinky Curly (KC)': 90, 'Water Wave (WW)': 90 },
        '22"': { 'Natural Straight (NS)': 91, 'Natural Wavy (NW)': 91, 'Natural Curly (NC)': 91, 'Deep Wave (DW)': 95, 'Loose Wave (LW)': 95, 'Body Wave (BW)': 95, 'Kinky Straight (KS)': 95, 'Kinky Curly (KC)': 95, 'Water Wave (WW)': 95 },
        '24"': { 'Natural Straight (NS)': 97, 'Natural Wavy (NW)': 97, 'Natural Curly (NC)': 97, 'Deep Wave (DW)': 101, 'Loose Wave (LW)': 101, 'Body Wave (BW)': 101, 'Kinky Straight (KS)': 101, 'Kinky Curly (KC)': 101, 'Water Wave (WW)': 101 },
        '26"': { 'Natural Straight (NS)': 103, 'Natural Wavy (NW)': 103, 'Natural Curly (NC)': 103, 'Deep Wave (DW)': 107, 'Loose Wave (LW)': 107, 'Body Wave (BW)': 107, 'Kinky Straight (KS)': 107, 'Kinky Curly (KC)': 107, 'Water Wave (WW)': 107 }
      },
      "6x6": {
        '12"': { 'Natural Straight (NS)': 55, 'Natural Wavy (NW)': 55, 'Natural Curly (NC)': 55, 'Deep Wave (DW)': 58, 'Loose Wave (LW)': 58, 'Body Wave (BW)': 58, 'Kinky Straight (KS)': 58, 'Kinky Curly (KC)': 58, 'Water Wave (WW)': 58 },
        '14"': { 'Natural Straight (NS)': 58, 'Natural Wavy (NW)': 58, 'Natural Curly (NC)': 58, 'Deep Wave (DW)': 61, 'Loose Wave (LW)': 61, 'Body Wave (BW)': 61, 'Kinky Straight (KS)': 61, 'Kinky Curly (KC)': 61, 'Water Wave (WW)': 61 },
        '16"': { 'Natural Straight (NS)': 65, 'Natural Wavy (NW)': 65, 'Natural Curly (NC)': 65, 'Deep Wave (DW)': 68, 'Loose Wave (LW)': 68, 'Body Wave (BW)': 68, 'Kinky Straight (KS)': 68, 'Kinky Curly (KC)': 68, 'Water Wave (WW)': 68 },
        '18"': { 'Natural Straight (NS)': 80, 'Natural Wavy (NW)': 80, 'Natural Curly (NC)': 80, 'Deep Wave (DW)': 83, 'Loose Wave (LW)': 83, 'Body Wave (BW)': 83, 'Kinky Straight (KS)': 83, 'Kinky Curly (KC)': 83, 'Water Wave (WW)': 83 },
        '20"': { 'Natural Straight (NS)': 96, 'Natural Wavy (NW)': 96, 'Natural Curly (NC)': 96, 'Deep Wave (DW)': 100, 'Loose Wave (LW)': 100, 'Body Wave (BW)': 100, 'Kinky Straight (KS)': 100, 'Kinky Curly (KC)': 100, 'Water Wave (WW)': 100 },
        '22"': { 'Natural Straight (NS)': 100, 'Natural Wavy (NW)': 100, 'Natural Curly (NC)': 100, 'Deep Wave (DW)': 104, 'Loose Wave (LW)': 104, 'Body Wave (BW)': 104, 'Kinky Straight (KS)': 104, 'Kinky Curly (KC)': 104, 'Water Wave (WW)': 104 },
        '24"': { 'Natural Straight (NS)': 107, 'Natural Wavy (NW)': 107, 'Natural Curly (NC)': 107, 'Deep Wave (DW)': 111, 'Loose Wave (LW)': 111, 'Body Wave (BW)': 111, 'Kinky Straight (KS)': 111, 'Kinky Curly (KC)': 111, 'Water Wave (WW)': 111 },
        '26"': { 'Natural Straight (NS)': 114, 'Natural Wavy (NW)': 114, 'Natural Curly (NC)': 114, 'Deep Wave (DW)': 118, 'Loose Wave (LW)': 118, 'Body Wave (BW)': 118, 'Kinky Straight (KS)': 118, 'Kinky Curly (KC)': 118, 'Water Wave (WW)': 118 }
      }
    },
    category: "curly",
    isBestseller: true,
    description: "Premium lace closure piece available in five base sizes (4x4, 2x6, 3x5, 5x5, 6x6) for creating a natural-looking hairline and part. Made with high-quality Swiss lace that blends invisibly with your scalp. Features pre-plucked hairline and baby hairs for a realistic appearance. Perfect for completing your hair extension look with a flawless finish. Available in multiple textures from Natural Straight to Water Wave."
  },
  {
    id: 4,
    name: "Lace Frontal",
    price: 49, // Base price (8" 13x4 NS/NW/NC)
    image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/lace-frontal1.jpg",
    images: [
      "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/lace-frontal1.jpg",
      "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/lace-frontal2.jpg"
    ],
    colors: ["Black", "Brown", "Blonde", "Red"],
    sizes: ['8"', '10"', '12"', '14"', '16"', '18"', '20"', '22"', '24"', '26"'],
    baseSizes: ["13x4", "13x5", "13x6"],
    textures: ["Natural Straight (NS)", "Natural Wavy (NW)", "Natural Curly (NC)", "Deep Wave (DW)", "Loose Wave (LW)", "Body Wave (BW)", "Kinky Straight (KS)", "Kinky Curly (KC)", "Water Wave (WW)"],
    baseSizeTexturePricing: {
      "13x4": {
        '8"': { 'Natural Straight (NS)': 49, 'Natural Wavy (NW)': 49, 'Natural Curly (NC)': 49, 'Deep Wave (DW)': 52, 'Loose Wave (LW)': 52, 'Body Wave (BW)': 52, 'Kinky Straight (KS)': 52, 'Kinky Curly (KC)': 52, 'Water Wave (WW)': 52 },
        '10"': { 'Natural Straight (NS)': 54, 'Natural Wavy (NW)': 54, 'Natural Curly (NC)': 54, 'Deep Wave (DW)': 57, 'Loose Wave (LW)': 57, 'Body Wave (BW)': 57, 'Kinky Straight (KS)': 57, 'Kinky Curly (KC)': 57, 'Water Wave (WW)': 57 },
        '12"': { 'Natural Straight (NS)': 59, 'Natural Wavy (NW)': 59, 'Natural Curly (NC)': 59, 'Deep Wave (DW)': 62, 'Loose Wave (LW)': 62, 'Body Wave (BW)': 62, 'Kinky Straight (KS)': 62, 'Kinky Curly (KC)': 62, 'Water Wave (WW)': 62 },
        '14"': { 'Natural Straight (NS)': 67, 'Natural Wavy (NW)': 67, 'Natural Curly (NC)': 67, 'Deep Wave (DW)': 70, 'Loose Wave (LW)': 70, 'Body Wave (BW)': 70, 'Kinky Straight (KS)': 70, 'Kinky Curly (KC)': 70, 'Water Wave (WW)': 70 },
        '16"': { 'Natural Straight (NS)': 73, 'Natural Wavy (NW)': 73, 'Natural Curly (NC)': 73, 'Deep Wave (DW)': 76, 'Loose Wave (LW)': 76, 'Body Wave (BW)': 76, 'Kinky Straight (KS)': 76, 'Kinky Curly (KC)': 76, 'Water Wave (WW)': 76 },
        '18"': { 'Natural Straight (NS)': 86, 'Natural Wavy (NW)': 86, 'Natural Curly (NC)': 86, 'Deep Wave (DW)': 89, 'Loose Wave (LW)': 89, 'Body Wave (BW)': 89, 'Kinky Straight (KS)': 89, 'Kinky Curly (KC)': 89, 'Water Wave (WW)': 89 },
        '20"': { 'Natural Straight (NS)': 92, 'Natural Wavy (NW)': 92, 'Natural Curly (NC)': 92, 'Deep Wave (DW)': 95, 'Loose Wave (LW)': 95, 'Body Wave (BW)': 95, 'Kinky Straight (KS)': 95, 'Kinky Curly (KC)': 95, 'Water Wave (WW)': 95 },
        '22"': { 'Natural Straight (NS)': 97, 'Natural Wavy (NW)': 97, 'Natural Curly (NC)': 97, 'Deep Wave (DW)': 100, 'Loose Wave (LW)': 100, 'Body Wave (BW)': 100, 'Kinky Straight (KS)': 100, 'Kinky Curly (KC)': 100, 'Water Wave (WW)': 100 },
        '24"': { 'Natural Straight (NS)': 103, 'Natural Wavy (NW)': 103, 'Natural Curly (NC)': 103, 'Deep Wave (DW)': 106, 'Loose Wave (LW)': 106, 'Body Wave (BW)': 106, 'Kinky Straight (KS)': 106, 'Kinky Curly (KC)': 106, 'Water Wave (WW)': 106 },
        '26"': { 'Natural Straight (NS)': 109, 'Natural Wavy (NW)': 109, 'Natural Curly (NC)': 109, 'Deep Wave (DW)': 112, 'Loose Wave (LW)': 112, 'Body Wave (BW)': 112, 'Kinky Straight (KS)': 112, 'Kinky Curly (KC)': 112, 'Water Wave (WW)': 112 }
      },
      "13x5": {
        '8"': { 'Natural Straight (NS)': 64, 'Natural Wavy (NW)': 64, 'Natural Curly (NC)': 64, 'Deep Wave (DW)': 67, 'Loose Wave (LW)': 67, 'Body Wave (BW)': 67, 'Kinky Straight (KS)': 67, 'Kinky Curly (KC)': 67, 'Water Wave (WW)': 67 },
        '10"': { 'Natural Straight (NS)': 68, 'Natural Wavy (NW)': 68, 'Natural Curly (NC)': 68, 'Deep Wave (DW)': 71, 'Loose Wave (LW)': 71, 'Body Wave (BW)': 71, 'Kinky Straight (KS)': 71, 'Kinky Curly (KC)': 71, 'Water Wave (WW)': 71 },
        '12"': { 'Natural Straight (NS)': 72, 'Natural Wavy (NW)': 72, 'Natural Curly (NC)': 72, 'Deep Wave (DW)': 75, 'Loose Wave (LW)': 75, 'Body Wave (BW)': 75, 'Kinky Straight (KS)': 75, 'Kinky Curly (KC)': 75, 'Water Wave (WW)': 75 },
        '14"': { 'Natural Straight (NS)': 76, 'Natural Wavy (NW)': 76, 'Natural Curly (NC)': 76, 'Deep Wave (DW)': 79, 'Loose Wave (LW)': 79, 'Body Wave (BW)': 79, 'Kinky Straight (KS)': 79, 'Kinky Curly (KC)': 79, 'Water Wave (WW)': 79 },
        '16"': { 'Natural Straight (NS)': 83, 'Natural Wavy (NW)': 83, 'Natural Curly (NC)': 83, 'Deep Wave (DW)': 86, 'Loose Wave (LW)': 86, 'Body Wave (BW)': 86, 'Kinky Straight (KS)': 86, 'Kinky Curly (KC)': 86, 'Water Wave (WW)': 86 },
        '18"': { 'Natural Straight (NS)': 102, 'Natural Wavy (NW)': 102, 'Natural Curly (NC)': 102, 'Deep Wave (DW)': 105, 'Loose Wave (LW)': 105, 'Body Wave (BW)': 105, 'Kinky Straight (KS)': 105, 'Kinky Curly (KC)': 105, 'Water Wave (WW)': 105 },
        '20"': { 'Natural Straight (NS)': 114, 'Natural Wavy (NW)': 114, 'Natural Curly (NC)': 114, 'Deep Wave (DW)': 117, 'Loose Wave (LW)': 117, 'Body Wave (BW)': 117, 'Kinky Straight (KS)': 117, 'Kinky Curly (KC)': 117, 'Water Wave (WW)': 117 },
        '22"': { 'Natural Straight (NS)': 120, 'Natural Wavy (NW)': 120, 'Natural Curly (NC)': 120, 'Deep Wave (DW)': 123, 'Loose Wave (LW)': 123, 'Body Wave (BW)': 123, 'Kinky Straight (KS)': 123, 'Kinky Curly (KC)': 123, 'Water Wave (WW)': 123 },
        '24"': { 'Natural Straight (NS)': 132, 'Natural Wavy (NW)': 132, 'Natural Curly (NC)': 132, 'Deep Wave (DW)': 135, 'Loose Wave (LW)': 135, 'Body Wave (BW)': 135, 'Kinky Straight (KS)': 135, 'Kinky Curly (KC)': 135, 'Water Wave (WW)': 135 },
        '26"': { 'Natural Straight (NS)': 138, 'Natural Wavy (NW)': 138, 'Natural Curly (NC)': 138, 'Deep Wave (DW)': 141, 'Loose Wave (LW)': 141, 'Body Wave (BW)': 141, 'Kinky Straight (KS)': 141, 'Kinky Curly (KC)': 141, 'Water Wave (WW)': 141 }
      },
      "13x6": {
        '8"': { 'Natural Straight (NS)': 65, 'Natural Wavy (NW)': 65, 'Natural Curly (NC)': 65, 'Deep Wave (DW)': 68, 'Loose Wave (LW)': 68, 'Body Wave (BW)': 68, 'Kinky Straight (KS)': 68, 'Kinky Curly (KC)': 68, 'Water Wave (WW)': 68 },
        '10"': { 'Natural Straight (NS)': 71, 'Natural Wavy (NW)': 71, 'Natural Curly (NC)': 71, 'Deep Wave (DW)': 74, 'Loose Wave (LW)': 74, 'Body Wave (BW)': 74, 'Kinky Straight (KS)': 74, 'Kinky Curly (KC)': 74, 'Water Wave (WW)': 74 },
        '12"': { 'Natural Straight (NS)': 77, 'Natural Wavy (NW)': 77, 'Natural Curly (NC)': 77, 'Deep Wave (DW)': 80, 'Loose Wave (LW)': 80, 'Body Wave (BW)': 80, 'Kinky Straight (KS)': 80, 'Kinky Curly (KC)': 80, 'Water Wave (WW)': 80 },
        '14"': { 'Natural Straight (NS)': 83, 'Natural Wavy (NW)': 83, 'Natural Curly (NC)': 83, 'Deep Wave (DW)': 86, 'Loose Wave (LW)': 86, 'Body Wave (BW)': 86, 'Kinky Straight (KS)': 86, 'Kinky Curly (KC)': 86, 'Water Wave (WW)': 86 },
        '16"': { 'Natural Straight (NS)': 89, 'Natural Wavy (NW)': 89, 'Natural Curly (NC)': 89, 'Deep Wave (DW)': 92, 'Loose Wave (LW)': 92, 'Body Wave (BW)': 92, 'Kinky Straight (KS)': 92, 'Kinky Curly (KC)': 92, 'Water Wave (WW)': 92 },
        '18"': { 'Natural Straight (NS)': 110, 'Natural Wavy (NW)': 110, 'Natural Curly (NC)': 110, 'Deep Wave (DW)': 113, 'Loose Wave (LW)': 113, 'Body Wave (BW)': 113, 'Kinky Straight (KS)': 113, 'Kinky Curly (KC)': 113, 'Water Wave (WW)': 113 },
        '20"': { 'Natural Straight (NS)': 120, 'Natural Wavy (NW)': 120, 'Natural Curly (NC)': 120, 'Deep Wave (DW)': 123, 'Loose Wave (LW)': 123, 'Body Wave (BW)': 123, 'Kinky Straight (KS)': 123, 'Kinky Curly (KC)': 123, 'Water Wave (WW)': 123 },
        '22"': { 'Natural Straight (NS)': 128, 'Natural Wavy (NW)': 128, 'Natural Curly (NC)': 128, 'Deep Wave (DW)': 131, 'Loose Wave (LW)': 131, 'Body Wave (BW)': 131, 'Kinky Straight (KS)': 131, 'Kinky Curly (KC)': 131, 'Water Wave (WW)': 131 },
        '24"': { 'Natural Straight (NS)': 138, 'Natural Wavy (NW)': 138, 'Natural Curly (NC)': 138, 'Deep Wave (DW)': 141, 'Loose Wave (LW)': 141, 'Body Wave (BW)': 141, 'Kinky Straight (KS)': 141, 'Kinky Curly (KC)': 141, 'Water Wave (WW)': 141 },
        '26"': { 'Natural Straight (NS)': 150, 'Natural Wavy (NW)': 150, 'Natural Curly (NC)': 150, 'Deep Wave (DW)': 153, 'Loose Wave (LW)': 153, 'Body Wave (BW)': 153, 'Kinky Straight (KS)': 153, 'Kinky Curly (KC)': 153, 'Water Wave (WW)': 153 }
      }
    },
    category: "wavy",
    isNew: true,
    description: "Ear-to-ear lace frontal available in three base sizes (13x4, 13x5, 13x6) for versatile styling options. Create natural-looking hairlines and part your hair anywhere you desire. Made with transparent HD lace for seamless blending. Pre-plucked with baby hairs and bleached knots for an ultra-realistic appearance. Available in multiple textures from Natural Straight to Water Wave."
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

export const heroSlides = [
  { image: "/images/1.webp", title: "Luxurious Hair", subtitle: "Extensions", description: "Transform your look with our premium collection" },
  { image: "/images/2.webp", title: "Natural Beauty", subtitle: "Redefined", description: "100% human hair for the perfect blend" },
  { image: "/images/3.webp", title: "Premium Quality", subtitle: "Guaranteed", description: "Silky smooth textures that last" },
  { image: "/images/4.webp", title: "Your Style", subtitle: "Elevated", description: "From straight to curly, we have it all" },
  { image: "/images/5.webp", title: "Confidence", subtitle: "Unleashed", description: "Feel beautiful every single day" },
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

// Get price for a product based on selected size, texture, and base size
export const getProductPrice = (product: Product, selectedSize: string, selectedTexture?: string, selectedBaseSize?: string): number => {
  // If product has base size-texture-based pricing (e.g., Lace Frontal with 13x4, 13x5, 13x6)
  if (product.baseSizeTexturePricing && selectedBaseSize && selectedSize && selectedTexture) {
    const baseSizePrice = product.baseSizeTexturePricing[selectedBaseSize];
    if (baseSizePrice && baseSizePrice[selectedSize]) {
      const texturePrice = baseSizePrice[selectedSize][selectedTexture];
      if (texturePrice !== undefined) {
        return texturePrice;
      }
    }
  }

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

