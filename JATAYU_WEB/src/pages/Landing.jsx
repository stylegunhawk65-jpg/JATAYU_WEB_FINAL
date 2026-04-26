import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HeroOrb from '../components/3d/HeroOrb';
import Feature3DCard from '../components/Feature3DCard';
import { Brain, Activity, ShieldAlert, Pill, Stethoscope, HeartPulse, Download, ChevronRight } from 'lucide-react';

const Landing = () => {
  const [isAndroid, setIsAndroid] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(userAgent)) {
      setIsAndroid(true);
    }
  }, []);

  const handleDownload = (e) => {
    if (isAndroid) {
      // Allow default behavior (which would be an a tag href to APK)
      console.log("Downloading APK for Android");
    } else {
      e.preventDefault();
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const features = [
    { title: "AI Diagnosis Engine", description: "Advanced neural networks predict health anomalies with 99.8% clinical accuracy before symptoms appear.", icon: Brain },
    { title: "Smartwatch BLE", description: "Real-time biometric syncing from any BLE-enabled smartwatch directly to your neural profile.", icon: Activity },
    { title: "SOS Emergency System", description: "2.5-second trigger latency for sending GPS, live vitals, and medical history to first responders.", icon: ShieldAlert },
    { title: "Medicine Scanner", description: "Instantly analyze contraindications and side effects via our computer vision API.", icon: Pill },
    { title: "Doctor Finder", description: "Algorithmically match with the highest-rated specialists in your proximity based on your precise condition.", icon: Stethoscope },
    { title: "Wellness Tools", description: "Personalized circadian rhythm optimization and stress management protocols.", icon: HeartPulse },
  ];

  return (
    <div className="w-full">
      {/* Toast Notification */}
      <div className={`fixed top-24 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <div className="glass-panel px-6 py-3 border-primary-500/50 text-white flex items-center gap-2 glow-box">
          <Activity className="w-4 h-4 text-primary-500" />
          <span>The mobile app is currently only available for Android devices.</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        <HeroOrb />
        
        <div className="relative z-10 text-center max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm text-primary-500 mb-8 border-primary-500/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
              </span>
              v2.0 Neural Engine Live
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              AI That Understands Your Health <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-500 glow-text">Before You Do</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Jatayu Health AI continuously analyzes your biometric data stream to predict, prevent, and protect. The future of personalized medicine is here.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="/jatayu-health.apk" 
                onClick={handleDownload}
                className="group relative flex items-center gap-2 px-8 py-4 rounded-full bg-primary-500 text-white font-bold text-lg overflow-hidden transition-all hover:scale-105 glow-box w-full sm:w-auto justify-center"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                <Download className="w-5 h-5" />
                Download App
              </a>
              <Link 
                to="/login"
                className="flex items-center gap-2 px-8 py-4 rounded-full glass-panel border border-white/20 text-white font-bold text-lg transition-all hover:bg-white/10 w-full sm:w-auto justify-center"
              >
                Try Web Demo
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
            
            <p className="mt-4 text-sm text-gray-500">
              {isAndroid ? "Android device detected. Tap to download APK." : "Web dashboard available for all devices."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Core <span className="text-primary-500">Architecture</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Built on a modular, privacy-first infrastructure designed to scale with your health needs.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: "1000px" }}>
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="h-[300px]"
              >
                <Feature3DCard {...feature} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SOS Section */}
      <section id="sos" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="glass-panel p-8 md:p-16 border-red-500/20 overflow-hidden relative">
            {/* Radar Background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-red-500/30" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-red-500/30" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-red-500/30" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-red-500/30" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-full bg-red-500/30" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-500 text-sm font-bold mb-6 border border-red-500/30">
                  <ShieldAlert className="w-4 h-4" />
                  EMERGENCY PROTOCOL
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Seconds Save Lives</h2>
                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                  Our SOS Emergency System triggers within 2.5 seconds. It instantly broadcasts your exact GPS coordinates, real-time vital statistics, and complete medical history to the nearest verified first responders and emergency contacts.
                </p>
                <div className="space-y-4">
                  {[
                    "Live Location Tracking",
                    "Medical History Broadcast",
                    "Automated Ambulance Dispatch"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center text-red-500">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-white font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-center">
                <motion.div 
                  className="relative w-48 h-48 md:w-64 md:h-64 rounded-full bg-red-500/20 flex items-center justify-center"
                  animate={{ 
                    boxShadow: ["0 0 0 0 rgba(239, 68, 68, 0.4)", "0 0 0 40px rgba(239, 68, 68, 0)", "0 0 0 80px rgba(239, 68, 68, 0)"] 
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <button className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-b from-red-500 to-red-700 shadow-[0_0_50px_rgba(239,68,68,0.8)] flex flex-col items-center justify-center border-4 border-red-400 hover:scale-95 transition-transform">
                    <ShieldAlert className="w-12 h-12 text-white mb-2" />
                    <span className="text-white font-bold text-xl md:text-2xl tracking-widest">SOS</span>
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Bottom CTA */}
      <footer className="py-12 border-t border-white/10 mt-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Activity className="w-6 h-6 text-primary-500" />
            <span className="font-bold text-xl tracking-wider text-white">Jatayu<span className="text-primary-500">AI</span></span>
          </div>
          <p className="text-gray-500 text-sm">© 2026 Jatayu Health AI. The future of healthcare.</p>
        </div>
      </footer>
      
      {/* Global Shimmer Animation for Buttons */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />
    </div>
  );
};

export default Landing;
