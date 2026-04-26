import React from 'react';
import { motion } from 'framer-motion';
import { Download, Shield, Zap, Activity } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const AppDownload = () => {
  const handleDownload = () => {
    if (/Android/i.test(navigator.userAgent)) {
      window.location.href = "https://drive.google.com/uc?export=download&id=1d_qMdXIwHdBMxB1s-grOHChRpuYf7I9j";
    } else {
      alert("App is currently available only for Android devices.");
    }
  };

  return (
    <PageTransition className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 min-h-[calc(100vh-80px)] relative">
      
      {/* Left side text content */}
      <div className="flex-1 lg:pr-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/20 text-primary-500 mb-6 border border-primary-500/30">
          <Zap className="w-4 h-4" /> v2.0 Neural Engine
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          The Full Experience Lives in Your Pocket
        </h1>
        
        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
          While this web demo provides a glimpse into our capabilities, the true autonomous power of Jatayu Health AI requires continuous background telemetry available only in our native Android application.
        </p>
        
        <div className="space-y-6 mb-10">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-white/5 text-primary-500 mt-1">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Continuous Background Sync</h3>
              <p className="text-gray-400">Maintains a persistent BLE connection with your smartwatch 24/7 without draining battery.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-white/5 text-red-500 mt-1">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Hardware SOS Integration</h3>
              <p className="text-gray-400">Map the emergency protocol directly to your phone's physical hardware buttons.</p>
            </div>
          </div>
        </div>
        
        <button
          type="button"
          onClick={handleDownload}
          className="group relative inline-flex items-center gap-3 px-8 py-5 rounded-xl bg-primary-500 text-white font-bold text-xl overflow-hidden transition-all hover:scale-105 glow-box w-full sm:w-auto justify-center"
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
          <Download className="w-6 h-6" />
          Download Now
        </button>

        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-gray-200">App version: v1.0</span>
          <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-gray-200">File size: ~117MB</span>
          <span className="px-3 py-1 rounded-full bg-green-500/15 border border-green-400/30 text-green-300">Android only</span>
        </div>
      </div>
      
      {/* Right side 3D Phone Mockup (Simulated with CSS) */}
      <div className="flex-1 flex justify-center w-full">
        <motion.div 
          className="relative w-[300px] h-[600px] rounded-[3rem] border-[8px] border-gray-800 bg-black shadow-2xl overflow-hidden"
          initial={{ y: 50, rotateY: -15, rotateX: 5 }}
          animate={{ y: 0, rotateY: [-15, 15, -15] }}
          transition={{ 
            y: { duration: 1, ease: "easeOut" },
            rotateY: { duration: 10, repeat: Infinity, ease: "linear" }
          }}
          style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
        >
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-gray-800 rounded-b-2xl z-20" />
          
          {/* Screen Content Simulation */}
          <div className="absolute inset-0 bg-[#030712] p-4 pt-10 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-white font-bold text-lg">JatayuAI</h2>
              <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-500">
                <Activity className="w-4 h-4" />
              </div>
            </div>
            
            <div className="glass-panel p-4 mb-4 rounded-2xl">
              <p className="text-gray-400 text-xs mb-1">Heart Rate</p>
              <p className="text-3xl font-bold text-white mb-2">72 <span className="text-sm text-red-500 font-normal">bpm</span></p>
              <div className="h-10 w-full bg-red-500/10 rounded-lg relative overflow-hidden">
                <motion.div 
                  className="absolute inset-0 border-b-2 border-red-500"
                  animate={{ y: [0, -10, 10, -5, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </div>
            
            <div className="glass-panel p-4 mb-4 rounded-2xl flex-1 flex flex-col">
               <p className="text-gray-400 text-xs mb-2">Diagnosis Engine</p>
               <div className="flex-1 space-y-2">
                 <div className="w-3/4 h-8 bg-white/10 rounded-lg rounded-tl-none self-start" />
                 <div className="w-3/4 h-8 bg-primary-500/20 rounded-lg rounded-tr-none self-end ml-auto" />
                 <div className="w-full h-8 bg-white/10 rounded-lg rounded-tl-none self-start" />
               </div>
            </div>
            
            <div className="w-full py-3 rounded-full bg-red-600 text-center text-white font-bold tracking-widest mt-auto shadow-[0_0_15px_rgba(239,68,68,0.5)]">
              SOS
            </div>
          </div>
          
          {/* Glass glare effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/20 pointer-events-none" />
        </motion.div>
      </div>

    </PageTransition>
  );
};

export default AppDownload;
