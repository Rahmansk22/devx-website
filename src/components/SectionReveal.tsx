'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import DevXLogo from './DevXLogo';
import HLSVideo from './HLSVideo';

interface DispersalCharProps {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  className?: string;
  isStarX?: boolean;
}

function DispersalChar({ char, index, total, progress, className = "", isStarX = false }: DispersalCharProps) {
  const angle = (index / total) * Math.PI * 2;
  const factorX = Math.cos(angle) * 550; // Wide cinematic dispersion
  const factorY = Math.sin(angle) * 300;
  
  const x = useTransform(progress, [0, 0.85], [0, factorX]);
  const y = useTransform(progress, [0, 0.85], [0, factorY]);
  const rotate = useTransform(progress, [0, 0.85], [0, (index % 2 === 0 ? 1 : -1) * 60]);
  const scale = useTransform(progress, [0, 0.85], [1, 0.3]);
  const opacity = useTransform(progress, [0, 0.8], [1, 0]);

  if (isStarX) {
    return (
      <motion.span
        style={{ x, y, rotate, scale, opacity, display: 'inline-block', originX: 0.5, originY: 0.5 }}
        animate={{
          scale: [1, 1.05, 1],
          filter: [
            "drop-shadow(0 0 15px rgba(0,212,255,0.7)) drop-shadow(0 0 25px rgba(124,92,255,0.5))",
            "drop-shadow(0 0 35px rgba(0,212,255,1.0)) drop-shadow(0 0 50px rgba(124,92,255,0.8))",
            "drop-shadow(0 0 15px rgba(0,212,255,0.7)) drop-shadow(0 0 25px rgba(124,92,255,0.5))"
          ]
        }}
        transition={{
          repeat: Infinity,
          duration: 2.2,
          ease: "easeInOut"
        }}
        className="bg-gradient-to-r from-[#00d4ff] via-[#7c5cff] to-[#00d4ff] bg-clip-text text-transparent font-extrabold font-headline relative pb-10 pt-2 overflow-visible"
      >
        {char}
      </motion.span>
    );
  }

  return (
    <motion.span
      style={{ x, y, rotate, scale, opacity, display: 'inline-block', originX: 0.5, originY: 0.5 }}
      className={`${className} font-headline font-bold selection:bg-[#7c5cff] pb-10 pt-2 overflow-visible`}
    >
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  );
}

