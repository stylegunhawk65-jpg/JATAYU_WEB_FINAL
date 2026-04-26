import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Activity, Menu, User, LogOut, Download, MapPin, Brain, ShieldAlert, Scan, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const NavItem = ({ to, icon: Icon, label }) => {
    const isActive = location.pathname === to;
    return (
      <Link 
        to={to} 
        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${isActive ? 'bg-primary-500/20 text-primary-500 glow-text border border-primary-500/30' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
      >
        <Icon className="w-4 h-4" />
        <span className="hidden lg:inline">{label}</span>
      </Link>
    );
  };

  return (
    <nav className="fixed w-full z-50 glass-panel border-b border-white/10 top-0">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-primary-500/20 text-primary-500 glow-box">
                <Activity className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="font-bold text-xl tracking-wider text-white glow-text hidden sm:block">
                Jatayu<span className="text-primary-500">AI</span>
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex flex-1 justify-center px-8">
            {currentUser && (
              <div className="flex items-center gap-2 bg-black/40 p-1.5 rounded-xl border border-white/10">
                <NavItem to="/dashboard" icon={LayoutDashboard} label="Health Dashboard" />
                <NavItem to="/chat" icon={Brain} label="AI Health Chat" />
                <NavItem to="/scanner" icon={Scan} label="Medicine Scanner" />
                <NavItem to="/doctors" icon={MapPin} label="Find Doctors" />
                <NavItem to="/sos" icon={ShieldAlert} label="Emergency SOS" />
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            {currentUser ? (
              <>
                <Link to="/app" className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-500/20 text-primary-500 border border-primary-500/30 hover:bg-primary-500 hover:text-white text-sm font-bold transition-all">
                  <Download className="w-4 h-4" />
                  Get App
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-2 p-2 sm:px-4 sm:py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-red-500/20 hover:text-red-500 hover:border-red-500/30 text-sm font-medium transition-all text-gray-300">
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">Log in</Link>
                <Link to="/app" className="flex items-center gap-2 px-6 py-2 rounded-full bg-primary-500 hover:bg-primary-400 text-white text-sm font-bold transition-all glow-box shadow-[0_0_15px_rgba(14,165,233,0.5)]">
                  <Download className="w-4 h-4" />
                  Get App
                </Link>
              </>
            )}
            
            <div className="md:hidden flex items-center">
              <button className="text-gray-300 hover:text-white focus:outline-none p-2">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
