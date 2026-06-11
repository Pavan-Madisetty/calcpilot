/**
 * ZeroEMI Core Math & Calculator Engines
 */

// ==========================================
// 1. EMI CALCULATOR
// ==========================================

export interface EmiInput {
  loanAmount: number;
  interestRate: number; // annual interest rate in %
  tenureYears: number;
  processingFeePercent?: number; // optional processing fee %
}

export interface AmortizationPeriod {
  periodNumber: number;
  principalPaid: number;
  interestPaid: number;
  totalPaid: number;
  remainingBalance: number;
}

export interface EmiOutput {
  monthlyEmi: number;
  totalInterest: number;
  totalPayment: number;
  processingFeeAmount: number;
  amortizationSchedule: AmortizationPeriod[];
  yearlyAmortization: {
    year: number;
    principalPaid: number;
    interestPaid: number;
    totalPaid: number;
    endingBalance: number;
  }[];
}

export function calculateEmi({
  loanAmount,
  interestRate,
  tenureYears,
  processingFeePercent = 0,
}: EmiInput): EmiOutput {
  const P = loanAmount;
  const annualR = interestRate;
  const r = annualR / 12 / 100; // monthly rate
  const n = tenureYears * 12; // months

  let monthlyEmi = 0;
  if (r === 0) {
    monthlyEmi = P / n;
  } else {
    monthlyEmi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }

  const processingFeeAmount = P * (processingFeePercent / 100);
  const totalPaymentWithoutFee = monthlyEmi * n;
  const totalInterest = totalPaymentWithoutFee - P;
  const totalPayment = totalPaymentWithoutFee + processingFeeAmount;

  const amortizationSchedule: AmortizationPeriod[] = [];
  let remainingBalance = P;

  for (let i = 1; i <= n; i++) {
    const interestPaid = remainingBalance * r;
    const principalPaid = monthlyEmi - interestPaid;
    remainingBalance = Math.max(0, remainingBalance - principalPaid);

    amortizationSchedule.push({
      periodNumber: i,
      principalPaid,
      interestPaid,
      totalPaid: monthlyEmi,
      remainingBalance,
    });
  }

  // Group by year for visual graphs
  const yearlyAmortization: EmiOutput['yearlyAmortization'] = [];
  let yearlyPrincipal = 0;
  let yearlyInterest = 0;
  let yearlyTotal = 0;

  amortizationSchedule.forEach((month) => {
    yearlyPrincipal += month.principalPaid;
    yearlyInterest += month.interestPaid;
    yearlyTotal += month.totalPaid;

    if (month.periodNumber % 12 === 0 || month.periodNumber === n) {
      const yearNum = Math.ceil(month.periodNumber / 12);
      yearlyAmortization.push({
        year: yearNum,
        principalPaid: yearlyPrincipal,
        interestPaid: yearlyInterest,
        totalPaid: yearlyTotal,
        endingBalance: month.remainingBalance,
      });
      yearlyPrincipal = 0;
      yearlyInterest = 0;
      yearlyTotal = 0;
    }
  });

  return {
    monthlyEmi,
    totalInterest,
    totalPayment,
    processingFeeAmount,
    amortizationSchedule,
    yearlyAmortization,
  };
}

// ==========================================
// 2. SIP CALCULATOR
// ==========================================

export interface SipInput {
  monthlyInvestment: number;
  expectedReturnAnnual: number;
  tenureYears: number;
}

export interface SipYearlyGrowth {
  year: number;
  totalInvestment: number;
  wealthGained: number;
  futureValue: number;
}

export interface SipOutput {
  totalInvestment: number;
  wealthGained: number;
  futureValue: number;
  yearlyGrowth: SipYearlyGrowth[];
}

