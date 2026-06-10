'use client';

import React, { useState, useEffect } from 'react';
import { calculateSip, SipOutput } from '../../lib/calculators';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import AdBanner from '../AdBanner';

export default function SipCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [expectedReturnAnnual, setExpectedReturnAnnual] = useState(12);
  const [tenureYears, setTenureYears] = useState(15);
  const [result, setResult] = useState<SipOutput | null>(null);

  useEffect(() => {
    const res = calculateSip({
      monthlyInvestment,
      expectedReturnAnnual,
      tenureYears,
    });
    setResult(res);
  }, [monthlyInvestment, expectedReturnAnnual, tenureYears]);

  if (!result) return null;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Format Recharts data
  const chartData = result.yearlyGrowth.map((item) => ({
    year: `Yr ${item.year}`,
    'Invested Amount': Math.round(item.totalInvestment),
    'Wealth Gained': Math.round(item.wealthGained),
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold font-display text-slate-800">
          SIP Investment Calculator
        </h2>
        <p className="text-sm text-slate-500">
          Project the future value of your monthly mutual fund or equity SIPs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Inputs */}
        <div className="lg:col-span-6 bg-white border border-slate-200 p-6 rounded-2xl space-y-6 shadow-sm">
          {/* Monthly Investment */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700">
                Monthly Investment
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-400 text-sm font-medium">
                  ₹
                </span>
                <input
                  type="number"
                  value={monthlyInvestment}
                  onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                  className="w-32 pl-6 pr-3 py-1 text-sm text-right focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
            <input
              type="range"
              min="500"
              max="500000"
              step="500"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>₹500</span>
              <span>₹5 Lakhs/mo</span>
            </div>
          </div>

          {/* Expected Return */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700">
                Expected Return (p.a.)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.5"
                  value={expectedReturnAnnual}
                  onChange={(e) => setExpectedReturnAnnual(Number(e.target.value))}
                  className="w-24 px-2.5 py-1 text-sm text-right focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <span className="absolute inset-y-0 right-2.5 flex items-center text-slate-400 text-xs font-semibold">
                  %
                </span>
              </div>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              step="0.5"
              value={expectedReturnAnnual}
              onChange={(e) => setExpectedReturnAnnual(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>5%</span>
              <span>30%</span>
            </div>
          </div>

          {/* Time Period */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700">
                Investment Period
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-24 px-2.5 py-1 text-sm text-right focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <span className="absolute inset-y-0 right-2.5 flex items-center text-slate-400 text-xs font-semibold">
                  Yrs
                </span>
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="40"
              step="1"
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>1 Year</span>
              <span>40 Years</span>
            </div>
          </div>
        </div>

        {/* Right Side: Projections & Summary */}
        <div className="lg:col-span-6 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex flex-col justify-between space-y-6">
          {/* Numbers */}
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">
                Invested Amount
              </span>
              <span className="text-sm font-bold block mt-1 text-slate-800">
                {formatCurrency(result.totalInvestment)}
              </span>
            </div>

            <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100">
              <span className="text-[10px] uppercase font-bold text-emerald-600 block tracking-wider">
                Wealth Gained
              </span>
              <span className="text-sm font-bold block mt-1 text-emerald-600">
                {formatCurrency(result.wealthGained)}
              </span>
            </div>

            <div className="bg-indigo-50 p-3 rounded-xl border border-indigo-100">
              <span className="text-[10px] uppercase font-bold text-indigo-600 block tracking-wider">
                Expected Future Value
              </span>
              <span className="text-sm font-bold block mt-1 text-indigo-600">
                {formatCurrency(result.futureValue)}
              </span>
            </div>
          </div>

          {/* Area Chart Growth */}
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#94a3b8" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorWealth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#33415510" />
                <XAxis dataKey="year" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={10}
                  tickLine={false}
                  tickFormatter={(val) => `₹${(val / 100000).toFixed(0)}L`}
                />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                <Area
                  type="monotone"
                  dataKey="Invested Amount"
                  stackId="1"
                  stroke="#94a3b8"
                  fillOpacity={1}
                  fill="url(#colorInvested)"
                />
                <Area
                  type="monotone"
                  dataKey="Wealth Gained"
                  stackId="2"
                  stroke="#4f46e5"
                  fillOpacity={1}
                  fill="url(#colorWealth)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <AdBanner placement="insights_sponsored" targetCalculator="sip" />
    </div>
  );
}
