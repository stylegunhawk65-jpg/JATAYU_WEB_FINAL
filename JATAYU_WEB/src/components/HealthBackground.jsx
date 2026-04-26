import React from 'react';
import { motion } from 'framer-motion';

const HealthBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden">
      {/* Medical cross pattern grid */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #0ea5e9 2px, transparent 2px),
            linear-gradient(to bottom, #0ea5e9 2px, transparent 2px)
          `,
          backgroundSize: '100px 100px',
          backgroundPosition: 'center center'
        }}
      />
      
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #0ea5e9 1px, transparent 1px),
            linear-gradient(to bottom, #0ea5e9 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          backgroundPosition: 'center center'
        }}
      />

      {/* Floating Medical Crosses */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-primary-500/10"
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight,
            rotate: 0,
            scale: 0.5 + Math.random() * 1.5
          }}
          animate={{ 
            y: [null, Math.random() * -200 - 100],
            rotate: 360,
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: 15 + Math.random() * 15, 
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="currentColor">
            <path d="M16 0h8v16h16v8H24v16h-8V24H0v-8h16V0z" />
          </svg>
        </motion.div>
      ))}

      {/* Giant EKG heartbeat line in the background */}
      <div className="absolute top-1/2 left-0 w-full h-[300px] -translate-y-1/2 opacity-[0.04]">
        <svg preserveAspectRatio="none" className="w-full h-full" viewBox="0 0 1000 100">
          <motion.path
            d="M0 50 L 300 50 L 320 20 L 340 80 L 360 10 L 380 90 L 400 50 L 700 50 L 720 30 L 740 70 L 760 50 L 1000 50"
            fill="none"
            stroke="#0ea5e9"
            strokeWidth="2"
            initial={{ pathLength: 0, pathOffset: 1 }}
            animate={{ pathLength: 1, pathOffset: 0 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </div>

      {/* Radial gradient overlay to blend the edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#030712_80%)]" />
    </div>
  );
};

export default HealthBackground;
