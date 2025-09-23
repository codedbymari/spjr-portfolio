// src/contexts/ThemeContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Initialize with dark mode as default, check localStorage
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem('theme');
      return saved ? saved === 'dark' : true; // Default to dark
    } catch (error) {
      return true; // Default to dark if localStorage fails
    }
  });

  // Apply theme to document root and save to localStorage
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
      body.style.backgroundColor = '#000000';
      root.style.colorScheme = 'dark';
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
      body.style.backgroundColor = '#fbf9f7';
      root.style.colorScheme = 'light';
    }

    // Save theme preference
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    } catch (error) {
      console.warn('Could not save theme preference');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  // Theme-aware color utilities
  const getThemeColors = () => {
    if (isDark) {
      return {
        primary: '#000000',
        secondary: '#111111',
        accent: '#1a1a1a',
        text: {
          primary: '#fbf9f7',
          secondary: '#cccccc',
          muted: '#aaaaaa',
          accent: '#666666'
        },
        border: '#333333',
        hover: '#222222'
      };
    } else {
      return {
        primary: '#fbf9f7',
        secondary: '#f5f2eb',
        accent: '#eae7de',
        text: {
          primary: '#2c2c2c',
          secondary: '#4a4a4a',
          muted: '#666666',
          accent: '#888888'
        },
        border: '#d4d1c9',
        hover: '#f0ede6'
      };
    }
  };

  return (
    <ThemeContext.Provider value={{ 
      isDark, 
      toggleTheme, 
      colors: getThemeColors() 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};