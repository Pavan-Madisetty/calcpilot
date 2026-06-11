'use client';

import React from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  Percent,
  Compass,
  ArrowRight,
  Construction,
  CreditCard,
  Grid,
  Calculator,
  Coins,
  Scale,
  FileText
} from 'lucide-react';
import AdBanner from './AdBanner';

interface DashboardProps {
  onSelectCalculator: (id: string) => void;
  searchQuery: string;
}

export default function Dashboard({ onSelectCalculator, searchQuery }: DashboardProps) {

  const calculators = [
    {
      id: 'emi',
      title: 'EMI Loan Calculator',
      description: 'Compute monthly loan EMIs, interest details, and view full amortization logs.',
      icon: Percent,
      gradient: 'from-indigo-500 to-indigo-600',
      category: 'Finance & Loans'
    },
    {
      id: 'loan-eligibility',
      title: 'Loan Eligibility',
      description: 'Assess maximum bank sanction capacity and debt-to-income (DTI) ratings.',
      icon: Compass,
      gradient: 'from-violet-500 to-violet-600',
      category: 'Finance & Loans'
    },
    {
      id: 'no-cost-emi',
      title: 'No Cost EMI Decoder',
      description: 'Reveal hidden charges, processing fees, GST, and true interest rates.',
      icon: Calculator,
      gradient: 'from-blue-500 to-blue-600',
      category: 'Finance & Loans'
    },
    {
      id: 'cc-rewards',
      title: 'Credit Card Rewards',
      description: 'Evaluate points, airline miles, and yields across premium Indian credit cards.',
      icon: CreditCard,
      gradient: 'from-rose-500 to-rose-600',
      category: 'Finance & Loans'
    },
    {
      id: 'sip',
      title: 'SIP Calculator',
      description: 'Project future compound growth wealth gained from monthly mutual fund SIPs.',
      icon: TrendingUp,
      gradient: 'from-emerald-500 to-emerald-600',
      category: 'Wealth & Tax'
    },
    {
      id: 'tax',
      title: 'Salary Tax Calculator',
      description: 'Compare Old vs New Indian Income Tax regimes with dynamic deductions assessment.',
      icon: Scale,
      gradient: 'from-amber-500 to-amber-600',
      category: 'Wealth & Tax'
    },
    {
      id: 'in-hand-salary',
      title: 'In-Hand Salary Calculator',
      description: 'Calculate monthly take-home salary after taxes, EPF, and other deductions.',
      icon: Coins,
      gradient: 'from-orange-500 to-orange-600',
      category: 'Wealth & Tax'
    },
    {
      id: 'hra',
      title: 'HRA Exemption Calculator',
      description: 'Compute tax-exempt and taxable house rent allowance (Section 10(13A)).',
      icon: FileText,
      gradient: 'from-teal-500 to-teal-600',
      category: 'Wealth & Tax'
    },
    {
      id: 'construction',
      title: 'Construction Cost',
      description: 'Estimate home construction costs, material components, and labor charges.',
      icon: Construction,
      gradient: 'from-cyan-500 to-cyan-600',
      category: 'Construction Tools'
    },
    {
      id: 'tiles',
      title: 'Tiles Calculator',
      description: 'Estimate required flooring or wall tile boxes including breakage buffers.',
      icon: Grid,
      gradient: 'from-slate-500 to-slate-600',
      category: 'Construction Tools'
    }
  ];

  const filteredCalcs = calculators.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = ['Finance & Loans', 'Wealth & Tax', 'Construction Tools'];

  return (
    <div className="space-y-8">
      {/* Top Banner Advertisement Slot */}
      <AdBanner placement="home_top" />

      {searchQuery ? (
        // Search Outcomes View
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-extrabold text-slate-800 uppercase tracking-wider">
              Search Outcomes
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Showing matching calculators for &quot;{searchQuery}&quot;.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCalcs.map((calc) => {
              const Icon = calc.icon;
              return (
                <Link
                  key={calc.id}
                  href={`/calculators/${calc.id}`}
                  className="group flex flex-col justify-between text-left p-6 rounded-2xl bg-white border border-slate-200 hover:border-indigo-400 shadow-sm transition-all duration-300 hover:shadow-md transform hover:scale-[1.01] cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className={`h-10 w-10 bg-gradient-to-tr ${calc.gradient} text-white rounded-xl flex items-center justify-center shadow-sm`}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                        {calc.category}
                      </span>
                      <h4 className="font-bold text-slate-800 text-base mt-0.5 group-hover:text-indigo-600 transition duration-200">
                        {calc.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                        {calc.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-indigo-600 font-bold mt-5 opacity-0 group-hover:opacity-100 transition duration-300">
                    Calculate Now <ArrowRight size={12} />
                  </div>
                </Link>
              );
            })}
            {filteredCalcs.length === 0 && (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12 text-slate-500 text-sm border border-dashed border-slate-200 rounded-2xl">
                No calculators match your search query. Try typing &quot;EMI&quot; or &quot;Tax&quot;.
              </div>
            )}
          </div>
        </div>
      ) : (
        // Categorized Segregation View
        <div className="space-y-8">
          {categories.map((category) => {
            const categoryCalcs = calculators.filter((c) => c.category === category);
            if (categoryCalcs.length === 0) return null;

            return (
              <div key={category} className="space-y-4">
                <div className="border-b border-slate-100 pb-2">
                  <h3 className="text-base font-extrabold text-slate-800 uppercase tracking-wider">
                    {category}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Select a tool to compute your {category.toLowerCase()} figures.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryCalcs.map((calc) => {
                    const Icon = calc.icon;
                    return (
                      <Link
                        key={calc.id}
                        href={`/calculators/${calc.id}`}
                        className="group flex flex-col justify-between text-left p-6 rounded-2xl bg-white border border-slate-200 hover:border-indigo-400 shadow-sm transition-all duration-300 hover:shadow-md transform hover:scale-[1.01] cursor-pointer"
                      >
                        <div className="space-y-4">
                          <div className={`h-10 w-10 bg-gradient-to-tr ${calc.gradient} text-white rounded-xl flex items-center justify-center shadow-sm`}>
                            <Icon size={18} />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                              {calc.category}
                            </span>
                            <h4 className="font-bold text-slate-800 text-base mt-0.5 group-hover:text-indigo-600 transition duration-200">
                              {calc.title}
                            </h4>
                            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                              {calc.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-indigo-600 font-bold mt-5 opacity-0 group-hover:opacity-100 transition duration-300">
                          Calculate Now <ArrowRight size={12} />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom Ad Banner Slot */}
      <AdBanner placement="saved_bottom" />
    </div>
  );
}
