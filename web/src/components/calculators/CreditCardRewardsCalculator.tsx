'use client';

import React, { useState, useEffect } from 'react';
import { calculateCcRewards, CcRewardOutput, CcModel } from '../../lib/calculators';
import { saveCalculation } from '../../lib/store';
import { Save, CheckCircle2, CreditCard, Compass, Award, Tag, Settings2 } from 'lucide-react';
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
  const [savedSuccess, setSavedSuccess] = useState(false);

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

  const handleSave = () => {
    saveCalculation({
      name: `Rewards - ${result.cardName}`,
      type: 'cc_rewards',
      inputs: { cardType, spends: { dining, travel, grocery, fuel, utility, others } },
      outputs: {
        points: result.rewardPointsEarned,
        miles: result.airlineMiles,
        effectiveReturnPercent: result.effectiveReturnPercent,
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

  const totalSpend = dining + travel + grocery + fuel + utility + others;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
            Credit Card Rewards Calculator
          </h2>
          <p className="text-sm text-muted-foreground">
            Optimize your cards based on spends and compute reward values, airline miles, and cashback.
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
          {/* Card Select */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Select Credit Card
            </label>
            <select
              value={cardType}
              onChange={(e) => setCardType(e.target.value as CcModel)}
              className="w-full px-3 py-2 text-sm bg-input border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-ring"
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
            <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-border space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Settings2 size={14} className="text-primary" /> Configure Custom Card Rules
              </span>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Card Name</label>
                  <input
                    type="text"
                    value={customCardName}
                    onChange={(e) => setCustomCardName(e.target.value)}
                    className="w-full px-2 py-1 text-xs bg-input border border-border rounded"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Base Return (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={customBaseReturn}
                    onChange={(e) => setCustomBaseReturn(Number(e.target.value))}
                    className="w-full px-2 py-1 text-xs bg-input border border-border rounded"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Dining Multiplier</label>
                  <input
                    type="number"
                    value={customDiningMult}
                    onChange={(e) => setCustomDiningMult(Number(e.target.value))}
                    className="w-full px-2 py-1 text-xs bg-input border border-border rounded"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Travel Multiplier</label>
                  <input
                    type="number"
                    value={customTravelMult}
                    onChange={(e) => setCustomTravelMult(Number(e.target.value))}
                    className="w-full px-2 py-1 text-xs bg-input border border-border rounded"
                  />
                </div>
                <div className="space-y-1 col-span-2">
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Point Redemption Value (₹)</label>
                  <input
                    type="number"
                    step="0.05"
                    value={customPointVal}
                    onChange={(e) => setCustomPointVal(Number(e.target.value))}
                    className="w-full px-2 py-1 text-xs bg-input border border-border rounded"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Spend Category Fields */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Monthly Category Spends</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Dining (₹)</label>
                <input
                  type="number"
                  value={dining}
                  onChange={(e) => setDining(Number(e.target.value))}
                  className="w-full px-2.5 py-1 text-sm bg-input border border-border rounded-lg"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Travel/Airlines (₹)</label>
                <input
                  type="number"
                  value={travel}
                  onChange={(e) => setTravel(Number(e.target.value))}
                  className="w-full px-2.5 py-1 text-sm bg-input border border-border rounded-lg"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Grocery (₹)</label>
                <input
                  type="number"
                  value={grocery}
                  onChange={(e) => setGrocery(Number(e.target.value))}
                  className="w-full px-2.5 py-1 text-sm bg-input border border-border rounded-lg"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Fuel spends (₹)</label>
                <input
                  type="number"
                  value={fuel}
                  onChange={(e) => setFuel(Number(e.target.value))}
                  className="w-full px-2.5 py-1 text-sm bg-input border border-border rounded-lg"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Utility Spends (₹)</label>
                <input
                  type="number"
                  value={utility}
                  onChange={(e) => setUtility(Number(e.target.value))}
                  className="w-full px-2.5 py-1 text-sm bg-input border border-border rounded-lg"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Others (₹)</label>
                <input
                  type="number"
                  value={others}
                  onChange={(e) => setOthers(Number(e.target.value))}
                  className="w-full px-2.5 py-1 text-sm bg-input border border-border rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Outputs */}
        <div className="lg:col-span-5 bg-card border border-border p-6 rounded-2xl shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center rounded-xl">
                <CreditCard size={20} />
              </div>
              <div>
                <span className="text-xs text-muted-foreground block">Active Selection</span>
                <span className="font-bold text-slate-800 dark:text-slate-100">{result.cardName}</span>
              </div>
            </div>

            {/* Main Value Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-border bg-slate-50/50 dark:bg-slate-900/20">
                <span className="text-[10px] uppercase font-bold text-muted-foreground block tracking-wider">
                  Reward Points
                </span>
                <span className="text-xl font-bold block mt-1 text-slate-800 dark:text-white">
                  {result.rewardPointsEarned} RP
                </span>
              </div>

              <div className="p-4 rounded-xl border border-border bg-emerald-500/5 dark:bg-emerald-500/10 border-emerald-500/10">
                <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 block tracking-wider">
                  Effective Return
                </span>
                <span className="text-xl font-bold block mt-1 text-emerald-600 dark:text-emerald-400">
                  {formatCurrency(result.effectiveReturnAmount)}
                </span>
              </div>

              <div className="p-4 rounded-xl border border-border bg-sky-500/5 dark:bg-sky-500/10 border-sky-500/10">
                <span className="text-[10px] uppercase font-bold text-sky-600 dark:text-sky-400 block tracking-wider">
                  Airline Miles
                </span>
                <span className="text-base font-bold block mt-1 text-sky-600 dark:text-sky-400">
                  {result.airlineMiles.toLocaleString()} Miles
                </span>
              </div>

              <div className="p-4 rounded-xl border border-border bg-indigo-500/5 dark:bg-indigo-500/10 border-indigo-500/10">
                <span className="text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400 block tracking-wider">
                  Hotel Partners
                </span>
                <span className="text-base font-bold block mt-1 text-indigo-600 dark:text-indigo-400">
                  {result.hotelPoints.toLocaleString()} Points
                </span>
              </div>
            </div>

            {/* Performance display */}
            <div className="p-4 rounded-xl border border-dashed border-sky-500/20 text-center">
              <span className="text-xs text-muted-foreground block">Effective Net Return Percentage</span>
              <span className="text-2xl font-extrabold text-slate-800 dark:text-white mt-1 block">
                {result.effectiveReturnPercent.toFixed(2)}%
              </span>
              <p className="text-[10px] text-muted-foreground mt-1.5">
                Yielded on total monthly spends of {formatCurrency(totalSpend)}
              </p>
            </div>
          </div>

          <div className="text-[10px] text-muted-foreground bg-slate-50 dark:bg-slate-900/60 p-3 rounded-lg border border-border/60">
            SmartBuy spends capped by card rules. Point transfers to airline/hotel loyalty programs (Vistara, Marriott Bonvoy, Singapore KrisFlyer) subject to partner ratio updates.
          </div>
        </div>
      </div>

      <AdBanner placement="insights_sponsored" targetCalculator="cc_rewards" />
    </div>
  );
}
