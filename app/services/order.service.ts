/**
 * Order API Service
 * Handles order creation and management
 */

import { apiRequest } from './api.service';
import type { Order, CartItem, Address } from '@/app/types';

export interface CreateOrderData {
  items: CartItem[];
  shippingAddress: Address;
  paymentInfo: {
    method: 'card' | 'upi' | 'netbanking' | 'wallet' | 'cod';
    transactionId?: string;
  };
}

/**
 * Get all orders for authenticated user
 */
export const getUserOrders = async () => {
  return apiRequest<Order[]>('/api/orders', {
    method: 'GET',
  });
};

/**
 * Get specific order details
 */
export const getOrderById = async (orderId: string) => {
  return apiRequest<Order>(`/api/orders/${orderId}`, {
    method: 'GET',
  });
};

/**
 * Create new order
 */
export const createOrder = async (data: CreateOrderData) => {
  return apiRequest<Order>('/api/orders', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * Cancel an order
 */
export const cancelOrder = async (orderId: string) => {
  return apiRequest(`/api/orders/${orderId}/cancel`, {
    method: 'PUT',
  });
};

/**
 * Get order tracking information
 */
export const trackOrder = async (orderId: string) => {
  return apiRequest(`/api/orders/${orderId}/track`, {
    method: 'GET',
  });
};
