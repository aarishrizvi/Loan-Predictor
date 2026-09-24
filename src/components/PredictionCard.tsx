/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CheckCircle2, AlertCircle, IndianRupee, Clock, Wallet, Percent } from 'lucide-react';
import { PredictionResult } from '../types/loan';
import { ConfidenceMeter } from './ConfidenceMeter';
import { SCORING_THRESHOLD } from '../data/loanRules';

interface PredictionCardProps {
  result: PredictionResult;
}

export const PredictionCard: React.FC<PredictionCardProps> = ({ result }) => {
  const isApproved = result.status === 'Approved';

  return (
    <div
      className={`rounded-2xl border p-6 sm:p-8 transition-all print-card ${
        isApproved
          ? 'bg-gradient-to-b from-emerald-50/80 to-white border-emerald-200 shadow-sm'
          : 'bg-gradient-to-b from-rose-50/80 to-white border-rose-200 shadow-sm'
      }`}
    >
      {/* Top Banner Status */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-4 text-center md:text-left">
          <div
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-xs ${
              isApproved ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
            }`}
          >
            {isApproved ? (
              <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
            ) : (
              <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10" />
            )}
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              Indicative Prediction Result
            </div>
            <h2
              className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                isApproved ? 'text-emerald-950' : 'text-rose-950'
              }`}
            >
              {isApproved ? 'LOAN LIKELY APPROVED' : 'LOAN LIKELY REJECTED'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-lg">
              {isApproved
                ? 'Applicant satisfies essential credit and financial affordability criteria for indicative loan eligibility.'
                : 'Application does not currently meet benchmark risk or affordability thresholds for indicative approval.'}
            </p>
          </div>
        </div>

        {/* Circular Confidence Meter */}
        <div className="shrink-0 bg-white/80 p-3 rounded-xl border border-slate-200">
          <ConfidenceMeter confidence={result.confidence} status={result.status} size={130} />
        </div>
      </div>

      {/* Score Bar Section */}
      <div className="py-6 border-b border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Eligibility Score
          </span>
          <span className="text-lg font-extrabold text-slate-900 tabular-nums">
            {result.score} <span className="text-xs font-semibold text-slate-600">/ 100</span>
          </span>
        </div>

        {/* Interactive Visual Score Progress Track */}
        <div className="relative w-full h-4 bg-slate-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-1000 ease-out rounded-full ${
              isApproved ? 'bg-emerald-600' : 'bg-rose-600'
            }`}
            style={{ width: `${result.score}%` }}
          />
        </div>

        {/* Scale labels & Benchmark marker */}
        <div className="relative flex justify-between text-[11px] font-medium text-slate-600 mt-2">
          <span>0 (High Risk)</span>
          <span className="text-slate-600 font-semibold">
            Approval Benchmark: {SCORING_THRESHOLD} pts
          </span>
          <span>100 (Prime)</span>
        </div>
      </div>

      {/* Summary Narrative */}
      <div className="py-5 border-b border-slate-200">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
          Predictive Assessment Summary
        </h4>
        <p className="text-sm text-slate-700 leading-relaxed bg-white/70 p-4 rounded-xl border border-slate-200">
          {result.summary}
        </p>
      </div>

      {/* Financial Metrics Summary Grid */}
      <div className="pt-6">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
          Key Calculated Application Metrics
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-1">
              <Wallet className="w-3.5 h-3.5" />
              <span>Total Income</span>
            </div>
            <div className="text-base font-bold text-slate-900 tabular-nums">
              ₹{result.metrics.totalMonthlyIncome.toLocaleString('en-IN')}
              <span className="text-[11px] font-normal text-slate-600 block">/ month</span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-1">
              <IndianRupee className="w-3.5 h-3.5" />
              <span>Estimated EMI</span>
            </div>
            <div className="text-base font-bold text-slate-900 tabular-nums">
              ₹{result.metrics.estimatedMonthlyEMI.toLocaleString('en-IN')}
              <span className="text-[11px] font-normal text-slate-600 block">@ 9.0% p.a.</span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-1">
              <Percent className="w-3.5 h-3.5" />
              <span>EMI-to-Income</span>
            </div>
            <div
              className={`text-base font-bold tabular-nums ${
                result.metrics.emiToIncomeRatio <= 40 ? 'text-emerald-700' : 'text-amber-700'
              }`}
            >
              {result.metrics.emiToIncomeRatio}%
              <span className="text-[11px] font-normal text-slate-600 block">
                {result.metrics.emiToIncomeRatio <= 40 ? 'Healthy DTI' : 'Stretched DTI'}
              </span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Tenure / Amount</span>
            </div>
            <div className="text-base font-bold text-slate-900 tabular-nums">
              ₹{(result.application.loanAmount / 100000).toFixed(1)} Lakh
              <span className="text-[11px] font-normal text-slate-600 block">
                {result.application.loanTerm} Months ({Math.round(result.application.loanTerm / 12)} Yrs)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
