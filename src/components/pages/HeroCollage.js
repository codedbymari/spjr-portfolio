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
      top: '10%', 
      left: '15%', 
      rotate: -2, 
      maxWidth: '180px', 
      delay: 0.1,
      scrollSpeed: -0.3,
      horizontalShift: -20
    },
    { 
      id: 'a', 
      src: '/assets/images/a.png', 
      top: '18%', 
      left: '30%', 
      rotate: 1, 
      maxWidth: '60px', 
      delay: 0.4,
      scrollSpeed: 0.5,
      horizontalShift: 15
    },
    { 
      id: 'painting', 
      src: '/assets/images/painting.png', 
      top: '25%', 
      left: '20%', 
      rotate: -0.5, 
      maxWidth: '320px', 
      delay: 0.7,
      scrollSpeed: -0.2,
      horizontalShift: -30
    },
    { 
      id: 'called', 
      src: '/assets/images/called.png', 
      top: '40%', 
      left: '10%', 
      rotate: -1.5, 
      maxWidth: '150px', 
      delay: 1.0,
      scrollSpeed: 0.4,
      horizontalShift: 25
    },
    { 
      id: 'hunger', 
      src: '/assets/images/hunger.png', 
      top: '43%', 
      left: '35%', 
      rotate: 1, 
      maxWidth: '280px', 
      delay: 1.3,
      scrollSpeed: -0.6,
      horizontalShift: -15
    },
    { 
      id: 'and', 
      src: '/assets/images/and.png', 
      top: '52%', 
      left: '18%', 
      rotate: 0.8, 
      maxWidth: '120px', 
      delay: 1.6,
      scrollSpeed: 0.3,
      horizontalShift: 10
    },
    { 
      id: 'it', 
      src: '/assets/images/it.png', 
      top: '63%', 
      left: '40%', 
      rotate: -1, 
      maxWidth: '70px', 
      delay: 1.9,
      scrollSpeed: -0.4,
      horizontalShift: -25
    },
    { 
      id: 'looks', 
      src: '/assets/images/looks.png', 
      top: '65%', 
      left: '58%', 
      rotate: -0.8, 
      maxWidth: '180px', 
      delay: 2.2,
      scrollSpeed: 0.7,
      horizontalShift: 20
    },
    { 
      id: 'like', 
      src: '/assets/images/like.png', 
      top: '70%', 
      left: '20%', 
      rotate: -0.5, 
      maxWidth: '150px', 
      delay: 2.5,
      scrollSpeed: -0.5,
      horizontalShift: -10
    },
    { 
      id: 'mybestwork', 
      src: '/assets/images/youmybestwork.png', 
      top: '82%', 
      left: '40%', 
      rotate: -0.5, 
      maxWidth: '220px', 
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
      className="flex flex-col items-center justify-center min-h-[85vh] sm:min-h-[90vh] w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 relative overflow-hidden z-10 transition-colors duration-500 mb-20"
      style={{ backgroundColor: colors.primary }}
    >
      <div className="relative w-full max-w-[700px] h-[650px] sm:h-[750px] md:h-[700px]">
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

// Separate component for each word to use hooks properly
const WordPiece = ({ piece, scrollYProgress, isDark, pieceVariants }) => {
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
        top: piece.top,
        left: piece.left,
        maxWidth: piece.maxWidth,
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