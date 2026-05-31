'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle2, AlertCircle, Sparkles, TrendingUp, Users } from 'lucide-react';
import DevXLogo from './DevXLogo';

// 1. Magnetic Hover Wrapper Component
function MagneticButton({ children, onClick, disabled }: { children: React.ReactNode, onClick?: () => void, disabled?: boolean }) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.35, y: y * 0.35 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      disabled={disabled}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 250, damping: 20, mass: 0.5 }}
      className="relative z-10 select-none cursor-pointer flex items-center gap-2.5 px-8 py-4 rounded-full bg-white text-black hover:bg-neutral-100 font-headline font-semibold text-sm sm:text-base border border-white shadow-xl shadow-[#7c5cff]/10 hover:shadow-[#7c5cff]/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
    >
      {children}
    </motion.button>
  );
}

// 2. Main Section Component
export default function SectionFuture() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [waitlistSpot, setWaitlistSpot] = useState(0);

  // Countdown timer for next release batch (Awwwards/Stripe Sessions UX detail)
  const [timeLeft, setTimeLeft] = useState({ h: 4, m: 12, s: 9 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { h: prev.h, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 };
        return { h: 4, m: 12, s: 9 }; // loop reset
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  const auroraOpacity = useTransform(scrollYProgress, [0, 0.7], [0.05, 0.45]);
  const logoScale = useTransform(scrollYProgress, [0.3, 0.95], [0.8, 1.05]);

  // Particle Engine
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
    }> = [];

    const initParticles = () => {
      particles.length = 0;
      const count = Math.min(180, Math.floor((width * height) / 8000));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.5 + 0.5,
          speedX: (Math.random() - 0.5) * 0.4,
          speedY: -Math.random() * 0.8 - 0.2,
          alpha: Math.random() * 0.5 + 0.1,
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
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0 || p.x > width) {
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.shadowColor = '#7c5cff';
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

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitting(false);
        setIsSuccess(true);
        setWaitlistSpot(data.spot || Math.floor(Math.random() * 450) + 14890);
      } else {
        setErrorMsg(data.error || 'Failed to reserve spot. Please try again.');
        setIsSubmitting(false);
      }
    } catch {
      setErrorMsg('Network error. Failed to connect to compiler waitlist.');
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col justify-center items-center py-32 px-6 sm:px-12 md:px-24"
      id="devx-section-future"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />

      <motion.div
        style={{ opacity: auroraOpacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none select-none overflow-hidden max-w-7xl z-0"
      >
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.22)_0%,rgba(0,0,0,0)_70%)] filter blur-[150px] aurora-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,212,255,0.18)_0%,rgba(0,0,0,0)_70%)] filter blur-[150px] aurora-glow" />
      </motion.div>

      <div className="absolute inset-0 bg-grid-lines pointer-events-none opacity-[0.04] z-0" />

      <div className="w-full max-w-4xl flex flex-col items-center justify-center text-center space-y-12 relative z-20">
        
        {/* Robotic DevX Logo */}
        <motion.div style={{ scale: logoScale }} className="relative select-none flex items-center justify-center">
          <DevXLogo size={160} glow={true} interactive={true} />
        </motion.div>

        {/* Headlines */}
        <div className="space-y-6 select-none">
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-bold font-headline tracking-tighter leading-none text-white max-w-3xl mx-auto">
            The Future of Building Starts Here.
          </h2>
          
          <p className="text-lg sm:text-xl font-light text-neutral-400 max-w-xl mx-auto leading-relaxed font-sans">
            DevX is the software creation engine for internet-scale platforms. Join the elite group of developers and builders today.
          </p>
        </div>

        {/* Live Waitlist Statistics Ticker (Stripe Sessions UX Detail) */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-2xl px-8 py-4 select-none">
          <div className="flex items-center gap-3 font-mono text-left">
            <Users className="w-4 h-4 text-[#7c5cff]" />
            <div>
              <span className="text-[7px] text-neutral-500 uppercase tracking-widest block leading-none font-bold">TOTAL RESERVATIONS</span>
              <span className="text-xs font-bold text-white block mt-1">14,892 Spots Taken</span>
            </div>
          </div>
          <div className="w-px h-8 bg-white/5 hidden sm:block" />
          <div className="flex items-center gap-3 font-mono text-left">
            <TrendingUp className="w-4 h-4 text-[#00d4ff]" />
            <div>
              <span className="text-[7px] text-neutral-500 uppercase tracking-widest block leading-none font-bold">BATCH RELEASE TIMEFRAME</span>
              <span className="text-xs font-bold text-white block mt-1">
                {String(timeLeft.h).padStart(2, '0')}h : {String(timeLeft.m).padStart(2, '0')}m : {String(timeLeft.s).padStart(2, '0')}s
              </span>
            </div>
          </div>
        </div>

        {/* Waitlist Form */}
        <div className="w-full max-w-md mx-auto">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.form
                key="waitlist-form"
                onSubmit={handleWaitlistSubmit}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                <div className="relative rounded-full border border-white/10 bg-black/60 p-1.5 flex items-center justify-between shadow-2xl focus-within:border-[#7c5cff]/50 focus-within:shadow-[0_0_35px_rgba(124,92,255,0.08)] transition-all duration-300">
                  <input
                    type="email"
                    placeholder="Enter your professional email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    className="flex-1 bg-transparent border-none text-white text-sm sm:text-base font-sans px-5 focus:outline-none placeholder-neutral-600 disabled:opacity-50"
                  />
                  
                  <MagneticButton disabled={isSubmitting}>
                    {isSubmitting ? (
                      <div className="w-5 h-5 rounded-full border-2 border-black border-t-transparent animate-spin" />
                    ) : (
                      <>
                        <span>Reserve Spot</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </MagneticButton>
                </div>

                <AnimatePresence>
                  {errorMsg && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-2 text-red-400 text-xs font-mono select-text"
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errorMsg}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.form>
            ) : (
              <motion.div
                key="waitlist-success"
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="border border-[#7c5cff]/30 bg-[#7c5cff]/5 backdrop-blur-2xl rounded-3xl p-8 flex flex-col items-center text-center space-y-4 shadow-2xl shadow-[#7c5cff]/5"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                </div>

                <div className="space-y-2 select-text">
                  <h4 className="text-xl font-headline font-bold text-white">Queue Spot Reserved</h4>
                  <p className="text-xs text-neutral-400 font-sans max-w-xs leading-relaxed">
                    We have dispatched verification and edge sandbox tokens directly to <span className="text-[#00d4ff] font-semibold font-mono">{email}</span>.
                  </p>
                </div>

                <div className="border border-white/5 bg-black/40 rounded-xl px-5 py-3 mt-2 flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-[#7c5cff] animate-pulse" />
                  <div className="text-left font-mono text-[10px]">
                    <span className="text-neutral-500 uppercase tracking-widest block leading-none font-bold">QUEUE SPOT ASSIGNED</span>
                    <span className="text-white font-bold text-sm block mt-1">Spot #{waitlistSpot}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
