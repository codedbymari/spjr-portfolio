// src/hooks/useAudio.js
import { useState, useRef } from 'react';

export const useAudio = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.log);
      }
      setIsAudioPlaying(!isAudioPlaying);
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsAudioPlaying(false);
    }
  };

  return {
    isAudioPlaying,
    audioRef,
    toggleAudio,
    stopAudio
  };
};

