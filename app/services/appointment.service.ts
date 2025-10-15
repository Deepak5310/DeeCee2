/**
 * Appointment API Service
 * Handles appointment booking and management
 */

import { apiRequest, publicApiRequest } from './api.service';
import type { Appointment } from '@/app/types';

export interface CreateAppointmentData {
  serviceType: string;
  scheduledDate: string;
  scheduledTime: string;
  location: 'in-store' | 'home-service' | 'virtual';
  notes?: string;
  address?: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

/**
 * Get all appointments for authenticated user
 */
export const getUserAppointments = async () => {
  return apiRequest<Appointment[]>('/api/appointments', {
    method: 'GET',
  });
};

/**
 * Get specific appointment details
 */
export const getAppointmentById = async (appointmentId: string) => {
  return apiRequest<Appointment>(`/api/appointments/${appointmentId}`, {
    method: 'GET',
  });
};

/**
 * Create new appointment
 */
export const createAppointment = async (data: CreateAppointmentData) => {
  return apiRequest<Appointment>('/api/appointments', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * Update/reschedule appointment
 */
export const updateAppointment = async (
  appointmentId: string,
  data: Partial<CreateAppointmentData>
) => {
  return apiRequest<Appointment>(`/api/appointments/${appointmentId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

/**
 * Cancel appointment
 */
export const cancelAppointment = async (appointmentId: string) => {
  return apiRequest(`/api/appointments/${appointmentId}`, {
    method: 'DELETE',
  });
};

/**
 * Get available appointment slots
 */
export const getAvailableSlots = async (date: string, serviceType: string) => {
  const params = new URLSearchParams({ date, serviceType });
  return publicApiRequest<string[]>(`/api/appointments/slots/available?${params.toString()}`, {
    method: 'GET',
  });
};
