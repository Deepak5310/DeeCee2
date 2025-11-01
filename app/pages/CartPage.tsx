"use client"

import React from "react";
import { CartItem } from "@/app/types";
import { getProductPrice } from "@/app/constants/products";

type CartPageProps = {
  cart: CartItem[];
  onUpdateQuantity: (index: number, delta: number) => void;
  onRemoveFromCart: (index: number) => void;
  onContinueShopping: () => void;
  onProceedToCheckout: () => void;
  convertPrice: (price: number) => string;
};

export default function CartPage({ cart, onUpdateQuantity, onRemoveFromCart, onContinueShopping, onProceedToCheckout, convertPrice }: CartPageProps): React.ReactElement {
  const getTotalPrice = () => cart.reduce((sum, item) => {
    const itemPrice = getProductPrice(item.product, item.size, item.texture);
    return sum + itemPrice * item.quantity;
  }, 0);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Your Cart</h2>
      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-700 mb-6">Your cart is empty.</p>
          <button onClick={onContinueShopping} className="bg-rose-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-rose-700 transition shadow-lg">
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-6 sm:space-y-8">
          {cart.map((item, index) => {
            const itemPrice = getProductPrice(item.product, item.size, item.texture);
            return (
              <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center border border-gray-200 rounded-2xl p-6 shadow-sm">
                <img src={item.product.image} alt={item.product.name} className="w-full sm:w-28 h-36 sm:h-28 object-cover rounded-xl mb-4 sm:mb-0 sm:mr-6 shadow-md" />
                <div className="flex-1 w-full">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">{item.product.name}</h3>
                  <p className="text-gray-700 text-sm">Color: {item.color}</p>
                  <p className="text-gray-700 text-sm">Size: {item.size}</p>
                  {item.texture && <p className="text-gray-700 text-sm">Texture: {item.texture}</p>}
                  <p className="text-rose-600 font-semibold text-lg">{convertPrice(itemPrice)}</p>
                </div>
                <div className="flex items-center justify-between w-full sm:w-auto mt-6 sm:mt-0">
                  <div className="flex items-center space-x-3">
                    <button onClick={() => onUpdateQuantity(index, -1)} className="px-3 py-1 border border-gray-300 rounded-xl hover:bg-gray-100 transition">
                      -
                    </button>
                    <span className="px-4 font-semibold">{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(index, 1)} className="px-3 py-1 border border-gray-300 rounded-xl hover:bg-gray-100 transition">
                      +
                    </button>
                  </div>
                  <button onClick={() => onRemoveFromCart(index)} className="ml-6 text-red-600 hover:underline text-sm font-semibold">
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
          <div className="text-right text-xl font-semibold text-gray-900">Total: {convertPrice(getTotalPrice())}</div>
          <button onClick={onProceedToCheckout} className="w-full sm:w-auto bg-rose-600 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-rose-700 transition shadow-lg">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}
