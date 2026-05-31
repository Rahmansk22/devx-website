'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Code2, Server, Database, ShieldCheck, CloudLightning } from 'lucide-react';
import DevXLogo from './DevXLogo';

const AGENTS = [
  {
    id: 'policy',
    name: 'Policy Agent',
    icon: Palette,
    color: '#7c5cff',
    x: '50%',
    y: '15%',
    stats: { cpu: '12%', tokens: '1.4k/s', integrity: '100%', speed: '38ms' },
    desc: 'Bespoke UI and layout guidelines controller. References policy.ts and image-handling.ts to enforce Tailwind CSS 4.1.18 variable tokens, Radix-based shadcn/ui structures, and Space Grotesk typography.',
    logs: [
      '[10:24:01] Policy: Initializing token validation matrix...',
      '[10:24:02] Policy: Enforcing colors (Tailwind v4 HSL palettes)...',
      '[10:24:02] Policy: Binding Space Grotesk font layouts.',
      '[10:24:03] Policy: Injecting LottiePlayer and ScrambledText widgets.'
    ]
  },
  {
    id: 'validation',
    name: 'Validation Agent',
    icon: Code2,
    color: '#00d4ff',
    x: '85%',
    y: '33%',
    stats: { cpu: '34%', tokens: '2.8k/s', integrity: '98.8%', speed: '120ms' },
    desc: 'Technical environment syntax auditor. Parses tool-validation.ts and import-export-validator.ts to enforce client/server boundaries, Clerk authentication routes, and relative import path remappings.',
    logs: [
      '[10:24:03] Validation: remanding relative paths to @/ namespace.',
      '[10:24:04] Validation: Checking Clerk login routing (/sign-in /dashboard).',
      '[10:24:05] Validation: Verifying next.config.ts tRPC API router mappings.',
      '[10:24:05] Validation: Boundary audits passed: 100% compliant.'
    ]
  },
  {
    id: 'quality',
    name: 'Quality Agent',
    icon: Server,
    color: '#7c5cff',
    x: '85%',
    y: '67%',
    stats: { cpu: '22%', tokens: '1.9k/s', integrity: '100%', speed: '85ms' },
    desc: 'TypeScript 5.7.3 static conventions engine. Utilizes code-quality.ts to review React 19.1.4 hook declarations, escape unescaped JSX entities, validate conditional execution, and prevent runtime failures.',
    logs: [
      '[10:24:06] Quality: Scanning files for React 19 concurrent features...',
      '[10:24:07] Quality: Validating TypeScript interface definitions.',
      '[10:24:07] Quality: ESLint checks active. Checking jsx-unescaped-entities.',
      '[10:24:08] Quality: 0 warnings, 0 type errors detected in AST.'
    ]
  },
  {
    id: 'guard',
    name: 'Guard Agent',
    icon: Database,
    color: '#00d4ff',
    x: '50%',
    y: '85%',
    stats: { cpu: '15%', tokens: '1.2k/s', integrity: '100%', speed: '62ms' },
    desc: 'Mandatory compilation enforcement firewall. Orchestrates prompts via code-generation-guard.ts and runs the strict validateSteps.ts (Steps 1-12) to verify package.json dependencies and prisma schemas.',
    logs: [
      '[10:24:08] Guard: Initiating Pre-Generation Guard prompt sequence...',
      '[10:24:09] Guard: Triggering validation checkpoints (Steps 1-12).',
      '[10:24:09] Guard: Audit package dependencies. verifyPackage: Success.',
      '[10:24:10] Guard: Generation checklist verified.'
    ]
  },
  {
    id: 'detector',
    name: 'Detector Agent',
    icon: ShieldCheck,
    color: '#7c5cff',
    x: '15%',
    y: '67%',
    stats: { cpu: '8%', tokens: '890/s', integrity: '100%', speed: '14ms' },
    desc: 'Real-time sandbox micro-VM logs scanner. Employs classifyBuildError.ts and error-detector.ts to analyze E2B container streams, identifying TS compilation exceptions, missing node modules, or ENOMEM limits.',
    logs: [
      '[10:24:10] Detector: Connected to E2B VM console feed.',
      '[10:24:11] Detector: Scanning build outputs for regex error classifiers...',
      '[10:24:12] Detector: Parsing stderr... Pattern match: TypeScript compile error.',
      '[10:24:12] Detector: Forwarding telemetry to Sentry & Winston logs.'
    ]
  },
  {
    id: 'healing',
    name: 'Healing Agent',
    icon: CloudLightning,
    color: '#00d4ff',
    x: '15%',
    y: '33%',
    stats: { cpu: '45%', tokens: '3.2k/s', integrity: '99.9%', speed: '210ms' },
    desc: 'Event-driven automated error solver. Spawns sentry-self-healing.ts and Inngest async functions (functions/self-healing.ts) to execute strategy patterns (e.g. auto-heal-imports.ts) under 45s.',
    logs: [
      '[10:24:12] Healing: Launching Event Recovery workflow via Inngest...',
      '[10:24:13] Healing: Selected Fix: Auto-Heal-Imports Strategy.',
      '[10:24:14] Healing: Applied code adjustment: Injected missing react types.',
      '[10:24:15] Healing: Sandbox build retry passed. Deployment active.'
    ]
  }
];

