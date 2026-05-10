import React from 'react';
import { FileText, Download, Eye, FileBadge } from 'lucide-react';

const ResumeWidget = () => {
  return (
    <div className="glass-panel p-6 flex flex-col h-full relative overflow-hidden group">
      {/* Background glow */}
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-stark-gold/10 rounded-full blur-3xl group-hover:bg-stark-gold/20 transition-all duration-500"></div>

      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center space-x-3">
          <FileText className="w-6 h-6 text-stark-gold" />
          <h2 className="tech-heading text-xl text-transparent bg-clip-text bg-gradient-to-r from-stark-gold to-yellow-600">DOSSIER</h2>
        </div>
        <span className="text-xs font-tech text-textMuted uppercase">v2.4.1 Active</span>
      </div>

      <div className="flex-grow flex items-center justify-center relative z-10 mb-6">
        <div className="bg-surface/50 border border-stark-gold/30 rounded-xl p-6 w-full flex items-start space-x-4">
          <div className="bg-stark-gold/10 p-3 rounded-lg border border-stark-gold/20">
            <FileBadge className="w-8 h-8 text-stark-gold" />
          </div>
          <div>
            <h3 className="font-sans font-medium text-textMain">GAYAZ_SHAIK_RESUME.DOCX</h3>
            <div className="flex items-center space-x-4 mt-2">
              <span className="text-xs font-tech text-textMuted uppercase">Size: 2.4 MB</span>
              <span className="text-xs font-tech text-textMuted uppercase">Updated: 2D Ago</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-auto relative z-10">
        <a href="/Gayaz_Shaik_Resume.docx" target="_blank" rel="noopener noreferrer" className="relative overflow-hidden bg-surface text-textMain border border-surfaceBorder px-4 py-2 rounded font-tech tracking-wider uppercase transition-all duration-300 flex items-center justify-center hover:bg-gray-800 hover:text-white hover:border-gray-500">
          <Eye className="w-4 h-4 mr-2" />
          <span>PREVIEW</span>
        </a>
        <a href="/Gayaz_Shaik_Resume.docx" download="Gayaz_Shaik_Resume.docx" className="relative overflow-hidden bg-stark-gold/10 text-stark-gold border border-stark-gold/50 px-4 py-2 rounded font-tech tracking-wider uppercase transition-all duration-300 flex items-center justify-center hover:bg-stark-gold hover:text-black hover:shadow-[0_0_15px_rgba(245,158,11,0.6)]">
          <Download className="w-4 h-4 mr-2" />
          <span>EXTRACT</span>
        </a>
      </div>
    </div>
  );
};

export default ResumeWidget;
