import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Coffee, BrainCircuit } from 'lucide-react';

const WellnessTools = () => {
  return (
    <div className="glass-panel p-6 h-full flex flex-col relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl" />
      
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-orange-500/20 text-orange-500">
          <Sun className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold">Circadian Rhythm</h3>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        {/* Circadian Arc Graphic */}
        <div className="relative h-32 w-full mb-6">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 200 100">
            <path 
              d="M 10 90 A 90 90 0 0 1 190 90" 
              fill="none" 
              stroke="rgba(255,255,255,0.1)" 
              strokeWidth="4" 
              strokeDasharray="5,5" 
            />
            {/* Active arc segment */}
            <motion.path 
              d="M 10 90 A 90 90 0 0 1 190 90" 
              fill="none" 
              stroke="#0ea5e9" 
              strokeWidth="6" 
              strokeDasharray="280"
              initial={{ strokeDashoffset: 280 }}
              animate={{ strokeDashoffset: 140 }} // Halfway through the day
              transition={{ duration: 2, ease: "easeOut" }}
            />
            {/* Current Time Dot */}
            <motion.circle 
              cx="100" cy="10" r="6" fill="#fff" 
              className="drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            />
          </svg>
          
          <div className="absolute bottom-0 left-0 text-xs text-gray-400 flex items-center gap-1"><Sun className="w-3 h-3"/> 06:30 AM</div>
          <div className="absolute bottom-0 right-0 text-xs text-gray-400 flex items-center gap-1"><Moon className="w-3 h-3"/> 08:45 PM</div>
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm font-bold text-white bg-primary-500/20 px-3 py-1 rounded-full">
            Peak Energy
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BrainCircuit className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-sm font-bold">Focus Protocol</p>
                <p className="text-xs text-gray-400">Binaural beats active</p>
              </div>
            </div>
            <div className="w-10 h-6 bg-primary-500 rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
             <div className="flex items-center gap-3">
              <Coffee className="w-5 h-5 text-orange-400" />
              <div>
                <p className="text-sm font-bold">Caffeine Cutoff</p>
                <p className="text-xs text-gray-400">In 2 hours, 15 mins</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellnessTools;
