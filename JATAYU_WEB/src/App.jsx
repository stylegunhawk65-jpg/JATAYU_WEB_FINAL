import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import HealthBackground from './components/HealthBackground';

// Pages
import HomeIntro from './pages/HomeIntro';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AiDiagnosis from './pages/AiDiagnosis';
import NeuralScanner from './pages/NeuralScanner';
import EmergencySOS from './pages/EmergencySOS';
import DoctorMap from './pages/DoctorMap';
import AppDownload from './pages/AppDownload';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Extracted routes to use useLocation
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomeIntro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/app" element={<AppDownload />} />
        
        {/* Protected App Modules */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/chat" element={<ProtectedRoute><AiDiagnosis /></ProtectedRoute>} />
        <Route path="/scanner" element={<ProtectedRoute><NeuralScanner /></ProtectedRoute>} />
        <Route path="/doctors" element={<ProtectedRoute><DoctorMap /></ProtectedRoute>} />
        <Route path="/sos" element={<ProtectedRoute><EmergencySOS /></ProtectedRoute>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-[#030712] text-white relative">
          <HealthBackground />
          <Navbar />
          
          {/* Global Sticky Download Button */}
          <div className="fixed bottom-6 right-6 z-50">
            <a 
              href="/app"
              className="group flex items-center gap-2 px-6 py-4 rounded-full bg-primary-500 text-white font-bold shadow-[0_0_20px_rgba(14,165,233,0.5)] hover:scale-105 transition-all overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download App
            </a>
          </div>

          <main className="flex-1 w-full relative z-10">
            <AnimatedRoutes />
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
