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

      {/* Hero Section -  Mobile/Tablet Responsiveness */}
      <section className="flex flex-col justify-end min-h-[80vh] w-full px-[10px] sm:px-[20px] md:px-[30px] lg:px-[10px] relative bg-[#000000] overflow-hidden z-10">
        
        {/* Title + Subtitle Row - Stack on Mobile */}
        <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6 lg:gap-0 mb-[40px]">
          
          {/* Left Title - Responsive Typography */}
          <motion.div
            className="text-[#fbf9f7] font-normal uppercase"
            style={{
              fontFamily: 'Fahkwang, sans-serif',
              fontSize: 'clamp(32px, 8vw, 84px)', // Much more responsive scaling
              lineHeight: '0.9',
              whiteSpace: 'nowrap',
            }}
            initial={getInitialState({ opacity: 0, y: 100 })}
            animate={getAnimateState({ opacity: 1, y: 0 })}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: isLoadingComplete ? 0.3 : 0 }}
          >
            Sir Practice
          </motion.div>

          {/* Right Subtitle - Better Mobile Layout */}
          <motion.div
            className="text-[#fbf9f7] font-light text-left max-w-full lg:max-w-[40%]"
            style={{
              fontFamily: 'Fahkwang, sans-serif',
              fontSize: 'clamp(14px, 3.5vw, 16px)', // Responsive font size
              lineHeight: '1.4',
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

      {/* Full Width Hero Image Section -  Responsive Heights */}
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
              h-[250px]       /* Mobile phones - smaller for better proportions */
              xs:h-280        /* Large mobile phones */
              sm:h-[350px]    /* Small tablets */
              md:h-[450px]    /* Large tablets */
              lg:h-[550px]    /* Small desktop */
              xl:h-[641px]    /* Large desktops */
              2xl:h-[700px]   /* Extra large screens */
              block
            "
          />
        </motion.div>
      </section>

      {/* Selected Works Section -  Mobile Grid */}
      <section className="flex flex-col items-center justify-center min-h-screen bg-[#000000] py-12 sm:py-16 md:py-20 px-4 sm:px-5 md:px-8 lg:px-5 relative z-10">
       
        {/* Projects Grid - Better Mobile Stacking */}
        <div className="w-full max-w-[1200px] space-y-16 sm:space-y-20 md:space-y-24">
          
          {/* First Project Row - Stack on Mobile/Tablet */}
          <div className="flex flex-col lg:flex-row gap-8 md:gap-10 lg:gap-5">
            {/* Large Project - The Ocean */}
            <div className="flex-[2_0_0] space-y-6 md:space-y-8 lg:space-y-10">
              <motion.div
                className="group relative cursor-pointer"
                initial={getInitialState({ opacity: 0.001, y: 140 })}
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
                
                {/* Project Info - Better Mobile Typography */}
                <div className="flex items-start justify-start w-full pt-3 md:pt-4 overflow-hidden">
                  <span className="text-[#ffffff] text-[11px] sm:text-[12px] md:text-[13px] font-normal tracking-[-0.01em] uppercase font-mono">1</span>
                  <span className="text-[#ffffff] text-[11px] sm:text-[12px] md:text-[13px] font-normal tracking-[-0.01em] uppercase font-mono mx-2">/</span>
                  <div className="flex-1 relative">
                    {/* Default Title */}
                    <div className="text-[#ffffff] text-[11px] sm:text-[12px] md:text-[13px] font-normal tracking-[-0.01em] uppercase font-mono leading-relaxed transform transition-transform duration-500 group-hover:-translate-y-6">
                      The Ocean
                    </div>
                    {/* Hover Title */}
                    <div className="absolute top-0 text-[#fefeff] text-[11px] sm:text-[12px] md:text-[13px] font-normal tracking-[-0.01em] uppercase font-mono opacity-80 transform translate-y-6 transition-transform duration-500 group-hover:translate-y-0">
                      VIEW PROJECT
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Two Smaller Projects - Better Mobile Spacing */}
            <div className="flex-1 space-y-8 md:space-y-10">
              {/* Project 2 - Mphepo */}
              <motion.div
                className="group relative cursor-pointer"
                initial={getInitialState({ opacity: 0.001, y: 140 })}
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
                  <span className="text-[#ffffff] text-[11px] sm:text-[12px] md:text-[13px] font-normal tracking-[-0.01em] uppercase font-mono">2</span>
                  <span className="text-[#fbfbff] text-[11px] sm:text-[12px] md:text-[13px] font-normal tracking-[-0.01em] uppercase font-mono mx-2">/</span>
                  <div className="flex-1 relative">
                    {/* Default Title */}
                    <div className="text-[#ffffff] text-[11px] sm:text-[12px] md:text-[13px] font-normal tracking-[-0.01em] uppercase font-mono leading-relaxed transform transition-transform duration-500 group-hover:-translate-y-6">
                      Mphepo
                    </div>
                    {/* Hover Title */}
                    <div className="absolute top-0 text-[#ffffff] text-[11px] sm:text-[12px] md:text-[13px] font-normal tracking-[-0.01em] uppercase font-mono opacity-80 transform translate-y-6 transition-transform duration-500 group-hover:translate-y-0">
                      VIEW PROJECT
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Project 3 - Poetry in Motion */}
              <motion.div
                className="group relative cursor-pointer"
                initial={getInitialState({ opacity: 0.001, y: 140 })}
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
                  <span className="text-[#ffffff] text-[11px] sm:text-[12px] md:text-[13px] font-normal tracking-[-0.01em] uppercase font-mono">3</span>
                  <span className="text-[#ffffff] text-[11px] sm:text-[12px] md:text-[13px] font-normal tracking-[-0.01em] uppercase font-mono mx-2">/</span>
                  <div className="flex-1 relative">
                    {/* Default Title */}
                    <div className="text-[#ffffff] text-[11px] sm:text-[12px] md:text-[13px] font-normal tracking-[-0.01em] uppercase font-mono leading-relaxed transform transition-transform duration-500 group-hover:-translate-y-6">
                      Poetry In Motion
                    </div>
                    {/* Hover Title */}
                    <div className="absolute top-0 text-[#ffffff] text-[11px] sm:text-[12px] md:text-[13px] font-normal tracking-[-0.01em] uppercase font-mono opacity-80 transform translate-y-6 transition-transform duration-500 group-hover:translate-y-0">
                      VIEW PROJECT
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* View All Button - Better Mobile Spacing */}
        <div className="flex items-center justify-center w-full pt-12 sm:pt-14 md:pt-16">
          <motion.button
            initial={getInitialState({ opacity: 0.001 })}
            whileInView={getAnimateState({ opacity: 1 })}
            transition={{ 
              duration: 0.6, 
              ease: [0, 0, 1, 1], 
              delay: isLoadingComplete ? 0.5 : 0 
            }}
            viewport={{ once: true, margin: '-100px' }}
            onClick={() => onNavigate('work')}
            className="text-[#FFFFFF] text-[11px] sm:text-[12px] md:text-[13px] font-normal tracking-[-0.01em] uppercase font-mono hover:opacity-70 transition-opacity cursor-pointer"
          >
            VIEW ALL
          </motion.button>
        </div>
      </section>

     {/* About Section -  Design */}
      <section className="flex flex-col items-center justify-center min-h-screen bg-[#000000] py-12 sm:py-16 md:py-20 px-4 sm:px-5 md:px-8 lg:px-5 relative z-10">
        
        {/* Section Header with Refined Typography */}
        <div className="flex flex-col items-start w-full max-w-[1200px] mb-16 sm:mb-20 md:mb-24">
          
          {/* Subtle divider line */}
          <motion.div 
            className="w-full h-px mb-8 sm:mb-10 md:mb-12"
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
          <div className="flex flex-col gap-2 mb-4 sm:mb-6">
            <motion.div
              initial={getInitialState({ opacity: 0, y: 40 })}
              whileInView={getAnimateState({ opacity: 1, y: 0 })}
              transition={{ 
                duration: 1.2, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              viewport={{ once: true, margin: '-100px' }}
              className="text-[#fbf9f7] font-normal tracking-[-0.04em] leading-[0.9]"
              style={{
                fontFamily: 'Fahkwang, sans-serif',
                fontSize: 'clamp(48px, 12vw, 120px)',
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
                fontSize: 'clamp(10px, 2.5vw, 12px)',
                letterSpacing: '0.1em'
              }}
            >
              Sir Practice Jr.
            </motion.div>
          </div>
        </div>

        {/* Main Content Grid -  Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 w-full max-w-[1200px] items-start">
          
          {/* Image Column -  with subtle effects */}
          <div className="lg:col-span-5">
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
              {/* Image container with subtle border */}
              <div className="relative overflow-hidden rounded-sm">
                <div className="aspect-[4/5] w-full relative">
                  {/* Subtle overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20 z-10" />
                  
                  <img
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.02]"
                    src="/assets/images/portfolio.jpeg"
                    alt="Sir Practice - Artist Portrait"
                  />
                  
                  {/* Subtle border effect */}
                  <div className="absolute inset-0 border border-white/5 rounded-sm" />
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Content Column -  Typography & Spacing */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8 md:space-y-10">
            
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
                fontSize: 'clamp(16px, 4vw, 22px)'
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
              className="text-[#aaaaaa] font-light leading-[1.7] tracking-[-0.005em] max-w-[90%]"
              style={{
                fontFamily: 'Fahkwang, sans-serif',
                fontSize: 'clamp(14px, 3.5vw, 18px)'
              }}
            >
              He believes that growth is a cycle of inhaling hope and exhaling purpose, and his work serves as both compass and companion for that journey.
            </motion.div>

            {/* Quote Section -  Design */}
            <motion.div
              initial={getInitialState({ opacity: 0, x: -30 })}
              whileInView={getAnimateState({ opacity: 1, x: 0 })}
              transition={{ 
                duration: 1, 
                ease: [0.16, 1, 0.3, 1], 
                delay: isLoadingComplete ? 0.8 : 0 
              }}
              viewport={{ once: true, margin: '-100px' }}
              className="relative pl-6 md:pl-8 border-l border-[#333333]"
            >
             
            </motion.div>

            {/*  CTA Button */}
            <motion.div
              initial={getInitialState({ opacity: 0, y: 20 })}
              whileInView={getAnimateState({ opacity: 1, y: 0 })}
              transition={{ 
                duration: 0.8, 
                ease: [0.16, 1, 0.3, 1], 
                delay: isLoadingComplete ? 1 : 0 
              }}
              viewport={{ once: true, margin: '-100px' }}
              className="pt-4 md:pt-6"
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
                      fontSize: 'clamp(10px, 2.5vw, 12px)'
                    }}
                  >
                    Read Full Story
                  </span>
                  
                  {/* Arrow icon */}
                  <div className="w-4 h-4 relative overflow-hidden">
                    <div className="absolute inset-0 transform transition-transform duration-300 group-hover:translate-x-1">
                      <svg 
                        width="16" 
                        height="16" 
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
          .xs:h-280 {
            height: 280px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;