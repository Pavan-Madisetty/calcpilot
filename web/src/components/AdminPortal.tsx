'use client';

import React, { useState, useEffect } from 'react';
import { getAds, saveAds, AdCampaign, getAnalytics } from '../lib/store';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Settings, Image, Plus, Trash2, Megaphone, CheckCircle2, Sliders, LayoutDashboard } from 'lucide-react';

export default function AdminPortal() {
  const [ads, setAds] = useState<AdCampaign[]>([]);
  const [analytics, setAnalytics] = useState<any[]>([]);
  const [calculatorStatus, setCalculatorStatus] = useState<Record<string, boolean>>({
    emi: true,
    sip: true,
    loan_eligibility: true,
    tax: true,
    cc_rewards: true,
    construction: true,
    tiles: true,
  });

  // Form states for new Ad Campaign
  const [newAdTitle, setNewAdTitle] = useState('');
  const [newAdUrl, setNewAdUrl] = useState('https://');
  const [newAdPlacement, setNewAdPlacement] = useState<'home_top' | 'calc_inline' | 'saved_bottom' | 'insights_sponsored'>('home_top');
  const [newAdCalculator, setNewAdCalculator] = useState('emi');
  const [adSavedSuccess, setAdSavedSuccess] = useState(false);

  // Notification center
  const [notifText, setNotifText] = useState('');
  const [notifSuccess, setNotifSuccess] = useState(false);

  useEffect(() => {
    setAds(getAds());
    
    // Simulate analytics records from the clicks/impressions logs
    const activeAds = getAds();
    const chartData = activeAds.map((ad) => ({
      name: ad.title.slice(0, 15) + '...',
      CTR: ad.impressions > 0 ? Number(((ad.clicks / ad.impressions) * 100).toFixed(1)) : 0,
      Impressions: ad.impressions,
    }));
    setAnalytics(chartData);
  }, []);

  const handleToggleAd = (id: string) => {
    const updated = ads.map((ad) => {
      if (ad.id === id) return { ...ad, active: !ad.active };
      return ad;
    });
    setAds(updated);
    saveAds(updated);
  };

  const handleDeleteAd = (id: string) => {
    const updated = ads.filter((ad) => ad.id !== id);
    setAds(updated);
    saveAds(updated);
  };

  const handleAddAd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdTitle.trim()) return;

    const newCampaign: AdCampaign = {
      id: 'ad-' + Math.random().toString(36).substring(2, 9),
      title: newAdTitle,
      destinationUrl: newAdUrl,
      placement: newAdPlacement,
      targetCalculator: newAdCalculator,
      active: true,
      clicks: 0,
      impressions: 0,
    };

    const updated = [newCampaign, ...ads];
    setAds(updated);
    saveAds(updated);

    // Reset form
    setNewAdTitle('');
    setNewAdUrl('https://');
    setAdSavedSuccess(true);
    setTimeout(() => setAdSavedSuccess(false), 3000);
  };

  const handleTriggerNotification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifText.trim()) return;

    // Simulate sending push alert
    setNotifSuccess(true);
    setNotifText('');
    setTimeout(() => setNotifSuccess(false), 3000);
  };

  const toggleCalculator = (key: string) => {
    setCalculatorStatus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
          Admin Control Center
        </h2>
        <p className="text-sm text-muted-foreground">
          Monitor system metrics, coordinate ad campaigns, toggle calculators, and broadcast alerts.
        </p>
      </div>

      {/* Metrics overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-card border border-border rounded-2xl shadow-sm">
          <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
            Total Users
          </span>
          <span className="text-2xl font-extrabold text-slate-800 dark:text-white block mt-1">
            2,482
          </span>
        </div>
        <div className="p-4 bg-card border border-border rounded-2xl shadow-sm">
          <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
            Daily Active (DAU)
          </span>
          <span className="text-2xl font-extrabold text-sky-600 dark:text-sky-400 block mt-1">
            612
          </span>
        </div>
        <div className="p-4 bg-card border border-border rounded-2xl shadow-sm">
          <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
            Est. Ad Revenue
          </span>
          <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 block mt-1">
            ₹12,450
          </span>
        </div>
        <div className="p-4 bg-card border border-border rounded-2xl shadow-sm">
          <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
            Average Ad CTR
          </span>
          <span className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 block mt-1">
            3.2%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Ad Campaign Manager */}
        <div className="lg:col-span-8 bg-card border border-border p-6 rounded-2xl shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-border pb-3">
            <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm md:text-base flex items-center gap-2">
              <Image size={18} className="text-primary" /> Manage Advertisements
            </h3>
            <span className="text-xs text-muted-foreground">{ads.length} active banners</span>
          </div>

          {/* Ad list */}
          <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
            {ads.map((ad) => (
              <div
                key={ad.id}
                className="p-3 border border-border bg-slate-50/50 dark:bg-slate-900/10 rounded-xl flex items-center justify-between gap-4"
              >
                <div className="truncate flex-1">
                  <span className="text-[8px] font-bold uppercase text-sky-600 dark:text-sky-400 bg-sky-100 dark:bg-sky-950/60 px-1.5 py-0.5 rounded">
                    {ad.placement.replace('_', ' ')}
                  </span>
                  <h4 className="font-semibold text-xs text-slate-800 dark:text-slate-100 truncate mt-1">
                    {ad.title}
                  </h4>
                  <span className="text-[10px] text-muted-foreground block">
                    Impressions: {ad.impressions} | Clicks: {ad.clicks} (
                    {ad.impressions > 0 ? ((ad.clicks / ad.impressions) * 100).toFixed(1) : 0}%)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleAd(ad.id)}
                    className={`px-2 py-1 text-[10px] font-bold rounded-lg border cursor-pointer ${
                      ad.active
                        ? 'border-emerald-500/25 bg-emerald-50 text-emerald-600'
                        : 'border-border bg-muted text-muted-foreground'
                    }`}
                  >
                    {ad.active ? 'Active' : 'Paused'}
                  </button>
                  <button
                    onClick={() => handleDeleteAd(ad.id)}
                    className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Ad Campaign */}
          <form onSubmit={handleAddAd} className="p-4 bg-slate-50 dark:bg-slate-900/60 border border-border rounded-xl space-y-4">
            <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Plus size={14} /> Schedule New Ad Campaign
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-slate-600 dark:text-slate-400">Ad Campaign Title</label>
                <input
                  type="text"
                  placeholder="e.g. SBI Home Loans special offer"
                  value={newAdTitle}
                  onChange={(e) => setNewAdTitle(e.target.value)}
                  className="w-full px-2.5 py-1 text-xs bg-input border border-border rounded-lg"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-slate-600 dark:text-slate-400">Destination URL</label>
                <input
                  type="url"
                  value={newAdUrl}
                  onChange={(e) => setNewAdUrl(e.target.value)}
                  className="w-full px-2.5 py-1 text-xs bg-input border border-border rounded-lg"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-slate-600 dark:text-slate-400">Placement Slot</label>
                <select
                  value={newAdPlacement}
                  onChange={(e) => setNewAdPlacement(e.target.value as any)}
                  className="w-full px-2.5 py-1 text-xs bg-input border border-border rounded-lg focus:outline-none"
                >
                  <option value="home_top">Home Header Banner</option>
                  <option value="calc_inline">Calculator Native Inline</option>
                  <option value="saved_bottom">Saved Calculations Bottom</option>
                  <option value="insights_sponsored">Insights Sponsor Content</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-slate-600 dark:text-slate-400">Target Calculator Context</label>
                <select
                  value={newAdCalculator}
                  onChange={(e) => setNewAdCalculator(e.target.value)}
                  className="w-full px-2.5 py-1 text-xs bg-input border border-border rounded-lg focus:outline-none"
                >
                  <option value="emi">EMI Calculator</option>
                  <option value="sip">SIP Calculator</option>
                  <option value="loan_eligibility">Loan Eligibility</option>
                  <option value="tax">Tax Calculator</option>
                  <option value="cc_rewards">Rewards Card Calculator</option>
                  <option value="construction">Construction Cost</option>
                  <option value="tiles">Tiles Calculator</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end pt-1">
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-1.5 text-xs bg-sky-600 text-white font-bold rounded-lg hover:bg-sky-500 cursor-pointer"
              >
                {adSavedSuccess ? <CheckCircle2 size={12} /> : <Plus size={12} />} Schedule Ad
              </button>
            </div>
          </form>
        </div>

        {/* Right Controls */}
        <div className="lg:col-span-4 space-y-6">
          {/* Calculator Controls */}
          <div className="bg-card border border-border p-5 rounded-2xl shadow-sm space-y-4">
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Sliders size={16} className="text-primary" /> Active Utilities
            </h4>
            <div className="space-y-2.5">
              {Object.entries(calculatorStatus).map(([key, val]) => (
                <div key={key} className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 capitalize">
                    {key.replace('_', ' ')}
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={val}
                      onChange={() => toggleCalculator(key)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-border rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-sky-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Broadcast Alert */}
          <div className="bg-card border border-border p-5 rounded-2xl shadow-sm space-y-4">
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Megaphone size={16} className="text-primary" /> Broadcast alert
            </h4>
            <form onSubmit={handleTriggerNotification} className="space-y-3">
              <textarea
                placeholder="Type push message (e.g. Budget 2026 tax slabs updated!)"
                value={notifText}
                onChange={(e) => setNotifText(e.target.value)}
                className="w-full p-2.5 text-xs bg-input border border-border rounded-xl resize-none h-20"
                required
              />
              <button
                type="submit"
                className="w-full py-2 text-xs bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl transition cursor-pointer"
              >
                {notifSuccess ? 'Dispatched Alerts!' : 'Broadcast to Users'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
