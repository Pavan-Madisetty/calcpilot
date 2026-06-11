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
    return pathname === href || (pathname === '/' && href === '/calculators/emi');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Sidebar list of calculators on desktop */}
      <div className="lg:col-span-3 lg:sticky lg:top-20 glass-card p-5 shadow-sm space-y-5 lg:order-first order-last">
        {categories.map((cat) => (
          <div key={cat.name} className="space-y-1.5">
            <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider px-3 mb-2 block">
              {cat.name}
            </span>
            {cat.items.map((c) => {
              const Icon = c.icon;
              const active = isActive(c.href);
              return (
                <Link
                  key={c.id}
                  href={c.href}
                  className={`flex items-center w-full px-3 py-2.5 rounded-xl text-left text-xs font-bold transition-all duration-200 cursor-pointer ${
                    active
                      ? 'bg-indigo-50/70 border-l-2 border-indigo-600 pl-3.5 text-indigo-600 shadow-[inset_0_1px_1px_rgba(79,70,229,0.02)]'
                      : 'text-slate-600 hover:bg-slate-100/60 hover:text-indigo-600 hover:pl-3.5'
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
      <div className="lg:col-span-9 lg:order-last order-first">
        {children}
      </div>
    </div>
  );
}
