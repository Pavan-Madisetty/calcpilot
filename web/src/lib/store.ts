'use client';

// Client-side local storage store for saved calculations, user profile, analytics, and ad configurations

export interface SavedCalculation {
  id: string;
  name: string;
  type: 'emi' | 'sip' | 'loan_eligibility' | 'tax' | 'cc_rewards' | 'construction' | 'tiles';
  timestamp: string;
  inputs: any;
  outputs: any;
}

export interface UserProfile {
  name: string;
  email: string;
  country: string;
  currency: 'INR' | 'USD' | 'EUR';
  defaultLoanType: 'Home' | 'Personal' | 'Car';
  defaultTaxRegime: 'Old' | 'New';
  preferredCards: string[];
}

export interface AdCampaign {
  id: string;
  title: string;
  imageUrl?: string;
  destinationUrl: string;
  htmlCode?: string;
  placement: 'home_top' | 'calc_inline' | 'saved_bottom' | 'insights_sponsored';
  targetCalculator?: string;
  targetCountry?: string;
  active: boolean;
  clicks: number;
  impressions: number;
}

export interface AnalyticsLog {
  id: string;
  calculatorType: string;
  timestamp: string;
  durationSeconds: number;
}

// Initial defaults
const DEFAULT_PROFILE: UserProfile = {
  name: 'Guest User',
  email: 'guest@zeroemi.in',
  country: 'India',
  currency: 'INR',
  defaultLoanType: 'Home',
  defaultTaxRegime: 'New',
  preferredCards: ['hdfc_infinia', 'axis_atlas'],
};

const DEFAULT_ADS: AdCampaign[] = [
  {
    id: 'ad-1',
    title: 'Axis Atlas Credit Card - Get 5,000 Welcome Miles!',
    destinationUrl: 'https://www.axisbank.com',
    placement: 'home_top',
    active: true,
    clicks: 142,
    impressions: 4850,
  },
  {
    id: 'ad-2',
    title: 'HDFC Home Loans - Interest rates starting at 8.35% p.a.',
    destinationUrl: 'https://www.hdfcbank.com',
    placement: 'calc_inline',
    targetCalculator: 'emi',
    active: true,
    clicks: 98,
    impressions: 3200,
  },
  {
    id: 'ad-3',
    title: 'Groww Mutual Funds - Start your SIP with just ₹100',
    destinationUrl: 'https://groww.in',
    placement: 'insights_sponsored',
    targetCalculator: 'sip',
    active: true,
    clicks: 254,
    impressions: 5120,
  },
];

export function getProfile(): UserProfile {
  if (typeof window === 'undefined') return DEFAULT_PROFILE;
  const data = localStorage.getItem('zeroemi-profile');
  return data ? JSON.parse(data) : DEFAULT_PROFILE;
}

export function saveProfile(profile: UserProfile): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('zeroemi-profile', JSON.stringify(profile));
}

export function getSavedCalculations(): SavedCalculation[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem('zeroemi-saved');
  return data ? JSON.parse(data) : [];
}

export function saveCalculation(calc: Omit<SavedCalculation, 'id' | 'timestamp'>): SavedCalculation {
  const list = getSavedCalculations();
  const newCalc: SavedCalculation = {
    ...calc,
    id: 'calc-' + Math.random().toString(36).substring(2, 11),
    timestamp: new Date().toISOString(),
  };
  list.unshift(newCalc);
  localStorage.setItem('zeroemi-saved', JSON.stringify(list));
  
  // Log analytics event
  logAnalytics(calc.type);
  return newCalc;
}

export function deleteSavedCalculation(id: string): void {
  const list = getSavedCalculations();
  const filtered = list.filter((item) => item.id !== id);
  localStorage.setItem('zeroemi-saved', JSON.stringify(filtered));
}

export function renameSavedCalculation(id: string, newName: string): void {
  const list = getSavedCalculations();
  const updated = list.map((item) => {
    if (item.id === id) {
      return { ...item, name: newName };
    }
    return item;
  });
  localStorage.setItem('zeroemi-saved', JSON.stringify(updated));
}

export function getAds(): AdCampaign[] {
  if (typeof window === 'undefined') return DEFAULT_ADS;
  const data = localStorage.getItem('zeroemi-ads');
  return data ? JSON.parse(data) : DEFAULT_ADS;
}

export function saveAds(ads: AdCampaign[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('zeroemi-ads', JSON.stringify(ads));
}

export function logAdClick(adId: string): void {
  const ads = getAds();
  const updated = ads.map((ad) => {
    if (ad.id === adId) {
      return { ...ad, clicks: ad.clicks + 1 };
    }
    return ad;
  });
  saveAds(updated);
}

export function logAdImpression(adId: string): void {
  const ads = getAds();
  const updated = ads.map((ad) => {
    if (ad.id === adId) {
      return { ...ad, impressions: ad.impressions + 1 };
    }
    return ad;
  });
  saveAds(updated);
}

export function getAnalytics(): AnalyticsLog[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem('zeroemi-analytics');
  return data ? JSON.parse(data) : [];
}

export function logAnalytics(calculatorType: string): void {
  if (typeof window === 'undefined') return;
  const logs = getAnalytics();
  const newLog: AnalyticsLog = {
    id: 'log-' + Math.random().toString(36).substring(2, 11),
    calculatorType,
    timestamp: new Date().toISOString(),
    durationSeconds: Math.floor(Math.random() * 120) + 30, // simulated session duration
  };
  logs.push(newLog);
  localStorage.setItem('zeroemi-analytics', JSON.stringify(logs));
}

export function clearAllData(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('zeroemi-profile');
  localStorage.removeItem('zeroemi-saved');
  localStorage.removeItem('zeroemi-ads');
  localStorage.removeItem('zeroemi-analytics');
}
