import React from 'react';
import type { Metadata } from 'next';
import SipCalculator from '../../../components/calculators/SipCalculator';
import PublicLayout from '../../../components/PublicLayout';
import CalculatorsLayout from '../../../components/CalculatorsLayout';

export const metadata: Metadata = {
  title: 'SIP Calculator - Project Wealth & Mutual Fund Growth',
  description: 'Estimate the future value of your monthly mutual fund or equity SIP investments with our free SIP growth calculator. View yearly compound interest distributions.',
  keywords: ['SIP Calculator', 'Mutual Fund Calculator', 'Compound Interest', 'SIP Wealth Projection', 'Investment Returns'],
  alternates: {
    canonical: 'https://Pavan-Madisetty.github.io/calcpilot/calculators/sip',
  },
  openGraph: {
    title: 'SIP Mutual Fund Calculator - CalcPilot',
    description: 'Project future compound growth and wealth gained from monthly mutual fund SIPs instantly.',
    url: 'https://Pavan-Madisetty.github.io/calcpilot/calculators/sip',
    type: 'website',
  },
};

export default function SipCalculatorPage() {
  const schemaApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'SIP Calculator - CalcPilot',
    'description': 'Project future compound growth wealth gained from monthly mutual fund SIPs.',
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
        'name': 'What is a Systematic Investment Plan (SIP)?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'A Systematic Investment Plan (SIP) is a method of investing in mutual funds where a fixed sum of money is invested at regular intervals (usually monthly), rather than making a one-time lump-sum payment.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Is compound growth guaranteed in mutual funds?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'No, mutual fund investments are subject to market risks, and returns are not guaranteed. However, historical performance shows that long-term equity mutual fund investments tend to offer competitive compounding returns.'
        }
      },
      {
        '@type': 'Question',
        'name': 'How is the maturity value calculated in an SIP?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'The maturity value is calculated using the formula: FV = P × [((1 + i)^n - 1) / i] × (1 + i), where P is the monthly investment amount, i is the periodic interest rate (annual return divided by 12), and n is the total number of payments.'
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
        <SipCalculator />

        {/* Semantic SEO & AI Search Section */}
        <section className="mt-12 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
          <div>
            <h2 className="text-xl font-bold font-display text-slate-800">
              Frequently Asked Questions (FAQs)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Find answers to commonly asked questions about Systematic Investment Plans (SIP) and compounding growth.
            </p>
          </div>

          <div className="space-y-4">
            <details className="group border border-slate-100 rounded-2xl p-4 bg-slate-50/50 hover:bg-slate-50 transition cursor-pointer">
              <summary className="font-semibold text-xs md:text-sm text-slate-800 flex justify-between items-center list-none">
                What is a Systematic Investment Plan (SIP)?
                <span className="text-indigo-600 font-bold group-open:rotate-180 transition-transform duration-200">▼</span>
              </summary>
              <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                A Systematic Investment Plan (SIP) is a method of investing in mutual funds where a fixed sum of money is invested at regular intervals (usually monthly), rather than making a one-time lump-sum payment.
              </p>
            </details>

            <details className="group border border-slate-100 rounded-2xl p-4 bg-slate-50/50 hover:bg-slate-50 transition cursor-pointer">
              <summary className="font-semibold text-xs md:text-sm text-slate-800 flex justify-between items-center list-none">
                Is compound growth guaranteed in mutual funds?
                <span className="text-indigo-600 font-bold group-open:rotate-180 transition-transform duration-200">▼</span>
              </summary>
              <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                No, mutual fund investments are subject to market risks, and returns are not guaranteed. However, historical performance shows that long-term equity mutual fund investments tend to offer competitive compounding returns over 5 to 10+ year horizons.
              </p>
            </details>

            <details className="group border border-slate-100 rounded-2xl p-4 bg-slate-50/50 hover:bg-slate-50 transition cursor-pointer">
              <summary className="font-semibold text-xs md:text-sm text-slate-800 flex justify-between items-center list-none">
                How is the maturity value calculated in an SIP?
                <span className="text-indigo-600 font-bold group-open:rotate-180 transition-transform duration-200">▼</span>
              </summary>
              <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                The maturity value is calculated using the formula: <code className="bg-slate-100 px-1 py-0.5 rounded">FV = P × [((1 + i)^n - 1) / i] × (1 + i)</code>, where P is the monthly investment amount, i is the periodic interest rate (annual return rate divided by 12), and n is the total number of months (tenure years × 12).
              </p>
            </details>
          </div>
        </section>
      </CalculatorsLayout>
    </PublicLayout>
  );
}
