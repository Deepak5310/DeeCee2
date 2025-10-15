/**
 * Authentication API Service
 * Handles user authentication and profile management
 */

import { apiRequest } from './api.service';
import type { User } from '@/app/types';

/**
 * Register user in database after Firebase signup
 */
export const registerUser = async (data: {
  firebaseUid: string;
  email: string;
  name: string;
}) => {
  return apiRequest('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * Get current user profile
 */
export const getUserProfile = async () => {
  return apiRequest<User>('/api/auth/profile', {
    method: 'GET',
  });
};

/**
 * Update user profile
 */
export const updateUserProfile = async (data: Partial<User>) => {
  return apiRequest<User>('/api/auth/profile', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

/**
 * Verify Firebase token
 */
export const verifyToken = async () => {
  return apiRequest('/api/auth/verify-token', {
    method: 'POST',
  });
};
