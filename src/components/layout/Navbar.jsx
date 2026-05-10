import React from 'react';
import { User, LogOut, Cpu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import ThemeSelector from '../ui/ThemeSelector';

const Navbar = () => {
  const { signOut } = useAuth();

  return (
    <nav className="glass-panel mx-4 mt-4 px-4 py-3 md:px-6 md:py-4 flex flex-wrap items-center justify-between sticky top-4 z-50 gap-4">
      <Link to="/" className="flex items-center space-x-3 group shrink-0">
        <Cpu className="w-8 h-8 text-arc animate-pulse group-hover:scale-110 transition-transform" />
        <h1 className="tech-heading text-xl md:text-2xl group-hover:text-textMain transition-colors">FORGE OS</h1>
      </Link>
      
      <div className="flex items-center space-x-4 md:space-x-6">
        <ThemeSelector />
        
        <Link to="/profile" className="flex items-center space-x-2 text-textMuted hover:text-arc transition-colors cursor-pointer">
          <User className="w-5 h-5" />
          <span className="font-tech hidden sm:inline">ADMIN</span>
        </Link>
        <button 
          onClick={() => signOut()}
          className="text-textMuted hover:text-stark-red transition-colors flex items-center space-x-1"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-tech text-sm hidden sm:inline">DISCONNECT</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
