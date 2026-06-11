import React from 'react';
import type { Metadata } from 'next';
import SalaryTaxCalculator from '../../../components/calculators/SalaryTaxCalculator';
import PublicLayout from '../../../components/PublicLayout';
import CalculatorsLayout from '../../../components/CalculatorsLayout';

export const metadata: Metadata = {
  title: 'Salary Income Tax Calculator FY 2025-26 & 2026-27 - Old vs New Slabs',
  description: 'Compare Old vs New Indian Income Tax regime slabs side-by-side for FY 2025-26 and FY 2026-27. Compute HRA exemptions, Section 80C, 80D, and optimize salary deductions.',
  keywords: ['Income Tax Calculator', 'Old vs New Tax Slabs', 'FY 2025-26 Tax Calculator', 'India Tax Exemptions', 'Standard Deduction'],
  alternates: {
    canonical: 'https://zeroemi.in/calculators/tax',
  },
  openGraph: {
    title: 'Salary Income Tax Calculator - ZeroEMI',
    description: 'Compare Old vs New Indian Income Tax regimes with dynamic deductions assessment side-by-side.',
    url: 'https://zeroemi.in/calculators/tax',
    type: 'website',
  },
};

export default function SalaryTaxCalculatorPage() {
  const schemaApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Salary Income Tax Calculator - ZeroEMI',
    'description': 'Compare Old vs New Indian Income Tax regimes side-by-side with dynamic deductions assessment.',
    'applicationCategory': 'FinanceApplication',
    'operatingSystem': 'All',
    'browserRequirements': 'Requires JavaScript',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'INR'
    }
  };

  const schemaFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'Which is better: Old or New Tax Regime?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'It depends on your deductions. The New Regime offers lower tax rates but no exemptions. If you claim significant tax exemptions (HRA, Section 80C, 80D, Home Loan Interest), the Old Regime might save you more. Otherwise, the New Regime is generally more beneficial for most salaried professionals.'
        }
      },
      {
        '@type': 'Question',
        'name': 'What is the Standard Deduction for FY 2025-26 and FY 2026-27?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Salaried employees receive a flat Standard Deduction of ₹50,000 under the Old Tax Regime and ₹75,000 under the New Tax Regime (increased from ₹50,000 in recent budgets).'
        }
      },
      {
        '@type': 'Question',
        'name': 'Can I claim HRA or Home Loan Interest under the New Tax Regime?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'No. House Rent Allowance (HRA) exemptions, Section 24(b) Home Loan Interest deductions for self-occupied properties, and Section 80C deductions are not allowed under the New Tax Regime. They are exclusively available under the Old Tax Regime.'
        }
      }
    ]
  };

  return (
    <PublicLayout>
      <CalculatorsLayout>
        {/* Structured Data Script Tags */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaApp) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }}
        />

        {/* Core Calculator */}
        <SalaryTaxCalculator />

        {/* Semantic SEO & AI Search Section */}
        <section className="mt-12 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
          <div>
            <h2 className="text-xl font-bold font-display text-slate-800">
              Frequently Asked Questions (FAQs)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Find answers to commonly asked questions about tax slabs, deductions, and exemptions.
            </p>
          </div>

          <div className="space-y-4">
            <details className="group border border-slate-100 rounded-2xl p-4 bg-slate-50/50 hover:bg-slate-50 transition cursor-pointer">
              <summary className="font-semibold text-xs md:text-sm text-slate-800 flex justify-between items-center list-none">
                Which is better: Old or New Tax Regime?
                <span className="text-indigo-600 font-bold group-open:rotate-180 transition-transform duration-200">▼</span>
              </summary>
              <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                It depends entirely on your eligible deductions. The New Tax Regime offers lower slab rates but eliminates exemptions. If you claim significant exemptions—such as House Rent Allowance (HRA), Section 80C investments (PF, ELSS, LIC), Section 80D medical insurance, and Home Loan interest—the Old Regime might save you more money. If you don't invest in tax-saving instruments, the New Regime is typically the optimal and simpler choice.
              </p>
            </details>

            <details className="group border border-slate-100 rounded-2xl p-4 bg-slate-50/50 hover:bg-slate-50 transition cursor-pointer">
              <summary className="font-semibold text-xs md:text-sm text-slate-800 flex justify-between items-center list-none">
                What is the Standard Deduction for FY 2025-26 and FY 2026-27?
                <span className="text-indigo-600 font-bold group-open:rotate-180 transition-transform duration-200">▼</span>
              </summary>
              <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                Salaried individuals receive an automatic flat Standard Deduction:
                <br />
                • **Old Tax Regime**: ₹50,000
                <br />
                • **New Tax Regime**: ₹75,000 (increased in recent union budgets to promote adoption of the New Tax slabs).
              </p>
            </details>

            <details className="group border border-slate-100 rounded-2xl p-4 bg-slate-50/50 hover:bg-slate-50 transition cursor-pointer">
              <summary className="font-semibold text-xs md:text-sm text-slate-800 flex justify-between items-center list-none">
                Can I claim HRA or Home Loan Interest under the New Tax Regime?
                <span className="text-indigo-600 font-bold group-open:rotate-180 transition-transform duration-200">▼</span>
              </summary>
              <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                No. Popular exemptions like House Rent Allowance (HRA), Section 24(b) Home Loan Interest on self-occupied properties, and Chapter VI-A investments (80C, 80D, 80E) are **disallowed** under the New Tax Regime. They are exclusively available if you opt for the Old Tax Slabs.
              </p>
            </details>
          </div>
        </section>
      </CalculatorsLayout>
    </PublicLayout>
  );
}
