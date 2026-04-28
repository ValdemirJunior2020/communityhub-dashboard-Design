import React from 'react';
import { IconSearch, IconBell, IconArrowDown } from './Icons';

// Simple placeholder for avatar
const PlaceholderAvatar = () => (
  <div className="w-10 h-10 rounded-full bg-neutral-300 flex items-center justify-center text-neutral-600 font-bold border-2 border-white shadow-sm">
    JD
  </div>
);

const Header = () => {
  return (
    <header className="bg-white border-b border-neutral-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center flex-1">
        <h1 className="text-3xl font-bold text-neutral-900 mr-12">Dashboard</h1>
        
        {/* Search Bar */}
        <div className="relative w-full max-w-lg">
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full pl-12 pr-4 py-3 rounded-full bg-neutral-100 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent text-neutral-800"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <IconSearch />
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        {/* Notifications */}
        <div className="relative cursor-pointer p-2 rounded-full hover:bg-neutral-100">
          <IconBell />
          <span className="absolute top-1 right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-error opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-error border border-white text-[9px] text-white font-bold items-center justify-center">1</span>
          </span>
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-3 cursor-pointer">
          <PlaceholderAvatar />
          <div className="flex items-center text-neutral-800 hover:text-neutral-900">
            <span className="font-medium">Admin</span>
            <IconArrowDown />
          </div>
        </div>

        {/* Quick Action Button */}
        <button className="flex items-center px-6 py-3 bg-brand-success text-white rounded-full font-semibold hover:bg-emerald-600 transition duration-150">
          Quick Action
          <IconArrowDown />
        </button>
      </div>
    </header>
  );
};

export default Header;