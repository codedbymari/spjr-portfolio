// src/hooks/useKeyboardNavigation.js
import { useEffect } from 'react';

export const useKeyboardNavigation = (currentPage, navigateTo) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        if (currentPage === 'work') navigateTo('landing');
        else if (currentPage === 'about') navigateTo('work');
        else if (['ocean', 'poetry-in-motion', 'mphepo'].includes(currentPage)) {
          navigateTo('work');
        }
      } else if (e.key === 'ArrowRight') {
        if (currentPage === 'landing') navigateTo('work');
        else if (currentPage === 'work') navigateTo('about');
      } else if (e.key === 'Home' || e.key === 'Escape') {
        if (['ocean', 'poetry-in-motion', 'mphepo'].includes(currentPage)) {
          navigateTo('work');
        } else {
          navigateTo('landing');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, navigateTo]);
};

