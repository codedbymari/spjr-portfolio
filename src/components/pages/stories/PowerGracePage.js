// src/components/pages/stories/PowerGracePage.js
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const PowerGracePage = ({ 
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
  const overlayOpacity = useTransform(scrollY, [0, 300], [0.3, 0.7]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const letterParagraphs = [
    "Dear Theo,",
    "I am writing this letter to remind you to exercise your power, confidently yet gracefully.",
    'Today is the 27th of April 2024. For the first 3 months of the year, you\'ve started to realise your budding potential. Dedicate yourself to cultivating the discipline required to nurture this. In doing so, your vision and your dreams may come to fruition. In Dr David R Hawkins\' words, you "have awakened the presence."¹',
    "So, how does it work out that although the world is at your feet, doubt remains in your head? Is your doubt greater than the world? Greater than the human drive for progress and evolution? Greater than the destiny that you have been chosen for? If there is one thing that you should be sure of, it is this: where the mind goes, the body follows.",
    "Let's dive further into the matter.",
    "You already possess the essence. Do me a favour. Tap your phone screen right now. What does it say?",
    "It reads:",
    "2 Timothy 1:7 – For God has not given us a spirit of fear, but of power and of love and a sound mind.",
    'See, you have already begun to tune your mind to be open to greatness, and in doing so, you have started to accept and become more aware of your power. However, even though your fear has diminished, your guilt and doubt have not. So, the questions I want you to ask yourself today are "What do you feel guilty for?" and "Why are you so doubtful about whether you should exercise your power?".',
    "If POWER means: 1. The ability to do something or act in a particular way, especially as a faculty or quality. Or as I like to define it, 2. The ability to execute: Turning thoughts into action at will.",
    "Then it is your birthright to dedicate yourself to the discovery of your abilities, unlocking your potential, and testing the boundaries of any pre-conceived or subsequent limitations. I urge you to never forget how short life is and how much of a privilege it is to live and discover yourself. I urge you to remember those who no longer breathe with you, even those from your bloodline and pack that you would have called sister had they still been alive today.",
    "I urge you to remember all the prayers, all the tears and chaos, the work and miracles that it took for you to think, talk, breathe, and walk as you do today. And above all, I urge you to remember that it is your duty and responsibility to do your best relentlessly for all those who believe in and follow you.",
    "Theo, remember that the only way to change the world is through inspiration. Through inspiration, people's perspectives and thoughts change, and when people act on those thoughts, the world changes. Therefore, isn't your true goal to teach people how to execute their visions and how to exercise their power?",
    "So go ahead and let the world feel your power. Fill the timeless void in front of you with the gravity and reality of our dreams and ideas.",
    "Yours truly,",
    "Sir Practice Jnr."
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
          <source src="./assets/videos/power-grace.mp4" type="video/mp4" />
        </video>
        {/* Dynamic overlay */}
        <motion.div 
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      </div>

     

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
            {/* Letter Opening - Subtle Integration */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="mb-16"
            >
              
            </motion.div>

            {/* Title */}
            <motion.div
              style={{ y: titleY }}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            >
              <h1 className="text-[64px] md:text-[96px] lg:text-[128px] font-light text-white font-mono tracking-[-0.02em] uppercase mb-8">
                POWER × GRACE
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
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
            <div className="space-y-6">
              {letterParagraphs.map((paragraph, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ 
                    duration: 1.2, 
                    ease: [0.16, 1, 0.3, 1], 
                    delay: index * 0.05 
                  }}
                  className={`${
                    isReadingMode 
                      ? 'opacity-40 hover:opacity-100 transition-opacity duration-500' 
                      : ''
                  }`}
                >
                  <p className={`text-white/90 text-[18px] md:text-[20px] leading-[1.8] font-light tracking-[-0.01em] mb-4 ${
                    paragraph === "Dear Theo," || paragraph === "Yours truly," || paragraph === "Sir Practice Jnr." 
                      ? 'italic text-white/80' 
                      : paragraph.includes("2 Timothy 1:7")
                      ? 'font-medium bg-black/30 p-4 rounded-lg border-l-4 border-white/30'
                      : 'text-justify'
                  }`}>
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
                  ¹ The presence - knowledge and awareness of who you are and all that you can become.
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

export default PowerGracePage;