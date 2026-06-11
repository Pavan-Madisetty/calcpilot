import React from 'react';
import type { Metadata } from 'next';
import InHandSalaryCalculator from '../../../components/calculators/InHandSalaryCalculator';
import PublicLayout from '../../../components/PublicLayout';
import CalculatorsLayout from '../../../components/CalculatorsLayout';

export const metadata: Metadata = {
  title: 'In-Hand Salary Calculator FY 2025-26 - Calculate Take-Home Pay',
  description: 'Calculate your monthly take-home salary after all taxes, EPF, and deductions. Compare Old vs New Tax Regimes (FY 2025-26 slabs) side-by-side.',
  keywords: ['In-Hand Salary Calculator', 'Take Home Salary Calculator', 'CTC to In-Hand Calculator', 'Income Tax Slabs FY 2025-26', 'Net Salary Calculator'],
  alternates: {
    canonical: 'https://zeroemi.in/calculators/in-hand-salary',
  },
  openGraph: {
    title: 'In-Hand Salary Calculator FY 2025-26 - ZeroEMI',
    description: 'Find out exactly how much cash you will receive in hand every month. Compare Old and New tax regimes with deductions dynamically.',
    url: 'https://zeroemi.in/calculators/in-hand-salary',
    type: 'website',
  },
};

