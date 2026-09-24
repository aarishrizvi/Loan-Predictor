/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { User, Briefcase, IndianRupee, ShieldCheck } from 'lucide-react';

interface ProgressIndicatorProps {
  currentSection: number; // 1 to 4
  onSelectSection?: (section: number) => void;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentSection,
  onSelectSection,
}) => {
  const steps = [
    { number: 1, label: 'Personal', icon: User },
    { number: 2, label: 'Education & Work', icon: Briefcase },
    { number: 3, label: 'Financials', icon: IndianRupee },
    { number: 4, label: 'Credit & Property', icon: ShieldCheck },
  ];

  return (
    <div className="w-full py-4 px-2 sm:px-6 bg-white border border-slate-200 rounded-xl shadow-xs mb-8">
      <div className="grid grid-cols-4 gap-2 sm:gap-4 relative">
        {steps.map((step) => {
          const Icon = step.icon;
          const isCompleted = currentSection > step.number;
          const isCurrent = currentSection === step.number;

          return (
            <button
              key={step.number}
              type="button"
              onClick={() => onSelectSection && onSelectSection(step.number)}
              disabled={!onSelectSection}
              className={`flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left transition-colors ${
                onSelectSection ? 'cursor-pointer' : 'cursor-default'
              }`}
            >
              <div
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center text-xs font-bold transition-all shrink-0 ${
                  isCurrent
                    ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-200'
                    : isCompleted
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-500 border border-slate-200'
                }`}
              >
                {isCompleted ? '✓' : <Icon className="w-4 h-4" />}
              </div>
              <div className="min-w-0">
                <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                  Step 0{step.number}
                </span>
                <span
                  className={`block text-xs sm:text-sm font-semibold truncate ${
                    isCurrent
                      ? 'text-blue-600'
                      : isCompleted
                      ? 'text-slate-800'
                      : 'text-slate-600'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