export function calculateSip({
  monthlyInvestment,
  expectedReturnAnnual,
  tenureYears,
}: SipInput): SipOutput {
  const P = monthlyInvestment;
  const i = expectedReturnAnnual / 12 / 100; // monthly expected return
  const n = tenureYears * 12; // months

  let futureValue = 0;
  if (i === 0) {
    futureValue = P * n;
  } else {
    futureValue = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
  }

  const totalInvestment = P * n;
  const wealthGained = futureValue - totalInvestment;

  const yearlyGrowth: SipYearlyGrowth[] = [];
  for (let y = 1; y <= tenureYears; y++) {
    const months = y * 12;
    let yFutureValue = 0;
    if (i === 0) {
      yFutureValue = P * months;
    } else {
      yFutureValue = P * ((Math.pow(1 + i, months) - 1) / i) * (1 + i);
    }
    const yInvestment = P * months;
    const yGained = yFutureValue - yInvestment;

    yearlyGrowth.push({
      year: y,
      totalInvestment: yInvestment,
      wealthGained: yGained,
      futureValue: yFutureValue,
    });
  }

  return {
    totalInvestment,
    wealthGained,
    futureValue,
    yearlyGrowth,
  };
}

// ==========================================
// 3. LOAN ELIGIBILITY CALCULATOR
// ==========================================

export interface LoanEligibilityInput {
  monthlyIncome: number;
  existingEmi: number;
  interestRate: number; // annual interest rate %
  tenureYears: number;
  foirPercent?: number; // Fixed Obligation to Income Ratio (default: 50%)
}

export interface LoanEligibilityOutput {
  maxEmiCapacity: number;
  maxLoanAmount: number;
  debtToIncomeRatio: number;
  status: 'Excellent' | 'Good' | 'Average' | 'Risky' | 'Overburdened';
}

export function calculateLoanEligibility({
  monthlyIncome,
  existingEmi,
  interestRate,
  tenureYears,
  foirPercent = 50,
}: LoanEligibilityInput): LoanEligibilityOutput {
  const maxAllowedObligations = (monthlyIncome * foirPercent) / 100;
  const maxEmiCapacity = Math.max(0, maxAllowedObligations - existingEmi);

  const r = interestRate / 12 / 100; // monthly rate
  const n = tenureYears * 12; // months

  let maxLoanAmount = 0;
  if (maxEmiCapacity > 0) {
    if (r === 0) {
      maxLoanAmount = maxEmiCapacity * n;
    } else {
      maxLoanAmount = maxEmiCapacity * ((Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n)));
    }
  }

  const debtToIncomeRatio = ((existingEmi + maxEmiCapacity) / monthlyIncome) * 100;

  // Status rating based on current and proposed debts
  const currentDti = (existingEmi / monthlyIncome) * 100;
  let status: LoanEligibilityOutput['status'] = 'Excellent';
  if (currentDti > 50) {
    status = 'Overburdened';
  } else if (currentDti > 40) {
    status = 'Risky';
  } else if (currentDti > 30) {
    status = 'Average';
  } else if (currentDti > 15) {
    status = 'Good';
  }

  return {
    maxEmiCapacity,
    maxLoanAmount,
    debtToIncomeRatio,
    status,
  };
}

// ==========================================
// 4. SALARY TAX CALCULATOR (FY 2025-26 & 2026-27 update)
// ==========================================

export interface TaxInput {
  annualSalary: number;
  hraReceived?: number;
  rentPaid?: number; // For HRA exemption calculation
  metroCity?: boolean; // For HRA exemption calculation
  basicSalary?: number; // Defaults to 40% or 50% of annual salary if empty
  sec80C?: number; // Standard Max: 1,50,000
  sec80D?: number; // Health Insurance Max: 25,000 / 50,000
  homeLoanInterest?: number; // Sec 24b Max: 2,00,000
  otherDeductions?: number;
}

export interface TaxRegimeOutput {
  grossSalary: number;
  exemptions: number;
  deductions: number;
  taxableIncome: number;
  slabTax: number;
  cess: number; // 4% Health & Education Cess
  rebate87A: number;
  totalTax: number;
  takeHomeSalary: number;
}

