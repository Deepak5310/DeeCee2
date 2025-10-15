/**
 * Payment API Service
 * Handles payment processing and verification
 */

import { apiRequest } from './api.service';

export interface CreatePaymentIntentData {
  amount: number;
  currency: string;
  paymentMethod: 'stripe' | 'razorpay';
}

/**
 * Create payment intent
 */
export const createPaymentIntent = async (data: CreatePaymentIntentData) => {
  return apiRequest<{ clientSecret: string }>('/api/payments/create-intent', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * Verify payment status
 */
export const verifyPayment = async (data: {
  paymentId: string;
  orderId: string;
}) => {
  return apiRequest<{ verified: boolean }>('/api/payments/verify', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * Get payment details
 */
export const getPaymentDetails = async (paymentId: string) => {
  return apiRequest(`/api/payments/${paymentId}`, {
    method: 'GET',
  });
};

/**
 * Process refund
 */
export const processRefund = async (data: {
  paymentId: string;
  amount: number;
  reason: string;
}) => {
  return apiRequest('/api/payments/refund', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};
