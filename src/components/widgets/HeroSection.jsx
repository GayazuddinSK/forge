import React, { useState, useEffect } from 'react';

const HeroSection = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  return (
    <div className="glass-panel p-8 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center relative overflow-hidden">
      {/* Decorative HUD elements */}
      <div className="absolute top-0 right-0 p-4 opacity-30 pointer-events-none">
        <div className="w-16 h-16 border-t-2 border-r-2 border-arc rounded-tr-xl"></div>
      </div>
      <div className="absolute bottom-0 left-0 p-4 opacity-30 pointer-events-none">
        <div className="w-16 h-16 border-b-2 border-l-2 border-arc rounded-bl-xl"></div>
      </div>

      <div className="space-y-2 z-10">
        <h2 className="text-textMuted font-tech text-xl tracking-widest uppercase">System Initialization...</h2>
        <h1 className="tech-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
          WELCOME BACK, ADMIN
        </h1>
        <p className="text-textMain max-w-xl mt-4 text-sm sm:text-base">
          All systems are online and functioning within normal parameters. 
          Your productivity protocols are ready to be engaged.
        </p>
      </div>

      <div className="mt-6 md:mt-0 text-right z-10 flex flex-col items-end">
        <div className="font-tech text-4xl text-arc tracking-wider drop-shadow-red-glow">
          {formatTime(time)}
        </div>
        <div className="text-textMuted font-tech text-lg uppercase tracking-widest mt-1">
          {formatDate(time)}
        </div>
        <button className="tech-button mt-6">
          RUN DIAGNOSTICS
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
