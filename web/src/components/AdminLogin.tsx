'use client';

import React, { useState, useEffect } from 'react';
import { ShieldAlert, KeyRound, Mail, ArrowLeft, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

type AuthState = 'signin' | 'forgot' | 'reset';

export default function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [state, setState] = useState<AuthState>('signin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Forgot / Reset states
  const [email, setEmail] = useState('');
  const [recoveryCodeInput, setRecoveryCodeInput] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notifMsg, setNotifMsg] = useState('');

  // Fixed defaults
  const DEFAULT_USERNAME = 'Pavan.madisetty';
  const DEFAULT_PASSWORD = 'Kony@1234';

  useEffect(() => {
    // Initialize default password in local storage if not already there
    if (typeof window !== 'undefined' && !localStorage.getItem('zeroemi-admin-pass')) {
      localStorage.setItem('zeroemi-admin-pass', DEFAULT_PASSWORD);
    }
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (typeof window === 'undefined') return;

    const savedPass = localStorage.getItem('zeroemi-admin-pass') || DEFAULT_PASSWORD;

    // Validate case-insensitively or matching EXACT username case
    if (username.toLowerCase() === DEFAULT_USERNAME.toLowerCase() && password === savedPass) {
      onLoginSuccess();
    } else {
      setErrorMsg('Invalid username or password credentials. Please try again.');
    }
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim()) return;

    // Simulate sending recovery code '123456'
    setNotifMsg(`Verification recovery code '123456' dispatched to: ${email}`);
    setTimeout(() => {
      setNotifMsg('');
      setState('reset');
    }, 3000);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (recoveryCodeInput !== '123456') {
      setErrorMsg('Invalid recovery verification code. Try using: 123456');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match. Verify your inputs.');
      return;
    }

    if (newPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem('zeroemi-admin-pass', newPassword);
      setNotifMsg('Password reset successfully! Redirecting to sign in...');
      
      setTimeout(() => {
        setNotifMsg('');
        setUsername(DEFAULT_USERNAME);
        setPassword('');
        setState('signin');
      }, 2000);
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 bg-white border border-slate-200 p-8 rounded-3xl shadow-lg relative overflow-hidden">
      {/* Visual Accent */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-500 to-indigo-600" />

      {/* 1. SIGN IN SCREEN */}
      {state === 'signin' && (
        <form onSubmit={handleLoginSubmit} className="space-y-6">
          <div className="text-center space-y-2">
            <div className="h-12 w-12 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              <KeyRound size={22} />
            </div>
            <h2 className="text-xl font-bold font-display text-slate-800">Admin Authentication Gateway</h2>
            <p className="text-xs text-muted-foreground">
              Sign in to manage ad placements, metrics, and configurations.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 text-xs bg-red-50 border border-red-200 text-red-600 rounded-xl flex items-center gap-2">
              <ShieldAlert size={14} className="shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="space-y-4">
            {/* Username */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600">Username</label>
              <input
                type="text"
                placeholder="e.g. Pavan.madisetty"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-600">Password</label>
                <button
                  type="button"
                  onClick={() => setState('forgot')}
                  className="text-[10px] font-bold text-sky-600 hover:text-sky-500"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer"
          >
            Authenticate Access
          </button>
        </form>
      )}

      {/* 2. FORGOT PASSWORD SCREEN */}
      {state === 'forgot' && (
        <form onSubmit={handleForgotPassword} className="space-y-6">
          <div className="text-center space-y-2">
            <div className="h-12 w-12 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              <Mail size={22} />
            </div>
            <h2 className="text-xl font-bold font-display text-slate-800">Recover Password</h2>
            <p className="text-xs text-muted-foreground">
              Enter your email to receive a recovery code verification trigger.
            </p>
          </div>

          {notifMsg && (
            <div className="p-3 text-xs bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-xl flex items-center gap-2">
              <CheckCircle2 size={14} className="shrink-0" />
              <span>{notifMsg}</span>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600">Email Address</label>
            <input
              type="email"
              placeholder="pavan.madisetty@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
              required
            />
          </div>

          <div className="flex flex-col gap-2 pt-1">
            <button
              type="submit"
              className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm rounded-xl shadow-sm cursor-pointer"
            >
              Dispatch Recovery Code
            </button>
            <button
              type="button"
              onClick={() => setState('signin')}
              className="flex items-center justify-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-700 py-1"
            >
              <ArrowLeft size={12} /> Back to login
            </button>
          </div>
        </form>
      )}

      {/* 3. RESET PASSWORD SCREEN */}
      {state === 'reset' && (
        <form onSubmit={handleResetPassword} className="space-y-6">
          <div className="text-center space-y-2">
            <div className="h-12 w-12 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              <KeyRound size={22} />
            </div>
            <h2 className="text-xl font-bold font-display text-slate-800">Reset Credentials</h2>
            <p className="text-xs text-muted-foreground">
              Verify the code sent to your inbox and establish your new secure password.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 text-xs bg-red-50 border border-red-200 text-red-600 rounded-xl flex items-center gap-2">
              <ShieldAlert size={14} className="shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {notifMsg && (
            <div className="p-3 text-xs bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-xl flex items-center gap-2">
              <CheckCircle2 size={14} className="shrink-0" />
              <span>{notifMsg}</span>
            </div>
          )}

          <div className="space-y-4">
            {/* Code */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600">Recovery Verification Code</label>
              <input
                type="text"
                placeholder="Hint: 123456"
                value={recoveryCodeInput}
                onChange={(e) => setRecoveryCodeInput(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-center font-bold tracking-widest focus:outline-none"
                required
              />
            </div>

            {/* New Password */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600">New Password</label>
              <input
                type="password"
                placeholder="Min 6 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl"
                required
              />
            </div>

            {/* Confirm New Password */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600">Confirm New Password</label>
              <input
                type="password"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="submit"
              className="w-full py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold text-sm rounded-xl shadow-md cursor-pointer"
            >
              Update Password
            </button>
            <button
              type="button"
              onClick={() => setState('signin')}
              className="flex items-center justify-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-700 py-1"
            >
              <ArrowLeft size={12} /> Back to login
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
