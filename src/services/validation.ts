/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LoanApplication, FormValidationErrors } from '../types/loan';

/**
 * Validates the loan application inputs according to academic and financial constraints
 */
export function validateLoanApplication(data: Partial<LoanApplication>): {
  isValid: boolean;
  errors: FormValidationErrors;
} {
  const errors: FormValidationErrors = {};

  // 1. Applicant Full Name
  if (!data.name || data.name.trim().length === 0) {
    errors.name = 'Full name is required.';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long.';
  } else if (!/^[a-zA-Z\s.'-]+$/.test(data.name.trim())) {
    errors.name = 'Name contains invalid characters.';
  }

  // 2. Gender
  if (!data.gender) {
    errors.gender = 'Please select a gender option.';
  } else if (!['Male', 'Female', 'Other'].includes(data.gender)) {
    errors.gender = 'Invalid gender selected.';
  }

  // 3. Marital Status
  if (!data.maritalStatus) {
    errors.maritalStatus = 'Please select your marital status.';
  } else if (!['Married', 'Not Married'].includes(data.maritalStatus)) {
    errors.maritalStatus = 'Invalid marital status.';
  }

  // 4. Dependents
  if (data.dependents === undefined || data.dependents === null) {
    errors.dependents = 'Please select number of dependents.';
  } else if (!['0', '1', '2', '3+'].includes(data.dependents)) {
    errors.dependents = 'Invalid dependents value.';
  }

  // 5. Education
  if (!data.education) {
    errors.education = 'Please select your education status.';
  } else if (!['Graduate', 'Not Graduate'].includes(data.education)) {
    errors.education = 'Invalid education level.';
  }

  // 6. Employment Type
  if (!data.employmentType) {
    errors.employmentType = 'Please select employment category.';
  } else if (!['Salaried', 'Self Employed', 'Not Employed'].includes(data.employmentType)) {
    errors.employmentType = 'Invalid employment type.';
  }

  // 7. Applicant Income
  if (data.applicantIncome === undefined || data.applicantIncome === null || isNaN(Number(data.applicantIncome))) {
    errors.applicantIncome = 'Monthly applicant income is required.';
  } else if (Number(data.applicantIncome) <= 0) {
    errors.applicantIncome = 'Monthly income must be greater than ₹0.';
  } else if (Number(data.applicantIncome) > 50000000) {
    errors.applicantIncome = 'Please enter a realistic monthly income.';
  }

  // 8. Co-Applicant Income
  if (data.coApplicantIncome === undefined || data.coApplicantIncome === null || isNaN(Number(data.coApplicantIncome))) {
    errors.coApplicantIncome = 'Co-applicant income must be a number (enter 0 if none).';
  } else if (Number(data.coApplicantIncome) < 0) {
    errors.coApplicantIncome = 'Co-applicant income cannot be negative.';
  }

  // 9. Loan Amount
  if (data.loanAmount === undefined || data.loanAmount === null || isNaN(Number(data.loanAmount))) {
    errors.loanAmount = 'Requested loan amount is required.';
  } else if (Number(data.loanAmount) <= 0) {
    errors.loanAmount = 'Loan amount must be greater than ₹0.';
  } else if (Number(data.loanAmount) < 10000) {
    errors.loanAmount = 'Minimum loan request is ₹10,000.';
  }

  // 10. Loan Term
  if (data.loanTerm === undefined || data.loanTerm === null || isNaN(Number(data.loanTerm))) {
    errors.loanTerm = 'Loan term (duration) is required.';
  } else if (Number(data.loanTerm) <= 0) {
    errors.loanTerm = 'Loan term must be a positive number of months.';
  } else if (Number(data.loanTerm) < 6 || Number(data.loanTerm) > 480) {
    errors.loanTerm = 'Loan term must be between 6 and 480 months (up to 40 years).';
  }

  // 11. Credit History
  if (data.creditHistory === undefined || data.creditHistory === null) {
    errors.creditHistory = 'Credit history selection is required.';
  } else if (data.creditHistory !== 1 && data.creditHistory !== 0) {
    errors.creditHistory = 'Invalid credit history status.';
  }

  // 12. Property Area
  if (!data.propertyArea) {
    errors.propertyArea = 'Property area selection is required.';
  } else if (!['Urban', 'Semiurban', 'Rural'].includes(data.propertyArea)) {
    errors.propertyArea = 'Invalid property area category.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
