'use client';

import React, { useEffect, useState } from 'react';
import { getAds, logAdClick, logAdImpression, AdCampaign } from '../lib/store';
import { ExternalLink } from 'lucide-react';

interface AdBannerProps {
  placement: 'home_top' | 'calc_inline' | 'saved_bottom' | 'insights_sponsored';
  targetCalculator?: string;
}

export default function AdBanner({ placement, targetCalculator }: AdBannerProps) {
  const [ad, setAd] = useState<AdCampaign | null>(null);

  useEffect(() => {
    const activeAds = getAds().filter((a) => a.active && a.placement === placement);
    let selectedAd: AdCampaign | null = null;

    if (targetCalculator) {
      // Find matching calculator ad first
      selectedAd = activeAds.find((a) => a.targetCalculator === targetCalculator) || null;
    }

    if (!selectedAd && activeAds.length > 0) {
      // Fallback to random ad for this placement
      selectedAd = activeAds[Math.floor(Math.random() * activeAds.length)];
    }

    if (selectedAd) {
      setAd(selectedAd);
      logAdImpression(selectedAd.id);
    }
  }, [placement, targetCalculator]);

  if (!ad) return null;

  const handleClick = () => {
    logAdClick(ad.id);
  };

  return (
    <a
      href={ad.destinationUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="block w-full overflow-hidden transition-all duration-300 transform hover:scale-[1.01]"
    >
      <div className="relative p-4 rounded-xl border border-dashed border-sky-400/40 bg-gradient-to-r from-sky-50 to-indigo-50 dark:from-slate-900/60 dark:to-indigo-950/20 text-slate-800 dark:text-slate-200">
        <span className="absolute top-2 right-2 flex items-center gap-1 text-[10px] font-semibold tracking-wider text-sky-600 dark:text-sky-400 bg-sky-100 dark:bg-sky-950/60 px-1.5 py-0.5 rounded uppercase">
          Sponsored <ExternalLink size={10} />
        </span>
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="flex-1">
            <h4 className="font-semibold text-sm md:text-base pr-12 text-slate-900 dark:text-slate-100">
              {ad.title}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Apply or learn more on our partner website. Terms &amp; conditions apply.
            </p>
          </div>
          <button className="whitespace-nowrap px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white dark:bg-sky-500 dark:hover:bg-sky-400 dark:text-slate-950 font-bold text-xs rounded-lg shadow-sm transition-all duration-200">
            Check Offer
          </button>
        </div>
      </div>
    </a>
  );
}
