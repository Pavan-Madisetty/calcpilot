import React from 'react';
import type { Metadata } from 'next';
import NoCostEmiCalculator from '../../../components/calculators/NoCostEmiCalculator';
import PublicLayout from '../../../components/PublicLayout';
import CalculatorsLayout from '../../../components/CalculatorsLayout';

export const metadata: Metadata = {
  title: 'No Cost EMI Calculator - Decode Hidden Charges & True EIR',
  description: 'Is No Cost EMI actually free? Decode interest rates, hidden processing fees, GST charges, and foregone discounts with our free No Cost EMI Calculator.',
  keywords: ['No Cost EMI Calculator', 'Zero Cost EMI', 'Hidden Interest EMI', 'Credit Card EMI Calculator', 'EIR Calculator India', 'Finance'],
  alternates: {
    canonical: 'https://zeroemi.in/calculators/no-cost-emi',
  },
  openGraph: {
    title: 'No Cost EMI Calculator - Decipher Hidden Costs',
    description: 'Find out if your No Cost EMI offer has hidden charges. Calculate the true effective annual interest rate (EIR) instantly.',
    url: 'https://zeroemi.in/calculators/no-cost-emi',
    type: 'website',
  },
};

export default function NoCostEmiPage() {
  const schemaApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'No Cost EMI Decoder - ZeroEMI',
    'description': 'Decode the true interest rate, hidden processing fees, and GST on No Cost EMI deals.',
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
        'name': 'How does a No Cost EMI work?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'In a No Cost EMI, the bank charges standard interest on your EMI, but the merchant gives you an upfront discount equal to that interest amount. This makes your total EMI payments equal to the original product price. However, you still pay 18% GST on the interest portion and standard processing fees.'
        }
      },
      {
        '@type': 'Question',
        'name': 'What are the hidden charges in a No Cost EMI?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'The main hidden charges are: (1) One-time processing fees (usually ₹199 + GST), (2) 18% GST charged on the interest component of every monthly payment, and (3) Foregone cash/card discounts that you would have received if you paid in full.'
        }
      },
      {
        '@type': 'Question',
        'name': 'How is the Effective Interest Rate (EIR) calculated?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'The EIR is solved mathematically using the Internal Rate of Return (IRR) of all cash outflows (down payment, processing fee, monthly EMIs with GST) compared to the outright discounted cash price of the product.'
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

        {/* Core Calculator */}
        <NoCostEmiCalculator />

        {/* Deep SEO & Educational Content */}
        <section className="mt-12 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-8 shadow-sm">
          
          {/* Article Header */}
          <div className="border-b border-slate-100 pb-6">
            <h1 className="text-2xl md:text-3xl font-extrabold font-display text-slate-800 leading-tight">
              Is No Cost EMI Truly Free? The Ultimate Financial Guide
            </h1>
            <p className="text-sm text-slate-500 mt-2">
              Learn how zero-percent interest schemes are structured, why you pay extra, and how to use our decoder tool to solve for the true Effective Annual Rate (EIR).
            </p>
          </div>

          {/* Section 1 */}
          <div className="space-y-4">
            <h2 className="text-lg md:text-xl font-bold font-display text-slate-800">
              What is a No Cost EMI?
            </h2>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              A **No Cost EMI** (often advertised as 0% interest EMI) is a marketing arrangement between retailers, manufacturers, and financial institutions (like banks or NBFCs). Under this setup, a consumer can purchase a product—such as a smartphone, laptop, or home appliance—and pay for it in equal monthly installments over a specified tenure, without apparently paying any extra interest.
            </p>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              While it sounds like a win-win scenario, the Reserve Bank of India (RBI) issued a circular stating that **&quot;Zero Percent Interest&quot; schemes are non-existent** and interest charges are always built in somewhere. In reality, interest is charged by the bank, but is compensated by an upfront merchant discount.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-4">
            <h2 className="text-lg md:text-xl font-bold font-display text-slate-800">
              How No Cost EMI Works: The Merchant-Bank Model
            </h2>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              There are two primary methods through which a No Cost EMI is structured:
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-xs md:text-sm text-slate-600">
              <li>
                <strong>Upfront Interest Discount Model (Most Common)</strong>: 
                The bank or credit card company charges a standard interest rate (typically 13% to 16% per annum) on the loan. To make the EMI &quot;no cost&quot; to you, the merchant offers an upfront discount on the product equal to the total interest that will be charged over the tenure. 
                <br />
                <em>For example:</em> If a TV costs ₹50,000 and the interest for a 6-month EMI is ₹3,000, you receive an upfront discount of ₹3,000. Your loan amount becomes ₹47,000. Your monthly EMI is calculated on this ₹47,000 at the bank&apos;s interest rate, resulting in payments that sum up to exactly ₹50,000.
              </li>
              <li>
                <strong>Interest Markup Model (Product Price Loading)</strong>:
                The interest is directly bundled into the sale price of the product. The product is sold at its standard MRP to EMI buyers, whereas cash/outright buyers are offered a discount. The difference between the outright price and the EMI price is the interest charge.
              </li>
            </ol>
          </div>

          {/* Section 3 */}
          <div className="space-y-4">
            <h2 className="text-lg md:text-xl font-bold font-display text-slate-800">
              The Hidden Costs Explained
            </h2>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              Even if the interest is subsidized, choosing a No Cost EMI introduces several hidden charges that inflate your actual outflow:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50">
                <h4 className="font-bold text-slate-800 text-xs md:text-sm mb-1.5">18% GST on Interest</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  In India, the government levies an 18% Goods and Services Tax (GST) on the interest components of credit card EMIs. Because this GST is billed on top of your monthly EMI, it is paid entirely out of your pocket.
                </p>
              </div>
              <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50">
                <h4 className="font-bold text-slate-800 text-xs md:text-sm mb-1.5">Processing Fees &amp; GST</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Banks usually charge a one-time processing fee ranging from ₹99 to ₹299 for converting a transaction into an EMI. You also pay an 18% GST on this processing fee.
                </p>
              </div>
              <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50">
                <h4 className="font-bold text-slate-800 text-xs md:text-sm mb-1.5">Foregone Discounts</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Often, outright buyers get special card discounts or instant cashbacks that are explicitly excluded if you opt for EMI. The value of this lost discount is a direct cost of choosing the EMI.
                </p>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div className="space-y-4">
            <h2 className="text-lg md:text-xl font-bold font-display text-slate-800">
              The Mathematical Formulation of True IRR
            </h2>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              To calculate the true interest rate (EIR) of a No Cost EMI, we must evaluate the cash flows using the **Internal Rate of Return (IRR)**. The cash price of the product (less any cash discount) is treated as the initial loan value received, and the down payments, fees, and monthly EMIs (with interest GST) are treated as cash outflows.
            </p>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              We solve for the monthly rate $r$ that satisfies:
            </p>
            <div className="bg-slate-50 p-4 rounded-xl font-mono text-xs text-center border border-slate-100 overflow-x-auto">
              {"CF_0 - \\sum_{t=1}^N \\frac{CF_t}{(1 + r)^t} = 0"}
            </div>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              Where $CF_0$ is the outright price minus any immediate down payment/fees, and $CF_t$ represents the total payment (EMI + GST) made in month $t$. The **Effective Annual Rate (EIR)** is then annualized as:
            </p>
            <div className="bg-slate-50 p-4 rounded-xl font-mono text-xs text-center border border-slate-100">
              EIR = (1 + r)^12 - 1
            </div>
          </div>

          {/* Section 5 - Example */}
          <div className="space-y-4 bg-indigo-50/30 border border-indigo-100/50 rounded-2xl p-6">
            <h3 className="text-base font-bold font-display text-indigo-900">
              Example Walkthrough: Buying a Laptop for ₹60,000
            </h3>
            <div className="space-y-2 text-xs md:text-sm text-slate-700 leading-relaxed">
              <p>Suppose you buy a laptop listed at <strong>₹60,000</strong> on a 6-month No Cost EMI:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>The retailer offers an upfront interest discount of <strong>₹3,800</strong>. Your net loan principal is ₹56,200.</li>
                <li>Your monthly EMI is ₹10,000 (which sums up to ₹60,000 over 6 months).</li>
                <li>The bank charges a one-time processing fee of <strong>₹199 + 18% GST (₹36) = ₹235</strong>.</li>
                <li>Each month, the bank charges 15% p.a. interest on reducing balance. The total interest is ₹3,800. You pay 18% GST on this interest portion every month, which sums up to <strong>₹684</strong>.</li>
                <li>If you paid in cash, you would have gotten a 5% instant discount (₹3,000), which you forego by selecting EMI.</li>
                <li><strong>Total paid on EMI:</strong> ₹60,000 (EMIs) + ₹235 (Processing fee) + ₹684 (Interest GST) = <strong>₹60,919</strong>.</li>
                <li>The true outright price was ₹57,000 (due to the cash discount). Thus, you paid <strong>₹3,919</strong> in hidden charges, resulting in a true effective interest rate (EIR) of <strong>24.5% per annum</strong>!</li>
              </ul>
            </div>
          </div>

          {/* FAQs details */}
          <div className="space-y-4">
            <h3 className="text-base font-bold font-display text-slate-800">
              Frequently Asked Questions (FAQs)
            </h3>
            <div className="space-y-3">
              <details className="group border border-slate-100 rounded-xl p-4 bg-slate-50/50 hover:bg-slate-50 transition cursor-pointer">
                <summary className="font-semibold text-xs md:text-sm text-slate-800 flex justify-between items-center list-none">
                  Is No Cost EMI safe to use?
                  <span className="text-indigo-600 font-bold group-open:rotate-180 transition-transform duration-200">▼</span>
                </summary>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Yes, it is entirely safe and regulated. However, you must ensure you pay your credit card bills on time. Late payments on credit cards attract hefty charges (up to 40%+ interest p.a.) and will damage your CIBIL score.
                </p>
              </details>

              <details className="group border border-slate-100 rounded-xl p-4 bg-slate-50/50 hover:bg-slate-50 transition cursor-pointer">
                <summary className="font-semibold text-xs md:text-sm text-slate-800 flex justify-between items-center list-none">
                  What happens if I cancel a No Cost EMI order?
                  <span className="text-indigo-600 font-bold group-open:rotate-180 transition-transform duration-200">▼</span>
                </summary>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  If you cancel the order, the merchant refunds the amount. However, the bank might still charge a fee for foreclosure, and the upfront processing fee is generally non-refundable. Always check your bank&apos;s EMI cancellation policy.
                </p>
              </details>

              <details className="group border border-slate-100 rounded-xl p-4 bg-slate-50/50 hover:bg-slate-50 transition cursor-pointer">
                <summary className="font-semibold text-xs md:text-sm text-slate-800 flex justify-between items-center list-none">
                  Is it better to pay cash or choose No Cost EMI?
                  <span className="text-indigo-600 font-bold group-open:rotate-180 transition-transform duration-200">▼</span>
                </summary>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  If the merchant offers an outright cash discount (e.g. 5% or 10% off), paying cash is almost always cheaper because you avoid processing fees and GST on interest. If no cash discount is available, and you need to split the payment, No Cost EMI is a convenient option.
                </p>
              </details>
            </div>
          </div>

          {/* Cross linking */}
          <div className="border-t border-slate-100 pt-6">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Other Useful Finance Calculators</h4>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Standard EMI Calculator', href: '/calculators/emi' },
                { label: 'SIP Calculator', href: '/calculators/sip' },
                { label: 'Loan Eligibility Calculator', href: '/calculators/loan-eligibility' },
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
