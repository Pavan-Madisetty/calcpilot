'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Percent,
  TrendingUp,
  Compass,
  CreditCard,
  Construction,
  Grid,
  Calculator,
  Coins,
  Scale,
  FileText
} from 'lucide-react';

interface CalculatorsLayoutProps {
  children: React.ReactNode;
}

export default function CalculatorsLayout({ children }: CalculatorsLayoutProps) {
  const pathname = usePathname();

  const categories = [
    {
      name: 'Finance & Loans',
      items: [
        { id: 'emi', title: 'EMI Calculator', icon: Percent, href: '/calculators/emi' },
        { id: 'loan-eligibility', title: 'Loan Eligibility', icon: Compass, href: '/calculators/loan-eligibility' },
        { id: 'no-cost-emi', title: 'No Cost EMI Decoder', icon: Calculator, href: '/calculators/no-cost-emi' },
        { id: 'cc-rewards', title: 'Credit Card Rewards', icon: CreditCard, href: '/calculators/cc-rewards' }
      ]
    },
    {
      name: 'Wealth & Tax',
      items: [
        { id: 'sip', title: 'SIP Calculator', icon: TrendingUp, href: '/calculators/sip' },
        { id: 'tax', title: 'Salary Tax Calculator', icon: Scale, href: '/calculators/tax' },
        { id: 'in-hand-salary', title: 'In-Hand Salary', icon: Coins, href: '/calculators/in-hand-salary' },
        { id: 'hra', title: 'HRA Exemption', icon: FileText, href: '/calculators/hra' }
      ]
    },
    {
      name: 'Construction Tools',
      items: [
        { id: 'construction', title: 'Construction Cost', icon: Construction, href: '/calculators/construction' },
        { id: 'tiles', title: 'Tile Calculator', icon: Grid, href: '/calculators/tiles' }
      ]
    }
  ];

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Sidebar list of calculators on desktop */}
      <div className="lg:col-span-3 bg-white border border-slate-200 p-4 rounded-2xl shadow-sm space-y-4">
        {categories.map((cat) => (
          <div key={cat.name} className="space-y-1">
            <span className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider px-3 mb-1.5 block">
              {cat.name}
            </span>
            {cat.items.map((c) => {
              const Icon = c.icon;
              const active = isActive(c.href);
              return (
                <Link
                  key={c.id}
                  href={c.href}
                  className={`flex items-center w-full px-3 py-2 rounded-xl text-left text-xs font-semibold transition cursor-pointer ${
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
        ))}
      </div>

      {/* Active Calculator Container */}
      <div className="lg:col-span-9">
        {children}
      </div>
    </div>
  );
}
