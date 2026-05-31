'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface DevXLogoProps {
  className?: string;
  size?: number;
  glow?: boolean;
  interactive?: boolean;
}

export default function DevXLogo({ 
  className = '', 
  size = 120, 
  glow = true, 
  interactive = true 
}: DevXLogoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Interactive mouse tracking coordinates for eye look-around
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 280, mass: 0.5 };
  const eyeX = useSpring(mouseX, springConfig);
  const eyeY = useSpring(mouseY, springConfig);

  // Map mouse movement from -0.5..0.5 range to noticeable eye translations (-16 to 16 pixels)
  const eyeTranslateX = useTransform(eyeX, [-0.5, 0.5], [-16, 16]);
  const eyeTranslateY = useTransform(eyeY, [-0.5, 0.5], [-16, 16]);

  // Subtle 3D tilt coordinates for the entire head
  const tiltX = useTransform(mouseY, [-0.5, 0.5], [12, -12]);
  const tiltY = useTransform(mouseX, [-0.5, 0.5], [-12, 12]);

  // Eye blinking simulation
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    if (!interactive) return;

    const handlePointerMove = (event: PointerEvent) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('pointermove', handlePointerMove);
    
    // Periodically blink the eyes (every 4-7 seconds)
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, Math.random() * 3000 + 4000);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      clearInterval(blinkInterval);
    };
  }, [interactive, mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className={`relative select-none flex items-center justify-center ${className}`}
      style={{ 
        width: className.includes('w-') ? undefined : size, 
        height: className.includes('h-') ? undefined : size,
        perspective: 800
      }}
    >
      <motion.div
        style={{
          rotateX: interactive ? tiltX : 0,
          rotateY: interactive ? tiltY : 0,
          transformStyle: 'preserve-3d',
        }}
        className="w-full h-full relative"
      >
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full filter"
          style={{
            filter: glow ? 'drop-shadow(0 4px 20px rgba(0, 212, 255, 0.15)) drop-shadow(0 10px 40px rgba(124, 92, 255, 0.1))' : 'none'
          }}
        >
          <defs>
            {/* Metallic body gradient */}
            <linearGradient id="metalBody" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="35%" stopColor="#EDEDED" />
              <stop offset="70%" stopColor="#D8D8D8" />
              <stop offset="100%" stopColor="#A8A8A8" />
            </linearGradient>

            {/* Glowing cyan gradient */}
            <linearGradient id="cyanGlow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00E5FF" />
              <stop offset="100%" stopColor="#00A2FF" />
            </linearGradient>

            {/* Glowing cyan slots gradient */}
            <linearGradient id="slotGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00F0FF" />
              <stop offset="100%" stopColor="#7C5CFF" />
            </linearGradient>

            {/* Visor gradient */}
            <linearGradient id="visorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#252525" />
              <stop offset="50%" stopColor="#0D0D0D" />
              <stop offset="100%" stopColor="#050505" />
            </linearGradient>

            {/* Inner visor shadow */}
            <radialGradient id="visorShadow" cx="50%" cy="50%" r="50%">
              <stop offset="70%" stopColor="transparent" />
              <stop offset="100%" stopColor="black" stopOpacity="0.8" />
            </radialGradient>

            {/* Cyan Eye Optic Radial Gradient */}
            <radialGradient id="eyeOptic" cx="45%" cy="45%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="25%" stopColor="#80F5FF" />
              <stop offset="60%" stopColor="#00D4FF" />
              <stop offset="100%" stopColor="#005A7F" />
            </radialGradient>

            {/* Eye Glow Filter */}
            <filter id="eyeGlowFilter" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 1. LEFT & RIGHT EAR PLUGS */}
          <rect x="35" y="195" width="40" height="110" rx="20" fill="url(#metalBody)" stroke="#9C9C9C" strokeWidth="2" />
          <rect x="425" y="195" width="40" height="110" rx="20" fill="url(#metalBody)" stroke="#9C9C9C" strokeWidth="2" />

          {/* 2. MAIN ORB HEAD SHELL */}
          <circle cx="250" cy="250" r="190" fill="url(#metalBody)" stroke="#9C9C9C" strokeWidth="2.5" />

          {/* 3. GLOWING CYAN VERTICAL SLOTS */}
          {/* Top Slots */}
          <path d="M 160,88 C 160,88 153,142 165,148" fill="none" stroke="url(#slotGlow)" strokeWidth="6" strokeLinecap="round" />
          <path d="M 340,88 C 340,88 347,142 335,148" fill="none" stroke="url(#slotGlow)" strokeWidth="6" strokeLinecap="round" />
          {/* Bottom Slots */}
          <path d="M 148,328 C 148,328 155,402 162,408" fill="none" stroke="url(#slotGlow)" strokeWidth="6" strokeLinecap="round" />
          <path d="M 352,328 C 352,328 345,402 338,408" fill="none" stroke="url(#slotGlow)" strokeWidth="6" strokeLinecap="round" />

          {/* 4. VISOR (Futuristic Black Goggles) */}
          <path
            d="M 96,215 C 96,215 160,175 250,175 C 340,175 404,215 404,215 C 404,215 422,230 422,260 C 422,290 398,310 398,310 C 398,310 340,325 250,325 C 160,325 102,310 102,310 C 102,310 78,290 78,260 C 78,230 96,215 96,215 Z"
            fill="url(#visorGrad)"
            stroke="#1D1D1D"
            strokeWidth="3.5"
          />
          
          {/* Inner shadow overlay for visor depth */}
          <path
            d="M 96,215 C 96,215 160,175 250,175 C 340,175 404,215 404,215 C 404,215 422,230 422,260 C 422,290 398,310 398,310 C 398,310 340,325 250,325 C 160,325 102,310 102,310 C 102,310 78,290 78,260 C 78,230 96,215 96,215 Z"
            fill="url(#visorShadow)"
            pointerEvents="none"
          />

          {/* 5. GLOWING OPTIC CYAN EYES (With Spring Motion Tracking) */}
          <g style={{ transform: `translate3d(0, 0, 0)` }}>
            
            {/* LEFT OPTIC COMPONENT */}
            <g>
              {/* Outer Cyan Halo Aura */}
              <motion.circle
                cx="175"
                cy="245"
                r="30"
                fill="url(#cyanGlow)"
                opacity="0.35"
                filter="url(#eyeGlowFilter)"
                style={{ x: eyeTranslateX, y: eyeTranslateY }}
              />
              {/* Main Glowing Optic */}
              <motion.circle
                cx="175"
                cy="245"
                r="18"
                fill="url(#eyeOptic)"
                filter="url(#eyeGlowFilter)"
                animate={{
                  scaleY: isBlinking ? 0.05 : 1,
                  opacity: isBlinking ? 0.2 : 1
                }}
                transition={{ duration: 0.12 }}
                style={{ 
                  x: eyeTranslateX, 
                  y: eyeTranslateY,
                  originX: '175px',
                  originY: '245px'
                }}
              />
            </g>

            {/* RIGHT OPTIC COMPONENT */}
            <g>
              {/* Outer Cyan Halo Aura */}
              <motion.circle
                cx="325"
                cy="245"
                r="30"
                fill="url(#cyanGlow)"
                opacity="0.35"
                filter="url(#eyeGlowFilter)"
                style={{ x: eyeTranslateX, y: eyeTranslateY }}
              />
              {/* Main Glowing Optic */}
              <motion.circle
                cx="325"
                cy="245"
                r="18"
                fill="url(#eyeOptic)"
                filter="url(#eyeGlowFilter)"
                animate={{
                  scaleY: isBlinking ? 0.05 : 1,
                  opacity: isBlinking ? 0.2 : 1
                }}
                transition={{ duration: 0.12 }}
                style={{ 
                  x: eyeTranslateX, 
                  y: eyeTranslateY,
                  originX: '325px',
                  originY: '245px'
                }}
              />
            </g>
            
          </g>

        </svg>
      </motion.div>
    </div>
  );
}