export default function SectionEngine() {
  const [activeAgentId, setActiveAgentId] = useState('policy');
  const activeAgent = AGENTS.find(a => a.id === activeAgentId) || AGENTS[0];
  const ActiveIcon = activeAgent.icon;

  return (
    <section
      className="relative w-full min-h-screen bg-[#030303] overflow-hidden flex flex-col justify-center py-32 px-6 sm:px-12 md:px-24"
      id="devx-section-engine"
    >
      <div className="absolute inset-0 bg-radial-gradient-black pointer-events-none" />
      <div className="absolute inset-0 bg-grid-lines pointer-events-none opacity-[0.05]" />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.04)_0%,rgba(0,0,0,0)_70%)] pointer-events-none filter blur-3xl" />

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        
        {/* Left column: Core Engine details with active Agent Stats */}
        <div className="lg:col-span-5 text-left space-y-8 flex flex-col justify-center select-none">
          <div className="space-y-4">
            <div className="flex items-center gap-3 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md w-fit">
              <span className="w-2 h-2 rounded-full bg-[#00d4ff] animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#00d4ff]">Neural Architecture</span>
            </div>
            <h3 className="text-5xl sm:text-7xl font-bold font-headline tracking-tighter leading-none text-white">
              Multi-Agent Engine.
            </h3>
            <p className="text-lg font-light text-neutral-400 font-sans leading-relaxed">
              DevX leverages six highly specialized autonomous micro-agents that communicate, peer-audit, and verify security protocols concurrently. Click any node to explore.
            </p>
          </div>

          {/* Expanded System Stats Panel (Deep Developer Detail) */}
          <div className="grid grid-cols-4 gap-3">
            <div className="bg-neutral-950 border border-white/5 p-3 rounded-xl flex flex-col text-left font-mono">
              <span className="text-[7px] text-neutral-500 uppercase font-bold">CPU LOAD</span>
              <span className="text-sm font-semibold text-white mt-1">{activeAgent.stats.cpu}</span>
            </div>
            <div className="bg-neutral-950 border border-white/5 p-3 rounded-xl flex flex-col text-left font-mono">
              <span className="text-[7px] text-neutral-500 uppercase font-bold">TOKENS SEC</span>
              <span className="text-sm font-semibold text-[#7c5cff] mt-1">{activeAgent.stats.tokens}</span>
            </div>
            <div className="bg-neutral-950 border border-white/5 p-3 rounded-xl flex flex-col text-left font-mono">
              <span className="text-[7px] text-neutral-500 uppercase font-bold">INTEGRITY</span>
              <span className="text-sm font-semibold text-emerald-400 mt-1">{activeAgent.stats.integrity}</span>
            </div>
            <div className="bg-neutral-950 border border-white/5 p-3 rounded-xl flex flex-col text-left font-mono">
              <span className="text-[7px] text-neutral-500 uppercase font-bold">COMPILE SPEED</span>
              <span className="text-sm font-semibold text-[#00d4ff] mt-1">{activeAgent.stats.speed}</span>
            </div>
          </div>

          <div className="space-y-2">
            <span className="font-mono text-xs text-[#7c5cff] font-bold block uppercase tracking-wider">Agent Mission Matrix</span>
            <p className="text-xs text-neutral-400 font-sans leading-relaxed">{activeAgent.desc}</p>
          </div>

          {/* Interactive Agent Logs Console Panel */}
          <div className="border border-white/10 bg-black/60 rounded-2xl p-5 flex flex-col relative overflow-hidden h-[190px]">
            <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <ActiveIcon className="w-4 h-4 animate-pulse" style={{ color: activeAgent.color }} />
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">{activeAgent.name} Logs</span>
              </div>
              <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-widest animate-pulse">active telemetry</span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2.5 font-mono text-[9px] text-neutral-400 text-left pr-2">
              <AnimatePresence mode="popLayout">
                {activeAgent.logs.map((log, index) => (
                  <motion.div
                    key={`${activeAgent.id}-log-${index}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3, delay: index * 0.08 }}
                    className="flex items-start gap-2"
                  >
                    <span className="text-[#00d4ff]">&gt;</span>
                    <span className="select-text">{log}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right column: Interactive Neural OS SVG map */}
        <div className="lg:col-span-7 flex justify-center items-center relative aspect-square w-full max-w-[550px] mx-auto select-none">
          
          {/* SVG Animated pathways connecting center core to agents */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 500">
            <defs>
              <linearGradient id="purpleGradPath" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7c5cff" />
                <stop offset="100%" stopColor="#00d4ff" />
              </linearGradient>
              <filter id="glowEffect">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Neural channel connections */}
            {[
              { x: 250, y: 75 },
              { x: 425, y: 165 },
              { x: 425, y: 335 },
              { x: 250, y: 425 },
              { x: 75, y: 335 },
              { x: 75, y: 165 }
            ].map((p, i) => (
              <g key={i}>
                <line
                  x1="250"
                  y1="250"
                  x2={p.x}
                  y2={p.y}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeOpacity="0.08"
                />
                <motion.line
                  x1="250"
                  y1="250"
                  x2={p.x}
                  y2={p.y}
                  stroke="url(#purpleGradPath)"
                  strokeWidth="2"
                  filter="url(#glowEffect)"
                  strokeDasharray="20 100"
                  animate={{ strokeDashoffset: [240, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: 'linear', delay: i * 0.45 }}
                />
              </g>
            ))}
          </svg>

          {/* Central Orchestrator Core */}
          <div className="absolute w-24 h-24 rounded-full border border-white/20 bg-black/60 shadow-2xl flex items-center justify-center z-20">
            <div className="absolute inset-0.5 rounded-full bg-gradient-to-tr from-[#7c5cff]/30 to-[#00d4ff]/30 blur-[4px] animate-pulse" />
            <div className="w-18 h-18 rounded-full border border-white/10 flex items-center justify-center bg-[#070707] shadow-inner relative z-10">
              <DevXLogo size={52} interactive={false} glow={true} />
            </div>
            <div className="absolute -inset-2 rounded-full border border-[#7c5cff]/20 animate-ping opacity-25" style={{ animationDuration: '3s' }} />
            <div className="absolute -inset-4 rounded-full border border-[#00d4ff]/10 animate-ping opacity-15" style={{ animationDuration: '4s' }} />
          </div>

          {/* Agent Nodes arranged radially */}
          {AGENTS.map((agent) => {
            const AgentIcon = agent.icon;
            const isActive = activeAgentId === agent.id;
            
            return (
              <motion.div
                key={agent.id}
                style={{
                  position: 'absolute',
                  left: agent.x,
                  top: agent.y,
                  transform: 'translate(-50%, -50%)',
                }}
                onClick={() => setActiveAgentId(agent.id)}
                className="z-20 cursor-pointer flex flex-col items-center group"
                whileHover={{ scale: 1.05 }}
              >
                <div 
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-300 relative ${
                    isActive 
                      ? 'bg-white text-black border-white shadow-xl shadow-[#7c5cff]/10' 
                      : 'bg-neutral-950 border-white/10 text-neutral-400 group-hover:border-white/20 group-hover:text-white'
                  }`}
                  style={{
                    boxShadow: isActive ? `0 0 25px ${agent.color}25` : undefined
                  }}
                >
                  <AgentIcon className="w-5 h-5" />
                  
                  {isActive && (
                    <span 
                      className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full animate-ping opacity-75"
                      style={{ backgroundColor: agent.color }}
                    />
                  )}
                </div>
                
                <span className={`text-[9px] font-mono mt-2 tracking-widest uppercase transition-colors duration-300 ${
                  isActive ? 'text-white font-bold' : 'text-neutral-500 group-hover:text-neutral-400'
                }`}>
                  {agent.name.split(' ')[0]}
                </span>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
