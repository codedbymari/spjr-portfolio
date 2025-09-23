// src/components/pages/stories/PoetryInMotionPage.js
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const PoetryInMotionPage = ({ 
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

  const storyParagraphs = [
    "The streetlights illuminate a maze of roads and alleyways in the Walthamstow Estate; a small town riddled with hope, drama, and tragedy. Jubilant children battle the heat of cramped streets, where caramel feet tread without rest, enchanted by the absence of pain.",
    
    "Hungry bellies roar like racing car engines. Some beg, some steal, others have found peace. Then, there are the defiant few. With big red permanent markers for feet, they seek to rewrite their script with every step.",
    
    "Like inspectors with infrared specs, we follow their footsteps. We pass boys gambling, throwing pennies at the wall like it was a wishing well. We turn the corner and hear a youthful voice prevail through a sound system:",
    
    "The nights for the big steppers, go-getters. If you wanna soar with us, then grow feathers. We hunt through the darkness to find treasures. So, faking a brave heart is never clever!",
    
    "Peeking through the gap in the door, we find our protagonist, Solo. He sits against the wall on a single bed. Beside him is a makeshift bookshelf. Decorated by Garvey, Socrates, Bell Hooks, and other great writers.",
    
    "We observe as Solo starts to clear his throat. His voice is wide open. The nights have flown through the window. We observe a woman at the stove, with a young girl sitting beside her and paying close attention. A young man bangs through the kitchen door, interrupting a light family moment and startling everyone.",
    
    "The woman puts down the pot and walks toward the lights at the failed attempt. We follow the dejected young man down a tight, criticised hallway. It is stacked with brown boxes and dusty black bin bags. They are bursting with discarded accumulated possessions.",
    
    "Solo picks a page and begins to write: 'I always thought of you and meant it so. You, I believed I had the potential, but doubt stopped me from believing. This world sees my confidence, but all I see I cannot change. My friend Barry advised me to try it before I even understood it or got trapped in it, but confidence takes time to come down.'",
    
    "This led me to think about my trajectory and my current environment. During the two together, where would I be in 10 years? Would I be closer to my dreams or would the things I carry domestically swallow me whole? I'm torn between fighting for my engine and fuel for a fire that burns everything down.",
    
    "Solo's meditations were violently ended by further piercing through the window above him. Solo looks through the window outside. The mind looks upon his life and idea into the distance. He saw other young people down the street; it makes him wish he would be more like them.",
    
    "Solo returned to his room and although we were no longer in there with him, we could deduce what he did next. Solo would have picked up a blank page and written these words to himself: 'Is this poetry in motion?'"
  ];

  const isQuote = (text) => {
    return text.includes('"') && (text.includes('nights for the big steppers') || text.includes('Is this poetry in motion'));
  };

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
          <source src="./assets/videos/solo.mp4" type="video/mp4" />
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
          <source src="./assets/audio/poetry-ambient.mp3" type="audio/mpeg" />
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
          onClick={() => onNavigate('work')}
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
            {/* Title */}
            <motion.div
              style={{ y: titleY }}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            >
              <h1 className="text-[30px] md:text-[50px] lg:text-[108px] font-light text-white font-mono tracking-[-0.02em] uppercase mb-6">
                POETRY IN MOTION

              </h1>
             
            </motion.div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
              className="mb-16"
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-16 h-[1px] bg-white/30"></div>
                <span className="text-white/60 text-[14px] font-mono uppercase tracking-[0.2em]">
                  A JOURNEY THROUGH WALTHAMSTOW
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

        {/* Story Content Section */}
        <div className="bg-black/70 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-8 py-24">
            {/* Flowing story text */}
            <div className="space-y-8">
              {storyParagraphs.map((paragraph, index) => (
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
                  {isQuote(paragraph) ? (
                    <div className="my-12 px-8">
                      <p className="text-white/95 text-[20px] md:text-[22px] leading-[1.8] font-light tracking-[-0.01em] text-center italic border-l-4 border-yellow-400 pl-6">
                        {paragraph.replace(/"/g, '')}
                      </p>
                    </div>
                  ) : (
                    <p className="text-white/90 text-[18px] md:text-[20px] leading-[1.8] font-light tracking-[-0.01em] text-justify mb-6">
                      {paragraph}
                    </p>
                  )}
                </motion.div>
              ))}

              {/* Copyright */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="pt-16 text-center"
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

export default PoetryInMotionPage;