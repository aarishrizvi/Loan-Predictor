/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LoadingState } from './components/LoadingState';
import { Home } from './pages/Home';
import { Apply } from './pages/Apply';
import { Result } from './pages/Result';
import { Analysis } from './pages/Analysis';
import { About } from './pages/About';
import { LoanApplication, PredictionResult } from './types/loan';
import { predictLoanApproval } from './services/predictionEngine';

const STORAGE_KEY_APPLICATION = 'loanpredict_application_data';
const STORAGE_KEY_RESULT = 'loanpredict_result_data';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'apply' | 'result' | 'analysis' | 'about'>('home');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentApplication, setCurrentApplication] = useState<LoanApplication | undefined>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_APPLICATION);
      return saved ? JSON.parse(saved) : undefined;
    } catch {
      return undefined;
    }
  });
  const [currentResult, setCurrentResult] = useState<PredictionResult | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_RESULT);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Pending application while loading screen runs
  const [pendingApplication, setPendingApplication] = useState<LoanApplication | null>(null);

  const handleStartAnalysis = (data: LoanApplication) => {
    setPendingApplication(data);
    setIsLoading(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadingComplete = () => {
    if (pendingApplication) {
      const result = predictLoanApproval(pendingApplication);
      setCurrentApplication(pendingApplication);
      setCurrentResult(result);

      // Save to localStorage for persistence
      try {
        localStorage.setItem(STORAGE_KEY_APPLICATION, JSON.stringify(pendingApplication));
        localStorage.setItem(STORAGE_KEY_RESULT, JSON.stringify(result));
      } catch (e) {
        console.error('LocalStorage write error:', e);
      }

      setIsLoading(false);
      setActiveTab('result');
      setPendingApplication(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsLoading(false);
    }
  };

  const handleModifyApplication = (data: LoanApplication) => {
    setCurrentApplication(data);
    setActiveTab('apply');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartNewPrediction = () => {
    setCurrentApplication(undefined);
    setCurrentResult(null);
    try {
      localStorage.removeItem(STORAGE_KEY_APPLICATION);
      localStorage.removeItem(STORAGE_KEY_RESULT);
    } catch (e) {
      console.error('LocalStorage error:', e);
    }
    setActiveTab('apply');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearSavedData = () => {
    setCurrentApplication(undefined);
    setCurrentResult(null);
    try {
      localStorage.removeItem(STORAGE_KEY_APPLICATION);
      localStorage.removeItem(STORAGE_KEY_RESULT);
    } catch (e) {
      console.error('LocalStorage error:', e);
    }
  };

  const handleSelectSample = (sample: LoanApplication) => {
    setCurrentApplication(sample);
    setActiveTab('apply');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        onNavigate={(tab) => {
          setIsLoading(false);
          setActiveTab(tab);
        }}
        hasResult={!!currentResult}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {isLoading ? (
          <div className="py-20 px-4">
            <LoadingState onComplete={handleLoadingComplete} />
          </div>
        ) : (
          <>
            {activeTab === 'home' && (
              <Home
                onNavigate={(tab) => {
                  setActiveTab(tab);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onSelectSample={handleSelectSample}
              />
            )}

            {activeTab === 'apply' && (
              <Apply
                initialData={currentApplication}
                onSubmit={handleStartAnalysis}
                onClearData={handleClearSavedData}
              />
            )}

            {activeTab === 'result' && (
              currentResult ? (
                <Result
                  result={currentResult}
                  onModify={handleModifyApplication}
                  onNewPrediction={handleStartNewPrediction}
                />
              ) : (
                <Apply
                  initialData={currentApplication}
                  onSubmit={handleStartAnalysis}
                  onClearData={handleClearSavedData}
                />
              )
            )}

            {activeTab === 'analysis' && <Analysis />}

            {activeTab === 'about' && <About />}
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={(tab) => {
          setIsLoading(false);
          setActiveTab(tab);
        }}
      />
    </div>
  );
}