export interface TaxSavingsSuggestion {
  section: string;
  maxLimit: number;
  currentClaim: number;
  potentialSavings: number;
  description: string;
}

export interface TaxOutput {
  oldRegime: TaxRegimeOutput;
  newRegime: TaxRegimeOutput;
  recommendedRegime: 'Old' | 'New' | 'Equal';
  difference: number;
  suggestions: TaxSavingsSuggestion[];
}

export function calculateSalaryTax(input: TaxInput): TaxOutput {
  const gross = input.annualSalary;
  const basic = input.basicSalary || gross * 0.45; // Assume basic is 45% of gross if not provided
  
  // ----------------------------------------------------
  // HRA EXEMPTION CALCULATION (Old Regime Only)
  // ----------------------------------------------------
  let hraExemption = 0;
  if (input.hraReceived && input.rentPaid) {
    const rent = input.rentPaid;
    const hra = input.hraReceived;
    const limit1 = hra;
    const limit2 = metroCityHraPercentage(input.metroCity || false) * basic;
    const limit3 = Math.max(0, rent - 0.1 * basic);
    hraExemption = Math.min(limit1, limit2, limit3);
  }

  // ----------------------------------------------------
  // OLD REGIME CALCULATION
  // ----------------------------------------------------
  const oldStandardDeduction = 50000;
  const oldExemptions = hraExemption;
  
  // Deductions capped at legal limits
  const c80C = Math.min(150000, input.sec80C || 0);
  const c80D = Math.min(50000, input.sec80D || 0);
  const c24b = Math.min(200000, input.homeLoanInterest || 0);
  const otherD = input.otherDeductions || 0;
  
  const oldTotalDeductions = oldStandardDeduction + c80C + c80D + c24b + otherD;
  const oldTaxableIncome = Math.max(0, gross - oldExemptions - oldTotalDeductions);
  
  // Calculate Old Regime tax slabs
  // Slabs: 0-2.5L: 0%, 2.5-5L: 5%, 5-10L: 20%, 10L+: 30%
  let oldTax = 0;
  if (oldTaxableIncome > 1000000) {
    oldTax += (oldTaxableIncome - 1000000) * 0.3 + 100000 + 12500;
  } else if (oldTaxableIncome > 500000) {
    oldTax += (oldTaxableIncome - 500000) * 0.2 + 12500;
  } else if (oldTaxableIncome > 250000) {
    oldTax += (oldTaxableIncome - 250000) * 0.05;
  }

  // Rebate Sec 87A (Old Regime: If taxable income <= 5L, rebate up to 12500)
  let oldRebate = 0;
  if (oldTaxableIncome <= 500000) {
    oldRebate = Math.min(oldTax, 12500);
  }
  let oldNetTaxBeforeCess = Math.max(0, oldTax - oldRebate);
  let oldCess = oldNetTaxBeforeCess * 0.04;
  let oldTotalTax = oldNetTaxBeforeCess + oldCess;

  // ----------------------------------------------------
  // NEW REGIME CALCULATION (FY 2025-26 & FY 2026-27 slabs)
  // ----------------------------------------------------
  // Standard Deduction under New Regime is 75,000 INR
  const newStandardDeduction = 75000;
  const newExemptions = 0; // No exemptions (like HRA) in New Regime
  const newTotalDeductions = newStandardDeduction; // No 80C, 24b, 80D
  const newTaxableIncome = Math.max(0, gross - newTotalDeductions);

  // New regime slabs:
  // Up to 3L: Nil
  // 3L to 7L: 5% (Total in slab: 20,000)
  // 7L to 10L: 10% (Total in slab: 30,000)
  // 10L to 12L: 15% (Total in slab: 30,000)
  // 12L to 15L: 20% (Total in slab: 60,000)
  // Above 15L: 30%
  let newTax = 0;
  if (newTaxableIncome > 1500000) {
    newTax += (newTaxableIncome - 1500000) * 0.3 + 140000;
  } else if (newTaxableIncome > 1200000) {
    newTax += (newTaxableIncome - 1200000) * 0.2 + 80000;
  } else if (newTaxableIncome > 1000000) {
    newTax += (newTaxableIncome - 1000000) * 0.15 + 50000;
  } else if (newTaxableIncome > 700000) {
    newTax += (newTaxableIncome - 700000) * 0.10 + 20000;
  } else if (newTaxableIncome > 300000) {
    newTax += (newTaxableIncome - 300000) * 0.05;
  }

  // Rebate under 87A (New Regime: Taxable income up to 7 Lakhs receives full rebate up to ₹20,000)
  // Standard rebate limit: If net taxable income <= 7,00,000, rebate is 20,000
  let newRebate = 0;
  if (newTaxableIncome <= 700000) {
    newRebate = Math.min(newTax, 20000);
  }
  let newNetTaxBeforeCess = Math.max(0, newTax - newRebate);
  let newCess = newNetTaxBeforeCess * 0.04;
  let newTotalTax = newNetTaxBeforeCess + newCess;

  const oldRegimeOutput: TaxRegimeOutput = {
    grossSalary: gross,
    exemptions: oldExemptions,
    deductions: oldTotalDeductions,
    taxableIncome: oldTaxableIncome,
    slabTax: oldTax,
    cess: oldCess,
    rebate87A: oldRebate,
    totalTax: oldTotalTax,
    takeHomeSalary: gross - oldTotalTax,
  };

  const newRegimeOutput: TaxRegimeOutput = {
    grossSalary: gross,
    exemptions: newExemptions,
    deductions: newTotalDeductions,
    taxableIncome: newTaxableIncome,
    slabTax: newTax,
    cess: newCess,
    rebate87A: newRebate,
    totalTax: newTotalTax,
    takeHomeSalary: gross - newTotalTax,
  };

  let recommendedRegime: 'Old' | 'New' | 'Equal' = 'Equal';
  let difference = Math.abs(oldTotalTax - newTotalTax);

  if (oldTotalTax < newTotalTax) {
    recommendedRegime = 'Old';
  } else if (newTotalTax < oldTotalTax) {
    recommendedRegime = 'New';
  }

  // Generate actionable suggestions to save tax (primarily focusing on Old Regime optimizations)
  const suggestions: TaxSavingsSuggestion[] = [];
  
  if (c80C < 150000) {
    const unused80C = 150000 - c80C;
    // Estimate a standard average tax saving rate of 20%
    const rate = oldTaxableIncome > 1000000 ? 0.3 : oldTaxableIncome > 500000 ? 0.2 : 0.05;
    suggestions.push({
      section: 'Section 80C',
      maxLimit: 150000,
      currentClaim: c80C,
      potentialSavings: unused80C * rate * 1.04, // including cess
      description: 'Invest in PPF, ELSS Mutual Funds, NPS, or Tax Saver FDs to max out your 80C deduction.',
    });
  }

  if (c80D < 25000) {
    const unused80D = 25000 - c80D;
    const rate = oldTaxableIncome > 1000000 ? 0.3 : oldTaxableIncome > 500000 ? 0.2 : 0.05;
    suggestions.push({
      section: 'Section 80D',
      maxLimit: 25000,
      currentClaim: c80D,
      potentialSavings: unused80D * rate * 1.04,
      description: 'Purchase health insurance premiums for yourself and family to save tax under Section 80D.',
    });
  }

  if (c24b < 200000 && input.homeLoanInterest !== undefined) {
    const unused24b = 200000 - c24b;
    const rate = oldTaxableIncome > 1000000 ? 0.3 : oldTaxableIncome > 500000 ? 0.2 : 0.05;
    suggestions.push({
      section: 'Section 24(b)',
      maxLimit: 200000,
      currentClaim: c24b,
      potentialSavings: unused24b * rate * 1.04,
      description: 'If you have a home loan, you can claim up to ₹2,00,000 of the interest paid under Section 24(b).',
    });
  }

  return {
    oldRegime: oldRegimeOutput,
    newRegime: newRegimeOutput,
    recommendedRegime,
    difference,
    suggestions,
  };
}

