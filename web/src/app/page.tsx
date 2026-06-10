'use client';

import React, { useState, useEffect } from 'react';
import Dashboard from '../components/Dashboard';
import SavedCalculations from '../components/SavedCalculations';
import Insights from '../components/Insights';
import ProfileSettings from '../components/ProfileSettings';
import AdminPortal from '../components/AdminPortal';
import AdminLogin from '../components/AdminLogin';

// Calculators
import EmiCalculator from '../components/calculators/EmiCalculator';
import SipCalculator from '../components/calculators/SipCalculator';
import LoanEligibilityCalculator from '../components/calculators/LoanEligibilityCalculator';
import SalaryTaxCalculator from '../components/calculators/SalaryTaxCalculator';
import CreditCardRewardsCalculator from '../components/calculators/CreditCardRewardsCalculator';
import ConstructionCostCalculator from '../components/calculators/ConstructionCostCalculator';
import TileCalculator from '../components/calculators/TileCalculator';

import { useTheme } from '../components/ThemeProvider';
import {
  Percent,
  TrendingUp,
  Compass,
  BookOpen,
  CreditCard,
  Construction,
  Grid,
  Search,
  Bell,
  Lock,
  LogOut,
  UserCheck
} from 'lucide-react';

export default function Home() {
  const [currentTab, setCurrentTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCalc, setSelectedCalc] = useState<string>('emi');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, text: 'HDFC Interest rates dropped to 8.35%!', time: '10m ago' },
    { id: 2, text: 'Old vs New Tax Regime rules updated.', time: '2h ago' }
  ];

  const calculatorsList = [
    { id: 'emi', title: 'EMI Calculator', icon: Percent },
    { id: 'sip', title: 'SIP Calculator', icon: TrendingUp },
    { id: 'loan_eligibility', title: 'Loan Eligibility', icon: Compass },
    { id: 'tax', title: 'Salary Tax Calculator', icon: BookOpen },
    { id: 'cc_rewards', title: 'Credit Card Rewards', icon: CreditCard },
    { id: 'construction', title: 'Construction Cost', icon: Construction },
    { id: 'tiles', title: 'Tile Calculator', icon: Grid }
  ];

  useEffect(() => {
    // Check if session exists in browser cache
    if (typeof window !== 'undefined') {
      const loggedIn = localStorage.getItem('calcpilot-admin-auth') === 'true';
      setIsAdminLoggedIn(loggedIn);
    }
  }, []);

  const handleAdminSuccess = () => {
    setIsAdminLoggedIn(true);
    localStorage.setItem('calcpilot-admin-auth', 'true');
  };

  const handleSignOut = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('calcpilot-admin-auth');
    setCurrentTab('home');
  };

  const handleSelectCalculatorFromDashboard = (id: string) => {
    setSelectedCalc(id);
    setCurrentTab('calculators');
  };

  // Render the active view
  const renderMainContent = () => {
    if (currentTab === 'admin') {
      if (!isAdminLoggedIn) {
        return <AdminLogin onLoginSuccess={handleAdminSuccess} />;
      }
      return <AdminPortal />;
    }

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
                        ? 'bg-sky-50 text-sky-600 font-bold'
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
      case 'saved':
        return <SavedCalculations />;
      case 'insights':
        return <Insights />;
      default:
        return <Dashboard onSelectCalculator={handleSelectCalculatorFromDashboard} searchQuery={searchQuery} />;
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'calculators', label: 'Calculators' },
    { id: 'saved', label: 'Saved' },
    { id: 'insights', label: 'Insights' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      {/* 1. PREMIUM TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo Brand */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentTab('home')}>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/20">
              <span className="text-lg font-bold">🧭</span>
            </div>
            <span className="font-extrabold text-base font-display bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
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
                      ? 'bg-sky-50 text-sky-600 font-extrabold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Quick Actions & Admin Gate */}
          <div className="flex items-center gap-3">
            {/* Search Bar Input */}
            <div className="relative hidden md:block w-40 lg:w-48">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none text-xs">
                🔍
              </span>
              <input
                type="text"
                placeholder="Search calculator..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-sky-500/30 transition-all"
              />
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition cursor-pointer"
              >
                🔔
              </button>

              {showNotifications && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowNotifications(false)} />
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-lg z-20 overflow-hidden">
                    <div className="p-2.5 border-b border-slate-200 font-semibold text-[10px] text-slate-400 uppercase tracking-wider bg-slate-50">
                      Notifications
                    </div>
                    <div className="divide-y divide-slate-100">
                      {notifications.map((n) => (
                        <div key={n.id} className="p-3 hover:bg-slate-50 transition text-xs">
                          <p className="font-semibold text-slate-800">{n.text}</p>
                          <span className="text-[9px] text-slate-400 block mt-1">{n.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Admin Profile Login Gate trigger */}
            {isAdminLoggedIn ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <span className="hidden lg:flex items-center gap-1 text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full uppercase">
                  <UserCheck size={10} /> Admin Mode
                </span>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 font-bold border border-red-200 rounded-lg transition cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut size={12} /> Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => setCurrentTab('admin')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold border rounded-lg transition cursor-pointer ${
                  currentTab === 'admin'
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <Lock size={12} /> Admin Access
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main content body */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-6 pb-20">
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
                isActive ? 'text-sky-600 font-bold' : 'text-slate-500'
              }`}
            >
              <span className="text-sm font-semibold">
                {item.id === 'home' && '🏠'}
                {item.id === 'calculators' && '🧮'}
                {item.id === 'saved' && '🔖'}
                {item.id === 'insights' && '📈'}
              </span>
              <span className="text-[9px] font-semibold mt-0.5">{item.label}</span>
            </button>
          );
        })}
        {/* Mobile Admin tab */}
        <button
          onClick={() => setCurrentTab('admin')}
          className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition cursor-pointer ${
            currentTab === 'admin' ? 'text-indigo-600 font-bold' : 'text-slate-500'
          }`}
        >
          <span className="text-sm">⚙️</span>
          <span className="text-[9px] font-semibold mt-0.5">Admin</span>
        </button>
      </nav>
    </div>
  );
}
