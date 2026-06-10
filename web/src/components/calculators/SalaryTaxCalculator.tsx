'use client';

import React, { useState, useEffect } from 'react';
import { calculateSalaryTax, TaxOutput } from '../../lib/calculators';
import { saveCalculation } from '../../lib/store';
import { Save, CheckCircle2, ChevronRight, Calculator, Check, AlertCircle } from 'lucide-react';
import AdBanner from '../AdBanner';

export default function SalaryTaxCalculator() {
  const [annualSalary, setAnnualSalary] = useState(1200000);
  const [hraReceived, setHraReceived] = useState(150000);
  const [rentPaid, setRentPaid] = useState(120000);
  const [metroCity, setMetroCity] = useState(false);
  const [sec80C, setSec80C] = useState(150000);
  const [sec80D, setSec80D] = useState(25000);
  const [homeLoanInterest, setHomeLoanInterest] = useState(0);
  const [otherDeductions, setOtherDeductions] = useState(0);
  const [result, setResult] = useState<TaxOutput | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [tab, setTab] = useState<'compare' | 'suggestions'>('compare');

  useEffect(() => {
    const res = calculateSalaryTax({
      annualSalary,
      hraReceived,
      rentPaid,
      metroCity,
      sec80C,
      sec80D,
      homeLoanInterest,
      otherDeductions,
    });
    setResult(res);
  }, [
    annualSalary,
    hraReceived,
    rentPaid,
    metroCity,
    sec80C,
    sec80D,
    homeLoanInterest,
    otherDeductions,
  ]);

  if (!result) return null;

  const handleSave = () => {
    saveCalculation({
      name: `Tax - Salary ₹${(annualSalary / 100000).toFixed(1)}L`,
      type: 'tax',
      inputs: { annualSalary, sec80C, sec80D, homeLoanInterest },
      outputs: {
        oldTax: result.oldRegime.totalTax,
        newTax: result.newRegime.totalTax,
        recommendedRegime: result.recommendedRegime,
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
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
            Salary Income Tax Calculator
          </h2>
          <p className="text-sm text-muted-foreground">
            Compare Old vs New Tax Regimes for FY 2025-26 &amp; FY 2026-27 with savings advice.
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
        <div className="lg:col-span-6 bg-card border border-border p-6 rounded-2xl space-y-5 shadow-sm">
          <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 border-b border-border pb-2 uppercase tracking-wide">
            Salary &amp; Exemptions
          </h3>

          <div className="grid grid-cols-2 gap-4">
            {/* Gross Annual Salary */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                Gross Annual Salary
              </label>
              <input
                type="number"
                value={annualSalary}
                onChange={(e) => setAnnualSalary(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-sm bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>

            {/* Basic Salary */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                HRA Received (Annual)
              </label>
              <input
                type="number"
                value={hraReceived}
                onChange={(e) => setHraReceived(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-sm bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Rent Paid */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                Actual Rent Paid (Annual)
              </label>
              <input
                type="number"
                value={rentPaid}
                onChange={(e) => setRentPaid(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-sm bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>

            {/* Metro Toggle */}
            <div className="space-y-1 flex flex-col justify-end">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
                City Type
              </label>
              <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={metroCity}
                  onChange={(e) => setMetroCity(e.target.checked)}
                  className="rounded text-sky-600 focus:ring-sky-500 h-4 w-4 bg-input border-border"
                />
                Metro City (Delhi/Mumbai/etc.)
              </label>
            </div>
          </div>

          <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 border-b border-border pb-2 pt-2 uppercase tracking-wide">
            Deductions (Old Regime Only)
          </h3>

          <div className="grid grid-cols-2 gap-4">
            {/* Sec 80C */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 flex justify-between">
                <span>Section 80C</span>
                <span className="text-slate-400">Max 1.5L</span>
              </label>
              <input
                type="number"
                max="150000"
                value={sec80C}
                onChange={(e) => setSec80C(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-sm bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>

            {/* Sec 80D */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 flex justify-between">
                <span>Section 80D</span>
                <span className="text-slate-400">Max 50k</span>
              </label>
              <input
                type="number"
                max="50000"
                value={sec80D}
                onChange={(e) => setSec80D(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-sm bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Home Loan Interest Sec 24b */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 flex justify-between">
                <span>Home Loan Int. (24b)</span>
                <span className="text-slate-400">Max 2L</span>
              </label>
              <input
                type="number"
                max="200000"
                value={homeLoanInterest}
                onChange={(e) => setHomeLoanInterest(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-sm bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>

            {/* Other Deductions */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                Other Deductions (NPS, etc.)
              </label>
              <input
                type="number"
                value={otherDeductions}
                onChange={(e) => setOtherDeductions(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-sm bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Comparison & Savings */}
        <div className="lg:col-span-6 bg-card border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            {/* View tabs */}
            <div className="flex border-b border-border">
              <button
                onClick={() => setTab('compare')}
                className={`flex-1 py-3 font-semibold text-xs uppercase tracking-wider text-center border-b-2 transition ${
                  tab === 'compare'
                    ? 'border-primary text-primary bg-slate-50/50 dark:bg-slate-900/10'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                Side-by-Side Comparison
              </button>
              <button
                onClick={() => setTab('suggestions')}
                className={`flex-1 py-3 font-semibold text-xs uppercase tracking-wider text-center border-b-2 transition ${
                  tab === 'suggestions'
                    ? 'border-primary text-primary bg-slate-50/50 dark:bg-slate-900/10'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                Tax Savings Guide ({result.suggestions.length})
              </button>
            </div>

            <div className="p-6">
              {tab === 'compare' ? (
                <div className="space-y-6">
                  {/* Recommendation Card */}
                  <div className="p-4 rounded-xl border border-sky-500/20 bg-sky-500/5 dark:bg-sky-500/10 flex gap-3 items-center">
                    <div className="h-10 w-10 bg-sky-600 dark:bg-sky-500 text-white dark:text-slate-950 rounded-xl flex items-center justify-center font-bold">
                      🏆
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">
                        Recommended: {result.recommendedRegime === 'Equal' ? 'Any Regime' : `${result.recommendedRegime} Regime`}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {result.recommendedRegime === 'Equal'
                          ? 'Both regimes yield the exact same tax liability.'
                          : `You will save ${formatCurrency(result.difference)} annually by opting for the ${
                              result.recommendedRegime
                            } Regime.`}
                      </p>
                    </div>
                  </div>

                  {/* Regime Data Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Old Regime Card */}
                    <div className={`p-4 rounded-xl border transition ${result.recommendedRegime === 'Old' ? 'border-sky-500 bg-sky-50/10 dark:bg-sky-950/5' : 'border-border'}`}>
                      <span className="text-[10px] uppercase font-bold text-muted-foreground block tracking-wider">
                        Old Tax Regime
                      </span>
                      <span className="text-xl font-bold block mt-1 text-slate-800 dark:text-white">
                        {formatCurrency(result.oldRegime.totalTax)}
                      </span>
                      <div className="text-[11px] text-muted-foreground mt-2 space-y-1">
                        <div>Deductions: {formatCurrency(result.oldRegime.deductions)}</div>
                        <div>Taxable: {formatCurrency(result.oldRegime.taxableIncome)}</div>
                      </div>
                    </div>

                    {/* New Regime Card */}
                    <div className={`p-4 rounded-xl border transition ${result.recommendedRegime === 'New' ? 'border-sky-500 bg-sky-50/10 dark:bg-sky-950/5' : 'border-border'}`}>
                      <span className="text-[10px] uppercase font-bold text-muted-foreground block tracking-wider">
                        New Tax Regime
                      </span>
                      <span className="text-xl font-bold block mt-1 text-slate-800 dark:text-white">
                        {formatCurrency(result.newRegime.totalTax)}
                      </span>
                      <div className="text-[11px] text-muted-foreground mt-2 space-y-1">
                        <div>Deductions: {formatCurrency(result.newRegime.deductions)}</div>
                        <div>Taxable: {formatCurrency(result.newRegime.taxableIncome)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {result.suggestions.length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground text-sm flex flex-col items-center gap-2">
                      <Check className="text-emerald-500 h-8 w-8 bg-emerald-100 dark:bg-emerald-950/40 p-1 rounded-full" />
                      <span>Congratulations! You have fully optimized your tax exemptions.</span>
                    </div>
                  ) : (
                    result.suggestions.map((sug, i) => (
                      <div key={i} className="p-4 rounded-xl border border-border bg-slate-50/50 dark:bg-slate-900/10 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-bold text-sm text-slate-800 dark:text-slate-200">{sug.section}</span>
                            <p className="text-xs text-muted-foreground mt-0.5">{sug.description}</p>
                          </div>
                          <span className="text-xs font-semibold text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full shrink-0">
                            Save {formatCurrency(sug.potentialSavings)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-[10px] text-muted-foreground pt-1 border-t border-border/50">
                          <span>Claimed: {formatCurrency(sug.currentClaim)}</span>
                          <span>Limit: {formatCurrency(sug.maxLimit)}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="p-6 bg-slate-50 dark:bg-slate-950/20 border-t border-border flex justify-between items-center text-xs text-muted-foreground">
            <span>Standard deduction applied: ₹50k (Old), ₹75k (New)</span>
            <span className="flex items-center gap-1"><AlertCircle size={12} /> FY 2025-26 rules</span>
          </div>
        </div>
      </div>

      <AdBanner placement="calc_inline" targetCalculator="tax" />
    </div>
  );
}
