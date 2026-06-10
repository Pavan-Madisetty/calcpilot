import React from 'react';
import type { Metadata } from 'next';
import TileCalculator from '../../../components/calculators/TileCalculator';
import PublicLayout from '../../../components/PublicLayout';
import CalculatorsLayout from '../../../components/CalculatorsLayout';

export const metadata: Metadata = {
  title: 'Tiles Calculator - Room Floor & Wall Tiles Quantity Estimator',
  description: 'Calculate the total number of tiles and boxes required for your room floor or wall. Enter dimensions, tile size, and add wastage percentage to get estimates.',
  keywords: ['Tile Calculator', 'Flooring Area Calculator', 'Wall Tiles Estimator', 'Tiles Wastage Buffer', 'Home Renovation Budgeting'],
  alternates: {
    canonical: 'https://Pavan-Madisetty.github.io/calcpilot/calculators/tiles',
  },
  openGraph: {
    title: 'Tile & Flooring Calculator - CalcPilot',
    description: 'Estimate required flooring or wall tile boxes including breakage buffers instantly.',
    url: 'https://Pavan-Madisetty.github.io/calcpilot/calculators/tiles',
    type: 'website',
  },
};

export default function TileCalculatorPage() {
  const schemaApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Tile Calculator - CalcPilot',
    'description': 'Calculate required flooring or wall tile boxes including breakage buffers.',
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
        'name': 'How do you calculate tiles needed for a room?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'First, find the total room area (Length × Width). Second, calculate the area of a single tile (Length × Width in same unit). Divide the total room area by the tile area to get the base tile count, then add a 5% to 10% wastage buffer.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Why should I add a wastage buffer to my tiles purchase?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'During installation, tiles must be cut to fit corners, edges, and curved areas. Some tiles may also break. Adding a 5% to 10% wastage buffer ensures you have enough matching tiles from the same batch without falling short.'
        }
      },
      {
        '@type': 'Question',
        'name': 'How do I determine how many tile boxes to buy?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Divide your total required tiles (including wastage) by the number of tiles contained in a single box (which varies by size and manufacturer), then round up to the next whole number.'
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
        <TileCalculator />

        {/* Semantic SEO & AI Search Section */}
        <section className="mt-12 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
          <div>
            <h2 className="text-xl font-bold font-display text-slate-800">
              Frequently Asked Questions (FAQs)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Learn how to estimate tiles, wastage allowances, and box quantities for home tiling projects.
            </p>
          </div>

          <div className="space-y-4">
            <details className="group border border-slate-100 rounded-2xl p-4 bg-slate-50/50 hover:bg-slate-50 transition cursor-pointer">
              <summary className="font-semibold text-xs md:text-sm text-slate-800 flex justify-between items-center list-none">
                How do you calculate tiles needed for a room?
                <span className="text-indigo-600 font-bold group-open:rotate-180 transition-transform duration-200">▼</span>
              </summary>
              <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                To calculate base tiles requirements:
                <br />
                1. Calculate Room Area = Length × Width (e.g. 10 ft × 12 ft = 120 sq. ft.).
                <br />
                2. Calculate Single Tile Area = Tile Length × Tile Width (converted to sq. ft. e.g. 2 ft × 2 ft = 4 sq. ft.).
                <br />
                3. Base Tiles Count = Room Area / Tile Area (120 / 4 = 30 tiles).
                <br />
                4. Add a wastage buffer (5% to 10%) to get the final purchase requirement.
              </p>
            </details>

            <details className="group border border-slate-100 rounded-2xl p-4 bg-slate-50/50 hover:bg-slate-50 transition cursor-pointer">
              <summary className="font-semibold text-xs md:text-sm text-slate-800 flex justify-between items-center list-none">
                Why should I add a wastage buffer to my tiles purchase?
                <span className="text-indigo-600 font-bold group-open:rotate-180 transition-transform duration-200">▼</span>
              </summary>
              <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                Adding a 5% to 10% wastage buffer is critical. During installation, tiles must be cut diagonally or in specific shapes to fit corners, thresholds, pipes, and skirting boards. Furthermore, some tiles may chip or break during transportation or cutting. Having buffer tiles from the exact same manufacturing batch ensures consistent color shades across your entire floor.
              </p>
            </details>

            <details className="group border border-slate-100 rounded-2xl p-4 bg-slate-50/50 hover:bg-slate-50 transition cursor-pointer">
              <summary className="font-semibold text-xs md:text-sm text-slate-800 flex justify-between items-center list-none">
                How do I determine how many tile boxes to buy?
                <span className="text-indigo-600 font-bold group-open:rotate-180 transition-transform duration-200">▼</span>
              </summary>
              <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                Tiling materials are sold by the box. To determine your box order:
                <br />
                1. Find the total area needed including wastage buffer (e.g., 132 sq. ft.).
                <br />
                2. Check the coverage area per box printed on the tile package (e.g., 16 sq. ft. per box).
                <br />
                3. Total Boxes = Total Area / Box Coverage (132 / 16 = 8.25 boxes).
                <br />
                4. Always round up to the nearest whole box (e.g. purchase 9 boxes).
              </p>
            </details>
          </div>
        </section>
      </CalculatorsLayout>
    </PublicLayout>
  );
}
