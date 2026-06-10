'use client';

import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Dashboard from '../components/Dashboard';
import SavedCalculations from '../components/SavedCalculations';
import Insights from '../components/Insights';
import ProfileSettings from '../components/ProfileSettings';
import AdminPortal from '../components/AdminPortal';

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
  Sun,
  Moon,
  Laptop
} from 'lucide-react';

export default function Home() {
  const [currentTab, setCurrentTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCalc, setSelectedCalc] = useState<string>('emi');
  const { theme, setTheme } = useTheme();
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const notifications = [
    { id: 1, text: 'HDFC Interest rates dropped to 8.35%!', time: '10m ago', unread: true },
    { id: 2, text: 'Old vs New Tax Regime guide updated.', time: '2h ago', unread: true },
    { id: 3, text: 'Axis Atlas reward partners updated.', time: '1d ago', unread: false }
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

  const handleSelectCalculatorFromDashboard = (id: string) => {
    setSelectedCalc(id);
    setCurrentTab('calculators');
  };

  // Render the appropriate main view
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
            <div className="lg:col-span-3 bg-card border border-border p-4 rounded-2xl shadow-sm space-y-1">
              <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider px-3 mb-2 block">
                Calculators
              </span>
              {calculatorsList.map((c) => {
                const Icon = c.icon;
                const isActive = selectedCalc === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCalc(c.id)}
                    className={`flex items-center w-full px-3 py-2.5 rounded-xl text-left text-xs font-semibold transition ${
                      isActive
                        ? 'bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 font-bold'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-muted'
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
      case 'profile':
        return <ProfileSettings />;
      case 'admin':
        return <AdminPortal />;
      default:
        return <Dashboard onSelectCalculator={handleSelectCalculatorFromDashboard} searchQuery={searchQuery} />;
    }
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: () => '🏠' },
    { id: 'calculators', label: 'Calculators', icon: () => '🧮' },
    { id: 'saved', label: 'Saved', icon: () => '🔖' },
    { id: 'insights', label: 'Insights', icon: () => '📈' },
    { id: 'profile', label: 'Profile', icon: () => '👤' },
    { id: 'admin', label: 'Admin', icon: () => '⚙️' }
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      {/* 1. DESKTOP SIDEBAR */}
      <aside
        className={`hidden md:flex flex-col border-r border-border bg-card transition-all duration-300 ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-border h-16">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/20">
              <span className="text-xl font-bold font-display">🧭</span>
            </div>
            {!sidebarCollapsed && (
              <span className="font-bold text-lg font-display bg-gradient-to-r from-sky-600 to-indigo-600 dark:from-sky-400 dark:to-indigo-400 bg-clip-text text-transparent truncate">
                CalcPilot
              </span>
            )}
          </div>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1 rounded-lg hover:bg-muted text-muted-foreground transition cursor-pointer"
          >
            {sidebarCollapsed ? '➡️' : '⬅️'}
          </button>
        </div>

        {/* Sidebar Nav Items */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`flex items-center w-full px-3 py-3 rounded-xl transition-all duration-200 gap-3 text-left cursor-pointer ${
                  isActive
                    ? 'bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 font-semibold shadow-sm'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <span className="text-lg">{item.icon()}</span>
                {!sidebarCollapsed && <span className="text-sm font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Theme Selector Footer */}
        <div className="p-4 border-t border-border flex flex-col gap-2">
          {!sidebarCollapsed && (
            <div className="text-[10px] font-semibold text-muted-foreground tracking-wider uppercase mb-1">
              Select Theme
            </div>
          )}
          <div className="flex items-center justify-around bg-muted p-1 rounded-xl">
            <button
              onClick={() => setTheme('light')}
              className={`p-1.5 rounded-lg transition text-xs font-semibold cursor-pointer ${
                theme === 'light' ? 'bg-card text-sky-600 shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
              title="Light"
            >
              ☀️
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`p-1.5 rounded-lg transition text-xs font-semibold cursor-pointer ${
                theme === 'dark' ? 'bg-card text-sky-400 shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
              title="Dark"
            >
              🌙
            </button>
            <button
              onClick={() => setTheme('system')}
              className={`p-1.5 rounded-lg transition text-xs font-semibold cursor-pointer ${
                theme === 'system' ? 'bg-card text-slate-500 shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
              title="System"
            >
              💻
            </button>
          </div>
        </div>
      </aside>

      {/* Main Panel Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Sticky Header */}
        <header className="flex items-center justify-between border-b border-border px-4 md:px-6 h-16 bg-card shrink-0">
          {/* Quick search input */}
          <div className="flex items-center gap-3 flex-1 max-w-sm">
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground text-xs">
                🔍
              </span>
              <input
                type="text"
                placeholder="Search calculator..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-4 py-1.5 text-xs bg-input border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-ring transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme switcher for mobile header */}
            <div className="md:hidden relative">
              <button
                onClick={() => setShowThemeDropdown(!showThemeDropdown)}
                className="p-2 rounded-xl hover:bg-muted text-muted-foreground cursor-pointer"
              >
                {theme === 'light' ? '☀️' : theme === 'dark' ? '🌙' : '💻'}
              </button>
              {showThemeDropdown && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowThemeDropdown(false)} />
                  <div className="absolute right-0 mt-2 bg-card border border-border rounded-xl shadow-lg z-20 p-1 flex flex-col gap-1 w-28">
                    <button
                      onClick={() => {
                        setTheme('light');
                        setShowThemeDropdown(false);
                      }}
                      className="px-3 py-1.5 hover:bg-muted text-xs font-medium rounded-lg text-left"
                    >
                      ☀️ Light
                    </button>
                    <button
                      onClick={() => {
                        setTheme('dark');
                        setShowThemeDropdown(false);
                      }}
                      className="px-3 py-1.5 hover:bg-muted text-xs font-medium rounded-lg text-left"
                    >
                      🌙 Dark
                    </button>
                    <button
                      onClick={() => {
                        setTheme('system');
                        setShowThemeDropdown(false);
                      }}
                      className="px-3 py-1.5 hover:bg-muted text-xs font-medium rounded-lg text-left"
                    >
                      💻 System
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Notification alert icon */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
              >
                🔔
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-card" />
              </button>

              {showNotifications && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowNotifications(false)} />
                  <div className="absolute right-0 mt-2 w-64 bg-card border border-border rounded-xl shadow-lg z-20 overflow-hidden">
                    <div className="p-2.5 border-b border-border font-semibold text-[10px] text-muted-foreground uppercase tracking-wider bg-slate-50 dark:bg-slate-950/20">
                      Notifications
                    </div>
                    <div className="divide-y divide-border">
                      {notifications.map((n) => (
                        <div key={n.id} className="p-3 hover:bg-muted transition text-xs">
                          <p className="font-semibold text-slate-800 dark:text-slate-200">{n.text}</p>
                          <span className="text-[9px] text-muted-foreground block mt-1">{n.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Profile trigger */}
            <button
              onClick={() => setCurrentTab('profile')}
              className="flex items-center gap-2 hover:bg-muted p-1.5 rounded-xl transition duration-200 cursor-pointer"
            >
              <div className="h-7 w-7 rounded-lg bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center text-white font-extrabold text-xs shadow-sm">
                P
              </div>
              <span className="hidden md:block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Pavan M.
              </span>
            </button>
          </div>
        </header>

        {/* Scrollable Dashboard Body */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-background">
          <div className="max-w-5xl mx-auto">
            {renderMainContent()}
          </div>
        </main>

        {/* 3. MOBILE BOTTOM NAVIGATION */}
        <nav className="flex md:hidden items-center justify-around border-t border-border bg-card h-16 shrink-0 z-30 shadow-inner">
          {navItems.slice(0, 5).map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition cursor-pointer ${
                  isActive ? 'text-sky-600 dark:text-sky-400 font-bold' : 'text-muted-foreground'
                }`}
              >
                <span className="text-base">{item.icon()}</span>
                <span className="text-[9px] font-semibold mt-0.5">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
