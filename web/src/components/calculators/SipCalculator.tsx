'use client';

import React, { useState, useEffect } from 'react';
import { calculateSip, SipOutput } from '../../lib/calculators';
import { saveCalculation } from '../../lib/store';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { HelpCircle, Save, CheckCircle2, TrendingUp, Landmark, ShieldCheck } from 'lucide-react';
import AdBanner from '../AdBanner';

export default function SipCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [expectedReturnAnnual, setExpectedReturnAnnual] = useState(12);
  const [tenureYears, setTenureYears] = useState(15);
  const [result, setResult] = useState<SipOutput | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const res = calculateSip({
      monthlyInvestment,
      expectedReturnAnnual,
      tenureYears,
    });
    setResult(res);
  }, [monthlyInvestment, expectedReturnAnnual, tenureYears]);

  if (!result) return null;

  const handleSave = () => {
    saveCalculation({
      name: `SIP - ₹${monthlyInvestment}/mo @ ${expectedReturnAnnual}%`,
      type: 'sip',
      inputs: { monthlyInvestment, expectedReturnAnnual, tenureYears },
      outputs: {
        totalInvestment: result.totalInvestment,
        wealthGained: result.wealthGained,
        futureValue: result.futureValue,
      },
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
            SIP Investment Calculator
          </h2>
          <p className="text-sm text-muted-foreground">
            Project the future value of your monthly mutual fund or equity SIPs.
          </p>
        </div>
        <div>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-sky-600 hover:bg-sky-500 text-white dark:bg-sky-500 dark:hover:bg-sky-400 dark:text-slate-950 font-semibold rounded-xl shadow-md transition-all cursor-pointer"
          >
            {savedSuccess ? (
              <>
                <CheckCircle2 size={16} /> Saved!
              </>
            ) : (
              <>
                <Save size={16} /> Save Calculation
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Inputs */}
        <div className="lg:col-span-6 bg-card border border-border p-6 rounded-2xl space-y-6 shadow-sm">
          {/* Monthly Investment */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Monthly Investment
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-muted-foreground text-sm font-medium">
                  ₹
                </span>
                <input
                  type="number"
                  value={monthlyInvestment}
                  onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                  className="w-32 pl-6 pr-3 py-1 text-sm bg-input border border-border rounded-lg text-right focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>
            </div>
            <input
              type="range"
              min="500"
              max="1000000"
              step="500"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-[11px] text-muted-foreground">
              <span>₹500</span>
              <span>₹10 Lakhs/mo</span>
            </div>
          </div>

          {/* Expected Return */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Expected Return (p.a.)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.5"
                  value={expectedReturnAnnual}
                  onChange={(e) => setExpectedReturnAnnual(Number(e.target.value))}
                  className="w-24 px-2.5 py-1 text-sm bg-input border border-border rounded-lg text-right focus:outline-none focus:ring-1 focus:ring-ring"
                />
                <span className="absolute inset-y-0 right-2.5 flex items-center text-muted-foreground text-xs font-semibold">
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
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-[11px] text-muted-foreground">
              <span>5%</span>
              <span>30%</span>
            </div>
          </div>

          {/* Time Period */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Investment Period
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-24 px-2.5 py-1 text-sm bg-input border border-border rounded-lg text-right focus:outline-none focus:ring-1 focus:ring-ring"
                />
                <span className="absolute inset-y-0 right-2.5 flex items-center text-muted-foreground text-xs font-semibold">
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
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-[11px] text-muted-foreground">
              <span>1 Year</span>
              <span>40 Years</span>
            </div>
          </div>
        </div>

        {/* Right Side: Projections & Summary */}
        <div className="lg:col-span-6 bg-card border border-border p-6 rounded-2xl shadow-sm flex flex-col justify-between space-y-6">
          {/* Numbers */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-slate-100 dark:bg-slate-900 p-3 rounded-xl border border-border">
              <span className="text-[10px] uppercase font-bold text-muted-foreground block tracking-wider">
                Invested
              </span>
              <span className="text-xs md:text-sm font-bold block mt-1 text-slate-800 dark:text-slate-200">
                {formatCurrency(result.totalInvestment)}
              </span>
            </div>

            <div className="bg-sky-500/5 dark:bg-sky-500/10 p-3 rounded-xl border border-sky-500/10">
              <span className="text-[10px] uppercase font-bold text-sky-600 dark:text-sky-400 block tracking-wider">
                Est. Returns
              </span>
              <span className="text-xs md:text-sm font-bold block mt-1 text-sky-600 dark:text-sky-400">
                {formatCurrency(result.wealthGained)}
              </span>
            </div>

            <div className="bg-emerald-500/5 dark:bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/10">
              <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 block tracking-wider">
                Future Value
              </span>
              <span className="text-xs md:text-sm font-bold block mt-1 text-emerald-600 dark:text-emerald-400">
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
                    <stop offset="5%" stopColor="#64748b" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#64748b" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorWealth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#33415515" />
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
                  stroke="#64748b"
                  fillOpacity={1}
                  fill="url(#colorInvested)"
                />
                <Area
                  type="monotone"
                  dataKey="Wealth Gained"
                  stackId="2"
                  stroke="#0ea5e9"
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
