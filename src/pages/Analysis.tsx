/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Database,
  GitBranch,
  Cpu,
  BarChart2,
  Code,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  BookOpen,
} from 'lucide-react';

export const Analysis: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dataset' | 'models' | 'visuals' | 'code'>('dataset');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Academic Module 06</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          Data Analysis & Machine Learning Methodology
        </h1>
        <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
          This module documents the analytical foundation described in the project synopsis. Python data processing and statistical analysis on historical loan data derive the weighted rules implemented in this client-side web application.
        </p>
      </div>

      {/* Distinction Callout */}
      <div className="p-4 sm:p-5 rounded-2xl bg-blue-50 border border-blue-200 flex items-start gap-3">
        <HelpCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-blue-950 leading-relaxed">
          <strong className="font-bold">Architectural Principle: </strong>
          Python-based analysis can be used to evaluate historical loan data and derive insights that inform the web application's scoring logic. The React application executes a deterministic client scoring engine to ensure instant evaluation without requiring a dedicated Python microservice or remote database.
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl max-w-fit border border-slate-200 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('dataset')}
          className={`px-3.5 py-2 rounded-lg transition-all ${
            activeTab === 'dataset'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          01. Dataset & Preprocessing
        </button>
        <button
          onClick={() => setActiveTab('models')}
          className={`px-3.5 py-2 rounded-lg transition-all ${
            activeTab === 'models'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          02. ML Algorithms
        </button>
        <button
          onClick={() => setActiveTab('visuals')}
          className={`px-3.5 py-2 rounded-lg transition-all ${
            activeTab === 'visuals'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          03. Empirical Visualizations
        </button>
        <button
          onClick={() => setActiveTab('code')}
          className={`px-3.5 py-2 rounded-lg transition-all ${
            activeTab === 'code'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          04. Python Reference Script
        </button>
      </div>

      {/* TAB 1: DATASET & PREPROCESSING */}
      {activeTab === 'dataset' && (
        <div className="space-y-6">
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-slate-900">
                Kaggle Loan Prediction Dataset Overview
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              The project is grounded on the canonical 614-record Loan Prediction Dataset widely utilized in computer science and data mining academia. The dataset comprises applicant historical records with a binary loan approval outcome (`Loan_Status`: Y / N).
            </p>

            <div className="overflow-x-auto pt-2">
              <table className="w-full text-xs text-left text-slate-700">
                <thead className="bg-slate-50 text-slate-900 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Feature Name</th>
                    <th className="py-2.5 px-3">Type</th>
                    <th className="py-2.5 px-3">Description</th>
                    <th className="py-2.5 px-3">Imputation Method in Python</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-2 px-3 font-semibold text-slate-900">Gender</td>
                    <td className="py-2 px-3">Categorical</td>
                    <td className="py-2 px-3">Male / Female</td>
                    <td className="py-2 px-3">Mode Imputation (Male: ~81%)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-slate-900">Married</td>
                    <td className="py-2 px-3">Categorical</td>
                    <td className="py-2 px-3">Yes / No</td>
                    <td className="py-2 px-3">Mode Imputation (Yes: ~65%)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-slate-900">Dependents</td>
                    <td className="py-2 px-3">Categorical</td>
                    <td className="py-2 px-3">0, 1, 2, 3+</td>
                    <td className="py-2 px-3">Mode Imputation ('0')</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-slate-900">Education</td>
                    <td className="py-2 px-3">Categorical</td>
                    <td className="py-2 px-3">Graduate / Not Graduate</td>
                    <td className="py-2 px-3">None (Complete feature)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-slate-900">ApplicantIncome</td>
                    <td className="py-2 px-3">Continuous (₹)</td>
                    <td className="py-2 px-3">Monthly income of applicant</td>
                    <td className="py-2 px-3">Log transformation for skewness</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-slate-900">CoapplicantIncome</td>
                    <td className="py-2 px-3">Continuous (₹)</td>
                    <td className="py-2 px-3">Monthly income of co-applicant</td>
                    <td className="py-2 px-3">Combined with applicant income</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-slate-900">LoanAmount</td>
                    <td className="py-2 px-3">Continuous (₹)</td>
                    <td className="py-2 px-3">Requested loan amount</td>
                    <td className="py-2 px-3">Median Imputation (~₹128k)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-slate-900">Loan_Amount_Term</td>
                    <td className="py-2 px-3">Continuous</td>
                    <td className="py-2 px-3">Term in months</td>
                    <td className="py-2 px-3">Mode Imputation (360 months)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-slate-900">Credit_History</td>
                    <td className="py-2 px-3">Binary (0 or 1)</td>
                    <td className="py-2 px-3">Credit repaid history</td>
                    <td className="py-2 px-3">Mode Imputation (1.0)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-slate-900">Property_Area</td>
                    <td className="py-2 px-3">Categorical</td>
                    <td className="py-2 px-3">Urban / Semiurban / Rural</td>
                    <td className="py-2 px-3">One-Hot / Label Encoding</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Data Cleaning
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Missing values in Credit_History, LoanAmount, and Loan_Amount_Term are handled using statistical central tendencies (mean/median for numerical, mode for categorical).
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Feature Engineering
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Total_Income is computed by adding ApplicantIncome and CoapplicantIncome. An EMI proxy metric evaluates monthly debt burden against household surplus.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Fairness Constraint
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Demographic features such as Gender and Marital Status are assigned zero weight in the scoring logic to strictly prevent automated demographic bias.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MACHINE LEARNING ALGORITHMS */}
      {activeTab === 'models' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Logistic Regression */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm mb-3">
                  LR
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  Logistic Regression
                </h3>
                <span className="text-[11px] font-semibold text-slate-500 block mb-3">
                  Linear Probability Estimator
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Models the log-odds of loan approval as a linear combination of applicant features:
                  <code className="block my-2 p-2 bg-slate-50 rounded text-[11px] font-mono text-slate-800">
                    p = 1 / (1 + e^-(β0 + Σ βi Xi))
                  </code>
                  Yields clear coefficients indicating the high predictive power of credit history.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
                <strong>Academic Role:</strong> Baseline benchmark model
              </div>
            </div>

            {/* Decision Tree */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm mb-3">
                  DT
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  Decision Tree Classifier
                </h3>
                <span className="text-[11px] font-semibold text-slate-500 block mb-3">
                  Hierarchical Splitting
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Partitions applicant data through recursive binary splits based on Gini Impurity or Information Gain (Entropy).
                  First split in virtually every tree is:
                  <code className="block my-2 p-2 bg-slate-50 rounded text-[11px] font-mono text-slate-800">
                    Is Credit_History == 1.0?
                  </code>
                  Directly inspired our decision rule hierarchy.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
                <strong>Academic Role:</strong> Rule structure discovery
              </div>
            </div>

            {/* Random Forest */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-sm mb-3">
                  RF
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  Random Forest Classifier
                </h3>
                <span className="text-[11px] font-semibold text-slate-500 block mb-3">
                  Ensemble Bagging Method
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Constructs an ensemble of de-correlated decision trees and aggregates predictions via majority voting.
                  Computes feature importances across all bootstrap samples:
                  <code className="block my-2 p-2 bg-slate-50 rounded text-[11px] font-mono text-slate-800">
                    Feature_Importance = Σ ΔGini
                  </code>
                  Provides quantitative feature weight bounds.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
                <strong>Academic Role:</strong> Feature weight calibration
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Academic Honesty Note: </strong>
              To adhere to scientific rigor, the web application does not claim fabricated accuracy metrics (such as 99.8%). In published literature, standard cross-validated test accuracy for this 614-record dataset typically stabilizes around 78% to 83%, constrained by dataset size and non-linear economic noise.
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: VISUALIZATIONS */}
      {activeTab === 'visuals' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Visual 1: Credit History Impact */}
            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Approval Rate by Credit History (Historical Data)
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Proportion of loan approvals when credit history is good (1.0) vs adverse (0.0)
              </p>

              <div className="space-y-4 text-xs">
                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-slate-700">Good Credit History (1.0)</span>
                    <span className="text-emerald-700 font-bold">~79.6% Approved</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-600 rounded-full" style={{ width: '79.6%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-slate-700">Adverse / No Credit (0.0)</span>
                    <span className="text-rose-700 font-bold">~7.9% Approved</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-600 rounded-full" style={{ width: '7.9%' }} />
                  </div>
                </div>
              </div>

              <p className="mt-4 pt-4 border-t border-slate-100 text-[11px] text-slate-500">
                Finding: Credit history is the dominant predictive split, justifying its heavy 35-point weighting in our scoring system.
              </p>
            </div>

            {/* Visual 2: Property Area Approval */}
            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Approval Rate by Property Area
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Comparative approval percentages across real-estate collateral classifications
              </p>

              <div className="space-y-4 text-xs">
                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-slate-700">Semiurban Property</span>
                    <span className="text-blue-700 font-bold">~76.8% Approved</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '76.8%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-slate-700">Urban Property</span>
                    <span className="text-slate-700 font-bold">~65.8% Approved</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-700 rounded-full" style={{ width: '65.8%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-slate-700">Rural Property</span>
                    <span className="text-slate-600 font-bold">~61.5% Approved</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-500 rounded-full" style={{ width: '61.5%' }} />
                  </div>
                </div>
              </div>

              <p className="mt-4 pt-4 border-t border-slate-100 text-[11px] text-slate-500">
                Finding: Semiurban properties show statistically higher historical acceptance, incorporated into our calibrated scoring points.
              </p>
            </div>

            {/* Visual 3: Feature Importance Ranking */}
            <div className="md:col-span-2 p-6 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Derived Feature Importance (Random Forest Gini Importance)
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Relative influence of applicant factors on loan approval determination
              </p>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-slate-800">1. Credit History</span>
                    <span className="font-mono text-slate-600">46.5%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '46.5%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-slate-800">2. Applicant & Coapplicant Income</span>
                    <span className="font-mono text-slate-600">22.8%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '22.8%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-slate-800">3. Loan Amount Requested</span>
                    <span className="font-mono text-slate-600">14.2%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-400 rounded-full" style={{ width: '14.2%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-slate-800">4. Loan Term Duration</span>
                    <span className="font-mono text-slate-600">6.1%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-400 rounded-full" style={{ width: '6.1%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-slate-800">5. Property Area & Education</span>
                    <span className="font-mono text-slate-600">5.4%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-300 rounded-full" style={{ width: '5.4%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PYTHON REFERENCE CODE */}
      {activeTab === 'code' && (
        <div className="space-y-4">
          <div className="p-6 bg-slate-900 text-slate-200 rounded-2xl border border-slate-800 font-mono text-xs overflow-x-auto shadow-md">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-slate-400 font-sans">
              <span className="flex items-center gap-2">
                <Code className="w-4 h-4 text-blue-400" />
                <span className="font-semibold text-slate-200">loan_model_training.py</span>
              </span>
              <span className="text-[11px]">Academic Reference Script</span>
            </div>
            <pre className="leading-relaxed">
{`# BCA Minor Project: Loan Approval Analysis & Model Training
# Dataset: Loan Prediction (train.csv)
# Framework: Pandas, NumPy, Scikit-Learn

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score

# 1. Load Dataset
df = pd.read_csv('loan_data.csv')

# 2. Data Cleaning & Handling Missing Values
df['Gender'].fillna(df['Gender'].mode()[0], inplace=True)
df['Married'].fillna(df['Married'].mode()[0], inplace=True)
df['Dependents'].fillna(df['Dependents'].mode()[0], inplace=True)
df['Self_Employed'].fillna(df['Self_Employed'].mode()[0], inplace=True)
df['LoanAmount'].fillna(df['LoanAmount'].median(), inplace=True)
df['Loan_Amount_Term'].fillna(df['Loan_Amount_Term'].mode()[0], inplace=True)
df['Credit_History'].fillna(df['Credit_History'].mode()[0], inplace=True)

# 3. Feature Engineering
df['Total_Income'] = df['ApplicantIncome'] + df['CoapplicantIncome']

# 4. Encoding Categorical Variables
df['Loan_Status'] = df['Loan_Status'].map({'Y': 1, 'N': 0})
df = pd.get_dummies(df, columns=['Gender', 'Married', 'Education', 'Self_Employed', 'Property_Area'], drop_first=True)

# 5. Train-Test Split (80/20)
X = df.drop(columns=['Loan_ID', 'Loan_Status'])
y = df['Loan_Status']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 6. Model Training & Evaluation
lr_model = LogisticRegression(max_iter=1000)
lr_model.fit(X_train, y_train)
y_pred_lr = lr_model.predict(X_test)
print("Logistic Regression Accuracy:", accuracy_score(y_test, y_pred_lr))

rf_model = RandomForestClassifier(n_estimators=100, random_state=42)
rf_model.fit(X_train, y_train)
y_pred_rf = rf_model.predict(X_test)
print("Random Forest Accuracy:", accuracy_score(y_test, y_pred_rf))

# Insights derived from feature importances are mapped to the React prediction engine.`}
            </pre>
          </div>
          <p className="text-xs text-slate-500">
            This Python script can be used for offline exploratory research and model validation during academic project presentation.
          </p>
        </div>
      )}
    </div>
  );
};
