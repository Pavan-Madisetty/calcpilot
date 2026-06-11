'use client';

import React, { useState, useEffect } from 'react';
import { calculateLoanEligibility, LoanEligibilityOutput } from '../../lib/calculators';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';
import AdBanner from '../AdBanner';

export default function LoanEligibilityCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState(80000);
  const [existingEmi, setExistingEmi] = useState(15000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);
  const [foir, setFoir] = useState(50); // Fixed Obligation to Income Ratio
  const [result, setResult] = useState<LoanEligibilityOutput | null>(null);

  useEffect(() => {
    const res = calculateLoanEligibility({
      monthlyIncome,
      existingEmi,
      interestRate,
      tenureYears,
      foirPercent: foir,
    });
    setResult(res);
  }, [monthlyIncome, existingEmi, interestRate, tenureYears, foir]);

  if (!result) return null;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Excellent':
        return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'Good':
        return 'text-teal-600 bg-teal-50 border-teal-200';
      case 'Average':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'Risky':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Overburdened':
      default:
        return 'text-red-600 bg-red-50 border-red-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold font-display text-slate-800">
          Loan Eligibility Calculator
        </h2>
        <p className="text-sm text-slate-500">
          Understand your maximum loan capacity and check your debt obligations ratio.
        </p>
      </div>

      {/* Top Ad Place Holder */}
      <AdBanner placement="calc_inline" targetCalculator="loan_eligibility" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Inputs */}
        <div className="lg:col-span-6 bg-white border border-slate-200 p-6 rounded-2xl space-y-6 shadow-sm">
          {/* Monthly Net Income */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700">
                Monthly In-Hand Salary
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-400 text-sm font-medium">
                  ₹
                </span>
                <input
                  type="number"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                  className="w-32 pl-6 pr-3 py-1 text-sm text-right focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
            <input
              type="range"
              min="10000"
              max="500000"
              step="5000"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>₹10,000</span>
              <span>₹5 Lakhs/mo</span>
            </div>
          </div>

          {/* Existing EMIs */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700">
                Existing EMIs (per month)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-400 text-sm font-medium">
                  ₹
                </span>
                <input
                  type="number"
                  value={existingEmi}
                  onChange={(e) => setExistingEmi(Number(e.target.value))}
                  className="w-32 pl-6 pr-3 py-1 text-sm text-right focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="150000"
              step="2000"
              value={existingEmi}
              onChange={(e) => setExistingEmi(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>₹0</span>
              <span>₹1.5 Lakhs/mo</span>
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
                  step="0.1"
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
                Tenure
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

          {/* FOIR LIMIT */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700">
                Max FOIR limit (DTI limit)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={foir}
                  onChange={(e) => setFoir(Number(e.target.value))}
                  className="w-24 px-2.5 py-1 text-sm text-right focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <span className="absolute inset-y-0 right-2.5 flex items-center text-slate-400 text-xs font-semibold">
                  %
                </span>
              </div>
            </div>
            <input
              type="range"
              min="30"
              max="70"
              step="5"
              value={foir}
              onChange={(e) => setFoir(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>30%</span>
              <span>70%</span>
            </div>
          </div>
        </div>

        {/* Outputs */}
        <div className="lg:col-span-6 space-y-6">
          {/* Max Loan Eligible result card */}
          <div className="bg-gradient-to-tr from-indigo-900 to-slate-900 text-white p-6 rounded-2xl shadow-sm border border-slate-800 space-y-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">Estimated Max Loan Eligible</span>
              <h3 className="text-4xl font-extrabold font-display mt-0.5 flex items-baseline gap-1">
                {formatCurrency(result.maxLoanAmount)}
              </h3>
              <p className="text-[11px] text-indigo-200 mt-1 leading-normal">
                Calculated at {interestRate}% interest rate over a tenure of {tenureYears} years.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-indigo-800/50 pt-4">
              <div>
                <span className="text-[10px] font-medium text-indigo-300 uppercase">Max EMI Capacity</span>
                <p className="text-base font-bold mt-0.5 text-emerald-400">{formatCurrency(result.maxEmiCapacity)}</p>
              </div>
              <div>
                <span className="text-[10px] font-medium text-indigo-300 uppercase">Disposable Limit (FOIR)</span>
                <p className="text-base font-bold mt-0.5">{formatCurrency((monthlyIncome * foir) / 100)}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] font-medium text-indigo-300 uppercase">Debt-to-Income (DTI)</span>
                <p className="text-base font-bold mt-0.5">{result.debtToIncomeRatio.toFixed(1)}%</p>
              </div>
              <div>
                <span className="text-[10px] font-medium text-indigo-300 uppercase">Profile Status</span>
                <p className="text-base font-bold mt-0.5 text-indigo-300">{result.status}</p>
              </div>
            </div>
          </div>

          {/* Credit Profile Status Card */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4">
            <div className={`p-4 rounded-xl border flex gap-3 items-center ${getStatusColor(result.status)}`}>
              {result.status === 'Excellent' || result.status === 'Good' ? (
                <CheckCircle className="shrink-0 text-emerald-600" size={18} />
              ) : (
                <AlertTriangle className="shrink-0 text-amber-600" size={18} />
              )}
              <div>
                <h4 className="font-bold text-sm">Credit Profile Status: {result.status}</h4>
                <p className="text-xs opacity-90 mt-0.5 leading-relaxed">
                  {result.status === 'Excellent' || result.status === 'Good'
                    ? 'Your debt level is well managed. Banks are highly likely to approve your loans.'
                    : result.status === 'Average'
                    ? 'Your debts are moderate. Approval is likely but rates might not be optimal.'
                    : 'Your debt ratio is high. Consolidate your debts before applying for more loans.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Ad Place Holder */}
      <AdBanner placement="insights_sponsored" targetCalculator="loan_eligibility" />
    </div>
  );
}
