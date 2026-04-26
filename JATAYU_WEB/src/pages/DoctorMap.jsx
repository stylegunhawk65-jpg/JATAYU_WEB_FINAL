import React from 'react';
import PageTransition from '../components/PageTransition';
import DoctorFinder from '../components/dashboard/DoctorFinder';

const DoctorMap = () => {
  return (
    <PageTransition className="pt-24 pb-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col h-[calc(100vh-80px)]">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Neural Match Network</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">Connecting you to top-rated specialists algorithmically matched to your specific biometric profile and AI diagnostic results.</p>
      </div>

      <div className="flex-1 w-full relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="h-full">
           <DoctorFinder />
         </div>
         <div className="hidden md:block h-full glass-panel border-white/10 relative overflow-hidden">
             {/* Large simulated map view */}
            <div className="absolute inset-0 opacity-40" style={{
              backgroundImage: 'radial-gradient(circle at center, transparent 0%, #000 100%), repeating-linear-gradient(45deg, #1f2937 25%, transparent 25%, transparent 75%, #1f2937 75%, #1f2937), repeating-linear-gradient(45deg, #1f2937 25%, #111827 25%, #111827 75%, #1f2937 75%, #1f2937)',
              backgroundPosition: '0 0, 20px 20px',
              backgroundSize: '40px 40px'
            }} />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                 <div className="relative mx-auto mb-4 w-12 h-12">
                   <div className="absolute inset-0 bg-primary-500 rounded-full animate-ping opacity-50" />
                   <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center border-4 border-[#030712] shadow-lg relative z-10" />
                 </div>
                 <p className="text-white font-bold bg-black/50 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">Your Neural Node</p>
              </div>
            </div>
         </div>
      </div>
    </PageTransition>
  );
};

export default DoctorMap;
