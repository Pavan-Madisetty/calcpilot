'use client';

import React, { useState, useEffect } from 'react';
import { calculateNoCostEmi, NoCostEmiOutput } from '../../lib/calculators';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { HelpCircle, Percent, Receipt, ShieldCheck, ArrowRight, Download, Printer } from 'lucide-react';
import AdBanner from '../AdBanner';

export default function NoCostEmiCalculator() {
  // Inputs
  const [productPrice, setProductPrice] = useState(50000);
  const [downPayment, setDownPayment] = useState(0);
  const [processingFee, setProcessingFee] = useState(199);
  const [discountOffered, setDiscountOffered] = useState(3800); // Upfront discount
  const [gstPercent, setGstPercent] = useState(18);
  const [tenureMonths, setTenureMonths] = useState(6);
  
  // Toggles
  const [includeProcessingFee, setIncludeProcessingFee] = useState(true);
  const [includeGst, setIncludeGst] = useState(true);
  const [includeForegoneDiscount, setIncludeForegoneDiscount] = useState(true);

  // Result state
  const [result, setResult] = useState<NoCostEmiOutput | null>(null);
  const [showAmortization, setShowAmortization] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Auto-estimate standard discount if price changes
  useEffect(() => {
    // Estimate upfront discount based on 15% bank interest rate
    const netPrice = productPrice - downPayment;
    if (netPrice <= 0) return;
    
    const r = 15 / 12 / 100; // 15% p.a.
    const E = netPrice / tenureMonths;
    const factor = (1 - Math.pow(1 + r, -tenureMonths)) / r;
    const L = E * factor;
    const estimatedDiscount = Math.round(netPrice - L);
    setDiscountOffered(Math.max(0, estimatedDiscount));
  }, [productPrice, downPayment, tenureMonths]);

  // Recalculate results
  useEffect(() => {
    const netPrice = productPrice - downPayment;
    const emi = tenureMonths > 0 ? Math.round(netPrice / tenureMonths) : 0;

    const res = calculateNoCostEmi({
      productPrice,
      downPayment,
      processingFee,
      discountOffered,
      gstPercent,
      tenureMonths,
      monthlyEmi: emi,
      includeProcessingFee,
      includeGst,
      includeForegoneDiscount,
    });
    setResult(res);
  }, [
    productPrice,
    downPayment,
    processingFee,
    discountOffered,
    gstPercent,
    tenureMonths,
    includeProcessingFee,
    includeGst,
    includeForegoneDiscount,
  ]);

  if (!result) return null;

  // Pie chart data
  const chartData = [
    { name: 'Outright Cash Price', value: productPrice - (includeForegoneDiscount ? discountOffered : 0) },
    { name: 'Interest Cost', value: result.effectiveInterestCost },
    { name: 'Processing Fees & GST', value: (includeProcessingFee ? processingFee : 0) + (includeGst ? (processingFee * (gstPercent / 100)) : 0) },
  ];

  const COLORS = ['#4f46e5', '#f43f5e', '#f59e0b']; // Indigo, Rose, Amber

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}${window.location.pathname}?price=${productPrice}&tenure=${tenureMonths}&fee=${processingFee}&disc=${discountOffered}`;
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
    setProductPrice(50000);
    setDownPayment(0);
    setProcessingFee(199);
    setGstPercent(18);
    setTenureMonths(6);
    setIncludeProcessingFee(true);
    setIncludeGst(true);
    setIncludeForegoneDiscount(true);
  };

  return (
    <div className="space-y-6 print:space-y-4">
      {/* Title */}
      <div className="flex justify-between items-center print:hidden">
        <div>
          <h2 className="text-2xl font-bold font-display text-slate-800">
            No Cost EMI Decoder
          </h2>
          <p className="text-sm text-slate-500">
            Reveal the hidden interest rate, fees, and true cost of &quot;0%&quot; EMI offers.
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

      {/* Ad slot */}
      <div className="print:hidden">
        <AdBanner placement="calc_inline" targetCalculator="no-cost-emi" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 print:grid-cols-1 print:gap-4">
        
        {/* Left Side: Inputs */}
        <div className="lg:col-span-7 bg-white border border-slate-200 p-6 rounded-2xl space-y-6 shadow-sm print:border-none print:shadow-none print:p-0">
          
          <h3 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2 print:hidden">
            <Receipt size={18} className="text-indigo-600" /> Offer Details
          </h3>

          <div className="space-y-4">
            
            {/* Product Price */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-slate-700">Product Price</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-400 text-sm">₹</span>
                  <input
                    type="number"
                    value={productPrice}
                    onChange={(e) => setProductPrice(Math.max(0, Number(e.target.value)))}
                    className="w-32 pl-6 pr-3 py-1 text-sm text-right border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <input
                type="range"
                min="5000"
                max="500000"
                step="5000"
                value={productPrice}
                onChange={(e) => setProductPrice(Number(e.target.value))}
                className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 print:hidden"
              />
            </div>

            {/* Down Payment */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-slate-700">Down Payment (if any)</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-400 text-sm">₹</span>
                  <input
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Math.min(productPrice, Math.max(0, Number(e.target.value))))}
                    className="w-32 pl-6 pr-3 py-1 text-sm text-right border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <input
                type="range"
                min="0"
                max={productPrice}
                step="1000"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 print:hidden"
              />
            </div>

            {/* Tenure Selector */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 block">EMI Tenure (Months)</label>
              <div className="grid grid-cols-6 gap-2 print:grid-cols-6">
                {[3, 6, 9, 12, 18, 24].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setTenureMonths(m)}
                    className={`py-2 text-xs font-bold rounded-xl border transition cursor-pointer ${
                      tenureMonths === m
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {m}M
                  </button>
                ))}
              </div>
            </div>

            {/* Processing Fee */}
            <div className="flex justify-between items-center py-2 border-t border-slate-100">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
                Processing Fee 
                <span className="group relative text-slate-400 cursor-pointer">
                  <HelpCircle size={14} />
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-800 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition pointer-events-none z-10 leading-normal">
                    One-time bank charge to process the credit card EMI conversion.
                  </span>
                </span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-400 text-sm">₹</span>
                <input
                  type="number"
                  value={processingFee}
                  onChange={(e) => setProcessingFee(Math.max(0, Number(e.target.value)))}
                  className="w-24 pl-6 pr-3 py-1 text-sm text-right border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Upfront Retailer Discount */}
            <div className="flex justify-between items-center py-2 border-t border-slate-100">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
                Upfront Discount (Interest relief)
                <span className="group relative text-slate-400 cursor-pointer">
                  <HelpCircle size={14} />
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-800 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition pointer-events-none z-10 leading-normal">
                    The discount given by the store to compensate for bank interest charges.
                  </span>
                </span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-400 text-sm">₹</span>
                <input
                  type="number"
                  value={discountOffered}
                  onChange={(e) => setDiscountOffered(Math.max(0, Number(e.target.value)))}
                  className="w-24 pl-6 pr-3 py-1 text-sm text-right border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Calculation Toggle Factors */}
            <div className="pt-4 border-t border-slate-100 space-y-3 print:hidden">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Include in True Cost Decoding:</span>
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-600">Include Foregone Cash Discount</span>
                <button
                  type="button"
                  onClick={() => setIncludeForegoneDiscount(!includeForegoneDiscount)}
                  className={`w-10 h-5 rounded-full transition relative ${includeForegoneDiscount ? 'bg-indigo-600' : 'bg-slate-200'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full transition-transform ${includeForegoneDiscount ? 'translate-x-5' : ''}`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-600">Include GST (18%) on Bank Interest</span>
                <button
                  type="button"
                  onClick={() => setIncludeGst(!includeGst)}
                  className={`w-10 h-5 rounded-full transition relative ${includeGst ? 'bg-indigo-600' : 'bg-slate-200'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full transition-transform ${includeGst ? 'translate-x-5' : ''}`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-600">Include Processing Fees &amp; Fee GST</span>
                <button
                  type="button"
                  onClick={() => setIncludeProcessingFee(!includeProcessingFee)}
                  className={`w-10 h-5 rounded-full transition relative ${includeProcessingFee ? 'bg-indigo-600' : 'bg-slate-200'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full transition-transform ${includeProcessingFee ? 'translate-x-5' : ''}`} />
                </button>
              </div>
            </div>

            {/* Reset & copy link buttons */}
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
          
          {/* Main summary card */}
          <div className="bg-gradient-to-tr from-indigo-900 to-slate-900 text-white p-6 rounded-2xl shadow-sm border border-slate-800 space-y-6 print:border-none print:p-4 print:text-black print:bg-none print:from-transparent print:to-transparent">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 print:text-slate-500">True Effective Interest Rate</span>
              <h3 className="text-4xl font-extrabold font-display mt-0.5 flex items-baseline gap-1 print:text-slate-800">
                {result.effectiveAnnualRate.toFixed(2)}%
                <span className="text-xs font-medium text-indigo-200 print:text-slate-500">p.a. EIR</span>
              </h3>
              <p className="text-[11px] text-indigo-200 mt-1 leading-normal print:text-slate-500">
                {result.effectiveAnnualRate > 0 
                  ? 'Due to processing fees, GST, and foregone discounts, this EMI is not free.'
                  : 'This EMI is truly free. No hidden interest costs found!'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-indigo-800/50 pt-4 print:border-slate-200">
              <div>
                <span className="text-[10px] font-medium text-indigo-300 uppercase print:text-slate-500">Base Monthly EMI</span>
                <p className="text-base font-bold mt-0.5 print:text-slate-800">{formatCurrency(productPrice / tenureMonths)}</p>
              </div>
              <div>
                <span className="text-[10px] font-medium text-indigo-300 uppercase print:text-slate-500">Total Hidden Cost</span>
                <p className="text-base font-bold mt-0.5 text-rose-400 print:text-rose-600">{formatCurrency(result.hiddenCharges)}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <span className="text-[10px] font-medium text-indigo-300 uppercase print:text-slate-500">Product List Price</span>
                <p className="text-base font-bold mt-0.5 print:text-slate-800">{formatCurrency(productPrice)}</p>
              </div>
              <div>
                <span className="text-[10px] font-medium text-indigo-300 uppercase print:text-slate-500">Total Paid on EMI</span>
                <p className="text-base font-bold mt-0.5 text-emerald-400 print:text-emerald-700">{formatCurrency(result.totalAmountPaid)}</p>
              </div>
            </div>

            <div className="border-t border-indigo-800/50 pt-4 flex items-center gap-2 print:border-slate-200">
              <div className="h-5 w-5 bg-indigo-500/20 text-indigo-300 rounded flex items-center justify-center print:hidden">
                <ShieldCheck size={14} />
              </div>
              <span className="text-[10px] text-indigo-200 leading-normal print:text-slate-600">
                Compared to outright cash purchase, choosing this EMI option results in a{' '}
                <strong className={result.savingsOrLoss < 0 ? 'text-rose-300 print:text-rose-600' : 'text-emerald-300 print:text-emerald-700'}>
                  {result.savingsOrLoss < 0 ? 'net extra cost of' : 'net savings of'}{' '}
                  {formatCurrency(Math.abs(result.savingsOrLoss))}
                </strong>.
              </span>
            </div>
          </div>

          {/* Visual chart */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm print:hidden">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">Total Cost Breakdown</h4>
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

      {/* Monthly amortization breakdown */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm print:border-none print:shadow-none print:p-0">
        <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-800">Monthly Amortization Log</h3>
            <p className="text-xs text-slate-400">Month-by-month payment and outstanding loan tracking.</p>
          </div>
          <button
            onClick={() => setShowAmortization(!showAmortization)}
            className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-xs font-bold rounded-lg transition cursor-pointer print:hidden"
          >
            {showAmortization ? 'Hide Breakdown' : 'Show Breakdown'}
          </button>
        </div>

        {(showAmortization || typeof window !== 'undefined' && window.matchMedia('print').matches) && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="py-2">Month</th>
                  <th className="py-2 text-right">Base EMI</th>
                  <th className="py-2 text-right">Principal</th>
                  <th className="py-2 text-right">Effective Interest</th>
                  {includeGst && <th className="py-2 text-right">Interest GST (18%)</th>}
                  <th className="py-2 text-right">Total Payable</th>
                  <th className="py-2 text-right">Outstanding Balance</th>
                </tr>
              </thead>
              <tbody>
                {result.amortizationSchedule.map((row) => (
                  <tr key={row.month} className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="py-2.5 font-semibold text-slate-700">Month {row.month}</td>
                    <td className="py-2.5 text-right font-medium text-slate-600">{formatCurrency(row.emi)}</td>
                    <td className="py-2.5 text-right text-slate-600">{formatCurrency(row.principal)}</td>
                    <td className="py-2.5 text-right text-slate-600">{formatCurrency(row.interest)}</td>
                    {includeGst && <td className="py-2.5 text-right text-rose-500">{formatCurrency(row.gstOnInterest)}</td>}
                    <td className="py-2.5 text-right font-semibold text-slate-800">{formatCurrency(row.totalMonthlyPayment)}</td>
                    <td className="py-2.5 text-right text-slate-500">{formatCurrency(row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
