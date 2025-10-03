import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeToggle = ({ className = '', size = 'default' }) => {
  const { isDark, toggleTheme } = useTheme();

  const sizes = {
    small: {
      track: 'w-12 h-6',
      thumb: 'w-5 h-5',
      icon: 'w-3 h-3',
      translate: 'translate-x-6'
    },
    default: {
      track: 'w-16 h-8',
      thumb: 'w-7 h-7',
      icon: 'w-4 h-4',
      translate: 'translate-x-8'
    },
    large: {
      track: 'w-20 h-10',
      thumb: 'w-9 h-9',
      icon: 'w-5 h-5',
      translate: 'translate-x-10'
    }
  };

  const currentSize = sizes[size];

  return (
    <button
      onClick={toggleTheme}
      className={`
        ${currentSize.track}
        relative rounded-full transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-offset-2
        ${isDark
          ? 'bg-gray-700 focus:ring-gray-500'
          : 'bg-gray-300 focus:ring-gray-400'
        }
        ${className}
      `}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      role="switch"
      aria-checked={isDark}
    >
      {/* Sliding thumb */}
      <div
        className={`
          ${currentSize.thumb}
          absolute top-0.5 left-0.5 rounded-full
          bg-white shadow-md
          transform transition-transform duration-300 ease-in-out
          flex items-center justify-center
          ${isDark ? currentSize.translate : 'translate-x-0'}
        `}
      >
        <Sun
          className={`
            ${currentSize.icon}
            absolute text-orange-500 transition-all duration-300
            ${isDark ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'}
          `}
        />
        
        <Moon
          className={`
            ${currentSize.icon}
            absolute text-gray-700 transition-all duration-300
            ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'}
          `}
        />
      </div>
    </button>
  );
};

export default ThemeToggle;