/**
 * Theme Configuration
 * Central color definitions for consistent styling across the app
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
 * Tailwind CSS class mapping for easy replacement
 * Old rose theme → New beige/cream theme
 */
export const COLOR_CLASSES = {
  // Text colors
  'text-rose-600': 'text-[#A88B6A]',
  'text-rose-500': 'text-[#8B7355]',

  // Background colors
  'bg-rose-600': 'bg-[#A88B6A]',
  'bg-rose-500': 'bg-[#8B7355]',
  'bg-rose-50': 'bg-[#F3E4CF]',

  // Border colors
  'border-rose-600': 'border-[#A88B6A]',
  'border-rose-500': 'border-[#8B7355]',

  // Hover states
  'hover:text-rose-600': 'hover:text-[#A88B6A]',
  'hover:bg-rose-600': 'hover:bg-[#A88B6A]',
  'hover:bg-rose-50': 'hover:bg-[#F3E4CF]',

  // Ring/focus states
  'ring-rose-500': 'ring-[#A88B6A]',
  'focus:ring-rose-500': 'focus:ring-[#A88B6A]',
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
