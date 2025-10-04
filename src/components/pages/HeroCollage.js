import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const HeroCollage = ({ isLoadingComplete }) => {
  const { isDark, colors } = useTheme();
  const [showWords, setShowWords] = useState(false);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  useEffect(() => {
    const timer = setTimeout(() => setShowWords(true), isLoadingComplete ? 400 : 100);
    return () => clearTimeout(timer);
  }, [isLoadingComplete]);

  const wordPieces = [
    { 
      id: 'theres', 
      src: '/assets/images/theres.png', 
      // Mobile: top, left, width | Tablet: top, left, width | Desktop: original
      mobile: { top: '5%', left: '15%', maxWidth: '130px' },
      tablet: { top: '10%', left: '12%', maxWidth: '160px' },
      desktop: { top: '10%', left: '15%', maxWidth: '180px' },
      rotate: -2, 
      delay: 0.1,
      scrollSpeed: -0.3,
      horizontalShift: -20
    },
    { 
      id: 'a', 
      src: '/assets/images/a.png', 
      mobile: { top: '11%', left: '60%', maxWidth: '40px' },
      tablet: { top: '17%', left: '50%', maxWidth: '55px' },
      desktop: { top: '18%', left: '30%', maxWidth: '60px' },
      rotate: 1, 
      delay: 0.4,
      scrollSpeed: 0.5,
      horizontalShift: 15
    },
    { 
      id: 'painting', 
      src: '/assets/images/painting.png', 
      mobile: { top: '16%', left: '8%', maxWidth: '240px' },
      tablet: { top: '24%', left: '15%', maxWidth: '290px' },
      desktop: { top: '25%', left: '20%', maxWidth: '320px' },
      rotate: -0.5, 
      delay: 0.7,
      scrollSpeed: -0.2,
      horizontalShift: -30
    },
    { 
      id: 'called', 
      src: '/assets/images/called.png', 
      mobile: { top: '28%', left: '10%', maxWidth: '105px' },
      tablet: { top: '38%', left: '10%', maxWidth: '135px' },
      desktop: { top: '40%', left: '10%', maxWidth: '150px' },
      rotate: -1.5, 
      delay: 1.0,
      scrollSpeed: 0.4,
      horizontalShift: 25
    },
    { 
      id: 'hunger', 
      src: '/assets/images/hunger.png', 
      mobile: { top: '33%', left: '35%', maxWidth: '210px' },
      tablet: { top: '41%', left: '42%', maxWidth: '250px' },
      desktop: { top: '43%', left: '35%', maxWidth: '280px' },
      rotate: 1, 
      delay: 1.3,
      scrollSpeed: -0.6,
      horizontalShift: -15
    },
    { 
      id: 'and', 
      src: '/assets/images/and.png', 
      mobile: { top: '44%', left: '15%', maxWidth: '85px' },
      tablet: { top: '50%', left: '15%', maxWidth: '110px' },
      desktop: { top: '52%', left: '18%', maxWidth: '120px' },
      rotate: 0.8, 
      delay: 1.6,
      scrollSpeed: 0.3,
      horizontalShift: 10
    },
    { 
      id: 'it', 
      src: '/assets/images/it.png', 
      mobile: { top: '50%', left: '58%', maxWidth: '50px' },
      tablet: { top: '60%', left: '48%', maxWidth: '65px' },
      desktop: { top: '63%', left: '40%', maxWidth: '70px' },
      rotate: -1, 
      delay: 1.9,
      scrollSpeed: -0.4,
      horizontalShift: -25
    },
    { 
      id: 'looks', 
      src: '/assets/images/looks.png', 
      mobile: { top: '56%', left: '8%', maxWidth: '135px' },
      tablet: { top: '63%', left: '60%', maxWidth: '160px' },
      desktop: { top: '65%', left: '58%', maxWidth: '180px' },
      rotate: -0.8, 
      delay: 2.2,
      scrollSpeed: 0.7,
      horizontalShift: 20
    },
    { 
      id: 'like', 
      src: '/assets/images/like.png', 
      mobile: { top: '70%', left: '35%', maxWidth: '110px' },
      tablet: { top: '70%', left: '18%', maxWidth: '140px' },
      desktop: { top: '70%', left: '20%', maxWidth: '150px' },
      rotate: -0.5, 
      delay: 2.5,
      scrollSpeed: -0.5,
      horizontalShift: -10
    },
    { 
      id: 'mybestwork', 
      src: '/assets/images/youmybestwork.png', 
      mobile: { top: '85%', left: '25%', maxWidth: '200px' },
      tablet: { top: '80%', left: '38%', maxWidth: '200px' },
      desktop: { top: '82%', left: '40%', maxWidth: '220px' },
      rotate: -0.5, 
      delay: 2.8,
      scrollSpeed: 0.2,
      horizontalShift: 15
    }
  ];

  const pieceVariants = {
    hidden: { opacity: 0, scale: 0.7, filter: "blur(14px)", y: -50 },
    visible: ({ rotate, delay }) => ({
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      y: 0,
      rotate,
      transition: {
        type: "spring",
        stiffness: 700,
        damping: 30,
        mass: 0.7,
        delay,
        duration: 0.7,
      }
    }),
    hover: ({ rotate }) => ({
      scale: 1.08,
      filter: "blur(0px) brightness(1.15)",
      rotate: rotate + (Math.random()-0.5)*2,
      zIndex: 2,
      transition: { type: "spring", stiffness: 600, damping: 18 }
    })
  };

  return (
    <section
      ref={containerRef}
      className="flex flex-col items-center justify-center min-h-[75vh] sm:min-h-[85vh] lg:min-h-[90vh] w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 relative overflow-hidden z-10 transition-colors duration-500 mb-12 sm:mb-16 lg:mb-20"
      style={{ backgroundColor: colors.primary }}
    >
      <div className="relative w-full max-w-[500px] h-[550px] sm:max-w-[600px] sm:h-[650px] md:max-w-[650px] md:h-[700px] lg:max-w-[700px] lg:h-[750px]">
        <AnimatePresence>
          {showWords && wordPieces.map(piece => (
            <WordPiece
              key={piece.id}
              piece={piece}
              scrollYProgress={scrollYProgress}
              isDark={isDark}
              pieceVariants={pieceVariants}
            />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

const WordPiece = ({ piece, scrollYProgress, isDark, pieceVariants }) => {
  const [dimensions, setDimensions] = useState(piece.mobile);

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setDimensions(piece.mobile);
      } else if (width < 1024) {
        setDimensions(piece.tablet);
      } else {
        setDimensions(piece.desktop);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [piece]);

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, piece.scrollSpeed * 300]
  );
  
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, piece.horizontalShift]
  );
  
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 0.8, 0]
  );

  return (
    <motion.img
      src={piece.src}
      alt=""
      custom={{ rotate: piece.rotate, delay: piece.delay }}
      variants={pieceVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      exit="hidden"
      style={{
        position: 'absolute',
        top: dimensions.top,
        left: dimensions.left,
        maxWidth: dimensions.maxWidth,
        width: 'auto',
        height: 'auto',
        rotate: `${piece.rotate}deg`,
        cursor: "pointer",
        y,
        x,
        opacity,
        filter: isDark
          ? 'brightness(0.95) drop-shadow(2px 3px 6px rgba(0,0,0,0.2))'
          : 'brightness(1.05) drop-shadow(2px 3px 6px rgba(0,0,0,0.15))',
      }}
    />
  );
};

export default HeroCollage;