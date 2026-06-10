'use client';

import React, { useState, useEffect } from 'react';
import { calculateTiles, TileOutput } from '../../lib/calculators';
import { saveCalculation } from '../../lib/store';
import { Save, CheckCircle2, Grid, Percent } from 'lucide-react';
import AdBanner from '../AdBanner';

export default function TileCalculator() {
  const [roomLength, setRoomLength] = useState(12);
  const [roomWidth, setRoomWidth] = useState(10);
  const [tileLength, setTileLength] = useState(24); // inches
  const [tileWidth, setTileWidth] = useState(24); // inches
  const [wastage, setWastage] = useState(10); // percent
  const [costPerSqFt, setCostPerSqFt] = useState(45);
  const [result, setResult] = useState<TileOutput | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const res = calculateTiles({
      roomLengthFt: roomLength,
      roomWidthFt: roomWidth,
      tileLengthInch: tileLength,
      tileWidthInch: tileWidth,
      wastagePercent: wastage,
      costPerSqFt,
    });
    setResult(res);
  }, [roomLength, roomWidth, tileLength, tileWidth, wastage, costPerSqFt]);

  if (!result) return null;

  const handleSave = () => {
    saveCalculation({
      name: `Tiles - Room ${roomLength}x${roomWidth} ft`,
      type: 'tiles',
      inputs: { roomLength, roomWidth, tileLength, tileWidth, wastage, costPerSqFt },
      outputs: {
        totalTiles: result.totalTilesRounded,
        roomAreaSqFt: result.roomAreaSqFt,
        totalCost: result.totalCost,
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
            Tile &amp; Flooring Calculator
          </h2>
          <p className="text-sm text-muted-foreground">
            Calculate the exact quantity of tiles required for rooms with wastage estimation.
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
        <div className="lg:col-span-7 bg-card border border-border p-6 rounded-2xl space-y-6 shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Room Dimensions (Feet)</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Room Length (ft)</label>
              <input
                type="number"
                value={roomLength}
                onChange={(e) => setRoomLength(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-sm bg-input border border-border rounded-lg"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Room Width (ft)</label>
              <input
                type="number"
                value={roomWidth}
                onChange={(e) => setRoomWidth(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-sm bg-input border border-border rounded-lg"
              />
            </div>
          </div>

          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground pt-2">Tile Dimensions (Inches)</h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Tile Length (inch)</label>
              <input
                type="number"
                value={tileLength}
                onChange={(e) => setTileLength(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-sm bg-input border border-border rounded-lg"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Tile Width (inch)</label>
              <input
                type="number"
                value={tileWidth}
                onChange={(e) => setTileWidth(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-sm bg-input border border-border rounded-lg"
              />
            </div>
          </div>

          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground pt-2">Pricing &amp; Wastage</h3>

          <div className="grid grid-cols-2 gap-4">
            {/* Wastage */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 flex justify-between">
                <span>Wastage Margin</span>
                <span>{wastage}%</span>
              </label>
              <input
                type="number"
                value={wastage}
                onChange={(e) => setWastage(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-sm bg-input border border-border rounded-lg"
              />
            </div>

            {/* Price per sq ft */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Tile Cost (₹ per sq. ft.)</label>
              <input
                type="number"
                value={costPerSqFt}
                onChange={(e) => setCostPerSqFt(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-sm bg-input border border-border rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Right Outputs */}
        <div className="lg:col-span-5 bg-card border border-border p-6 rounded-2xl shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center rounded-xl">
                <Grid size={20} />
              </div>
              <div>
                <span className="text-xs text-muted-foreground block">Tile Calculations</span>
                <span className="font-bold text-slate-800 dark:text-slate-100">Floor Layout Estimates</span>
              </div>
            </div>

            {/* Calculations Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-border bg-slate-50/50 dark:bg-slate-900/20">
                <span className="text-[10px] uppercase font-bold text-muted-foreground block tracking-wider">
                  Total Room Area
                </span>
                <span className="text-xl font-bold block mt-1 text-slate-800 dark:text-white">
                  {result.roomAreaSqFt} sq. ft.
                </span>
              </div>

              <div className="p-4 rounded-xl border border-border bg-slate-50/50 dark:bg-slate-900/20">
                <span className="text-[10px] uppercase font-bold text-muted-foreground block tracking-wider">
                  Single Tile Area
                </span>
                <span className="text-xl font-bold block mt-1 text-slate-800 dark:text-white">
                  {result.tileAreaSqFt.toFixed(2)} sq. ft.
                </span>
              </div>

              <div className="p-4 rounded-xl border border-border bg-slate-50/50 dark:bg-slate-900/20">
                <span className="text-[10px] uppercase font-bold text-muted-foreground block tracking-wider">
                  Base Tiles Need
                </span>
                <span className="text-base font-bold block mt-1 text-slate-700 dark:text-slate-300">
                  {Math.ceil(result.baseTilesNeeded)} Tiles
                </span>
              </div>

              <div className="p-4 rounded-xl border border-border bg-amber-500/5 dark:bg-amber-500/10 border-amber-500/10">
                <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 block tracking-wider">
                  Wastage (Tiles)
                </span>
                <span className="text-base font-bold block mt-1 text-amber-600 dark:text-amber-400">
                  {Math.ceil(result.wastageTilesCount)} Tiles
                </span>
              </div>
            </div>

            {/* Cost displays */}
            <div className="p-4 rounded-xl border border-border bg-emerald-500/5 dark:bg-emerald-500/10 border-emerald-500/10 text-center">
              <span className="text-xs text-emerald-600 dark:text-emerald-400 block font-semibold">Total Tile Material Cost</span>
              <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1 block">
                {formatCurrency(result.totalCost)}
              </span>
            </div>
          </div>

          <div className="p-4 bg-sky-500/5 dark:bg-sky-500/10 text-center rounded-xl border border-sky-500/20">
            <span className="text-xs uppercase font-bold tracking-wider text-sky-600 dark:text-sky-400 block">
              Purchase Recommendation
            </span>
            <span className="text-2xl font-extrabold block text-slate-800 dark:text-white mt-1">
              Buy {result.totalTilesRounded} Tiles
            </span>
            <span className="text-[10px] text-muted-foreground mt-1 block">
              Includes {wastage}% cutting/breakage wastage buffer.
            </span>
          </div>
        </div>
      </div>

      <AdBanner placement="calc_inline" targetCalculator="tiles" />
    </div>
  );
}
