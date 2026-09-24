/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Deterministic Loan Approval Scoring Rules
 * 
 * Based on historical loan eligibility analysis patterns from the Kaggle/Analytics Vidhya
 * Loan Prediction Dataset.
 * 
 * Total Score Scale: 0 to 100
 * Passing (Approval) Threshold: 60 points
 * 
 * FAIRNESS COMPLIANCE:
 * Sensitive demographic attributes (Gender, Marital Status) have 0 impact or neutral weighting
 * to strictly prevent algorithmic discrimination.
 */

export const SCORING_THRESHOLD = 60;

export const loanScoringRules = {
  // 1. Credit History (Weight: Up to 35 points)
  // Statistical significance: In historical banking datasets, credit history is the #1 predictor.
  // Borrowers with good credit repayment history have over 80% approval probability.
  creditHistory: {
    good: 35, // Clean credit repayment history
    poor: 5,  // Defaults or no verified credit history
  },

  // 2. Financial Affordability & EMI-to-Income Ratio (Weight: Up to 30 points)
  // Evaluates monthly repayment capability based on standard banking DTI (Debt-to-Income) norms.
  // Assumes realistic standard benchmark annual interest rate of 9.0% for EMI estimation.
  benchmarkInterestRate: 9.0, // 9% per annum
  financialAffordability: {
    // When EMI <= 30% of total monthly income (Ideal debt capacity)
    excellentDtiRatio: 30,
    // When EMI is between 30% and 45% of total income (Moderate debt capacity)
    moderateDtiRatio: 20,
    // When EMI is between 45% and 60% of total income (Stretched debt capacity)
    highDtiRatio: 10,
    // When EMI > 60% of total income (Severe debt risk)
    criticalDtiRatio: 0,
  },

  // Combined Household Income Tier Bonus (Weight: Up to 10 points)
  // Higher combined income provides buffer against emergency cashflow disruptions.
  combinedIncomeTiers: {
    tier1: { min: 75000, points: 10 }, // High monthly income
    tier2: { min: 45000, points: 7 },  // Upper-middle income
    tier3: { min: 25000, points: 4 },  // Moderate income
    tier4: { min: 0, points: 1 },      // Baseline income
  },

  // 3. Employment Stability (Weight: Up to 12 points)
  // Salaried individuals offer regular fixed cashflows; self-employed have business income;
  // unemployed applicants have severe repayment uncertainty.
  employment: {
    salaried: 12,
    selfEmployed: 9,
    notEmployed: 0,
  },

  // 4. Education Level (Weight: Up to 5 points)
  // Empirical datasets show graduates have slightly higher career earning trajectories.
  education: {
    graduate: 5,
    notGraduate: 2,
  },

  // 5. Property Area (Weight: Up to 5 points)
  // Empirically in the Kaggle loan dataset, Semiurban properties exhibit the highest approval
  // rates (~76%), followed by Urban (~65%) and Rural (~61%).
  propertyArea: {
    semiurban: 5,
    urban: 4,
    rural: 2,
  },

  // 6. Dependents vs Income Burden (Weight: Up to 3 points)
  // Fewer dependents per income bracket reduces living expense pressure.
  dependents: {
    '0': 3,
    '1': 2,
    '2': 2,
    '3+': 1,
  },

  // 7. Demographics (Gender & Marital Status) (Weight: 0 points)
  // Pure 0 points to guarantee complete non-discrimination and fairness as requested.
  demographics: {
    genderNeutral: 0,
    maritalNeutral: 0,
  },
};

/**
 * Predefined sample applicants for quick evaluation and academic viva demonstration
 */
export const SAMPLE_PROFILES = [
  {
    id: 'strong-approved',
    title: 'High-Eligibility Salaried Professional',
    badge: 'Expected: Approved (~85+ Score)',
    expectedOutcome: 'Approved' as const,
    data: {
      name: 'Aditya Sharma',
      gender: 'Male' as const,
      maritalStatus: 'Married' as const,
      dependents: '1' as const,
      education: 'Graduate' as const,
      employmentType: 'Salaried' as const,
      applicantIncome: 65000,
      coApplicantIncome: 25000,
      loanAmount: 1800000,
      loanTerm: 240, // 20 years
      creditHistory: 1 as const,
      propertyArea: 'Semiurban' as const,
    },
  },
  {
    id: 'borderline',
    title: 'Self-Employed Moderate Applicant',
    badge: 'Expected: Borderline Eligible (~62 Score)',
    expectedOutcome: 'Approved' as const,
    data: {
      name: 'Priya Verma',
      gender: 'Female' as const,
      maritalStatus: 'Not Married' as const,
      dependents: '0' as const,
      education: 'Graduate' as const,
      employmentType: 'Self Employed' as const,
      applicantIncome: 42000,
      coApplicantIncome: 0,
      loanAmount: 1400000,
      loanTerm: 180, // 15 years
      creditHistory: 1 as const,
      propertyArea: 'Urban' as const,
    },
  },
  {
    id: 'high-risk-rejected',
    title: 'Adverse Credit & Over-Leveraged Applicant',
    badge: 'Expected: Rejected (<40 Score)',
    expectedOutcome: 'Rejected' as const,
    data: {
      name: 'Rohan Gupta',
      gender: 'Male' as const,
      maritalStatus: 'Married' as const,
      dependents: '3+' as const,
      education: 'Not Graduate' as const,
      employmentType: 'Salaried' as const,
      applicantIncome: 22000,
      coApplicantIncome: 0,
      loanAmount: 2500000,
      loanTerm: 120, // 10 years (high EMI)
      creditHistory: 0 as const, // Poor credit
      propertyArea: 'Rural' as const,
    },
  },
];
