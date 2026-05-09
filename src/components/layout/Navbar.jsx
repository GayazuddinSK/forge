import React from 'react';
import { User, LogOut, Cpu } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="glass-panel mx-4 mt-4 px-6 py-4 flex items-center justify-between sticky top-4 z-50">
      <div className="flex items-center space-x-3">
        <Cpu className="w-8 h-8 text-arc animate-pulse" />
        <h1 className="tech-heading text-2xl">FORGE OS</h1>
      </div>
      
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2 text-gray-300 hover:text-arc transition-colors cursor-pointer">
          <User className="w-5 h-5" />
          <span className="font-tech hidden sm:inline">ADMIN</span>
        </div>
        <button className="text-gray-400 hover:text-stark-red transition-colors flex items-center space-x-1">
          <LogOut className="w-5 h-5" />
          <span className="font-tech text-sm hidden sm:inline">DISCONNECT</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
