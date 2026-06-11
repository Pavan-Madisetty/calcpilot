import React from 'react';
import type { Metadata } from 'next';
import LoanEligibilityCalculator from '../../../components/calculators/LoanEligibilityCalculator';
import PublicLayout from '../../../components/PublicLayout';
import CalculatorsLayout from '../../../components/CalculatorsLayout';

export const metadata: Metadata = {
  title: 'Loan Eligibility Calculator - Check Maximum Borrowing Limit',
  description: 'Determine your maximum home, personal, or car loan borrowing capacity with our free bank eligibility estimator. Calculate FOIR and debt-to-income (DTI) ratings.',
  keywords: ['Loan Eligibility', 'Home Loan Eligibility', 'DTI Calculator', 'FOIR Cap Limit', 'Borrowing Capacity Estimator'],
  alternates: {
    canonical: 'https://zeroemi.in/calculators/loan-eligibility',
  },
  openGraph: {
    title: 'Loan Eligibility Calculator - ZeroEMI',
    description: 'Assess maximum bank sanction capacity and debt-to-income (DTI) ratings instantly.',
    url: 'https://zeroemi.in/calculators/loan-eligibility',
    type: 'website',
  },
};

export default function LoanEligibilityCalculatorPage() {
  const schemaApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Loan Eligibility Calculator - ZeroEMI',
    'description': 'Assess maximum bank sanction capacity and debt-to-income (DTI) ratings.',
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
        'name': 'What is FOIR (Fixed Obligation to Income Ratio)?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'FOIR, also known as Debt-to-Income (DTI) ratio, is a metric used by banks to determine a borrower\'s repayment capacity. It calculates the percentage of your monthly income that is currently spent on paying fixed debts (like existing EMIs and rents).'
        }
      },
      {
        '@type': 'Question',
        'name': 'How do banks calculate maximum loan eligibility?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Banks generally restrict your total monthly obligations (existing EMIs + proposed EMI) to a maximum of 40% to 60% of your net monthly salary (the FOIR limit). The remaining eligible EMI capacity is then used to compute the maximum principal loan amount you can borrow at the current rate.'
        }
      },
      {
        '@type': 'Question',
        'name': 'What is a healthy DTI/FOIR ratio for loan approval?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'A DTI ratio below 35% is considered Excellent. A ratio between 35% and 50% is Good/Moderate, while any ratio exceeding 50% is viewed as Risky/Overburdened by banks, which can lead to loan rejection or higher interest rates.'
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
        <LoanEligibilityCalculator />

        {/* Semantic SEO & AI Search Section */}
        <section className="mt-12 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
          <div>
            <h2 className="text-xl font-bold font-display text-slate-800">
              Frequently Asked Questions (FAQs)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Learn how bank loans are evaluated and how to optimize your approval chances.
            </p>
          </div>

          <div className="space-y-4">
            <details className="group border border-slate-100 rounded-2xl p-4 bg-slate-50/50 hover:bg-slate-50 transition cursor-pointer">
              <summary className="font-semibold text-xs md:text-sm text-slate-800 flex justify-between items-center list-none">
                What is FOIR (Fixed Obligation to Income Ratio)?
                <span className="text-indigo-600 font-bold group-open:rotate-180 transition-transform duration-200">▼</span>
              </summary>
              <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                FOIR, also known as Debt-to-Income (DTI) ratio, is a metric used by banks to determine a borrower's repayment capacity. It calculates the percentage of your monthly income that is currently spent on paying fixed debts (like existing EMIs, rents, and insurance policies).
              </p>
            </details>

            <details className="group border border-slate-100 rounded-2xl p-4 bg-slate-50/50 hover:bg-slate-50 transition cursor-pointer">
              <summary className="font-semibold text-xs md:text-sm text-slate-800 flex justify-between items-center list-none">
                How do banks calculate maximum loan eligibility?
                <span className="text-indigo-600 font-bold group-open:rotate-180 transition-transform duration-200">▼</span>
              </summary>
              <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                Banks generally restrict your total monthly obligations (existing EMIs + proposed EMI) to a maximum of 40% to 60% of your net monthly salary (the FOIR limit). The remaining eligible EMI capacity is then used to compute the maximum principal loan amount you can borrow at the current interest rate and tenure.
              </p>
            </details>

            <details className="group border border-slate-100 rounded-2xl p-4 bg-slate-50/50 hover:bg-slate-50 transition cursor-pointer">
              <summary className="font-semibold text-xs md:text-sm text-slate-800 flex justify-between items-center list-none">
                What is a healthy DTI/FOIR ratio for loan approval?
                <span className="text-indigo-600 font-bold group-open:rotate-180 transition-transform duration-200">▼</span>
              </summary>
              <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                A DTI ratio below 35% is considered Excellent. A ratio between 35% and 50% is Good/Moderate, while any ratio exceeding 50% is viewed as Risky/Overburdened by banks, which can lead to loan rejection or higher interest rates.
              </p>
            </details>
          </div>
        </section>
      </CalculatorsLayout>
    </PublicLayout>
  );
}
