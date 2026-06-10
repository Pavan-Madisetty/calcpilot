'use client';

import React, { useEffect, useState } from 'react';
import { getSavedCalculations, SavedCalculation } from '../lib/store';
import { Lightbulb, Info, ArrowUpRight, Flame, Percent, Check } from 'lucide-react';
import AdBanner from './AdBanner';

export default function Insights() {
  const [saved, setSaved] = useState<SavedCalculation[]>([]);

  useEffect(() => {
    setSaved(getSavedCalculations());
  }, []);

  const hasEmi = saved.some((s) => s.type === 'emi');
  const hasSip = saved.some((s) => s.type === 'sip');
  const hasTax = saved.some((s) => s.type === 'tax');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
          Financial Insights &amp; Analytics
        </h2>
        <p className="text-sm text-muted-foreground">
          Actionable strategies and advisory reports mapped directly to your financial logs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Dynamic Advice Cards */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1. EMI INSIGHTS */}
          {hasEmi ? (
            <div className="p-6 bg-card border border-border rounded-2xl shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <Percent className="text-sky-500" size={18} />
                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm md:text-base">
                  EMI Refinance &amp; Prepayment Optimization
                </h3>
              </div>
              <p className="text-xs text-muted-foreground">
                Based on your saved EMI calculations, here is how you can slash your overall interest outgo:
              </p>
              <div className="space-y-3">
                <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-border text-xs">
                  <span className="font-bold text-slate-700 dark:text-slate-200">The &quot;1 Extra EMI&quot; Strategy</span>
                  <p className="text-muted-foreground mt-1">
                    By making just 1 extra EMI prepayment every year, you can reduce a 20-year loan tenure to approximately 16.2 years, saving lakhs in interest.
                  </p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-border text-xs">
                  <span className="font-bold text-slate-700 dark:text-slate-200">Prepay 5% Annually</span>
                  <p className="text-muted-foreground mt-1">
                    Prepaying 5% of your outstanding principal once a year cuts your total interest burden by over 45% and finishes your loan in half the time.
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          {/* 2. SIP INSIGHTS */}
          {hasSip ? (
            <div className="p-6 bg-card border border-border rounded-2xl shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <Flame className="text-emerald-500" size={18} />
                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm md:text-base">
                  Wealth Growth &amp; Retirement Projections
                </h3>
              </div>
              <p className="text-xs text-muted-foreground">
                Optimizing your mutual fund compound goals based on your saved SIP values:
              </p>
              <div className="space-y-3">
                <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-border text-xs">
                  <span className="font-bold text-slate-700 dark:text-slate-200">The Step-Up SIP (10% rule)</span>
                  <p className="text-muted-foreground mt-1">
                    Increasing your monthly investment by just 10% every year (Step-up SIP) matches your career growth and can double your future wealth compared to a fixed SIP.
                  </p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-border text-xs">
                  <span className="font-bold text-slate-700 dark:text-slate-200">Tax Harvest Index Gains</span>
                  <p className="text-muted-foreground mt-1">
                    Keep Equity LTCG tax in check. Redeem up to ₹1.25 Lakhs of mutual fund gains every financial year at 0% tax rate to refresh your cost basis.
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          {/* 3. TAX SAVINGS */}
          {hasTax ? (
            <div className="p-6 bg-card border border-border rounded-2xl shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <Lightbulb className="text-amber-500" size={18} />
                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm md:text-base">
                  Tax Deductions &amp; Regime Advice
                </h3>
              </div>
              <p className="text-xs text-muted-foreground">
                Maximize take-home salary and save taxes for Indian slabs:
              </p>
              <div className="space-y-3">
                <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-border text-xs">
                  <span className="font-bold text-slate-700 dark:text-slate-200">Maximize Section 80CCD(1B)</span>
                  <p className="text-muted-foreground mt-1">
                    Invest an additional ₹50,000 in NPS (National Pension Scheme). This deduction is over and above the ₹1.5 Lakhs limit of Section 80C, saving up to ₹15,600 tax for the 30% slab.
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          {/* Generic default insights */}
          {!hasEmi && !hasSip && !hasTax && (
            <div className="p-8 bg-card border border-border rounded-2xl shadow-sm text-center space-y-4">
              <Lightbulb className="mx-auto text-amber-400 h-10 w-10" />
              <div>
                <h3 className="font-bold text-slate-800 dark:text-slate-200 text-base">No Custom Insights Available Yet</h3>
                <p className="text-xs text-muted-foreground mt-1.5 max-w-sm mx-auto">
                  Save some calculations (like EMI, SIP, or Tax) on the dashboard, and CalcPilot will generate customized debt and tax optimization advice for you.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Financial Checklists / Offers */}
        <div className="space-y-6">
          <div className="bg-card border border-border p-5 rounded-2xl shadow-sm space-y-4">
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Info size={16} className="text-primary" /> Health Checklist
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex gap-2.5 items-start">
                <Check className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                <div>
                  <span className="font-bold text-slate-700 dark:text-slate-300">Emergency Fund Buffer</span>
                  <p className="text-muted-foreground mt-0.5">Maintain at least 6 months of fixed monthly outgoings in liquid savings.</p>
                </div>
              </div>

              <div className="flex gap-2.5 items-start">
                <Check className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                <div>
                  <span className="font-bold text-slate-700 dark:text-slate-300">Term Insurance Coverage</span>
                  <p className="text-muted-foreground mt-0.5">Secure a term cover equal to at least 10x to 15x of your gross annual salary.</p>
                </div>
              </div>
            </div>
          </div>

          <AdBanner placement="insights_sponsored" />
        </div>
      </div>
    </div>
  );
}
