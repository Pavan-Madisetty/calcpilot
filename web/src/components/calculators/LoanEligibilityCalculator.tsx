'use client';

import React, { useState, useEffect } from 'react';
import { calculateLoanEligibility, LoanEligibilityOutput } from '../../lib/calculators';
import { saveCalculation } from '../../lib/store';
import { Save, CheckCircle2, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import AdBanner from '../AdBanner';

export default function LoanEligibilityCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState(80000);
  const [existingEmi, setExistingEmi] = useState(15000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);
  const [foir, setFoir] = useState(50); // Fixed Obligation to Income Ratio
  const [result, setResult] = useState<LoanEligibilityOutput | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

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

  const handleSave = () => {
    saveCalculation({
      name: `Eligibility - Salary ₹${(monthlyIncome / 1000).toFixed(0)}k`,
      type: 'loan_eligibility',
      inputs: { monthlyIncome, existingEmi, interestRate, tenureYears, foir },
      outputs: {
        maxEmiCapacity: result.maxEmiCapacity,
        maxLoanAmount: result.maxLoanAmount,
        debtToIncomeRatio: result.debtToIncomeRatio,
        status: result.status,
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Excellent':
        return 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/20 border-emerald-500/25';
      case 'Good':
        return 'text-teal-600 bg-teal-50 dark:text-teal-400 dark:bg-teal-950/20 border-teal-500/25';
      case 'Average':
        return 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/20 border-amber-500/25';
      case 'Risky':
        return 'text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-950/20 border-orange-500/25';
      case 'Overburdened':
      default:
        return 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950/20 border-red-500/25';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
            Loan Eligibility Calculator
          </h2>
          <p className="text-sm text-muted-foreground">
            Understand your maximum loan capacity and check your debt obligations ratio.
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
        {/* Inputs */}
        <div className="lg:col-span-6 bg-card border border-border p-6 rounded-2xl space-y-6 shadow-sm">
          {/* Monthly Net Income */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Monthly In-Hand Salary
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-muted-foreground text-sm font-medium">
                  ₹
                </span>
                <input
                  type="number"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                  className="w-32 pl-6 pr-3 py-1 text-sm bg-input border border-border rounded-lg text-right focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>
            </div>
            <input
              type="range"
              min="10000"
              max="1000000"
              step="5000"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-[11px] text-muted-foreground">
              <span>₹10,000</span>
              <span>₹10 Lakhs/mo</span>
            </div>
          </div>

          {/* Existing EMIs */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Existing EMIs (per month)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-muted-foreground text-sm font-medium">
                  ₹
                </span>
                <input
                  type="number"
                  value={existingEmi}
                  onChange={(e) => setExistingEmi(Number(e.target.value))}
                  className="w-32 pl-6 pr-3 py-1 text-sm bg-input border border-border rounded-lg text-right focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="300000"
              step="2000"
              value={existingEmi}
              onChange={(e) => setExistingEmi(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-[11px] text-muted-foreground">
              <span>₹0</span>
              <span>₹3 Lakhs/mo</span>
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
                  step="0.1"
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
              max="20"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-[11px] text-muted-foreground">
              <span>5%</span>
              <span>20%</span>
            </div>
          </div>

          {/* Tenure */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Tenure
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
              max="35"
              step="1"
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-[11px] text-muted-foreground">
              <span>1 Year</span>
              <span>35 Years</span>
            </div>
          </div>

          {/* FOIR LIMIT */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Max FOIR limit (DTI limit)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={foir}
                  onChange={(e) => setFoir(Number(e.target.value))}
                  className="w-24 px-2.5 py-1 text-sm bg-input border border-border rounded-lg text-right focus:outline-none focus:ring-1 focus:ring-ring"
                />
                <span className="absolute inset-y-0 right-2.5 flex items-center text-muted-foreground text-xs font-semibold">
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
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-[11px] text-muted-foreground">
              <span>30%</span>
              <span>70%</span>
            </div>
          </div>
        </div>

        {/* Outputs */}
        <div className="lg:col-span-6 bg-card border border-border p-6 rounded-2xl shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <div className={`p-4 rounded-xl border flex gap-3 items-center ${getStatusColor(result.status)}`}>
              {result.status === 'Excellent' || result.status === 'Good' ? (
                <CheckCircle className="shrink-0" />
              ) : (
                <AlertTriangle className="shrink-0" />
              )}
              <div>
                <h4 className="font-bold text-sm">Credit Profile Status: {result.status}</h4>
                <p className="text-xs opacity-90 mt-0.5">
                  {result.status === 'Excellent' || result.status === 'Good'
                    ? 'Your debt level is well managed. Banks are highly likely to approve your loans.'
                    : result.status === 'Average'
                    ? 'Your debts are moderate. Approval is likely but rates might not be optimal.'
                    : 'Your debt ratio is high. Consolidate your debts before applying for more loans.'}
                </p>
              </div>
            </div>

            {/* Calculations outputs */}
            <div className="space-y-4">
              <div className="border-b border-border pb-3 flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Monthly Disposable Limit (FOIR cap)</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {formatCurrency((monthlyIncome * foir) / 100)}
                </span>
              </div>

              <div className="border-b border-border pb-3 flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Maximum Eligible EMI Capacity</span>
                <span className="font-bold text-sky-600 dark:text-sky-400 text-lg">
                  {formatCurrency(result.maxEmiCapacity)}
                </span>
              </div>

              <div className="border-b border-border pb-3 flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Proposed Debt-to-Income (DTI) Ratio</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {result.debtToIncomeRatio.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* Massive Display card for Max Loan Amount */}
          <div className="bg-gradient-to-tr from-sky-500 to-indigo-600 dark:from-sky-600 dark:to-indigo-800 p-6 rounded-2xl text-white text-center shadow-lg shadow-sky-500/10">
            <span className="text-xs uppercase font-bold tracking-widest text-sky-200 block">
              Estimated Max Loan Eligible
            </span>
            <span className="text-3xl md:text-4xl font-extrabold block mt-2 font-display">
              {formatCurrency(result.maxLoanAmount)}
            </span>
            <p className="text-xs text-sky-100/70 mt-3 flex items-center justify-center gap-1.5">
              <Info size={12} /> Calculated at {interestRate}% p.a. for {tenureYears} Years
            </p>
          </div>
        </div>
      </div>

      <AdBanner placement="calc_inline" targetCalculator="loan_eligibility" />
    </div>
  );
}
