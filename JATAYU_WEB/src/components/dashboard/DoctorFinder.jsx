import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Stethoscope, Star, Phone, Activity } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Custom icons using HTML
const createCustomIcon = (color) => L.divIcon({
  className: 'custom-leaflet-icon',
  html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px ${color}; display: flex; align-items: center; justify-content: center;"><div style="width: 8px; height: 8px; background: white; border-radius: 50%;"></div></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

const userIcon = createCustomIcon('#0ea5e9'); // Primary blue
const doctorIcon = createCustomIcon('#8b5cf6'); // Purple

// Component to dynamically update map center
const MapUpdater = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, 13);
    }
  }, [center, map]);
  return null;
};

const DoctorFinder = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loadingLoc, setLoadingLoc] = useState(true);

  useEffect(() => {
    // Generate fake doctors based on location
    const generateDoctors = (lat, lng) => {
      return [
        { id: 1, name: "Dr. Sarah Chen", specialty: "Cardiologist", rating: 4.9, match: 98, phone: "555-0101", lat: lat + 0.01, lng: lng + 0.01 },
        { id: 2, name: "Dr. James Wilson", specialty: "Neurologist", rating: 4.8, match: 92, phone: "555-0102", lat: lat - 0.015, lng: lng + 0.005 },
        { id: 3, name: "Dr. Elena Rodriguez", specialty: "General Practice", rating: 4.7, match: 85, phone: "555-0103", lat: lat + 0.005, lng: lng - 0.02 }
      ];
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setUserLocation([lat, lng]);
          setDoctors(generateDoctors(lat, lng));
          setLoadingLoc(false);
        },
        (error) => {
          console.warn("Geolocation denied or failed. Using fallback.", error);
          // Fallback to San Francisco
          const lat = 37.7749;
          const lng = -122.4194;
          setUserLocation([lat, lng]);
          setDoctors(generateDoctors(lat, lng));
          setLoadingLoc(false);
        }
      );
    } else {
      // Fallback
      const lat = 37.7749;
      const lng = -122.4194;
      setUserLocation([lat, lng]);
      setDoctors(generateDoctors(lat, lng));
      setLoadingLoc(false);
    }
  }, []);

  return (
    <div className="glass-panel p-6 h-full flex flex-col relative">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-accent-500/20 text-accent-500">
          <Stethoscope className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold">Find Doctors</h3>
          <p className="text-xs text-gray-400">Locating specialists near you</p>
        </div>
      </div>

      <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-6 border border-white/10 bg-[#0a0a0a] z-0">
        {loadingLoc || !userLocation ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 z-10">
            <Activity className="w-8 h-8 text-primary-500 animate-spin mb-4" />
            <p className="text-white text-sm">Acquiring GPS Signal...</p>
          </div>
        ) : (
          <MapContainer center={userLocation} zoom={13} style={{ height: '100%', width: '100%', zIndex: 1 }}>
            {/* Dark theme OpenStreetMap tiles via Carto */}
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
            <MapUpdater center={userLocation} />
            
            {/* User Location */}
            <Marker position={userLocation} icon={userIcon}>
              <Popup className="custom-popup">
                <div className="text-gray-900 font-bold p-1">Your Location</div>
              </Popup>
            </Marker>

            {/* Doctors */}
            {doctors.map(doc => (
              <Marker key={doc.id} position={[doc.lat, doc.lng]} icon={doctorIcon}>
                <Popup>
                  <div className="text-gray-900 p-1 min-w-[150px]">
                    <h4 className="font-bold text-sm">{doc.name}</h4>
                    <p className="text-xs text-gray-600 mb-2">{doc.specialty}</p>
                    <div className="flex items-center gap-1 text-xs font-bold text-purple-600 bg-purple-100 p-1 rounded mb-2">
                       {doc.match}% Neural Match
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Phone className="w-3 h-3" /> {doc.phone}
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar z-10">
        {doctors.map((doc) => (
          <motion.div 
            key={doc.id}
            whileHover={{ scale: 1.02 }}
            className="p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between bg-white/5 border-white/10 hover:bg-white/10"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden border border-white/20 shrink-0">
                 <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${doc.name}`} alt={doc.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">{doc.name}</h4>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>{doc.specialty}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1 text-yellow-400 text-xs font-bold mb-1">
                <Star className="w-3 h-3 fill-current" />
                {doc.rating}
              </div>
              <div className="text-[10px] bg-accent-500/20 text-accent-400 px-1.5 py-0.5 rounded uppercase tracking-wider font-bold">
                {doc.match}% Match
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DoctorFinder;
