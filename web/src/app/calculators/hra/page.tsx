import React from 'react';
import type { Metadata } from 'next';
import HraCalculator from '../../../components/calculators/HraCalculator';
import PublicLayout from '../../../components/PublicLayout';
import CalculatorsLayout from '../../../components/CalculatorsLayout';

export const metadata: Metadata = {
  title: 'HRA Calculator FY 2025-26 - Calculate House Rent Allowance Tax Exemption',
  description: 'Calculate your taxable and tax-exempt HRA under Section 10(13A) of Indian Income Tax rules. Enter basic salary, HRA received, and rent paid to save tax.',
  keywords: ['HRA Calculator', 'House Rent Allowance Exemption', 'Section 10(13A) Tax Relief', 'Metro City HRA Calculator', 'Income Tax Savings India'],
  alternates: {
    canonical: 'https://zeroemi.in/calculators/hra',
  },
  openGraph: {
    title: 'HRA Exemption Calculator FY 2025-26 - ZeroEMI',
    description: 'Enter your basic salary, HRA allowance, and rent details to instantly compute your tax-exempt house rent allowance.',
    url: 'https://zeroemi.in/calculators/hra',
    type: 'website',
  },
};

export default function HraPage() {
  const schemaApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'HRA Exemption Calculator - ZeroEMI',
    'description': 'Compute house rent allowance tax exemptions under Section 10(13A) of Indian Income Tax rules.',
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
        'name': 'How is HRA tax exemption calculated?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'HRA exemption is the minimum of three conditions: (1) Actual HRA received from your employer, (2) Rent paid minus 10% of basic salary, or (3) 50% of basic salary in metro cities (40% in non-metro cities).'
        }
      },
      {
        '@type': 'Question',
        'name': 'Can I claim HRA if I live with my parents?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes, you can claim HRA by paying rent to your parents. You must sign a formal rental agreement, transfer rent to their bank account monthly, and they must declare this rent as income when filing their income tax returns.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Is landlord PAN card mandatory to claim HRA?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes, if your annual rent payments exceed ₹1,00,000 (roughly ₹8,333 per month), it is mandatory to provide your landlord\'s PAN card details to your employer to claim HRA tax benefits.'
        }
      }
    ]
  };

  return (
    <PublicLayout>
      <CalculatorsLayout>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaApp) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }}
        />

        {/* Core Calculator Component */}
        <HraCalculator />

        {/* SEO Informational Content */}
        <section className="mt-12 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-8 shadow-sm">
          
          {/* Header */}
          <div className="border-b border-slate-100 pb-6">
            <h1 className="text-2xl md:text-3xl font-extrabold font-display text-slate-800 leading-tight">
              House Rent Allowance (HRA) Exemption Guide: Section 10(13A)
            </h1>
            <p className="text-sm text-slate-500 mt-2">
              Learn how rent payments can lower your taxable salary, master the three-rule HRA exemption formula, and understand documentation requirements.
            </p>
          </div>

          {/* Section 1 */}
          <div className="space-y-4">
            <h2 className="text-lg md:text-xl font-bold font-display text-slate-800">
              What is House Rent Allowance (HRA)?
            </h2>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              **House Rent Allowance (HRA)** is a component of the salary structure provided by employers to help employees meet the cost of rented accommodation. Under the Indian Income Tax Act, Section 10(13A) allows salaried individuals to deduct a portion of their HRA from their taxable income, lowering their total tax liability.
            </p>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              It is important to understand that HRA tax exemption is **only available under the Old Tax Regime**. If you opt for the New Tax Regime, HRA is fully taxable, and rent payments cannot be claimed as tax-saving exemptions.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-4">
            <h2 className="text-lg md:text-xl font-bold font-display text-slate-800">
              The Three-Rule HRA Exemption Formula
            </h2>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              The amount of HRA exempt from income tax is solved by evaluating three rules. The actual exemption given is the **lowest** of the following three values:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50">
                <h4 className="font-bold text-slate-800 text-xs md:text-sm mb-1.5 text-indigo-600">Rule 1: Actual HRA Received</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  The actual house rent allowance component specified in your CTC structure and paid by your employer.
                </p>
              </div>
              <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50">
                <h4 className="font-bold text-slate-800 text-xs md:text-sm mb-1.5 text-indigo-600">Rule 2: Rent Paid - 10% of Basic</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  The total rent paid by you minus 10% of your Basic Salary (plus Dearness Allowance, if any).
                </p>
              </div>
              <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50">
                <h4 className="font-bold text-slate-800 text-xs md:text-sm mb-1.5 text-indigo-600">Rule 3: City Population Cap</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  <strong>50%</strong> of your Basic salary if you live in a Metro city (Delhi, Mumbai, Kolkata, Chennai). <strong>40%</strong> of basic salary if you reside in any other city.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3 - Example */}
          <div className="space-y-4 bg-indigo-50/30 border border-indigo-100/50 rounded-2xl p-6">
            <h3 className="text-base font-bold font-display text-indigo-900">
              Example Walkthrough: Renting an Apartment in Bangalore
            </h3>
            <div className="space-y-2 text-xs md:text-sm text-slate-700 leading-relaxed">
              <p>Consider an employee residing in Bangalore (Non-Metro for HRA classification) with the following monthly details:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Basic Salary:</strong> ₹50,000/month</li>
                <li><strong>HRA Received:</strong> ₹20,000/month</li>
                <li><strong>Rent Paid:</strong> ₹18,000/month</li>
              </ul>
              <p className="mt-3">Let&apos;s apply the three rules on an annual basis:</p>
              <ol className="list-decimal pl-5 space-y-1">
                <li><strong>Rule 1 (Actual HRA):</strong> ₹2,40,000</li>
                <li><strong>Rule 2 (Rent Paid - 10% Basic):</strong> Rent paid (₹2,16,000) - 10% of Basic (₹60,000) = <strong>₹1,56,000</strong></li>
                <li><strong>Rule 3 (4% Basic cap since Bangalore is Non-Metro):</strong> 40% of Basic = <strong>₹2,40,000</strong></li>
              </ol>
              <p className="mt-3">
                The minimum of these three is <strong>₹1,56,000</strong>. This is your **Exempted HRA**.
                <br />
                Your **Taxable HRA** will be: ₹2,40,000 - ₹1,56,000 = <strong>₹84,000 per year</strong>.
              </p>
            </div>
          </div>

          {/* Section 4 */}
          <div className="space-y-4">
            <h2 className="text-lg md:text-xl font-bold font-display text-slate-800">
              Mandatory Documents Required to Claim HRA
            </h2>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              To successfully claim HRA tax relief and avoid getting your claim rejected during an IT audit, you must maintain the following records:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs md:text-sm text-slate-600">
              <li><strong>Rent Receipts</strong>: Duly signed rent receipts containing rent paid, name of the tenant, landlord name, address of the rented house, and revenue stamp (for cash payments over ₹5,000).</li>
              <li><strong>Rent Agreement</strong>: A written agreement between you and the landlord stating the lease term, monthly rent, and other conditions.</li>
              <li><strong>Landlord PAN Card</strong>: If your annual rent paid exceeds **₹1,00,000**, you must submit your landlord&apos;s PAN card number to your employer. If the landlord does not have a PAN card, a signed declaration (Form 60) is required.</li>
            </ul>
          </div>

          {/* Section 5 - Special scenarios */}
          <div className="space-y-4">
            <h2 className="text-lg md:text-xl font-bold font-display text-slate-800">
              Special HRA Claims Scenarios
            </h2>
            <div className="space-y-3">
              <div className="border-l-4 border-indigo-500 pl-4 py-1">
                <h4 className="font-bold text-slate-800 text-xs md:text-sm">Paying Rent to Parents</h4>
                <p className="text-xs text-slate-500 leading-relaxed mt-1">
                  You can claim HRA by renting your parent&apos;s house. You must pay rent via bank transfer monthly, sign a rental agreement, and your parents must declare that rent as rental income in their annual income tax returns.
                </p>
              </div>
              <div className="border-l-4 border-indigo-500 pl-4 py-1">
                <h4 className="font-bold text-slate-800 text-xs md:text-sm">HRA Exemption and Home Loan Benefits Simulatneously</h4>
                <p className="text-xs text-slate-500 leading-relaxed mt-1">
                  Yes, you can claim both! If you live in a rented flat in one city (due to work) but bought a house in another city with a home loan, you can claim HRA exemption for the rent paid, alongside Section 24(b) interest and 80C principal tax exemptions.
                </p>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className="space-y-4">
            <h3 className="text-base font-bold font-display text-slate-800">
              Frequently Asked Questions (FAQs)
            </h3>
            <div className="space-y-3">
              <details className="group border border-slate-100 rounded-xl p-4 bg-slate-50/50 hover:bg-slate-50 transition cursor-pointer">
                <summary className="font-semibold text-xs md:text-sm text-slate-800 flex justify-between items-center list-none">
                  Can I claim HRA if I live in my own house?
                  <span className="text-indigo-600 font-bold group-open:rotate-180 transition-transform duration-200">▼</span>
                </summary>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  No, you cannot claim HRA exemption if you live in your own house or if you do not pay any rent. Under these conditions, the HRA component of your salary is fully taxable.
                </p>
              </details>

              <details className="group border border-slate-100 rounded-xl p-4 bg-slate-50/50 hover:bg-slate-50 transition cursor-pointer">
                <summary className="font-semibold text-xs md:text-sm text-slate-800 flex justify-between items-center list-none">
                  What if my landlord does not have a PAN card?
                  <span className="text-indigo-600 font-bold group-open:rotate-180 transition-transform duration-200">▼</span>
                </summary>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  If your landlord does not have a PAN card, you must obtain a signed declaration from them using Form 60, along with their address and contact details, and submit it to your employer.
                </p>
              </details>

              <details className="group border border-slate-100 rounded-xl p-4 bg-slate-50/50 hover:bg-slate-50 transition cursor-pointer">
                <summary className="font-semibold text-xs md:text-sm text-slate-800 flex justify-between items-center list-none">
                  Can husband and wife claim HRA on the same house?
                  <span className="text-indigo-600 font-bold group-open:rotate-180 transition-transform duration-200">▼</span>
                </summary>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  If both work and are paying rent, they can split the HRA exemption. However, they must show separate rental transactions (e.g. paying different portions of the rent to the landlord) and have separate rent receipts for their respective shares.
                </p>
              </details>
            </div>
          </div>

          {/* Cross links */}
          <div className="border-t border-slate-100 pt-6">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Other Useful Tax &amp; Salary Tools</h4>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'In-Hand Salary Calculator', href: '/calculators/in-hand-salary' },
                { label: 'No Cost EMI Decoder', href: '/calculators/no-cost-emi' },
                { label: 'Standard EMI Calculator', href: '/calculators/emi' },
                { label: 'Salary Tax Calculator', href: '/calculators/tax' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-3 py-1.5 bg-slate-50 hover:bg-indigo-50 border border-slate-100 hover:border-indigo-100 text-slate-600 hover:text-indigo-600 rounded-lg text-xs font-semibold transition"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

        </section>
      </CalculatorsLayout>
    </PublicLayout>
  );
}
