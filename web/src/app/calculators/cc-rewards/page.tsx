import React from 'react';
import type { Metadata } from 'next';
import CreditCardRewardsCalculator from '../../../components/calculators/CreditCardRewardsCalculator';
import PublicLayout from '../../../components/PublicLayout';
import CalculatorsLayout from '../../../components/CalculatorsLayout';

export const metadata: Metadata = {
  title: 'Credit Card Rewards Calculator - Optimize Points & Air Miles',
  description: 'Evaluate points, airline miles, cashback, and net yield percentages across premium Indian credit cards (HDFC Infinia, Axis Atlas, SBI Card). Optimize your category spends.',
  keywords: ['Credit Card Rewards', 'Points Calculator', 'Airlines Miles Transfer', 'Indian Credit Cards Comparison', 'Cashback Rate Yield'],
  alternates: {
    canonical: 'https://Pavan-Madisetty.github.io/calcpilot/calculators/cc-rewards',
  },
  openGraph: {
    title: 'Credit Card Rewards Calculator - CalcPilot',
    description: 'Optimize points, air miles, and cashbacks across premium credit cards based on your spending patterns.',
    url: 'https://Pavan-Madisetty.github.io/calcpilot/calculators/cc-rewards',
    type: 'website',
  },
};

export default function CreditCardRewardsCalculatorPage() {
  const schemaApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Credit Card Rewards Calculator - CalcPilot',
    'description': 'Evaluate points, airline miles, and yields across premium Indian credit cards.',
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
        'name': 'How do credit card reward points work?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Credit cards offer points or cashback on monthly transactions. Premium cards offer accelerated rewards on specific spending categories like travel, dining, or online shopping. The value of these points depends on how you redeem them.'
        }
      },
      {
        '@type': 'Question',
        'name': 'What is the reward yield rate?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'The reward yield rate is the percentage value you get back from your spending. For example, if you spend ₹10,000 and earn reward points worth ₹300, your effective reward rate or net yield is 3.0%.'
        }
      },
      {
        '@type': 'Question',
        'name': 'How do point transfers to airlines and hotels work?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Premium cards allow you to transfer reward points to airline loyalty programs (like Vistara, Singapore KrisFlyer) and hotel programs (like Marriott Bonvoy) at a specified conversion ratio (e.g. 1:1 or 5:4). This often provides much higher redemption value than cashback.'
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
        <CreditCardRewardsCalculator />

        {/* Semantic SEO & AI Search Section */}
        <section className="mt-12 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
          <div>
            <h2 className="text-xl font-bold font-display text-slate-800">
              Frequently Asked Questions (FAQs)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Maximize your credit card perks and optimize redemption values.
            </p>
          </div>

          <div className="space-y-4">
            <details className="group border border-slate-100 rounded-2xl p-4 bg-slate-50/50 hover:bg-slate-50 transition cursor-pointer">
              <summary className="font-semibold text-xs md:text-sm text-slate-800 flex justify-between items-center list-none">
                How do credit card reward points work?
                <span className="text-indigo-600 font-bold group-open:rotate-180 transition-transform duration-200">▼</span>
              </summary>
              <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                Credit cards reward your transactions with points or cashback. Premium cards offer accelerated rewards on specific spending categories like travel, dining, or online shopping (e.g. 5x or 10x points). The actual value of these points depends on redemption choices (e.g., flight bookings, shopping vouchers, or statement credit).
              </p>
            </details>

            <details className="group border border-slate-100 rounded-2xl p-4 bg-slate-50/50 hover:bg-slate-50 transition cursor-pointer">
              <summary className="font-semibold text-xs md:text-sm text-slate-800 flex justify-between items-center list-none">
                What is the reward yield rate?
                <span className="text-indigo-600 font-bold group-open:rotate-180 transition-transform duration-200">▼</span>
              </summary>
              <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                The reward yield rate is the net value percentage you get back from your expenditures. For example, if you spend ₹10,000 and earn reward points worth ₹300, your effective reward rate or net yield is 3.0%. Premium cards like HDFC Infinia can yield up to 15%+ on specific categories.
              </p>
            </details>

            <details className="group border border-slate-100 rounded-2xl p-4 bg-slate-50/50 hover:bg-slate-50 transition cursor-pointer">
              <summary className="font-semibold text-xs md:text-sm text-slate-800 flex justify-between items-center list-none">
                How do point transfers to airlines and hotels work?
                <span className="text-indigo-600 font-bold group-open:rotate-180 transition-transform duration-200">▼</span>
              </summary>
              <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                Many premium credit cards allow you to transfer reward points directly to international airline loyalty programs (like Singapore Airlines KrisFlyer, British Airways Executive Club) and hotel loyalty programs (like Marriott Bonvoy, IHG One Rewards) at specific conversion ratios (e.g. 1:1). Booking business class flights or luxury hotels using transferred points often yields a value of ₹1 to ₹3+ per point, far exceeding standard cashback options.
              </p>
            </details>
          </div>
        </section>
      </CalculatorsLayout>
    </PublicLayout>
  );
}
