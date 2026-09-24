/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  User,
  Briefcase,
  IndianRupee,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Calculator,
} from 'lucide-react';
import {
  LoanApplication,
  Gender,
  MaritalStatus,
  Dependents,
  Education,
  EmploymentType,
  CreditHistory,
  PropertyArea,
  FormValidationErrors,
} from '../types/loan';
import { FormField } from '../components/FormField';
import { ProgressIndicator } from '../components/ProgressIndicator';
import { validateLoanApplication } from '../services/validation';
import { SAMPLE_PROFILES } from '../data/loanRules';

interface ApplyProps {
  initialData?: LoanApplication;
  onSubmit: (data: LoanApplication) => void;
  onClearData: () => void;
}

const defaultFormData: LoanApplication = {
  name: '',
  gender: 'Male',
  maritalStatus: 'Married',
  dependents: '0',
  education: 'Graduate',
  employmentType: 'Salaried',
  applicantIncome: 50000,
  coApplicantIncome: 0,
  loanAmount: 1500000,
  loanTerm: 240,
  creditHistory: 1,
  propertyArea: 'Semiurban',
};

export const Apply: React.FC<ApplyProps> = ({ initialData, onSubmit, onClearData }) => {
  const [formData, setFormData] = useState<LoanApplication>(initialData || defaultFormData);
  const [errors, setErrors] = useState<FormValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleBlur = (field: keyof LoanApplication) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const result = validateLoanApplication(formData);
    setErrors(result.errors);
  };

  const handleChange = <K extends keyof LoanApplication>(field: K, value: LoanApplication[K]) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);

    if (touched[field]) {
      const result = validateLoanApplication(updated);
      setErrors(result.errors);
    }
  };

  const handleApplyPreset = (profile: LoanApplication) => {
    setFormData(profile);
    setErrors({});
    setTouched({});
  };

  const handleReset = () => {
    setFormData({
      name: '',
      gender: 'Male',
      maritalStatus: 'Married',
      dependents: '0',
      education: 'Graduate',
      employmentType: 'Salaried',
      applicantIncome: 0,
      coApplicantIncome: 0,
      loanAmount: 0,
      loanTerm: 240,
      creditHistory: 1,
      propertyArea: 'Semiurban',
    });
    setErrors({});
    setTouched({});
    onClearData();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateLoanApplication(formData);

    if (!result.isValid) {
      setErrors(result.errors);
      // Mark all as touched
      const allTouched: Record<string, boolean> = {};
      Object.keys(formData).forEach((k) => (allTouched[k] = true));
      setTouched(allTouched);

      // Scroll to the first error
      const firstErrorKey = Object.keys(result.errors)[0];
      const el = document.getElementById(firstErrorKey);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.focus();
      }
      return;
    }

    onSubmit(formData);
  };

  // Compute live quick stats for applicant preview
  const totalMonthlyIncome = Number(formData.applicantIncome || 0) + Number(formData.coApplicantIncome || 0);
  const approximateEMI =
    formData.loanAmount && formData.loanTerm
      ? Math.round((Number(formData.loanAmount) * 0.09 * (1 + 0.09 / 12) ** Number(formData.loanTerm)) /
          (12 * ((1 + 0.09 / 12) ** Number(formData.loanTerm) - 1)) || Number(formData.loanAmount) / Number(formData.loanTerm))
      : 0;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Loan Application Form
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Enter applicant information to evaluate approval probability and eligibility score.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
              title="Clear saved inputs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Form</span>
            </button>
          </div>
        </div>

        {/* Quick Demo Pre-fill Toolbar */}
        <div className="mt-4 p-3 rounded-xl bg-blue-50/70 border border-blue-200/80 flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-blue-900 font-semibold shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Load Sample Profile:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_PROFILES.map((sample) => (
              <button
                key={sample.id}
                type="button"
                onClick={() => handleApplyPreset(sample.data)}
                className="px-2.5 py-1 rounded-md bg-white hover:bg-blue-100 text-blue-800 font-medium border border-blue-200 shadow-2xs transition-colors"
              >
                {sample.title.split(' ')[0]} ({sample.expectedOutcome})
              </button>
            ))}
          </div>
        </div>
      </div>

      <ProgressIndicator currentSection={4} />

      <form onSubmit={handleSubmit} noValidate className="space-y-8">
        {/* Section Grid: Desktop 2-column layout (Personal/Work on Left, Financial/Credit on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT COLUMN: Section A & B */}
          <div className="space-y-8">
            {/* Section A: Personal Information */}
            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Section A — Personal Details
                  </h2>
                  <p className="text-xs text-slate-500">
                    Basic applicant demographic information
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Full Name */}
                <FormField
                  id="name"
                  label="Full Name"
                  required
                  error={errors.name}
                  helperText="As printed on government identity records"
                >
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    onBlur={() => handleBlur('name')}
                    placeholder="e.g. Rahul Sharma"
                    className={`w-full px-3 py-2 text-sm rounded-lg border bg-white text-slate-900 transition-colors focus:outline-none focus:ring-2 ${
                      errors.name
                        ? 'border-red-400 focus:ring-red-200'
                        : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
                    }`}
                  />
                </FormField>

                {/* Gender */}
                <FormField
                  id="gender"
                  label="Gender"
                  required
                  error={errors.gender}
                  helperText="Fairness protected: neutral scoring impact"
                >
                  <select
                    id="gender"
                    value={formData.gender}
                    onChange={(e) => handleChange('gender', e.target.value as Gender)}
                    onBlur={() => handleBlur('gender')}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </FormField>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Marital Status */}
                  <FormField
                    id="maritalStatus"
                    label="Marital Status"
                    required
                    error={errors.maritalStatus}
                  >
                    <select
                      id="maritalStatus"
                      value={formData.maritalStatus}
                      onChange={(e) => handleChange('maritalStatus', e.target.value as MaritalStatus)}
                      onBlur={() => handleBlur('maritalStatus')}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                    >
                      <option value="Married">Married</option>
                      <option value="Not Married">Not Married</option>
                    </select>
                  </FormField>

                  {/* Dependents */}
                  <FormField
                    id="dependents"
                    label="Dependents"
                    required
                    error={errors.dependents}
                    helperText="Household members"
                  >
                    <select
                      id="dependents"
                      value={formData.dependents}
                      onChange={(e) => handleChange('dependents', e.target.value as Dependents)}
                      onBlur={() => handleBlur('dependents')}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                    >
                      <option value="0">0 (Zero)</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3+">3+</option>
                    </select>
                  </FormField>
                </div>
              </div>
            </div>

            {/* Section B: Education & Employment */}
            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Section B — Education & Employment
                  </h2>
                  <p className="text-xs text-slate-500">
                    Professional status and earning stability
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Education */}
                <FormField
                  id="education"
                  label="Education Level"
                  required
                  error={errors.education}
                >
                  <select
                    id="education"
                    value={formData.education}
                    onChange={(e) => handleChange('education', e.target.value as Education)}
                    onBlur={() => handleBlur('education')}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                  >
                    <option value="Graduate">Graduate</option>
                    <option value="Not Graduate">Not Graduate</option>
                  </select>
                </FormField>

                {/* Employment Type */}
                <FormField
                  id="employmentType"
                  label="Employment Category"
                  required
                  error={errors.employmentType}
                >
                  <select
                    id="employmentType"
                    value={formData.employmentType}
                    onChange={(e) => handleChange('employmentType', e.target.value as EmploymentType)}
                    onBlur={() => handleBlur('employmentType')}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                  >
                    <option value="Salaried">Salaried (Corporate / Government / Private)</option>
                    <option value="Self Employed">Self Employed (Business / Trade / Practice)</option>
                    <option value="Not Employed">Not Employed / Seeking</option>
                  </select>
                </FormField>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Section C & D */}
          <div className="space-y-8">
            {/* Section C: Financial Information */}
            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <IndianRupee className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Section C — Financial Information
                  </h2>
                  <p className="text-xs text-slate-500">
                    Income streams and loan request parameters (in INR ₹)
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Applicant Income */}
                  <FormField
                    id="applicantIncome"
                    label="Applicant Monthly Income"
                    required
                    prefix="₹"
                    error={errors.applicantIncome}
                    helperText="Primary monthly salary/profit"
                  >
                    <input
                      type="number"
                      id="applicantIncome"
                      min="0"
                      step="1000"
                      value={formData.applicantIncome || ''}
                      onChange={(e) => handleChange('applicantIncome', Number(e.target.value))}
                      onBlur={() => handleBlur('applicantIncome')}
                      placeholder="e.g. 50000"
                      className={`w-full px-3 py-2 text-sm rounded-lg border bg-white text-slate-900 focus:outline-none focus:ring-2 ${
                        errors.applicantIncome
                          ? 'border-red-400 focus:ring-red-200'
                          : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
                      }`}
                    />
                  </FormField>

                  {/* Co-Applicant Income */}
                  <FormField
                    id="coApplicantIncome"
                    label="Co-Applicant Monthly Income"
                    prefix="₹"
                    error={errors.coApplicantIncome}
                    helperText="Enter 0 if none"
                  >
                    <input
                      type="number"
                      id="coApplicantIncome"
                      min="0"
                      step="1000"
                      value={formData.coApplicantIncome}
                      onChange={(e) => handleChange('coApplicantIncome', Number(e.target.value))}
                      onBlur={() => handleBlur('coApplicantIncome')}
                      placeholder="0"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                    />
                  </FormField>
                </div>

                {/* Loan Amount */}
                <FormField
                  id="loanAmount"
                  label="Loan Amount Requested"
                  required
                  prefix="₹"
                  error={errors.loanAmount}
                  helperText={`Value in Rupees (e.g. ₹15,00,000 = ₹15 Lakh)`}
                >
                  <input
                    type="number"
                    id="loanAmount"
                    min="10000"
                    step="50000"
                    value={formData.loanAmount || ''}
                    onChange={(e) => handleChange('loanAmount', Number(e.target.value))}
                    onBlur={() => handleBlur('loanAmount')}
                    placeholder="e.g. 1500000"
                    className={`w-full px-3 py-2 text-sm rounded-lg border bg-white text-slate-900 focus:outline-none focus:ring-2 ${
                      errors.loanAmount
                        ? 'border-red-400 focus:ring-red-200'
                        : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
                    }`}
                  />
                </FormField>

                {/* Loan Term */}
                <FormField
                  id="loanTerm"
                  label="Loan Term (Duration)"
                  required
                  suffix="months"
                  error={errors.loanTerm}
                  helperText="120 mos = 10 yrs, 240 mos = 20 yrs, 360 mos = 30 yrs"
                >
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="number"
                      id="loanTerm"
                      min="12"
                      max="480"
                      step="12"
                      value={formData.loanTerm || ''}
                      onChange={(e) => handleChange('loanTerm', Number(e.target.value))}
                      onBlur={() => handleBlur('loanTerm')}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                    />
                  </div>
                </FormField>

                {/* Realtime Financial Affordability Indicator */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-slate-500" />
                    <span className="text-slate-600 font-medium">Est. EMI / Total Income:</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-slate-900">
                      ₹{approximateEMI.toLocaleString('en-IN')}/mo
                    </span>
                    <span className="text-slate-500 font-normal">
                      {' '}on ₹{totalMonthlyIncome.toLocaleString('en-IN')} income
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section D: Credit & Property Information */}
            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Section D — Credit & Property Information
                  </h2>
                  <p className="text-xs text-slate-500">
                    Creditworthiness history and property risk zone
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Credit History */}
                <FormField
                  id="creditHistory"
                  label="Credit Repayment History"
                  required
                  error={errors.creditHistory}
                  helperText="1 = Good/repaid prior debts, 0 = Adverse/no record"
                >
                  <select
                    id="creditHistory"
                    value={formData.creditHistory}
                    onChange={(e) => handleChange('creditHistory', Number(e.target.value) as CreditHistory)}
                    onBlur={() => handleBlur('creditHistory')}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                  >
                    <option value={1}>1 — Good / Available (Meets guidelines)</option>
                    <option value={0}>0 — Poor / Not Available (Elevated risk)</option>
                  </select>
                </FormField>

                {/* Property Area */}
                <FormField
                  id="propertyArea"
                  label="Property Area"
                  required
                  error={errors.propertyArea}
                  helperText="Location category of real-estate collateral"
                >
                  <select
                    id="propertyArea"
                    value={formData.propertyArea}
                    onChange={(e) => handleChange('propertyArea', e.target.value as PropertyArea)}
                    onBlur={() => handleBlur('propertyArea')}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                  >
                    <option value="Semiurban">Semiurban (High statistical approval rate)</option>
                    <option value="Urban">Urban (High liquidity)</option>
                    <option value="Rural">Rural (Standard agricultural/semi-rural)</option>
                  </select>
                </FormField>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bottom Bar */}
        <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 text-center sm:text-left">
            By submitting, the local deterministic scoring algorithm will evaluate all 12 input factors.
          </p>

          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
          >
            <span>Analyze Eligibility & Predict</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
