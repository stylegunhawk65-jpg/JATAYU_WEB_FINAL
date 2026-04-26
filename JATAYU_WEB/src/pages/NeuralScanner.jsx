import React from 'react';
import PageTransition from '../components/PageTransition';
import MedicineScanner from '../components/dashboard/MedicineScanner';

const NeuralScanner = () => {
  return (
    <PageTransition className="pt-24 pb-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto flex flex-col h-[calc(100vh-80px)]">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Neural Object Recognition</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">Activate the camera to scan pills, medication bottles, or prescriptions. The neural engine instantly cross-references with your health profile for contraindications.</p>
      </div>

      <div className="flex-1 w-full relative z-10">
        <MedicineScanner />
      </div>
    </PageTransition>
  );
};

export default NeuralScanner;
