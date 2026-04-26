import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HeroOrb from '../components/3d/HeroOrb'; // DNA Helix
import { ChevronRight, Download } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const HomeIntro = () => {
  return (
    <PageTransition className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
      <HeroOrb />
      
      <div className="relative z-10 text-center max-w-4xl px-4 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass-panel text-sm text-primary-500 mb-8 border-primary-500/30 glow-box">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            Live Demo Active
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
            Understand Your Health <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-500 glow-text pb-4">with AI</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed border-l-4 border-primary-500 pl-4 text-left glass-panel p-4 rounded-r-xl">
            <strong>IMPORTANT:</strong> This is a live demo. Our full system runs in our mobile app.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-md mx-auto">
            <Link 
              to="/dashboard"
              className="flex items-center gap-2 px-8 py-5 rounded-xl glass-panel border border-white/20 text-white font-bold text-xl transition-all hover:bg-white/10 w-full justify-center group"
            >
              Try Demo
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              to="/app"
              className="group relative flex items-center gap-3 px-8 py-5 rounded-xl bg-primary-500 text-white font-bold text-xl overflow-hidden transition-all hover:scale-105 glow-box w-full justify-center"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              <Download className="w-6 h-6" />
              Download App
            </Link>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default HomeIntro;
