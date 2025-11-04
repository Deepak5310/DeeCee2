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
        ? "bg-gradient-to-r from-[#A88B6A] to-[#8B7355] text-white border-[#A88B6A] shadow-lg"
        : "border-gray-300 text-gray-700 hover:bg-[#F3E4CF] hover:border-[#D4B59E]"
    }`}
  >
    {children}
  </button>
);
