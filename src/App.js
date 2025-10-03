// src/App.js 
import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { useAudio } from './hooks/useAudio';
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation';

// Components
// import LoadingScreen from './components/LoadingScreen';
// Page components
import LandingPage from './components/pages/LandingPage';
import WorkPage from './components/pages/WorkPage';
import AboutPage from './components/pages/AboutPage';
import Pen2PurposePage from './components/pages/Pen2PurposePage';
// Story components
import OceanPage from './components/pages/stories/OceanPage';
import MphepoPage from './components/pages/stories/MphepoPage';
import PowerGracePage from './components/pages/stories/PowerGracePage';
import RicosStoryPage from './components/pages/stories/RicosStoryPage';
import PoetryInMotionPage from './components/pages/stories/PoetryInMotionPage';
import WithIntentionsPage from './components/pages/music/WithIntentionsPage';

// Styles
import './styles/animations.css';

const AppContent = () => {
  // Get initial page from URL
  const getInitialPage = () => {
    const path = window.location.pathname;
    const page = path.substring(1) || 'landing';
    const validPages = [
      'landing', 
      'work', 
      'about', 
      'pen2purpose',
      'ocean', 
      'mphepo', 
      'power-grace', 
      'vessels', 
      'ricos-story', 
      'poetry-in-motion',
      'with-intentions'
    ];
    return validPages.includes(page) ? page : 'landing';
  };

  const [currentPage, setCurrentPage] = useState(getInitialPage());
  const [isReadingMode, setIsReadingMode] = useState(false);
  // const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  // const [animationStage, setAnimationStage] = useState('loading');
  const [pageKey, setPageKey] = useState(0);
  // const [loadingProgress, setLoadingProgress] = useState(0);
  
  const { isAudioPlaying, audioRef, toggleAudio, stopAudio } = useAudio();
  
  // Smooth scroll utility function
  const smoothScrollTo = (targetY, duration = 800) => {
    const startY = window.scrollY;
    const distance = targetY - startY;
    const startTime = performance.now();
    
    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };
    
    const animateScroll = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);
      
      window.scrollTo(0, startY + distance * easedProgress);
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };
    
    requestAnimationFrame(animateScroll);
  };
  
  // Calculate if loading is complete - always true now
  const isLoadingComplete = true; // hasLoadedOnce && animationStage === 'complete';
  
  // Only show loading screen on landing page and only once
  // const shouldShowLoadingScreen = currentPage === 'landing' && !hasLoadedOnce && animationStage !== 'complete';
  const shouldShowLoadingScreen = false; // Disabled loading screen
  
  // Reset page to beginning - with option to skip full reload and smooth scroll
  const resetPageState = (skipReload = false, useSmootScroll = false) => {
    if (useSmootScroll) {
      smoothScrollTo(0, 600); // Smooth scroll to top with 600ms duration
    } else {
      window.scrollTo(0, 0); // Instant scroll to top
    }
    
    document.body.style.cursor = 'default';
    
    if (!skipReload) {
      setPageKey(prev => prev + 1);
    }
    
    const animatedElements = document.querySelectorAll('[class*="animate"]');
    animatedElements.forEach(el => {
      el.style.animationPlayState = 'running';
      el.style.animationDelay = '0s';
    });
  };
  
  // Enhanced scroll to element function
  const scrollToElement = (elementId, offset = 0) => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      const targetPosition = elementTop - offset;
      smoothScrollTo(targetPosition, 800);
    }
  };
  
  // Add CSS for smooth scrolling behavior
  useEffect(() => {
    // Add smooth scroll behavior to html element
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Optional: Add scroll padding for fixed headers
    document.documentElement.style.scrollPaddingTop = '2rem';
    
    return () => {
      // Clean up on unmount
      document.documentElement.style.scrollBehavior = '';
      document.documentElement.style.scrollPaddingTop = '';
    };
  }, []);
  
  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event) => {
      const newPage = getInitialPage();
      setCurrentPage(newPage);
      stopAudio();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [stopAudio]);

  // Navigation handler with URL update and smooth scroll
  const navigateTo = (page, options = {}) => {
    const { scrollToTop = true, useSmootScroll = true } = options;
    
    setCurrentPage(page);
    stopAudio();
    
    if (scrollToTop) {
      resetPageState(false, useSmootScroll);
    }
    
    const url = page === 'landing' ? '/' : `/${page}`;
    window.history.pushState({ page }, '', url);
  };
  
  // Use keyboard navigation hook
  useKeyboardNavigation(currentPage, navigateTo);
  
  const renderCurrentPage = () => {
    const pageProps = {
      currentPage,
      onNavigate: navigateTo,
      scrollToElement, // Pass scroll function to pages
      smoothScrollTo, // Pass smooth scroll utility
      isAudioPlaying,
      onToggleAudio: toggleAudio,
      isReadingMode,
      onToggleReadingMode: () => setIsReadingMode(!isReadingMode),
      audioRef,
      isInitialLoad: false, // !hasLoadedOnce - always false now
      key: pageKey
    };
    
    switch (currentPage) {
      case 'landing': 
        return (
          <LandingPage 
            key={`landing-${pageKey}`}
            currentPage={currentPage} 
            onNavigate={navigateTo} 
            scrollToElement={scrollToElement}
            smoothScrollTo={smoothScrollTo}
            isInitialLoad={false} // !hasLoadedOnce - always false now
            isLoadingComplete={isLoadingComplete}
          />
        );
      case 'work': 
        return (
          <WorkPage 
            key={`work-${pageKey}`}
            currentPage={currentPage} 
            onNavigate={navigateTo}
            scrollToElement={scrollToElement}
            smoothScrollTo={smoothScrollTo}
            isLoadingComplete={isLoadingComplete} 
          />
        );
      case 'about': 
        return (
          <AboutPage 
            key={`about-${pageKey}`}
            currentPage={currentPage} 
            onNavigate={navigateTo}
            scrollToElement={scrollToElement}
            smoothScrollTo={smoothScrollTo}
          />
        );
      case 'pen2purpose': 
        return (
          <Pen2PurposePage 
            key={`pen2purpose-${pageKey}`}
            currentPage={currentPage} 
            onNavigate={navigateTo}
            scrollToElement={scrollToElement}
            smoothScrollTo={smoothScrollTo}
            isLoadingComplete={isLoadingComplete}
          />
        );
      case 'ocean': 
        return <OceanPage key={`ocean-${pageKey}`} {...pageProps} />;
      case 'mphepo': 
        return <MphepoPage key={`mphepo-${pageKey}`} {...pageProps} />;
      case 'power-grace': 
        return <PowerGracePage key={`power-grace-${pageKey}`} {...pageProps} />;
      case 'ricos-story': 
        return <RicosStoryPage key={`ricos-story-${pageKey}`} {...pageProps} />;
      case 'poetry-in-motion': 
        return <PoetryInMotionPage key={`poetry-in-motion-${pageKey}`} {...pageProps} />;
      case 'with-intentions':
        return (
          <WithIntentionsPage 
            key={`with-intentions-${pageKey}`}
            currentPage={currentPage} 
            onNavigate={navigateTo}
            scrollToElement={scrollToElement}
            smoothScrollTo={smoothScrollTo}
            isLoadingComplete={isLoadingComplete} 
          />
        );
      default: 
        return (
          <LandingPage 
            key={`default-${pageKey}`}
            currentPage={currentPage} 
            onNavigate={navigateTo}
            scrollToElement={scrollToElement}
            smoothScrollTo={smoothScrollTo}
            isInitialLoad={false} // !hasLoadedOnce - always false now
            isLoadingComplete={isLoadingComplete}
          />
        );
    }
  };
  
  const showLoadingScreen = shouldShowLoadingScreen;
  
  return (
    <div className="relative min-h-screen theme-transition">
      {/* Loading Screen Component with progress prop - COMMENTED OUT */}
      {/*
      {showLoadingScreen && (
        <LoadingScreen 
          animationStage={animationStage} 
          progress={loadingProgress}
        />
      )}
      */}
      
      {/* Main Content */}
      <div className={`
        min-h-screen theme-transition
        ${showLoadingScreen ? 'opacity-0' : 'opacity-100'}
      `}>
        {renderCurrentPage()}
      </div>
    </div>
  );
};

// Main App component with ThemeProvider
const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;