// src/components/Header.jsx
import React from 'react';
import { IconSearch, IconBell, IconArrowDown } from './Icons';

const PlaceholderAvatar = () => (
  <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-slate-200 text-xl font-black text-slate-700 shadow-sm">
    JD
  </div>
);

const Header = () => {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-8 border-b border-slate-200 bg-white/95 px-8 py-6 backdrop-blur xl:px-10 2xl:px-12">
      <div className="flex min-w-0 flex-1 items-center gap-10">
        <h1 className="shrink-0 text-5xl font-black tracking-tight text-slate-950">Dashboard</h1>

        <div className="relative w-full max-w-[48rem]">
          <input
            type="text"
            placeholder="Search..."
            className="h-16 w-full rounded-2xl border border-slate-300 bg-white pl-16 pr-5 text-2xl font-bold text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
          <div className="absolute left-5 top-1/2 -translate-y-1/2">
            <IconSearch />
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-5">
        <button type="button" className="relative rounded-full p-3 transition hover:bg-slate-100" aria-label="Notifications">
          <IconBell />
          <span className="absolute right-1 top-1 flex h-6 min-w-6 items-center justify-center rounded-full bg-blue-600 px-1 text-sm font-black text-white ring-2 ring-white">
            1
          </span>
        </button>

        <button type="button" className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xl font-black shadow-sm transition hover:bg-slate-50">
          <PlaceholderAvatar />
          <span className="font-black text-slate-800">Admin</span>
          <IconArrowDown />
        </button>

        <button className="flex h-16 items-center gap-2 rounded-2xl bg-emerald-500 px-8 text-2xl font-black text-white shadow-sm transition hover:bg-emerald-600">
          Quick Action
          <IconArrowDown />
        </button>
      </div>
    </header>
  );
};

export default Header;