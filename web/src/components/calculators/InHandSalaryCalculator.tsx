'use client';

import React, { useState, useEffect } from 'react';
import { calculateSalaryStructure, SalaryOutput } from '../../lib/calculators';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { HelpCircle, Percent, Coins, ShieldCheck, Printer, ArrowRight } from 'lucide-react';
import AdBanner from '../AdBanner';

export default function InHandSalaryCalculator() {
  // Inputs
  const [annualCtc, setAnnualCtc] = useState(1500000);
  const [basicSalaryPercent, setBasicSalaryPercent] = useState(50);
  const [hraPercent, setHraPercent] = useState(40);
  const [performanceBonus, setPerformanceBonus] = useState(100000);
  const [variablePay, setVariablePay] = useState(0);
  
  const [employerPfType, setEmployerPfType] = useState<'standard' | 'actual' | 'none'>('standard');
  const [employeePfType, setEmployeePfType] = useState<'standard' | 'actual' | 'none'>('standard');
  
  const [npsEmployee, setNpsEmployee] = useState(0);
  const [npsEmployer, setNpsEmployer] = useState(0);
  const [professionalTax, setProfessionalTax] = useState(2500);
  const [otherDeductions, setOtherDeductions] = useState(0);

  // HRA & Exemptions (for Old Regime)
  const [rentPaid, setRentPaid] = useState(20000); // Monthly rent
  const [isMetro, setIsMetro] = useState(true);
  const [insurance80D, setInsurance80D] = useState(15000);
  const [homeLoanInterest, setHomeLoanInterest] = useState(0);
  const [other80C, setOther80C] = useState(50000); // ELSS, LIC, PPF, etc.

  // Outputs
  const [result, setResult] = useState<SalaryOutput | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    const res = calculateSalaryStructure({
      annualCtc,
      basicSalaryPercent,
      hraPercent,
      performanceBonus,
      variablePay,
      employerPfType,
      employeePfType,
      npsEmployee,
      npsEmployer,
      professionalTax,
      otherDeductions,
      rentPaid,
      isMetro,
      insurance80D,
      homeLoanInterest,
      other80C,
    });
    setResult(res);
  }, [
    annualCtc,
    basicSalaryPercent,
    hraPercent,
    performanceBonus,
    variablePay,
    employerPfType,
    employeePfType,
    npsEmployee,
    npsEmployer,
    professionalTax,
    otherDeductions,
    rentPaid,
    isMetro,
    insurance80D,
    homeLoanInterest,
    other80C,
  ]);

  if (!result) return null;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Determine best regime
  const isNewBetter = result.newRegime.netAnnualSalary >= result.oldRegime.netAnnualSalary;
  const bestRegime = isNewBetter ? result.newRegime : result.oldRegime;
  const recommendedRegimeName = isNewBetter ? 'New Tax Regime' : 'Old Tax Regime';
  const yearlySavings = Math.abs(result.newRegime.netAnnualSalary - result.oldRegime.netAnnualSalary);
  const monthlySavings = yearlySavings / 12;

  // Pie chart data for recommended regime
  const pieData = [
    { name: 'Net Take-Home', value: bestRegime.netAnnualSalary },
    { name: 'Income Tax', value: bestRegime.totalTax },
    { name: 'PF & NPS Deductions', value: bestRegime.pfEmployeeDeduction + bestRegime.npsEmployeeDeduction + bestRegime.npsEmployerDeduction + result.employerPf },
    { name: 'Other Deductions & PT', value: professionalTax + otherDeductions },
  ];
  const PIE_COLORS = ['#4f46e5', '#f43f5e', '#10b981', '#f59e0b']; // Indigo, Rose, Emerald, Amber

  // Bar chart comparing Old vs New regimes
  const compareData = [
    {
      name: 'Net Take-Home',
      'Old Regime': Math.round(result.oldRegime.netAnnualSalary),
      'New Regime': Math.round(result.newRegime.netAnnualSalary),
    },
    {
      name: 'Income Tax',
      'Old Regime': Math.round(result.oldRegime.totalTax),
      'New Regime': Math.round(result.newRegime.totalTax),
    },
    {
      name: 'Taxable Income',
      'Old Regime': Math.round(result.oldRegime.taxableIncome),
      'New Regime': Math.round(result.newRegime.taxableIncome),
    },
  ];

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}${window.location.pathname}?ctc=${annualCtc}&rent=${rentPaid}&basic=${basicSalaryPercent}`;
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
    setAnnualCtc(1500000);
    setBasicSalaryPercent(50);
    setHraPercent(40);
    setPerformanceBonus(100000);
    setVariablePay(0);
    setEmployerPfType('standard');
    setEmployeePfType('standard');
    setNpsEmployee(0);
    setNpsEmployer(0);
    setProfessionalTax(2500);
    setOtherDeductions(0);
    setRentPaid(20000);
    setIsMetro(true);
    setInsurance80D(15000);
    setHomeLoanInterest(0);
    setOther80C(50000);
  };

  return (
    <div className="space-y-6 print:space-y-4">
      {/* Title */}
      <div className="flex justify-between items-center print:hidden">
        <div>
          <h2 className="text-2xl font-bold font-display text-slate-800">
            In-Hand Salary Calculator
          </h2>
          <p className="text-sm text-slate-500">
            Decode your CTC and calculate your monthly take-home salary after taxes and deductions.
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
        <AdBanner placement="calc_inline" targetCalculator="in-hand-salary" />
      </div>

      {/* Grid wrapper */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 print:grid-cols-1 print:gap-4">
        
        {/* Inputs section */}
        <div className="lg:col-span-7 bg-white border border-slate-200 p-6 rounded-2xl space-y-6 shadow-sm print:border-none print:shadow-none print:p-0">
          
          <h3 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2 print:hidden">
            <Coins size={18} className="text-indigo-600" /> Salary Configuration
          </h3>

          <div className="space-y-5">
            {/* CTC */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-slate-700">Annual CTC</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-400 text-sm">₹</span>
                  <input
                    type="number"
                    value={annualCtc}
                    onChange={(e) => setAnnualCtc(Math.max(0, Number(e.target.value)))}
                    className="w-36 pl-6 pr-3 py-1 text-sm text-right border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <input
                type="range"
                min="100000"
                max="10000000"
                step="50000"
                value={annualCtc}
                onChange={(e) => setAnnualCtc(Number(e.target.value))}
                className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 print:hidden"
              />
              <div className="flex justify-between text-[10px] text-slate-400 print:hidden">
                <span>₹1 Lakh</span>
                <span>₹1 Crore</span>
              </div>
            </div>

            {/* Basic & HRA Percents */}
            <div className="grid grid-cols-2 gap-4 print:grid-cols-2">
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-slate-700">Basic Salary % of CTC</label>
                  <span className="text-xs text-slate-500 font-bold">{basicSalaryPercent}%</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="70"
                  step="5"
                  value={basicSalaryPercent}
                  onChange={(e) => setBasicSalaryPercent(Number(e.target.value))}
                  className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 print:hidden"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-slate-700">HRA % of Basic</label>
                  <span className="text-xs text-slate-500 font-bold">{hraPercent}%</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="50"
                  step="5"
                  value={hraPercent}
                  onChange={(e) => setHraPercent(Number(e.target.value))}
                  className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 print:hidden"
                />
              </div>
            </div>

            {/* Bonus & Variable Pay */}
            <div className="grid grid-cols-2 gap-4 print:grid-cols-2">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 block">Annual Bonus / Variable</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-400 text-xs">₹</span>
                  <input
                    type="number"
                    value={performanceBonus}
                    onChange={(e) => setPerformanceBonus(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-6 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 block">Other Monthly Rent Paid</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-400 text-xs">₹</span>
                  <input
                    type="number"
                    value={rentPaid}
                    onChange={(e) => setRentPaid(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-6 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* EPF selection grid */}
            <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-3 print:grid-cols-2">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Employer EPF Contribution</label>
                <div className="flex rounded-lg border border-slate-200 p-0.5 bg-slate-50">
                  {([
                    { label: 'None', val: 'none' },
                    { label: 'Capped (1.8k)', val: 'standard' },
                    { label: '12% Basic', val: 'actual' },
                  ] as const).map((opt) => (
                    <button
                      key={opt.val}
                      type="button"
                      onClick={() => setEmployerPfType(opt.val)}
                      className={`flex-1 py-1 text-[10px] font-bold rounded-md transition cursor-pointer ${
                        employerPfType === opt.val
                          ? 'bg-white text-indigo-600 shadow-sm border border-slate-200/50'
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Employee EPF Contribution</label>
                <div className="flex rounded-lg border border-slate-200 p-0.5 bg-slate-50">
                  {([
                    { label: 'None', val: 'none' },
                    { label: 'Capped (1.8k)', val: 'standard' },
                    { label: '12% Basic', val: 'actual' },
                  ] as const).map((opt) => (
                    <button
                      key={opt.val}
                      type="button"
                      onClick={() => setEmployeePfType(opt.val)}
                      className={`flex-1 py-1 text-[10px] font-bold rounded-md transition cursor-pointer ${
                        employeePfType === opt.val
                          ? 'bg-white text-indigo-600 shadow-sm border border-slate-200/50'
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* HRA & Old Regime Settings */}
            <div className="border-t border-slate-100 pt-3 space-y-3 print:hidden">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Old Tax Regime Exemption Settings (For Comparison)</span>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-slate-600">Metro City? (50% Basic HRA Cap)</span>
                  <button
                    type="button"
                    onClick={() => setIsMetro(!isMetro)}
                    className={`w-9 h-5 rounded-full transition relative ${isMetro ? 'bg-indigo-600' : 'bg-slate-200'}`}
                  >
                    <span className={`absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full transition-transform ${isMetro ? 'translate-x-4' : ''}`} />
                  </button>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">Section 80C Deductions (PPF, ELSS, LIC)</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-400 text-xs">₹</span>
                    <input
                      type="number"
                      value={other80C}
                      onChange={(e) => setOther80C(Math.max(0, Number(e.target.value)))}
                      className="w-full pl-6 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-slate-700 block">Health Ins. (80D)</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-2 flex items-center text-slate-400 text-[10px]">₹</span>
                    <input
                      type="number"
                      value={insurance80D}
                      onChange={(e) => setInsurance80D(Math.max(0, Number(e.target.value)))}
                      className="w-full pl-5 pr-2 py-1 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-slate-700 block">Home Loan Int. (24b)</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-2 flex items-center text-slate-400 text-[10px]">₹</span>
                    <input
                      type="number"
                      value={homeLoanInterest}
                      onChange={(e) => setHomeLoanInterest(Math.max(0, Number(e.target.value)))}
                      className="w-full pl-5 pr-2 py-1 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-slate-700 block">NPS Employee (80CCD)</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-2 flex items-center text-slate-400 text-[10px]">₹</span>
                    <input
                      type="number"
                      value={npsEmployee}
                      onChange={(e) => setNpsEmployee(Math.max(0, Number(e.target.value)))}
                      className="w-full pl-5 pr-2 py-1 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* NPS Employer */}
            <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-3 print:hidden">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 block">NPS Employer (80CCD(2))</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-400 text-xs">₹</span>
                  <input
                    type="number"
                    value={npsEmployer}
                    onChange={(e) => setNpsEmployer(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-6 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 block">Other Deductions (Ins, etc.)</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-400 text-xs">₹</span>
                  <input
                    type="number"
                    value={otherDeductions}
                    onChange={(e) => setOtherDeductions(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-6 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
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

        {/* Results output section */}
        <div className="lg:col-span-5 space-y-6 print:col-span-1 print:space-y-4">
          
          {/* Main take home pay summary */}
          <div className="bg-gradient-to-tr from-indigo-900 to-slate-900 text-white p-6 rounded-2xl shadow-sm border border-slate-800 space-y-5 print:border-none print:p-4 print:text-black print:bg-none print:from-transparent print:to-transparent">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 print:text-slate-500">Net Take-Home Salary</span>
              <h3 className="text-4xl font-extrabold font-display mt-0.5 flex items-baseline gap-1 print:text-slate-800">
                {formatCurrency(bestRegime.netMonthlySalary)}
                <span className="text-xs font-medium text-indigo-200 print:text-slate-500">/month</span>
              </h3>
              <p className="text-[11px] text-indigo-200 mt-1 leading-normal print:text-slate-500">
                Calculated under the recommended <strong className="text-white print:text-slate-800">{recommendedRegimeName}</strong>.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-indigo-800/50 pt-4 print:border-slate-200">
              <div>
                <span className="text-[10px] font-medium text-indigo-300 uppercase print:text-slate-500">Net Annual In-Hand</span>
                <p className="text-base font-bold mt-0.5 print:text-slate-800">{formatCurrency(bestRegime.netAnnualSalary)}</p>
              </div>
              <div>
                <span className="text-[10px] font-medium text-indigo-300 uppercase print:text-slate-500">Annual Tax Liability</span>
                <p className="text-base font-bold mt-0.5 text-rose-400 print:text-rose-600">{formatCurrency(bestRegime.totalTax)}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] font-medium text-indigo-300 uppercase print:text-slate-500">Gross Monthly Salary</span>
                <p className="text-base font-bold mt-0.5 print:text-slate-800">{formatCurrency(result.grossSalary / 12)}</p>
              </div>
              <div>
                <span className="text-[10px] font-medium text-indigo-300 uppercase print:text-slate-500">Total Deductions</span>
                <p className="text-base font-bold mt-0.5 text-emerald-400 print:text-emerald-700">
                  {formatCurrency(result.grossSalary - bestRegime.netAnnualSalary)}
                </p>
              </div>
            </div>

            {yearlySavings > 100 && (
              <div className="border-t border-indigo-800/50 pt-3 flex items-center gap-2 print:border-slate-200">
                <div className="h-5 w-5 bg-indigo-500/20 text-indigo-300 rounded flex items-center justify-center print:hidden">
                  <ShieldCheck size={14} />
                </div>
                <span className="text-[10px] text-indigo-200 leading-normal print:text-slate-600">
                  Selecting the {recommendedRegimeName} increases your take-home pay by{' '}
                  <strong>{formatCurrency(monthlySavings)}/month</strong> ({formatCurrency(yearlySavings)}/year) compared to the other regime.
                </span>
              </div>
            )}
          </div>

          {/* Visual chart - Recommended regime breakdown */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm print:hidden">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">CTC Composition Breakdown</h4>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  <Legend verticalAlign="bottom" iconSize={10} wrapperStyle={{ fontSize: 9 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>

      {/* Side-by-side Regime Comparison Grid */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm print:border-none print:shadow-none print:p-0">
        <h3 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-3 mb-4">Old Regime vs New Regime Side-by-Side</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-2.5">Salary Breakup Component</th>
                <th className="py-2.5 text-right">Old Regime</th>
                <th className="py-2.5 text-right">New Regime (FY 2025-26)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                <td className="py-2 text-slate-700 font-medium">Gross Annual Salary</td>
                <td className="py-2 text-right text-slate-800 font-semibold">{formatCurrency(result.oldRegime.grossSalary)}</td>
                <td className="py-2 text-right text-slate-800 font-semibold">{formatCurrency(result.newRegime.grossSalary)}</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                <td className="py-2 text-slate-600 font-normal">Less: Standard Deduction</td>
                <td className="py-2 text-right text-rose-500 font-semibold">-{formatCurrency(result.oldRegime.standardDeduction)}</td>
                <td className="py-2 text-right text-rose-500 font-semibold">-{formatCurrency(result.newRegime.standardDeduction)}</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                <td className="py-2 text-slate-600 font-normal">Less: HRA Tax Exemption</td>
                <td className="py-2 text-right text-rose-500 font-semibold">-{formatCurrency(result.oldRegime.hraExemption)}</td>
                <td className="py-2 text-right text-rose-500 font-semibold">-₹0</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                <td className="py-2 text-slate-600 font-normal">Less: 80C &amp; 80D Deductions</td>
                <td className="py-2 text-right text-rose-500 font-semibold">-{formatCurrency(result.oldRegime.otherExemptions)}</td>
                <td className="py-2 text-right text-rose-500 font-semibold">-₹0</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                <td className="py-2 text-slate-600 font-normal">Less: NPS Deductions (Employee + Employer)</td>
                <td className="py-2 text-right text-rose-500 font-semibold">
                  -{formatCurrency(result.oldRegime.npsEmployeeDeduction + result.oldRegime.npsEmployerDeduction)}
                </td>
                <td className="py-2 text-right text-rose-500 font-semibold">
                  -{formatCurrency(result.newRegime.npsEmployeeDeduction + result.newRegime.npsEmployerDeduction)}
                </td>
              </tr>
              <tr className="border-b border-slate-200 bg-slate-50/50">
                <td className="py-2.5 text-slate-700 font-bold">Total Net Taxable Income</td>
                <td className="py-2.5 text-right text-slate-800 font-extrabold">{formatCurrency(result.oldRegime.taxableIncome)}</td>
                <td className="py-2.5 text-right text-slate-800 font-extrabold">{formatCurrency(result.newRegime.taxableIncome)}</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                <td className="py-2 text-slate-600 font-normal">Calculated Income Tax (Slabs)</td>
                <td className="py-2 text-right text-rose-500">{formatCurrency(result.oldRegime.baseTax)}</td>
                <td className="py-2 text-right text-rose-500">{formatCurrency(result.newRegime.baseTax)}</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                <td className="py-2 text-slate-600 font-normal">Add: Health &amp; Education Cess (4%)</td>
                <td className="py-2 text-right text-rose-500">+{formatCurrency(result.oldRegime.cess)}</td>
                <td className="py-2 text-right text-rose-500">+{formatCurrency(result.newRegime.cess)}</td>
              </tr>
              <tr className="border-b border-slate-200 bg-slate-50/50">
                <td className="py-2.5 text-slate-700 font-bold">Total Income Tax Payable</td>
                <td className="py-2.5 text-right text-rose-600 font-extrabold">{formatCurrency(result.oldRegime.totalTax)}</td>
                <td className="py-2.5 text-right text-rose-600 font-extrabold">{formatCurrency(result.newRegime.totalTax)}</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="py-2.5 text-slate-700 font-bold">Other Deductions (PF, NPS, PT)</td>
                <td className="py-2.5 text-right text-slate-600 font-semibold">
                  {formatCurrency(result.employeePf + professionalTax + npsEmployee + result.newRegime.npsEmployerDeduction + otherDeductions)}
                </td>
                <td className="py-2.5 text-right text-slate-600 font-semibold">
                  {formatCurrency(result.employeePf + professionalTax + npsEmployee + result.newRegime.npsEmployerDeduction + otherDeductions)}
                </td>
              </tr>
              <tr className="bg-indigo-50/30">
                <td className="py-3 text-indigo-900 font-bold text-sm">Monthly In-Hand Take-Home</td>
                <td className="py-3 text-right text-indigo-950 font-extrabold text-sm">{formatCurrency(result.oldRegime.netMonthlySalary)}</td>
                <td className="py-3 text-right text-indigo-950 font-extrabold text-sm">{formatCurrency(result.newRegime.netMonthlySalary)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
