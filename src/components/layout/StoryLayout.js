// src/components/layout/StoryLayout.js
import React from 'react';
import Header from '../common/Header';
import StoryControls from '../common/StoryControls';

const StoryLayout = ({ 
  children,
  backgroundImage,
  backgroundVideo, // New prop for video
  audioSrc,
  currentPage,
  onNavigate,
  isAudioPlaying,
  onToggleAudio,
  onDownload,
  downloadTitle,
  isReadingMode,
  onToggleReadingMode,
  audioRef,
  overlayOpacity = 'bg-black/40',
  textAlignment = 'center' // New prop for text alignment
}) => {
  return (
    <div className="w-screen h-screen relative overflow-hidden">
      {/* Video Background */}
      {backgroundVideo && (
        <video
          className="fixed inset-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      )}
      
      {/* Fallback Image Background */}
      {!backgroundVideo && backgroundImage && (
        <div 
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: `url("${backgroundImage}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            animation: 'gentleFloat 20s ease-in-out infinite'
          }}
        />
      )}
      
      {/* Overlay for better text readability */}
      <div className={`absolute inset-0 ${overlayOpacity} z-10`} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 z-15" />
      
      <Header 
        currentPage={currentPage}
        onNavigate={onNavigate}
        showDescription={false} 
        showNavButtons={false} 
        logoColor="white" 
      />
      
      <StoryControls 
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={onToggleAudio}
        onDownload={onDownload}
        downloadTitle={downloadTitle}
        isReadingMode={isReadingMode}
        onToggleReadingMode={onToggleReadingMode}
      />
      
      <div className={`relative z-20 h-screen overflow-y-auto scroll-smooth ${
        textAlignment === 'justified' ? 'text-justify' : `text-${textAlignment}`
      }`}>
        {children}
      </div>
      
      {audioSrc && (
        <audio ref={audioRef} loop>
          <source src={audioSrc} type="audio/mpeg" />
        </audio>
      )}
    </div>
  );
};

export default StoryLayout;