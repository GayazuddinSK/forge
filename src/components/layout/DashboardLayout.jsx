import React from 'react';
import Navbar from './Navbar';

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col relative pb-10">
      {/* Decorative background grid */}
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.05) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
        zIndex: 0
      }}></div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col flex-grow">
        <Navbar />
        <main className="flex-grow p-4 sm:p-6 lg:p-8 mt-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
