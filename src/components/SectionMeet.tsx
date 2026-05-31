'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Cpu, Code, Layers } from 'lucide-react';
import AICore from './AICore';
import DevXLogo from './DevXLogo';

const PRINCIPLES = [
  {
    icon: Code,
    title: 'Zero-Abstraction Next.js 15 Source',
    desc: 'DevX synthesises standard Next.js 15.4.10 (App Router), React 19.1.4, TypeScript 5.7.3, and Tailwind CSS 4.1.18. No proprietary runtimes, no vendor lock-in. What we compile is standard React/TypeScript entirely owned by you.',
    stat: 'Vercel, Railway, Fly.io Native'
  },
  {
    icon: Cpu,
    title: 'Specialized Prompt Orchestration',
    desc: 'Six specialized LLM micro-agents collaborate dynamically using Inngest event orchestration. Enforces strict shadcn/ui variables via policy.ts, validates Clerk routes via tool-validation.ts, and structures schemas via Prisma.',
    stat: 'Inngest Event Pipelines'
  },
  {
    icon: Layers,
    title: 'Self-Healing Sandbox Deployments',
    desc: 'Generated builds pass through secure E2B container sandboxes using the custom e2b.Dockerfile template. If TypeScript, imports, or eslint checks fail, error-detector.ts and auto-fixer.ts trigger compiler fallback loops to heal the app under 45s.',
    stat: 'E2B VMs & Sentry Healing'
  }
];

export default function SectionMeet() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const scaleCore = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.75, 1.1, 1.1, 0.75]);
  const opacityCore = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const yOffset = useTransform(scrollYProgress, [0, 0.4, 1], [120, 0, -120]);

  // Scrolling cascading parallax for the three columns on desktop
  const yCol1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yCol2 = useTransform(scrollYProgress, [0, 1], [0, 0]);
  const yCol3 = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  const words = ["Apps", "Platforms", "Products", "Businesses"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center py-32 px-6 sm:px-12 md:px-24"
      id="devx-section-meet"
    >
      {/* Dynamic backdrop glows */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,212,255,0.06)_0%,rgba(0,0,0,0)_70%)] pointer-events-none filter blur-[150px] gpu-accelerated" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.06)_0%,rgba(0,0,0,0)_70%)] pointer-events-none filter blur-[150px] gpu-accelerated" />

      {/* Grid Lines Overlay */}
      <div className="absolute inset-0 bg-grid-lines pointer-events-none opacity-10" />

      <motion.div 
        style={{ y: yOffset, opacity: opacityCore }}
        className="w-full max-w-7xl relative z-10 space-y-32"
      >
        {/* Main upper fold */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-[#00d4ff] animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#00d4ff]">THE COGNITIVE PLATFORM</span>
            </motion.div>

            <h2 className="text-5xl sm:text-7xl md:text-8xl font-bold font-headline tracking-tighter leading-[0.85] text-white">
              Meet Dev X.
            </h2>

            <p className="text-xl sm:text-2xl font-light text-neutral-400 max-w-xl leading-relaxed font-sans">
              An agentic orchestration engine for autonomous full-stack development. Dev X converts natural concepts into secure, production-grade Next.js, Prisma, and PostgreSQL software systems.
            </p>

            <div className="h-[70px] sm:h-[90px] flex items-center overflow-hidden text-left select-none">
              <span className="text-2xl sm:text-4xl text-neutral-400 font-light font-headline tracking-tight">
                DevX synthesises complete&nbsp;
              </span>
              <div className="relative inline-block h-full min-w-[200px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={words[index]}
                    initial={{ y: 30, opacity: 0, filter: 'blur(8px)' }}
                    animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                    exit={{ y: -30, opacity: 0, filter: 'blur(8px)' }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute left-0 top-1/2 -translate-y-1/2 text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] via-[#7c5cff] to-[#00d4ff] drop-shadow-[0_0_20px_rgba(0,212,255,0.4)] font-headline tracking-tight"
                  >
                    {words[index]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right Column: 3D AI Core Canvas */}
          <motion.div 
            style={{ scale: scaleCore }}
            className="lg:col-span-5 h-[400px] sm:h-[500px] w-full flex items-center justify-center relative select-none"
          >
            <div className="absolute w-[350px] h-[350px] rounded-full bg-[#7c5cff]/10 filter blur-[90px]" />
            <AICore intensity={1.25} scale={1.1} className="w-full h-full z-10" />
            <div className="absolute z-20 pointer-events-none select-none flex items-center justify-center">
              <DevXLogo size={240} glow={true} interactive={true} />
            </div>
          </motion.div>
        </div>

        {/* Lower Fold: Core Architecture Principles Grid */}
        <div className="space-y-12">
          <div className="flex flex-col text-left space-y-3 select-none">
            <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">Architectural Foundation</span>
            <h3 className="text-3xl font-headline font-bold text-white tracking-tight">Autonomous Engineering Standards</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRINCIPLES.map((item, idx) => {
              const PrincipleIcon = item.icon;
              const colY = idx === 0 ? yCol1 : idx === 2 ? yCol3 : yCol2;
              const styleY = isDesktop ? colY : 0;

              return (
                <motion.div
                  key={idx}
                  style={{ y: styleY }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="relative p-8 bg-gradient-to-b from-neutral-900/20 to-transparent backdrop-blur-lg rounded-2xl flex flex-col justify-between items-start text-left group overflow-hidden border-0 shadow-none transition-all duration-300"
                >
                  {/* Glowing, organic background hover aura spot */}
                  <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.08)_0%,rgba(124,92,255,0.03)_50%,rgba(0,0,0,0)_100%)] filter blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="space-y-6 relative z-10">
                    {/* Borderless premium glowing icon box */}
                    <div className="w-14 h-14 rounded-2xl bg-neutral-900/50 flex items-center justify-center text-[#7c5cff] group-hover:text-[#00d4ff] group-hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all duration-300 select-none">
                      <PrincipleIcon className="w-6 h-6" />
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-xl font-headline font-bold text-white tracking-tight group-hover:text-[#00d4ff] transition-colors duration-300">
                        {item.title}
                      </h4>
                      <p className="text-sm text-neutral-400 font-sans leading-relaxed">{item.desc}</p>
                    </div>
                  </div>

                  {/* Borderless, clean performance target badges */}
                  <div className="mt-8 w-full flex justify-between items-center text-[10px] font-mono text-neutral-500 relative z-10 select-none">
                    <span className="uppercase tracking-widest opacity-80">Performance Target</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c5cff] font-bold tracking-tight drop-shadow-[0_0_8px_rgba(0,212,255,0.3)]">
                      {item.stat}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