function metroCityHraPercentage(isMetro: boolean): number {
  return isMetro ? 0.5 : 0.4;
}

// ==========================================
// 5. CREDIT CARD REWARDS CALCULATOR
// ==========================================

export interface CcSpends {
  dining: number;
  travel: number;
  grocery: number;
  fuel: number;
  utility: number;
  others: number;
}

export type CcModel =
  | 'hdfc_infinia'
  | 'hdfc_diners_black'
  | 'axis_atlas'
  | 'axis_magnus'
  | 'icici_emeralde'
  | 'sbi_elite'
  | 'custom';

export interface CcInput {
  cardType: CcModel;
  spends: CcSpends;
  // Custom Card fields
  customCardName?: string;
  customBaseReturnRate?: number; // Base RP %
  customDiningMultiplier?: number; // Dining multiplier e.g. 3x
  customTravelMultiplier?: number; // Travel multiplier e.g. 5x
  customPointValue?: number; // e.g. ₹0.25
}

export interface CcRewardOutput {
  cardName: string;
  rewardPointsEarned: number;
  airlineMiles: number;
  hotelPoints: number;
  effectiveReturnAmount: number;
  effectiveReturnPercent: number;
  categoryBreakdown: {
    category: string;
    spend: number;
    points: number;
    value: number;
  }[];
}

