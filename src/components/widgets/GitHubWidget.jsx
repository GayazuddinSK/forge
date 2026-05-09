import React from 'react';
import { ExternalLink, GitBranch, Star, GitCommit } from 'lucide-react';

const Github = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.5 5.5 0 0 0-1.5-3.8 5.5 5.5 0 0 0-.1-3.8s-1.2-.4-3.9 1.4a13.3 13.3 0 0 0-7 0c-2.7-1.8-3.9-1.4-3.9-1.4a5.5 5.5 0 0 0-.1 3.8 5.5 5.5 0 0 0-1.5 3.8c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path>
    <path d="M9 20c-5 1.5-5-2.5-7-3"></path>
  </svg>
);

const GitHubWidget = () => {
  return (
    <div className="glass-panel p-6 flex flex-col h-full relative overflow-hidden group">
      {/* Background glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-arc/10 rounded-full blur-3xl group-hover:bg-arc/20 transition-all duration-500"></div>

      <div className="flex items-center space-x-3 mb-6 relative z-10">
        <Github className="w-6 h-6 text-arc" />
        <h2 className="tech-heading text-xl">GITHUB LINK</h2>
      </div>

      <div className="flex items-center space-x-4 mb-6 relative z-10">
        <div className="w-16 h-16 rounded-full border-2 border-arc/50 p-1 relative">
          {/* Mock Avatar */}
          <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
             <Github className="w-8 h-8 text-gray-500" />
          </div>
          {/* Online indicator */}
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-surface rounded-full shadow-[0_0_10px_#22c55e]"></div>
        </div>
        
        <div>
          <h3 className="font-sans font-bold text-gray-100 text-lg">GayazuddinSK</h3>
          <p className="font-tech text-gray-400 text-sm uppercase tracking-widest">Full-Stack Engineer</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-6 relative z-10">
        <div className="bg-surface/50 border border-surfaceBorder rounded p-2 text-center">
          <GitBranch className="w-4 h-4 text-gray-400 mx-auto mb-1" />
          <div className="font-tech text-arc text-lg">24</div>
          <div className="text-[10px] text-gray-500 uppercase tracking-wider">Repos</div>
        </div>
        <div className="bg-surface/50 border border-surfaceBorder rounded p-2 text-center">
          <Star className="w-4 h-4 text-gray-400 mx-auto mb-1" />
          <div className="font-tech text-arc text-lg">12</div>
          <div className="text-[10px] text-gray-500 uppercase tracking-wider">Stars</div>
        </div>
        <div className="bg-surface/50 border border-surfaceBorder rounded p-2 text-center">
          <GitCommit className="w-4 h-4 text-gray-400 mx-auto mb-1" />
          <div className="font-tech text-arc text-lg">482</div>
          <div className="text-[10px] text-gray-500 uppercase tracking-wider">Commits</div>
        </div>
      </div>

      <div className="mt-auto relative z-10">
        <a 
          href="https://github.com/GayazuddinSK" 
          target="_blank" 
          rel="noopener noreferrer"
          className="tech-button w-full flex items-center justify-center group-hover:shadow-arc-hover"
        >
          <span>INITIALIZE REPOSITORY</span>
          <ExternalLink className="w-4 h-4 ml-2" />
        </a>
      </div>
    </div>
  );
};

export default GitHubWidget;
