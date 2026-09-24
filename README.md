# Loan Approval Prediction System

**BCA Minor Project** · Department of Computer Science & Information Technology  
**Institution:** Khwaja Moinuddin Chishti Language University, Lucknow  
**Academic Degree:** Bachelor of Computer Applications (BCA)  

---

## 1. Project Overview

The **Loan Approval Prediction System** is a responsive web application that evaluates an applicant's personal, demographic, educational, employment, financial, and property records to provide an **indicative prediction** of loan eligibility:

- **Approved** (Score $\ge$ 60 / 100)
- **Rejected** (Score $<$ 60 / 100)

Along with the predicted outcome, the system computes:
1. **Prediction Confidence Percentage** (quantifying decision boundary certainty)
2. **Eligibility Score** (0 to 100 transparent scale)
3. **Monthly EMI & Debt-to-Income (DTI) Ratio** (derived from standard amortization calculations)
4. **Granular Contributing Factors** (categorized positive drivers and risk limiting factors)
5. **Printable Academic Assessment Report**

The application executes locally using a deterministic TypeScript scoring engine derived from historical data science patterns observed in the canonical Kaggle Loan Prediction Dataset.

---

## 2. Key Features

- **Transparent Deterministic Scoring Engine**: No random numbers (`Math.random()` prohibited). The exact same input parameters always produce the exact same score and confidence metrics.
- **Fairness & Non-Discrimination Compliance**: Demographic attributes (Gender, Marital Status) have strictly neutral or zero weight to prevent algorithmic bias.
- **Standard Financial Math**: Computes actual estimated reducing-balance Equated Monthly Installment (EMI) and compares against household surplus.
- **Real-Time Input Validation**: Inline validation prevents negative incomes, zero-duration loans, missing categorical values, or invalid ranges.
- **Examiner Demo Profiles**: One-click preset profiles ("High-Eligibility Professional", "Self-Employed Moderate", "Adverse Credit High-Risk") for live viva demonstrations.
- **Local Browser Persistence**: Preserves previous application state using `localStorage` with full user controls to modify or clear data.
- **Printable Assessment Slip**: Built-in `@media print` styling formats the result into a clean academic report slip with candidate details.

---

## 3. Technology Stack

- **Frontend Framework**: React 19 (Functional Components, Hooks)
- **Language**: TypeScript (Strict typing, comprehensive interfaces)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4 (Clean, modern fintech palette, zero-pill metadata typography)
- **Iconography**: Lucide React
- **Architecture**: Zero-backend standalone Single-Page Application (SPA)

---

## 4. The Seven Academic Modules

As specified in the project synopsis, the system implements seven conceptual modules:

1. **Home / Landing Page**: Hero introduction, four-step visual workflow, academic disclaimers, and examiner quick-load presets.
2. **Loan Application Form**: Structured into 4 logical cards (Personal, Education & Work, Financials, Credit & Property) with responsive desktop 2-column layout.
3. **Input Validation Module**: Dedicated verification service (`src/services/validation.ts`) enforcing data type integrity, positive currency values, and complete required selections.
4. **Prediction / Scoring Engine**: Client-side evaluation service (`src/services/predictionEngine.ts`) calculating weighted points, EMI, DTI %, score, and boundary-distance confidence.
5. **Result Display Module**: Status banner, circular confidence meter, score progression bar, financial KPI grid, categorized factor cards, and print trigger.
6. **Python Data Analysis & ML Module**: Academic reference documentation explaining Kaggle dataset preprocessing, missing value imputation, Logistic Regression, Decision Trees, and Random Forest Gini feature importances.
7. **About & Viva Guide**: Institution affiliation, developer details, academic credentials, and 5 standard viva-voce technical defense answers.

---

## 5. Scoring Weight Distribution

The scoring engine evaluates applicants across a 100-point calibrated scale:

| Evaluation Dimension | Scoring Parameter | Maximum Points | Statistical Justification |
| :--- | :--- | :---: | :--- |
| **Credit History** | Good (1) vs Adverse (0) | **35 pts** | Empirical dataset shows ~80% approval for clean credit vs <10% for adverse credit. |
| **Debt Affordability (DTI)** | Monthly EMI $\le$ 30% of Income | **30 pts** | Core banking prudential limit to ensure disposable living surplus. |
| **Employment Stability** | Salaried vs Self-Employed vs Unemployed | **12 pts** | Payroll employment provides verifiable, recurring cash inflows. |
| **Household Income Tier** | Combined household monthly income | **10 pts** | Secondary cushion against emergency cashflow disruptions. |
| **Education Status** | Graduate vs Not Graduate | **5 pts** | Favorable long-term career growth trajectory. |
| **Property Area** | Semiurban vs Urban vs Rural | **5 pts** | Semiurban collateral demonstrates highest statistical recovery and approval rate (~76%). |
| **Dependents Ratio** | 0 to 3+ dependents | **3 pts** | Fewer dependents reduces household fixed overheads. |
| **Fairness Invariant** | Gender & Marital Status | **0 pts** | Guaranteed zero demographic discrimination. |

**Approval Threshold**: Total Score $\ge$ 60 points.

---

## 6. Local Installation & Development

To run this application locally on your machine:

```bash
# 1. Clone or extract the project directory
cd loan-approval-prediction-system

# 2. Install dependencies
npm install

# 3. Start the local Vite development server
npm run dev
```

The application will launch at: `http://localhost:3000`

---

## 7. Academic Limitations

- **Indicative Assessment Only**: This system is intended for academic research, education, and curriculum viva demonstration. It does not constitute official legal, credit, or banking advice.
- **Deterministic Emulation**: The client-side TypeScript engine emulates the feature importances and decision thresholds discovered in Python ML experiments without running continuous server-side neural inference.
- **Client Storage**: Session data is held in browser `localStorage` and is never transmitted to an external server.

---

## 8. Future Scope & Enhancements

- **Python REST Microservice**: Deploying a FastAPI/Flask backend hosting a serialized `.pkl` Scikit-learn Random Forest model.
- **Relational Database**: Integrating PostgreSQL via Cloud SQL or Supabase for persistent multi-user loan application audits.
- **Credit Bureau API**: Connecting real-time credit score APIs (CIBIL/Experian) to automate applicant credit verification.
- **Explainable AI (XAI)**: Integrating interactive SHAP / LIME waterfall plots in the result interface.
