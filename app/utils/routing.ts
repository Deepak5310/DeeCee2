/**
 * Routing Utilities
 * Central configuration for SPA routing with History API
 */

import { Page } from "@/app/types";

/**
 * Maps URL paths to page identifiers
 */
export const ROUTE_TO_PAGE: Record<string, Page> = {
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

/**
 * Maps page identifiers to URL paths
 */
export const PAGE_TO_ROUTE: Record<Page, string> = {
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

/**
 * Checks if a page is an admin-only page
 */
export const isAdminPage = (page: Page): boolean => {
  return page === 'admin-login' || page === 'admin-dashboard';
};
