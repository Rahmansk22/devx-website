'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HLSVideo from './HLSVideo';
import DevXLogo from './DevXLogo';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const STEPS = [
  {
    id: 'prompt',
    phase: '01',
    title: 'Lexical Audit',
    subtitle: 'Pre-Generation Rules Enforcement',
    description: 'When you submit a concept, the compiler runs a Lexical Audit. It references policy.ts to enforce strict Shadcn components usage, Tailwind design tokens, and client/server boundaries before writing a single line of code.',
    hud: { title: 'PRE-GEN GUARD', stat: 'ACTIVE', color: '#7c5cff' }
  },
  {
    id: 'compiler',
    phase: '02',
    title: '3-Layer Defense',
    subtitle: 'AST Static Audit & Verification',
    description: 'The neural compiler translates prompts into Next.js 15, React 19, and Tailwind v4. The 3-Layer Defense runs 11 mandatory audit checks (including hook orders, JSX unescaped entities, and import validation) to prevent runtime failures.',
    hud: { title: '11 AUDIT BLOCKS', stat: 'VERIFYING', color: '#00d4ff' }
  },
  {
    id: 'sandbox',
    phase: '03',
    title: 'Sandbox Integration',
    subtitle: 'Secure Container Build Runs',
    description: 'Every compiled bundle passes through secure sandbox integration runs via Inngest and tRPC. We build and containerize the application (Next.js, database schemas, server routes) in active, isolated runtime sandboxes.',
    hud: { title: 'SANDBOX EXEC', stat: 'BUILDING', color: '#7c5cff' }
  },
  {
    id: 'detector',
    phase: '04',
    title: 'Error Detection',
    subtitle: 'Real-time Build Log Scanning',
    description: 'During container execution, the ErrorDetector monitors build events and scans output logs. It employs regex pattern classifiers to capture TypeScript compilation anomalies, missing modules, syntax issues, or resource exhaustion.',
    hud: { title: 'ERROR DETECTOR', stat: 'SCANNING', color: '#00d4ff' }
  },
  {
    id: 'healing',
    phase: '05',
    title: 'Self-Healing Auto-Fix',
    subtitle: 'Automated Recovery Strategy execution',
    description: 'If errors are detected, the event-driven SelfHealingAgent triggers AutoFixer strategies. It resolves missing dependencies, applies TypeScript syntax fixes, and runs automated compiler retry loops in under 45s.',
    hud: { title: 'AUTO-FIX ENGINE', stat: '0 HOOK WARN', color: '#10b981' }
  }
];

const STEP_TELEMETRY = [
  // Phase 1: Lexical Audit
  `> devx audit --pre-gen --ruleset=policy.ts
[AUDIT] Initializing pre-generation policy check...
[AUDIT] policy.ts: strict component catalog active.
[AUDIT] policy.ts: HSL token validation active.
[AUDIT] policy.ts: client/server boundaries defined.
[AUDIT] 100% Passed. Ready to generate.`,

  // Phase 2: 3-Layer Defense
  `> devx verify --ast --checks=11
[AST] Scanning generated AST for page.tsx...
[VERIFIER] Running 11 strict validation audits:
 - Hooks order context hierarchy: Verified
 - Unescaped HTML/JSX entities: Sanitized
 - Client/Server boundaries checks: Verified
[VERIFIER] 11/11 audits verified successfully.`,

  // Phase 3: Sandbox Integration
  `> devx container init --sandbox-id=sb_app_123
[SANDBOX] Initializing isolated micro-container...
[SANDBOX] Running: npm ci --prefer-offline --no-audit
[SANDBOX] Running: next build --turbopack
[SANDBOX] [ERROR] Failed to compile. Log stream sent to ErrorDetector.`,

  // Phase 4: Error Detection
  `> devx-detector scan --log=sb_app_123.log
[DETECTOR] Scanning build output for regex patterns...
[DETECTOR] Pattern matched: "hooks-without-use-client"
[DETECTOR] Match: "useState(initialState) -> page.tsx:18"
[DETECTOR] Severity: CRITICAL
[DETECTOR] Action: Triggering NextJSHooksFixStrategy...`,

  // Phase 5: Self-Healing Auto-Fix
  `> devx-healing apply-strategy --id=NextJSHooksFixStrategy
[HEALING] Triggering AutoFixer for appId: sb_app_123
[HEALING] Strategy: NextJSHooksFixStrategy on page.tsx
[HEALING] Action: Injecting "'use client'" at line 1.
[HEALING] Testing build: npx tsc --noEmit (Passed)
[HEALING] Rebuild: npm run build (Success in 42s)
[HEALING] Status: Deployed to edge (https://saas-dashboard.devx.app)`
];

