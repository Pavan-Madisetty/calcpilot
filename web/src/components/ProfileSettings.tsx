'use client';

import React, { useState, useEffect } from 'react';
import { getProfile, saveProfile, UserProfile, clearAllData } from '../lib/store';
import { Save, CheckCircle2, User, Globe, AlertTriangle, RefreshCw } from 'lucide-react';

export default function ProfileSettings() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  useEffect(() => {
    setProfile(getProfile());
  }, []);

  if (!profile) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveProfile(profile);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to clear all saved calculations, analytics, and custom profile configurations? This action is permanent.')) {
      clearAllData();
      setProfile(getProfile());
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
          User Settings &amp; Preferences
        </h2>
        <p className="text-sm text-muted-foreground">
          Manage your default preferences, preferred currency, and account sync targets.
        </p>
      </div>

      <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">
        <form onSubmit={handleSave} className="space-y-5">
          <div className="flex items-center gap-2 border-b border-border pb-3 mb-2">
            <User className="text-primary" size={18} />
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 uppercase tracking-wide">
              Profile details
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-3 py-1.5 text-sm bg-input border border-border rounded-lg"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Email Address</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-3 py-1.5 text-sm bg-input border border-border rounded-lg"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Country */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Country</label>
              <input
                type="text"
                value={profile.country}
                onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                className="w-full px-3 py-1.5 text-sm bg-input border border-border rounded-lg"
                disabled
              />
            </div>

            {/* Currency */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Preferred Currency</label>
              <select
                value={profile.currency}
                onChange={(e) => setProfile({ ...profile, currency: e.target.value as any })}
                className="w-full px-3 py-1.5 text-sm bg-input border border-border rounded-lg"
              >
                <option value="INR">INR (₹) Indian Rupee</option>
                <option value="USD">USD ($) US Dollar</option>
                <option value="EUR">EUR (€) Euro</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2 border-b border-border pb-3 pt-4 mb-2">
            <Globe className="text-primary" size={18} />
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 uppercase tracking-wide">
              Calculator Defaults
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Default Loan Type */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Default Loan Category</label>
              <select
                value={profile.defaultLoanType}
                onChange={(e) => setProfile({ ...profile, defaultLoanType: e.target.value as any })}
                className="w-full px-3 py-1.5 text-sm bg-input border border-border rounded-lg"
              >
                <option value="Home">Home Loan</option>
                <option value="Personal">Personal Loan</option>
                <option value="Car">Car Loan</option>
              </select>
            </div>

            {/* Default Tax Regime */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Default Tax Regime</label>
              <select
                value={profile.defaultTaxRegime}
                onChange={(e) => setProfile({ ...profile, defaultTaxRegime: e.target.value as any })}
                className="w-full px-3 py-1.5 text-sm bg-input border border-border rounded-lg"
              >
                <option value="Old">Old Tax Regime</option>
                <option value="New">New Tax Regime</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex justify-between items-center gap-4">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 text-xs border border-red-500/20 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 font-bold rounded-xl transition cursor-pointer"
            >
              <RefreshCw size={14} /> {resetSuccess ? 'Data Reset!' : 'Reset Data'}
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 text-sm bg-sky-600 hover:bg-sky-500 text-white dark:bg-sky-500 dark:hover:bg-sky-400 dark:text-slate-950 font-bold rounded-xl shadow-md transition cursor-pointer"
            >
              {savedSuccess ? (
                <>
                  <CheckCircle2 size={16} /> Saved!
                </>
              ) : (
                <>
                  <Save size={16} /> Save Settings
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="p-4 bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 rounded-2xl flex gap-3 text-xs">
        <AlertTriangle className="shrink-0" />
        <div>
          <span className="font-bold">Privacy &amp; Security Note</span>
          <p className="opacity-90 mt-0.5">
            CalcPilot does not collect or transmit your financial inputs to external servers. All calculations and personal profiles are encrypted and persisted locally within your browser/device database for GDPR and DPDP compliance.
          </p>
        </div>
      </div>
    </div>
  );
}
