/**
 * User API Service
 * Handles user profile and address management
 */

import { apiRequest } from './api.service';
import type { User, Address } from '@/app/types';

/**
 * Get user addresses
 */
export const getUserAddresses = async () => {
  return apiRequest<Address[]>('/api/users/addresses', {
    method: 'GET',
  });
};

/**
 * Add new address
 */
export const addAddress = async (address: Omit<Address, 'id'>) => {
  return apiRequest<Address>('/api/users/addresses', {
    method: 'POST',
    body: JSON.stringify(address),
  });
};

/**
 * Update address
 */
export const updateAddress = async (addressId: string, address: Partial<Address>) => {
  return apiRequest<Address>(`/api/users/addresses/${addressId}`, {
    method: 'PUT',
    body: JSON.stringify(address),
  });
};

/**
 * Delete address
 */
export const deleteAddress = async (addressId: string) => {
  return apiRequest(`/api/users/addresses/${addressId}`, {
    method: 'DELETE',
  });
};

/**
 * Update user preferences
 */
export const updateUserPreferences = async (preferences: {
  currency?: string;
  notifications?: {
    email?: boolean;
    sms?: boolean;
  };
}) => {
  return apiRequest('/api/users/preferences', {
    method: 'PUT',
    body: JSON.stringify(preferences),
  });
};
