'use client';

import React, { useState, useEffect } from 'react';
import { calculateHraExemption, HraExemptionOutput } from '../../lib/calculators';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { HelpCircle, Percent, Home, ShieldCheck, Printer, ArrowRight } from 'lucide-react';
import AdBanner from '../AdBanner';

export default function HraCalculator() {
  // Inputs
  const [basicSalary, setBasicSalary] = useState(50000);
  const [hraReceived, setHraReceived] = useState(20000);
  const [rentPaid, setRentPaid] = useState(18000);
  const [isMetro, setIsMetro] = useState(true);
  const [isMonthly, setIsMonthly] = useState(true);
  const [taxBracket, setTaxBracket] = useState(20); // 5, 10, 15, 20, 30

  // Result state
  const [result, setResult] = useState<HraExemptionOutput | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    const res = calculateHraExemption({
      basicSalary,
      hraReceived,
      rentPaid,
      isMetro,
      isMonthly,
    });
    setResult(res);
  }, [basicSalary, hraReceived, rentPaid, isMetro, isMonthly]);

  if (!result) return null;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const multLabel = isMonthly ? '/month' : '/year';

  // Pie chart data
  const chartData = [
    { name: 'Exempted HRA (Tax-Free)', value: result.exemptedHra },
    { name: 'Taxable HRA', value: result.taxableHra },
  ];

  const COLORS = ['#10b981', '#f43f5e']; // Emerald (Tax-free), Rose (Taxable)

  // Determine which rule is the limiting factor
  const minVal = Math.min(result.actualHra, result.rentMinusTenBasic, result.fiftyOrFortyBasic);
  let limitingRule = '';
  if (minVal === result.actualHra) {
    limitingRule = 'Rule 1: Actual HRA received. You are fully exempting HRA or your employer HRA is low.';
  } else if (minVal === result.rentMinusTenBasic) {
    limitingRule = 'Rule 2: Rent Paid minus 10% of Basic. You can increase tax savings by paying higher rent or restructuring salary basic.';
  } else {
    limitingRule = `Rule 3: HRA Cap (${isMetro ? '50%' : '40%'} of Basic). You have reached the maximum tax exemption cap allowed for your city type.`;
  }

  // Calculate potential tax savings
  const annualSavings = result.exemptedHra * (taxBracket / 100) * (isMonthly ? 12 : 1);
  const monthlySavings = annualSavings / 12;

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}${window.location.pathname}?basic=${basicSalary}&hra=${hraReceived}&rent=${rentPaid}&metro=${isMetro}`;
      navigator.clipboard.writeText(url);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const resetFields = () => {
    setBasicSalary(50000);
    setHraReceived(20000);
    setRentPaid(18000);
    setIsMetro(true);
    setIsMonthly(true);
    setTaxBracket(20);
  };

  return (
    <div className="space-y-6 print:space-y-4">
      {/* Title */}
      <div className="flex justify-between items-center print:hidden">
        <div>
          <h2 className="text-2xl font-bold font-display text-slate-800">
            HRA Exemption Calculator
          </h2>
          <p className="text-sm text-slate-500">
            Calculate your house rent allowance tax exemptions under Section 10(13A) of Indian Income Tax rules.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition"
          >
            <Printer size={14} /> Print Report
          </button>
        </div>
      </div>

      <div className="print:hidden">
        <AdBanner placement="calc_inline" targetCalculator="hra" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 print:grid-cols-1 print:gap-4">
        
        {/* Left Side: Inputs */}
        <div className="lg:col-span-7 bg-white border border-slate-200 p-6 rounded-2xl space-y-6 shadow-sm print:border-none print:shadow-none print:p-0">
          
          <div className="flex justify-between items-center border-b border-slate-100 pb-3 print:hidden">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Home size={18} className="text-indigo-600" /> Rent &amp; Salary Details
            </h3>
            
            {/* Monthly / Annual toggle */}
            <div className="flex rounded-lg border border-slate-200 p-0.5 bg-slate-50">
              <button
                type="button"
                onClick={() => setIsMonthly(true)}
                className={`px-3 py-1 text-xs font-bold rounded-md transition cursor-pointer ${
                  isMonthly ? 'bg-white text-indigo-600 shadow-sm border border-slate-200/50' : 'text-slate-500'
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setIsMonthly(false)}
                className={`px-3 py-1 text-xs font-bold rounded-md transition cursor-pointer ${
                  !isMonthly ? 'bg-white text-indigo-600 shadow-sm border border-slate-200/50' : 'text-slate-500'
                }`}
              >
                Annual
              </button>
            </div>
          </div>

          <div className="space-y-4">
            
            {/* Basic Salary */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-slate-700">Basic Salary + DA</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-400 text-sm">₹</span>
                  <input
                    type="number"
                    value={basicSalary}
                    onChange={(e) => setBasicSalary(Math.max(0, Number(e.target.value)))}
                    className="w-32 pl-6 pr-3 py-1 text-sm text-right border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <input
                type="range"
                min={isMonthly ? 10000 : 120000}
                max={isMonthly ? 300000 : 3600000}
                step={isMonthly ? 5000 : 60000}
                value={basicSalary}
                onChange={(e) => setBasicSalary(Number(e.target.value))}
                className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 print:hidden"
              />
            </div>

            {/* HRA Received */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-slate-700">HRA Received</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-400 text-sm">₹</span>
                  <input
                    type="number"
                    value={hraReceived}
                    onChange={(e) => setHraReceived(Math.max(0, Number(e.target.value)))}
                    className="w-32 pl-6 pr-3 py-1 text-sm text-right border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <input
                type="range"
                min={isMonthly ? 5000 : 60000}
                max={isMonthly ? 150000 : 1800000}
                step={isMonthly ? 2000 : 24000}
                value={hraReceived}
                onChange={(e) => setHraReceived(Number(e.target.value))}
                className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 print:hidden"
              />
            </div>

            {/* Rent Paid */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-slate-700">Rent Paid</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-400 text-sm">₹</span>
                  <input
                    type="number"
                    value={rentPaid}
                    onChange={(e) => setRentPaid(Math.max(0, Number(e.target.value)))}
                    className="w-32 pl-6 pr-3 py-1 text-sm text-right border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <input
                type="range"
                min={isMonthly ? 0 : 0}
                max={isMonthly ? 150000 : 1800000}
                step={isMonthly ? 2000 : 24000}
                value={rentPaid}
                onChange={(e) => setRentPaid(Number(e.target.value))}
                className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 print:hidden"
              />
            </div>

            {/* City type */}
            <div className="flex items-center justify-between py-2 border-t border-slate-100">
              <span className="text-sm font-semibold text-slate-700">Residing in a Metro City?</span>
              <button
                type="button"
                onClick={() => setIsMetro(!isMetro)}
                className={`w-10 h-5 rounded-full transition relative ${isMetro ? 'bg-indigo-600' : 'bg-slate-200'}`}
              >
                <span className={`absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full transition-transform ${isMetro ? 'translate-x-5' : ''}`} />
              </button>
            </div>
            <p className="text-[10px] text-slate-400 -mt-2 leading-relaxed">
              Metro cities (Delhi, Mumbai, Kolkata, Chennai) qualify for a 50% Basic cap. All other cities qualify for a 40% cap.
            </p>

            {/* Estimated tax bracket */}
            <div className="space-y-2 border-t border-slate-100 pt-3 print:hidden">
              <label className="text-xs font-semibold text-slate-700 block">Your Income Tax Slab (For Savings Calculation)</label>
              <div className="grid grid-cols-5 gap-2">
                {[5, 10, 15, 20, 30].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTaxBracket(t)}
                    className={`py-1.5 text-xs font-bold rounded-lg border transition cursor-pointer ${
                      taxBracket === t
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {t}%
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 flex gap-3 print:hidden">
              <button
                type="button"
                onClick={resetFields}
                className="flex-1 py-2 text-xs font-bold text-slate-500 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition cursor-pointer"
              >
                Reset Fields
              </button>
              <button
                type="button"
                onClick={handleCopyLink}
                className="flex-1 py-2 text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 rounded-xl transition cursor-pointer"
              >
                {copySuccess ? 'Link Copied! ✓' : 'Share Results'}
              </button>
            </div>

          </div>
        </div>

        {/* Right Side: Outputs */}
        <div className="lg:col-span-5 space-y-6 print:col-span-1 print:space-y-4">
          
          {/* Summary Card */}
          <div className="bg-gradient-to-tr from-indigo-900 to-slate-900 text-white p-6 rounded-2xl shadow-sm border border-slate-800 space-y-6 print:border-none print:p-4 print:text-black print:bg-none print:from-transparent print:to-transparent">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 print:text-slate-500">Tax Exempt HRA Exemption</span>
              <h3 className="text-4xl font-extrabold font-display mt-0.5 flex items-baseline gap-1 print:text-slate-800">
                {formatCurrency(result.exemptedHra)}
                <span className="text-xs font-medium text-indigo-200 print:text-slate-500">{multLabel}</span>
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-indigo-800/50 pt-4 print:border-slate-200">
              <div>
                <span className="text-[10px] font-medium text-indigo-300 uppercase print:text-slate-500">Taxable HRA portion</span>
                <p className="text-base font-bold mt-0.5 text-rose-400 print:text-rose-600">{formatCurrency(result.taxableHra)}</p>
              </div>
              <div>
                <span className="text-[10px] font-medium text-indigo-300 uppercase print:text-slate-500">HRA Received</span>
                <p className="text-base font-bold mt-0.5 print:text-slate-800">{formatCurrency(hraReceived)}</p>
              </div>
            </div>

            <div className="border-t border-indigo-800/50 pt-4 flex items-center gap-2 print:border-slate-200">
              <div className="h-5 w-5 bg-indigo-500/20 text-indigo-300 rounded flex items-center justify-center print:hidden">
                <ShieldCheck size={14} />
              </div>
              <span className="text-[10px] text-indigo-200 leading-normal print:text-slate-600">
                This exemption saves you roughly <strong className="text-emerald-300 print:text-emerald-700">{formatCurrency(annualSavings / (isMonthly ? 12 : 1))}</strong>{' '}
                in monthly income tax outlay at your estimated {taxBracket}% tax slab.
              </span>
            </div>
          </div>

          {/* Recharts chart */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm print:hidden">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">HRA Composition Breakdown</h4>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  <Legend verticalAlign="bottom" iconSize={10} wrapperStyle={{ fontSize: 10 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>

      {/* Step by step formulas */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm print:border-none print:shadow-none print:p-0">
        <h3 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-3 mb-4">Calculations Breakdown &amp; Exemptions Slabs</h3>
        <div className="space-y-4 text-xs leading-relaxed text-slate-600">
          
          <p>
            Under Section 10(13A) of the Income Tax Act, the exempted HRA is the <strong>minimum</strong> of the following three rules:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/50">
              <span className="font-bold text-slate-400 block mb-1">Rule 1: Actual HRA</span>
              <p className="text-slate-800 font-semibold text-sm">{formatCurrency(result.actualHra)}</p>
              <span className="text-[10px] text-slate-400">Total HRA allowance received from your employer.</span>
            </div>

            <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/50">
              <span className="font-bold text-slate-400 block mb-1">Rule 2: Excess Rent</span>
              <p className="text-slate-800 font-semibold text-sm">{formatCurrency(result.rentMinusTenBasic)}</p>
              <span className="text-[10px] text-slate-400">Rent paid minus 10% of your Basic salary.</span>
            </div>

            <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/50">
              <span className="font-bold text-slate-400 block mb-1">Rule 3: City Cap</span>
              <p className="text-slate-800 font-semibold text-sm">{formatCurrency(result.fiftyOrFortyBasic)}</p>
              <span className="text-[10px] text-slate-400">{isMetro ? '50%' : '40%'} of basic salary based on your city category.</span>
            </div>

          </div>

          <div className="border-t border-slate-100 pt-3 flex flex-col gap-1.5">
            <span className="font-bold text-slate-700">Limiting Factor:</span>
            <p className="text-indigo-600 font-semibold">{limitingRule}</p>
          </div>

        </div>
      </div>
    </div>
  );
}
