// src/App.js 
import React, { useState, useEffect } from 'react';
import { useAudio } from './hooks/useAudio';
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation';
// Components
import LoadingScreen from './components/LoadingScreen';
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

const App = () => {
  // Get initial page from URL
  const getInitialPage = () => {
    const path = window.location.pathname;
    const page = path.substring(1) || 'landing'; // Remove leading slash, default to landing
    // Validate that the page exists
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
      'poetry-in-motion'
    ];
    return validPages.includes(page) ? page : 'landing';
  };

  const [currentPage, setCurrentPage] = useState(getInitialPage());
  const [isReadingMode, setIsReadingMode] = useState(false);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const [animationStage, setAnimationStage] = useState('loading');
  const [pageKey, setPageKey] = useState(0); // Force page re-render
  
  const { isAudioPlaying, audioRef, toggleAudio, stopAudio } = useAudio();
  
  // Calculate if loading is complete
  const isLoadingComplete = hasLoadedOnce && animationStage === 'complete';
  
  // Only show loading screen on landing page and only once
  const shouldShowLoadingScreen = currentPage === 'landing' && !hasLoadedOnce && animationStage !== 'complete';
  
  // Set black overscroll background on body and html
  useEffect(() => {
    // Set black background for overscroll areas
    document.body.style.backgroundColor = '#000000';
    document.documentElement.style.backgroundColor = '#000000';
    
    // Set overscroll behavior for smooth experience
    document.body.style.overscrollBehavior = 'contain';
    document.documentElement.style.overscrollBehavior = 'contain';
    
    // Cleanup function
    return () => {
      // Reset to default if needed (optional)
      // document.body.style.backgroundColor = '';
      // document.documentElement.style.backgroundColor = '';
    };
  }, []);
  
  // Reset page to beginning - with option to skip full reload
  const resetPageState = (skipReload = false) => {
    // Scroll to top immediately
    window.scrollTo(0, 0);
    
    // Reset cursor
    document.body.style.cursor = 'default';
    
    // Only force re-render if not skipping reload
    if (!skipReload) {
      setPageKey(prev => prev + 1);
    }
    
    // Reset any global animations or states (but keep this lightweight)
    const animatedElements = document.querySelectorAll('[class*="animate"]');
    animatedElements.forEach(el => {
      el.style.animationPlayState = 'running';
      el.style.animationDelay = '0s';
    });
  };
  
  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event) => {
      const newPage = getInitialPage();
      setCurrentPage(newPage);
      stopAudio();
      
      // Skip full reload for browser navigation (mobile swipe back)
      // This preserves the component state and prevents jarring reloads
      resetPageState(true); // Pass true to skip the pageKey increment
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [stopAudio]);

  // Initial loading sequence - only happens once and only on landing page
  useEffect(() => {
    if (!hasLoadedOnce && currentPage === 'landing') {
      // Stage 1: Switch to revealing earlier
      const revealTimer = setTimeout(() => {
        setAnimationStage('revealing');
      }, 1000); // 1s instead of 3000ms

      // Stage 2: Fade out later but keep total ~7s
      const completeTimer = setTimeout(() => {
        setAnimationStage('complete');
        setHasLoadedOnce(true);
      }, 5000); // 7s instead of 8000ms

      return () => {
        clearTimeout(revealTimer);
        clearTimeout(completeTimer);
      };
    } else if (currentPage !== 'landing' && !hasLoadedOnce) {
      // If first visit is not landing page, skip loading screen
      setHasLoadedOnce(true);
      setAnimationStage('complete');
    }
  }, [hasLoadedOnce, currentPage]);

  // Navigation handler with URL update - this is for intentional navigation
  const navigateTo = (page) => {
    setCurrentPage(page);
    stopAudio();
    
    // For intentional navigation, we do want a fresh page state
    resetPageState(false); // Keep the full reset for intentional navigation
    
    const url = page === 'landing' ? '/' : `/${page}`;
    window.history.pushState({ page }, '', url);
  };
  
  // Use keyboard navigation hook
  useKeyboardNavigation(currentPage, navigateTo);
  
  const renderCurrentPage = () => {
    const pageProps = {
      currentPage,
      onNavigate: navigateTo,
      isAudioPlaying,
      onToggleAudio: toggleAudio,
      isReadingMode,
      onToggleReadingMode: () => setIsReadingMode(!isReadingMode),
      audioRef,
      isInitialLoad: !hasLoadedOnce,
      key: pageKey // Force re-render when page changes
    };
    
    switch (currentPage) {
      case 'landing': 
        return (
          <LandingPage 
            key={`landing-${pageKey}`}
            currentPage={currentPage} 
            onNavigate={navigateTo} 
            isInitialLoad={!hasLoadedOnce}
            isLoadingComplete={isLoadingComplete}
          />
        );
      case 'work': 
        return (
          <WorkPage 
            key={`work-${pageKey}`}
            currentPage={currentPage} 
            onNavigate={navigateTo} 
            isLoadingComplete={isLoadingComplete} 
          />
        );
      case 'about': 
        return (
          <AboutPage 
            key={`about-${pageKey}`}
            currentPage={currentPage} 
            onNavigate={navigateTo} 
          />
        );
      case 'pen2purpose': 
        return (
          <Pen2PurposePage 
            key={`pen2purpose-${pageKey}`}
            currentPage={currentPage} 
            onNavigate={navigateTo}
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
      case 'music-project':
        return (
          <WithIntentionsPage 
            key={`music-project-${pageKey}`}
            currentPage={currentPage} 
            onNavigate={setCurrentPage} 
            isLoadingComplete={isLoadingComplete} 
          />
        );
      default: 
        return (
          <LandingPage 
            key={`default-${pageKey}`}
            currentPage={currentPage} 
            onNavigate={navigateTo} 
            isInitialLoad={!hasLoadedOnce}
            isLoadingComplete={isLoadingComplete}
          />
        );
    }
  };
  
  const showLoadingScreen = shouldShowLoadingScreen;
  
  return (
    <div className="relative min-h-screen bg-black">
      {/* Loading Screen Component */}
      {showLoadingScreen && (
        <LoadingScreen animationStage={animationStage} />
      )}
      
      {/* Main Content */}
      <div className={`
        min-h-screen
        transition-all duration-1000 ease-out
        ${showLoadingScreen ? 'opacity-0' : 'opacity-100'}
      `}>
        {renderCurrentPage()}
      </div>
    </div>
  );
};

export default App;