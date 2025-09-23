import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Header from '../common/Header';

const LandingPage = ({ currentPage, onNavigate, isInitialLoad = true, isLoadingComplete = true }) => {
  const [showContent, setShowContent] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const heroRef = useRef(null);
  
  // Parallax scroll tracking for hero section only
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"] // Only animate when hero is in viewport
  });
  
  // Transform scroll progress to parallax movement and scale
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]); // Subtle 0.8x parallax
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]); // Gentle scale increase

  useEffect(() => {
    // Only start animations after loading is complete
    if (isLoadingComplete) {
      const contentTimer = setTimeout(() => {
        setShowContent(true);
      }, 300);

      return () => {
        clearTimeout(contentTimer);
      };
    }
  }, [isLoadingComplete]);

  // Animation variants that respect loading state
  const getInitialState = (defaultInitial) => {
    if (!isLoadingComplete) {
      return { opacity: 0, y: 100 }; // Keep hidden while loading
    }
    return defaultInitial;
  };

  const getAnimateState = (defaultAnimate) => {
    if (!isLoadingComplete) {
      return { opacity: 0, y: 100 }; // Keep hidden while loading
    }
    return defaultAnimate;
  };

  return (
    <div className="w-screen min-h-screen bg-[#000000] overflow-x-hidden relative">
      {/* Header */}
      <Header 
        currentPage={currentPage}
        onNavigate={onNavigate}
        showDescription={false}
        showNavButtons={false}
        isLandingPage={true}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {/* Hero Section - Enhanced Mobile/Tablet Responsiveness */}
      <section className="flex flex-col justify-end min-h-[75vh] sm:min-h-[80vh] w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 relative bg-[#000000] overflow-hidden z-10">
        
        {/* Title + Subtitle Row - Improved Mobile Layout */}
        <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-end gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-10 md:mb-12 lg:mb-[40px]">
          
          {/* Left Title - Better Mobile Typography */}
          <motion.div
            className="text-[#fbf9f7] font-normal uppercase"
            style={{
              fontFamily: 'Fahkwang, sans-serif',
              fontSize: 'clamp(28px, 7.5vw, 84px)', // Slightly smaller minimum for better mobile fit
              lineHeight: '0.85', // Tighter line height for mobile
              letterSpacing: '-0.02em', // Better letter spacing
            }}
            initial={getInitialState({ opacity: 0, y: 100 })}
            animate={getAnimateState({ opacity: 1, y: 0 })}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: isLoadingComplete ? 0.3 : 0 }}
          >
            Sir Practice
          </motion.div>

          {/* Right Subtitle - Enhanced Mobile Layout */}
          <motion.div
            className="text-[#fbf9f7] font-light text-left max-w-full lg:max-w-[45%] xl:max-w-[40%]"
            style={{
              fontFamily: 'Fahkwang, sans-serif',
              fontSize: 'clamp(13px, 3.2vw, 16px)', // Better scaling
              lineHeight: '1.5', // Better readability
              paddingRight: '0px',
            }}
            initial={getInitialState({ opacity: 0, y: 50 })}
            animate={getAnimateState({ opacity: showContent ? 1 : 0, y: showContent ? 0 : 50 })}
            transition={{ delay: isLoadingComplete ? 1.3 : 0, duration: 2, ease: [0.16, 1, 0.3, 1] }}
          >
            Storyteller. Artist. Cartographer of identity. <br />
            Sir Practice traces the routes between heritage and becoming, pain and purpose.
          </motion.div>

        </div>
      </section>

      {/* Full Width Hero Image Section - Better Mobile Heights */}
      <section ref={heroRef} className="w-full bg-[#000000] relative z-10">
        {/* Full width responsive image with parallax effect */}
        <motion.div
          className="w-full overflow-hidden relative"
          style={{ y, scale }} // Apply parallax transforms
          initial={getInitialState({ opacity: isInitialLoad ? 0 : 1 })}
          animate={getAnimateState({ opacity: 1 })}
          transition={{ 
            duration: 0.8, 
            ease: [0.16, 1, 0.3, 1], 
            delay: isLoadingComplete ? (isInitialLoad ? 1.5 : 0) : 0 
          }}
        >
          <img
            src="/assets/images/HERO.png"
            alt="Descriptive Alt Text"
            className="
              w-full 
              object-cover 
              h-[220px]       /* Smaller mobile phones */
              xs:h-[260px]    /* Larger mobile phones */
              sm:h-[320px]    /* Small tablets */
              md:h-[400px]    /* Medium tablets */
              lg:h-[500px]    /* Small desktop */
              xl:h-[600px]    /* Large desktops */
              2xl:h-[700px]   /* Extra large screens */
              block
            "
          />
        </motion.div>
      </section>

      {/* Selected Works Section - Enhanced Mobile Grid */}
      <section className="flex flex-col items-center justify-center min-h-screen bg-[#000000] py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 relative z-10">
       
        {/* Projects Grid - Better Mobile/Tablet Handling */}
        <div className="w-full max-w-[1200px] space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24">
          
          {/* First Project Row - Enhanced Responsive Layout */}
          <div className="flex flex-col xl:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-6">
            
            {/* Large Project - The Ocean */}
            <div className="flex-[2_0_0] space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10">
              <motion.div
                className="group relative cursor-pointer"
                initial={getInitialState({ opacity: 0, y: 140 })}
                whileInView={getAnimateState({ opacity: 1, y: 0 })}
                transition={{ 
                  duration: 2, 
                  ease: [0.16, 1, 0.3, 1], 
                  delay: isLoadingComplete ? 0.8 : 0 
                }}
                viewport={{ once: true, margin: '-50px' }}
                whileHover={{ scale: 1.02 }}
                onClick={() => onNavigate('ocean')}
              >
                <div className="aspect-[1.72/1] w-full relative overflow-hidden rounded-sm">
                  <div 
                    className="absolute inset-0 bg-gray-200"
                    style={{
                      opacity: 0.1
                    }}
                  />
                  <video
                    className="w-full h-full object-cover"
                    src="/assets/videos/ocean-video.mp4"
                    autoPlay  
                    loop
                    muted
                    playsInline
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
                </div>
                
                {/* Project Info - Enhanced Hover Animation */}
                <div className="flex items-start justify-start w-full pt-3 md:pt-4 overflow-hidden">
                  <span className="text-[#ffffff] text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] font-normal tracking-[-0.01em] uppercase font-mono">1</span>
                  <span className="text-[#ffffff] text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] font-normal tracking-[-0.01em] uppercase font-mono mx-2">/</span>
                  <div className="flex-1 relative h-[14px] sm:h-[15px] md:h-[16px] lg:h-[17px] overflow-hidden">
                    {/* Default Title - Completely disappears on hover */}
                    <motion.div 
                      className="absolute top-0 left-0 text-[#ffffff] text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] font-normal tracking-[-0.01em] uppercase font-mono leading-none"
                      initial={{ opacity: 1, y: 0 }}
                      whileHover={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      The Ocean
                    </motion.div>
                    {/* Hover Title - Takes over completely */}
                    <motion.div 
                      className="absolute top-0 left-0 text-[#ffffff] text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] font-normal tracking-[-0.01em] uppercase font-mono leading-none"
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                    >
                      VIEW PROJECT
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Two Smaller Projects - Better Mobile Spacing */}
            <div className="flex-1 space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12">
              
              {/* Project 2 - Mphepo */}
              <motion.div
                className="group relative cursor-pointer"
                initial={getInitialState({ opacity: 0, y: 140 })}
                whileInView={getAnimateState({ opacity: 1, y: 0 })}
                transition={{ 
                  duration: 2, 
                  ease: [0.16, 1, 0.3, 1], 
                  delay: isLoadingComplete ? 0.9 : 0 
                }}
                viewport={{ once: true, margin: '-50px' }}
                whileHover={{ scale: 1.02 }}
                onClick={() => onNavigate('mphepo')}
              >
                <div className="aspect-[1.27/1] w-full relative overflow-hidden rounded-sm">
                  <div 
                    className="absolute inset-0 bg-gray-200"
                    style={{
                      opacity: 0.1
                    }}
                  />
                  <img
                    className="w-full h-full object-cover"
                    src="/assets/images/tree.png"
                    alt="Beyond the Frame"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
                </div>
                
                <div className="flex items-start justify-start w-full pt-3 md:pt-4 overflow-hidden">
                  <span className="text-[#ffffff] text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] font-normal tracking-[-0.01em] uppercase font-mono">2</span>
                  <span className="text-[#fbfbff] text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] font-normal tracking-[-0.01em] uppercase font-mono mx-2">/</span>
                  <div className="flex-1 relative h-[14px] sm:h-[15px] md:h-[16px] lg:h-[17px] overflow-hidden">
                    {/* Default Title - Completely disappears on hover */}
                    <motion.div 
                      className="absolute top-0 left-0 text-[#ffffff] text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] font-normal tracking-[-0.01em] uppercase font-mono leading-none"
                      initial={{ opacity: 1, y: 0 }}
                      whileHover={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      Mphepo
                    </motion.div>
                    {/* Hover Title - Takes over completely */}
                    <motion.div 
                      className="absolute top-0 left-0 text-[#ffffff] text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] font-normal tracking-[-0.01em] uppercase font-mono leading-none"
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                    >
                      VIEW PROJECT
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Project 3 - Poetry in Motion */}
              <motion.div
                className="group relative cursor-pointer"
                initial={getInitialState({ opacity: 0, y: 140 })}
                whileInView={getAnimateState({ opacity: 1, y: 0 })}
                transition={{ 
                  duration: 2, 
                  ease: [0.16, 1, 0.3, 1], 
                  delay: isLoadingComplete ? 1.0 : 0 
                }}
                viewport={{ once: true, margin: '-50px' }}
                whileHover={{ scale: 1.02 }}
                onClick={() => onNavigate('poetry-in-motion')}
              >
                <div className="aspect-[1.27/1] w-full relative overflow-hidden rounded-sm">
                  <div 
                    className="absolute inset-0 bg-gray-200"
                    style={{
                      opacity: 0.1
                    }}
                  />
                  <img
                    className="w-full h-full object-cover"
                    src="/assets/images/solokitchen.png"
                    alt="The Essence"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
                </div>
                
                <div className="flex items-start justify-start w-full pt-3 md:pt-4 overflow-hidden">
                  <span className="text-[#ffffff] text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] font-normal tracking-[-0.01em] uppercase font-mono">3</span>
                  <span className="text-[#ffffff] text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] font-normal tracking-[-0.01em] uppercase font-mono mx-2">/</span>
                  <div className="flex-1 relative h-[14px] sm:h-[15px] md:h-[16px] lg:h-[17px] overflow-hidden">
                    {/* Default Title - Completely disappears on hover */}
                    <motion.div 
                      className="absolute top-0 left-0 text-[#ffffff] text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] font-normal tracking-[-0.01em] uppercase font-mono leading-none"
                      initial={{ opacity: 1, y: 0 }}
                      whileHover={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      Poetry In Motion
                    </motion.div>
                    {/* Hover Title - Takes over completely */}
                    <motion.div 
                      className="absolute top-0 left-0 text-[#ffffff] text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] font-normal tracking-[-0.01em] uppercase font-mono leading-none"
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                    >
                      VIEW PROJECT
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* View All Button - Fixed visibility */}
        <div className="flex items-center justify-center w-full pt-10 sm:pt-12 md:pt-14 lg:pt-16">
          <motion.button
            whileInView={getAnimateState({ opacity: 1 })}
            transition={{ 
              duration: 0.6, 
              ease: [0, 0, 1, 1], 
              delay: isLoadingComplete ? 0.5 : 0 
            }}
            viewport={{ once: true, margin: '-100px' }}
            onClick={() => onNavigate('work')}
            className="text-[#FFFFFF] text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] font-normal tracking-[-0.01em] uppercase font-mono hover:opacity-70 transition-opacity cursor-pointer"
          >
            VIEW ALL
          </motion.button>
        </div>
      </section>

      {/* About Section - Refined Mobile Experience */}
      <section className="flex flex-col items-center justify-center min-h-screen bg-[#000000] py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 relative z-10">
        
        {/* Section Header with Refined Typography */}
        <div className="flex flex-col items-start w-full max-w-[1200px] mb-8 sm:mb-12 md:mb-16 lg:mb-24">
          
          {/* Subtle divider line */}
          <motion.div 
            className="w-full h-px mb-4 sm:mb-6 md:mb-8 lg:mb-12"
            initial={getInitialState({ scaleX: 0 })}
            whileInView={getAnimateState({ scaleX: 1 })}
            transition={{ 
              duration: 1.2, 
              ease: [0.16, 1, 0.3, 1] 
            }}
            viewport={{ once: true, margin: '-100px' }}
            style={{ transformOrigin: 'left' }}
          >
            <div className="w-full h-px bg-gradient-to-r from-[#333333] via-[#1a1a1a] to-transparent" />
          </motion.div>

          {/* Title Treatment */}
          <div className="flex flex-col gap-1 sm:gap-2 mb-2 sm:mb-3 md:mb-4 lg:mb-6">
            <motion.div
              initial={getInitialState({ opacity: 0, y: 40 })}
              whileInView={getAnimateState({ opacity: 1, y: 0 })}
              transition={{ 
                duration: 1.2, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              viewport={{ once: true, margin: '-100px' }}
              className="text-[#fbf9f7] font-normal tracking-[-0.04em] leading-[0.85]"
              style={{
                fontFamily: 'Fahkwang, sans-serif',
                fontSize: 'clamp(32px, 8.5vw, 120px)', // Slightly smaller on mobile
                fontWeight: 300
              }}
            >
              ABOUT
            </motion.div>
            
            {/* Refined subtitle */}
            <motion.div
              initial={getInitialState({ opacity: 0, y: 30 })}
              whileInView={getAnimateState({ opacity: 1, y: 0 })}
              transition={{ 
                duration: 1, 
                ease: [0.16, 1, 0.3, 1], 
                delay: isLoadingComplete ? 0.2 : 0 
              }}
              viewport={{ once: true, margin: '-100px' }}
              className="text-[#666666] font-light tracking-[0.02em] uppercase"
              style={{
                fontFamily: 'Azeret Mono, monospace',
                fontSize: 'clamp(8px, 2vw, 12px)', // Better mobile scaling
                letterSpacing: '0.1em'
              }}
            >
              Sir Practice Jr.
            </motion.div>
          </div>
        </div>

        {/* Main Content Grid - Mobile-First Approach */}
        <div className="w-full max-w-[1200px]">
          
          {/* Mobile Layout (< lg) - Stacked vertically */}
          <div className="lg:hidden flex flex-col gap-6 sm:gap-8">
            
            {/* Mobile Image - Optimized size and positioning */}
            <motion.div
              initial={getInitialState({ opacity: 0, scale: 0.95 })}
              whileInView={getAnimateState({ opacity: 1, scale: 1 })}
              transition={{ 
                duration: 1.4, 
                ease: [0.16, 1, 0.3, 1], 
                delay: isLoadingComplete ? 0.3 : 0 
              }}
              viewport={{ once: true, margin: '-100px' }}
              className="relative group w-full flex justify-center"
            >
              <div className="relative overflow-hidden rounded-sm w-full max-w-[280px] sm:max-w-[320px]">
                <div className="aspect-[3/4] w-full relative">
                  <img
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.02]"
                    src="/assets/images/portfolio.jpeg"
                    alt="Sir Practice - Artist Portrait"
                  />
                  
                  {/* Subtle overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20 z-10" />
                  
                  {/* Subtle border effect */}
                  <div className="absolute inset-0 border border-white/5 rounded-sm" />
                </div>
              </div>
            </motion.div>
            
            {/* Mobile Content */}
            <div className="flex flex-col space-y-4 sm:space-y-5">
              
              {/* Primary Description - Mobile optimized */}
              <motion.div
                initial={getInitialState({ opacity: 0, y: 40 })}
                whileInView={getAnimateState({ opacity: 1, y: 0 })}
                transition={{ 
                  duration: 1.2, 
                  ease: [0.16, 1, 0.3, 1], 
                  delay: isLoadingComplete ? 0.4 : 0 
                }}
                viewport={{ once: true, margin: '-100px' }}
                className="text-[#fbf9f7] font-light leading-[1.5] tracking-[-0.01em] text-center sm:text-left"
                style={{
                  fontFamily: 'Fahkwang, sans-serif',
                  fontSize: 'clamp(16px, 4.2vw, 20px)' // Better mobile readability
                }}
              >
                Storyteller. Artist. Cartographer of identity.
                <br />
                <span className="text-[#cccccc]">
                  Sir Practice traces the routes between heritage and becoming, pain and purpose.
                </span>
              </motion.div>
              
              {/* Secondary Description - Mobile optimized */}
              <motion.div
                initial={getInitialState({ opacity: 0, y: 40 })}
                whileInView={getAnimateState({ opacity: 1, y: 0 })}
                transition={{ 
                  duration: 1.2, 
                  ease: [0.16, 1, 0.3, 1], 
                  delay: isLoadingComplete ? 0.6 : 0 
                }}
                viewport={{ once: true, margin: '-100px' }}
                className="text-[#aaaaaa] font-light leading-[1.6] tracking-[-0.005em] text-center sm:text-left"
                style={{
                  fontFamily: 'Fahkwang, sans-serif',
                  fontSize: 'clamp(14px, 3.5vw, 17px)' // Slightly larger for mobile readability
                }}
              >
                He believes that growth is a cycle of inhaling hope and exhaling purpose, and his work serves as both compass and companion for that journey.
              </motion.div>

              {/* Mobile CTA Button - Centered */}
              <motion.div
                initial={getInitialState({ opacity: 0, y: 20 })}
                whileInView={getAnimateState({ opacity: 1, y: 0 })}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.16, 1, 0.3, 1], 
                  delay: isLoadingComplete ? 1 : 0 
                }}
                viewport={{ once: true, margin: '-100px' }}
                className="pt-4 sm:pt-5 flex justify-center sm:justify-start"
              >
                <button
                  onClick={() => onNavigate('about')}
                  className="group relative overflow-hidden"
                >
                  {/* Button background with hover effect */}
                  <div className="absolute inset-0 bg-[#111111] border border-[#333333] rounded-sm transition-all duration-300 group-hover:border-[#555555]" />
                  
                  {/* Button content */}
                  <div className="relative px-5 sm:px-6 py-3 sm:py-3 flex items-center gap-2 sm:gap-3">
                    <span className="text-[#fbf9f7] font-normal tracking-[0.05em] uppercase transition-all duration-300 group-hover:tracking-[0.08em]"
                      style={{
                        fontFamily: 'Azeret Mono, monospace',
                        fontSize: 'clamp(10px, 2.4vw, 12px)' // Slightly larger for mobile
                      }}
                    >
                      Read More
                    </span>
                    
                    {/* Arrow icon */}
                    <div className="w-3 h-3 sm:w-4 sm:h-4 relative overflow-hidden">
                      <div className="absolute inset-0 transform transition-transform duration-300 group-hover:translate-x-1">
                        <svg 
                          width="100%" 
                          height="100%" 
                          viewBox="0 0 16 16" 
                          fill="none" 
                          className="text-[#fbf9f7]"
                        >
                          <path 
                            d="M6 4L10 8L6 12" 
                            stroke="currentColor" 
                            strokeWidth="1" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </button>
              </motion.div>
            </div>
          </div>

          {/* Desktop Layout (lg+) - Side by side with existing positioning */}
          <div className="hidden lg:grid grid-cols-12 gap-12 xl:gap-16 items-start">
            
            {/* Desktop Image Column - Keep existing positioning */}
            <div className="col-span-5" style={{ position: 'relative', top: '-90px' }}>
              <motion.div
                initial={getInitialState({ opacity: 0, scale: 0.95 })}
                whileInView={getAnimateState({ opacity: 1, scale: 1 })}
                transition={{ 
                  duration: 1.4, 
                  ease: [0.16, 1, 0.3, 1], 
                  delay: isLoadingComplete ? 0.3 : 0 
                }}
                viewport={{ once: true, margin: '-100px' }}
                className="relative group"
              >
                <div className="relative overflow-hidden rounded-sm">
                  <div className="aspect-[4/6] w-full relative">
                    <img
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.02]"
                      src="/assets/images/portfolio.jpeg"
                      alt="Sir Practice - Artist Portrait"
                    />
                    
                    {/* Subtle overlay for depth */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20 z-10" />
                    
                    {/* Subtle border effect */}
                    <div className="absolute inset-0 border border-white/5 rounded-sm" />
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Desktop Content Column - Keep existing */}
            <div className="col-span-7 flex flex-col justify-start space-y-10">
              
              {/* Primary Description */}
              <motion.div
                initial={getInitialState({ opacity: 0, y: 40 })}
                whileInView={getAnimateState({ opacity: 1, y: 0 })}
                transition={{ 
                  duration: 1.2, 
                  ease: [0.16, 1, 0.3, 1], 
                  delay: isLoadingComplete ? 0.4 : 0 
                }}
                viewport={{ once: true, margin: '-100px' }}
                className="text-[#fbf9f7] font-light leading-[1.6] tracking-[-0.01em]"
                style={{
                  fontFamily: 'Fahkwang, sans-serif',
                  fontSize: 'clamp(15px, 3.8vw, 22px)'
                }}
              >
                Storyteller. Artist. Cartographer of identity.
                <br />
                <span className="text-[#cccccc]">
                  Sir Practice traces the routes between heritage and becoming, pain and purpose.
                </span>
              </motion.div>
              
              {/* Secondary Description */}
              <motion.div
                initial={getInitialState({ opacity: 0, y: 40 })}
                whileInView={getAnimateState({ opacity: 1, y: 0 })}
                transition={{ 
                  duration: 1.2, 
                  ease: [0.16, 1, 0.3, 1], 
                  delay: isLoadingComplete ? 0.6 : 0 
                }}
                viewport={{ once: true, margin: '-100px' }}
                className="text-[#aaaaaa] font-light leading-[1.7] tracking-[-0.005em]"
                style={{
                  fontFamily: 'Fahkwang, sans-serif',
                  fontSize: 'clamp(13px, 3.2vw, 18px)'
                }}
              >
                He believes that growth is a cycle of inhaling hope and exhaling purpose, and his work serves as both compass and companion for that journey.
              </motion.div>

              {/* Desktop CTA Button */}
              <motion.div
                initial={getInitialState({ opacity: 0, y: 20 })}
                whileInView={getAnimateState({ opacity: 1, y: 0 })}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.16, 1, 0.3, 1], 
                  delay: isLoadingComplete ? 1 : 0 
                }}
                viewport={{ once: true, margin: '-100px' }}
                className="pt-6"
              >
                <button
                  onClick={() => onNavigate('about')}
                  className="group relative overflow-hidden"
                >
                  {/* Button background with hover effect */}
                  <div className="absolute inset-0 bg-[#111111] border border-[#333333] rounded-sm transition-all duration-300 group-hover:border-[#555555]" />
                  
                  {/* Button content */}
                  <div className="relative px-6 py-3 flex items-center gap-3">
                    <span className="text-[#fbf9f7] font-normal tracking-[0.05em] uppercase transition-all duration-300 group-hover:tracking-[0.08em]"
                      style={{
                        fontFamily: 'Azeret Mono, monospace',
                        fontSize: 'clamp(9px, 2.2vw, 12px)'
                      }}
                    >
                      Read More
                    </span>
                    
                    {/* Arrow icon */}
                    <div className="w-4 h-4 relative overflow-hidden">
                      <div className="absolute inset-0 transform transition-transform duration-300 group-hover:translate-x-1">
                        <svg 
                          width="100%" 
                          height="100%" 
                          viewBox="0 0 16 16" 
                          fill="none" 
                          className="text-[#fbf9f7]"
                        >
                          <path 
                            d="M6 4L10 8L6 12" 
                            stroke="currentColor" 
                            strokeWidth="1" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Azeret+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');
        
        * {
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          padding: 0;
          font-family: 'Inter', sans-serif;
          background-color: #f6f3ec;
        }
        
        .font-mono {
          font-family: 'Azeret Mono', monospace;
        }

        /* Custom breakpoint for extra small devices */
        @media (min-width: 475px) {
          .xs:h-\[260px\] {
            height: 260px !important;
          }
        }

        /* Enhanced mobile optimizations */
        @media (max-width: 640px) {
          /* Prevent horizontal scroll on mobile */
          body {
            overflow-x: hidden;
          }
          
          /* Better touch targets on mobile */
          button {
            min-height: 44px;
            min-width: 44px;
          }
        }

        /* Tablet optimizations */
        @media (min-width: 641px) and (max-width: 1024px) {
          /* Optimize spacing for tablets */
          .space-y-12 > * + * {
            margin-top: 2.5rem !important;
          }
        }

        /* Desktop-specific styles for better image alignment */
        @media (min-width: 1024px) {
          /* Better aspect ratio for desktop to align with content height */
          .lg\:aspect-\[4\/6\] {
            aspect-ratio: 4/6 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;