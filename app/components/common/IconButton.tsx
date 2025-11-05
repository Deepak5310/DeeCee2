"use client"

import React from "react";

export const IconButton = ({
  icon: Icon,
  onClick,
  badge,
  isScrolled = false,
  isDarkSlide = false
}: {
  icon: any;
  onClick?: () => void;
  badge?: number;
  isScrolled?: boolean;
  isDarkSlide?: boolean;
}) => (
  <button
    onClick={onClick}
    className={`p-2 transition-all duration-200 relative group rounded-lg active:scale-90 ${
      isScrolled
        ? 'text-gray-700 hover:text-rose-600 hover:bg-rose-50'
        : isDarkSlide
        ? 'text-gray-800 hover:text-gray-900 hover:bg-gray-100/20'
        : 'text-white hover:text-white/80 hover:bg-white/10'
    }`}
  >
    <Icon className="w-5 h-5 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-200" />
    {badge !== undefined && badge > 0 && (
      <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold shadow-lg transform group-hover:scale-110 transition-transform duration-200">
        {badge}
      </span>
    )}
  </button>
);
