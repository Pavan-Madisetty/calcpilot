import React from 'react';
import type { Metadata } from 'next';
import EmiCalculator from '../components/calculators/EmiCalculator';
import PublicLayout from '../components/PublicLayout';
import CalculatorsLayout from '../components/CalculatorsLayout';

export const metadata: Metadata = {
  title: 'EMI Loan Calculator - Calculate Monthly EMIs & Amortization',
  description: 'Estimate your monthly loan payments, interest charges, and total payback with our free EMI Loan Calculator. View complete yearly amortization schedules.',
  keywords: ['EMI Calculator', 'Loan Calculator', 'Home Loan EMI', 'Personal Loan EMI', 'Amortization Breakdowns'],
  alternates: {
    canonical: 'https://zeroemi.in',
  },
  openGraph: {
    title: 'EMI Loan Calculator - ZeroEMI',
    description: 'Calculate monthly loan EMIs and view full amortization breakdown schedules instantly.',
    url: 'https://zeroemi.in',
    type: 'website',
  },
};

export default function EmiCalculatorPage() {
  const schemaApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'EMI Loan Calculator - ZeroEMI',
    'description': 'Compute monthly loan EMIs, interest details, and view full amortization logs.',
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
        'name': 'What is an Equated Monthly Installment (EMI)?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'An Equated Monthly Installment (EMI) is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMIs are used to pay off both interest and principal each month so that over a specified number of years, the loan is paid off in full.'
        }
      },
      {
        '@type': 'Question',
        'name': 'How is loan interest calculated in an EMI?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Interest is calculated on the outstanding loan balance. In the early months of the loan, a larger portion of each EMI goes toward paying interest. As the principal is paid down over time, a larger portion goes toward the principal.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Can I reduce my monthly EMI?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes, you can lower your EMI by: (1) making a larger down payment, (2) extending the loan tenure (though this increases total interest paid), (3) negotiating a lower interest rate, or (4) making prepayments toward the principal balance.'
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
        <EmiCalculator />

        {/* Semantic SEO & AI Search Section */}
        <section className="mt-12 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
          <div>
            <h2 className="text-xl font-bold font-display text-slate-800">
              Frequently Asked Questions (FAQs)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Find answers to commonly asked questions about loans, interest rates, and EMI payments.
            </p>
          </div>

          <div className="space-y-4">
            <details className="group border border-slate-100 rounded-2xl p-4 bg-slate-50/50 hover:bg-slate-50 transition cursor-pointer">
              <summary className="font-semibold text-xs md:text-sm text-slate-800 flex justify-between items-center list-none">
                What is an Equated Monthly Installment (EMI)?
                <span className="text-indigo-600 font-bold group-open:rotate-180 transition-transform duration-200">▼</span>
              </summary>
              <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                An Equated Monthly Installment (EMI) is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMIs are used to pay off both interest and principal each month so that over a specified number of years, the loan is paid off in full.
              </p>
            </details>

            <details className="group border border-slate-100 rounded-2xl p-4 bg-slate-50/50 hover:bg-slate-50 transition cursor-pointer">
              <summary className="font-semibold text-xs md:text-sm text-slate-800 flex justify-between items-center list-none">
                How is loan interest calculated in an EMI?
                <span className="text-indigo-600 font-bold group-open:rotate-180 transition-transform duration-200">▼</span>
              </summary>
              <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                Interest is calculated on the outstanding loan balance. In the early months of the loan, a larger portion of each EMI goes toward paying interest. As the principal is paid down over time, a larger portion goes toward the principal.
              </p>
            </details>

            <details className="group border border-slate-100 rounded-2xl p-4 bg-slate-50/50 hover:bg-slate-50 transition cursor-pointer">
              <summary className="font-semibold text-xs md:text-sm text-slate-800 flex justify-between items-center list-none">
                Can I reduce my monthly EMI?
                <span className="text-indigo-600 font-bold group-open:rotate-180 transition-transform duration-200">▼</span>
              </summary>
              <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                Yes, you can lower your EMI by: (1) making a larger down payment, (2) extending the loan tenure (though this increases total interest paid), (3) negotiating a lower interest rate, or (4) making prepayments toward the principal balance.
              </p>
            </details>
          </div>
        </section>
      </CalculatorsLayout>
    </PublicLayout>
  );
}
