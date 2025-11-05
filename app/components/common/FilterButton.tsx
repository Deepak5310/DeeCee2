"use client"

import React from "react";

export const FilterButton = ({ active, onClick, children }: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full border text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
      active
        ? "bg-gradient-to-r from-brand-500 to-brand-600 text-white border-brand-500 shadow-lg"
        : "border-gray-300 text-gray-700 hover:bg-brand-100 hover:border-brand-300"
    }`}
  >
    {children}
  </button>
);
