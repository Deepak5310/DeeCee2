/**
 * Video Reel Card Component
 * Displays video reels with play/pause and mute controls
 */

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Pause, Play, VolumeX, Volume2 } from 'lucide-react';
import { ReelVideo } from '@/app/types';

interface VideoReelCardProps {
  video: ReelVideo;
}

export const VideoReelCard: React.FC<VideoReelCardProps> = ({ video }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play();
      setIsPlaying(true);
      setIsMuted(true);
    }
  }, [video.src]);

  return (
    <div className="relative w-full h-[32rem] rounded-xl overflow-hidden shadow-lg bg-gray-100 group">
      <video
        ref={videoRef}
        src={video.src}
        loop
        muted={isMuted}
        autoPlay
        playsInline
        className="w-full h-full object-cover transition-opacity duration-700"
        onClick={togglePlay}
      />
      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={(e) => { e.stopPropagation(); togglePlay(); }}
          className="p-3 rounded-full bg-white/30 backdrop-blur-sm text-white hover:bg-white/50 transition mr-2"
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); toggleMute(); }}
          className="p-3 rounded-full bg-white/30 backdrop-blur-sm text-white hover:bg-white/50 transition"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
        </button>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white text-sm font-medium">
        {video.description}
      </div>
    </div>
  );
};
