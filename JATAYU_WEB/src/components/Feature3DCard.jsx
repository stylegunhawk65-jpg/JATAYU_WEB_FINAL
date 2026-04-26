import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const Feature3DCard = ({ title, description, icon: Icon }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="relative w-full h-full rounded-2xl glass-panel p-8 group transition-all duration-300 hover:glow-box hover:border-primary-500/50 cursor-pointer"
    >
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.1) 0%, transparent 60%)'
        }}
      />
      
      <div style={{ transform: "translateZ(50px)" }} className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-primary-500/20 text-primary-500 flex items-center justify-center mb-6 glow-box">
          <Icon className="w-6 h-6" />
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3 tracking-wide">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

export default Feature3DCard;
