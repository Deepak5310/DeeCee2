import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand primary colors (beige/tan palette)
        brand: {
          50: '#FAF6F1',   // Lightest cream
          100: '#F3E4CF',  // Light beige/cream - header background
          200: '#E8D4BC',  // Lighter tan
          300: '#D4B59E',  // Medium tan - borders
          400: '#C4A48B',  // Medium-dark tan
          500: '#A88B6A',  // Primary tan - main brand color
          600: '#8B7355',  // Darker tan - hover states
          700: '#6B5744',  // Brown - secondary
          800: '#4A3B2E',  // Dark brown - tertiary
          900: '#2E251D',  // Darkest brown
        },

        // Neutral colors (grays and blacks)
        neutral: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },

        // Text colors
        text: {
          primary: '#2C2C2C',    // Soft black for headings
          secondary: '#3D3D3D',  // Medium gray for subheadings
          tertiary: '#4A4A4A',   // Lighter gray for body text
          muted: '#6B7280',      // Muted text
        },

        // Status colors
        success: '#10b981',  // green-500
        error: '#ef4444',    // red-500
        warning: '#f59e0b',  // amber-500
        info: '#3b82f6',     // blue-500

        // Console colors (for DevConsoleMessage)
        console: {
          danger: '#e11d48',   // rose-600
          subtitle: '#64748b', // slate-500
          info: '#0ea5e9',     // sky-500
          tech: '#10b981',     // emerald-500
          warning: '#f59e0b',  // amber-500
          link: '#8b5cf6',     // violet-500
        },

        // Background colors
        background: {
          DEFAULT: '#ffffff',
          dark: '#0a0a0a',
          overlay: 'rgba(212, 181, 158, 0.4)',
        },

        // Social media colors
        social: {
          instagram: '#E1306C',
          facebook: '#1877F2',
          youtube: '#FF0000',
          whatsapp: '#25D366',
        },
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-brand': 'linear-gradient(135deg, var(--tw-gradient-stops))',
      },

      animation: {
        'slideDown': 'slideDown 0.3s ease-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
      },

      keyframes: {
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
