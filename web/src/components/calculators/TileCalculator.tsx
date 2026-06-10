'use client';

import React, { useState, useEffect } from 'react';
import { calculateTiles, TileOutput } from '../../lib/calculators';
import { Grid } from 'lucide-react';
import AdBanner from '../AdBanner';

export default function TileCalculator() {
  const [roomLength, setRoomLength] = useState(12);
  const [roomWidth, setRoomWidth] = useState(10);
  const [tileLength, setTileLength] = useState(24); // inches
  const [tileWidth, setTileWidth] = useState(24); // inches
  const [wastage, setWastage] = useState(10); // percent
  const [costPerSqFt, setCostPerSqFt] = useState(45);
  const [result, setResult] = useState<TileOutput | null>(null);

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
          Tile &amp; Flooring Calculator
        </h2>
        <p className="text-sm text-slate-500">
          Calculate the exact quantity of tiles required for rooms with wastage estimation.
        </p>
      </div>

      {/* Top Ad Place Holder */}
      <AdBanner placement="calc_inline" targetCalculator="tiles" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs */}
        <div className="lg:col-span-7 bg-white border border-slate-200 p-6 rounded-2xl space-y-6 shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Room Dimensions (Feet)</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600">Room Length (ft)</label>
              <input
                type="number"
                value={roomLength}
                onChange={(e) => setRoomLength(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600">Room Width (ft)</label>
              <input
                type="number"
                value={roomWidth}
                onChange={(e) => setRoomWidth(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-sm"
              />
            </div>
          </div>

          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 pt-2">Tile Dimensions (Inches)</h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600">Tile Length (inch)</label>
              <input
                type="number"
                value={tileLength}
                onChange={(e) => setTileLength(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600">Tile Width (inch)</label>
              <input
                type="number"
                value={tileWidth}
                onChange={(e) => setTileWidth(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-sm"
              />
            </div>
          </div>

          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 pt-2">Pricing &amp; Wastage</h3>

          <div className="grid grid-cols-2 gap-4">
            {/* Wastage */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 flex justify-between">
                <span>Wastage Margin</span>
                <span>{wastage}%</span>
              </label>
              <input
                type="number"
                value={wastage}
                onChange={(e) => setWastage(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-sm"
              />
            </div>

            {/* Price per sq ft */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600">Tile Cost (₹ per sq. ft.)</label>
              <input
                type="number"
                value={costPerSqFt}
                onChange={(e) => setCostPerSqFt(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Right Outputs */}
        <div className="lg:col-span-5 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-indigo-50 text-indigo-600 flex items-center justify-center rounded-xl">
                <Grid size={20} />
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Tile Calculations</span>
                <span className="font-bold text-slate-800">Floor Layout Estimates</span>
              </div>
            </div>

            {/* Calculations Grid */}
            <div className="grid grid-cols-1 gap-3.5">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">
                  Total Room Area
                </span>
                <span className="text-lg font-bold block mt-1 text-slate-800">
                  {result.roomAreaSqFt} sq. ft.
                </span>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">
                  Single Tile Area
                </span>
                <span className="text-lg font-bold block mt-1 text-slate-800">
                  {result.tileAreaSqFt.toFixed(2)} sq. ft.
                </span>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">
                  Base Tiles Needed
                </span>
                <span className="text-sm font-bold block mt-1 text-slate-700">
                  {Math.ceil(result.baseTilesNeeded)} Tiles
                </span>
              </div>

              <div className="p-4 rounded-xl border border-amber-100 bg-amber-50">
                <span className="text-[10px] uppercase font-bold text-amber-600 block tracking-wider">
                  Wastage Buffer
                </span>
                <span className="text-sm font-bold block mt-1 text-amber-600">
                  {Math.ceil(result.wastageTilesCount)} Tiles ({wastage}%)
                </span>
              </div>
            </div>

            {/* Cost displays */}
            <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50 text-center">
              <span className="text-xs text-emerald-600 block font-semibold">Total Tile Material Cost</span>
              <span className="text-2xl font-extrabold text-emerald-600 mt-1 block">
                {formatCurrency(result.totalCost)}
              </span>
            </div>
          </div>

          <div className="p-4 bg-indigo-50 text-center rounded-xl border border-indigo-100">
            <span className="text-xs uppercase font-bold tracking-wider text-indigo-600 block">
              Purchase Recommendation
            </span>
            <span className="text-xl font-extrabold block text-slate-800 mt-1 font-display">
              Buy {result.totalTilesRounded} Tiles
            </span>
            <span className="text-[10px] text-slate-400 mt-1 block">
              Includes {wastage}% cutting/breakage wastage buffer.
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Ad Place Holder */}
      <AdBanner placement="insights_sponsored" targetCalculator="tiles" />
    </div>
  );
}
