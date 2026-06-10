'use client';

import React, { useState, useEffect } from 'react';
import Dashboard from '../components/Dashboard';
import PublicLayout from '../components/PublicLayout';
import * as gtag from '../lib/gtag';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const query = params.get('search');
      if (query) {
        setSearchQuery(query);
      }
    }
  }, []);

  useEffect(() => {
    gtag.pageview('/home');
    gtag.event({
      action: 'view_dashboard',
      category: 'navigation',
      label: 'Home Dashboard',
    });
  }, []);

  return (
    <PublicLayout searchQuery={searchQuery} onSearchChange={setSearchQuery}>
      <Dashboard
        onSelectCalculator={() => {}}
        searchQuery={searchQuery}
      />
    </PublicLayout>
  );
}
