import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView, 
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

type ScreenTab = 'Home' | 'Calculators';

export default function App() {
  const [activeTab, setActiveTab] = useState<ScreenTab>('Home');
  const [selectedCategory, setSelectedCategory] = useState<string>('Finance & Loans');
  const [selectedCalc, setSelectedCalc] = useState<string>('emi');

  // Categories list
  const categoriesList = ['Finance & Loans', 'Wealth & Tax', 'Construction Tools'];

  // Calculator List with new category groups
  const calculatorsList = [
    // Finance & Loans
    { id: 'emi', title: 'EMI Calculator', category: 'Finance & Loans', icon: '⚡' },
    { id: 'loan_eligibility', title: 'Loan Eligibility', category: 'Finance & Loans', icon: '🧭' },
    { id: 'no_cost_emi', title: 'No Cost EMI', category: 'Finance & Loans', icon: '🏷️' },
    
    // Wealth & Tax
    { id: 'sip', title: 'SIP Calculator', category: 'Wealth & Tax', icon: '📈' },
    { id: 'tax', title: 'Salary Tax Slabs', category: 'Wealth & Tax', icon: '💼' },
    { id: 'in_hand_salary', title: 'In-Hand Salary', category: 'Wealth & Tax', icon: '💵' },
    { id: 'hra', title: 'HRA Exemption', category: 'Wealth & Tax', icon: '🏠' },
    
    // Construction Tools
    { id: 'construction', title: 'Construction Cost', category: 'Construction Tools', icon: '🏗️' },
    { id: 'tiles', title: 'Tile Calculator', category: 'Construction Tools', icon: '🧱' }
  ];

  // Helper: Format Currency (INR)
  const formatCurrency = (val: number) => {
    return '₹' + Math.round(val).toLocaleString('en-IN');
  };

  // Newton-Raphson Solver for IRR
  const solveIrr = (cashFlows: number[], guess = 0.1): number => {
    const maxIterations = 100;
    const tolerance = 1e-6;
    let r = guess;

    for (let i = 0; i < maxIterations; i++) {
      let npv = 0;
      let dNpv = 0;
      for (let t = 0; t < cashFlows.length; t++) {
        const factor = Math.pow(1 + r, t);
        npv += cashFlows[t] / factor;
        dNpv -= (t * cashFlows[t]) / (factor * (1 + r));
      }

      if (Math.abs(dNpv) < 1e-12) break;
      const nextR = r - npv / dNpv;
      if (Math.abs(nextR - r) < tolerance) {
        return nextR;
      }
      r = nextR;
    }
    return r;
  };

  // --- STATE FOR INTERACTIVE CALCULATORS ---
  // 1. EMI
  const [emiLoan, setEmiLoan] = useState('2500000');
  const [emiRate, setEmiRate] = useState('8.5');
  const [emiTenure, setEmiTenure] = useState('20');
  const [emiResult, setEmiResult] = useState({ emi: 0, interest: 0, total: 0 });

  // 2. SIP
  const [sipMonthly, setSipMonthly] = useState('10000');
  const [sipRate, setSipRate] = useState('12');
  const [sipTenure, setSipTenure] = useState('15');
  const [sipResult, setSipResult] = useState({ invested: 0, wealth: 0, total: 0 });

  // 3. Loan Eligibility
  const [income, setIncome] = useState('80000');
  const [existingEmi, setExistingEmi] = useState('15000');
  const [elRate, setElRate] = useState('8.5');
  const [elTenure, setElTenure] = useState('20');
  const [elResult, setElResult] = useState({ maxEmi: 0, maxLoan: 0 });

  // 4. Tax Slabs (FY 2025-26)
  const [grossSalary, setGrossSalary] = useState('1200000');
  const [taxResult, setTaxResult] = useState({ oldTax: 0, newTax: 0 });

  // 5. Construction
  const [area, setArea] = useState('1500');
  const [floors, setFloors] = useState('2');
  const [grade, setGrade] = useState<'Standard' | 'Premium' | 'Luxury'>('Premium');
  const [constResult, setConstResult] = useState({ total: 0, materials: 0, labor: 0 });

  // 6. Tiles
  const [length, setLength] = useState('12');
  const [width, setWidth] = useState('10');
  const [tileSize, setTileSize] = useState('2'); // in feet
  const [wastage, setWastage] = useState('10');
  const [tilesResult, setTilesResult] = useState({ baseCount: 0, totalCount: 0 });

  // 7. No Cost EMI
  const [ncPrice, setNcPrice] = useState('50000');
  const [ncDown, setNcDown] = useState('0');
  const [ncFee, setNcFee] = useState('199');
  const [ncDiscount, setNcDiscount] = useState('3800');
  const [ncTenure, setNcTenure] = useState('6');
  const [ncIncludeFee, setNcIncludeFee] = useState(true);
  const [ncIncludeGst, setNcIncludeGst] = useState(true);
  const [ncIncludeForegone, setNcIncludeForegone] = useState(true);
  const [ncResult, setNcResult] = useState({ totalPaid: 0, hiddenCharges: 0, eir: 0, emi: 0 });

  // 8. HRA
  const [hraBasic, setHraBasic] = useState('50000');
  const [hraReceived, setHraReceived] = useState('20000');
  const [hraRent, setHraRent] = useState('18000');
  const [hraIsMetro, setHraIsMetro] = useState(true);
  const [hraIsMonthly, setHraIsMonthly] = useState(true);
  const [hraResult, setHraResult] = useState({ exempted: 0, taxable: 0 });

  // 9. In-Hand Salary
  const [salCtc, setSalCtc] = useState('1500000');
  const [salBasicPct, setSalBasicPct] = useState('50');
  const [salHraPct, setSalHraPct] = useState('40');
  const [salBonus, setSalBonus] = useState('100000');
  const [salVariable, setSalVariable] = useState('0');
  const [salEmployerPf, setSalEmployerPf] = useState<'standard' | 'actual' | 'none'>('standard');
  const [salEmployeePf, setSalEmployeePf] = useState<'standard' | 'actual' | 'none'>('standard');
  const [salRent, setSalRent] = useState('20000');
  const [salIsMetro, setSalIsMetro] = useState(true);
  const [sal80c, setSal80c] = useState('50000');
  const [sal80d, setSal80d] = useState('15000');
  const [salHomeLoan, setSalHomeLoan] = useState('0');
  const [salNps, setSalNps] = useState('0');
  const [salDeduction, setSalDeduction] = useState('0');
  const [salResult, setSalResult] = useState({ gross: 0, oldTakeHome: 0, newTakeHome: 0, oldTax: 0, newTax: 0 });


  // --- CALCULATOR MODULE COMPUTATIONS ---
  // EMI
  useEffect(() => {
    const P = parseFloat(emiLoan) || 0;
    const r = (parseFloat(emiRate) || 0) / 12 / 100;
    const n = (parseFloat(emiTenure) || 0) * 12;

    if (P > 0 && r > 0 && n > 0) {
      const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const total = emi * n;
      const interest = total - P;
      setEmiResult({ emi, interest, total });
    } else {
      setEmiResult({ emi: 0, interest: 0, total: 0 });
    }
  }, [emiLoan, emiRate, emiTenure]);

  // SIP
  useEffect(() => {
    const P = parseFloat(sipMonthly) || 0;
    const i = (parseFloat(sipRate) || 0) / 12 / 100;
    const n = (parseFloat(sipTenure) || 0) * 12;

    if (P > 0 && i > 0 && n > 0) {
      const total = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
      const invested = P * n;
      const wealth = total - invested;
      setSipResult({ invested, wealth, total });
    } else {
      setSipResult({ invested: 0, wealth: 0, total: 0 });
    }
  }, [sipMonthly, sipRate, sipTenure]);

  // Loan Eligibility
  useEffect(() => {
    const inc = parseFloat(income) || 0;
    const exist = parseFloat(existingEmi) || 0;
    const R = (parseFloat(elRate) || 0) / 12 / 100;
    const N = (parseFloat(elTenure) || 0) * 12;

    const maxEmi = Math.max(0, (inc * 0.5) - exist);
    if (maxEmi > 0 && R > 0 && N > 0) {
      const maxLoan = maxEmi * ((Math.pow(1 + R, N) - 1) / (R * Math.pow(1 + R, N)));
      setElResult({ maxEmi, maxLoan });
    } else {
      setElResult({ maxEmi: 0, maxLoan: 0 });
    }
  }, [income, existingEmi, elRate, elTenure]);

  // Tax Slabs
  useEffect(() => {
    const sal = parseFloat(grossSalary) || 0;
    
    // New Regime
    let newTax = 0;
    const netNew = Math.max(0, sal - 75000);
    if (netNew > 700000) {
      let temp = netNew;
      if (temp > 2000000) { newTax += (temp - 2000000) * 0.30; temp = 2000000; }
      if (temp > 1600000) { newTax += (temp - 1600000) * 0.20; temp = 1600000; }
      if (temp > 1200000) { newTax += (temp - 1200000) * 0.15; temp = 1200000; }
      if (temp > 800000) { newTax += (temp - 800000) * 0.10; temp = 800000; }
      if (temp > 400000) { newTax += (temp - 400000) * 0.05; }
      newTax += newTax * 0.04;
    }

    // Old Regime
    let oldTax = 0;
    const netOld = Math.max(0, sal - 200000);
    if (netOld > 500000) {
      if (netOld <= 250000) oldTax = 0;
      else if (netOld <= 500000) oldTax = (netOld - 250000) * 0.05;
      else if (netOld <= 1000000) oldTax = 12500 + (netOld - 500000) * 0.20;
      else oldTax = 112500 + (netOld - 1000000) * 0.30;
      oldTax += oldTax * 0.04;
    }

    setTaxResult({ oldTax, newTax });
  }, [grossSalary]);

  // Construction
  useEffect(() => {
    const ar = parseFloat(area) || 0;
    const fl = parseFloat(floors) || 0;
    const totalArea = ar * fl;
    let rate = 1850;

    if (grade === 'Standard') rate = 1500;
    else if (grade === 'Luxury') rate = 2300;

    const total = totalArea * rate;
    setConstResult({
      total,
      materials: total * 0.58,
      labor: total * 0.25
    });
  }, [area, floors, grade]);

  // Tiles
  useEffect(() => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const ts = parseFloat(tileSize) || 2;
    const wast = parseFloat(wastage) || 0;

    const roomArea = l * w;
    const tileArea = ts * ts;

    if (roomArea > 0 && tileArea > 0) {
      const base = roomArea / tileArea;
      const total = base * (1 + wast / 100);
      setTilesResult({
        baseCount: base,
        totalCount: total
      });
    } else {
      setTilesResult({ baseCount: 0, totalCount: 0 });
    }
  }, [length, width, tileSize, wastage]);

  // No Cost EMI
  useEffect(() => {
    const price = parseFloat(ncPrice) || 0;
    const down = parseFloat(ncDown) || 0;
    const fee = parseFloat(ncFee) || 0;
    const discount = parseFloat(ncDiscount) || 0;
    const N = parseInt(ncTenure) || 6;
    
    const netPrice = price - down;
    const E = N > 0 ? netPrice / N : 0;
    
    // Solve bank interest rate
    const netLoanPrincipal = Math.max(0, price - discount - down);
    const bankCashFlows = [netLoanPrincipal];
    for (let i = 0; i < N; i++) {
      bankCashFlows.push(-E);
    }
    
    let r_bank = 0;
    if (E * N > netLoanPrincipal && netLoanPrincipal > 0) {
      r_bank = solveIrr(bankCashFlows, 0.01);
    }

    // Generate monthly schedule
    let remainingBalance = netLoanPrincipal;
    let totalGstOnInterest = 0;
    
    for (let m = 1; m <= N; m++) {
      const interest = remainingBalance * r_bank;
      const gstOnInterest = interest * 0.18;
      const principal = E - interest;
      remainingBalance = Math.max(0, remainingBalance - principal);
      totalGstOnInterest += gstOnInterest;
    }

    const initialOutflow = down + 
      (ncIncludeFee ? fee : 0) + 
      ((ncIncludeFee && ncIncludeGst) ? (fee * 0.18) : 0);
      
    const outrightPrice = ncIncludeForegone ? (price - discount) : price;

    let totalAmountPaid = initialOutflow;
    for (let m = 1; m <= N; m++) {
      const remainingBalanceStep = netLoanPrincipal - (E * (m - 1));
      const estInterest = Math.max(0, remainingBalanceStep * r_bank);
      const estGst = estInterest * 0.18;
      
      const rowPayment = E + (ncIncludeGst ? estGst : 0);
      totalAmountPaid += rowPayment;
    }

    const userCashFlows = [outrightPrice - initialOutflow];
    for (let m = 1; m <= N; m++) {
      const remainingBalanceStep = netLoanPrincipal - (E * (m - 1));
      const estInterest = Math.max(0, remainingBalanceStep * r_bank);
      const estGst = estInterest * 0.18;
      userCashFlows.push(-(E + (ncIncludeGst ? estGst : 0)));
    }

    let r_true = 0;
    if (totalAmountPaid > outrightPrice) {
      r_true = solveIrr(userCashFlows, 0.01);
    }
    const eir = (Math.pow(1 + r_true, 12) - 1) * 100;
    const hiddenCharges = Math.max(0, totalAmountPaid - outrightPrice);

    setNcResult({
      emi: E,
      totalPaid: totalAmountPaid,
      hiddenCharges,
      eir,
    });
  }, [ncPrice, ncDown, ncFee, ncDiscount, ncTenure, ncIncludeFee, ncIncludeGst, ncIncludeForegone]);

  // HRA
  useEffect(() => {
    const mult = hraIsMonthly ? 12 : 1;
    const basic = (parseFloat(hraBasic) || 0) * mult;
    const hra = (parseFloat(hraReceived) || 0) * mult;
    const rent = (parseFloat(hraRent) || 0) * mult;

    const rule1 = hra;
    const rule2 = Math.max(0, rent - 0.10 * basic);
    const rule3 = hraIsMetro ? 0.50 * basic : 0.40 * basic;

    const exemptedAnnual = Math.min(rule1, rule2, rule3);
    const taxableAnnual = Math.max(0, hra - exemptedAnnual);

    const div = hraIsMonthly ? 12 : 1;

    setHraResult({
      exempted: exemptedAnnual / div,
      taxable: taxableAnnual / div,
    });
  }, [hraBasic, hraReceived, hraRent, hraIsMetro, hraIsMonthly]);

  // Salary Take-home
  useEffect(() => {
    const ctc = parseFloat(salCtc) || 0;
    const basicPct = parseFloat(salBasicPct) || 50;
    const hraPct = parseFloat(salHraPct) || 40;
    const bonus = parseFloat(salBonus) || 0;
    const variable = parseFloat(salVariable) || 0;
    const rent = parseFloat(salRent) || 0;
    const pt = 2500;
    const otherDeds = parseFloat(salDeduction) || 0;

    const baseSalaryPool = ctc - bonus - variable;
    const basic = baseSalaryPool * (basicPct / 100);
    const hra = basic * (hraPct / 100);

    let empPf = 0;
    if (salEmployerPf === 'standard') {
      empPf = Math.min(21600, basic * 0.12);
    } else if (salEmployerPf === 'actual') {
      empPf = basic * 0.12;
    }

    const gratuity = basic * 0.0481;
    const specialAllowance = Math.max(0, ctc - basic - hra - empPf - gratuity - bonus - variable);
    const gross = basic + hra + specialAllowance + bonus + variable;

    let employeePf = 0;
    if (salEmployeePf === 'standard') {
      employeePf = Math.min(21600, basic * 0.12);
    } else if (salEmployeePf === 'actual') {
      employeePf = basic * 0.12;
    }

    const actualNpsEmployer = Math.min(basic * 0.10, parseFloat(salNps) || 0);

    // Old Regime Tax
    let hraExemption = 0;
    if (rent > 0) {
      const annualRent = rent * 12;
      const rule1 = hra;
      const rule2 = Math.max(0, annualRent - 0.10 * basic);
      const rule3 = salIsMetro ? 0.50 * basic : 0.40 * basic;
      hraExemption = Math.min(rule1, rule2, rule3);
    }

    const sdOld = 50000;
    const limit80C = Math.min(150000, employeePf + (parseFloat(sal80c) || 0));
    const limit80D = Math.min(25000, parseFloat(sal80d) || 0);
    const limitHomeLoan = Math.min(200000, parseFloat(salHomeLoan) || 0);

    const oldDeductions = sdOld + hraExemption + limit80C + limit80D + limitHomeLoan + actualNpsEmployer + pt;
    const oldTaxable = Math.max(0, gross - oldDeductions);

    let oldTax = 0;
    if (oldTaxable > 500000) {
      if (oldTaxable <= 250000) oldTax = 0;
      else if (oldTaxable <= 500000) oldTax = (oldTaxable - 250000) * 0.05;
      else if (oldTaxable <= 1000000) oldTax = 12500 + (oldTaxable - 500000) * 0.20;
      else oldTax = 112500 + (oldTaxable - 1000000) * 0.30;
      oldTax += oldTax * 0.04;
    }

    // New Regime Tax
    const sdNew = 75000;
    const newTaxable = Math.max(0, gross - sdNew - actualNpsEmployer);
    let newTax = 0;
    if (newTaxable > 700000) {
      let temp = newTaxable;
      if (temp > 2000000) { newTax += (temp - 2000000) * 0.30; temp = 2000000; }
      if (temp > 1600000) { newTax += (temp - 1600000) * 0.20; temp = 1600000; }
      if (temp > 1200000) { newTax += (temp - 1200000) * 0.15; temp = 1200000; }
      if (temp > 800000) { newTax += (temp - 800000) * 0.10; temp = 800000; }
      if (temp > 400000) { newTax += (temp - 400000) * 0.05; }
      newTax += newTax * 0.04;
    }

    const oldDedsTotal = employeePf + pt + actualNpsEmployer + otherDeds + oldTax;
    const newDedsTotal = employeePf + pt + actualNpsEmployer + otherDeds + newTax;

    setSalResult({
      gross,
      oldTakeHome: Math.max(0, (gross - oldDedsTotal) / 12),
      newTakeHome: Math.max(0, (gross - newDedsTotal) / 12),
      oldTax,
      newTax,
    });
  }, [
    salCtc,
    salBasicPct,
    salHraPct,
    salBonus,
    salVariable,
    salEmployerPf,
    salEmployeePf,
    salRent,
    salIsMetro,
    sal80c,
    sal80d,
    salHomeLoan,
    salNps,
    salDeduction,
  ]);


  // Handle select calc from Home Dashboard
  const handleSelectCalculator = (id: string, category: string) => {
    setSelectedCalc(id);
    setSelectedCategory(category);
    setActiveTab('Calculators');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* 1. HEADER BRAND */}
      <View style={styles.header}>
        <Text style={styles.headerBrand}>ZeroEMI</Text>
        <Text style={styles.headerIndicator}>{activeTab}</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollBody} keyboardShouldPersistTaps="handled">
          
          {/* --- HOME TAB PANEL --- */}
          {activeTab === 'Home' && (
            <View style={styles.homeContainer}>
              <View style={styles.welcomeCard}>
                <Text style={styles.welcomeTitle}>Dynamic Financial &amp; Civil Estimates</Text>
                <Text style={styles.welcomeSubtitle}>
                  Perform instant computations, compare tax codes, and estimate material costs with clean, stateless calculators.
                </Text>
              </View>

              {categoriesList.map((cat) => (
                <View key={cat}>
                  <Text style={styles.sectionTitle}>{cat}</Text>
                  <View style={styles.calculatorGrid}>
                    {calculatorsList.filter(c => c.category === cat).map((calc) => (
                      <TouchableOpacity 
                        key={calc.id} 
                        style={styles.gridCard}
                        onPress={() => handleSelectCalculator(calc.id, cat)}
                      >
                        <Text style={styles.cardIcon}>{calc.icon}</Text>
                        <Text style={styles.cardTitle}>{calc.title}</Text>
                        <Text style={styles.cardMeta}>Estimate Now</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* --- CALCULATORS TAB PANEL --- */}
          {activeTab === 'Calculators' && (
            <View style={styles.calcContainer}>
              
              {/* Category selector row */}
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalSelector}>
                {categoriesList.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={[styles.selectorTab, selectedCategory === cat && styles.selectorTabActive]}
                    onPress={() => {
                      setSelectedCategory(cat);
                      // Select first calculator in new category
                      const firstInCat = calculatorsList.find(c => c.category === cat);
                      if (firstInCat) setSelectedCalc(firstInCat.id);
                    }}
                  >
                    <Text style={[styles.selectorTabText, selectedCategory === cat && styles.selectorTabTextActive]}>
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Sub-selector row for calculators inside selected category */}
              <View style={styles.subSelectorRow}>
                {calculatorsList.filter(c => c.category === selectedCategory).map((calc) => (
                  <TouchableOpacity
                    key={calc.id}
                    style={[styles.subSelectorTab, selectedCalc === calc.id && styles.subSelectorTabActive]}
                    onPress={() => setSelectedCalc(calc.id)}
                  >
                    <Text style={[styles.subSelectorTabText, selectedCalc === calc.id && styles.subSelectorTabTextActive]}>
                      {calc.title.split(' ')[0]}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* ACTIVE CALCULATOR MODULE */}
              <View style={styles.calculatorCard}>
                
                {/* 1. EMI CALCULATOR */}
                {selectedCalc === 'emi' && (
                  <View style={styles.calculatorView}>
                    <Text style={styles.moduleTitle}>EMI Loan Estimator</Text>
                    
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Loan Principal Amount</Text>
                      <TextInput 
                        style={styles.textInput}
                        keyboardType="numeric"
                        value={emiLoan}
                        onChangeText={setEmiLoan}
                      />
                    </View>

                    <View style={styles.inputRow}>
                      <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                        <Text style={styles.inputLabel}>Rate (% p.a.)</Text>
                        <TextInput 
                          style={styles.textInput}
                          keyboardType="numeric"
                          value={emiRate}
                          onChangeText={setEmiRate}
                        />
                      </View>
                      <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                        <Text style={styles.inputLabel}>Tenure (Yrs)</Text>
                        <TextInput 
                          style={styles.textInput}
                          keyboardType="numeric"
                          value={emiTenure}
                          onChangeText={setEmiTenure}
                        />
                      </View>
                    </View>

                    <View style={styles.resultsContainer}>
                      <View style={styles.resultRow}>
                        <Text style={styles.resultLabel}>Monthly EMI</Text>
                        <Text style={styles.resultValueHighlight}>{formatCurrency(emiResult.emi)}</Text>
                      </View>
                      <View style={styles.resultRow}>
                        <Text style={styles.resultLabel}>Total Interest</Text>
                        <Text style={styles.resultValue}>{formatCurrency(emiResult.interest)}</Text>
                      </View>
                      <View style={styles.resultRow}>
                        <Text style={styles.resultLabel}>Total Payment</Text>
                        <Text style={styles.resultValue}>{formatCurrency(emiResult.total)}</Text>
                      </View>
                    </View>
                  </View>
                )}

                {/* 2. SIP CALCULATOR */}
                {selectedCalc === 'sip' && (
                  <View style={styles.calculatorView}>
                    <Text style={styles.moduleTitle}>SIP Growth Projector</Text>
                    
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Monthly SIP Amount</Text>
                      <TextInput 
                        style={styles.textInput}
                        keyboardType="numeric"
                        value={sipMonthly}
                        onChangeText={setSipMonthly}
                      />
                    </View>

                    <View style={styles.inputRow}>
                      <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                        <Text style={styles.inputLabel}>Expected Return (%)</Text>
                        <TextInput 
                          style={styles.textInput}
                          keyboardType="numeric"
                          value={sipRate}
                          onChangeText={setSipRate}
                        />
                      </View>
                      <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                        <Text style={styles.inputLabel}>Duration (Yrs)</Text>
                        <TextInput 
                          style={styles.textInput}
                          keyboardType="numeric"
                          value={sipTenure}
                          onChangeText={setSipTenure}
                        />
                      </View>
                    </View>

                    <View style={styles.resultsContainer}>
                      <View style={styles.resultRow}>
                        <Text style={styles.resultLabel}>Future Value</Text>
                        <Text style={styles.resultValueHighlight}>{formatCurrency(sipResult.total)}</Text>
                      </View>
                      <View style={styles.resultRow}>
                        <Text style={styles.resultLabel}>Total Invested</Text>
                        <Text style={styles.resultValue}>{formatCurrency(sipResult.invested)}</Text>
                      </View>
                      <View style={styles.resultRow}>
                        <Text style={styles.resultLabel}>Est. Wealth Gain</Text>
                        <Text style={[styles.resultValue, { color: '#10b981' }]}>{formatCurrency(sipResult.wealth)}</Text>
                      </View>
                    </View>
                  </View>
                )}

                {/* 3. LOAN ELIGIBILITY */}
                {selectedCalc === 'loan_eligibility' && (
                  <View style={styles.calculatorView}>
                    <Text style={styles.moduleTitle}>Loan Borrowing Limit</Text>
                    
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Net Monthly Income</Text>
                      <TextInput 
                        style={styles.textInput}
                        keyboardType="numeric"
                        value={income}
                        onChangeText={setIncome}
                      />
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Existing Monthly EMIs</Text>
                      <TextInput 
                        style={styles.textInput}
                        keyboardType="numeric"
                        value={existingEmi}
                        onChangeText={setExistingEmi}
                      />
                    </View>

                    <View style={styles.inputRow}>
                      <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                        <Text style={styles.inputLabel}>Interest Rate (%)</Text>
                        <TextInput 
                          style={styles.textInput}
                          keyboardType="numeric"
                          value={elRate}
                          onChangeText={setElRate}
                        />
                      </View>
                      <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                        <Text style={styles.inputLabel}>Tenure (Yrs)</Text>
                        <TextInput 
                          style={styles.textInput}
                          keyboardType="numeric"
                          value={elTenure}
                          onChangeText={setElTenure}
                        />
                      </View>
                    </View>

                    <View style={styles.resultsContainer}>
                      <View style={styles.resultRow}>
                        <Text style={styles.resultLabel}>Max Eligible Loan</Text>
                        <Text style={styles.resultValueHighlight}>{formatCurrency(elResult.maxLoan)}</Text>
                      </View>
                      <View style={styles.resultRow}>
                        <Text style={styles.resultLabel}>Eligible Monthly EMI</Text>
                        <Text style={styles.resultValue}>{formatCurrency(elResult.maxEmi)}</Text>
                      </View>
                    </View>
                  </View>
                )}

                {/* 4. SALARY TAX CALCULATOR */}
                {selectedCalc === 'tax' && (
                  <View style={styles.calculatorView}>
                    <Text style={styles.moduleTitle}>Salary Tax Slabs Compare</Text>
                    
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Gross Annual Salary</Text>
                      <TextInput 
                        style={styles.textInput}
                        keyboardType="numeric"
                        value={grossSalary}
                        onChangeText={setGrossSalary}
                      />
                    </View>

                    <View style={styles.resultsContainer}>
                      <View style={styles.resultRow}>
                        <Text style={styles.resultLabel}>New Slabs Tax (FY 25-26)</Text>
                        <Text style={styles.resultValueHighlight}>{formatCurrency(taxResult.newTax)}</Text>
                      </View>
                      <View style={styles.resultRow}>
                        <Text style={styles.resultLabel}>Old Slabs Tax</Text>
                        <Text style={styles.resultValue}>{formatCurrency(taxResult.oldTax)}</Text>
                      </View>
                      <View style={styles.resultRow}>
                        <Text style={styles.resultLabel}>Net Regime Savings</Text>
                        <Text style={[styles.resultValue, { color: '#10b981', fontWeight: '800' }]}>
                          {formatCurrency(Math.max(0, taxResult.oldTax - taxResult.newTax))}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}

                {/* 5. CONSTRUCTION COST */}
                {selectedCalc === 'construction' && (
                  <View style={styles.calculatorView}>
                    <Text style={styles.moduleTitle}>House Construction Cost</Text>
                    
                    <View style={styles.inputRow}>
                      <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                        <Text style={styles.inputLabel}>Plot Area (sqft)</Text>
                        <TextInput 
                          style={styles.textInput}
                          keyboardType="numeric"
                          value={area}
                          onChangeText={setArea}
                        />
                      </View>
                      <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                        <Text style={styles.inputLabel}>Total Floors</Text>
                        <TextInput 
                          style={styles.textInput}
                          keyboardType="numeric"
                          value={floors}
                          onChangeText={setFloors}
                        />
                      </View>
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Material Grade Selection</Text>
                      <View style={styles.gradeGrid}>
                        {(['Standard', 'Premium', 'Luxury'] as const).map((g) => (
                          <TouchableOpacity
                            key={g}
                            style={[styles.gradeBtn, grade === g && styles.gradeBtnActive]}
                            onPress={() => setGrade(g)}
                          >
                            <Text style={[styles.gradeBtnText, grade === g && styles.gradeBtnTextActive]}>
                              {g}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>

                    <View style={styles.resultsContainer}>
                      <View style={styles.resultRow}>
                        <Text style={styles.resultLabel}>Estimated Civil Cost</Text>
                        <Text style={styles.resultValueHighlight}>{formatCurrency(constResult.total)}</Text>
                      </View>
                      <View style={styles.resultRow}>
                        <Text style={styles.resultLabel}>Materials (58%)</Text>
                        <Text style={styles.resultValue}>{formatCurrency(constResult.materials)}</Text>
                      </View>
                      <View style={styles.resultRow}>
                        <Text style={styles.resultLabel}>Labor (25%)</Text>
                        <Text style={styles.resultValue}>{formatCurrency(constResult.labor)}</Text>
                      </View>
                    </View>
                  </View>
                )}

                {/* 6. TILE CALCULATOR */}
                {selectedCalc === 'tiles' && (
                  <View style={styles.calculatorView}>
                    <Text style={styles.moduleTitle}>Floor &amp; Wall Tile Estimator</Text>
                    
                    <View style={styles.inputRow}>
                      <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                        <Text style={styles.inputLabel}>Length (ft)</Text>
                        <TextInput 
                          style={styles.textInput}
                          keyboardType="numeric"
                          value={length}
                          onChangeText={setLength}
                        />
                      </View>
                      <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                        <Text style={styles.inputLabel}>Width (ft)</Text>
                        <TextInput 
                          style={styles.textInput}
                          keyboardType="numeric"
                          value={width}
                          onChangeText={setWidth}
                        />
                      </View>
                    </View>

                    <View style={styles.inputRow}>
                      <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                        <Text style={styles.inputLabel}>Tile size (ft)</Text>
                        <TextInput 
                          style={styles.textInput}
                          keyboardType="numeric"
                          value={tileSize}
                          onChangeText={setTileSize}
                        />
                      </View>
                      <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                        <Text style={styles.inputLabel}>Wastage (%)</Text>
                        <TextInput 
                          style={styles.textInput}
                          keyboardType="numeric"
                          value={wastage}
                          onChangeText={setWastage}
                        />
                      </View>
                    </View>

                    <View style={styles.resultsContainer}>
                      <View style={styles.resultRow}>
                        <Text style={styles.resultLabel}>Total Purchase Required</Text>
                        <Text style={styles.resultValueHighlight}>{Math.ceil(tilesResult.totalCount)} Tiles</Text>
                      </View>
                      <View style={styles.resultRow}>
                        <Text style={styles.resultLabel}>Base Requirement</Text>
                        <Text style={styles.resultValue}>{Math.ceil(tilesResult.baseCount)} Tiles</Text>
                      </View>
                    </View>
                  </View>
                )}

                {/* 7. NO COST EMI */}
                {selectedCalc === 'no_cost_emi' && (
                  <View style={styles.calculatorView}>
                    <Text style={styles.moduleTitle}>No Cost EMI Decoder</Text>
                    
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Product Listing Price</Text>
                      <TextInput 
                        style={styles.textInput}
                        keyboardType="numeric"
                        value={ncPrice}
                        onChangeText={setNcPrice}
                      />
                    </View>

                    <View style={styles.inputRow}>
                      <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                        <Text style={styles.inputLabel}>Down Payment</Text>
                        <TextInput 
                          style={styles.textInput}
                          keyboardType="numeric"
                          value={ncDown}
                          onChangeText={setNcDown}
                        />
                      </View>
                      <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                        <Text style={styles.inputLabel}>Upfront Discount</Text>
                        <TextInput 
                          style={styles.textInput}
                          keyboardType="numeric"
                          value={ncDiscount}
                          onChangeText={setNcDiscount}
                        />
                      </View>
                    </View>

                    <View style={styles.inputRow}>
                      <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                        <Text style={styles.inputLabel}>Processing Fee</Text>
                        <TextInput 
                          style={styles.textInput}
                          keyboardType="numeric"
                          value={ncFee}
                          onChangeText={setNcFee}
                        />
                      </View>
                      <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                        <Text style={styles.inputLabel}>Tenure (Months)</Text>
                        <TextInput 
                          style={styles.textInput}
                          keyboardType="numeric"
                          value={ncTenure}
                          onChangeText={setNcTenure}
                        />
                      </View>
                    </View>

                    <View style={styles.resultsContainer}>
                      <View style={styles.resultRow}>
                        <Text style={styles.resultLabel}>True Effective APR</Text>
                        <Text style={styles.resultValueHighlight}>{ncResult.eir.toFixed(2)}% p.a.</Text>
                      </View>
                      <View style={styles.resultRow}>
                        <Text style={styles.resultLabel}>Monthly EMI</Text>
                        <Text style={styles.resultValue}>{formatCurrency(ncResult.emi)}</Text>
                      </View>
                      <View style={styles.resultRow}>
                        <Text style={styles.resultLabel}>Hidden Charges</Text>
                        <Text style={[styles.resultValue, { color: '#f43f5e' }]}>{formatCurrency(ncResult.hiddenCharges)}</Text>
                      </View>
                      <View style={styles.resultRow}>
                        <Text style={styles.resultLabel}>Total Amount Paid</Text>
                        <Text style={styles.resultValue}>{formatCurrency(ncResult.totalPaid)}</Text>
                      </View>
                    </View>
                  </View>
                )}

                {/* 8. HRA EXEMPTION */}
                {selectedCalc === 'hra' && (
                  <View style={styles.calculatorView}>
                    <Text style={styles.moduleTitle}>HRA Exemption Exporter</Text>
                    
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Basic Salary + DA</Text>
                      <TextInput 
                        style={styles.textInput}
                        keyboardType="numeric"
                        value={hraBasic}
                        onChangeText={setHraBasic}
                      />
                    </View>

                    <View style={styles.inputRow}>
                      <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                        <Text style={styles.inputLabel}>HRA Received</Text>
                        <TextInput 
                          style={styles.textInput}
                          keyboardType="numeric"
                          value={hraReceived}
                          onChangeText={setHraReceived}
                        />
                      </View>
                      <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                        <Text style={styles.inputLabel}>Rent Paid</Text>
                        <TextInput 
                          style={styles.textInput}
                          keyboardType="numeric"
                          value={hraRent}
                          onChangeText={setHraRent}
                        />
                      </View>
                    </View>

                    <View style={styles.checkboxRow}>
                      <TouchableOpacity 
                        style={[styles.checkboxBtn, hraIsMetro && styles.checkboxBtnActive]} 
                        onPress={() => setHraIsMetro(!hraIsMetro)}
                      >
                        <Text style={[styles.checkboxBtnText, hraIsMetro && styles.checkboxBtnTextActive]}>
                          {hraIsMetro ? 'Residing in Metro City ✓' : 'Non-Metro City'}
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.resultsContainer}>
                      <View style={styles.resultRow}>
                        <Text style={styles.resultLabel}>Eligible Exemption</Text>
                        <Text style={styles.resultValueHighlight}>{formatCurrency(hraResult.exempted)}</Text>
                      </View>
                      <View style={styles.resultRow}>
                        <Text style={styles.resultLabel}>Taxable HRA Portion</Text>
                        <Text style={[styles.resultValue, { color: '#f43f5e' }]}>{formatCurrency(hraResult.taxable)}</Text>
                      </View>
                    </View>
                  </View>
                )}

                {/* 9. IN-HAND SALARY */}
                {selectedCalc === 'in_hand_salary' && (
                  <View style={styles.calculatorView}>
                    <Text style={styles.moduleTitle}>Salary Take-Home Decoder</Text>
                    
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Annual CTC</Text>
                      <TextInput 
                        style={styles.textInput}
                        keyboardType="numeric"
                        value={salCtc}
                        onChangeText={setSalCtc}
                      />
                    </View>

                    <View style={styles.inputRow}>
                      <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                        <Text style={styles.inputLabel}>Basic Salary %</Text>
                        <TextInput 
                          style={styles.textInput}
                          keyboardType="numeric"
                          value={salBasicPct}
                          onChangeText={setSalBasicPct}
                        />
                      </View>
                      <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                        <Text style={styles.inputLabel}>HRA Salary %</Text>
                        <TextInput 
                          style={styles.textInput}
                          keyboardType="numeric"
                          value={salHraPct}
                          onChangeText={setSalHraPct}
                        />
                      </View>
                    </View>

                    <View style={styles.inputRow}>
                      <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                        <Text style={styles.inputLabel}>Bonus / Variable</Text>
                        <TextInput 
                          style={styles.textInput}
                          keyboardType="numeric"
                          value={salBonus}
                          onChangeText={setSalBonus}
                        />
                      </View>
                      <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                        <Text style={styles.inputLabel}>Monthly Rent Paid</Text>
                        <TextInput 
                          style={styles.textInput}
                          keyboardType="numeric"
                          value={salRent}
                          onChangeText={setSalRent}
                        />
                      </View>
                    </View>

                    <View style={styles.resultsContainer}>
                      <View style={styles.resultRow}>
                        <Text style={styles.resultLabel}>New Regime Take-Home</Text>
                        <Text style={styles.resultValueHighlight}>{formatCurrency(salResult.newTakeHome)} /mo</Text>
                      </View>
                      <View style={styles.resultRow}>
                        <Text style={styles.resultLabel}>Old Regime Take-Home</Text>
                        <Text style={styles.resultValue}>{formatCurrency(salResult.oldTakeHome)} /mo</Text>
                      </View>
                      <View style={styles.resultRow}>
                        <Text style={styles.resultLabel}>New Regime Tax Paid</Text>
                        <Text style={styles.resultValue}>{formatCurrency(salResult.newTax)} /yr</Text>
                      </View>
                      <View style={styles.resultRow}>
                        <Text style={styles.resultLabel}>Old Regime Tax Paid</Text>
                        <Text style={styles.resultValue}>{formatCurrency(salResult.oldTax)} /yr</Text>
                      </View>
                      <View style={styles.resultRow}>
                        <Text style={styles.resultLabel}>Recommended Option</Text>
                        <Text style={[styles.resultValue, { color: '#10b981', fontWeight: 'bold' }]}>
                          {salResult.newTakeHome >= salResult.oldTakeHome ? 'New Tax Regime' : 'Old Tax Regime'}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}

              </View>
            </View>
          )}

        </ScrollView>
      </KeyboardAvoidingView>

      {/* FOOTER NAVIGATION TABS */}
      <View style={styles.tabBar}>
        {(['Home', 'Calculators'] as ScreenTab[]).map((tab) => {
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity 
              key={tab} 
              style={styles.tabItem} 
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.7}
            >
              <Text style={styles.tabIcon}>
                {tab === 'Home' ? '🏠' : '🧮'}
              </Text>
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    height: 56,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerBrand: {
    fontSize: 20,
    fontWeight: '900',
    color: '#4f46e5',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
  },
  headerIndicator: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  scrollBody: {
    padding: 16,
    paddingBottom: 40,
  },
  homeContainer: {
    flex: 1,
  },
  welcomeCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 20,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 6,
  },
  welcomeSubtitle: {
    fontSize: 12,
    color: '#64748b',
    lineHeight: 18,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
    marginTop: 10,
  },
  calculatorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  gridCard: {
    width: '48.5%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 12,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 5,
    elevation: 1,
  },
  cardIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  cardMeta: {
    fontSize: 9,
    fontWeight: '700',
    color: '#4f46e5',
    textTransform: 'uppercase',
  },
  calcContainer: {
    flex: 1,
  },
  horizontalSelector: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingVertical: 4,
  },
  selectorTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  selectorTabActive: {
    backgroundColor: '#4f46e5',
    borderColor: '#4f46e5',
  },
  selectorTabText: {
    color: '#64748b',
    fontSize: 11,
    fontWeight: '800',
  },
  selectorTabTextActive: {
    color: '#ffffff',
  },
  subSelectorRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  subSelectorTab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    marginRight: 6,
    marginBottom: 6,
  },
  subSelectorTabActive: {
    backgroundColor: '#cbd5e1',
  },
  subSelectorTabText: {
    color: '#475569',
    fontSize: 10,
    fontWeight: '700',
  },
  subSelectorTabTextActive: {
    color: '#0f172a',
  },
  calculatorCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 3,
  },
  calculatorView: {
    width: '100%',
  },
  moduleTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    paddingBottom: 8,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748b',
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  textInput: {
    height: 40,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#0f172a',
    fontWeight: '600',
  },
  gradeGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gradeBtn: {
    flex: 1,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginHorizontal: 4,
    backgroundColor: '#ffffff',
  },
  gradeBtnActive: {
    backgroundColor: '#4f46e5',
    borderColor: '#4f46e5',
  },
  gradeBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748b',
  },
  gradeBtnTextActive: {
    color: '#ffffff',
  },
  checkboxRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  checkboxBtn: {
    flex: 1,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    backgroundColor: '#f8fafc',
  },
  checkboxBtnActive: {
    backgroundColor: '#e0e7ff',
    borderColor: '#818cf8',
  },
  checkboxBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  checkboxBtnTextActive: {
    color: '#4f46e5',
  },
  resultsContainer: {
    marginTop: 8,
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  resultLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748b',
    textTransform: 'uppercase',
  },
  resultValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0f172a',
  },
  resultValueHighlight: {
    fontSize: 15,
    fontWeight: '900',
    color: '#4f46e5',
  },
  tabBar: {
    flexDirection: 'row',
    height: 56,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingBottom: Platform.OS === 'ios' ? 12 : 0,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 2,
  },
  tabText: {
    color: '#94a3b8',
    fontSize: 10,
    fontWeight: '700',
  },
  tabTextActive: {
    color: '#4f46e5',
  },
});
