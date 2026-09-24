/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface ConfidenceMeterProps {
  confidence: number; // 0 to 100
  status: 'Approved' | 'Rejected';
  size?: number;
}

export const ConfidenceMeter: React.FC<ConfidenceMeterProps> = ({
  confidence,
  status,
  size = 140,
}) => {
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (confidence / 100) * circumference;

  const isApproved = status === 'Approved';
  const progressColor = isApproved ? 'text-emerald-600' : 'text-rose-600';
  const trackColor = isApproved ? 'text-emerald-100' : 'text-rose-100';

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
        <svg
          className="transform -rotate-90 origin-center"
          width={size}
          height={size}
          aria-hidden="true"
        >
          {/* Background circle track */}
          <circle
            className={trackColor}
            strokeWidth={strokeWidth}
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          {/* Progress circle */}
          <circle
            className={`${progressColor} transition-all duration-1000 ease-out`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 tabular-nums">
            {confidence}%
          </span>
          <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
            Confidence
          </span>
        </div>
      </div>
      <p className="mt-2 text-xs text-slate-600 font-medium text-center">
        Prediction Confidence
      </p>
    </div>
  );
};
