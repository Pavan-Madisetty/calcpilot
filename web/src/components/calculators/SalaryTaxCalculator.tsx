'use client';

import React, { useState, useEffect } from 'react';
import { calculateSalaryTax, TaxOutput } from '../../lib/calculators';
import { Check, AlertCircle } from 'lucide-react';
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
      <div>
        <h2 className="text-2xl font-bold font-display text-slate-800">
          Salary Income Tax Calculator
        </h2>
        <p className="text-sm text-slate-500">
          Compare Old vs New Tax Regimes for FY 2025-26 &amp; FY 2026-27 with savings advice.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Inputs */}
        <div className="lg:col-span-6 bg-white border border-slate-200 p-6 rounded-2xl space-y-5 shadow-sm">
          <h3 className="font-bold text-sm text-slate-700 border-b border-slate-100 pb-2 uppercase tracking-wide">
            Salary &amp; Exemptions
          </h3>

          <div className="grid grid-cols-2 gap-4">
            {/* Gross Annual Salary */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600">
                Gross Annual Salary
              </label>
              <input
                type="number"
                value={annualSalary}
                onChange={(e) => setAnnualSalary(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-sm"
              />
            </div>

            {/* HRA Received */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600">
                HRA Received (Annual)
              </label>
              <input
                type="number"
                value={hraReceived}
                onChange={(e) => setHraReceived(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Rent Paid */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600">
                Actual Rent Paid (Annual)
              </label>
              <input
                type="number"
                value={rentPaid}
                onChange={(e) => setRentPaid(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-sm"
              />
            </div>

            {/* Metro Toggle */}
            <div className="space-y-1 flex flex-col justify-end">
              <label className="text-xs font-semibold text-slate-600 mb-2">
                City Type
              </label>
              <label className="flex items-center gap-2 text-xs font-medium cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={metroCity}
                  onChange={(e) => setMetroCity(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4 bg-white border-slate-300"
                />
                Metro City (Delhi/Mumbai/etc.)
              </label>
            </div>
          </div>

          <h3 className="font-bold text-sm text-slate-700 border-b border-slate-100 pb-2 pt-2 uppercase tracking-wide">
            Deductions (Old Regime Only)
          </h3>

          <div className="grid grid-cols-2 gap-4">
            {/* Sec 80C */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 flex justify-between">
                <span>Section 80C</span>
                <span className="text-slate-400 font-normal">Max 1.5L</span>
              </label>
              <input
                type="number"
                max="150000"
                value={sec80C}
                onChange={(e) => setSec80C(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-sm"
              />
            </div>

            {/* Sec 80D */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 flex justify-between">
                <span>Section 80D</span>
                <span className="text-slate-400 font-normal">Max 50k</span>
              </label>
              <input
                type="number"
                max="50000"
                value={sec80D}
                onChange={(e) => setSec80D(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Home Loan Interest Sec 24b */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 flex justify-between">
                <span>Home Loan Int. (24b)</span>
                <span className="text-slate-400 font-normal">Max 2L</span>
              </label>
              <input
                type="number"
                max="200000"
                value={homeLoanInterest}
                onChange={(e) => setHomeLoanInterest(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-sm"
              />
            </div>

            {/* Other Deductions */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600">
                Other Deductions (NPS, etc.)
              </label>
              <input
                type="number"
                value={otherDeductions}
                onChange={(e) => setOtherDeductions(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Comparison & Savings */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            {/* View tabs */}
            <div className="flex border-b border-slate-200">
              <button
                onClick={() => setTab('compare')}
                className={`flex-1 py-3 font-semibold text-xs uppercase tracking-wider text-center border-b-2 transition cursor-pointer ${
                  tab === 'compare'
                    ? 'border-indigo-600 text-indigo-600 bg-indigo-50/10'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                Comparison Details
              </button>
              <button
                onClick={() => setTab('suggestions')}
                className={`flex-1 py-3 font-semibold text-xs uppercase tracking-wider text-center border-b-2 transition cursor-pointer ${
                  tab === 'suggestions'
                    ? 'border-indigo-600 text-indigo-600 bg-indigo-50/10'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                Tax Savings Guide ({result.suggestions.length})
              </button>
            </div>

            <div className="p-6">
              {tab === 'compare' ? (
                <div className="space-y-6">
                  {/* Recommendation Card */}
                  <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/30 flex gap-3 items-center">
                    <div className="h-10 w-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-bold text-lg">
                      💡
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-800">
                        Recommended: {result.recommendedRegime === 'Equal' ? 'Any Regime' : `${result.recommendedRegime} Regime`}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                        {result.recommendedRegime === 'Equal'
                          ? 'Both regimes yield the exact same tax liability.'
                          : `You will save ${formatCurrency(result.difference)} annually by opting for the ${
                              result.recommendedRegime
                            } Regime.`}
                      </p>
                    </div>
                  </div>

                  {/* Regime Data Grid */}
                  <div className="grid grid-cols-1 gap-3.5">
                    {/* Old Regime Card */}
                    <div className={`p-4 rounded-xl border transition ${result.recommendedRegime === 'Old' ? 'border-indigo-500 bg-indigo-50/10' : 'border-slate-200'}`}>
                      <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">
                        Old Tax Regime
                      </span>
                      <span className="text-xl font-bold block mt-1 text-slate-800">
                        {formatCurrency(result.oldRegime.totalTax)}
                      </span>
                      <div className="text-[10px] text-slate-400 mt-2 space-y-1">
                        <div>Deductions: {formatCurrency(result.oldRegime.deductions)}</div>
                        <div>Taxable: {formatCurrency(result.oldRegime.taxableIncome)}</div>
                      </div>
                    </div>

                    {/* New Regime Card */}
                    <div className={`p-4 rounded-xl border transition ${result.recommendedRegime === 'New' ? 'border-indigo-500 bg-indigo-50/10' : 'border-slate-200'}`}>
                      <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">
                        New Tax Regime
                      </span>
                      <span className="text-xl font-bold block mt-1 text-slate-800">
                        {formatCurrency(result.newRegime.totalTax)}
                      </span>
                      <div className="text-[10px] text-slate-400 mt-2 space-y-1">
                        <div>Deductions: {formatCurrency(result.newRegime.deductions)}</div>
                        <div>Taxable: {formatCurrency(result.newRegime.taxableIncome)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {result.suggestions.length === 0 ? (
                    <div className="text-center py-6 text-slate-400 text-xs flex flex-col items-center gap-2">
                      <Check className="text-emerald-600 h-8 w-8 bg-emerald-50 p-1.5 rounded-full" />
                      <span>Congratulations! You have fully optimized your tax exemptions.</span>
                    </div>
                  ) : (
                    result.suggestions.map((sug, i) => (
                      <div key={i} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-bold text-xs text-slate-800">{sug.section}</span>
                            <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">{sug.description}</p>
                          </div>
                          <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full shrink-0">
                            Save {formatCurrency(sug.potentialSavings)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-[9px] text-slate-400 pt-1 border-t border-slate-100">
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

          <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400">
            <span>Standard deduction applied: ₹50k (Old), ₹75k (New)</span>
            <span className="flex items-center gap-1"><AlertCircle size={10} /> FY 2025-26 rules</span>
          </div>
        </div>
      </div>

      <AdBanner placement="calc_inline" targetCalculator="tax" />
    </div>
  );
}
