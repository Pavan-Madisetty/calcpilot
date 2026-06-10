'use client';

import React, { useState, useEffect } from 'react';
import { calculateConstructionCost, ConstructionOutput } from '../../lib/calculators';
import { saveCalculation } from '../../lib/store';
import { Save, CheckCircle2, Home, Landmark, ShieldCheck } from 'lucide-react';
import AdBanner from '../AdBanner';

export default function ConstructionCostCalculator() {
  const [plotSize, setPlotSize] = useState(1200);
  const [builtUpArea, setBuiltUpArea] = useState(1500);
  const [floors, setFloors] = useState(2);
  const [grade, setGrade] = useState<'Standard' | 'Premium' | 'Luxury'>('Premium');
  const [result, setResult] = useState<ConstructionOutput | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

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

  const handleSave = () => {
    saveCalculation({
      name: `Const - ${builtUpArea} sqft (${grade})`,
      type: 'construction',
      inputs: { plotSize, builtUpArea, floors, grade },
      outputs: {
        totalCost: result.totalCost,
        ratePerSqFt: result.ratePerSqFt,
        materialCost: result.materialCost,
        laborCost: result.laborCost,
      },
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
            Construction Cost Calculator
          </h2>
          <p className="text-sm text-muted-foreground">
            Estimate construction budgets, material distributions, and labor requirements.
          </p>
        </div>
        <div>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-sky-600 hover:bg-sky-500 text-white dark:bg-sky-500 dark:hover:bg-sky-400 dark:text-slate-950 font-semibold rounded-xl shadow-md transition-all cursor-pointer"
          >
            {savedSuccess ? (
              <>
                <CheckCircle2 size={16} /> Saved!
              </>
            ) : (
              <>
                <Save size={16} /> Save Calculation
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs */}
        <div className="lg:col-span-6 bg-card border border-border p-6 rounded-2xl space-y-6 shadow-sm">
          {/* Plot Size */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Plot Size (sq. ft.)
              </label>
              <input
                type="number"
                value={plotSize}
                onChange={(e) => setPlotSize(Number(e.target.value))}
                className="w-28 px-2.5 py-1 text-sm bg-input border border-border rounded-lg text-right focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            <input
              type="range"
              min="500"
              max="10000"
              step="100"
              value={plotSize}
              onChange={(e) => setPlotSize(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>

          {/* Built up area */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Built-up Area (per floor - sq. ft.)
              </label>
              <input
                type="number"
                value={builtUpArea}
                onChange={(e) => setBuiltUpArea(Number(e.target.value))}
                className="w-28 px-2.5 py-1 text-sm bg-input border border-border rounded-lg text-right focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            <input
              type="range"
              min="400"
              max="8000"
              step="50"
              value={builtUpArea}
              onChange={(e) => setBuiltUpArea(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>

          {/* Floors */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Number of Floors
              </label>
              <input
                type="number"
                value={floors}
                onChange={(e) => setFloors(Number(e.target.value))}
                className="w-20 px-2.5 py-1 text-sm bg-input border border-border rounded-lg text-right focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={floors}
              onChange={(e) => setFloors(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>

          {/* Construction Grade */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block">
              Construction Quality Grade
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['Standard', 'Premium', 'Luxury'] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setGrade(g)}
                  className={`py-2 text-xs font-bold rounded-xl border transition cursor-pointer ${
                    grade === g
                      ? 'border-primary bg-sky-50 dark:bg-sky-950/20 text-sky-600 dark:text-sky-400'
                      : 'border-border text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
            <span className="text-[10px] text-muted-foreground block pt-1">
              {grade === 'Standard' && 'Standard Quality bricks, cement, basic tiles (~₹1,500/sqft)'}
              {grade === 'Premium' && 'Premium Grade fittings, vitrified flooring, branded materials (~₹1,850/sqft)'}
              {grade === 'Luxury' && 'Luxury Teak wood accents, granite flooring, premium automation (~₹2,300/sqft)'}
            </span>
          </div>
        </div>

        {/* Right Outputs */}
        <div className="lg:col-span-6 bg-card border border-border p-6 rounded-2xl shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="text-center bg-slate-50 dark:bg-slate-900/40 p-4 rounded-xl border border-border">
              <span className="text-[10px] uppercase font-bold text-muted-foreground block tracking-wider">
                Total Estimated Cost
              </span>
              <span className="text-2xl md:text-3xl font-extrabold block mt-1 text-slate-800 dark:text-white">
                {formatCurrency(result.totalCost)}
              </span>
              <span className="text-[10px] text-muted-foreground mt-1.5 block">
                Total Built-up: {builtUpArea * floors} sq. ft. @ {formatCurrency(result.ratePerSqFt)}/sq.ft.
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-sky-500/5 p-3 rounded-xl border border-sky-500/10">
                <span className="text-[9px] uppercase font-bold text-sky-600 dark:text-sky-400 block">
                  Materials (58%)
                </span>
                <span className="text-xs font-bold mt-1 block">
                  {formatCurrency(result.materialCost)}
                </span>
              </div>
              <div className="bg-amber-500/5 p-3 rounded-xl border border-amber-500/10">
                <span className="text-[9px] uppercase font-bold text-amber-600 dark:text-amber-400 block">
                  Labor (25%)
                </span>
                <span className="text-xs font-bold mt-1 block">
                  {formatCurrency(result.laborCost)}
                </span>
              </div>
              <div className="bg-emerald-500/5 p-3 rounded-xl border border-emerald-500/10">
                <span className="text-[9px] uppercase font-bold text-emerald-600 dark:text-emerald-400 block">
                  Fittings (17%)
                </span>
                <span className="text-xs font-bold mt-1 block">
                  {formatCurrency(result.fittingsCost)}
                </span>
              </div>
            </div>
          </div>

          {/* Breakdown Items List */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
              Material &amp; Labor Distribution
            </span>
            <div className="divide-y divide-border/60 max-h-52 overflow-y-auto pr-2">
              {result.breakdown.map((item, index) => (
                <div key={index} className="py-2.5 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-slate-700 dark:text-slate-300">{item.name}</span>
                    <span className="text-[10px] text-muted-foreground block">{item.description}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-bold block text-slate-800 dark:text-slate-200">
                      {formatCurrency(item.cost)}
                    </span>
                    <span className="text-[10px] text-muted-foreground">{item.percentage}%</span>
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
