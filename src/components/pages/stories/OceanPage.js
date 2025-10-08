// src/components/pages/stories/OceanPage.js
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const OceanPage = ({ 
  onNavigate, 
  isAudioPlaying, 
  onToggleAudio, 
  audioRef 
}) => {
  const [, setIsLoaded] = useState(false);
  const { scrollY } = useScroll();

  // Parallax effects
  const titleY = useTransform(scrollY, [0, 500], [0, -100]);
  const overlayOpacity = useTransform(scrollY, [0, 300], [0.4, 0.7]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const paragraphs = [
    "The ocean swallowed my struggling kin. Her currents flow beneath our skin. The source of our fear; we search for it; we worship it. Seeking refuge in broken bodies is futile; no room within.",
    "A home for our pain; we search for it; we toil for it. Diligent slaves toiling for minimum wage; in inimitable ways, we die for duty. From darkest house slaves to underground workmanship; embrace the beauty. It's not skin that makes us kin; your soul bears scars like mine; see through me.",
    "Like an elaborate maze, our motives twist and turn in a house of pain. Cyclones of ambition for higher learning and fiendish earning. Desperate to please the forces- to show them that we're deserving. We're on a knife edge; will they recognise your name? The tides of change come and chaos; what is to us? Beyond the edges of the sea comes the dawn of our victory. Pole, pole, Bantu yangu. Do you see our epiphany?",
    "Draw your map of hope; I will find it, and I will revise it. Shackled wisdom drowns in trenches beneath the surface. The rusting chains scratch the itch in my soul. Like a stream meeting a river, I discover purpose. Purpose morphs into a yearning to triumph over our graves.",
    "First, I'll master the oceans that owe us for the tears of slaves. By being brave and diving to the graves in the ocean so deep. To discover the source of our fear lies in the treachery of the sea. So, we must make peace with the ocean to finally be free. Stand by the shore and let the tide wash over the soles of your feet."
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
          <source src="./assets/videos/ocean-video.mp4" type="video/mp4" />
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
          <source src="./assets/audio/ocean-sound.mp3" type="audio/mpeg" />
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
            {/* Title */}
            <motion.div
              style={{ y: titleY }}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            >
              <h1 className="text-[64px] md:text-[96px] lg:text-[128px] font-light text-white font-mono tracking-[-0.02em] uppercase mb-8">
                THE OCEAN
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
            {/* Single flowing text block */}
            <div className="space-y-8">
              {paragraphs.map((paragraph, index) => (
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
                  className={`transition-opacity duration-500`}
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
                  ¹ (Swahili) Slowly, slowly, my people.
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

export default OceanPage;