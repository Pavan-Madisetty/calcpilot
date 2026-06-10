import React from 'react';
import type { Metadata } from 'next';
import ConstructionCostCalculator from '../../../components/calculators/ConstructionCostCalculator';
import PublicLayout from '../../../components/PublicLayout';
import CalculatorsLayout from '../../../components/CalculatorsLayout';

export const metadata: Metadata = {
  title: 'House Construction Cost Calculator - Building Cost Estimator',
  description: 'Estimate home construction costs, material requirements (cement, sand, bricks, steel), and labor charges instantly based on plot size and floors.',
  keywords: ['Construction Cost Calculator', 'Home Building Estimator', 'Civil Cost Calculator', 'Material Requirements sand bricks', 'Labor Cost Distribution'],
  alternates: {
    canonical: 'https://Pavan-Madisetty.github.io/calcpilot/calculators/construction',
  },
  openGraph: {
    title: 'Construction Cost Calculator - CalcPilot',
    description: 'Estimate home building cost, material requirements, and labor budgets dynamically.',
    url: 'https://Pavan-Madisetty.github.io/calcpilot/calculators/construction',
    type: 'website',
  },
};

export default function ConstructionCostCalculatorPage() {
  const schemaApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Construction Cost Calculator - CalcPilot',
    'description': 'Estimate home construction costs, material components, and labor charges.',
    'applicationCategory': 'ConstructionApplication',
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
        'name': 'How do you calculate home construction costs?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Home construction costs are calculated by multiplying the total built-up area (built-up area per floor × number of floors) by the average cost rate per square foot. The rate varies based on quality grade and geographical location.'
        }
      },
      {
        '@type': 'Question',
        'name': 'What is the difference between Standard, Premium, and Luxury quality grades?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Standard grade (~₹1,500/sqft) uses basic materials and fittings. Premium grade (~₹1,850/sqft) features branded fittings, vitrified tiles, and premium wiring. Luxury grade (~₹2,300/sqft) incorporates high-end wood accents, granite/marble, premium automation, and designer fittings.'
        }
      },
      {
        '@type': 'Question',
        'name': 'What is the budget distribution between materials and labor?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Generally, materials account for approximately 58% of the budget (cement, bricks, steel, sand, wood). Labor charges take up 25%, and finishes (fittings, paints, tiling) account for the remaining 17%.'
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
        <ConstructionCostCalculator />

        {/* Semantic SEO & AI Search Section */}
        <section className="mt-12 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
          <div>
            <h2 className="text-xl font-bold font-display text-slate-800">
              Frequently Asked Questions (FAQs)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Find answers to commonly asked questions about house construction budgets and civil material quantities.
            </p>
          </div>

          <div className="space-y-4">
            <details className="group border border-slate-100 rounded-2xl p-4 bg-slate-50/50 hover:bg-slate-50 transition cursor-pointer">
              <summary className="font-semibold text-xs md:text-sm text-slate-800 flex justify-between items-center list-none">
                How do you calculate home construction costs?
                <span className="text-indigo-600 font-bold group-open:rotate-180 transition-transform duration-200">▼</span>
              </summary>
              <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                Home construction costs are calculated by multiplying the total built-up area (built-up area per floor × number of floors) by the average cost rate per square foot. The rate varies based on quality grade, design specifications, and regional labor and material market rates.
              </p>
            </details>

            <details className="group border border-slate-100 rounded-2xl p-4 bg-slate-50/50 hover:bg-slate-50 transition cursor-pointer">
              <summary className="font-semibold text-xs md:text-sm text-slate-800 flex justify-between items-center list-none">
                What is the difference between Standard, Premium, and Luxury quality grades?
                <span className="text-indigo-600 font-bold group-open:rotate-180 transition-transform duration-200">▼</span>
              </summary>
              <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                • **Standard Grade** (~₹1,500/sqft): Basic building materials, standard cement, local bricks, and entry-level ceramic fittings.
                <br />
                • **Premium Grade** (~₹1,850/sqft): Quality structural concrete, branded vitrified tiles, branded plumbing/electrical fixtures, and premium exterior paints.
                <br />
                • **Luxury Grade** (~₹2,300/sqft): Top-tier Italian marble or granite flooring, teak wood, structural steel designs, high-end automated fixtures, and custom designer finishes.
              </p>
            </details>

            <details className="group border border-slate-100 rounded-2xl p-4 bg-slate-50/50 hover:bg-slate-50 transition cursor-pointer">
              <summary className="font-semibold text-xs md:text-sm text-slate-800 flex justify-between items-center list-none">
                What is the budget distribution between materials and labor?
                <span className="text-indigo-600 font-bold group-open:rotate-180 transition-transform duration-200">▼</span>
              </summary>
              <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                Typically, civil construction budgets follow a 58-25-17 rule of thumb:
                <br />
                • **Materials (58%)**: Cement, steel rebars, bricks, sand, aggregate, wood.
                <br />
                • **Labor (25%)**: Mason charges, excavation, civil contractors, supervisors.
                <br />
                • **Fittings & Finishing (17%)**: Sanitary ware, floor tiling, electrical wiring, paint, window assemblies.
              </p>
            </details>
          </div>
        </section>
      </CalculatorsLayout>
    </PublicLayout>
  );
}
