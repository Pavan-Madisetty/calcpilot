'use client';

import React from 'react';
import {
  TrendingUp,
  Percent,
  Search,
  BookOpen,
  History,
  ShieldCheck,
  Compass,
  ArrowRight,
  Flame,
  Construction,
  CreditCard,
  Grid
} from 'lucide-react';
import AdBanner from './AdBanner';
import { getSavedCalculations } from '../lib/store';

interface DashboardProps {
  onSelectCalculator: (id: string) => void;
  searchQuery: string;
}

export default function Dashboard({ onSelectCalculator, searchQuery }: DashboardProps) {
  const savedList = getSavedCalculations().slice(0, 3);

  const calculators = [
    {
      id: 'emi',
      title: 'EMI Loan Calculator',
      description: 'Calculate monthly loan installments & amortization schedules.',
      icon: Percent,
      gradient: 'from-sky-500 to-indigo-500',
      category: 'Finance'
    },
    {
      id: 'sip',
      title: 'SIP Calculator',
      description: 'Project future returns on mutual fund investments.',
      icon: TrendingUp,
      gradient: 'from-emerald-500 to-teal-500',
      category: 'Finance'
    },
    {
      id: 'loan_eligibility',
      title: 'Loan Eligibility',
      description: 'Check how much loan bank might sanction you.',
      icon: Compass,
      gradient: 'from-violet-500 to-fuchsia-500',
      category: 'Finance'
    },
    {
      id: 'tax',
      title: 'Salary Tax Calculator',
      description: 'Compare New vs Old Tax Regimes side-by-side.',
      icon: BookOpen,
      gradient: 'from-amber-500 to-orange-500',
      category: 'Finance'
    },
    {
      id: 'cc_rewards',
      title: 'Credit Card Rewards',
      description: 'Compute loyalty points & miles across Indian cards.',
      icon: CreditCard,
      gradient: 'from-pink-500 to-rose-500',
      category: 'Finance'
    },
    {
      id: 'construction',
      title: 'Construction Cost',
      description: 'Estimate home construction costs & material breakdowns.',
      icon: Construction,
      gradient: 'from-cyan-500 to-blue-500',
      category: 'Construction'
    },
    {
      id: 'tiles',
      title: 'Tiles Calculator',
      description: 'Find required tile box counts and wastage buffers.',
      icon: Grid,
      gradient: 'from-slate-500 to-slate-700',
      category: 'Construction'
    }
  ];

  const financialTips = [
    {
      title: 'The 50/30/20 Allocation',
      text: 'Budget 50% for Needs, 30% for Wants, and direct 20% to savings/equity investments.',
      tag: 'Budgeting'
    },
    {
      title: 'Compounding Mastery',
      text: 'Starting your SIP early pays off. Investing ₹5k at age 25 vs 30 can double your retirement capital.',
      tag: 'Wealth'
    },
    {
      title: 'Regime Switch Rule',
      text: 'If your total itemized deductions are below ₹3,75,000, the New Tax Regime is usually cheaper.',
      tag: 'Taxation'
    }
  ];

  const filteredCalcs = calculators.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Dynamic Header Promo Banner */}
      <AdBanner placement="home_top" />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Calculators List */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center gap-2">
            <Flame className="text-amber-500 fill-amber-500" size={18} />
            <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">
              {searchQuery ? 'Search Results' : 'Featured Utilities'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCalcs.map((calc) => {
              const Icon = calc.icon;
              return (
                <button
                  key={calc.id}
                  onClick={() => onSelectCalculator(calc.id)}
                  className="group flex flex-col justify-between text-left p-5 rounded-2xl bg-card border border-border hover:border-primary/40 shadow-sm transition-all duration-300 hover:shadow-md transform hover:scale-[1.01] cursor-pointer"
                >
                  <div className="space-y-3">
                    <div className={`h-10 w-10 bg-gradient-to-tr ${calc.gradient} text-white rounded-xl flex items-center justify-center shadow-md`}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                        {calc.category}
                      </span>
                      <h4 className="font-bold text-slate-800 dark:text-slate-100 text-base mt-0.5 group-hover:text-primary transition duration-200">
                        {calc.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {calc.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-primary font-bold mt-4 opacity-0 group-hover:opacity-100 transition duration-300">
                    Get Started <ArrowRight size={12} />
                  </div>
                </button>
              );
            })}
            {filteredCalcs.length === 0 && (
              <div className="col-span-2 text-center py-12 text-muted-foreground text-sm border border-dashed border-border rounded-2xl">
                No calculators match your search query. Try typing &quot;EMI&quot; or &quot;Tax&quot;.
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Saved History & Quick Tips */}
        <div className="lg:col-span-4 space-y-6">
          {/* Recent Calculations */}
          <div className="bg-card border border-border p-5 rounded-2xl shadow-sm space-y-4">
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <History size={16} className="text-primary" /> Recently Calculated
            </h4>
            <div className="space-y-3">
              {savedList.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSelectCalculator(item.type)}
                  className="w-full text-left p-3 hover:bg-muted border border-border rounded-xl transition flex justify-between items-center group cursor-pointer"
                >
                  <div>
                    <span className="font-semibold text-xs text-slate-800 dark:text-slate-200 block truncate max-w-[180px]">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground capitalize">
                      {item.type.replace('_', ' ')}
                    </span>
                  </div>
                  <ArrowRight size={12} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition" />
                </button>
              ))}
              {savedList.length === 0 && (
                <div className="text-center py-6 text-xs text-muted-foreground">
                  Your calculations will appear here after you save them.
                </div>
              )}
            </div>
          </div>

          {/* Financial Wisdom Tips */}
          <div className="bg-card border border-border p-5 rounded-2xl shadow-sm space-y-4">
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <BookOpen size={16} className="text-sky-500" /> Financial Literacy Tips
            </h4>
            <div className="space-y-4">
              {financialTips.map((tip, index) => (
                <div key={index} className="space-y-1">
                  <span className="text-[9px] uppercase font-bold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/40 px-1.5 py-0.5 rounded">
                    {tip.tag}
                  </span>
                  <h5 className="font-bold text-xs text-slate-800 dark:text-slate-200">{tip.title}</h5>
                  <p className="text-[11px] text-muted-foreground">{tip.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