export function calculateCcRewards(input: CcInput): CcRewardOutput {
  const { cardType, spends } = input;
  const totalSpend =
    spends.dining + spends.travel + spends.grocery + spends.fuel + spends.utility + spends.others;

  let rewardPointsEarned = 0;
  let airlineMiles = 0;
  let hotelPoints = 0;
  let effectiveReturnAmount = 0;
  let cardName = '';
  
  const categoryBreakdown: CcRewardOutput['categoryBreakdown'] = [];

  switch (cardType) {
    case 'hdfc_infinia': {
      cardName = 'HDFC Infinia';
      // Rate: 5 RP per ₹150 retail spend (except fuel which earns no RP). Point value = ₹1.
      // Fuel generally doesn't earn reward points.
      // Let's assume SmartBuy is used for travel: 5x points (approx 16.6% value)
      const pointValue = 1.0;
      
      const calcPoints = (cat: string, spend: number) => {
        if (cat === 'fuel') return 0;
        if (cat === 'travel') {
          // Assume 60% of travel spends are booked via SmartBuy earning 5x points
          const smartbuySpend = spend * 0.6;
          const normalSpend = spend * 0.4;
          const sbPoints = Math.floor(smartbuySpend / 150) * 5 * 5; // 5x multiplier
          const normPoints = Math.floor(normalSpend / 150) * 5;
          return sbPoints + normPoints;
        }
        if (cat === 'dining') {
          // Dineout/SmartBuy: 2x points
          return Math.floor(spend / 150) * 5 * 2;
        }
        return Math.floor(spend / 150) * 5;
      };

      for (const [cat, spend] of Object.entries(spends)) {
        const pts = calcPoints(cat, spend);
        rewardPointsEarned += pts;
        categoryBreakdown.push({
          category: cat,
          spend,
          points: pts,
          value: pts * pointValue,
        });
      }

      effectiveReturnAmount = rewardPointsEarned * pointValue;
      // Transfer ratio 1:1 to airline miles (Singapore Airlines, Vistara, etc.)
      airlineMiles = rewardPointsEarned; 
      hotelPoints = rewardPointsEarned; // Transfer ratio 1:1 to Apple/Marriott (or similar partners)
      break;
    }
    case 'hdfc_diners_black': {
      cardName = 'HDFC Diners Black';
      // Similar to Infinia: 5 RP per 150 retail. Point value = ₹1.
      // 10x rewards on SmartBuy, capping differs but points math is similar.
      const pointValue = 1.0;
      
      const calcPoints = (cat: string, spend: number) => {
        if (cat === 'fuel') return 0;
        if (cat === 'travel') {
          // Smartbuy travel: 3x points average
          const smartbuySpend = spend * 0.5;
          const normalSpend = spend * 0.5;
          const sbPoints = Math.floor(smartbuySpend / 150) * 5 * 3;
          const normPoints = Math.floor(normalSpend / 150) * 5;
          return sbPoints + normPoints;
        }
        return Math.floor(spend / 150) * 5;
      };

      for (const [cat, spend] of Object.entries(spends)) {
        const pts = calcPoints(cat, spend);
        rewardPointsEarned += pts;
        categoryBreakdown.push({
          category: cat,
          spend,
          points: pts,
          value: pts * pointValue,
        });
      }

      effectiveReturnAmount = rewardPointsEarned * pointValue;
      airlineMiles = rewardPointsEarned * 1.0;
      hotelPoints = rewardPointsEarned * 1.0;
      break;
    }
    case 'axis_atlas': {
      cardName = 'Axis Atlas';
      // 2 Edge Miles per ₹100 spend. 5 Edge Miles per ₹100 on airlines/hotels.
      // 1 Edge Mile = ₹1 partner value (standard transfer 1:2 to airline partners)
      const mileValue = 1.0; 
      
      const calcMiles = (cat: string, spend: number) => {
        if (cat === 'fuel') return 0;
        if (cat === 'travel') {
          return Math.floor(spend / 100) * 5;
        }
        return Math.floor(spend / 100) * 2;
      };

      for (const [cat, spend] of Object.entries(spends)) {
        const miles = calcMiles(cat, spend);
        rewardPointsEarned += miles;
        categoryBreakdown.push({
          category: cat,
          spend,
          points: miles,
          value: miles * mileValue,
        });
      }

      effectiveReturnAmount = rewardPointsEarned * mileValue;
      airlineMiles = rewardPointsEarned * 2; // 1 Edge Mile = 2 Partner Miles
      hotelPoints = rewardPointsEarned * 2;
      break;
    }
    case 'axis_magnus': {
      cardName = 'Axis Magnus';
      // 12 Edge reward points per ₹200 spend. (1.2% base). 5:4 ratio.
      // Point value = ₹0.20
      const pointValue = 0.20;
      
      const calcPoints = (cat: string, spend: number) => {
        if (cat === 'fuel') return 0;
        if (cat === 'travel') {
          // 5x points on travel portal
          return Math.floor(spend / 200) * 12 * 5;
        }
        return Math.floor(spend / 200) * 12;
      };

      for (const [cat, spend] of Object.entries(spends)) {
        const pts = calcPoints(cat, spend);
        rewardPointsEarned += pts;
        categoryBreakdown.push({
          category: cat,
          spend,
          points: pts,
          value: pts * pointValue,
        });
      }

      effectiveReturnAmount = rewardPointsEarned * pointValue;
      airlineMiles = Math.floor(rewardPointsEarned * 0.8); // 5:4 ratio
      hotelPoints = Math.floor(rewardPointsEarned * 0.8);
      break;
    }
    case 'icici_emeralde': {
      cardName = 'ICICI Emeralde';
      // 4 RP per ₹100 spent (except fuel and utilities which earn 1 RP). Point value = ₹0.25
      const pointValue = 0.25;
      
      const calcPoints = (cat: string, spend: number) => {
        if (cat === 'fuel' || cat === 'utility') {
          return Math.floor(spend / 100) * 1;
        }
        return Math.floor(spend / 100) * 4;
      };

      for (const [cat, spend] of Object.entries(spends)) {
        const pts = calcPoints(cat, spend);
        rewardPointsEarned += pts;
        categoryBreakdown.push({
          category: cat,
          spend,
          points: pts,
          value: pts * pointValue,
        });
      }

      effectiveReturnAmount = rewardPointsEarned * pointValue;
      airlineMiles = rewardPointsEarned * 0.25;
      hotelPoints = rewardPointsEarned * 0.25;
      break;
    }
    case 'sbi_elite': {
      cardName = 'SBI Card Elite';
      // 2 RP per ₹100 spent. 5x (10 RP) on dining, departmental store, and groceries. 1 RP = ₹0.25
      const pointValue = 0.25;
      
      const calcPoints = (cat: string, spend: number) => {
        if (cat === 'fuel') return 0;
        if (cat === 'dining' || cat === 'grocery') {
          return Math.floor(spend / 100) * 10;
        }
        return Math.floor(spend / 100) * 2;
      };

      for (const [cat, spend] of Object.entries(spends)) {
        const pts = calcPoints(cat, spend);
        rewardPointsEarned += pts;
        categoryBreakdown.push({
          category: cat,
          spend,
          points: pts,
          value: pts * pointValue,
        });
      }

      effectiveReturnAmount = rewardPointsEarned * pointValue;
      airlineMiles = rewardPointsEarned * 0.25;
      hotelPoints = rewardPointsEarned * 0.25;
      break;
    }
    case 'custom':
    default: {
      cardName = input.customCardName || 'Custom Card';
      const baseRate = input.customBaseReturnRate || 1.0; // base % return
      const diningMult = input.customDiningMultiplier || 1.0;
      const travelMult = input.customTravelMultiplier || 1.0;
      const pointValue = input.customPointValue || 0.25;

      const calcPoints = (cat: string, spend: number) => {
        if (cat === 'fuel') return 0;
        // Map % to points. Let's say ₹100 spend earns (baseRate * multiplier) points.
        let mult = 1.0;
        if (cat === 'dining') mult = diningMult;
        if (cat === 'travel') mult = travelMult;
        
        const ratePercent = baseRate * mult;
        // Total point value equals spend * ratePercent / 100 / pointValue
        return Math.floor((spend * (ratePercent / 100)) / pointValue);
      };

      for (const [cat, spend] of Object.entries(spends)) {
        const pts = calcPoints(cat, spend);
        rewardPointsEarned += pts;
        categoryBreakdown.push({
          category: cat,
          spend,
          points: pts,
          value: pts * pointValue,
        });
      }

      effectiveReturnAmount = rewardPointsEarned * pointValue;
      airlineMiles = rewardPointsEarned * 0.5; // generic 2:1
      hotelPoints = rewardPointsEarned * 0.5;
      break;
    }
  }

  const effectiveReturnPercent = totalSpend > 0 ? (effectiveReturnAmount / totalSpend) * 100 : 0;

  return {
    cardName,
    rewardPointsEarned,
    airlineMiles,
    hotelPoints,
    effectiveReturnAmount,
    effectiveReturnPercent,
    categoryBreakdown,
  };
}

