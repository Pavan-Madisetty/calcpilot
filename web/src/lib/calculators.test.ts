import { calculateEmi, calculateSip, calculateSalaryTax } from './calculators';

describe('ZeroEMI Core Math Engines', () => {
  
  // Test EMI Math
  test('EMI Calculator - Should yield exact EMI and interest for standard values', () => {
    const loanAmount = 1000000; // 10 Lakhs
    const interestRate = 8.5;  // 8.5%
    const tenureYears = 10;    // 10 years
    const processingFeePercent = 1; // 1%

    const result = calculateEmi({
      loanAmount,
      interestRate,
      tenureYears,
      processingFeePercent,
    });

    // Monthly EMI should be approx 12,399 INR
    expect(result.monthlyEmi).toBeCloseTo(12398.57, 1);
    
    // Total interest should be (EMI * 120) - 10,000,000 = approx 4,87,828 INR
    expect(result.totalInterest).toBeCloseTo(487828.1, 1);

    // Processing fee amount = 10,000 INR
    expect(result.processingFeeAmount).toBe(10000);
    
    // Amortization list size = 120 months
    expect(result.amortizationSchedule.length).toBe(120);
    expect(result.yearlyAmortization.length).toBe(10);
  });

  // Test SIP Math
  test('SIP Calculator - Should yield correct future value projection', () => {
    const monthlyInvestment = 10000;
    const expectedReturnAnnual = 12;
    const tenureYears = 10;

    const result = calculateSip({
      monthlyInvestment,
      expectedReturnAnnual,
      tenureYears,
    });

    // Total invested = 10,000 * 12 * 10 = 12 Lakhs
    expect(result.totalInvestment).toBe(1200000);
    // Future value should be approx 23.23 Lakhs
    expect(result.futureValue).toBeGreaterThan(2300000);
    expect(result.futureValue).toBeLessThan(2350000);
    expect(result.yearlyGrowth.length).toBe(10);
  });

  // Test Salary Tax Math
  test('Salary Tax Calculator - Should calculate Old vs New regime slabs correctly', () => {
    const annualSalary = 1000000; // 10 Lakhs
    
    const result = calculateSalaryTax({
      annualSalary,
      sec80C: 150000,
      sec80D: 25000,
    });

    // For 10 Lakhs under New Regime (FY 2025-26 rules):
    // Gross: 1,000,000
    // Standard deduction: 75,000 -> Taxable: 9,25,000
    // Slabs:
    // Up to 3L: Nil
    // 3L - 7L: 5% of 4L = 20,000
    // 7L - 9.25L: 10% of 2.25L = 22,500
    // Net Tax: 42,500 + 4% Cess = 44,200
    expect(result.newRegime.totalTax).toBeCloseTo(44200, 0);

    // Verify recommendations
    expect(result.recommendedRegime).toBeDefined();
  });
});
