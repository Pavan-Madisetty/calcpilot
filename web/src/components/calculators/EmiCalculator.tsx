'use client';

import React, { useState, useEffect } from 'react';
import { calculateEmi, EmiOutput } from '../../lib/calculators';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Calendar, Percent } from 'lucide-react';
import AdBanner from '../AdBanner';

export default function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState(2500000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);
  const [processingFee, setProcessingFee] = useState(1);
  const [result, setResult] = useState<EmiOutput | null>(null);
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

  const COLORS = ['#4f46e5', '#10b981']; // Royal Indigo and Forest Emerald

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
      <div>
        <h2 className="text-2xl font-bold font-display text-slate-800">
          EMI Loan Calculator
        </h2>
        <p className="text-sm text-slate-500">
          Estimate your monthly outgoings and understand your amortization structure.
        </p>
      </div>

      {/* Top Ad Place Holder */}
      <AdBanner placement="calc_inline" targetCalculator="emi" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Inputs */}
        <div className="lg:col-span-7 bg-white border border-slate-200 p-6 rounded-2xl space-y-6 shadow-sm">
          {/* Loan Amount */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700">
                Loan Amount
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-400 text-sm font-medium">
                  ₹
                </span>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-40 pl-6 pr-3 py-1 text-sm text-right focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
            <input
              type="range"
              min="100000"
              max="50000000"
              step="50000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>₹1 Lakh</span>
              <span>₹5 Crore</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700">
                Interest Rate (p.a.)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.05"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
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
              max="20"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>5%</span>
              <span>20%</span>
            </div>
          </div>

          {/* Tenure */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700">
                Loan Tenure
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
              max="35"
              step="1"
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>1 Year</span>
              <span>35 Years</span>
            </div>
          </div>

          {/* Processing Fee */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700">
                Processing Fee
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={processingFee}
                  onChange={(e) => setProcessingFee(Number(e.target.value))}
                  className="w-24 px-2.5 py-1 text-sm text-right focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <span className="absolute inset-y-0 right-2.5 flex items-center text-slate-400 text-xs font-semibold">
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
              className="w-full"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>0%</span>
              <span>5%</span>
            </div>
          </div>
        </div>

        {/* Right Side: Charts & Summaries */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main EMI result card */}
          <div className="bg-gradient-to-tr from-indigo-900 to-slate-900 text-white p-6 rounded-2xl shadow-sm border border-slate-800 space-y-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">Monthly EMI</span>
              <h3 className="text-4xl font-extrabold font-display mt-0.5 flex items-baseline gap-1">
                {formatCurrency(result.monthlyEmi)}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-indigo-800/50 pt-4">
              <div>
                <span className="text-[10px] font-medium text-indigo-300 uppercase">Total Interest</span>
                <p className="text-base font-bold mt-0.5 text-rose-400">{formatCurrency(result.totalInterest)}</p>
              </div>
              <div>
                <span className="text-[10px] font-medium text-indigo-300 uppercase">Total Payment</span>
                <p className="text-base font-bold mt-0.5">{formatCurrency(result.totalPayment)}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] font-medium text-indigo-300 uppercase">Principal Loan</span>
                <p className="text-base font-bold mt-0.5">{formatCurrency(loanAmount)}</p>
              </div>
              <div>
                <span className="text-[10px] font-medium text-indigo-300 uppercase">Processing Fee</span>
                <p className="text-base font-bold mt-0.5 text-emerald-400">{formatCurrency(result.processingFeeAmount)}</p>
              </div>
            </div>
          </div>

          {/* Chart Graphic */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
            <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-4">Payment Breakdown</h4>
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
                <span className="text-[9px] uppercase text-slate-400 font-bold">Total Payment</span>
                <span className="text-xs font-bold text-slate-700">{formatCurrency(result.totalPayment)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ad placement */}
      <AdBanner placement="insights_sponsored" targetCalculator="emi" />

      {/* Amortization Schedule */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <button
          onClick={() => setShowAmortization(!showAmortization)}
          className="w-full px-6 py-4 flex items-center justify-between font-bold text-slate-700 bg-slate-50 hover:bg-slate-100/80 transition cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <Calendar size={16} className="text-indigo-600" />
            Amortization Breakdowns Schedule
          </span>
          <span className="text-xs text-indigo-600">
            {showAmortization ? 'Hide Details' : 'Show Details'}
          </span>
        </button>

        {showAmortization && (
          <div className="p-6 overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 text-xs uppercase">
                  <th className="pb-3 font-semibold">Year</th>
                  <th className="pb-3 text-right font-semibold">Principal Paid</th>
                  <th className="pb-3 text-right font-semibold">Interest Paid</th>
                  <th className="pb-3 text-right font-semibold">Total Paid</th>
                  <th className="pb-3 text-right font-semibold">Ending Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {result.yearlyAmortization.map((yr) => (
                  <tr key={yr.year} className="hover:bg-slate-50/50 transition">
                    <td className="py-3 font-semibold text-slate-800">
                      Year {yr.year}
                    </td>
                    <td className="py-3 text-right text-indigo-600 font-medium">
                      {formatCurrency(yr.principalPaid)}
                    </td>
                    <td className="py-3 text-right text-emerald-600 font-medium">
                      {formatCurrency(yr.interestPaid)}
                    </td>
                    <td className="py-3 text-right font-semibold text-slate-700">
                      {formatCurrency(yr.totalPaid)}
                    </td>
                    <td className="py-3 text-right font-medium text-slate-800">
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
