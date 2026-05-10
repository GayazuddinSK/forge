import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, Zap, Shield, Hexagon } from 'lucide-react';

const ThemeSelector = () => {
  const { character, setCharacter, mode, setMode, characters } = useTheme();

  const getCharacterIcon = (char) => {
    switch (char) {
      case 'ironman': return <Zap className="w-4 h-4" />;
      case 'spiderman': return <Hexagon className="w-4 h-4" />;
      case 'wakanda': return <Shield className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  const getCharacterName = (char) => {
    switch (char) {
      case 'ironman': return 'JARVIS';
      case 'spiderman': return 'PARKER';
      case 'wakanda': return 'SHURI';
      default: return char.toUpperCase();
    }
  };

  return (
    <div className="flex items-center space-x-2 bg-surface/80 backdrop-blur border border-surfaceBorder rounded-full p-1">
      {/* Character Selector */}
      <div className="flex space-x-1 pr-2 border-r border-surfaceBorder/50">
        {characters.map((char) => (
          <button
            key={char}
            onClick={() => setCharacter(char)}
            title={`Switch to ${getCharacterName(char)} Protocol`}
            className={`p-1.5 rounded-full transition-all duration-300 ${
              character === char 
                ? 'bg-arc text-background shadow-[0_0_10px_rgba(var(--rgb-primary),0.8)] scale-110' 
                : 'text-textMuted hover:text-arc hover:bg-surfaceBorder'
            }`}
          >
            {getCharacterIcon(char)}
          </button>
        ))}
      </div>

      {/* Mode Selector */}
      <div className="flex space-x-1 pl-1 pr-1">
        <button
          onClick={() => setMode('light')}
          className={`p-1.5 rounded-full transition-all duration-300 ${
            mode === 'light'
              ? 'bg-textMain text-background shadow-[0_0_10px_rgba(255,255,255,0.5)] scale-110'
              : 'text-textMuted hover:text-textMain hover:bg-surfaceBorder'
          }`}
        >
          <Sun className="w-4 h-4" />
        </button>
        <button
          onClick={() => setMode('dark')}
          className={`p-1.5 rounded-full transition-all duration-300 ${
            mode === 'dark'
              ? 'bg-background text-textMain shadow-[0_0_10px_rgba(0,0,0,0.8)] border border-surfaceBorder scale-110'
              : 'text-textMuted hover:text-textMain hover:bg-surfaceBorder'
          }`}
        >
          <Moon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ThemeSelector;
