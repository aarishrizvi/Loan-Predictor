/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  ShieldCheck,
  ArrowRight,
  FileCheck2,
  Cpu,
  BarChart3,
  CheckCircle,
  HelpCircle,
  Sparkles,
  School,
  Lock,
} from 'lucide-react';
import { SAMPLE_PROFILES } from '../data/loanRules';
import { LoanApplication } from '../types/loan';

interface HomeProps {
  onNavigate: (tab: 'apply' | 'analysis' | 'about') => void;
  onSelectSample: (sample: LoanApplication) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate, onSelectSample }) => {
  return (
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-12">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold mb-6 border border-blue-200">
          <School className="w-3.5 h-3.5" />
          <span>BCA Minor Project · Khwaja Moinuddin Chishti Language University</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15] text-balance mb-6">
          Loan Approval Prediction System
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
          Get an instant, data-driven estimate of your loan approval eligibility.
        </p>

        <p className="text-sm text-slate-500 max-w-xl mx-auto mb-10 leading-relaxed">
          The application analyzes applicant demographic, financial, credit, and property information using a local deterministic scoring engine modeled on academic loan prediction patterns.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onNavigate('apply')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <span>Check Eligibility</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="#how-it-works"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm border border-slate-300 shadow-2xs transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <span>How It Works</span>
            <HelpCircle className="w-4 h-4 text-slate-400" />
          </a>
        </div>

        {/* Academic Disclaimer */}
        <div className="mt-10 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 max-w-2xl mx-auto flex items-start gap-2.5 text-left">
          <Lock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <span className="font-semibold text-slate-700">Academic Notice: </span>
            This system provides an academic, indicative prediction and does not represent an actual bank loan approval decision.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
            System Workflow
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How The Prediction Engine Operates
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            A transparent four-phase evaluation pipeline executing entirely on the client browser.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Step 1 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm mb-4">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Enter Details
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                The applicant provides personal, financial, employment, and property information across structured sections.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
              <FileCheck2 className="w-3.5 h-3.5 text-blue-500" />
              <span>12 Primary Inputs</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm mb-4">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Validate
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                The validation engine checks whether required fields contain valid values, preventing invalid mathematical states.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
              <span>Range & Type Checks</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm mb-4">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Analyze
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                The local prediction engine evaluates applicant data using weighted scoring rules derived from Kaggle loan datasets.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
              <Cpu className="w-3.5 h-3.5 text-blue-500" />
              <span>Deterministic Weights</span>
            </div>
          </div>

          {/* Step 4 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm mb-4">
                04
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Get Result
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                The system displays the predicted status, confidence score, total eligibility points, and granular contributing factors.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
              <BarChart3 className="w-3.5 h-3.5 text-blue-500" />
              <span>Score & Explanations</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Demo Evaluation Profiles for Viva / Examiners */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 text-white shadow-md">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Academic Viva & Evaluation Tool</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                Try Pre-Configured Applicant Profiles
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
                Quickly load realistic applicant scenarios into the prediction engine to test different scoring outcomes during project demonstration.
              </p>
            </div>
            <button
              onClick={() => onNavigate('apply')}
              className="text-xs font-semibold px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors whitespace-nowrap"
            >
              Open Blank Application
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SAMPLE_PROFILES.map((sample) => (
              <div
                key={sample.id}
                className="p-4 rounded-xl bg-slate-800/90 border border-slate-700 hover:border-slate-500 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-400">
                      Scenario
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                        sample.expectedOutcome === 'Approved'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : 'bg-rose-950 text-rose-400 border border-rose-800'
                      }`}
                    >
                      {sample.expectedOutcome}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-2">
                    {sample.title}
                  </h4>
                  <div className="space-y-1 text-xs text-slate-400">
                    <p>Applicant: {sample.data.name}</p>
                    <p>Income: ₹{sample.data.applicantIncome.toLocaleString('en-IN')}/mo</p>
                    <p>Loan: ₹{(sample.data.loanAmount / 100000).toFixed(1)} Lakh ({sample.data.loanTerm} mos)</p>
                    <p>Credit Record: {sample.data.creditHistory === 1 ? 'Good (1)' : 'Adverse (0)'}</p>
                  </div>
                </div>

                <button
                  onClick={() => onSelectSample(sample.data)}
                  className="mt-4 w-full py-2 px-3 text-xs font-semibold rounded-lg bg-slate-700 hover:bg-blue-600 text-white transition-colors text-center"
                >
                  Load & Test This Profile
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytical Foundation Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xs">
          <div className="space-y-2 max-w-2xl">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              Curious About The Machine Learning Methodology?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Explore how Python-based exploratory data analysis (EDA), missing value imputation, and classification algorithms (Logistic Regression, Decision Trees, Random Forest) informed the web scoring logic.
            </p>
          </div>
          <button
            onClick={() => onNavigate('analysis')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 hover:border-slate-400 bg-white text-slate-800 font-semibold text-xs transition-colors shrink-0 shadow-2xs"
          >
            <span>Explore ML Models</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
};
