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

      {/* Top Ad Place Holder */}
      <AdBanner placement="calc_inline" targetCalculator="cc_rewards" />

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
        <div className="lg:col-span-5 space-y-6">
          {/* Main Card Yield Result Card */}
          <div className="bg-gradient-to-tr from-indigo-900 to-slate-900 text-white p-6 rounded-2xl shadow-sm border border-slate-800 space-y-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">Effective Net Return Yield</span>
              <h3 className="text-4xl font-extrabold font-display mt-0.5 flex items-baseline gap-1">
                {result.effectiveReturnPercent.toFixed(2)}%
              </h3>
              <p className="text-[11px] text-indigo-200 mt-1 leading-normal">
                Yielded on total monthly spends of {formatCurrency(totalSpend)} under <strong className="text-white">{result.cardName}</strong>.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-indigo-800/50 pt-4">
              <div>
                <span className="text-[10px] font-medium text-indigo-300 uppercase">Return Value Return</span>
                <p className="text-base font-bold mt-0.5 text-emerald-400">{formatCurrency(result.effectiveReturnAmount)}</p>
              </div>
              <div>
                <span className="text-[10px] font-medium text-indigo-300 uppercase">Points Earned</span>
                <p className="text-base font-bold mt-0.5">{result.rewardPointsEarned} RP</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] font-medium text-indigo-300 uppercase">Airline Partners Miles</span>
                <p className="text-base font-bold mt-0.5 text-indigo-300">{result.airlineMiles.toLocaleString()} Miles</p>
              </div>
              <div>
                <span className="text-[10px] font-medium text-indigo-300 uppercase">Hotel Partners Points</span>
                <p className="text-base font-bold mt-0.5 text-indigo-300">{result.hotelPoints.toLocaleString()} Pts</p>
              </div>
            </div>
          </div>

          {/* Details Card */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4">
            <div className="text-[10px] text-slate-400 bg-slate-50/50 p-4 rounded-xl border border-slate-100/50 leading-relaxed">
              SmartBuy spends capped by card rules. Point transfers to airline/hotel loyalty programs (Vistara, Marriott Bonvoy, Singapore KrisFlyer) subject to partner ratio updates.
            </div>
          </div>
        </div>
      </div>

      <AdBanner placement="insights_sponsored" targetCalculator="cc_rewards" />
    </div>
  );
}
