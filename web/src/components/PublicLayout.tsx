'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

interface PublicLayoutProps {
  children: React.ReactNode;
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
}

export default function PublicLayout({ 
  children, 
  searchQuery = '', 
  onSearchChange 
}: PublicLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchChange) {
      onSearchChange(localSearch);
    } else {
      // If we are on a calculator page and search, redirect to home page with query
      router.push(`/?search=${encodeURIComponent(localSearch)}`);
    }
  };

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Calculators', href: '/calculators/emi' }
  ];

  const isTabActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith('/calculators');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      {/* 1. PREMIUM TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm h-16 shrink-0">
        <div className="max-w-5xl mx-auto px-4 md:px-6 h-full flex items-center justify-between gap-4">
          
          {/* Logo Brand without icon */}
          <Link href="/" className="flex items-center cursor-pointer">
            <span className="font-extrabold text-xl font-display text-indigo-600 tracking-tight">
              ZeroEMI
            </span>
          </Link>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const active = isTabActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    active
                      ? 'bg-indigo-50 text-indigo-600 font-extrabold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            {/* Search Bar Input */}
            <form onSubmit={handleSearchSubmit} className="relative w-40 lg:w-48">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none text-xs">
                🔍
              </span>
              <input
                type="text"
                placeholder="Search calculator..."
                value={localSearch}
                onChange={(e) => {
                  setLocalSearch(e.target.value);
                  if (onSearchChange) onSearchChange(e.target.value);
                }}
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all"
              />
            </form>
          </div>
        </div>
      </header>

      {/* Main content body */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-6 pb-20">
        {children}
      </main>

      {/* 2. MOBILE BOTTOM NAVIGATION */}
      <nav className="flex md:hidden fixed bottom-0 left-0 right-0 items-center justify-around border-t border-slate-200 bg-white h-16 z-30 shadow-inner pb-safe">
        {navItems.map((item) => {
          const active = isTabActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition cursor-pointer ${
                active ? 'text-indigo-600 font-bold' : 'text-slate-500'
              }`}
            >
              <span className="text-sm font-semibold">
                {item.label === 'Home' && '🏠'}
                {item.label === 'Calculators' && '🧮'}
              </span>
              <span className="text-[9px] font-semibold mt-0.5">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
