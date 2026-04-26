import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, MapPin, Activity, X } from 'lucide-react';

const SOSButton = () => {
  const [isTriggered, setIsTriggered] = useState(false);

  const handleTrigger = () => {
    setIsTriggered(true);
    // Auto reset for demo purposes after 5 seconds
    setTimeout(() => {
      setIsTriggered(false);
    }, 5000);
  };

  return (
    <div className={`glass-panel p-6 h-full flex flex-col justify-center items-center relative overflow-hidden transition-colors duration-500 ${isTriggered ? 'border-red-500/50 bg-red-500/10' : ''}`}>
      
      {isTriggered && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-red-500/20 animate-pulse" />
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] aspect-square rounded-full border border-red-500/30"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 1, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] aspect-square rounded-full border border-red-500/30"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 1, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }}
          />
        </div>
      )}

      <AnimatePresence mode="wait">
        {!isTriggered ? (
          <motion.div 
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center z-10 w-full"
          >
            <h3 className="text-xl font-bold mb-2">Emergency Protocol</h3>
            <p className="text-xs text-gray-400 text-center mb-6">Hold to broadcast vitals & GPS</p>
            
            <button 
              onClick={handleTrigger}
              className="w-32 h-32 rounded-full bg-gradient-to-b from-red-500 to-red-700 shadow-[0_0_30px_rgba(239,68,68,0.5)] flex flex-col items-center justify-center border-4 border-red-400 hover:scale-95 transition-transform group relative"
            >
              <div className="absolute inset-0 rounded-full bg-red-400 opacity-0 group-hover:opacity-20 transition-opacity" />
              <ShieldAlert className="w-10 h-10 text-white mb-1" />
              <span className="text-white font-bold text-xl tracking-widest">SOS</span>
            </button>
          </motion.div>
        ) : (
          <motion.div 
            key="active"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col w-full z-10"
          >
            <div className="flex justify-between items-start mb-4">
               <div>
                 <h3 className="text-xl font-bold text-red-500 animate-pulse">SOS TRIGGERED</h3>
                 <p className="text-sm text-red-300">Dispatching First Responders...</p>
               </div>
               <button onClick={() => setIsTriggered(false)} className="p-1 rounded-full hover:bg-white/10 text-gray-400 hover:text-white">
                 <X className="w-5 h-5" />
               </button>
            </div>

            <div className="space-y-3">
              <div className="bg-black/40 border border-red-500/30 p-3 rounded-lg flex items-center gap-3">
                <MapPin className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">Location Broadcast</p>
                  <p className="text-sm font-mono text-white">LAT: 37.7749 N, LNG: 122.4194 W</p>
                </div>
              </div>
              <div className="bg-black/40 border border-red-500/30 p-3 rounded-lg flex items-center gap-3">
                <Activity className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">Vital Telemetry</p>
                  <p className="text-sm text-white">Transmitting HR, SpO2, ECG live</p>
                </div>
              </div>
            </div>
            
            <p className="text-center text-xs text-red-400 mt-4 font-bold uppercase tracking-wider">
               ETA: 4 Mins
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SOSButton;
