import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [character, setCharacter] = useState(() => {
    return localStorage.getItem('forge_character') || 'ironman';
  });
  
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('forge_mode') || 'dark';
  });

  useEffect(() => {
    // Save to local storage
    localStorage.setItem('forge_character', character);
    localStorage.setItem('forge_mode', mode);
    
    // Apply to document root
    document.documentElement.setAttribute('data-theme', `${character}-${mode}`);
  }, [character, mode]);

  const value = {
    character,
    setCharacter,
    mode,
    setMode,
    characters: ['ironman', 'spiderman', 'wakanda']
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
