'use client';

import React, { useState } from 'react';
import { useTheme } from './ThemeProvider';
import {
  Home,
  Calculator,
  Bookmark,
  TrendingUp,
  User,
  Settings,
  Menu,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Laptop,
  Search,
  Bell,
  Wallet,
  ShieldCheck,
  Percent
} from 'lucide-react';

interface NavigationProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Navigation({
  currentTab,
  setCurrentTab,
  searchQuery,
  setSearchQuery
}: NavigationProps) {
  const { theme, setTheme } = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'calculators', label: 'Calculators', icon: Calculator },
    { id: 'saved', label: 'Saved', icon: Bookmark },
    { id: 'insights', label: 'Insights', icon: TrendingUp },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'admin', label: 'Admin', icon: Settings }
  ];

  const notifications = [
    { id: 1, text: 'HDFC Interest rates dropped to 8.35%!', time: '10m ago', unread: true },
    { id: 2, text: 'Old vs New Tax Regime guide updated.', time: '2h ago', unread: true },
    { id: 3, text: 'Axis Atlas reward partners updated.', time: '1d ago', unread: false }
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      {/* 1. DESKTOP SIDEBAR */}
      <aside
        className={`hidden md:flex flex-col border-r border-border bg-card transition-all duration-300 ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between p-4 border-b border-border h-16">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/20">
              <span className="text-xl font-bold font-display">🧭</span>
            </div>
            {!sidebarCollapsed && (
              <span className="font-bold text-lg font-display bg-gradient-to-r from-sky-600 to-indigo-600 dark:from-sky-400 dark:to-indigo-400 bg-clip-text text-transparent">
                CalcPilot
              </span>
            )}
          </div>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1 rounded-lg hover:bg-muted text-muted-foreground transition-all duration-200"
          >
            {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`flex items-center w-full px-3 py-3 rounded-xl transition-all duration-200 gap-3 ${
                  isActive
                    ? 'bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 font-semibold shadow-sm'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-sky-600 dark:text-sky-400' : ''} />
                {!sidebarCollapsed && <span className="text-sm font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Theme Settings & Profile in Sidebar footer */}
        <div className="p-4 border-t border-border flex flex-col gap-2">
          {!sidebarCollapsed && (
            <div className="text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-1">
              Settings
            </div>
          )}
          <div className="flex items-center justify-around bg-muted p-1 rounded-xl">
            <button
              onClick={() => setTheme('light')}
              className={`p-1.5 rounded-lg transition-all ${
                theme === 'light' ? 'bg-card text-sky-600 shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
              title="Light Mode"
            >
              <Sun size={16} />
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`p-1.5 rounded-lg transition-all ${
                theme === 'dark' ? 'bg-card text-sky-400 shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
              title="Dark Mode"
            >
              <Moon size={16} />
            </button>
            <button
              onClick={() => setTheme('system')}
              className={`p-1.5 rounded-lg transition-all ${
                theme === 'system' ? 'bg-card text-slate-500 shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
              title="System Theme"
            >
              <Laptop size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header bar */}
        <header className="flex items-center justify-between border-b border-border px-4 md:px-6 h-16 bg-card shrink-0">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                <Search size={18} />
              </span>
              <input
                type="text"
                placeholder="Search calculator..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring transition-all"
              />
            </div>
          </div>

          {/* Quick Profile/Alert Icons */}
          <div className="flex items-center gap-3">
            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-200"
              >
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-card" />
              </button>

              {showNotifications && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowNotifications(false)}
                  />
                  <div className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-xl shadow-lg z-20 overflow-hidden">
                    <div className="p-3 border-b border-border font-semibold text-xs text-muted-foreground uppercase">
                      Notifications
                    </div>
                    <div className="divide-y divide-border">
                      {notifications.map((n) => (
                        <div key={n.id} className="p-3 hover:bg-muted transition duration-200">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-xs font-medium text-foreground">{n.text}</p>
                            {n.unread && <span className="h-1.5 w-1.5 rounded-full bg-sky-500 shrink-0 mt-1" />}
                          </div>
                          <span className="text-[10px] text-muted-foreground block mt-1">{n.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Profile Avatar Quick View */}
            <button
              onClick={() => setCurrentTab('profile')}
              className="flex items-center gap-2 hover:bg-muted p-1.5 rounded-xl transition duration-200"
            >
              <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                G
              </div>
              <span className="hidden md:block text-xs font-medium">Guest User</span>
            </button>
          </div>
        </header>

        {/* 2. BODY CONTENT */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-background">
          {/* We will render children inside */}
          {/* We pass a custom class for styling */}
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Active Content will sit here */}
          </div>
        </main>

        {/* 3. MOBILE BOTTOM NAVIGATION */}
        <nav className="flex md:hidden items-center justify-around border-t border-border bg-card h-16 shrink-0 pb-safe z-30">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all ${
                  isActive ? 'text-sky-600 dark:text-sky-400' : 'text-muted-foreground'
                }`}
              >
                <Icon size={20} />
                <span className="text-[10px] font-semibold mt-0.5">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
