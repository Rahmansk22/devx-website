'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize, Lock, RefreshCw } from 'lucide-react';

export default function SectionDemo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // 3D Parallax Mouse Coordinate Tracking for the Mockup Player
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };
  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(err => console.error('Video play failed:', err));
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleMaximize = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <section 
      className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col justify-center py-32 px-6 sm:px-12 md:px-24"
      id="devx-section-demo"
    >
      {/* Background spot glows */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.06)_0%,rgba(0,0,0,0)_70%)] pointer-events-none filter blur-3xl z-0" />
      <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,212,255,0.04)_0%,rgba(0,0,0,0)_70%)] pointer-events-none filter blur-3xl z-0" />
      
      {/* Grid lines overlay */}
      <div className="absolute inset-0 bg-grid-lines pointer-events-none opacity-[0.05] z-0" />

      <div className="w-full max-w-7xl mx-auto flex flex-col items-center text-center gap-16 relative z-10 select-none">
        
        {/* Headings */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-3 px-3 py-1 rounded-full bg-white/5 backdrop-blur-md w-fit border border-white/5 mx-auto">
            <span className="w-2 h-2 rounded-full bg-[#7c5cff] animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#7c5cff]">Interactive Screen Capture</span>
          </div>
          <h3 className="text-5xl sm:text-7xl font-bold font-headline tracking-tighter leading-none text-white">
            Watch Dev X in Action.
          </h3>
          <p className="text-lg font-light text-neutral-400 font-sans max-w-xl mx-auto leading-relaxed">
            Witness our neural compiler translate natural requirements into production Next.js source code, databases, and secure edge sandboxes in real time.
          </p>
        </div>

        {/* 3D Interactive Parallax Tilt Container */}
        <div 
          className="w-full flex items-center justify-center p-2 relative"
          style={{ perspective: 1200 }}
        >
          {/* Floating HUD Badges surrounding the video player */}
          <div className="absolute inset-0 z-20 pointer-events-none hidden sm:block">
            {/* HUD Badge Top-Right */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute top-2 -right-6 px-3 py-1.5 rounded-xl bg-neutral-950/90 border border-white/10 shadow-2xl flex items-center gap-2 text-[9px] font-mono tracking-widest text-neutral-400"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse" />
              <span>LIVE DEPLOYMENT STREAM</span>
            </motion.div>

            {/* HUD Badge Bottom-Left */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -bottom-4 -left-6 px-3 py-1.5 rounded-xl bg-neutral-950/90 border border-white/10 shadow-2xl flex items-center gap-2 text-[8px] font-mono tracking-widest text-neutral-500"
            >
              <span className="text-[#7c5cff]">⚡</span>
              <span>E2B VM ACTIVE: <span className="font-bold text-white">&lt; 40S BUILD</span></span>
            </motion.div>
          </div>

          <motion.div
            style={{
              transformStyle: 'preserve-3d',
              perspective: 1200
            }}
            animate={{
              rotateX: mousePos.y * -8,
              rotateY: mousePos.x * 8
            }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full aspect-[16/10] sm:aspect-[16/7.56] rounded-3xl bg-[#0c0c0e]/95 border border-white/10 overflow-hidden shadow-[0_0_80px_-20px_rgba(124,92,255,0.35)] relative z-10 transition-all duration-300 hover:border-white/20 cursor-grab active:cursor-grabbing text-white"
          >
            {/* Spotlight reflection */}
            <div 
              className="absolute inset-0 z-20 pointer-events-none opacity-25 mix-blend-overlay transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at ${(mousePos.x + 0.5) * 100}% ${(mousePos.y + 0.5) * 100}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 60%)`
              }}
            />

            {/* Browser Mockup Top Bar */}
            <div className="w-full h-9 sm:h-11 border-b border-white/5 bg-[#08080a] flex items-center justify-between px-4 select-none relative z-30">
              {/* Window dots */}
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/30" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/30" />
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/30" />
              </div>

              {/* Address bar */}
              <div className="w-[50%] max-w-[320px] h-6 bg-black/40 border border-white/5 rounded-lg flex items-center justify-center gap-1.5 px-3">
                <Lock className="w-2.5 h-2.5 text-emerald-400" />
                <span className="text-[9px] font-mono text-neutral-400 tracking-wider">compiler.devx.app</span>
                <RefreshCw className="w-2 h-2 text-neutral-600 ml-1" />
              </div>

              {/* Right spacer */}
              <div className="w-[50px] sm:w-[80px]" />
            </div>

            {/* Video content */}
            <div className="w-full h-[calc(100%-36px)] sm:h-[calc(100%-44px)] relative overflow-hidden bg-neutral-950">
              <video
                ref={videoRef}
                src="/demo.mp4"
                loop
                playsInline
                onClick={togglePlay}
                className="absolute w-full h-[119%] -top-[19%] left-0 object-cover cursor-pointer"
              />

              {/* Premium Custom Control Bar overlay */}
              <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 w-[92%] h-10 sm:h-14 rounded-xl sm:rounded-2xl bg-black/45 border border-white/10 backdrop-blur-xl flex justify-between items-center px-3 sm:px-6 transition-all duration-300 shadow-2xl opacity-90 hover:opacity-100 z-30">
                
                {/* Play/Pause control */}
                <div className="flex items-center gap-2 sm:gap-4">
                  <button 
                    onClick={togglePlay}
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white text-black hover:bg-neutral-200 transition-colors flex items-center justify-center cursor-pointer border-0"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-2.5 h-2.5 sm:w-4 sm:h-4 fill-current text-black" /> : <Play className="w-2.5 h-2.5 sm:w-4 sm:h-4 fill-current text-black ml-0.5" />}
                  </button>
                  <span className="text-[8px] sm:text-[10px] font-mono text-neutral-400 tracking-wider">
                    {isPlaying ? 'COMPILING LIVE STREAM' : 'PAUSED'}
                  </span>
                </div>

                {/* Volume / Fullscreen controls */}
                <div className="flex items-center gap-2 sm:gap-4">
                  <button 
                    onClick={toggleMute}
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/5 text-white hover:bg-white/10 hover:text-white transition-colors flex items-center justify-center cursor-pointer border-0"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                  </button>
                  <button 
                    onClick={handleMaximize}
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/5 text-white hover:bg-white/10 hover:text-white transition-colors flex items-center justify-center cursor-pointer border-0"
                    aria-label="Fullscreen"
                  >
                    <Maximize className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>

              </div>

              {/* Glowing Big Play Button overlay (visible when paused) */}
              {!isPlaying && (
                <div 
                  onClick={togglePlay}
                  className="absolute inset-0 bg-black/30 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-black/20 z-20"
                >
                  <div className="w-20 h-20 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 hover:border-white/30 hover:shadow-[0_0_30px_rgba(124,92,255,0.4)]">
                    <Play className="w-8 h-8 text-white fill-current ml-1" />
                  </div>
                </div>
              )}
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
