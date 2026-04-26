import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import DashboardStats from '../components/DashboardStats';
import { User, Settings, Bell, Shield, Activity } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const Dashboard = () => {
  const { currentUser } = useAuth();

  return (
    <PageTransition className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col min-h-[calc(100vh-80px)]">
      {/* Background glow */}
      <div className="fixed top-1/4 left-0 w-full h-[500px] bg-primary-500/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

      {/* Header */}
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-5 h-5 text-green-400" />
            <span className="text-green-400 text-sm font-medium tracking-wider uppercase">Neural Sync Secure</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Biometric Telemetry</h1>
          <p className="text-gray-400 text-lg">Continuous live data stream from paired wearables.</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-500 text-sm font-bold mr-4">
            <Activity className="w-4 h-4 animate-pulse" />
            Live Monitoring
          </div>
          <button className="p-3 rounded-full glass-panel hover:bg-white/10 transition-colors relative">
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-ping" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
            <Bell className="w-6 h-6 text-gray-300" />
          </button>
          <button className="p-3 rounded-full glass-panel hover:bg-white/10 transition-colors">
            <Settings className="w-6 h-6 text-gray-300" />
          </button>
          <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-primary-500 to-accent-500 flex items-center justify-center p-0.5 glow-box ml-2">
            <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>
      </header>

      {/* Main Spacious Biometrics Layout */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex-1"
      >
        <DashboardStats />
      </motion.div>
    </PageTransition>
  );
};

export default Dashboard;
