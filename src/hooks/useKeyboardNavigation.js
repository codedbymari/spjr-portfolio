// src/hooks/useKeyboardNavigation.js
import { useEffect } from 'react';

export const useKeyboardNavigation = (currentPage, navigateTo) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        if (currentPage === 'writing') navigateTo('landing');
        else if (currentPage === 'about') navigateTo('writing');
        else if (['ocean', 'poetry-in-motion', 'mphepo'].includes(currentPage)) {
          navigateTo('writing');
        }
      } else if (e.key === 'ArrowRight') {
        if (currentPage === 'landing') navigateTo('writing');
        else if (currentPage === 'writing') navigateTo('about');
      } else if (e.key === 'Home' || e.key === 'Escape') {
        if (['ocean', 'poetry-in-motion', 'mphepo'].includes(currentPage)) {
          navigateTo('writing');
        } else {
          navigateTo('landing');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, navigateTo]);
};

