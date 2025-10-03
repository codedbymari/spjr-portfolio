import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const TextLine = ({ text, className, index, smoothProgress }) => {
  const opacity = useTransform(smoothProgress, 
    [0, 0.3 + index * 0.1, 0.5 + index * 0.1], 
    [0, 0, 1]
  );
  const y = useTransform(smoothProgress,
    [0, 0.3 + index * 0.1, 0.5 + index * 0.1],
    ["15px", "15px", "0px"]
  );

  return (
    <motion.div
      className={`text-white mb-4 last:mb-0 ${className}`}
      style={{
        fontFamily: 'Fahkwang, sans-serif',
        textShadow: '0 2px 20px rgba(0,0,0,0.7)',
        opacity,
        y,
      }}
    >
      {text}
    </motion.div>
  );
};

const HeroImage = ({ isDark, colors }) => {
  const containerRef = useRef(null);
  const scrollYProgress = useMotionValue(0);
  const [radiusProgress, setRadiusProgress] = useState(0);

  // Calculate scroll progress for radius animation
  const computeRadiusProgress = useCallback(() => {
    if (!containerRef.current) return 0;

    const rect = containerRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
    const elementTop = rect.top + scrollTop;
    const elementHeight = rect.height;

    // Start: bottom enters view, End: center leaves view
    const startPos = elementTop + elementHeight - windowHeight;
    const endPos = elementTop + elementHeight / 2;

    const rawProgress = (scrollTop - startPos) / (endPos - startPos);
    return Math.max(0, Math.min(1, rawProgress));
  }, []);

  // Scroll progress tracking
  useEffect(() => {
    let rafId = null;

    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far through the element we've scrolled
      const progress = 1 - (rect.top + rect.height) / (windowHeight + rect.height);
      scrollYProgress.set(Math.max(0, Math.min(1, progress)));

      // Calculate radius animation progress
      const radiusProg = computeRadiusProgress();
      setRadiusProgress(radiusProg);
    };

    const tick = () => {
      handleScroll();
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [scrollYProgress, computeRadiusProgress]);

  // Smooth the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  // Parallax effect - image moves slower than scroll
  const imageY = useTransform(smoothProgress, [0, 1], ["0%", "20%"]);
  
  // Improved text reveal with staggered animation
  const textOpacity = useTransform(smoothProgress, [0, 0.4], [0, 1]);
  const textY = useTransform(smoothProgress, [0, 0.4], ["20px", "0px"]);
  const textScale = useTransform(smoothProgress, [0, 0.4], [0.95, 1]);

  // Container expansion - starts at 90% with rounded corners, ends at 100% with no corners
  const containerWidth = useTransform(smoothProgress, [0, 1], ["90%", "100%"]);
  const borderRadius = useTransform(smoothProgress, [0, 1], ["32px", "0px"]);
  const marginX = useTransform(smoothProgress, [0, 1], ["auto", "0"]);

  // Radius animation - starts at 32px, ends at 0px (fills out)
  const startRadius = 32;
  const endRadius = 0;
  const currentRadius = startRadius + (endRadius - startRadius) * radiusProgress;

  // No padding animation
  const currentPadding = 0;

  const textLines = [
    { text: "SIR PRACTICE.", className: "text-5xl md:text-6xl lg:text-7xl font-medium" },
    { text: "STORYTELLER. ARTIST.", className: "text-2xl md:text-3xl lg:text-4xl font-light tracking-wide" },
    { text: "Cartographer of identity.", className: "text-xl md:text-2xl lg:text-3xl font-light italic" }
  ];

  return (
    <section 
      ref={containerRef}
      className="w-full relative z-10 min-h-[140vh] flex items-center justify-center"
      style={{ backgroundColor: colors?.primary }}
    >
      {/* Container that transforms from 90% rounded to 100% full width */}
      <motion.div
        className="h-full flex items-center justify-center"
        style={{
          width: containerWidth,
          borderRadius: borderRadius,
          marginLeft: marginX,
          marginRight: marginX,
        }}
      >
        {/* Outer wrapper - just for border radius, no padding */}
        <div
          className="relative w-full h-screen overflow-hidden"
          style={{
            borderRadius: `${currentRadius}px`,
          }}
        >
          {/* Background image with parallax */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{ y: imageY }}
          >
            <img
              src="/assets/images/HERO.png"
              alt="Hero"
              className="w-full h-full object-cover"
              style={{
                filter: isDark ? 'brightness(0.9) contrast(1.1)' : 'brightness(1.1) contrast(0.95)',
              }}
            />
            
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>

          {/* Text content with improved styling */}
          <motion.div
            className="relative z-10 text-center px-6 max-w-4xl mx-auto flex items-center justify-center h-full"
            style={{
              opacity: textOpacity,
              y: textY,
              scale: textScale,
            }}
          >
            <div>
              {textLines.map((line, index) => (
                <TextLine
                  key={index}
                  text={line.text}
                  className={line.className}
                  index={index}
                  smoothProgress={smoothProgress}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroImage;