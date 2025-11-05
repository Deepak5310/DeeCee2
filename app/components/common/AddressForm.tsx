"use client"

import React, { useState } from 'react';
import { Address } from '@/app/types';
import { addAddress } from '@/app/services/addressService';
import { FormInput } from '@/app/components/common';

type AddressFormProps = {
  userEmail: string;
  onAddressAdded: (newAddress: Address) => void;
  onCancel: () => void;
};

export default function AddressForm({ userEmail, onAddressAdded, onCancel }: AddressFormProps) {
  const [formData, setFormData] = useState<Partial<Address>>({
    name: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: false,
  });

  const handleSubmit = async () => {
    // Validation
    if (!formData.name || !formData.phone || !formData.addressLine1 ||
        !formData.city || !formData.state || !formData.pincode) {
      alert('Please fill all required fields');
      return;
    }

    try {
      const addressToAdd: Omit<Address, 'id' | 'userEmail'> = {
        name: formData.name,
        phone: formData.phone,
        addressLine1: formData.addressLine1,
        addressLine2: formData.addressLine2 || '',
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        isDefault: formData.isDefault || false,
      };

      const addressId = await addAddress(userEmail, addressToAdd);

      if (addressId) {
        // Create the full address object to pass back
        const newAddress: Address = {
          id: addressId,
          ...addressToAdd,
        };

        onAddressAdded(newAddress);

        // Reset form
        setFormData({
          name: '',
          phone: '',
          addressLine1: '',
          addressLine2: '',
          city: '',
          state: '',
          pincode: '',
          isDefault: false,
        });
      } else {
        alert('Failed to add address. Please try again.');
      }
    } catch (error) {
      console.error('Error adding address:', error);
      alert('Failed to add address. Please try again.');
    }
  };

  return (
    <div className="bg-brand-100 rounded-lg p-6 border-2 border-brand-300">
      <h3 className="font-semibold text-gray-900 mb-4">New Address</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="Full Name *"
          value={formData.name || ''}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter full name"
        />
        <FormInput
          label="Phone Number *"
          value={formData.phone || ''}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="Enter phone number"
        />
        <div className="md:col-span-2">
          <FormInput
            label="Address Line 1 *"
            value={formData.addressLine1 || ''}
            onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
            placeholder="House no., Building, Street"
          />
        </div>
        <div className="md:col-span-2">
          <FormInput
            label="Address Line 2"
            value={formData.addressLine2 || ''}
            onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
            placeholder="Landmark, Area (Optional)"
          />
        </div>
        <FormInput
          label="City *"
          value={formData.city || ''}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          placeholder="Enter city"
        />
        <FormInput
          label="State *"
          value={formData.state || ''}
          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
          placeholder="Enter state"
        />
        <FormInput
          label="Pincode *"
          value={formData.pincode || ''}
          onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
          placeholder="Enter pincode"
        />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="addressFormDefaultCheckbox"
            checked={formData.isDefault || false}
            onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
            className="w-4 h-4 text-brand-500 border-gray-300 rounded focus:ring-brand-500"
          />
          <label htmlFor="addressFormDefaultCheckbox" className="text-sm text-gray-700">
            Set as default address
          </label>
        </div>
      </div>
      <div className="flex gap-3 mt-4">
        <button
          onClick={handleSubmit}
          className="bg-brand-500 text-white px-6 py-2 rounded-lg hover:bg-brand-700 transition font-medium"
        >
          Save Address
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition font-medium"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
