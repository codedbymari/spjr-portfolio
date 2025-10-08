// src/App.js 
import React, { useState, useEffect, useRef } from 'react';
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
import MusicPage from './components/pages/MusicPage';

// Story components
import OceanPage from './components/pages/stories/OceanPage';
import MphepoPage from './components/pages/stories/MphepoPage';
import PowerGracePage from './components/pages/stories/PowerGracePage';
import RicosStoryPage from './components/pages/stories/RicosStoryPage';
import PoetryInMotionPage from './components/pages/stories/PoetryInMotionPage';
// Music components
import WithIntentionsPage from './components/pages/music/WithIntentionsPage';
import SonOfAFarmerPage from './components/pages/music/SonOfAFarmerPage';
import GreatExpectationPage from './components/pages/music/GreatExpectationPage';
import PracticePage from './components/pages/music/PracticePage';
import CrossroadsToHomePage from './components/pages/music/CrossroadsToHomePage';
import Tucker1955Page from './components/pages/music/Tucker1955Page';

// Styles
import './styles/animations.css';

const AppContent = () => {
  // Get initial page from URL
  const getInitialPage = () => {
    const path = window.location.pathname;
    const page = path.substring(1) || 'landing';
    const validPages = [
      'landing', 
      'writing', 
      'music',
      'about', 
      'pen2purpose',
      'ocean', 
      'mphepo', 
      'power-grace', 
      'vessels', 
      'ricos-story', 
      'poetry-in-motion',
      'with-intentions',
      'son-of-a-farmer',
      'great-expectation',
      'practice',
      'crossroads-to-home',
      'tucker-1955'
    ];
    return validPages.includes(page) ? page : 'landing';
  };

  const [currentPage, setCurrentPage] = useState(getInitialPage());
  const [isReadingMode, setIsReadingMode] = useState(false);
  const [pageKey, setPageKey] = useState(0);
  const scrollPositions = useRef({});
  const isNavigatingBack = useRef(false);
  
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
  
  const isLoadingComplete = true;
  const shouldShowLoadingScreen = false;
  
  // Reset page to beginning - with option to skip full reload and smooth scroll
  const resetPageState = (skipReload = false, useSmootScroll = false) => {
    if (useSmootScroll) {
      smoothScrollTo(0, 600);
    } else {
      window.scrollTo(0, 0);
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
    document.documentElement.style.scrollBehavior = 'smooth';
    document.documentElement.style.scrollPaddingTop = '2rem';
    
    return () => {
      document.documentElement.style.scrollBehavior = '';
      document.documentElement.style.scrollPaddingTop = '';
    };
  }, []);
  
  // Save scroll position before leaving a page
  useEffect(() => {
    const saveScrollPosition = () => {
      scrollPositions.current[currentPage] = window.scrollY;
    };
    
    window.addEventListener('scroll', saveScrollPosition);
    return () => window.removeEventListener('scroll', saveScrollPosition);
  }, [currentPage]);
  
  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event) => {
      isNavigatingBack.current = true;
      const newPage = getInitialPage();
      setCurrentPage(newPage);
      stopAudio();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [stopAudio]);

  // Restore scroll position after page change (for back navigation)
  useEffect(() => {
    if (isNavigatingBack.current) {
      // Use setTimeout to ensure DOM has rendered
      setTimeout(() => {
        const savedPosition = scrollPositions.current[currentPage];
        if (savedPosition !== undefined) {
          window.scrollTo(0, savedPosition);
        }
        isNavigatingBack.current = false;
      }, 0);
    }
  }, [currentPage]);

  // Navigation handler with URL update
  const navigateTo = (page, options = {}) => {
    const { scrollToTop = true } = options;
    
    // Save current scroll position
    scrollPositions.current[currentPage] = window.scrollY;
    
    // Set position to top BEFORE changing page
    if (scrollToTop) {
      window.scrollTo(0, 0);
    }
    
    // Always reset to top for forward navigation (clear any saved position)
    scrollPositions.current[page] = 0;
    
    setCurrentPage(page);
    stopAudio();
    
    const url = page === 'landing' ? '/' : `/${page}`;
    window.history.pushState({ page }, '', url);
  };
  
  // Use keyboard navigation hook
  useKeyboardNavigation(currentPage, navigateTo);
  
  const renderCurrentPage = () => {
    // Props without key - key should be passed directly to components
    const pageProps = {
      currentPage,
      onNavigate: navigateTo,
      scrollToElement,
      smoothScrollTo,
      isAudioPlaying,
      onToggleAudio: toggleAudio,
      isReadingMode,
      onToggleReadingMode: () => setIsReadingMode(!isReadingMode),
      audioRef,
      isInitialLoad: false
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
            isInitialLoad={false}
            isLoadingComplete={isLoadingComplete}
          />
        );
      case 'writing': 
        return (
          <WorkPage 
            key={`writing-${pageKey}`}
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
      case 'music': 
        return (
          <MusicPage 
            key={`music-${pageKey}`}
            currentPage={currentPage} 
            onNavigate={navigateTo}
            scrollToElement={scrollToElement}
            smoothScrollTo={smoothScrollTo}
            isLoadingComplete={isLoadingComplete} 
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
      case 'son-of-a-farmer':
        return (
          <SonOfAFarmerPage 
            key={`son-of-a-farmer-${pageKey}`}
            currentPage={currentPage} 
            onNavigate={navigateTo}
            scrollToElement={scrollToElement}
            smoothScrollTo={smoothScrollTo}
            isLoadingComplete={isLoadingComplete} 
          />
        );
      case 'great-expectation':
        return (
          <GreatExpectationPage 
            key={`great-expectation-${pageKey}`}
            currentPage={currentPage} 
            onNavigate={navigateTo}
            scrollToElement={scrollToElement}
            smoothScrollTo={smoothScrollTo}
            isLoadingComplete={isLoadingComplete} 
          />
        );
      case 'practice':
        return (
          <PracticePage 
            key={`practice-${pageKey}`}
            currentPage={currentPage} 
            onNavigate={navigateTo}
            scrollToElement={scrollToElement}
            smoothScrollTo={smoothScrollTo}
            isLoadingComplete={isLoadingComplete} 
          />
        );
      case 'crossroads-to-home':
        return (
          <CrossroadsToHomePage 
            key={`crossroads-to-home-${pageKey}`}
            currentPage={currentPage} 
            onNavigate={navigateTo}
            scrollToElement={scrollToElement}
            smoothScrollTo={smoothScrollTo}
            isLoadingComplete={isLoadingComplete} 
          />
        );
      case 'tucker-1955':
        return (
          <Tucker1955Page 
            key={`tucker-1955-${pageKey}`}
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
            isInitialLoad={false}
            isLoadingComplete={isLoadingComplete}
          />
        );
    }
  };
  
  const showLoadingScreen = shouldShowLoadingScreen;
  
  return (
    <div className="relative min-h-screen theme-transition">
      {/* Loading Screen Component - COMMENTED OUT */}
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