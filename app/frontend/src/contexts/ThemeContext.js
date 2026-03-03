import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);
  const [accentColor, setAccentColor] = useState('#6445b2');

  const accentColors = [
    { name: 'Purple', value: '#6445b2' },
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Cyan', value: '#06b6d4' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Green', value: '#10b981' },
    { name: 'Orange', value: '#f97316' },
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem('onlycrm-theme');
    const savedAccent = localStorage.getItem('onlycrm-accent');
    
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }
    if (savedAccent) {
      setAccentColor(savedAccent);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('light', !isDark);
    localStorage.setItem('onlycrm-theme', isDark ? 'dark' : 'light');
    
    document.documentElement.style.setProperty('--clr-primary', accentColor);
    document.documentElement.style.setProperty('--clr-primary-hover', adjustColor(accentColor, 20));
    document.documentElement.style.setProperty('--clr-accent', adjustColor(accentColor, 15));
    localStorage.setItem('onlycrm-accent', accentColor);
  }, [isDark, accentColor]);

  const adjustColor = (hex, percent) => {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, ((num >> 8) & 0x00FF) + amt);
    const B = Math.min(255, (num & 0x0000FF) + amt);
    return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
  };

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, accentColor, setAccentColor, accentColors }}>
      {children}
    </ThemeContext.Provider>
  );
};
