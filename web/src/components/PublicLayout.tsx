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
    const query = localSearch.trim().toLowerCase();
    if (!query) return;

    const calculators = [
      { id: 'emi', keywords: ['emi', 'loan', 'payment', 'mortgage', 'monthly', 'interest'] },
      { id: 'loan-eligibility', keywords: ['eligibility', 'eligible', 'limit', 'sanction', 'capacity', 'debt', 'bank'] },
      { id: 'no-cost-emi', keywords: ['no cost', 'zero emi', 'decoder', 'gst', 'processing fee', 'apr', 'hidden'] },
      { id: 'cc-rewards', keywords: ['credit card', 'reward', 'points', 'miles', 'cashback', 'card'] },
      { id: 'sip', keywords: ['sip', 'mutual fund', 'investment', 'compound', 'wealth', 'future value'] },
      { id: 'tax', keywords: ['tax', 'income tax', 'slabs', 'regime', 'new regime', 'old regime'] },
      { id: 'in-hand-salary', keywords: ['in hand', 'salary', 'take home', 'ctc', 'take-home', 'takehome'] },
      { id: 'hra', keywords: ['hra', 'rent', 'house rent', 'allowance', 'exemption'] },
      { id: 'construction', keywords: ['construction', 'cost', 'material', 'labor', 'brick', 'cement', 'civil'] },
      { id: 'tiles', keywords: ['tiles', 'flooring', 'wall', 'box', 'area', 'tile'] }
    ];

    const matched = calculators.find(calc => 
      calc.id.includes(query) || 
      calc.keywords.some(kw => kw.includes(query) || query.includes(kw))
    );

    if (matched) {
      router.push(`/calculators/${matched.id}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      {/* 1. PREMIUM TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-slate-200/60 shadow-sm h-16 shrink-0">
        <div className="max-w-5xl mx-auto px-4 md:px-6 h-full flex items-center justify-between gap-4">
          
          {/* Logo Brand with icon */}
          <Link href="/" className="flex items-center gap-2.5 cursor-pointer group">
            <img src="/logo.png" alt="ZeroEMI Logo" className="h-8 w-8 rounded-xl object-contain shadow-sm border border-slate-100/80 transition-transform duration-300 group-hover:scale-105" />
            <span className="font-black text-xl font-display bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent tracking-tight">
              ZeroEMI
            </span>
          </Link>

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
    </div>
  );
}
