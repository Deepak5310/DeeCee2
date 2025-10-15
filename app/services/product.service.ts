/**
 * Product API Service
 * Handles product catalog and search
 */

import { publicApiRequest } from './api.service';
import type { Product } from '@/app/types';

/**
 * Get all products with optional filters
 */
export const getProducts = async (filters?: {
  category?: string;
  color?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  search?: string;
}) => {
  const params = new URLSearchParams();

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });
  }

  const endpoint = `/api/products${params.toString() ? `?${params.toString()}` : ''}`;
  return publicApiRequest<Product[]>(endpoint, {
    method: 'GET',
  });
};

/**
 * Get product by ID
 */
export const getProductById = async (productId: string) => {
  return publicApiRequest<Product>(`/api/products/${productId}`, {
    method: 'GET',
  });
};

/**
 * Get all product categories
 */
export const getCategories = async () => {
  return publicApiRequest<string[]>('/api/products/categories', {
    method: 'GET',
  });
};

/**
 * Get bestselling products
 */
export const getBestsellers = async () => {
  return publicApiRequest<Product[]>('/api/products/bestsellers', {
    method: 'GET',
  });
};

/**
 * Get new arrival products
 */
export const getNewArrivals = async () => {
  return publicApiRequest<Product[]>('/api/products/new-arrivals', {
    method: 'GET',
  });
};

/**
 * Add product review (future feature)
 */
export const addProductReview = async (
  productId: string,
  review: {
    rating: number;
    comment: string;
  }
) => {
  return publicApiRequest(`/api/products/${productId}/reviews`, {
    method: 'POST',
    body: JSON.stringify(review),
  });
};
