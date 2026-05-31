'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Palette, Code2, Server, Database, Cloud, ChevronLeft, ChevronRight } from 'lucide-react';
import AICore from './AICore';

const STAGES = [
  {
    id: 'idea',
    num: '01',
    title: 'Intent Analysis',
    icon: Lightbulb,
    color: '#7c5cff',
    desc: 'The prompt is analyzed by analyzer-prompt.ts. It maps intent parameters, defines core feature lists, and prepares pre-generation guidelines to bootstrap the Next.js 15 workspace.',
    metric: 'Intent Audit Latency',
    stat: '< 40ms',
    content: (
      <div className="w-full h-full font-mono text-[9px] text-neutral-400 text-left space-y-2.5 relative select-text">
        <span className="text-[#7c5cff] uppercase tracking-widest text-[8px] font-bold block pb-1">analyzer-prompt.ts intent output</span>
        <div className="space-y-1 pt-0.5">
          <p><span className="text-[#7c5cff]">CLASSIFIED_INTENT:</span> Fullstack SaaS Tracker</p>
          <p><span className="text-[#00d4ff]">DATABASE_MODELS:</span> [Project, Deployment, BuildHistory]</p>
          <p><span className="text-neutral-500">ENGINE_PROMPT:</span> DEV X v3 Main Prompt</p>
          <p className="text-white mt-1.5"> └ status: intent analysis complete (0 issues)</p>
        </div>
      </div>
    )
  },
  {
    id: 'design',
    num: '02',
    title: 'Adaptive Design',
    icon: Palette,
    color: '#00d4ff',
    desc: 'Synthesizes UI configurations in Tailwind CSS 4.1.18 and Space Grotesk. Enforces strict shadcn/ui variables via policy.ts, integrating custom modules (ScrambledText, ScrollFloat).',
    metric: 'Tailwind v4 Token Fidelity',
    stat: '100% Vector',
    content: (
      <div className="w-full h-full font-mono text-[9px] text-neutral-400 text-left space-y-2 relative select-text">
        <span className="text-[#00d4ff] uppercase tracking-widest text-[8px] font-bold block pb-1">tailwind.config.ts / policy.ts</span>
        <div className="space-y-1.5 pt-0.5">
          <div className="flex justify-between"><span className="text-white">font-family</span><span className="text-neutral-500">&quot;Space Grotesk&quot;</span></div>
          <div className="flex justify-between"><span className="text-[#7c5cff]">--color-background</span><span className="text-[#7c5cff]">#000000 HSL</span></div>
          <div className="flex justify-between"><span className="text-[#00d4ff]">--color-primary</span><span className="text-[#00d4ff]">#7C5CFF</span></div>
          <div className="flex justify-between"><span className="text-white">ui-theme-tokens</span><span className="text-emerald-500">shadcn/ui config</span></div>
        </div>
      </div>
    )
  },
  {
    id: 'frontend',
    num: '03',
    title: 'Code Synthesis',
    icon: Code2,
    color: '#7c5cff',
    desc: 'Compiles clean, standard TypeScript 5.7 and Next.js 15.4.10. Translates React 19 hooks, re-maps relative imports to @/ alias, and injects use-client parameters.',
    metric: 'AST Compilation Checks',
    stat: '0 Code Warnings',
    content: (
      <div className="w-full h-full font-mono text-[8px] text-neutral-400 text-left space-y-1.5 relative select-text">
        <span className="text-[#7c5cff] uppercase tracking-widest text-[8px] font-bold block pb-1">src/lib/code-generator-validator.ts</span>
        <div className="space-y-0.5 max-h-[140px] overflow-y-auto pt-0.5">
          <p className="text-neutral-500">{"import { useState } from 'react';"}</p>
          <p className="text-white"><span className="text-purple-400">export default function</span> Dashboard() &#123;</p>
          <p className="pl-4">const [builds, setBuilds] = useState([]);</p>
          <p className="pl-4 text-[#00d4ff]">const triggerSelfHealing = async () =&gt; &#123;</p>
          <p className="pl-8 text-neutral-500">{"// tRPC type-safe API call"}</p>
          <p className="pl-8">await trpc.builds.triggerHeal.mutate(&#123; id &#125;);</p>
          <p className="pl-4">&#125;;</p>
          <p className="text-white">&#125;</p>
        </div>
      </div>
    )
  },
  {
    id: 'backend',
    num: '04',
    title: 'Sandbox Execution',
    icon: Server,
    color: '#00d4ff',
    desc: 'Launches builds inside isolated E2B VMs using our custom e2b.Dockerfile container. The E2B sandboxing VM runs builds dynamically, streaming preview routes.',
    metric: 'E2B VM Provision Latency',
    stat: '< 800ms',
    content: (
      <div className="w-full h-full font-mono text-[9px] text-neutral-400 text-left space-y-2 relative select-text">
        <span className="text-[#00d4ff] uppercase tracking-widest text-[8px] font-bold block pb-1">e2b-template/e2b.Dockerfile</span>
        <div className="space-y-1 pt-0.5">
          <p className="text-neutral-500">FROM e2b/builder-nextjs-15:latest</p>
          <p className="text-white">WORKDIR /sandbox</p>
          <p className="text-emerald-400">COPY package.json .env ./</p>
          <p className="text-[#7c5cff]">RUN npm ci --prefer-offline --no-audit</p>
          <p className="text-white">CMD [&quot;npm&quot;, &quot;run&quot;, &quot;dev&quot;]</p>
        </div>
      </div>
    )
  },
  {
    id: 'database',
    num: '05',
    title: 'Relational DB Map',
    icon: Database,
    color: '#7c5cff',
    desc: 'Structures Drizzle/Prisma models (Project, snapshot, Deployment, BuildHistory, Message) for PostgreSQL and automatically deploys relational database migrations.',
    metric: 'Prisma Schema Sync',
    stat: 'Sub-Millisecond',
    content: (
      <div className="w-full h-full font-mono text-[8px] text-neutral-400 text-left space-y-1 relative select-text">
        <span className="text-[#7c5cff] uppercase tracking-widest text-[8px] font-bold block pb-1">prisma/schema.prisma</span>
        <div className="space-y-0.5 pt-0.5">
          <p className="text-[#00d4ff]">model Project &#123;</p>
          <p className="pl-4">id          String        @id @default(uuid())</p>
          <p className="pl-4">deployments Deployment[]</p>
          <p className="pl-4">builds      BuildHistory[]</p>
          <p className="text-[#00d4ff]">&#125;</p>
          <p className="text-[#7c5cff]">model BuildHistory &#123;</p>
          <p className="pl-4">id          String        @id @default(uuid())</p>
          <p className="pl-4">status      String        @default(&quot;pending&quot;)</p>
          <p className="text-[#7c5cff]">&#125;</p>
        </div>
      </div>
    )
  },
  {
    id: 'deploy',
    num: '06',
    title: 'Autonomous Deploy',
    icon: Cloud,
    color: '#00d4ff',
    desc: 'Multi-provider deployer automatically pushes code to Vercel, Railway, Fly.io, or Netlify via direct API adapters. Complete with rollbacks and health audits.',
    metric: 'Deployment Edge Latency',
    stat: '0ms Rollback',
    content: (
      <div className="w-full h-full font-mono text-[9px] text-neutral-400 text-left space-y-1.5 relative select-text">
        <span className="text-[#00d4ff] uppercase tracking-widest text-[8px] font-bold block pb-1">src/deployment/auto-deployer.ts</span>
        <div className="space-y-1 pt-0.5">
          <div className="flex justify-between"><span>Vercel Deploy</span><span className="text-emerald-400 font-bold">Success</span></div>
          <div className="flex justify-between"><span>Railway Deploy</span><span className="text-emerald-400 font-bold">Success</span></div>
          <div className="flex justify-between"><span>Fly.io Edge</span><span className="text-emerald-400 font-bold">Synced</span></div>
          <div className="text-[7px] text-[#7c5cff] pt-1.5">⚡ ACTIVE: https://dashboard.devx.app</div>
        </div>
      </div>
    )
  }
];


export default function SectionHorizontal() {
  const [activeStep, setActiveStep] = useState(0);

  const activeStage = STAGES[activeStep];
  const StageIcon = activeStage.icon;

  const handlePrev = () => {
    setActiveStep((prev) => (prev === 0 ? STAGES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveStep((prev) => (prev === STAGES.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col justify-between py-24 select-none"
      id="devx-section-horizontal"
    >
      {/* Ambient backdrop grids */}
      <div className="absolute inset-0 bg-grid-lines pointer-events-none opacity-[0.06] z-0" />
      
      {/* Soft, sweeping organic gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.04)_0%,rgba(0,0,0,0)_70%)] pointer-events-none filter blur-3xl z-0" />

      {/* 1. Header Navigation and Indicator (Sleek and borderless) */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-24 flex justify-between items-center z-20">
        <div className="flex flex-col text-left">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500">Autonomous Timeline</span>
          <h3 className="text-xl font-bold font-headline text-white mt-1">Creation Cycle</h3>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
          <span className="text-[#00d4ff] font-bold">STAGE {activeStage.num}</span>
          <span className="w-6 h-px bg-neutral-850" />
          <span className="text-[#7c5cff] font-bold">CYCLE INTERACTIVE SYSTEM</span>
        </div>
      </div>

      {/* 2. Top Interactive Phase Bar (Clickable, premium navigation headers) */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-24 mt-8 mb-6 z-20">
        <div className="flex flex-wrap gap-2 md:max-w-4xl justify-start bg-white/[0.01] p-1 rounded-2xl">
          {STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStep(idx)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-[10px] font-mono tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                  idx === activeStep
                    ? 'bg-white text-black font-bold shadow-lg shadow-white/5'
                    : 'bg-transparent text-neutral-500 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{stage.title.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Core Immersive Spatial Panel (Awwwards-tier Grid) */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-24 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 my-6">
        
        {/* LEFT: Floating spatial narrative stage details (Pure typography, borderless) */}
        <div className="lg:col-span-4 text-left space-y-6 flex flex-col justify-center h-auto lg:h-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage.id}
              initial={{ opacity: 0, x: -30, filter: 'blur(8px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: 30, filter: 'blur(8px)' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-5"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-transparent">
                  <StageIcon className="w-6 h-6" style={{ color: activeStage.color }} />
                </div>
                <span className="font-mono text-xs font-bold uppercase tracking-[0.2em]" style={{ color: activeStage.color }}>
                  Phase {activeStage.num}
                </span>
              </div>
              
              <h4 className="text-3xl sm:text-5xl font-bold font-headline tracking-tighter leading-none text-white">
                {activeStage.title}
              </h4>
              
              <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
                {activeStage.desc}
              </p>

              {/* Symmetrical borderless stats */}
              <div className="pt-4 flex gap-8 font-mono text-[10px] text-neutral-500">
                <div>
                  <span className="uppercase tracking-wider">{activeStage.metric}</span>
                  <p className="text-sm font-semibold text-white mt-1">{activeStage.stat}</p>
                </div>
                <div className="w-4" /> {/* Spacing instead of line divider */}
                <div>
                  <span>STABILITY INDEX</span>
                  <p className="text-sm font-semibold text-emerald-400 mt-1">99.999%</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CENTER: Massive spatial glowing particle core (Pure Globe, borderless) */}
        <div className="lg:col-span-4 h-[300px] lg:h-[450px] flex items-center justify-center relative select-none">
          
          {/* Glowing Chevron Controls overlapping globe column dynamically */}
          <button
            onClick={handlePrev}
            className="absolute left-[-20px] lg:left-[-50px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 hover:text-white transition-all text-neutral-400 cursor-pointer z-30 drop-shadow-[0_0_15px_rgba(0,212,255,0.3)] border-0"
            aria-label="Previous Phase"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2]" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-[-20px] lg:right-[-50px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 hover:text-white transition-all text-neutral-400 cursor-pointer z-30 drop-shadow-[0_0_15px_rgba(124,92,255,0.3)] border-0"
            aria-label="Next Phase"
          >
            <ChevronRight className="w-6 h-6 stroke-[2]" />
          </button>

          {/* Holographic Glowing laser ray beams from text to globe */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block" viewBox="0 0 300 300">
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7c5cff" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            {/* Dynamic pointer line */}
            <motion.line
              x1="20"
              y1="150"
              x2="150"
              y2="150"
              stroke="url(#lineGrad)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              animate={{ strokeDashoffset: [-50, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
            />
            <motion.line
              x1="280"
              y1="150"
              x2="150"
              y2="150"
              stroke="url(#lineGrad)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              animate={{ strokeDashoffset: [0, -50] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
            />
          </svg>

          {/* Massive Ambient neon core glow */}
          <div className="absolute w-[320px] h-[320px] rounded-full bg-[#7c5cff]/10 filter blur-[80px] pointer-events-none z-0" />
          
          {/* 3D WebGL particle globe running in space without any border boxes */}
          <div className="w-[320px] h-[320px] lg:w-[400px] lg:h-[400px] relative z-10 flex items-center justify-center">
            <AICore intensity={1.4} scale={1.15} className="w-full h-full" />
          </div>

        </div>

        {/* RIGHT: Floating active active compile source code visualizer (Pure text/snippet, borderless) */}
        <div className="lg:col-span-4 h-auto lg:h-auto flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage.id}
              initial={{ opacity: 0, x: 30, filter: 'blur(8px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -30, filter: 'blur(8px)' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              className="w-full min-h-[160px] bg-transparent flex flex-col justify-center relative overflow-hidden"
            >
              {activeStage.content}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* 4. Footer sliding progress dot grid indicator (Fully clickable) */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-24 flex justify-between items-center z-20">
        <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">&copy; 2026 DevX OS</span>
        <div className="flex gap-2">
          {STAGES.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer border-0 ${
                idx === activeStep 
                  ? 'w-10 bg-[#7c5cff]' 
                  : idx < activeStep 
                    ? 'w-2.5 bg-[#7c5cff]/30' 
                    : 'w-2.5 bg-neutral-800 hover:bg-neutral-600'
              }`}
              aria-label={`Go to Phase ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
