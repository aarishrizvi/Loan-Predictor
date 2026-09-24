/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AlertCircle } from 'lucide-react';

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  prefix?: string;
  suffix?: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  error,
  helperText,
  required,
  prefix,
  suffix,
  children,
}) => {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="block text-sm font-semibold text-slate-800">
          {label} {required && <span className="text-red-500 font-bold" aria-hidden="true">*</span>}
        </label>
        {helperText && !error && (
          <span className="text-xs text-slate-500 hidden sm:inline-block">
            {helperText}
          </span>
        )}
      </div>

      <div className="relative rounded-md shadow-xs flex items-center">
        {prefix && (
          <span className="absolute left-3 text-slate-500 font-medium text-sm pointer-events-none select-none">
            {prefix}
          </span>
        )}
        <div className={`w-full ${prefix ? 'pl-7' : ''} ${suffix ? 'pr-16' : ''}`}>
          {children}
        </div>
        {suffix && (
          <span className="absolute right-3 text-slate-500 text-xs font-medium pointer-events-none select-none">
            {suffix}
          </span>
        )}
      </div>

      {helperText && !error && (
        <p className="text-xs text-slate-500 sm:hidden">{helperText}</p>
      )}

      {error && (
        <div className="flex items-center gap-1.5 text-xs text-red-600 mt-1" role="alert">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
