/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldCheck, Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'apply' | 'result' | 'analysis' | 'about';
  onNavigate: (tab: 'home' | 'apply' | 'analysis' | 'about') => void;
  hasResult?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onNavigate, hasResult }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (tab: 'home' | 'apply' | 'analysis' | 'about') => {
    onNavigate(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNav('home')}
              className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md"
            >
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm group-hover:bg-blue-700 transition-colors">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                  LoanPredict
                </span>
                <span className="text-[11px] font-medium text-slate-500 hidden sm:block">
                  Loan Approval Prediction System
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-sm font-medium text-slate-600">
            <button
              onClick={() => handleNav('home')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'home'
                  ? 'text-blue-600 font-semibold bg-blue-50/70'
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNav('apply')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'apply'
                  ? 'text-blue-600 font-semibold bg-blue-50/70'
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Check Eligibility
            </button>
            <button
              onClick={() => {
                handleNav('home');
                setTimeout(() => {
                  const el = document.getElementById('how-it-works');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="px-3 py-1.5 rounded-md hover:text-slate-900 hover:bg-slate-50 transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => handleNav('analysis')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'analysis'
                  ? 'text-blue-600 font-semibold bg-blue-50/70'
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Analysis & Models
            </button>
            <button
              onClick={() => handleNav('about')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'about'
                  ? 'text-blue-600 font-semibold bg-blue-50/70'
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              About Project
            </button>
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="hidden sm:flex items-center gap-3">
            {hasResult && activeTab !== 'result' && (
              <button
                onClick={() => onNavigate('apply')}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 transition-colors"
              >
                Previous Application
              </button>
            )}
            <button
              onClick={() => handleNav('apply')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 whitespace-nowrap"
            >
              <span>Check Eligibility</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex sm:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-2">
          <button
            onClick={() => handleNav('home')}
            className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Home
          </button>
          <button
            onClick={() => handleNav('apply')}
            className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Check Eligibility (Apply Form)
          </button>
          <button
            onClick={() => {
              handleNav('home');
              setTimeout(() => {
                const el = document.getElementById('how-it-works');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            How It Works
          </button>
          <button
            onClick={() => handleNav('analysis')}
            className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Analysis & ML Methodology
          </button>
          <button
            onClick={() => handleNav('about')}
            className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            About / Academic Info
          </button>
          <div className="pt-2">
            <button
              onClick={() => handleNav('apply')}
              className="w-full text-center py-2 px-4 rounded-lg bg-blue-600 text-white font-semibold text-sm shadow-sm hover:bg-blue-700"
            >
              Start Application
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
