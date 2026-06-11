'use client';

import React, { useState, useEffect } from 'react';
import AdminLogin from '../../components/AdminLogin';
import AdminPortal from '../../components/AdminPortal';
import { LogOut, UserCheck } from 'lucide-react';

export default function AdminPage() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loggedIn = localStorage.getItem('zeroemi-admin-auth') === 'true';
      setIsAdminLoggedIn(loggedIn);
    }
    setMounted(true);
  }, []);

  const handleAdminSuccess = () => {
    setIsAdminLoggedIn(true);
    localStorage.setItem('zeroemi-admin-auth', 'true');
  };

  const handleSignOut = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('zeroemi-admin-auth');
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col">
      {/* Admin header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm h-16 shrink-0">
        <div className="max-w-5xl mx-auto px-4 md:px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-lg text-indigo-600 tracking-tight">
              ZeroEMI Console
            </span>
          </div>

          {isAdminLoggedIn && (
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full uppercase">
                <UserCheck size={10} /> Admin Session
              </span>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 font-bold border border-red-200 rounded-lg transition cursor-pointer"
              >
                <LogOut size={12} /> Exit Console
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main console content */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-6 pb-20 flex flex-col justify-center">
        {isAdminLoggedIn ? (
          <AdminPortal />
        ) : (
          <div className="w-full">
            <AdminLogin onLoginSuccess={handleAdminSuccess} />
          </div>
        )}
      </main>
    </div>
  );
}
