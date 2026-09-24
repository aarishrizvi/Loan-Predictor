/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';

interface LoadingStateProps {
  onComplete: () => void;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    'Validating applicant profile and constraints...',
    'Evaluating financial affordability and DTI ratio...',
    'Analyzing credit history and property risk parameters...',
    'Generating eligibility score and prediction confidence...',
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep(1), 300);
    const timer2 = setTimeout(() => setCurrentStep(2), 650);
    const timer3 = setTimeout(() => setCurrentStep(3), 950);
    const timer4 = setTimeout(() => {
      onComplete();
    }, 1300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <div className="min-h-[420px] flex flex-col items-center justify-center p-8 bg-white border border-slate-200 rounded-2xl shadow-xs text-center max-w-lg mx-auto">
      <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center mb-6 text-blue-600">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-2">
        Analyzing Application
      </h3>
      <p className="text-xs text-slate-500 mb-8 max-w-xs">
        Executing deterministic scoring engine based on academic credit assessment rules
      </p>

      <div className="w-full space-y-3 text-left">
        {steps.map((text, idx) => {
          const isDone = currentStep > idx;
          const isCurrent = currentStep === idx;

          return (
            <div
              key={idx}
              className={`flex items-center gap-3 p-3 rounded-lg text-xs font-medium transition-all ${
                isCurrent
                  ? 'bg-blue-50 text-blue-900 border border-blue-200 font-semibold'
                  : isDone
                  ? 'text-emerald-700 bg-emerald-50/60'
                  : 'text-slate-400 bg-slate-50'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : isCurrent ? (
                <Loader2 className="w-4 h-4 text-blue-600 animate-spin shrink-0" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
              )}
              <span>{text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
