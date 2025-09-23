// src/components/common/StoryControls.js
import React from 'react';
import { Volume2, VolumeX, Download, Sun, Moon } from 'lucide-react';

const StoryControls = ({ 
  isAudioPlaying, 
  onToggleAudio, 
  onDownload, 
  downloadTitle = "Download",
  isReadingMode,
  onToggleReadingMode
}) => {
  return (
    <div className="fixed top-5 right-5 z-50 flex gap-3">
      <button
        onClick={onToggleAudio}
        className="bg-black/50 rounded-full p-3 backdrop-blur border border-white/20 text-white text-lg cursor-pointer transition-all hover:bg-black/70 flex items-center gap-2"
        title={isAudioPlaying ? "Disable Sounds" : "Enable Sounds"}
      >
        {isAudioPlaying ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>
      
      <button
        onClick={onDownload}
        className="bg-red-600/70 rounded-full px-3 py-2 backdrop-blur border-none text-white text-sm cursor-pointer transition-all hover:bg-red-600/90 flex items-center gap-2"
        title={downloadTitle}
      >
        <Download size={16} />
        Download
      </button>
      
      <button
        onClick={onToggleReadingMode}
        className={`rounded-full p-3 backdrop-blur border border-white/20 text-white text-lg cursor-pointer transition-all flex items-center gap-2 ${
          isReadingMode ? 'bg-yellow-500/70 hover:bg-yellow-500/90' : 'bg-black/50 hover:bg-white/20'
        }`}
        title="Toggle Reading Mode"
      >
        {isReadingMode ? <Sun size={16} /> : <Moon size={16} />}
      </button>
    </div>
  );
};

export default StoryControls;