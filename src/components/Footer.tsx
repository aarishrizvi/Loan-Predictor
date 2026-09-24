/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldAlert, BookOpen } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: 'home' | 'apply' | 'analysis' | 'about') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: System Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-blue-600 flex items-center justify-center text-white">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="text-white font-bold text-base tracking-tight">
                Loan Approval Prediction System
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              A computer science academic minor project developed for the Bachelor of Computer Applications (BCA) curriculum, illustrating local deterministic rule-based evaluation modeled after machine learning classification concepts.
            </p>
            <div className="pt-1 text-xs text-slate-400">
              <span className="font-semibold text-slate-300">Department of Computer Science & Information Technology</span>
              <p>Khwaja Moinuddin Chishti Language University, Lucknow</p>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Application Modules
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => {
                    onNavigate('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Home / Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('apply');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Eligibility Application
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('analysis');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Analysis & ML Models
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Academic Details & Viva Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic Compliance */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Academic Framework
            </h4>
            <div className="space-y-2 text-xs text-slate-400 leading-relaxed">
              <p>
                <strong className="text-slate-300">Project Type:</strong> BCA Minor Project
              </p>
              <p>
                <strong className="text-slate-300">Engine:</strong> Deterministic Scoring Rules (TypeScript)
              </p>
              <p>
                <strong className="text-slate-300">Analytical Basis:</strong> Kaggle Loan Prediction Dataset
              </p>
              <p>
                <strong className="text-slate-300">Data Architecture:</strong> Zero-Backend Client SPA
              </p>
            </div>
          </div>
        </div>

        {/* Academic Disclaimer Callout */}
        <div className="p-4 rounded-lg bg-slate-800/80 border border-slate-700/80 mb-8 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong className="text-amber-300 font-semibold">Academic Disclaimer: </strong>
            This web application provides an academic, indicative prediction for educational and demonstration purposes. It does not represent an actual banking or financial lending decision and should not be used as official credit advice.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© {new Date().getFullYear()} Loan Approval Prediction System · BCA Minor Project</p>
          <p className="flex items-center gap-2">
            <span>Built with React + TypeScript</span>
            <span aria-hidden="true">·</span>
            <span>Khwaja Moinuddin Chishti Language University</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
