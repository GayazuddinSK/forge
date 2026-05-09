import React from 'react';
import { ExternalLink, Network, Users } from 'lucide-react';

const Linkedin = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const LinkedInWidget = () => {
  return (
    <div className="glass-panel p-6 flex flex-col h-full relative overflow-hidden group">
      {/* Background glow */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#0a66c2]/20 rounded-full blur-3xl group-hover:bg-[#0a66c2]/30 transition-all duration-500"></div>

      <div className="flex items-center space-x-3 mb-6 relative z-10">
        <Linkedin className="w-6 h-6 text-[#0a66c2]" />
        <h2 className="tech-heading text-xl">NETWORK PROTOCOL</h2>
      </div>

      <div className="flex-grow flex flex-col justify-center items-center text-center relative z-10 space-y-4 mb-6">
        <div className="w-20 h-20 rounded-full border-2 border-[#0a66c2]/50 p-1 relative">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-[#0a66c2]/20 to-gray-900 flex items-center justify-center">
            <Linkedin className="w-10 h-10 text-[#0a66c2]" />
          </div>
        </div>

        <div>
          <h3 className="font-sans font-bold text-gray-100 text-lg">Gayazuddin S.K.</h3>
          <p className="font-tech text-gray-400 text-sm uppercase tracking-widest mt-1">n8n Automation Engineer</p>
          <div className="flex items-center justify-center space-x-2 mt-3 text-xs font-tech text-gray-500 uppercase tracking-widest">
            <span className="flex items-center"><Network className="w-3 h-3 mr-1" /> 270+ Conn</span>
            <span>|</span>
            <span className="flex items-center"><Users className="w-3 h-3 mr-1" /> Open To Work</span>
          </div>
        </div>
      </div>

      <div className="mt-auto relative z-10">
        <a
          href="https://www.linkedin.com/in/gayazuddin-shaik-450246306/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative overflow-hidden bg-[#0a66c2]/10 text-[#0a66c2] border border-[#0a66c2]/50 px-4 py-2 rounded font-tech tracking-wider uppercase transition-all duration-300 w-full flex items-center justify-center hover:bg-[#0a66c2] hover:text-white hover:shadow-[0_0_15px_rgba(10,102,194,0.8)]"
        >
          <span>ESTABLISH CONNECTION</span>
          <ExternalLink className="w-4 h-4 ml-2" />
        </a>
      </div>
    </div>
  );
};

export default LinkedInWidget;
