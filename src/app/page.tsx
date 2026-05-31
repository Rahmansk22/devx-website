'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import SectionReveal from '@/components/SectionReveal';
import SectionMeet from '@/components/SectionMeet';
import SectionIdea from '@/components/SectionIdea';
import SectionHorizontal from '@/components/SectionHorizontal';
import SectionShowcase from '@/components/SectionShowcase';
import SectionEngine from '@/components/SectionEngine';
import SectionFuture from '@/components/SectionFuture';

import DevXLogo from '@/components/DevXLogo';

const SECTIONS = [
  { id: 'reveal', label: 'Reveal' },
  { id: 'meet', label: 'Overview' },
  { id: 'idea', label: 'Workflow' },
  { id: 'horizontal', label: 'Cycle' },
  { id: 'showcase', label: 'Showcase' },
  { id: 'engine', label: 'Engine' },
  { id: 'future', label: 'Waitlist' }
];

export default function Home() {
  const { scrollYProgress } = useScroll();
  
  // Spring settings for global progress bar
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [activeSection, setActiveSection] = useState('reveal');

  // Track active section to light up timeline markers
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      
      const elements = {
        reveal: document.getElementById('devx-section-reveal'),
        meet: document.getElementById('devx-section-meet'),
        idea: document.getElementById('devx-section-idea'),
        horizontal: document.getElementById('devx-section-horizontal'),
        showcase: document.getElementById('devx-section-showcase'),
        engine: document.getElementById('devx-section-engine'),
        future: document.getElementById('devx-section-future'),
      };

      for (const [key, element] of Object.entries(elements)) {
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(key);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(`devx-section-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-black min-h-screen text-white font-sans antialiased overflow-x-hidden selection:bg-[#7c5cff]">
      
      {/* 1. Global Progress Bar (Top) */}
      <motion.div 
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#7c5cff] via-[#00d4ff] to-white origin-left z-[100] pointer-events-none"
      />

      {/* 2. Sleek Glassmorphic Floating Header (Navigation) */}
      <header className="fixed top-5 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl h-14 apple-liquid-glass rounded-full px-6 flex justify-between items-center z-[90] select-none">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('reveal')}>
          <DevXLogo size={32} interactive={false} glow={false} />
          <span className="font-headline font-bold text-sm tracking-widest text-white uppercase">
            Dev <span className="text-[#7c5cff] drop-shadow-[0_0_8px_rgba(124,92,255,0.6)]">X</span>
          </span>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1.5 text-xs font-mono tracking-widest uppercase text-neutral-400">
          {SECTIONS.map((sec) => (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className={`hover:text-white transition-all cursor-pointer relative px-3 py-1.5 rounded-full text-[10px] tracking-wider transition-colors duration-300 ${
                activeSection === sec.id ? 'text-white font-semibold' : 'hover:bg-white/[0.02]'
              }`}
            >
              <span className="relative z-10">{sec.label}</span>
              {activeSection === sec.id && (
                <motion.span
                  layoutId="activeNavIndicator"
                  className="absolute inset-0 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_0_20px_rgba(124,92,255,0.15)] pointer-events-none"
                  transition={{ type: 'spring', stiffness: 320, damping: 25 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Join Waitlist CTA action */}
        <button
          onClick={() => scrollToSection('future')}
          className="px-4 py-2 rounded-full bg-white text-black hover:bg-neutral-100 font-headline font-semibold text-[10px] sm:text-xs uppercase tracking-wider border border-white transition-all duration-300 shadow-lg shadow-white/5 cursor-pointer"
        >
          Join Waitlist
        </button>
      </header>

      {/* 3. Global Floating Scroll Index Timeline (Right Side) */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-5 z-[90] select-none">
        {SECTIONS.map((sec) => (
          <button
            key={sec.id}
            onClick={() => scrollToSection(sec.id)}
            className="group flex items-center justify-end gap-3 text-right cursor-pointer"
          >
            <span className="opacity-0 group-hover:opacity-100 text-[9px] font-mono tracking-widest uppercase text-neutral-400 transition-opacity duration-300">
              {sec.label}
            </span>
            <div 
              className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
                activeSection === sec.id 
                  ? 'bg-white border-white scale-125 shadow-glow' 
                  : 'bg-black border-neutral-700 group-hover:border-neutral-500'
              }`}
              style={{
                boxShadow: activeSection === sec.id ? '0 0 10px #7c5cff, 0 0 5px #00d4ff' : undefined
              }}
            />
          </button>
        ))}
      </div>

      {/* 4. Full Story-driven Interactive Layout */}
      <main className="w-full h-auto">
        <SectionReveal />
        <SectionMeet />
        <SectionIdea />
        <SectionHorizontal />
        <SectionShowcase />
        <SectionEngine />
        <SectionFuture />
      </main>

    </div>
  );
}
