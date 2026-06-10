'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Percent,
  TrendingUp,
  Compass,
  BookOpen,
  CreditCard,
  Construction,
  Grid
} from 'lucide-react';

interface CalculatorsLayoutProps {
  children: React.ReactNode;
}

export default function CalculatorsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const calculatorsList = [
    { id: 'emi', title: 'EMI Calculator', icon: Percent, href: '/calculators/emi' },
    { id: 'sip', title: 'SIP Calculator', icon: TrendingUp, href: '/calculators/sip' },
    { id: 'loan-eligibility', title: 'Loan Eligibility', icon: Compass, href: '/calculators/loan-eligibility' },
    { id: 'tax', title: 'Salary Tax Calculator', icon: BookOpen, href: '/calculators/tax' },
    { id: 'cc-rewards', title: 'Credit Card Rewards', icon: CreditCard, href: '/calculators/cc-rewards' },
    { id: 'construction', title: 'Construction Cost', icon: Construction, href: '/calculators/construction' },
    { id: 'tiles', title: 'Tile Calculator', icon: Grid, href: '/calculators/tiles' }
  ];

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Sidebar list of calculators on desktop */}
      <div className="lg:col-span-3 bg-white border border-slate-200 p-4 rounded-2xl shadow-sm space-y-1">
        <span className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider px-3 mb-2 block">
          Calculator Menu
        </span>
        {calculatorsList.map((c) => {
          const Icon = c.icon;
          const active = isActive(c.href);
          return (
            <Link
              key={c.id}
              href={c.href}
              className={`flex items-center w-full px-3 py-2.5 rounded-xl text-left text-xs font-semibold transition cursor-pointer ${
                active
                  ? 'bg-indigo-50 text-indigo-600 font-bold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Icon size={14} className="mr-2.5 shrink-0" />
              <span className="truncate">{c.title}</span>
            </Link>
          );
        })}
      </div>

      {/* Active Calculator Container */}
      <div className="lg:col-span-9">
        {children}
      </div>
    </div>
  );
}
