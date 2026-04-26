import React from 'react';
import PageTransition from '../components/PageTransition';
import AIChat from '../components/AIChat';
import { Brain } from 'lucide-react';

const AiDiagnosis = () => {
  return (
    <PageTransition className="pt-24 pb-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col h-[calc(100vh-80px)] relative">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-[100px] -z-10" />

      <div className="text-center mb-8">
        <div className="inline-flex justify-center items-center p-3 rounded-2xl bg-primary-500/20 text-primary-500 glow-box mb-4">
          <Brain className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold mb-2">Neural Diagnosis Engine</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">Describe your symptoms naturally. The AI uses predictive modeling against 10 million medical data points to provide probabilistic diagnostics.</p>
      </div>

      <div className="flex-1 w-full relative z-10">
        <AIChat fullScreen />
      </div>
    </PageTransition>
  );
};

export default AiDiagnosis;
