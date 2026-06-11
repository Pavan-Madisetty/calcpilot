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
        <div className="lg:col-span-5 space-y-6">
          {/* Main Tiles Purchase Recommendation result card */}
          <div className="bg-gradient-to-tr from-indigo-900 to-slate-900 text-white p-6 rounded-2xl shadow-sm border border-slate-800 space-y-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">Purchase Recommendation</span>
              <h3 className="text-4xl font-extrabold font-display mt-0.5 flex items-baseline gap-1">
                {result.totalTilesRounded}
                <span className="text-xs font-medium text-indigo-200">Tiles</span>
              </h3>
              <p className="text-[11px] text-indigo-200 mt-1 leading-normal">
                Includes {wastage}% cutting/breakage wastage buffer ({Math.ceil(result.wastageTilesCount)} Tiles).
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-indigo-800/50 pt-4">
              <div>
                <span className="text-[10px] font-medium text-indigo-300 uppercase">Total Material Cost</span>
                <p className="text-base font-bold mt-0.5 text-emerald-400">{formatCurrency(result.totalCost)}</p>
              </div>
              <div>
                <span className="text-[10px] font-medium text-indigo-300 uppercase">Base Tiles Needed</span>
                <p className="text-base font-bold mt-0.5">{Math.ceil(result.baseTilesNeeded)} Tiles</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] font-medium text-indigo-300 uppercase">Total Room Area</span>
                <p className="text-base font-bold mt-0.5 text-indigo-300">{result.roomAreaSqFt} sq.ft.</p>
              </div>
              <div>
                <span className="text-[10px] font-medium text-indigo-300 uppercase">Single Tile Area</span>
                <p className="text-base font-bold mt-0.5 text-indigo-300">{result.tileAreaSqFt.toFixed(2)} sq.ft.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Ad Place Holder */}
      <AdBanner placement="insights_sponsored" targetCalculator="tiles" />
    </div>
  );
}