export default function InHandSalaryPage() {
  const schemaApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'In-Hand Salary Calculator - ZeroEMI',
    'description': 'Convert annual CTC to monthly take-home salary and compare Indian tax regimes.',
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
        'name': 'What is the difference between CTC and In-Hand Salary?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'CTC (Cost to Company) represents the total annual amount the company spends on you. It includes components you don\'t receive as cash, such as Employer PF, Gratuity, and insurance premiums. In-Hand Salary is the actual cash credited to your bank account monthly after deducting taxes, Employee PF, NPS, and professional tax.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Which tax regime is better for FY 2025-26?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'For FY 2025-26, the New Tax Regime is the default and offers lower tax rates, standard deduction of ₹75,000, and is generally better if you don\'t have high tax-saving investments. If you have significant rent, home loan interest, and high 80C/80D investments, the Old Regime might yield a higher take-home pay.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Is EPF deduction mandatory?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes, for most salaried employees in establishments with 20 or more workers, a mandatory 12% of basic salary is deducted as Employee PF, which is matched by the employer. The basic deduction can be capped at ₹1,800 per month (₹21,600 annually) at the employer\'s discretion.'
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
        <InHandSalaryCalculator />

        {/* SEO Informational Content */}
        <section className="mt-12 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-8 shadow-sm">
          
          {/* Header */}
          <div className="border-b border-slate-100 pb-6">
            <h1 className="text-2xl md:text-3xl font-extrabold font-display text-slate-800 leading-tight">
              In-Hand Salary Calculation Guide: From CTC to Net Take-Home
            </h1>
            <p className="text-sm text-slate-500 mt-2">
              Understand your salary slips, master CTC structure components, compare Old vs New tax slabs (FY 2025-26), and optimize your cash payout.
            </p>
          </div>

          {/* Section 1 */}
          <div className="space-y-4">
            <h2 className="text-lg md:text-xl font-bold font-display text-slate-800">
              What is In-Hand Salary and How does it differ from CTC?
            </h2>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              When an employer makes an offer, the salary is usually presented as **CTC (Cost to Company)**. CTC represents the cumulative amount of money an employer will spend on a worker over a year. It is important to note that **CTC is not your take-home pay**.
            </p>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              **In-Hand Salary** (or Net Salary) is the actual liquid cash deposited into your bank account at the end of each month. It is calculated by taking your gross salary and subtracting mandatory contributions (like Provident Fund, National Pension System, Professional Tax) and personal income tax withholdings (TDS).
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-4">
            <h2 className="text-lg md:text-xl font-bold font-display text-slate-800">
              Key Salary Slip Components Explained
            </h2>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              To fully decode your salary structure, you need to understand each component on your salary sheet:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs md:text-sm text-slate-600">
              <li>
                <strong>Basic Salary</strong>: The base core component of your salary, typically accounting for 40% to 50% of the total CTC. It is 100% taxable and serves as the baseline for calculating EPF, HRA, and Gratuity.
              </li>
              <li>
                <strong>House Rent Allowance (HRA)</strong>: Provided to meet house rent expenditures. HRA is partially or fully exempt from tax under Section 10(13A) if you live in rented accommodation and pay rent.
              </li>
              <li>
                <strong>Special Allowance</strong>: A balancing component added to fill the gap between the sum of other allowances and the total CTC. It is fully taxable.
              </li>
              <li>
                <strong>Employee Provident Fund (EPF)</strong>: A retirement savings fund. The employee contributes 12% of their basic salary, and the employer matches it. The employer portion is added to your CTC but deducted before payout.
              </li>
              <li>
                <strong>Gratuity</strong>: A statutory retirement benefit paid by the employer as a thank-you for long-term service (usually 5+ years). 4.81% of basic salary is commonly earmarked as gratuity inside CTC.
              </li>
              <li>
                <strong>Professional Tax (PT)</strong>: A minor state-level tax on salaried employment, capped at ₹2,500 per annum.
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="space-y-4">
            <h2 className="text-lg md:text-xl font-bold font-display text-slate-800">
              Old Tax Regime vs New Tax Regime (FY 2025-26 Slabs)
            </h2>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              India currently runs a dual-track tax filing system. The **New Tax Regime** has been set as the default option with lower tax brackets and higher slabs, but blocks almost all exemptions. The **Old Tax Regime** has higher rates but allows you to reduce taxable income using exemptions:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50">
                <h4 className="font-bold text-slate-800 text-xs md:text-sm mb-1 text-indigo-600">New Tax Regime (FY 2025-26)</h4>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-500 leading-relaxed">
                  <li>Standard deduction: <strong>₹75,000</strong></li>
                  <li>Incomes up to <strong>₹7,00,000</strong> are fully tax-free via Section 87A rebate.</li>
                  <li>Slabs: Up to 4L (Nil); 4-8L (5%); 8-12L (10%); 12-16L (15%); 16-20L (20%); Above 20L (30%).</li>
                  <li>No tax deductions for HRA, 80C, 80D, or home loans.</li>
                </ul>
              </div>

              <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50">
                <h4 className="font-bold text-slate-800 text-xs md:text-sm mb-1 text-slate-600">Old Tax Regime</h4>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-500 leading-relaxed">
                  <li>Standard deduction: <strong>₹50,000</strong></li>
                  <li>Incomes up to <strong>₹5,00,000</strong> are fully tax-free via rebate.</li>
                  <li>Slabs: Up to 2.5L (Nil); 2.5-5L (5%); 5-10L (20%); Above 10L (30%).</li>
                  <li>Allows tax exemptions for HRA, 80C (up to 1.5L), 80D (25k), home loan interest (2L), and NPS (50k).</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div className="space-y-4">
            <h2 className="text-lg md:text-xl font-bold font-display text-slate-800">
              Tax Optimization &amp; Savings Tips (Old Regime)
            </h2>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              If the Old Regime turns out to be more beneficial for you, you can maximize your monthly take-home salary by utilizing these deduction avenues:
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-xs md:text-sm text-slate-600">
              <li>
                <strong>Section 80C (Limit ₹1,50,000)</strong>: Includes your mandatory Employee Provident Fund contribution, Public Provident Fund (PPF), Equity Linked Savings Schemes (ELSS mutual funds), Life Insurance Premiums (LIC), and Home Loan Principal repayment.
              </li>
              <li>
                <strong>Section 80D (Limit ₹25,000 to ₹50,000)</strong>: Exemption on health insurance premiums paid for self, spouse, children (up to ₹25,000), and parents (up to an additional ₹25,000 or ₹50,000 if they are senior citizens).
              </li>
              <li>
                <strong>Section 80CCD(1B) (Limit ₹50,000)</strong>: Additional voluntary contribution into the National Pension Scheme (NPS) qualifies for a dedicated exemption over and above 80C.
              </li>
              <li>
                <strong>Section 24(b) (Limit ₹2,00,000)</strong>: Interest paid on home loans for self-occupied property can be deducted from taxable income.
              </li>
            </ol>
          </div>

          {/* Section 5 - Example Case */}
          <div className="space-y-4 bg-indigo-50/30 border border-indigo-100/50 rounded-2xl p-6">
            <h3 className="text-base font-bold font-display text-indigo-900">
              Example Scenario: ₹15,00,000 Annual CTC
            </h3>
            <div className="space-y-2 text-xs md:text-sm text-slate-700 leading-relaxed">
              <p>Let&apos;s calculate the monthly take-home for a salaried professional earning <strong>₹15 Lakhs CTC</strong>, assuming basic is 50%, HRA 40%, and standard EPF deductions apply:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Basic Salary:</strong> ₹7,50,000. <strong>HRA:</strong> ₹3,00,000. <strong>Bonus:</strong> ₹1,00,000.</li>
                <li><strong>Employer PF:</strong> ₹21,600 (deducted from CTC).</li>
                <li><strong>Gross Salary:</strong> ₹14,42,325 (deducting employer PF and gratuity from CTC).</li>
                <li><strong>Mandatory Deductions:</strong> Employee PF (₹21,600) + Professional Tax (₹2,500).</li>
                <li>
                  <strong>New Regime Tax (FY 2025-26):</strong> Taxable income = ₹14,42,325 - ₹75,000 = ₹13,67,325. Tax is ₹20,000 (4-8L) + ₹40,000 (8-12L) + ₹25,099 (12-16L) = ₹85,099. Adding 4% cess gives <strong>₹88,503</strong>.
                  <br />
                  <em>Net take-home under New Regime:</em> ₹14,42,325 - ₹21,600 - ₹2,500 - ₹88,503 = <strong>₹13,29,722 per year (₹1,10,810/month)</strong>.
                </li>
                <li>
                  <strong>Old Regime Tax:</strong> Assuming you claim 80C (1.5L), HRA exemption (say ₹1.8L), 80D (15k). Taxable income = ₹14,42,325 - ₹50,000 (Standard) - ₹3,45,000 (deductions) = ₹10,47,325. Total tax is <strong>₹1,31,765</strong>.
                  <br />
                  <em>Net take-home under Old Regime:</em> ₹14,42,325 - ₹21,600 - ₹2,500 - ₹1,31,765 = <strong>₹12,86,460 per year (₹1,07,205/month)</strong>.
                </li>
                <li><strong>Recommendation:</strong> Choose the <strong>New Tax Regime</strong> to save ₹3,605 per month (₹43,260 per year) in taxes!</li>
              </ul>
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
                  How does the Section 87A rebate work under the New Regime for FY 2025-26?
                  <span className="text-indigo-600 font-bold group-open:rotate-180 transition-transform duration-200">▼</span>
                </summary>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Under the New Regime (FY 2025-26), if your taxable income does not exceed ₹7,00,000 after standard deduction, you qualify for a 100% tax rebate under Section 87A. This makes your tax liability zero.
                </p>
              </details>

              <details className="group border border-slate-100 rounded-xl p-4 bg-slate-50/50 hover:bg-slate-50 transition cursor-pointer">
                <summary className="font-semibold text-xs md:text-sm text-slate-800 flex justify-between items-center list-none">
                  Can I change my tax regime selection during the financial year?
                  <span className="text-indigo-600 font-bold group-open:rotate-180 transition-transform duration-200">▼</span>
                </summary>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  For salaried employees, you can declare your preferred regime to your employer at the beginning of the year for TDS purposes. However, you can make the final choice when filing your Income Tax Return (ITR) at the end of the year, regardless of what you declared to your employer.
                </p>
              </details>

              <details className="group border border-slate-100 rounded-xl p-4 bg-slate-50/50 hover:bg-slate-50 transition cursor-pointer">
                <summary className="font-semibold text-xs md:text-sm text-slate-800 flex justify-between items-center list-none">
                  Is NPS Employer Contribution tax-exempt?
                  <span className="text-indigo-600 font-bold group-open:rotate-180 transition-transform duration-200">▼</span>
                </summary>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Yes, employer contributions to NPS under Section 80CCD(2) up to 10% of basic salary are deductible from taxable income under both Old and New regimes, which makes it an excellent tax-saving option.
                </p>
              </details>
            </div>
          </div>

          {/* Cross links */}
          <div className="border-t border-slate-100 pt-6">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Other Useful Tax &amp; Finance Tools</h4>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'HRA Exemption Calculator', href: '/calculators/hra' },
                { label: 'No Cost EMI Decoder', href: '/calculators/no-cost-emi' },
                { label: 'SIP Growth Projector', href: '/calculators/sip' },
                { label: 'EMI Loan Calculator', href: '/calculators/emi' },
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
