"use client"

import React, { useState, useEffect } from 'react';
import { CartItem, Address } from '@/app/types';
import { useAuth } from '@/app/contexts/AuthContext';
import { getUserAddresses } from '@/app/services/addressService';
import { AddressForm } from '@/app/components/common';
import { Package, MapPin, CreditCard, Truck, ChevronLeft, Plus, Check } from 'lucide-react';
import { getProductPrice } from '@/app/constants/products';

type CheckoutPageProps = {
  cart: CartItem[];
  convertPrice: (price: number) => string;
  onBackToCart: () => void;
  onOrderSuccess: () => void;
};

export default function CheckoutPage({
  cart,
  convertPrice,
  onBackToCart,
  onOrderSuccess
}: CheckoutPageProps) {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'Razorpay' | 'UPI'>('Razorpay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');

  // Promo codes configuration from environment variables
  const promoCodes: Record<string, { discount: number; description: string }> = {};

  // Add promo codes from env if configured
  if (process.env.NEXT_PUBLIC_PROMO_CODE && process.env.NEXT_PUBLIC_PROMO_DISCOUNT) {
    const codes = process.env.NEXT_PUBLIC_PROMO_CODE.split(',');
    const discounts = process.env.NEXT_PUBLIC_PROMO_DISCOUNT.split(',');
    const descriptions = process.env.NEXT_PUBLIC_PROMO_DESCRIPTION?.split('|') || [];

    codes.forEach((code, index) => {
      const trimmedCode = code.trim().toUpperCase();
      const discount = parseInt(discounts[index]?.trim() || '0', 10);
      const description = descriptions[index]?.trim() || `${discount}% off on your order`;

      if (trimmedCode && discount > 0) {
        promoCodes[trimmedCode] = { discount, description };
      }
    });
  }

  // Load user addresses
  useEffect(() => {
    const loadAddresses = async () => {
      if (user?.email) {
        const userAddresses = await getUserAddresses(user.email);
        setAddresses(userAddresses);

        // Select default address
        const defaultAddr = userAddresses.find(addr => addr.isDefault);
        if (defaultAddr) {
          setSelectedAddress(defaultAddr);
        } else if (userAddresses.length > 0) {
          setSelectedAddress(userAddresses[0]);
        }
      }
    };
    loadAddresses();
  }, [user]);

  // Handle address added from form
  const handleAddressAdded = async (newAddress: Address) => {
    if (!user?.email) return;

    // Reload addresses to get updated list
    const updatedAddresses = await getUserAddresses(user.email);
    setAddresses(updatedAddresses);

    // Select the newly added address
    setSelectedAddress(newAddress);
    setShowAddressForm(false);
    alert('Address added successfully!');
  };

  // Handle promo code application
  const handleApplyPromo = () => {
    const upperPromo = promoCode.toUpperCase().trim();

    if (!upperPromo) {
      setPromoError('Please enter a promo code');
      return;
    }

    const promo = promoCodes[upperPromo];

    if (promo) {
      setPromoApplied(true);
      setPromoDiscount(promo.discount);
      setPromoError('');
      alert(`✅ Promo code applied! You get ${promo.discount}% off`);
    } else {
      setPromoError('Invalid promo code');
      setPromoApplied(false);
      setPromoDiscount(0);
    }
  };

  // Handle promo code removal
  const handleRemovePromo = () => {
    setPromoCode('');
    setPromoApplied(false);
    setPromoDiscount(0);
    setPromoError('');
  };

  // Calculate prices (all in USD)
  const subtotal = cart.reduce((sum, item) => {
    const itemPrice = getProductPrice(item.product, item.size, item.texture, item.baseSize);
    return sum + itemPrice * item.quantity;
  }, 0);
  const shippingCharges = subtotal > 58 ? 0 : 5; // Free shipping above $58 (₹5000)
  const tax = subtotal * 0.18; // 18% GST
  const promoDiscountAmount = promoApplied ? (subtotal * promoDiscount) / 100 : 0;
  const total = subtotal + shippingCharges + tax - promoDiscountAmount;

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      alert('Please select a delivery address');
      return;
    }

    if (!user) {
      alert('Please login to place order');
      return;
    }

    setIsProcessing(true);

    try {
      const orderData = {
        userId: user.id,
        userEmail: user.email,
        userName: user.name,
        userPhone: user.phone,
        items: cart,
        shippingAddress: selectedAddress,
        subtotal,
        shippingCharges,
        tax,
        promoCode: promoApplied ? promoCode.toUpperCase().trim() : undefined,
        promoDiscount: promoApplied ? promoDiscount : undefined,
        promoDiscountAmount: promoApplied ? promoDiscountAmount : undefined,
        total,
        paymentMethod,
        status: 'Pending' as const,
        paymentStatus: 'Pending' as const,
      };

      // For Razorpay, we'll implement later
      if (paymentMethod === 'Razorpay') {
        // TODO: Integrate Razorpay
        alert('Razorpay integration coming soon!');
        setIsProcessing(false);
        return;
      }

      // Create order in Firestore
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (result.success) {
        alert(`Order placed successfully! Order ID: ${result.orderId}`);
        onOrderSuccess();
      } else {
        alert('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Order placement error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button
          onClick={onBackToCart}
          className="flex items-center text-gray-600 hover:text-brand-500 transition"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Cart
        </button>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Forms */}
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Address */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-brand-500" />
                Delivery Address
              </h2>
              <button
                onClick={() => setShowAddressForm(!showAddressForm)}
                className="text-brand-500 hover:text-brand-700 flex items-center text-sm font-medium"
              >
                {showAddressForm ? (
                  <>
                    <span className="mr-1">✕</span>
                    Cancel
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-1" />
                    Add New
                  </>
                )}
              </button>
            </div>

            {/* Add Address Form */}
            {showAddressForm && user?.email && (
              <div className="mb-4">
                <AddressForm
                  userEmail={user.email}
                  onAddressAdded={handleAddressAdded}
                  onCancel={() => setShowAddressForm(false)}
                />
              </div>
            )}

            {addresses.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No saved addresses. Please add one to continue.</p>
                <button
                  onClick={() => setShowAddressForm(true)}
                  className="mt-4 bg-brand-500 text-white px-6 py-2 rounded-lg hover:bg-brand-700 transition"
                >
                  Add Address
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    onClick={() => setSelectedAddress(address)}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition ${
                      selectedAddress?.id === address.id
                        ? 'border-brand-500 bg-brand-100'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-gray-900">{address.name}</p>
                          {address.isDefault && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{address.phone}</p>
                        <p className="text-sm text-gray-600 mt-2">
                          {address.addressLine1}
                          {address.addressLine2 && `, ${address.addressLine2}`}
                        </p>
                        <p className="text-sm text-gray-600">
                          {address.city}, {address.state} - {address.pincode}
                        </p>
                      </div>
                      <input
                        type="radio"
                        checked={selectedAddress?.id === address.id}
                        onChange={() => setSelectedAddress(address)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center mb-4">
              <CreditCard className="w-5 h-5 mr-2 text-brand-500" />
              Payment Method
            </h2>

            <div className="space-y-3">
              <div
                onClick={() => setPaymentMethod('Razorpay')}
                className={`border-2 rounded-lg p-4 cursor-pointer transition ${
                  paymentMethod === 'Razorpay'
                    ? 'border-brand-500 bg-brand-100'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">Online Payment</p>
                    <p className="text-sm text-gray-600">UPI, Cards, Net Banking</p>
                  </div>
                  <input
                    type="radio"
                    checked={paymentMethod === 'Razorpay'}
                    onChange={() => setPaymentMethod('Razorpay')}
                  />
                </div>
              </div>

              <div
                onClick={() => setPaymentMethod('UPI')}
                className={`border-2 rounded-lg p-4 cursor-pointer transition ${
                  paymentMethod === 'UPI'
                    ? 'border-brand-500 bg-brand-100'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">UPI Payment</p>
                    <p className="text-sm text-gray-600">Google Pay, PhonePe, Paytm</p>
                  </div>
                  <input
                    type="radio"
                    checked={paymentMethod === 'UPI'}
                    onChange={() => setPaymentMethod('UPI')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Package className="w-5 h-5 mr-2 text-brand-500" />
              Order Summary
            </h2>

            {/* Cart Items */}
            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
              {cart.map((item, index) => {
                const itemPrice = getProductPrice(item.product, item.size, item.texture, item.baseSize);
                return (
                  <div key={index} className="flex items-start gap-3 pb-3 border-b border-gray-100">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-gray-600">
                        {item.color} {item.baseSize && `| ${item.baseSize}`} {item.texture && `| ${item.texture}`} | {item.size}
                      </p>
                      <p className="text-sm text-gray-900 mt-1">
                        {convertPrice(itemPrice)} × {item.quantity}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Promo Code Section */}
            <div className="py-4 border-t border-gray-200">
              {!promoApplied ? (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Have a promo code?</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      placeholder="Enter promo code"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                    <button
                      onClick={handleApplyPromo}
                      className="px-4 py-2 bg-brand-500 text-white text-sm font-medium rounded-lg hover:bg-brand-700 transition"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-xs text-red-500">{promoError}</p>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-700">{promoCode} Applied!</span>
                  </div>
                  <button
                    onClick={handleRemovePromo}
                    className="text-xs text-red-500 hover:text-red-500 font-medium"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-2 py-4 border-t border-gray-200">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">{convertPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-900">
                  {shippingCharges === 0 ? (
                    <span className="text-green-600 font-medium">FREE</span>
                  ) : (
                    convertPrice(shippingCharges)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax (GST 18%)</span>
                <span className="text-gray-900">{convertPrice(tax)}</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-sm">
                  <span className="text-green-600 font-medium">Promo Discount ({promoCode} - {promoDiscount}%)</span>
                  <span className="text-green-600 font-medium">-{convertPrice(promoDiscountAmount)}</span>
                </div>
              )}
              {subtotal < 58 && (
                <div className="flex items-center gap-1 text-xs text-gray-500 pt-2">
                  <Truck className="w-3 h-3" />
                  <span>Add {convertPrice(58 - subtotal)} more for FREE shipping</span>
                </div>
              )}
            </div>

            {/* Total */}
            <div className="flex justify-between items-center py-4 border-t-2 border-gray-200">
              <span className="text-lg font-semibold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-brand-500">{convertPrice(total)}</span>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing || !selectedAddress}
              className={`w-full py-3 rounded-lg font-semibold transition shadow-lg ${
                isProcessing || !selectedAddress
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-brand-500 text-white hover:bg-brand-700'
              }`}
            >
              {isProcessing ? 'Processing...' : 'Place Order'}
            </button>

            <p className="text-xs text-gray-500 text-center mt-3">
              By placing order, you agree to our Terms & Conditions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
