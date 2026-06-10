'use client';

import React, { useState, useEffect } from 'react';
import { calculateCcRewards, CcRewardOutput, CcModel } from '../../lib/calculators';
import { CreditCard, Award } from 'lucide-react';
import AdBanner from '../AdBanner';

export default function CreditCardRewardsCalculator() {
  const [cardType, setCardType] = useState<CcModel>('hdfc_infinia');
  
  // Category spends
  const [dining, setDining] = useState(15000);
  const [travel, setTravel] = useState(20000);
  const [grocery, setGrocery] = useState(10000);
  const [fuel, setFuel] = useState(5000);
  const [utility, setUtility] = useState(8000);
  const [others, setOthers] = useState(12000);

  // Custom card params
  const [customCardName, setCustomCardName] = useState('My Custom Card');
  const [customBaseReturn, setCustomBaseReturn] = useState(1.5);
  const [customDiningMult, setCustomDiningMult] = useState(2);
  const [customTravelMult, setCustomTravelMult] = useState(3);
  const [customPointVal, setCustomPointVal] = useState(0.25);

  const [result, setResult] = useState<CcRewardOutput | null>(null);

  useEffect(() => {
    const res = calculateCcRewards({
      cardType,
      spends: { dining, travel, grocery, fuel, utility, others },
      customCardName,
      customBaseReturnRate: customBaseReturn,
      customDiningMultiplier: customDiningMult,
      customTravelMultiplier: customTravelMult,
      customPointValue: customPointVal,
    });
    setResult(res);
  }, [
    cardType,
    dining,
    travel,
    grocery,
    fuel,
    utility,
    others,
    customCardName,
    customBaseReturn,
    customDiningMult,
    customTravelMult,
    customPointVal,
  ]);

  if (!result) return null;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const totalSpend = dining + travel + grocery + fuel + utility + others;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold font-display text-slate-800">
          Credit Card Rewards Calculator
        </h2>
        <p className="text-sm text-slate-500">
          Optimize your cards based on spends and compute reward values, airline miles, and cashback.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs */}
        <div className="lg:col-span-7 bg-white border border-slate-200 p-6 rounded-2xl space-y-6 shadow-sm">
          {/* Card Select */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              Select Credit Card
            </label>
            <select
              value={cardType}
              onChange={(e) => setCardType(e.target.value as CcModel)}
              className="w-full px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="hdfc_infinia">HDFC Infinia (Super Premium)</option>
              <option value="hdfc_diners_black">HDFC Diners Club Black (Premium)</option>
              <option value="axis_atlas">Axis Atlas (Travel Focused)</option>
              <option value="axis_magnus">Axis Magnus (Milestone / Premium)</option>
              <option value="icici_emeralde">ICICI Emeralde</option>
              <option value="sbi_elite">SBI Card Elite</option>
              <option value="custom">Custom Reward Program Card</option>
            </select>
          </div>

          {/* Custom Config Parameters */}
          {cardType === 'custom' && (
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Configure Custom Card Rules
              </span>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-slate-600">Card Name</label>
                  <input
                    type="text"
                    value={customCardName}
                    onChange={(e) => setCustomCardName(e.target.value)}
                    className="w-full px-2 py-1 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-slate-600">Base Return (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={customBaseReturn}
                    onChange={(e) => setCustomBaseReturn(Number(e.target.value))}
                    className="w-full px-2 py-1 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-slate-600">Dining Multiplier</label>
                  <input
                    type="number"
                    value={customDiningMult}
                    onChange={(e) => setCustomDiningMult(Number(e.target.value))}
                    className="w-full px-2 py-1 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-slate-600">Travel Multiplier</label>
                  <input
                    type="number"
                    value={customTravelMult}
                    onChange={(e) => setCustomTravelMult(Number(e.target.value))}
                    className="w-full px-2 py-1 text-xs"
                  />
                </div>
                <div className="space-y-1 col-span-2">
                  <label className="text-[10px] font-semibold text-slate-600">Point Value (₹)</label>
                  <input
                    type="number"
                    step="0.05"
                    value={customPointVal}
                    onChange={(e) => setCustomPointVal(Number(e.target.value))}
                    className="w-full px-2 py-1 text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Spend Category Fields */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Monthly Category Spends</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-slate-600">Dining (₹)</label>
                <input
                  type="number"
                  value={dining}
                  onChange={(e) => setDining(Number(e.target.value))}
                  className="w-full px-2.5 py-1 text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-slate-600">Travel/Airlines (₹)</label>
                <input
                  type="number"
                  value={travel}
                  onChange={(e) => setTravel(Number(e.target.value))}
                  className="w-full px-2.5 py-1 text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-slate-600">Grocery (₹)</label>
                <input
                  type="number"
                  value={grocery}
                  onChange={(e) => setGrocery(Number(e.target.value))}
                  className="w-full px-2.5 py-1 text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-slate-600">Fuel spends (₹)</label>
                <input
                  type="number"
                  value={fuel}
                  onChange={(e) => setFuel(Number(e.target.value))}
                  className="w-full px-2.5 py-1 text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-slate-600">Utility Spends (₹)</label>
                <input
                  type="number"
                  value={utility}
                  onChange={(e) => setUtility(Number(e.target.value))}
                  className="w-full px-2.5 py-1 text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-slate-600">Others (₹)</label>
                <input
                  type="number"
                  value={others}
                  onChange={(e) => setOthers(Number(e.target.value))}
                  className="w-full px-2.5 py-1 text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Outputs */}
        <div className="lg:col-span-5 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-indigo-50 text-indigo-600 flex items-center justify-center rounded-xl">
                <CreditCard size={20} />
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Selected Card</span>
                <span className="font-bold text-slate-800">{result.cardName}</span>
              </div>
            </div>

            {/* Main Value Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">
                  Reward Points
                </span>
                <span className="text-lg font-bold block mt-1 text-slate-800">
                  {result.rewardPointsEarned} RP
                </span>
              </div>

              <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50">
                <span className="text-[10px] uppercase font-bold text-emerald-600 block tracking-wider">
                  Effective Return
                </span>
                <span className="text-lg font-bold block mt-1 text-emerald-600">
                  {formatCurrency(result.effectiveReturnAmount)}
                </span>
              </div>

              <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50">
                <span className="text-[10px] uppercase font-bold text-indigo-600 block tracking-wider">
                  Airline Miles
                </span>
                <span className="text-sm font-bold block mt-1 text-indigo-600">
                  {result.airlineMiles.toLocaleString()} Miles
                </span>
              </div>

              <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50">
                <span className="text-[10px] uppercase font-bold text-indigo-600 block tracking-wider">
                  Hotel Partners
                </span>
                <span className="text-sm font-bold block mt-1 text-indigo-600">
                  {result.hotelPoints.toLocaleString()} Points
                </span>
              </div>
            </div>

            {/* Performance display */}
            <div className="p-4 rounded-xl border border-dashed border-indigo-200 text-center">
              <span className="text-xs text-slate-400 block">Effective Net Return Percentage</span>
              <span className="text-2xl font-extrabold text-slate-800 mt-1 block font-display">
                {result.effectiveReturnPercent.toFixed(2)}%
              </span>
              <p className="text-[9px] text-slate-400 mt-1.5">
                Yielded on total monthly spends of {formatCurrency(totalSpend)}
              </p>
            </div>
          </div>

          <div className="text-[9px] text-slate-400 bg-slate-50 p-3 rounded-lg border border-slate-100">
            SmartBuy spends capped by card rules. Point transfers to airline/hotel loyalty programs (Vistara, Marriott Bonvoy, Singapore KrisFlyer) subject to partner ratio updates.
          </div>
        </div>
      </div>

      <AdBanner placement="insights_sponsored" targetCalculator="cc_rewards" />
    </div>
  );
}
