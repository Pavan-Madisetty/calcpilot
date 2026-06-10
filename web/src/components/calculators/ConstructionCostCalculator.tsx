'use client';

import React, { useState, useEffect } from 'react';
import { calculateConstructionCost, ConstructionOutput } from '../../lib/calculators';
import AdBanner from '../AdBanner';

export default function ConstructionCostCalculator() {
  const [plotSize, setPlotSize] = useState(1200);
  const [builtUpArea, setBuiltUpArea] = useState(1500);
  const [floors, setFloors] = useState(2);
  const [grade, setGrade] = useState<'Standard' | 'Premium' | 'Luxury'>('Premium');
  const [result, setResult] = useState<ConstructionOutput | null>(null);

  useEffect(() => {
    const res = calculateConstructionCost({
      plotSizeSqFt: plotSize,
      builtUpAreaSqFt: builtUpArea,
      numberOfFloors: floors,
      constructionGrade: grade,
    });
    setResult(res);
  }, [plotSize, builtUpArea, floors, grade]);

  if (!result) return null;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold font-display text-slate-800">
          Construction Cost Calculator
        </h2>
        <p className="text-sm text-slate-500">
          Estimate construction budgets, material distributions, and labor requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs */}
        <div className="lg:col-span-6 bg-white border border-slate-200 p-6 rounded-2xl space-y-6 shadow-sm">
          {/* Plot Size */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700">
                Plot Size (sq. ft.)
              </label>
              <input
                type="number"
                value={plotSize}
                onChange={(e) => setPlotSize(Number(e.target.value))}
                className="w-28 px-2.5 py-1 text-sm text-right focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <input
              type="range"
              min="500"
              max="10000"
              step="100"
              value={plotSize}
              onChange={(e) => setPlotSize(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Built up area */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700">
                Built-up Area (per floor - sq. ft.)
              </label>
              <input
                type="number"
                value={builtUpArea}
                onChange={(e) => setBuiltUpArea(Number(e.target.value))}
                className="w-28 px-2.5 py-1 text-sm text-right focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <input
              type="range"
              min="400"
              max="5000"
              step="50"
              value={builtUpArea}
              onChange={(e) => setBuiltUpArea(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Floors */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700">
                Number of Floors
              </label>
              <input
                type="number"
                value={floors}
                onChange={(e) => setFloors(Number(e.target.value))}
                className="w-20 px-2.5 py-1 text-sm text-right focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={floors}
              onChange={(e) => setFloors(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Construction Grade */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 block">
              Construction Quality Grade
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['Standard', 'Premium', 'Luxury'] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setGrade(g)}
                  className={`py-2 text-xs font-bold rounded-xl border transition cursor-pointer ${
                    grade === g
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                      : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
            <span className="text-[10px] text-slate-400 block pt-1 leading-relaxed">
              {grade === 'Standard' && 'Standard bricks, cement, basic tiles (~₹1,500/sqft)'}
              {grade === 'Premium' && 'Premium fittings, vitrified flooring, branded materials (~₹1,850/sqft)'}
              {grade === 'Luxury' && 'Luxury wood accents, granite flooring, premium automation (~₹2,300/sqft)'}
            </span>
          </div>
        </div>

        {/* Right Outputs */}
        <div className="lg:col-span-6 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="text-center bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Total Estimated Cost
              </span>
              <span className="text-2xl font-extrabold block mt-1 text-slate-800">
                {formatCurrency(result.totalCost)}
              </span>
              <span className="text-[10px] text-slate-400 mt-1.5 block">
                Total Area: {builtUpArea * floors} sq. ft. @ {formatCurrency(result.ratePerSqFt)}/sq.ft.
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 text-center">
              <div className="bg-indigo-50 p-3 rounded-xl border border-indigo-100">
                <span className="text-[9px] uppercase font-bold text-indigo-600 block">
                  Materials Budget (58%)
                </span>
                <span className="text-xs font-bold mt-1 block">
                  {formatCurrency(result.materialCost)}
                </span>
              </div>
              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                <span className="text-[9px] uppercase font-bold text-emerald-600 block">
                  Labor Budget (25%)
                </span>
                <span className="text-xs font-bold mt-1 block">
                  {formatCurrency(result.laborCost)}
                </span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[9px] uppercase font-bold text-slate-500 block">
                  Fittings &amp; Finish (17%)
                </span>
                <span className="text-xs font-bold mt-1 block">
                  {formatCurrency(result.fittingsCost)}
                </span>
              </div>
            </div>
          </div>

          {/* Breakdown Items List */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Material &amp; Labor Distribution
            </span>
            <div className="divide-y divide-slate-100 max-h-52 overflow-y-auto pr-2">
              {result.breakdown.map((item, index) => (
                <div key={index} className="py-2.5 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-slate-700">{item.name}</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{item.description}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-bold block text-slate-800">
                      {formatCurrency(item.cost)}
                    </span>
                    <span className="text-[10px] text-slate-400">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AdBanner placement="calc_inline" targetCalculator="construction" />
    </div>
  );
}