export default function SectionReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const glowOpacity = useTransform(scrollYProgress, [0, 0.95], [0.15, 0.5]);
  const gridBrightness = useTransform(scrollYProgress, [0, 0.95], [0.15, 0.35]);

  // Scroll transforms for Line 1: "Introducing"
  const introducingY = useTransform(scrollYProgress, [0, 0.85], [0, -50]);
  const introducingOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const introducingBlur = useTransform(scrollYProgress, [0, 0.75], ['blur(0px)', 'blur(20px)']);

  // Scroll transforms for Line 2: "Dev X" + Logo
  const devxY = useTransform(scrollYProgress, [0, 0.85], [0, 25]);
  const devxScale = useTransform(scrollYProgress, [0, 0.9], [1, 1.15]);
  const devxOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const devxBlur = useTransform(scrollYProgress, [0, 0.8], ['blur(0px)', 'blur(15px)']);

  // Scroll transforms for Tagline: "Which turns simple ideas with texts to apps."
  const taglineY = useTransform(scrollYProgress, [0, 0.85], [0, 85]);
  const taglineScale = useTransform(scrollYProgress, [0, 0.9], [1, 0.95]);
  const taglineOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const taglineBlur = useTransform(scrollYProgress, [0, 0.65], ['blur(0px)', 'blur(15px)']);

  // Logo scroll animations inside heading
  const logoOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const logoScale = useTransform(scrollYProgress, [0, 0.85], [1, 0.35]);
  const logoY = useTransform(scrollYProgress, [0, 0.85], [0, -100]);
  const logoX = useTransform(scrollYProgress, [0, 0.85], [0, 250]);
  const logoRotate = useTransform(scrollYProgress, [0, 0.85], [0, 45]);

  // Track mouse coordinates for interactive particle wind drift
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Premium particle system in Section 1 background
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      alpha: number;
      color: string;
      pulseSpeed: number;
      pulsePhase: number;
    }> = [];

    const colors = ['#7c5cff', '#00d4ff', '#ffffff'];

    const initParticles = () => {
      particles.length = 0;
      const count = Math.min(100, Math.floor((width * height) / 9000));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2 + 0.6,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: -Math.random() * 0.6 - 0.2,
          alpha: Math.random() * 0.5 + 0.1,
          color: colors[Math.floor(Math.random() * colors.length)],
          pulseSpeed: Math.random() * 0.02 + 0.005,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    initParticles();

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      initParticles();
    };
    window.addEventListener('resize', handleResize);

    const drawParticles = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // Integrate slow physics upward drift with interactive mouse wind
        p.x += p.speedX + (mouseRef.current.x * 0.012);
        p.y += p.speedY + (mouseRef.current.y * 0.012);

        // Breathing/pulsing opacity animation
        p.pulsePhase += p.pulseSpeed;
        const currentAlpha = Math.max(0.05, p.alpha + Math.sin(p.pulsePhase) * 0.15);

        // Bound resets to avoid edge cutoff
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0 || p.x > width) {
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentAlpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    drawParticles();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[130vh] bg-black overflow-hidden"
      id="devx-section-reveal"
    >
      {/* Sticky container */}
      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden">
        
        {/* Fullscreen Background Video Stream playing Mux Stream 2 (100% fully visible, bright, and vibrant) */}
        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.8, 0.95], [1, 0.9, 0]), // Full 100% opacity for absolute visibility
            scale: useTransform(scrollYProgress, [0, 0.95], [1, 1.05]),
          }}
          className="absolute inset-0 w-full h-full object-cover z-[1] pointer-events-none filter brightness-[1.12] contrast-[1.62] saturate-[1.3] select-none transition-all duration-300"
        >
          <HLSVideo src="https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8" className="w-full h-full object-cover" />
        </motion.div>

        {/* Custom Premium Floating Particle Canvas Overlay */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-[2]"
        />

        {/* Dynamic scroll-linked grid overlay */}
        <motion.div 
          style={{ opacity: gridBrightness }}
          className="absolute inset-0 bg-grid-lines pointer-events-none transition-all duration-300 z-[2]" 
        />

        {/* Shifting radial spotlight gradient */}
        <motion.div
          style={{ opacity: glowOpacity }}
          className="absolute w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.25)_0%,rgba(0,212,255,0.06)_50%,rgba(0,0,0,0)_70%)] pointer-events-none filter blur-[120px] gpu-accelerated z-[2]"
        />

        {/* Ambient base layer: moved behind video (z-0) and set to low opacity as a soft vignette */}
        <div className="absolute inset-0 bg-radial-gradient-black opacity-30 pointer-events-none z-0" />

        {/* Ambient premium glowing back halo for Apple reveal lockup */}
        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.5, 0.95], [0.4, 0.8, 0]),
            scale: useTransform(scrollYProgress, [0, 0.95], [0.9, 1.25]),
          }}
          className="absolute z-[3] w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,rgba(0,212,255,0.25)_0%,rgba(124,92,255,0.1)_50%,rgba(0,0,0,0)_80%)] pointer-events-none filter blur-[60px] gpu-accelerated select-none"
        />

        {/* Central Premium Apple-Style Lockup */}
        <motion.div
          className="relative z-20 text-center flex flex-col items-center justify-center px-4 gpu-accelerated select-none"
        >
          {/* Main Brand Title - "Introducing" on Line 1, "Dev X" + Logo on the right on Line 2 */}
          <h1 className="text-5xl sm:text-7xl md:text-[9.5rem] font-bold font-headline tracking-tighter leading-[1.12] text-white drop-shadow-[0_4px_30px_rgba(255,255,255,0.2)] mb-6 select-none flex flex-col items-center overflow-visible">
            {/* Line 1: Introducing with separate scroll parallax & dynamic letter dispersion */}
            <motion.span
              style={{
                y: introducingY,
                opacity: introducingOpacity,
                filter: introducingBlur,
              }}
              className="block bg-gradient-to-b from-white via-white to-neutral-400 bg-clip-text text-transparent pb-12 overflow-visible"
            >
              {"Introducing".split('').map((char, index) => (
                <DispersalChar
                  key={`intro-${index}`}
                  char={char}
                  index={index}
                  total={11}
                  progress={scrollYProgress}
                  className="bg-gradient-to-b from-white via-white to-neutral-400 bg-clip-text text-transparent"
                />
              ))}
            </motion.span>
            
            {/* Line 2: Dev X + Logo on the Right with separate scroll parallax & dynamic letter dispersion */}
            <motion.span
              style={{
                y: devxY,
                scale: devxScale,
                opacity: devxOpacity,
                filter: devxBlur,
              }}
              className="flex items-center justify-center gap-2 sm:gap-4 mt-2 md:mt-4"
            >
              <span className="bg-gradient-to-b from-white via-white to-neutral-400 bg-clip-text text-transparent pb-4">
                {"Dev".split('').map((char, index) => (
                  <DispersalChar
                    key={`dev-${index}`}
                    char={char}
                    index={index + 11}
                    total={15}
                    progress={scrollYProgress}
                    className="bg-gradient-to-b from-white via-white to-neutral-400 bg-clip-text text-transparent"
                  />
                ))}
              </span>
              <span> </span>
              {/* Premium star-shining glowing X with dispersion */}
              <DispersalChar
                char="X"
                index={14}
                total={15}
                progress={scrollYProgress}
                isStarX={true}
              />
              <motion.span
                style={{
                  opacity: logoOpacity,
                  scale: logoScale,
                  y: logoY,
                  x: logoX,
                  rotate: logoRotate,
                }}
                className="w-16 h-16 sm:w-24 sm:h-24 md:w-[130px] md:h-[130px] flex items-center justify-center drop-shadow-[0_0_35px_rgba(0,212,255,0.45)] ml-2"
              >
                <DevXLogo size={130} interactive={true} glow={true} />
              </motion.span>
            </motion.span>
          </h1>

          {/* Tagline: व्हिच टर्न्स सिम्पल आयडियाज टू ॲप्स */}
          <motion.p
            style={{
              opacity: taglineOpacity,
              y: taglineY,
              scale: taglineScale,
              filter: taglineBlur,
            }}
            className="text-lg sm:text-2xl md:text-[2.2rem] font-light max-w-4xl leading-relaxed mt-6 text-center font-sans tracking-tight bg-gradient-to-b from-white via-white to-neutral-400 bg-clip-text text-transparent select-none pb-4"
          >
            Which turns simple ideas with texts to apps.
          </motion.p>

        </motion.div>
      </div>
    </div>
  );
}
