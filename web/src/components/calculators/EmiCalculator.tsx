'use client';

import React, { useState, useEffect } from 'react';
import { calculateEmi, EmiOutput } from '../../lib/calculators';
import { saveCalculation } from '../../lib/store';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Calendar, Percent, IndianRupee, Save, FileText, CheckCircle2 } from 'lucide-react';
import AdBanner from '../AdBanner';

export default function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState(2500000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);
  const [processingFee, setProcessingFee] = useState(1);
  const [result, setResult] = useState<EmiOutput | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showAmortization, setShowAmortization] = useState(false);

  useEffect(() => {
    const res = calculateEmi({
      loanAmount,
      interestRate,
      tenureYears,
      processingFeePercent: processingFee,
    });
    setResult(res);
  }, [loanAmount, interestRate, tenureYears, processingFee]);

  if (!result) return null;

  const chartData = [
    { name: 'Principal Amount', value: loanAmount },
    { name: 'Total Interest', value: result.totalInterest },
  ];

  const COLORS = ['#0284c7', '#f59e0b']; // Primary Blue vs Warm Orange

  const handleSave = () => {
    saveCalculation({
      name: `EMI - ₹${(loanAmount / 100000).toFixed(1)}L @ ${interestRate}%`,
      type: 'emi',
      inputs: { loanAmount, interestRate, tenureYears, processingFee },
      outputs: {
        monthlyEmi: result.monthlyEmi,
        totalInterest: result.totalInterest,
        totalPayment: result.totalPayment,
        processingFeeAmount: result.processingFeeAmount,
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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
            EMI Loan Calculator
          </h2>
          <p className="text-sm text-muted-foreground">
            Estimate your monthly outgoings and understand your amortization structure.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-sky-600 hover:bg-sky-500 text-white dark:bg-sky-500 dark:hover:bg-sky-400 dark:text-slate-950 font-semibold rounded-xl shadow-md shadow-sky-500/10 transition-all cursor-pointer"
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
        <div className="lg:col-span-7 bg-card border border-border p-6 rounded-2xl space-y-6 shadow-sm">
          {/* Loan Amount */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Loan Amount
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-muted-foreground text-sm font-medium">
                  ₹
                </span>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-40 pl-6 pr-3 py-1 text-sm bg-input border border-border rounded-lg text-right focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>
            </div>
            <input
              type="range"
              min="100000"
              max="100000000"
              step="50000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-[11px] text-muted-foreground">
              <span>₹1 Lakh</span>
              <span>₹10 Crore</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Interest Rate (p.a.)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.05"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
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
              max="25"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-[11px] text-muted-foreground">
              <span>5%</span>
              <span>25%</span>
            </div>
          </div>

          {/* Tenure */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Loan Tenure
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

          {/* Processing Fee */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Processing Fee
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={processingFee}
                  onChange={(e) => setProcessingFee(Number(e.target.value))}
                  className="w-24 px-2.5 py-1 text-sm bg-input border border-border rounded-lg text-right focus:outline-none focus:ring-1 focus:ring-ring"
                />
                <span className="absolute inset-y-0 right-2.5 flex items-center text-muted-foreground text-xs font-semibold">
                  %
                </span>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="5"
              step="0.1"
              value={processingFee}
              onChange={(e) => setProcessingFee(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-[11px] text-muted-foreground">
              <span>0%</span>
              <span>5%</span>
            </div>
          </div>
        </div>

        {/* Right Side: Charts & Summaries */}
        <div className="lg:col-span-5 bg-card border border-border p-6 rounded-2xl shadow-sm flex flex-col justify-between space-y-6">
          {/* Core Numbers */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-sky-500/5 dark:bg-sky-500/10 p-4 rounded-xl border border-sky-500/10">
              <span className="text-[10px] uppercase font-bold text-sky-600 dark:text-sky-400 block tracking-wider">
                Monthly EMI
              </span>
              <span className="text-xl md:text-2xl font-bold block mt-1 text-slate-900 dark:text-white">
                {formatCurrency(result.monthlyEmi)}
              </span>
            </div>

            <div className="bg-amber-500/5 dark:bg-amber-500/10 p-4 rounded-xl border border-amber-500/10">
              <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 block tracking-wider">
                Total Interest
              </span>
              <span className="text-xl md:text-2xl font-bold block mt-1 text-slate-900 dark:text-white">
                {formatCurrency(result.totalInterest)}
              </span>
            </div>

            <div className="bg-emerald-500/5 dark:bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/10">
              <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 block tracking-wider">
                Total Payment
              </span>
              <span className="text-base md:text-lg font-bold block mt-1 text-slate-900 dark:text-white">
                {formatCurrency(result.totalPayment)}
              </span>
            </div>

            <div className="bg-violet-500/5 dark:bg-violet-500/10 p-4 rounded-xl border border-violet-500/10">
              <span className="text-[10px] uppercase font-bold text-violet-600 dark:text-violet-400 block tracking-wider">
                Processing Fee
              </span>
              <span className="text-base md:text-lg font-bold block mt-1 text-slate-900 dark:text-white">
                {formatCurrency(result.processingFeeAmount)}
              </span>
            </div>
          </div>

          {/* Chart Graphic */}
          <div className="h-44 w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center">
              <span className="text-[10px] uppercase text-muted-foreground font-semibold">Total Cost</span>
              <span className="text-sm font-bold">{formatCurrency(result.totalPayment)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ad placement */}
      <AdBanner placement="calc_inline" targetCalculator="emi" />

      {/* Amortization Schedule */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <button
          onClick={() => setShowAmortization(!showAmortization)}
          className="w-full px-6 py-4 flex items-center justify-between font-semibold text-slate-800 dark:text-slate-200 border-b border-border bg-slate-50/50 dark:bg-slate-950/20 hover:bg-slate-50 dark:hover:bg-slate-900/40 transition cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <Calendar size={18} className="text-primary" />
            View Yearly Breakdowns &amp; Amortization Schedule
          </span>
          <span className="text-xs text-primary font-bold">
            {showAmortization ? 'Collapse' : 'Expand'}
          </span>
        </button>

        {showAmortization && (
          <div className="p-6 overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-border text-muted-foreground text-xs uppercase">
                  <th className="pb-3 font-semibold">Year</th>
                  <th className="pb-3 text-right font-semibold">Principal Paid</th>
                  <th className="pb-3 text-right font-semibold">Interest Paid</th>
                  <th className="pb-3 text-right font-semibold">Total Paid</th>
                  <th className="pb-3 text-right font-semibold">Ending Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {result.yearlyAmortization.map((yr) => (
                  <tr key={yr.year} className="hover:bg-muted/40 transition">
                    <td className="py-3 font-semibold text-slate-800 dark:text-slate-200">
                      Year {yr.year}
                    </td>
                    <td className="py-3 text-right text-sky-600 dark:text-sky-400">
                      {formatCurrency(yr.principalPaid)}
                    </td>
                    <td className="py-3 text-right text-amber-600 dark:text-amber-400">
                      {formatCurrency(yr.interestPaid)}
                    </td>
                    <td className="py-3 text-right font-semibold text-slate-700 dark:text-slate-300">
                      {formatCurrency(yr.totalPaid)}
                    </td>
                    <td className="py-3 text-right font-medium text-slate-800 dark:text-slate-200">
                      {formatCurrency(yr.endingBalance)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