// ==========================================
// 6. CONSTRUCTION COST CALCULATOR
// ==========================================

export interface ConstructionInput {
  plotSizeSqFt: number;
  builtUpAreaSqFt: number;
  numberOfFloors: number;
  constructionGrade: 'Standard' | 'Premium' | 'Luxury';
}

export interface CostBreakdownItem {
  name: string;
  percentage: number;
  cost: number;
  description: string;
}

export interface ConstructionOutput {
  totalCost: number;
  ratePerSqFt: number;
  materialCost: number;
  laborCost: number;
  fittingsCost: number;
  breakdown: CostBreakdownItem[];
}

export function calculateConstructionCost({
  plotSizeSqFt,
  builtUpAreaSqFt,
  numberOfFloors,
  constructionGrade,
}: ConstructionInput): ConstructionOutput {
  // Base rates per square foot in India
  let ratePerSqFt = 1500;
  if (constructionGrade === 'Premium') ratePerSqFt = 1850;
  if (constructionGrade === 'Luxury') ratePerSqFt = 2300;

  const totalBuiltUpArea = builtUpAreaSqFt * numberOfFloors;
  const totalCost = totalBuiltUpArea * ratePerSqFt;

  // Standard construction breakdowns in Indian Market
  const materialPercent = 58;
  const laborPercent = 25;
  const fittingsPercent = 17;

  const materialCost = (totalCost * materialPercent) / 100;
  const laborCost = (totalCost * laborPercent) / 100;
  const fittingsCost = (totalCost * fittingsPercent) / 100;

  const breakdown: CostBreakdownItem[] = [
    {
      name: 'Cement',
      percentage: 16,
      cost: totalCost * 0.16,
      description: 'Foundations, columns, slabs, and plastering.',
    },
    {
      name: 'Steel/Rebars',
      percentage: 15,
      cost: totalCost * 0.15,
      description: 'Reinforced concrete structures.',
    },
    {
      name: 'Sand & Aggregates',
      percentage: 9,
      cost: totalCost * 0.09,
      description: 'Fine river sand/crushed sand and gravel mixes.',
    },
    {
      name: 'Bricks & Blocks',
      percentage: 8,
      cost: totalCost * 0.08,
      description: 'Red bricks or AAC lightweight blocks for walling.',
    },
    {
      name: 'Tiles & Flooring',
      percentage: 10,
      cost: totalCost * 0.10,
      description: 'Vitrified tiles, granite for steps/counters, and toilet tiling.',
    },
    {
      name: 'Labor charges',
      percentage: 25,
      cost: laborCost,
      description: 'Masonry, excavation, reinforcement, and architectural supervision.',
    },
    {
      name: 'Fittings & Finishing',
      percentage: 17,
      cost: fittingsCost,
      description: 'Plumbing fittings, sanitary ware, electrical wiring, switches, and paints.',
    },
  ];

  return {
    totalCost,
    ratePerSqFt,
    materialCost,
    laborCost,
    fittingsCost,
    breakdown,
  };
}

