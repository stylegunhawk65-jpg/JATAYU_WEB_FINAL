import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Heart, Droplets, Thermometer, Wind } from 'lucide-react';

const StatCard = ({ title, value, unit, icon: Icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="glass-panel p-6 relative overflow-hidden group"
  >
    <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-10 blur-xl bg-${color}-500 group-hover:scale-150 transition-transform duration-500`} />
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
        <div className="flex items-baseline gap-1">
          <h3 className="text-3xl font-bold text-white">{value}</h3>
          <span className="text-sm text-gray-500">{unit}</span>
        </div>
      </div>
      <div className={`p-3 rounded-xl bg-white/5 text-${color}-400`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
    
    {/* Animated Mini Chart Line */}
    <div className="h-10 w-full mt-4 flex items-end gap-1">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className={`w-full rounded-t-sm bg-${color}-500/50`}
          initial={{ height: "10%" }}
          animate={{ height: `${20 + Math.random() * 80}%` }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.1
          }}
        />
      ))}
    </div>
  </motion.div>
);

const DashboardStats = () => {
  const [heartRate, setHeartRate] = useState(72);
  const [spo2, setSpo2] = useState(98);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setHeartRate(prev => {
        const change = Math.floor(Math.random() * 5) - 2;
        return Math.max(60, Math.min(100, prev + change));
      });
      
      setSpo2(prev => {
        // Very rarely drop below 95
        if (Math.random() > 0.95) return 97;
        return 98 + Math.floor(Math.random() * 2);
      });
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">Real-time Biometrics</h2>
          <p className="text-sm text-gray-400">Live sync from wearable neural-link</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-primary-500 bg-primary-500/10 px-3 py-1 rounded-full border border-primary-500/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
          </span>
          Syncing Active
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Heart Rate" value={heartRate} unit="bpm" icon={Heart} color="red" delay={0.1} />
        <StatCard title="Blood Oxygen" value={spo2} unit="%" icon={Wind} color="primary" delay={0.2} />
        <StatCard title="Body Temp" value="98.6" unit="°F" icon={Thermometer} color="orange" delay={0.3} />
        <StatCard title="Hydration" value="64" unit="%" icon={Droplets} color="blue" delay={0.4} />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="glass-panel p-6 mt-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold">Neural Activity & Stress Level</h3>
          <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-sm outline-none">
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
        </div>
        
        {/* Decorative Main Chart */}
        <div className="h-64 w-full relative flex items-end">
          <div className="absolute inset-0 flex flex-col justify-between py-2 pointer-events-none">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-full h-px bg-white/5" />
            ))}
          </div>
          
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(139, 92, 246, 0.5)" />
                <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
              </linearGradient>
            </defs>
            <motion.path
              d="M0 80 Q 10 70, 20 80 T 40 60 T 60 75 T 80 40 T 100 50 L 100 100 L 0 100 Z"
              fill="url(#gradient)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            />
            <motion.path
              d="M0 80 Q 10 70, 20 80 T 40 60 T 60 75 T 80 40 T 100 50"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
              className="drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]"
            />
            
            {/* Real-time moving point */}
            <motion.circle
              cx="100"
              cy="50"
              r="2"
              fill="#fff"
              className="drop-shadow-[0_0_10px_rgba(255,255,255,1)]"
              animate={{ r: [2, 4, 2] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </svg>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardStats;
