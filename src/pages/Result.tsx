/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Printer,
  RotateCcw,
  Edit3,
  PlusCircle,
  TrendingUp,
  TrendingDown,
  Shield,
  School,
  Calendar,
} from 'lucide-react';
import { PredictionResult, LoanApplication } from '../types/loan';
import { PredictionCard } from '../components/PredictionCard';
import { FactorCard } from '../components/FactorCard';

interface ResultProps {
  result: PredictionResult;
  onModify: (app: LoanApplication) => void;
  onNewPrediction: () => void;
}

export const Result: React.FC<ResultProps> = ({
  result,
  onModify,
  onNewPrediction,
}) => {
  const positiveFactors = result.factors.filter((f) => f.impact === 'positive');
  const negativeFactors = result.factors.filter((f) => f.impact === 'negative');

  const handlePrint = () => {
    window.print();
  };

  const { application, metrics } = result;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header with Title and Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 no-print">
        <div>
          <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
            Prediction Output
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Loan Prediction Result
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Generated on {result.calculatedAt} · Applicant: {application.name}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onModify(application)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            title="Return to form and edit values"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Modify Application</span>
          </button>

          <button
            onClick={onNewPrediction}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            title="Reset form for new applicant"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Start New</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            title="Print or save as PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Result</span>
          </button>
        </div>
      </div>

      {/* Print Slip Header (Visible only when printed) */}
      <div className="hidden print-only pb-4 mb-4 border-b border-slate-300">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-black">
              Loan Approval Prediction System
            </h2>
            <p className="text-xs text-slate-700">
              Bachelor of Computer Applications (BCA Minor Project)
            </p>
            <p className="text-xs text-slate-700">
              Khwaja Moinuddin Chishti Language University, Lucknow
            </p>
          </div>
          <div className="text-right text-xs text-slate-600">
            <p>Assessment Date: {result.calculatedAt}</p>
            <p>Applicant Name: {application.name}</p>
            <p>System Status: {result.status}</p>
          </div>
        </div>
      </div>

      {/* Primary Result Card */}
      <PredictionCard result={result} />

      {/* Contributing Factors Analysis */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Key Contributing Decision Factors
            </h3>
            <p className="text-xs text-slate-500">
              Deterministic breakdown of supportive drivers and risk indicators
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Positive Factors */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Positive Factors ({positiveFactors.length})</span>
            </div>
            {positiveFactors.length === 0 ? (
              <p className="text-xs text-slate-500 italic p-4 bg-slate-50 rounded-xl border border-slate-200">
                No significant positive indicators detected.
              </p>
            ) : (
              <div className="space-y-2.5">
                {positiveFactors.map((factor, idx) => (
                  <FactorCard key={idx} factor={factor} />
                ))}
              </div>
            )}
          </div>

          {/* Negative / Limiting Factors */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-800">
              <TrendingDown className="w-4 h-4 text-rose-600" />
              <span>Limiting / Risk Factors ({negativeFactors.length})</span>
            </div>
            {negativeFactors.length === 0 ? (
              <p className="text-xs text-slate-500 italic p-4 bg-slate-50 rounded-xl border border-slate-200">
                No significant negative risk factors identified.
              </p>
            ) : (
              <div className="space-y-2.5">
                {negativeFactors.map((factor, idx) => (
                  <FactorCard key={idx} factor={factor} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Applicant Input Data Audit Summary */}
      <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-4 print-card">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 pb-2 border-b border-slate-100">
          Applicant Profile Summary Records
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-500 block">Applicant Name</span>
            <span className="font-bold text-slate-800">{application.name}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Gender & Status</span>
            <span className="font-semibold text-slate-800">
              {application.gender} · {application.maritalStatus}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block">Dependents</span>
            <span className="font-semibold text-slate-800">{application.dependents}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Education Level</span>
            <span className="font-semibold text-slate-800">{application.education}</span>
          </div>

          <div>
            <span className="text-slate-500 block">Employment Category</span>
            <span className="font-semibold text-slate-800">{application.employmentType}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Applicant Monthly Income</span>
            <span className="font-bold text-slate-800">
              ₹{application.applicantIncome.toLocaleString('en-IN')}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block">Co-Applicant Monthly Income</span>
            <span className="font-semibold text-slate-800">
              ₹{application.coApplicantIncome.toLocaleString('en-IN')}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block">Total Combined Income</span>
            <span className="font-bold text-slate-900">
              ₹{metrics.totalMonthlyIncome.toLocaleString('en-IN')}
            </span>
          </div>

          <div>
            <span className="text-slate-500 block">Loan Principal Requested</span>
            <span className="font-bold text-slate-900">
              ₹{application.loanAmount.toLocaleString('en-IN')}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block">Tenure (Term)</span>
            <span className="font-semibold text-slate-800">
              {application.loanTerm} Months ({Math.round(application.loanTerm / 12)} Years)
            </span>
          </div>
          <div>
            <span className="text-slate-500 block">Credit Repayment Record</span>
            <span
              className={`font-bold ${
                application.creditHistory === 1 ? 'text-emerald-700' : 'text-rose-700'
              }`}
            >
              {application.creditHistory === 1 ? 'Good (1.0)' : 'Poor / Adverse (0.0)'}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block">Property Area</span>
            <span className="font-semibold text-slate-800">{application.propertyArea}</span>
          </div>
        </div>
      </div>

      {/* Academic Viva Context Bar */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-3 no-print">
        <div className="flex items-center gap-2">
          <School className="w-4 h-4 text-slate-500 shrink-0" />
          <span>BCA Minor Project Demonstration · Khwaja Moinuddin Chishti Language University</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onModify(application)}
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            Apply Again
          </button>
          <span aria-hidden="true">·</span>
          <button
            onClick={onNewPrediction}
            className="text-slate-600 hover:text-slate-900 font-medium"
          >
            Clear Application
          </button>
        </div>
      </div>
    </div>
  );
};
