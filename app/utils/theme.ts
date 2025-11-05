/**
 * Theme Configuration
 * Central color definitions for consistent styling across the app
 * All colors are now defined in tailwind.config.ts
 * This file provides helper utilities and Tailwind class mappings
 */

export const THEME_COLORS = {
  // Primary beige/cream theme
  header: {
    background: '#F3E4CF',
    border: '#D4B59E',
  },

  // Text colors
  text: {
    primary: '#2C2C2C',      // Soft black for headings
    secondary: '#3D3D3D',    // Medium gray for subheadings
    tertiary: '#4A4A4A',     // Lighter gray for body text
    light: '#6B5744',        // Brown for secondary elements
  },

  // Accent colors
  accent: {
    primary: '#A88B6A',      // Primary tan/beige for buttons, highlights
    primaryHover: '#8B7355', // Darker tan for hover states
    secondary: '#6B5744',    // Secondary brown
    tertiary: '#4A3B2E',     // Dark brown
  },

  // Gradient colors
  gradient: {
    from: '#D4B59E',
    to: '#A88B6A',
  },

  // Background colors
  background: {
    light: '#F3E4CF',
    overlay: 'rgba(212, 181, 158, 0.4)',
  },

  // Status colors
  status: {
    success: '#10b981',    // green-500
    error: '#ef4444',      // red-500
    warning: '#f59e0b',    // amber-500
    info: '#3b82f6',       // blue-500
  },
} as const;

/**
 * Tailwind CSS class names for brand colors
 * Use these instead of hardcoded hex values
 */
export const BRAND_CLASSES = {
  // Primary brand color
  primary: {
    text: 'text-brand-500',
    bg: 'bg-brand-500',
    border: 'border-brand-500',
    ring: 'ring-brand-500',
    hover: {
      text: 'hover:text-brand-500',
      bg: 'hover:bg-brand-500',
      border: 'hover:border-brand-500',
    },
  },

  // Darker brand color (for hover states)
  dark: {
    text: 'text-brand-700',
    bg: 'bg-brand-700',
    border: 'border-brand-700',
    hover: {
      text: 'hover:text-brand-700',
      bg: 'hover:bg-brand-700',
      border: 'hover:border-brand-700',
    },
  },

  // Light brand color (for backgrounds)
  light: {
    text: 'text-brand-100',
    bg: 'bg-brand-100',
    border: 'border-brand-100',
    hover: {
      text: 'hover:text-brand-100',
      bg: 'hover:bg-brand-100',
      border: 'hover:border-brand-100',
    },
  },

  // Medium brand color (for borders)
  medium: {
    text: 'text-brand-300',
    bg: 'bg-brand-300',
    border: 'border-brand-300',
    hover: {
      text: 'hover:text-brand-300',
      bg: 'hover:bg-brand-300',
      border: 'hover:border-brand-300',
    },
  },
} as const;

/**
 * Common component class combinations
 * Use these for consistent styling
 */
export const COMPONENT_CLASSES = {
  button: {
    primary: 'bg-brand-500 text-white hover:bg-brand-700 transition-colors',
    secondary: 'bg-transparent border-2 border-brand-500 text-brand-500 hover:bg-brand-500 hover:text-white transition-colors',
    outline: 'border border-brand-500 text-brand-500 hover:bg-brand-100 transition-colors',
  },
  input: {
    base: 'border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500',
    error: 'border-error focus:ring-error',
  },
  card: {
    base: 'bg-white rounded-lg shadow-md',
    hover: 'hover:shadow-lg transition-shadow',
  },
  link: {
    nav: 'text-gray-700 hover:text-brand-500 transition-colors',
    underline: 'text-brand-500 hover:text-brand-700 underline',
  },
} as const;

/**
 * Get themed color for specific use case
 */
export const getThemeColor = (key: string): string => {
  const keys = key.split('.');
  let value: any = THEME_COLORS;

  for (const k of keys) {
    value = value[k];
    if (!value) return '#A88B6A'; // fallback to primary
  }

  return value;
};

/**
 * Utility to get Tailwind class for a color
 * @param type - The type of style (text, bg, border, etc.)
 * @param shade - The brand color shade (50-900)
 * @returns Tailwind class string
 */
export const getBrandClass = (type: 'text' | 'bg' | 'border' | 'ring', shade: 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900): string => {
  return `${type}-brand-${shade}`;
};
