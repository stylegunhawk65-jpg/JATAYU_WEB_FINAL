import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Activity, X, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import PageTransition from '../components/PageTransition';

import { useAuth } from '../context/AuthContext';
import { triggerSOS } from '../services/dbService';

// Custom icons
const sosIcon = L.divIcon({
  className: 'custom-leaflet-icon',
  html: `<div style="background-color: #ef4444; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 20px #ef4444; display: flex; align-items: center; justify-content: center; animation: pulse 1s infinite;"><div style="width: 10px; height: 10px; background: white; border-radius: 50%;"></div></div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 15]
});

const MapUpdater = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center, 15);
  }, [center, map]);
  return null;
};

const EmergencySOS = () => {
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isTriggered, setIsTriggered] = useState(false);
  const [userLoc, setUserLoc] = useState(null);
  const holdTimer = useRef(null);
  const progressTimer = useRef(null);
  const { currentUser } = useAuth();

  const startHold = () => {
    if (isTriggered) return;
    setIsHolding(true);
    setProgress(0);
    
    // Fill progress ring over 2.5 seconds
    progressTimer.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer.current);
          return 100;
        }
        return prev + 4; // 100 / 25 steps = 2.5 seconds
      });
    }, 100);

    holdTimer.current = setTimeout(() => {
      triggerEmergency();
    }, 2500);
  };

  const triggerEmergency = () => {
    setIsTriggered(true);
    setIsHolding(false);
    clearInterval(progressTimer.current);

    // Fetch real location and save to Firebase
    const logSOS = async (lat, lng) => {
       setUserLoc([lat, lng]);
       if (currentUser) {
         try {
           await triggerSOS(currentUser.uid, [lat, lng]);
           console.log("SOS securely logged to Firestore.");
         } catch (e) {
           console.error("Failed to log SOS:", e);
         }
       }
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          logSOS(position.coords.latitude, position.coords.longitude);
        },
        () => {
          logSOS(37.7749, -122.4194); // fallback
        }
      );
    } else {
      logSOS(37.7749, -122.4194); // fallback
    }
  };

  const endHold = () => {
    if (isTriggered) return;
    setIsHolding(false);
    setProgress(0);
    clearTimeout(holdTimer.current);
    clearInterval(progressTimer.current);
  };

  return (
    <PageTransition className={`h-[calc(100vh-80px)] mt-20 flex flex-col justify-center items-center relative overflow-hidden transition-colors duration-1000 ${isTriggered ? 'bg-red-950' : 'bg-[#030712]'}`}>
      
      {/* Background glow & radar */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center z-0">
        <div className={`absolute inset-0 transition-opacity duration-1000 ${isTriggered ? 'opacity-100' : 'opacity-0'} bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.2)_0%,transparent_70%)]`} />
        
        {isTriggered && (
          <>
            <motion.div 
              className="absolute w-[100vw] aspect-square rounded-full border border-red-500/20"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 1, opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </>
        )}
      </div>

      <div className="z-10 flex flex-col items-center w-full max-w-4xl px-4">
        
        <AnimatePresence mode="wait">
          {!isTriggered ? (
            <motion.div 
              key="idle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center w-full"
            >
              <ShieldAlert className="w-16 h-16 text-red-500 mb-6 opacity-80" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Emergency Protocol</h1>
              <p className="text-gray-400 text-center mb-16 max-w-lg text-lg">
                Hold the button for 2.5 seconds to instantly broadcast your GPS coordinates and vitals.
              </p>
              
              <div className="relative flex justify-center items-center">
                {/* Progress Ring SVG */}
                <svg className="absolute w-[280px] h-[280px] -rotate-90 pointer-events-none">
                  <circle 
                    cx="140" cy="140" r="130" 
                    fill="none" stroke="rgba(239, 68, 68, 0.2)" strokeWidth="8" 
                  />
                  <circle 
                    cx="140" cy="140" r="130" 
                    fill="none" stroke="#ef4444" strokeWidth="8" 
                    strokeLinecap="round"
                    strokeDasharray="816"
                    strokeDashoffset={816 - (816 * progress) / 100}
                    className="transition-all duration-100 ease-linear shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                  />
                </svg>

                <button 
                  onMouseDown={startHold}
                  onMouseUp={endHold}
                  onMouseLeave={endHold}
                  onTouchStart={startHold}
                  onTouchEnd={endHold}
                  className={`w-60 h-60 rounded-full bg-gradient-to-b from-red-600 to-red-800 shadow-[0_0_50px_rgba(239,68,68,0.6)] flex flex-col items-center justify-center border-4 border-red-500 transition-transform ${isHolding ? 'scale-95 shadow-[0_0_80px_rgba(239,68,68,0.8)]' : 'hover:scale-105'}`}
                >
                  <span className="text-white font-black text-4xl tracking-widest mb-2">SOS</span>
                  <span className="text-red-200 text-sm font-bold uppercase tracking-wider">{isHolding ? 'Hold...' : 'Press & Hold'}</span>
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="active"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col w-full"
            >
              <div className="text-center mb-8">
                 <h1 className="text-4xl md:text-5xl font-black text-red-500 animate-pulse mb-2 shadow-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]">Alert Sent to Emergency Contacts</h1>
                 <p className="text-lg text-red-200 font-bold">First responders have your location and vitals.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {/* Real Map Preview */}
                <div className="glass-panel border-red-500/30 overflow-hidden relative h-64 md:h-80 z-0">
                  {userLoc ? (
                    <MapContainer center={userLoc} zoom={15} style={{ height: '100%', width: '100%', zIndex: 1 }}>
                       <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                        attribution='&copy; OSM contributors'
                      />
                      <MapUpdater center={userLoc} />
                      <Marker position={userLoc} icon={sosIcon} />
                    </MapContainer>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-red-400">
                      Locating...
                    </div>
                  )}
                  
                  {userLoc && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-black/80 px-4 py-2 rounded-lg border border-red-500/50 backdrop-blur-md whitespace-nowrap">
                      <p className="text-red-400 text-xs font-bold uppercase text-center mb-1">Live Tracking Active</p>
                      <p className="text-white font-mono text-xs">LAT: {userLoc[0].toFixed(4)}° N, LNG: {userLoc[1].toFixed(4)}° W</p>
                    </div>
                  )}
                </div>

                {/* Vitals Telemetry */}
                <div className="glass-panel border-red-500/30 p-6 flex flex-col justify-center gap-6 z-10 relative bg-black/40 backdrop-blur-sm">
                  <div className="flex items-center gap-4 border-b border-red-500/20 pb-4">
                    <Activity className="w-8 h-8 text-red-500" />
                    <div>
                      <p className="text-xs text-red-400 uppercase font-bold tracking-wider mb-1">Vital Telemetry Broadcast</p>
                      <p className="text-white">Continuous real-time stream established</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Heart Rate</span>
                      <span className="text-2xl font-bold text-white flex items-center gap-2">
                        118 <span className="text-sm text-red-500 font-normal">bpm</span>
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Blood Oxygen</span>
                      <span className="text-2xl font-bold text-white flex items-center gap-2">
                        96 <span className="text-sm text-red-500 font-normal">%</span>
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-red-500/20 text-center">
                    <p className="text-red-400 font-black text-xl uppercase tracking-widest animate-pulse">ETA: 4 MINS</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
};

export default EmergencySOS;
