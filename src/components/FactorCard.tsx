/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import { PredictionFactor } from '../types/loan';

interface FactorCardProps {
  factor: PredictionFactor;
}

export const FactorCard: React.FC<FactorCardProps> = ({ factor }) => {
  const isPositive = factor.impact === 'positive';
  const isNegative = factor.impact === 'negative';

  const icon = isPositive ? (
    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
  ) : isNegative ? (
    <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
  ) : (
    <Info className="w-5 h-5 text-blue-600 shrink-0" />
  );

  const borderColor = isPositive
    ? 'border-emerald-200 bg-emerald-50/40'
    : isNegative
    ? 'border-rose-200 bg-rose-50/40'
    : 'border-slate-200 bg-slate-50/50';

  const impactTextColor = isPositive
    ? 'text-emerald-700 font-semibold'
    : isNegative
    ? 'text-rose-700 font-semibold'
    : 'text-slate-600 font-semibold';

  return (
    <div className={`p-4 rounded-xl border ${borderColor} transition-all duration-200`}>
      <div className="flex items-start justify-between gap-3 mb-1.5">
        <div className="flex items-center gap-2">
          {icon}
          <h4 className="text-sm font-bold text-slate-900 leading-snug">
            {factor.name}
          </h4>
        </div>
        <span className={`text-xs ${impactTextColor} capitalize shrink-0`}>
          {factor.impact}
        </span>
      </div>

      <p className="text-xs text-slate-600 leading-relaxed pl-7">
        {factor.description}
      </p>
    </div>
  );
};
