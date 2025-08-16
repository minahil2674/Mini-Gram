import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export default function Navbar() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 backdrop-blur-xl bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 border-b border-slate-700/30 shadow-2xl shadow-slate-900/30 animate-slideDown overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute -top-16 left-1/2 w-40 h-40 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 flex justify-between items-center h-full px-6">
        {/* Logo */}
        <Link 
          to="/feed" 
          className="relative group transform hover:scale-105 transition-all duration-300 ml-64"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-md"></div>
          <h1 className="relative text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent hover:from-blue-300 hover:via-purple-300 hover:to-indigo-300 transition-all duration-300 px-3 py-2">
            MiniGram
          </h1>
          {/* Animated underline */}
          <div className="absolute bottom-1 left-3 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-[calc(100%-1.5rem)] transition-all duration-500 rounded-full"></div>
          
          {/* Sparkle effects */}
          <div className="absolute top-1 right-2 w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 animate-pulse delay-300"></div>
          <div className="absolute bottom-1 left-1 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 animate-pulse delay-700"></div>
        </Link>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="relative group px-5 py-2.5 text-sm font-semibold text-red-400 hover:text-white rounded-xl border border-red-500/30 hover:border-red-400 transition-all duration-300 overflow-hidden transform hover:scale-105 shadow-lg hover:shadow-red-500/30"
        >
          {/* Multiple background layers */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-400"></div>
          
          {/* Shimmer effect */}
          <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
          
          {/* Button text */}
          <span className="relative flex items-center gap-2 group-hover:scale-105 transition-transform duration-200">
            <svg 
              className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </span>

          {/* Enhanced glow effects */}
          <div className="absolute inset-0 rounded-xl bg-red-400/30 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 scale-150"></div>
          <div className="absolute inset-0 rounded-xl bg-red-500/20 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300"></div>
          
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-red-400/0 group-hover:border-red-300/60 transition-all duration-300 rounded-tl-xl"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-red-400/0 group-hover:border-red-300/60 transition-all duration-300 rounded-br-xl"></div>
        </button>
      </div>

      {/* Enhanced bottom border with animation */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 animate-[expandWidth_3s_ease-in-out_infinite]"></div>
      
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes expandWidth {
          0%, 100% {
            width: 0%;
            left: 50%;
          }
          50% {
            width: 100%;
            left: 0%;
          }
        }

        .animate-slideDown {
          animation: slideDown 0.6s ease-out;
        }
      `}</style>
    </nav>
  );
}