export default function SectionIdea() {
  const [activeStep, setActiveStep] = useState(0);

  const handlePrev = () => {
    setActiveStep((prev) => (prev === 0 ? STEPS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveStep((prev) => (prev === STEPS.length - 1 ? 0 : prev + 1));
  };

  // 3D Parallax Mouse Coordinate Tracking for the Compiler Card
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

  // Typewriter prompt simulation
  const [engineResponse, setEngineResponse] = useState('');
  
  useEffect(() => {
    let i = 0;
    setEngineResponse('');
    const targetText = STEP_TELEMETRY[activeStep] || '';
    const interval = setInterval(() => {
      if (i < targetText.length) {
        setEngineResponse((prev) => prev + targetText.charAt(i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 6);
    return () => clearInterval(interval);
  }, [activeStep]);

  // Visualizer tabs inside the right panel workspace
  const [productTab, setProductTab] = useState<'app' | 'schema'>('app');

  return (
    <div
      className="relative w-full min-h-screen bg-[#030303] py-24 flex flex-col justify-between selection:bg-[#7c5cff] select-none"
      id="devx-section-idea"
    >
      {/* Scanning Laser Beam (Motionsites Sweep - Ambient) */}
      <motion.div 
        animate={{ top: ["0%", "100%"] }}
        transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
        className="absolute left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#7c5cff]/40 to-transparent shadow-[0_0_20px_rgba(124,92,255,0.3)] z-10 pointer-events-none"
      />

      {/* Premium Organic SVG Noise Film Overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.015] pointer-events-none z-20 mix-blend-overlay">
        <filter id="workflowNoise">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#workflowNoise)" />
      </svg>

      {/* Shifting Aurora Gradients (Mesh Blobs - Ambient Infinite Rotation) */}
      <motion.div 
        animate={{ 
          x: activeStep % 2 === 0 ? [-20, 20, -20] : [20, -20, 20],
          y: activeStep % 2 === 0 ? [-20, 30, -20] : [30, -20, 30]
        }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.06)_0%,rgba(0,0,0,0)_70%)] filter blur-[120px] pointer-events-none mix-blend-screen z-0 animate-pulse"
      />
      <motion.div 
        animate={{ 
          x: activeStep % 2 === 0 ? [30, -30, 30] : [-30, 30, -30],
          y: activeStep % 2 === 0 ? [30, -20, 30] : [-20, 30, -20]
        }}
        transition={{ repeat: Infinity, duration: 16, ease: "easeInOut" }}
        className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,212,255,0.05)_0%,rgba(0,0,0,0)_70%)] filter blur-[120px] pointer-events-none mix-blend-screen z-0 animate-pulse"
      />

      {/* Ceiling & Floor Perspectives */}
      <div className="absolute inset-x-0 top-0 h-[25vh] overflow-hidden pointer-events-none opacity-20 z-0">
        <div 
          className="w-[200%] h-[200%] absolute -left-1/2 -top-[60%] bg-grid-lines" 
          style={{ 
            transform: 'perspective(500px) rotateX(-65deg) translateZ(0)',
            transformOrigin: 'center center'
          }} 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
      </div>

      <div className="absolute inset-x-0 bottom-0 h-[25vh] overflow-hidden pointer-events-none opacity-20 z-0">
        <div 
          className="w-[200%] h-[200%] absolute -left-1/2 -bottom-[60%] bg-grid-lines" 
          style={{ 
            transform: 'perspective(500px) rotateX(65deg) translateZ(0)',
            transformOrigin: 'center center'
          }} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black" />
      </div>

      <div className="w-full max-w-7xl mx-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center px-6 sm:px-12 md:px-24 py-8 z-10">
        
        {/* Left Panel: Neo-Glow Timeline & Narrative Copy */}
        <div className="lg:col-span-5 h-[32vh] lg:h-auto flex items-stretch text-left relative overflow-hidden select-none pl-4">
          
          {/* High-tech vertical glow timeline tracker (Fully Clickable) */}
          <div className="w-[3px] bg-neutral-900/60 rounded-full relative mr-6 hidden sm:block">
            <motion.div 
              animate={{
                top: `${(activeStep / (STEPS.length - 1)) * 96}%`
              }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              style={{
                backgroundColor: activeStep % 2 === 0 ? '#7c5cff' : '#00d4ff',
                boxShadow: activeStep % 2 === 0 ? '0 0 10px #7c5cff' : '0 0 10px #00d4ff'
              }}
              className="absolute w-2 h-2 rounded-full -left-0.5 transition-colors duration-500"
            />
            {STEPS.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`absolute w-3 h-3 rounded-full -left-1 border cursor-pointer transition-all duration-300 ${
                  idx === activeStep 
                    ? 'bg-white border-white scale-125' 
                    : 'bg-black border-neutral-800 hover:border-neutral-500'
                }`}
                style={{ top: `${(idx / (STEPS.length - 1)) * 100}%` }}
                aria-label={`Go to step ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex-1 relative h-[280px] sm:h-[300px]">
            <AnimatePresence mode="wait">
              {STEPS.map((step, idx) => {
                if (idx !== activeStep) return null;
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -30, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, x: 30, filter: 'blur(8px)' }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 flex flex-col justify-start space-y-4"
                  >
                    <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#7c5cff] font-semibold flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7c5cff] animate-ping" />
                      Phase {step.phase} &middot; {step.id}
                    </span>
                    <h3 className="text-3xl sm:text-5xl font-bold font-headline tracking-tighter leading-none text-white">
                      {step.title}
                    </h3>
                    <h4 className="text-lg sm:text-xl font-medium text-neutral-300 tracking-tight leading-snug">
                      {step.subtitle}
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
                      {step.description}
                    </p>
                    
                    {/* Step Progress indicators (Fully Clickable) */}
                    <div className="flex items-center gap-2 pt-2">
                      {STEPS.map((_, dotIdx) => (
                        <button
                          key={dotIdx}
                          onClick={() => setActiveStep(dotIdx)}
                          className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer border-0 ${
                            dotIdx === activeStep 
                              ? 'w-8 bg-[#7c5cff]' 
                              : dotIdx < activeStep 
                                ? 'w-2.5 bg-[#7c5cff]/40' 
                                : 'w-2.5 bg-neutral-800 hover:bg-neutral-600'
                          }`}
                          aria-label={`Go to phase ${dotIdx + 1}`}
                        />
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Panel: Interactive 3D Parallax Compiler IDE */}
        <div className="lg:col-span-7 min-h-[460px] lg:h-[500px] w-full flex items-center justify-center relative p-1">
          
          {/* Sliding Chevron Left */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-[-35px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 transition-all text-neutral-400 cursor-pointer z-50 drop-shadow-[0_0_15px_rgba(0,212,255,0.3)]"
            aria-label="Previous Phase"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2]" />
          </button>
          
          {/* Floating HUD Badges surrounding the compiler (Clean cardless tabs) */}
          <AnimatePresence mode="wait">
            {STEPS.map((step, idx) => {
              if (idx !== activeStep) return null;
              return (
                <div key={`hud-${step.id}`} className="absolute inset-0 z-20 pointer-events-none hidden sm:block">
                  {/* HUD Badge Top-Right */}
                  <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="absolute -top-3 -right-3 px-3 py-1.5 rounded-xl bg-neutral-950/90 shadow-2xl flex items-center gap-2 text-[9px] font-mono tracking-widest text-neutral-400"
                  >
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: step.hud.color }} />
                    <span>{step.hud.title}:</span>
                    <span className="font-bold text-white" style={{ color: step.hud.color }}>{step.hud.stat}</span>
                  </motion.div>

                  {/* HUD Badge Bottom-Left */}
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200, delay: 0.05 }}
                    className="absolute -bottom-3 -left-3 px-3 py-1.5 rounded-xl bg-neutral-950/90 shadow-2xl flex items-center gap-2 text-[8px] font-mono tracking-widest text-neutral-500"
                  >
                    <span>⚡ SYS_LATENCY:</span>
                    <span className="font-bold text-emerald-400">&lt; 40MS</span>
                  </motion.div>
                </div>
              );
            })}
          </AnimatePresence>

          {/* 3D Interactive Parallax Tilt Container */}
          <motion.div
            style={{
              transformStyle: 'preserve-3d',
              perspective: 1200
            }}
            animate={{
              rotateX: mousePos.y * -14,
              rotateY: mousePos.x * 14
            }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full h-full max-w-[680px] max-h-[460px] bg-[#0c0c0e]/95 border border-white/5 rounded-2xl flex flex-col sm:flex-row overflow-hidden shadow-[0_0_60px_-15px_rgba(124,92,255,0.25)] relative transition-all duration-300 hover:border-white/10 cursor-grab active:cursor-grabbing text-white"
          >
            {/* Spotlight reflection */}
            <div 
              className="absolute inset-0 z-20 pointer-events-none opacity-20 mix-blend-overlay transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at ${(mousePos.x + 0.5) * 100}% ${(mousePos.y + 0.5) * 100}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 60%)`
              }}
            />

            {/* 1. Left Panel (Compiler Engine details) */}
            <div className="w-full sm:w-[36%] border-b sm:border-b-0 sm:border-r border-white/5 flex flex-col justify-between bg-[#08080a] p-3 text-left">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-lg bg-neutral-900 flex items-center justify-center">
                      <DevXLogo size={14} interactive={false} glow={false} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-bold text-white leading-none">saas dashboard</span>
                      <span className="text-[7px] text-[#00d4ff] flex items-center gap-1 mt-0.5 font-mono">
                        <span className="w-1 h-1 rounded-full bg-[#00d4ff] animate-pulse" />
                        LIVE
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-[7px] bg-[#ffb800]/10 text-[#ffb800] px-1.5 py-0.5 rounded font-bold uppercase">UPGRADE</span>
                  </div>
                </div>

                {/* Input Prompt bubble */}
                <div className="bg-neutral-900/60 rounded-xl p-2 text-[9px] text-neutral-300 font-mono flex items-center justify-between">
                  <span className="truncate">create an autonomous saas dashboard with trpc and postgres</span>
                  <span className="text-neutral-600 text-[8px]">✓</span>
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-[8px] font-mono tracking-wider text-neutral-500 font-bold">
                    <span>DEV-X ENGINE</span>
                    <span className="w-1 h-1 rounded-full bg-[#7c5cff]" />
                    <span className="text-[#7c5cff] animate-pulse">PROCESSING STREAM</span>
                  </div>
                  
                  <div className="text-[9px] text-neutral-400 font-mono whitespace-pre-wrap leading-normal min-h-[85px] sm:min-h-[140px] select-text">
                    <p className="inline">{engineResponse}</p>
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="inline-block w-1.5 h-3 bg-[#7c5cff] ml-1 align-middle"
                    />
                  </div>

                  <div className="flex gap-1.5 pt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ffb800] animate-pulse" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-neutral-900/45 rounded-xl p-2 space-y-1.5">
                  <div className="flex justify-between items-center text-[7px] font-mono text-neutral-500">
                    <div className="flex items-center gap-1">
                      <span>⚡</span>
                      <span className="text-white font-bold">999 / 20</span>
                    </div>
                    <span>RESET IN 29D 23H 59M</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1 bg-neutral-950 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#ffb800] to-[#7c5cff]" style={{ width: '65%' }} />
                    </div>
                    <span className="text-[7px] font-bold text-[#ffb800] bg-[#ffb800]/5 px-1.5 py-0.5 rounded cursor-pointer hover:bg-[#ffb800]/15 transition-colors">GO PRO &gt;</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 text-[7px] font-mono text-neutral-500">
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-neutral-900 text-white">
                      <DevXLogo size={8} interactive={false} glow={false} />
                      <span>DEVX BASIC</span>
                      <span className="w-1 h-1 rounded-full bg-[#00d4ff]" />
                    </div>
                    <span className="opacity-45">TURBO</span>
                    <span className="opacity-45">PRO</span>
                  </div>
                  <div className="w-5 h-5 rounded bg-neutral-900 flex items-center justify-center text-white">
                    ↑
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Right Panel (Visualizer Panel) */}
            <div className="flex-1 flex flex-col justify-between bg-[#0e0e11] p-3 text-left">
              <div className="flex-1 flex flex-col relative overflow-hidden">
                <div className="flex items-center justify-between pb-2 mb-3">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setProductTab('app')}
                      className={`text-[9px] font-mono tracking-widest px-2.5 py-0.5 rounded transition-all cursor-pointer ${productTab === 'app' ? 'text-[#00d4ff] bg-[#00d4ff]/10 font-bold' : 'text-neutral-500 hover:text-neutral-300'}`}
                    >
                      VISUAL
                    </button>
                    <button 
                      onClick={() => setProductTab('schema')}
                      className={`text-[9px] font-mono tracking-widest px-2.5 py-0.5 rounded transition-all cursor-pointer ${productTab === 'schema' ? 'text-[#7c5cff] bg-[#7c5cff]/10 font-bold' : 'text-neutral-500 hover:text-neutral-300'}`}
                    >
                      SOURCE
                    </button>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500/30" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/30" />
                    <div className="w-2 h-2 rounded-full bg-green-500/30" />
                  </div>
                </div>

                {/* Canvas */}
                <div className="flex-1 flex flex-col relative overflow-hidden bg-neutral-950/20 rounded-xl p-3">
                  {productTab === 'app' && (
                    <div className="w-full h-full flex flex-col justify-center items-center relative overflow-hidden">
                      <AnimatePresence mode="wait">
                        {activeStep < 4 ? (
                          <motion.div
                            key="ide-loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full h-full flex flex-col items-center justify-center text-center space-y-4"
                          >
                            <div className="absolute inset-0 grid grid-cols-3 gap-2 opacity-[0.03] p-2">
                              <div className="bg-white rounded-lg h-12" />
                              <div className="bg-white rounded-lg h-12" />
                              <div className="bg-white rounded-lg h-12" />
                              <div className="bg-white rounded-lg col-span-2 h-24" />
                              <div className="bg-white rounded-lg h-24" />
                            </div>

                            <div className="w-12 h-12 rounded-full bg-neutral-900 shadow-[0_0_15px_rgba(0,212,255,0.25)] flex items-center justify-center animate-pulse z-10">
                              <span className="text-[11px] text-[#00d4ff] font-mono">&gt;_</span>
                            </div>
                            
                            <div className="space-y-1 z-10">
                              <h5 className="text-[10px] font-bold text-white tracking-widest uppercase flex items-center justify-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-ping" />
                                MODULES LOADING
                              </h5>
                              <p className="text-[7px] font-mono text-neutral-500">DEVX INTERFACE V4.2.1 STABLE</p>
                            </div>

                            <button className="px-3 py-1 rounded bg-[#00d4ff]/10 hover:bg-[#00d4ff]/20 text-[8px] font-mono font-bold text-[#00d4ff] tracking-wider transition-colors z-10 shadow-lg cursor-pointer border-0">
                              WANNA TRY GAMES UNTIL PREVIEW READY?
                            </button>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="ide-complete"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 w-full h-full"
                          >
                            <HLSVideo src="https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8" className="absolute inset-0 w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />

                            <motion.div
                              animate={{ x: [30, 180, 70], y: [80, 30, 90] }}
                              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                              className="absolute z-10 flex flex-col items-start"
                            >
                              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-[#7c5cff] fill-current">
                                <path d="M4.5,3v15.2l3.7-3.7l2.9,6.7l2.5-1.1l-2.9-6.6l4.9-0.5L4.5,3z" />
                              </svg>
                              <span className="text-[6px] bg-[#7c5cff] text-white px-1 py-0.5 rounded shadow-lg -mt-0.5 ml-2 font-sans font-bold">Alex (Compiler)</span>
                            </motion.div>

                            <motion.div
                              animate={{ x: [210, 80, 230], y: [30, 110, 50] }}
                              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 0.5 }}
                              className="absolute z-10 flex flex-col items-start"
                            >
                              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-[#00d4ff] fill-current">
                                <path d="M4.5,3v15.2l3.7-3.7l2.9,6.7l2.5-1.1l-2.9-6.6l4.9-0.5L4.5,3z" />
                              </svg>
                              <span className="text-[6px] bg-[#00d4ff] text-black px-1 py-0.5 rounded shadow-lg -mt-0.5 ml-2 font-sans font-bold">Sarah (UX Audit)</span>
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {productTab === 'schema' && (
                    <div className="w-full h-full bg-neutral-950/20 p-2 rounded-lg text-left font-mono text-[8px] text-neutral-400 overflow-y-auto space-y-2 select-text">
                      {activeStep < 3 ? (
                        <>
                          <p className="text-neutral-500">{"// Active compilation build schema planning..."}</p>
                          <p className="text-purple-400">export const <span className="text-white">todoTable</span> = pgTable(<span className="text-emerald-400">{"\"todos\""}</span>, &#123;</p>
                          <p className="pl-4">id: serial(<span className="text-emerald-400">{"\"id\""}</span>).primaryKey(),</p>
                          <p className="pl-4">title: varchar(<span className="text-emerald-400">{"\"title\""}</span>, &#123; length: 255 &#125;).notNull(),</p>
                          <p className="pl-4">completed: boolean(<span className="text-emerald-400">{"\"completed\""}</span>).default(false),</p>
                          <p className="text-purple-400">&#125;);</p>
                        </>
                      ) : (
                        <>
                          <p className="text-neutral-600">&gt; next build --turbopack</p>
                          <p className="text-[#00d4ff]">✔ Parsed prompt tokens from AST (32ms)</p>
                          <p className="text-white">✔ Compiled Next.js application (Success)</p>
                          <p className="text-emerald-400">✔ Synced migrations to relational DB instance</p>
                          <p className="text-purple-400">✔ Deployed edge bundles to 280+ nodes globally</p>
                          <p className="text-emerald-400 font-bold mt-2">✓ URL ACTIVE: https://saas-dashboard.devx.app</p>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Status Footer */}
              <div className="pt-2 flex items-center justify-between text-[7px] font-mono text-neutral-500 select-none">
                <div className="flex items-center gap-1.5">
                  <span>SYSTEM V2.4.1</span>
                  <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                  <span>ENGINE SYNCING</span>
                </div>
                <div className="flex items-center gap-1 text-[#00d4ff] font-bold">
                  <span>0 OBJECTS</span>
                  <span className="text-neutral-600">|</span>
                  <span className="text-orange-400 uppercase tracking-widest animate-pulse">BUILDING</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sliding Chevron Right */}
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-[-35px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 transition-all text-neutral-400 cursor-pointer z-50 drop-shadow-[0_0_15px_rgba(124,92,255,0.3)]"
            aria-label="Next Phase"
          >
            <ChevronRight className="w-6 h-6 stroke-[2]" />
          </button>

        </div>

      </div>
    </div>
  );
}
