// src/components/pages/stories/MphepoPage.js
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const MphepoPage = ({ 
  currentPage, 
  onNavigate, 
  isAudioPlaying, 
  onToggleAudio, 
  isReadingMode, 
  onToggleReadingMode, 
  audioRef 
}) => {
  const [, setIsLoaded] = useState(false);
  const { scrollY } = useScroll();

  // Parallax effects
  const titleY = useTransform(scrollY, [0, 500], [0, -100]);
  const overlayOpacity = useTransform(scrollY, [0, 300], [0.5, 0.8]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const haikuLines = [
    "Souls inspired by change,", 
    "Lift weak arms and fallen leaves;", 
    "A heart finds its tree"
  ];

  const reflectionParagraphs = [
    'Before God said "Let there be life," his omniscient mind decided to create breath. Scriptures say, "Let there be light." But what ignites the light in my heart, if not the breath of life? So, God must first have held air in his palms and placed wind into my lazy lungs. Those same hands shaped my brown body from earth and clay. So, it\'s easy to recognise those raised in the same mud as me. Those hands sculpted my delicate scalp to emerge from my mother\'s womb. Why did you expose my skull when it would have been safer in a helmet? At first light, I cried. At first breath, I found mortality. This physical experience leads me to ponder the purpose of life after our birth. How does a helpless babe, with a weak neck, grow into a spine so strong and rigid that it can withstand gravity? Do we not wonder why we are placed in a world that seems designed to test our resilience? Those truths are most likely the recipe for our identity. You made me a vessel: full of air, fire, water, and mud. Then said, "Go forward and create the evidence of your existence.".',
    'After many years and seasons, I see wisdom in your lesson. "How to Breathe" is the first lesson for a seed. Lungs give a meek heart meaning, a purpose, a destination, and a destiny; find your tree. Mastering that organ can heal, build resilience, and even inspire. So, from whom should we learn how to let air flow through our machine?',
    'Life mimics a search for roots, branches, and new leaves. In a conversation with Vladi about identity and origins, a question arose. What is the shape of my development across the places I have called home? I saw my roots beginning in the heart of Africa, which gave me my traditions and values, and crossing the seas. New roots formed on the cold British islands. There, I got an education, friendships, and ambition. The branches developed there stretched and connected to the Americas. There I developed my spiritual resilience and honed my craft. New roots followed me across the Atlantic to provide stability. A picture of a promising fledgling tree. It has bright green leaves, strong branches, and a broad trunk that curves across the atlas. What roots anchor your identity?',
    'We search far and wide, only to look skyward. Our teachers have always been in front of us, breathing and growing as we do. We can look back at our lives. We\'ve, without realising, given them our bad and ugly. But, like an evergreen, they have always given us their best. Their spiritual and biological gifts are beautiful. They inhale the carbon dioxide from our lungs. In their natural purity, they return the same air and oxygen that God first gave us to breathe. My progress makes me think of the nature around me. A symbol of my existence. So, what has my tree taught me? That growth is a cycle of inhaling hope and exhaling purpose. As I inhale my experiences and lessons, my branches reach higher. There lies the connection between our creation and our identity. The same initial divine breath that came from God\'s palms is the same will that never ceases to inspire us to grow. This begs the question: is there a limit to our potential?'
  ];

  return (
    <div className="relative w-screen min-h-screen bg-black overflow-x-hidden">
      {/* Video Background */}
      <div className="fixed inset-0 w-full h-full z-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="./assets/videos/tree.mp4" type="video/mp4" />
        </video>
        {/* Dynamic overlay */}
        <motion.div 
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      </div>

      {/* Audio element */}
      {audioRef && (
        <audio ref={audioRef} loop>
          <source src="./assets/audio/mphepo-ambient.mp3" type="audio/mpeg" />
        </audio>
      )}

      {/* Back Button - Only shows on hover in top-left corner */}
      <motion.div
        className="fixed top-0 left-0 w-24 h-24 z-50 flex items-start justify-start p-6 group"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.button
          onClick={() => onNavigate('writing')}
          className="w-12 h-12 bg-black/30 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-black/50 transition-all duration-300 opacity-0 group-hover:opacity-100"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-sm">←</div>
        </motion.button>
      </motion.div>

      {/* Control Bar */}
      <div className="fixed top-8 right-8 z-50 flex flex-col gap-3">
        

        
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="min-h-screen flex items-center justify-center px-8 py-24">
          <div className="max-w-6xl mx-auto text-center">
            {/* Haiku - Subtle Integration */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="mb-16"
            >
              {haikuLines.map((line, index) => (
                <motion.p 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 + index * 0.15 }}
                  className="text-white/70 text-[16px] md:text-[18px] font-light italic leading-loose tracking-wide"
                >
                  {line}
                </motion.p>
              ))}
            </motion.div>

            {/* Title */}
            <motion.div
              style={{ y: titleY }}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
            >
             <h1 className="text-[32px] md:text-[48px] lg:text-[72px] font-light text-white font-mono tracking-[-0.02em] uppercase mb-8">
                  "Ngati mphepo yofika konse"
                </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 1.5 }}
              className="mb-16"
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-16 h-[1px] bg-white/30"></div>
                <span className="text-white/60 text-[14px] font-mono uppercase tracking-[0.2em]">
                  BY SIR PRACTICE JR.
                </span>
                <div className="w-16 h-[1px] bg-white/30"></div>
              </div>
             
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-white/40 text-xs font-mono"
              >
                SCROLL
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-black/60 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-8 py-24">
            <div className="space-y-8">
              {reflectionParagraphs.map((paragraph, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ 
                    duration: 1.2, 
                    ease: [0.16, 1, 0.3, 1], 
                    delay: index * 0.1 
                  }}
                  className={`${
                    isReadingMode 
                      ? 'opacity-40 hover:opacity-100 transition-opacity duration-500' 
                      : ''
                  }`}
                >
                  <p className="text-white/90 text-[18px] md:text-[20px] leading-[1.8] font-light tracking-[-0.01em] text-justify mb-6">
                    {paragraph}
                  </p>
                </motion.div>
              ))}

              {/* Footer Note */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="pt-8 mt-12"
              >
                <p className="text-white/60 text-[16px] font-light italic">
                  ¹ Chichewa: God is as the wind, which touches everything
                </p>
              </motion.div>

              {/* Copyright */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="pt-12 text-center"
              >
                <p className="text-white/40 text-[12px] font-mono uppercase tracking-[0.2em]">
                  © Sir Practice Jr.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MphepoPage;