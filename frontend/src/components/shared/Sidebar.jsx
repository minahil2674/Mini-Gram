import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 min-h-screen h-full p-6 shadow-2xl relativeoverflow-hidden fixed left-0 top-0 z-40 pt-20">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-4 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-4 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Logo/Brand area */}
        <div className="mb-8 pb-6 border-b border-slate-700/50">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-3 animate-pulse"></div>
          <h2 className="text-white font-bold text-lg opacity-90">Navigation</h2>
        </div>

        <ul className="space-y-3">
          <li className="transform transition-all duration-300 hover:translate-x-2">
            <Link 
              to="/feed" 
              className="group flex items-center px-4 py-3 text-slate-300 font-semibold rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-blue-500/10 hover:text-white hover:shadow-lg hover:shadow-blue-500/25 relative overflow-hidden"
            >
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-blue-500/0 group-hover:from-blue-600/10 group-hover:to-blue-500/5 transition-all duration-300 rounded-xl"></div>
              
              {/* Icon placeholder */}
              <div className="w-5 h-5 bg-blue-500 rounded-md mr-3 opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <span className="relative z-10">Feed</span>
              
              {/* Animated arrow */}
              <div className="ml-auto opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                <div className="w-4 h-4 border-r-2 border-t-2 border-blue-400 transform rotate-45"></div>
              </div>
            </Link>
          </li>
          
          <li className="transform transition-all duration-300 hover:translate-x-2 delay-75">
            <Link 
              to="/profile" 
              className="group flex items-center px-4 py-3 text-slate-300 font-semibold rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-purple-500/10 hover:text-white hover:shadow-lg hover:shadow-purple-500/25 relative overflow-hidden"
            >
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 to-purple-500/0 group-hover:from-purple-600/10 group-hover:to-purple-500/5 transition-all duration-300 rounded-xl"></div>
              
              {/* Icon placeholder */}
              <div className="w-5 h-5 bg-purple-500 rounded-full mr-3 opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <span className="relative z-10">Profile</span>
              
              {/* Animated arrow */}
              <div className="ml-auto opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                <div className="w-4 h-4 border-r-2 border-t-2 border-purple-400 transform rotate-45"></div>
              </div>
            </Link>
          </li>
          
          {/* Add more links as needed */}
        </ul>

        {/* Bottom decoration */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
          <div className="mt-4 text-center">
            <div className="inline-flex space-x-1">
              <div className="w-2 h-2 bg-blue-500/60 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-500/60 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-blue-500/60 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}