// ==========================================
// 7. TILE CALCULATOR
// ==========================================

export interface TileInput {
  roomLengthFt: number;
  roomWidthFt: number;
  tileLengthInch: number;
  tileWidthInch: number;
  wastagePercent?: number; // default: 10%
  costPerSqFt?: number;
}

export interface TileOutput {
  roomAreaSqFt: number;
  tileAreaSqFt: number;
  baseTilesNeeded: number;
  wastageTilesCount: number;
  totalTilesNeeded: number;
  totalTilesRounded: number;
  totalCost: number;
}

export function calculateTiles({
  roomLengthFt,
  roomWidthFt,
  tileLengthInch,
  tileWidthInch,
  wastagePercent = 10,
  costPerSqFt = 0,
}: TileInput): TileOutput {
  const roomAreaSqFt = roomLengthFt * roomWidthFt;
  // Convert tile dimensions from inches to feet
  const tileLengthFt = tileLengthInch / 12;
  const tileWidthFt = tileWidthInch / 12;
  const tileAreaSqFt = tileLengthFt * tileWidthFt;

  const baseTilesNeeded = tileAreaSqFt > 0 ? roomAreaSqFt / tileAreaSqFt : 0;
  const wastageTilesCount = baseTilesNeeded * (wastagePercent / 100);
  const totalTilesNeeded = baseTilesNeeded + wastageTilesCount;
  const totalTilesRounded = Math.ceil(totalTilesNeeded);

  const totalCost = roomAreaSqFt * costPerSqFt;

  return {
    roomAreaSqFt,
    tileAreaSqFt,
    baseTilesNeeded,
    wastageTilesCount,
    totalTilesNeeded,
    totalTilesRounded,
    totalCost,
  };
}
