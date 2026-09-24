/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  LoanApplication,
  PredictionResult,
  PredictionFactor,
  CalculatedFinancialMetrics,
} from '../types/loan';
import { loanScoringRules, SCORING_THRESHOLD } from '../data/loanRules';

/**
 * Standard EMI Calculation Formula:
 * E = P * r * (1 + r)^n / ((1 + r)^n - 1)
 * Where:
 * P = Principal loan amount
 * r = Monthly interest rate (Annual rate / 12 / 100)
 * n = Tenure in months
 */
export function calculateEstimatedEMI(
  principal: number,
  annualInterestRate: number,
  tenureMonths: number
): number {
  if (tenureMonths <= 0 || principal <= 0) return 0;
  const monthlyRate = annualInterestRate / (12 * 100);
  if (monthlyRate === 0) return principal / tenureMonths;

  const factor = Math.pow(1 + monthlyRate, tenureMonths);
  const emi = (principal * monthlyRate * factor) / (factor - 1);
  return Math.round(emi);
}

/**
 * Local Deterministic Scoring Engine for Loan Approval
 * Evaluates application metrics and derives eligibility score, confidence, and explanatory factors.
 */
export function predictLoanApproval(application: LoanApplication): PredictionResult {
  const {
    applicantIncome,
    coApplicantIncome,
    loanAmount,
    loanTerm,
    creditHistory,
    education,
    employmentType,
    propertyArea,
    dependents,
  } = application;

  const totalMonthlyIncome = Math.max(1, applicantIncome + coApplicantIncome);
  const estimatedMonthlyEMI = calculateEstimatedEMI(
    loanAmount,
    loanScoringRules.benchmarkInterestRate,
    loanTerm
  );

  const emiToIncomeRatio = (estimatedMonthlyEMI / totalMonthlyIncome) * 100;
  const loanToAnnualIncomeRatio = loanAmount / (totalMonthlyIncome * 12);

  const metrics: CalculatedFinancialMetrics = {
    totalMonthlyIncome,
    estimatedMonthlyEMI,
    emiToIncomeRatio: Math.round(emiToIncomeRatio * 10) / 10,
    loanToAnnualIncomeRatio: Math.round(loanToAnnualIncomeRatio * 10) / 10,
  };

  const factors: PredictionFactor[] = [];
  let score = 0;

  // 1. Credit History Evaluation (Max 35 pts)
  if (creditHistory === 1) {
    score += loanScoringRules.creditHistory.good;
    factors.push({
      name: 'Credit Repayment History',
      impact: 'positive',
      category: 'credit',
      scoreContribution: loanScoringRules.creditHistory.good,
      description:
        'A clean credit history indicates disciplined past repayments and constitutes the single strongest positive predictor.',
    });
  } else {
    score += loanScoringRules.creditHistory.poor;
    factors.push({
      name: 'Credit History Deficit',
      impact: 'negative',
      category: 'credit',
      scoreContribution: loanScoringRules.creditHistory.poor - loanScoringRules.creditHistory.good,
      description:
        'An adverse or missing credit track record presents an elevated default risk according to banking risk models.',
    });
  }

  // 2. Financial Affordability / DTI Evaluation (Max 30 pts)
  if (emiToIncomeRatio <= 30) {
    score += loanScoringRules.financialAffordability.excellentDtiRatio;
    factors.push({
      name: 'Comfortable Debt-to-Income (DTI)',
      impact: 'positive',
      category: 'financial',
      scoreContribution: loanScoringRules.financialAffordability.excellentDtiRatio,
      description: `Estimated monthly installment (₹${estimatedMonthlyEMI.toLocaleString('en-IN')}) consumes only ${metrics.emiToIncomeRatio}% of combined monthly income, well below the 40% prudential limit.`,
    });
  } else if (emiToIncomeRatio <= 45) {
    score += loanScoringRules.financialAffordability.moderateDtiRatio;
    factors.push({
      name: 'Manageable Debt Burden',
      impact: 'positive',
      category: 'financial',
      scoreContribution: loanScoringRules.financialAffordability.moderateDtiRatio,
      description: `Estimated EMI is ${metrics.emiToIncomeRatio}% of monthly income. It is within allowable banking limits, though leaves moderate cash reserve.`,
    });
  } else if (emiToIncomeRatio <= 60) {
    score += loanScoringRules.financialAffordability.highDtiRatio;
    factors.push({
      name: 'Elevated Debt Service Ratio',
      impact: 'negative',
      category: 'financial',
      scoreContribution: -10,
      description: `Estimated EMI absorbs ${metrics.emiToIncomeRatio}% of monthly income, placing strain on the applicant's living disposable cashflow.`,
    });
  } else {
    score += loanScoringRules.financialAffordability.criticalDtiRatio;
    factors.push({
      name: 'Severe Debt Over-Leverage',
      impact: 'negative',
      category: 'financial',
      scoreContribution: -25,
      description: `Requested loan results in an estimated EMI consuming ${metrics.emiToIncomeRatio}% of combined income, significantly exceeding safe lending thresholds.`,
    });
  }

  // 3. Combined Household Income Tier (Max 10 pts)
  if (totalMonthlyIncome >= loanScoringRules.combinedIncomeTiers.tier1.min) {
    score += loanScoringRules.combinedIncomeTiers.tier1.points;
    factors.push({
      name: 'Strong Monthly Household Income',
      impact: 'positive',
      category: 'financial',
      scoreContribution: loanScoringRules.combinedIncomeTiers.tier1.points,
      description: `Total monthly household cashflow of ₹${totalMonthlyIncome.toLocaleString('en-IN')} establishes an ample cushion against financial emergencies.`,
    });
  } else if (totalMonthlyIncome >= loanScoringRules.combinedIncomeTiers.tier2.min) {
    score += loanScoringRules.combinedIncomeTiers.tier2.points;
    factors.push({
      name: 'Upper-Middle Income Tier',
      impact: 'positive',
      category: 'financial',
      scoreContribution: loanScoringRules.combinedIncomeTiers.tier2.points,
      description: `Combined monthly income of ₹${totalMonthlyIncome.toLocaleString('en-IN')} satisfies standard middle-market underwriting criteria.`,
    });
  } else if (totalMonthlyIncome >= loanScoringRules.combinedIncomeTiers.tier3.min) {
    score += loanScoringRules.combinedIncomeTiers.tier3.points;
  } else {
    score += loanScoringRules.combinedIncomeTiers.tier4.points;
    factors.push({
      name: 'Modest Monthly Income Base',
      impact: 'negative',
      category: 'financial',
      scoreContribution: -5,
      description: `Monthly income of ₹${totalMonthlyIncome.toLocaleString('en-IN')} limits borrowing capacity for higher loan principal.`,
    });
  }

  // Co-Applicant Income presence bonus
  if (coApplicantIncome > 0) {
    factors.push({
      name: 'Co-Applicant Income Cushion',
      impact: 'positive',
      category: 'financial',
      scoreContribution: 3,
      description: `Secondary monthly income of ₹${coApplicantIncome.toLocaleString('en-IN')} enhances joint debt-servicing reliability.`,
    });
  }

  // 4. Employment Stability (Max 12 pts)
  if (employmentType === 'Salaried') {
    score += loanScoringRules.employment.salaried;
    factors.push({
      name: 'Stable Salaried Employment',
      impact: 'positive',
      category: 'employment',
      scoreContribution: loanScoringRules.employment.salaried,
      description: 'Salaried payroll employment provides regular, verifiable periodic cash inflow.',
    });
  } else if (employmentType === 'Self Employed') {
    score += loanScoringRules.employment.selfEmployed;
    factors.push({
      name: 'Self-Employed Professional Status',
      impact: 'positive',
      category: 'employment',
      scoreContribution: loanScoringRules.employment.selfEmployed,
      description: 'Self-employed income reflects active trade or business enterprise with moderate earnings variability.',
    });
  } else {
    score += loanScoringRules.employment.notEmployed;
    factors.push({
      name: 'Absence of Active Employment',
      impact: 'negative',
      category: 'employment',
      scoreContribution: -12,
      description: 'Unemployed status presents substantial uncertainty regarding steady debt service capability.',
    });
  }

  // 5. Education Level (Max 5 pts)
  if (education === 'Graduate') {
    score += loanScoringRules.education.graduate;
    factors.push({
      name: 'Graduate Degree Holder',
      impact: 'positive',
      category: 'profile',
      scoreContribution: loanScoringRules.education.graduate,
      description: 'Higher education level statistically correlates with long-term career growth and income resilience.',
    });
  } else {
    score += loanScoringRules.education.notGraduate;
  }

  // 6. Property Area (Max 5 pts)
  if (propertyArea === 'Semiurban') {
    score += loanScoringRules.propertyArea.semiurban;
    factors.push({
      name: 'Semiurban Property Collateral',
      impact: 'positive',
      category: 'property',
      scoreContribution: loanScoringRules.propertyArea.semiurban,
      description: 'Semiurban locations empirically demonstrate favorable recovery ratios and highest statistical approval frequency.',
    });
  } else if (propertyArea === 'Urban') {
    score += loanScoringRules.propertyArea.urban;
    factors.push({
      name: 'Urban Property Location',
      impact: 'positive',
      category: 'property',
      scoreContribution: loanScoringRules.propertyArea.urban,
      description: 'Prime urban property assets exhibit high market liquidity and steady valuation.',
    });
  } else {
    score += loanScoringRules.propertyArea.rural;
  }

  // 7. Dependents vs Living Expense Ratio (Max 3 pts)
  score += loanScoringRules.dependents[dependents] || 1;
  if (dependents === '3+') {
    factors.push({
      name: 'Higher Dependent Count (3+)',
      impact: 'negative',
      category: 'profile',
      scoreContribution: -2,
      description: 'Higher number of dependents increases household fixed expenditures relative to disposable surplus.',
    });
  }

  // Normalized score clamped between 5 and 98
  let finalScore = Math.max(5, Math.min(98, Math.round(score)));

  // Determination of Approval status based on threshold
  const status: 'Approved' | 'Rejected' =
    finalScore >= SCORING_THRESHOLD ? 'Approved' : 'Rejected';

  // Deterministic Confidence Calculation:
  // How decisively the score sits away from the boundary line (SCORING_THRESHOLD = 60)
  let confidence: number;
  if (status === 'Approved') {
    // Range 60 to 100 -> confidence from 60% to 96%
    const margin = finalScore - SCORING_THRESHOLD;
    confidence = Math.min(96, Math.round(60 + (margin / (100 - SCORING_THRESHOLD)) * 36));
  } else {
    // Range 0 to 59 -> rejection confidence from 60% to 95%
    const margin = SCORING_THRESHOLD - finalScore;
    confidence = Math.min(95, Math.round(60 + (margin / SCORING_THRESHOLD) * 35));
  }

  // Sort factors so most influential ones come first
  factors.sort((a, b) => {
    if (a.impact === b.impact) {
      return Math.abs(b.scoreContribution) - Math.abs(a.scoreContribution);
    }
    return a.impact === (status === 'Approved' ? 'positive' : 'negative') ? -1 : 1;
  });

  // Descriptive narrative summary
  const summary =
    status === 'Approved'
      ? `Based on the evaluated parameters, the applicant demonstrates strong loan eligibility with an indicative score of ${finalScore}/100. Key supportive drivers include ${creditHistory === 1 ? 'a verified clean credit track record' : 'sufficient household cashflow'} and an affordable projected debt service ratio of ${metrics.emiToIncomeRatio}%.`
      : `Based on the evaluated parameters, the application falls below the indicative eligibility benchmark with a score of ${finalScore}/100. The principal limiting factors are ${creditHistory === 0 ? 'the lack of a satisfactory credit repayment history' : 'a strained debt-to-income ratio'} and current borrowing leverage relative to income.`;

  return {
    status,
    score: finalScore,
    confidence,
    factors,
    summary,
    metrics,
    calculatedAt: new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    application,
  };
}
