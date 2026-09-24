/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Gender = 'Male' | 'Female' | 'Other';
export type MaritalStatus = 'Married' | 'Not Married';
export type Dependents = '0' | '1' | '2' | '3+';
export type Education = 'Graduate' | 'Not Graduate';
export type EmploymentType = 'Salaried' | 'Self Employed' | 'Not Employed';
export type CreditHistory = 1 | 0; // 1 = Good / Available, 0 = Poor / Not Available
export type PropertyArea = 'Urban' | 'Semiurban' | 'Rural';

export interface LoanApplication {
  name: string;
  gender: Gender;
  maritalStatus: MaritalStatus;
  dependents: Dependents;
  education: Education;
  employmentType: EmploymentType;
  applicantIncome: number; // in ₹ (monthly)
  coApplicantIncome: number; // in ₹ (monthly)
  loanAmount: number; // in ₹ (total requested)
  loanTerm: number; // in months
  creditHistory: CreditHistory;
  propertyArea: PropertyArea;
}

export type FactorImpact = 'positive' | 'negative' | 'neutral';

export interface PredictionFactor {
  name: string;
  impact: FactorImpact;
  description: string;
  category: 'credit' | 'financial' | 'employment' | 'property' | 'profile';
  scoreContribution: number; // visual delta / points added or deducted
}

export interface CalculatedFinancialMetrics {
  totalMonthlyIncome: number;
  estimatedMonthlyEMI: number;
  emiToIncomeRatio: number; // percentage
  loanToAnnualIncomeRatio: number;
}

export interface PredictionResult {
  status: 'Approved' | 'Rejected';
  score: number; // 0 to 100
  confidence: number; // 0 to 100
  factors: PredictionFactor[];
  summary: string;
  metrics: CalculatedFinancialMetrics;
  calculatedAt: string;
  application: LoanApplication;
}

export interface FormValidationErrors {
  name?: string;
  gender?: string;
  maritalStatus?: string;
  dependents?: string;
  education?: string;
  employmentType?: string;
  applicantIncome?: string;
  coApplicantIncome?: string;
  loanAmount?: string;
  loanTerm?: string;
  creditHistory?: string;
  propertyArea?: string;
}

export interface PredefinedSample {
  id: string;
  title: string;
  badge: string;
  expectedOutcome: 'Approved' | 'Rejected';
  data: LoanApplication;
}
