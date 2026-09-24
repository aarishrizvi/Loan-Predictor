/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  GraduationCap,
  School,
  User,
  BookOpen,
  Code2,
  CheckCircle,
  HelpCircle,
  Shield,
  Layers,
  Sparkles,
} from 'lucide-react';

export const About: React.FC = () => {
  const [studentName, setStudentName] = useState<string>('Arish Rizvi');
  const [isEditingName, setIsEditingName] = useState<boolean>(false);

  const vivaQuestions = [
    {
      q: 'Why is Credit History given the highest weight in the scoring algorithm?',
      a: 'Historical banking data (such as the Kaggle Loan Prediction Dataset) proves that borrowers with a clean credit repayment track record have over 79% likelihood of timely repayment, whereas adverse credit histories correlate with over 90% default rates. It is the primary discriminator in both Logistic Regression coefficients and Decision Tree root splits.',
    },
    {
      q: 'How does the application ensure fairness and non-discrimination?',
      a: 'Sensitive demographic attributes such as Gender and Marital Status are assigned exactly 0 weight points in the prediction engine. Scoring decisions are strictly anchored to financial capacity, credit history, repayment obligations, and collateral stability.',
    },
    {
      q: 'How is the "Prediction Confidence" calculated without a live neural network?',
      a: 'Confidence is computed deterministically from the decision boundary distance. When an applicant score lies well beyond the approval benchmark (e.g. 88/100, where benchmark is 60), confidence is high (~90%). When the score is adjacent to the boundary (e.g. 58/100 or 62/100), confidence is lower (~60%), transparently reflecting decision certainty.',
    },
    {
      q: 'Why use a client-side TypeScript engine instead of a Python Flask/Django backend?',
      a: 'For this minor academic project, client-side evaluation guarantees zero-latency, full offline accessibility, zero hosting costs, and high privacy without storing personal financial information on remote servers. The analytical rules are derived from Python data science exploration.',
    },
    {
      q: 'What is the standard EMI formula implemented in the financial module?',
      a: 'The standard reducing-balance amortization formula: E = P * r * (1 + r)^n / ((1 + r)^n - 1), where P is principal, r is periodic interest rate (9% / 12), and n is tenure in months. This computes the realistic monthly debt service burden.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Title & Introduction */}
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
          <GraduationCap className="w-4 h-4" />
          <span>Academic Information</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          About The Project
        </h1>
        <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
          The Loan Approval Prediction System is an academic BCA Minor Project designed to demonstrate the cohesive integration of frontend modern web development, statistical exploratory data analysis, and rule-based prediction engines.
        </p>
      </div>

      {/* Project Meta Card */}
      <div className="p-6 sm:p-8 bg-white border border-slate-200 rounded-2xl shadow-xs">
        <h2 className="text-base font-bold text-slate-900 pb-3 mb-4 border-b border-slate-100 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-blue-600" />
          <span>Academic Synopsis & Project Credentials</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="space-y-4">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Project Title
              </span>
              <span className="text-base font-bold text-slate-900">
                Loan Approval Prediction System
              </span>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Academic Program / Degree
              </span>
              <span className="font-semibold text-slate-800">
                Bachelor of Computer Applications (BCA) · Minor Project
              </span>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                University / Institution
              </span>
              <span className="font-semibold text-slate-800">
                Khwaja Moinuddin Chishti Language University, Lucknow
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                  Student Developer
                </span>
                <button
                  type="button"
                  onClick={() => setIsEditingName(!isEditingName)}
                  className="text-[11px] text-blue-600 hover:text-blue-800 font-medium"
                >
                  {isEditingName ? 'Done' : 'Change Name'}
                </button>
              </div>

              {isEditingName ? (
                <div className="mt-1 flex gap-2">
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Enter your student name"
                    className="px-2.5 py-1 text-sm border border-blue-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                  />
                  <button
                    onClick={() => setIsEditingName(false)}
                    className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-md"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <span className="text-base font-bold text-slate-900 block mt-0.5">
                  {studentName || '[Student Name]'}
                </span>
              )}
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Core Technologies
              </span>
              <span className="text-xs text-slate-700 block mt-0.5">
                React 19, TypeScript, Tailwind CSS, Lucide React, Vite, Local Deterministic Scoring Algorithm
              </span>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Analytical Foundation
              </span>
              <span className="text-xs text-slate-700 block mt-0.5">
                Python (Pandas, NumPy, Scikit-learn, Logistic Regression & Random Forest feature importances)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 7 Conceptual Modules of Synopsis */}
      <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-600" />
          <span>The Seven Synopsis Modules</span>
        </h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          As required by the academic syllabus, the project implements the seven core functional modules in a unified single-page architecture:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-900 block">01. Home / Landing</span>
            <span className="text-slate-500">Project introduction, visual workflow, and academic notices.</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-900 block">02. Loan Application Form</span>
            <span className="text-slate-500">Structured sections: Personal, Education, Financial, and Property.</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-900 block">03. Input Validation</span>
            <span className="text-slate-500">Type, bounds, and range verification preventing mathematical errors.</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-900 block">04. Prediction Engine</span>
            <span className="text-slate-500">Transparent, deterministic scoring logic (0-100 scale).</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-900 block">05. Result Display</span>
            <span className="text-slate-500">Confidence meter, eligibility score, EMI calculation, and factors.</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-900 block">06. Python Data Analysis</span>
            <span className="text-slate-500">Documentation of exploratory data analysis and ML models.</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 sm:col-span-2 md:col-span-1">
            <span className="font-bold text-slate-900 block">07. About & Viva Guide</span>
            <span className="text-slate-500">Project scope, university affiliation, and viva Q&A notes.</span>
          </div>
        </div>
      </div>

      {/* Academic Viva Q&A Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-bold text-slate-900">
            Viva-Voce Academic Defense Guide
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          Key questions frequently asked by external examiners during BCA project presentation
        </p>

        <div className="space-y-3">
          {vivaQuestions.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2"
            >
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-start gap-2">
                <span className="text-blue-600 font-extrabold shrink-0">Q{idx + 1}.</span>
                <span>{item.q}</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed pl-6">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Limitations & Future Scope */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
            <Shield className="w-4 h-4 text-amber-600" />
            <span>Academic Limitations</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-600 leading-relaxed list-disc list-inside">
            <li>Designed as an academic prototype; does not constitute legal or financial credit underwriting.</li>
            <li>Local deterministic scoring rules emulate model weights without continuous dynamic online gradient updates.</li>
            <li>No remote database storage; application state is stored locally within browser session / localStorage.</li>
          </ul>
        </div>

        <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Future Scope & Extensions</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-600 leading-relaxed list-disc list-inside">
            <li>Integration with Python Flask / FastAPI REST microservice hosting a serialized `.pkl` Scikit-learn model.</li>
            <li>Relational database storage (PostgreSQL) for persistent historical loan records and batch audits.</li>
            <li>Real-time automated credit bureau API integration (CIBIL / Experian score pulls).</li>
            <li>Advanced explainability visualizers (SHAP / LIME values) embedded directly into the frontend.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
