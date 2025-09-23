// src/components/common/ThemeToggle.js
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeToggle = ({ className = '', size = 'default' }) => {
  const { isDark, toggleTheme } = useTheme();

  const sizeClasses = {
    small: 'p-1.5 w-8 h-8',
    default: 'p-2 w-10 h-10',
    large: 'p-3 w-12 h-12'
  };

  const iconSizes = {
    small: 'w-4 h-4',
    default: 'w-5 h-5',
    large: 'w-6 h-6'
  };

  return (
    <button
      onClick={toggleTheme}
      className={`
        ${sizeClasses[size]}
        relative rounded-full transition-all duration-500 transform hover:scale-110 z-50
        backdrop-blur-sm border group
        ${isDark
          ? 'bg-gray-900/80 text-amber-300 shadow-lg shadow-amber-500/10 hover:bg-gray-800/90 border-gray-700/60 hover:border-gray-600' 
          : 'bg-white/80 text-amber-600 shadow-lg shadow-amber-200/30 hover:bg-white/90 border-amber-200/60 hover:border-amber-300'
        }
        ${className}
      `}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className={`relative ${iconSizes[size]} flex items-center justify-center`}>
        {/* Sun Icon */}
        <Sun 
          className={`
            absolute transition-all duration-500 ease-in-out
            ${iconSizes[size]}
            ${isDark 
              ? 'opacity-0 rotate-90 scale-0' 
              : 'opacity-100 rotate-0 scale-100'
            }
          `}
        />
        
        {/* Moon Icon */}
        <Moon 
          className={`
            absolute transition-all duration-500 ease-in-out
            ${iconSizes[size]}
            ${isDark 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 -rotate-90 scale-0'
            }
          `}
        />
      </div>

      {/* Subtle glow effect */}
      <div 
        className={`
          absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300
          ${isDark 
            ? 'bg-amber-400/20 shadow-amber-400/20' 
            : 'bg-amber-300/20 shadow-amber-300/20'
          }
        `}
      />
    </button>
  );
};

export default ThemeToggle;