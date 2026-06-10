'use client';

import React, { useState } from 'react';
import Dashboard from '../components/Dashboard';

// Calculators
import EmiCalculator from '../components/calculators/EmiCalculator';
import SipCalculator from '../components/calculators/SipCalculator';
import LoanEligibilityCalculator from '../components/calculators/LoanEligibilityCalculator';
import SalaryTaxCalculator from '../components/calculators/SalaryTaxCalculator';
import CreditCardRewardsCalculator from '../components/calculators/CreditCardRewardsCalculator';
import ConstructionCostCalculator from '../components/calculators/ConstructionCostCalculator';
import TileCalculator from '../components/calculators/TileCalculator';

import {
  Percent,
  TrendingUp,
  Compass,
  BookOpen,
  CreditCard,
  Construction,
  Grid
} from 'lucide-react';

export default function Home() {
  const [currentTab, setCurrentTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCalc, setSelectedCalc] = useState<string>('emi');

  const calculatorsList = [
    { id: 'emi', title: 'EMI Calculator', icon: Percent },
    { id: 'sip', title: 'SIP Calculator', icon: TrendingUp },
    { id: 'loan_eligibility', title: 'Loan Eligibility', icon: Compass },
    { id: 'tax', title: 'Salary Tax Calculator', icon: BookOpen },
    { id: 'cc_rewards', title: 'Credit Card Rewards', icon: CreditCard },
    { id: 'construction', title: 'Construction Cost', icon: Construction },
    { id: 'tiles', title: 'Tile Calculator', icon: Grid }
  ];

  const handleSelectCalculatorFromDashboard = (id: string) => {
    setSelectedCalc(id);
    setCurrentTab('calculators');
  };

  // Render the active view
  const renderMainContent = () => {
    switch (currentTab) {
      case 'home':
        return (
          <Dashboard
            onSelectCalculator={handleSelectCalculatorFromDashboard}
            searchQuery={searchQuery}
          />
        );
      case 'calculators':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Sidebar list of calculators on desktop */}
            <div className="lg:col-span-3 bg-white border border-slate-200 p-4 rounded-2xl shadow-sm space-y-1">
              <span className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider px-3 mb-2 block">
                Calculator Menu
              </span>
              {calculatorsList.map((c) => {
                const Icon = c.icon;
                const isActive = selectedCalc === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCalc(c.id)}
                    className={`flex items-center w-full px-3 py-2.5 rounded-xl text-left text-xs font-semibold transition cursor-pointer ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-600 font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Icon size={14} className="mr-2.5 shrink-0" />
                    <span className="truncate">{c.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Calculator Container */}
            <div className="lg:col-span-9">
              {selectedCalc === 'emi' && <EmiCalculator />}
              {selectedCalc === 'sip' && <SipCalculator />}
              {selectedCalc === 'loan_eligibility' && <LoanEligibilityCalculator />}
              {selectedCalc === 'tax' && <SalaryTaxCalculator />}
              {selectedCalc === 'cc_rewards' && <CreditCardRewardsCalculator />}
              {selectedCalc === 'construction' && <ConstructionCostCalculator />}
              {selectedCalc === 'tiles' && <TileCalculator />}
            </div>
          </div>
        );
      default:
        return <Dashboard onSelectCalculator={handleSelectCalculatorFromDashboard} searchQuery={searchQuery} />;
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'calculators', label: 'Calculators' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      {/* 1. PREMIUM TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm h-16 shrink-0">
        <div className="max-w-5xl mx-auto px-4 md:px-6 h-full flex items-center justify-between gap-4">
          
          {/* Logo Brand without icon */}
          <div className="flex items-center cursor-pointer" onClick={() => setCurrentTab('home')}>
            <span className="font-extrabold text-xl font-display text-indigo-600 tracking-tight">
              CalcPilot
            </span>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-600 font-extrabold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            {/* Search Bar Input */}
            <div className="relative w-40 lg:w-48">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none text-xs">
                🔍
              </span>
              <input
                type="text"
                placeholder="Search calculator..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main content body */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-6 pb-20">
        {renderMainContent()}
      </main>

      {/* 2. MOBILE BOTTOM NAVIGATION */}
      <nav className="flex md:hidden fixed bottom-0 left-0 right-0 items-center justify-around border-t border-slate-200 bg-white h-16 z-30 shadow-inner pb-safe">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition cursor-pointer ${
                isActive ? 'text-indigo-600 font-bold' : 'text-slate-500'
              }`}
            >
              <span className="text-sm font-semibold">
                {item.id === 'home' && '🏠'}
                {item.id === 'calculators' && '🧮'}
              </span>
              <span className="text-[9px] font-semibold mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
