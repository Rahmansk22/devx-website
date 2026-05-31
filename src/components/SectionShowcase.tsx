'use client';

import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { TrendingUp, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import HLSVideo from './HLSVideo';
import AICore from './AICore';

// Interactive Perspective Component with inner parallax layers
function InteractiveDevice({ children, layout }: { children: React.ReactNode; layout: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 240, mass: 0.6 };
  const rotateXSpring = useSpring(y, springConfig);
  const rotateYSpring = useSpring(x, springConfig);

  // Increased tilt tilt range (-14 to 14 degrees)
  const rotateX = useTransform(rotateXSpring, [-0.5, 0.5], [14, -14]);
  const rotateY = useTransform(rotateYSpring, [-0.5, 0.5], [-14, 14]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const normX = (event.clientX - rect.left) / rect.width - 0.5;
    const normY = (event.clientY - rect.top) / rect.height - 0.5;
    x.set(normX);
    y.set(normY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  let deviceStyle = "w-full h-[340px] md:h-[420px]";
  let innerFrameStyle = "border-0 rounded-[28px]";
  let isOverflowHidden = true;
  
  if (layout === 'globe') {
    deviceStyle = "w-full max-w-[500px] h-[380px] md:h-[440px] mx-auto";
    innerFrameStyle = "border-0 rounded-none bg-transparent";
    isOverflowHidden = false;
  } else if (layout === 'laptop') {
    deviceStyle = "w-full max-w-[650px] h-[360px] md:h-[400px]";
    innerFrameStyle = "border-0 rounded-[20px]";
  } else if (layout === 'phone') {
    deviceStyle = "w-[260px] h-[460px] md:h-[500px] mx-auto";
    innerFrameStyle = "border-0 rounded-[40px]";
  } else if (layout === 'tablet') {
    deviceStyle = "w-full max-w-[460px] h-[380px] md:h-[440px]";
    innerFrameStyle = "border-0 rounded-[32px]";
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative ${deviceStyle} cursor-pointer group`}
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className={`w-full h-full bg-transparent relative ${isOverflowHidden ? 'overflow-hidden' : 'overflow-visible'} ${innerFrameStyle}`}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function SectionShowcase() {
  const [activeId, setActiveId] = useState('saas');

  const handlePrev = () => {
    const currentIndex = PRODUCTS.findIndex(p => p.id === activeId);
    const prevIndex = currentIndex === 0 ? PRODUCTS.length - 1 : currentIndex - 1;
    setActiveId(PRODUCTS[prevIndex].id);
  };

  const handleNext = () => {
    const currentIndex = PRODUCTS.findIndex(p => p.id === activeId);
    const nextIndex = currentIndex === PRODUCTS.length - 1 ? 0 : currentIndex + 1;
    setActiveId(PRODUCTS[nextIndex].id);
  };
  
  // Showcase item visual states
  const [ecomCategory, setEcomCategory] = useState<'sneakers' | 'headset'>('sneakers');
  const [crmStatus, setCrmStatus] = useState<'leads' | 'closed'>('leads');

  const PRODUCTS = [
    {
      id: 'saas',
      name: 'SaaS Analytics Dashboard',
      category: 'Fintech & Cloud Platforms',
      color: '#7c5cff',
      layout: 'globe',
      desc: 'Full-stack Next.js 15.4.10 analytics dashboards equipped with tRPC type-safe APIs, PostgreSQL database structures managed via Prisma, and live Edge sync pipelines.',
      content: (
        <div className="w-full h-full relative overflow-visible bg-transparent flex items-center justify-center">
          {/* Ambient organic globe glow */}
          <div className="absolute w-[280px] h-[280px] rounded-full bg-[#7c5cff]/10 filter blur-[70px] pointer-events-none z-0" />
          
          {/* Live borderless interactive 3D WebGL particle globe */}
          <div className="w-[320px] h-[320px] md:w-[380px] md:h-[380px] relative z-10 flex items-center justify-center">
            <AICore intensity={1.5} scale={1.25} className="w-full h-full" />
          </div>

          {/* Floating Cyberpunk Holographic Telemetry (Completely cardless) */}
          <div className="absolute top-4 left-0 font-mono text-[9px] text-[#00d4ff] space-y-1 select-none pointer-events-none text-left z-20 drop-shadow-[0_0_10px_rgba(0,212,255,0.4)]">
            <span className="block font-bold tracking-widest text-[#00d4ff]">SYS.CORE // ACTIVE</span>
            <span className="block text-neutral-500">LATENCY: &lt; 8ms</span>
            <span className="block text-neutral-500">FIDELITY: 100% VECTOR</span>
          </div>

          <div className="absolute bottom-4 right-0 font-mono text-[9px] text-[#7c5cff] space-y-1 select-none pointer-events-none text-right z-20 drop-shadow-[0_0_10px_rgba(124,92,255,0.4)]">
            <span className="block font-bold tracking-widest text-[#7c5cff]">COMPILE STATE // SECURE</span>
            <span className="block text-neutral-500">PACKAGES: [Prisma, React]</span>
            <span className="block text-neutral-500">STATUS: CACHED</span>
          </div>
        </div>
      )
    },
    {
      id: 'mobile',
      name: 'Multimodal Messaging App',
      category: 'Consumer Social Platforms',
      color: '#00d4ff',
      layout: 'phone',
      desc: 'Next.js App Router and Clerk-authenticated social feature remappings, integrated with real-time websocket message tables and Inngest event execution pipelines.',
      content: (
        <div className="w-full h-full bg-transparent p-5 flex flex-col font-sans select-none text-left justify-between">
          <div className="flex items-center justify-between pb-2 mb-4">
            <span className="text-[9px] font-mono text-neutral-500">10:45 AM</span>
            <div className="flex items-center gap-1.5 text-[8px] font-mono text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>LTE CONNECTED</span>
            </div>
          </div>
          <div className="flex-1 space-y-3.5 flex flex-col justify-end">
            <div className="bg-neutral-900/60 rounded-2xl rounded-bl-none p-3 max-w-[85%] self-start text-[10px] text-neutral-300 leading-relaxed font-sans shadow-lg">
              Can DevX compile structured navigation templates and custom SQL relational databases automatically?
            </div>
            <div className="bg-[#7c5cff]/10 rounded-2xl rounded-br-none p-3 max-w-[85%] self-end text-[10px] text-neutral-200 leading-relaxed font-sans shadow-lg">
              Absolutely. Compiler loops draft full page flows, design palettes, API routers, and Prisma relationships in &lt; 40s.
            </div>
            <div className="bg-neutral-900/60 rounded-2xl rounded-bl-none p-3 max-w-[85%] self-start text-[10px] text-neutral-300 leading-relaxed font-sans shadow-lg">
              Wow, zero template template boundaries!
            </div>
          </div>
          <div className="mt-4 rounded-full h-9 flex items-center justify-between px-3 bg-white/5">
            <span className="text-[9px] text-neutral-600 font-mono">Send secure message...</span>
            <div className="w-6 h-6 rounded-full bg-[#7c5cff] flex items-center justify-center">
              <span className="text-[9px] text-white">🚀</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'ecommerce',
      name: 'High-Fidelity E-Commerce Store',
      category: 'Digital Retail Platforms',
      color: '#7c5cff',
      layout: 'tablet',
      desc: 'Tailwind CSS 4.1.18 storefronts built with Radix and shadcn/ui primitives, featuring automated Cart state calculators, Sentry tracking, and type-safe API checkout paths.',
      content: (
        <div className="w-full h-full bg-transparent p-5 flex flex-col font-sans select-none text-left justify-between">
          <div className="flex justify-between items-center pb-3 mb-4">
            <span className="text-[10px] font-headline font-bold text-white uppercase tracking-wider">DevX Storefront</span>
            <div className="flex gap-1.5 bg-white/5 rounded-lg p-0.5 z-20">
              <button 
                onClick={(e) => { e.stopPropagation(); setEcomCategory('sneakers'); }}
                className={`px-1.5 py-0.5 rounded text-[8px] font-mono cursor-pointer transition-colors ${ecomCategory === 'sneakers' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'}`}
              >
                Sneakers
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); setEcomCategory('headset'); }}
                className={`px-1.5 py-0.5 rounded text-[8px] font-mono cursor-pointer transition-colors ${ecomCategory === 'headset' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'}`}
              >
                Audio
              </button>
            </div>
          </div>
          <div className="flex-1 bg-neutral-950/40 rounded-xl overflow-hidden relative mt-1 min-h-[220px]">
            <HLSVideo src="https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>
      )
    },
    {
      id: 'crm',
      name: 'Bespoke CRM Sales Pipeline',
      category: 'Enterprise Management Platforms',
      color: '#00d4ff',
      layout: 'laptop',
      desc: 'Inngest event-driven async task handlers managing enterprise sales entities, complete with PostgreSQL database triggers, Clerk protection, and Winston observability logs.',
      content: (
        <div className="w-full h-full bg-transparent p-5 flex flex-col font-sans select-none text-left relative">
          <div className="flex justify-between items-center pb-3 mb-4">
            <span className="text-[10px] font-semibold text-white">DevX Enterprise CRM</span>
            <div className="flex gap-1 bg-white/5 rounded-lg p-0.5 z-20">
              <button 
                onClick={(e) => { e.stopPropagation(); setCrmStatus('leads'); }}
                className={`px-1.5 py-0.5 rounded text-[8px] font-mono cursor-pointer transition-colors ${crmStatus === 'leads' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'}`}
              >
                Active Leads
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); setCrmStatus('closed'); }}
                className={`px-1.5 py-0.5 rounded text-[8px] font-mono cursor-pointer transition-colors ${crmStatus === 'closed' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'}`}
              >
                Closed Won
              </button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 flex-1">
            {crmStatus === 'leads' ? (
              <>
                <div className="bg-neutral-950/40 rounded-xl p-2.5 flex flex-col space-y-2 h-full">
                  <span className="text-[7px] font-mono text-neutral-500 uppercase tracking-widest block pb-1 font-bold">Leads (2)</span>
                  <div className="bg-neutral-900/40 rounded-lg p-2">
                    <h6 className="text-[9px] font-semibold text-white">Acme Corp</h6>
                    <span className="text-[7px] font-mono text-neutral-500">$45,000</span>
                  </div>
                  <div className="bg-neutral-900/40 rounded-lg p-2">
                    <h6 className="text-[9px] font-semibold text-white">Stark Ind.</h6>
                    <span className="text-[7px] font-mono text-neutral-500">$120,000</span>
                  </div>
                </div>
                <div className="bg-neutral-950/40 rounded-xl p-2.5 flex flex-col space-y-2 h-full">
                  <span className="text-[7px] font-mono text-neutral-500 uppercase tracking-widest block pb-1 font-bold">Negotiate (1)</span>
                  <div className="bg-[#7c5cff]/5 rounded-lg p-2">
                    <h6 className="text-[9px] font-semibold text-[#7c5cff]">Wayne Ent.</h6>
                    <span className="text-[7px] font-mono text-neutral-400">$85,000</span>
                  </div>
                </div>
                <div className="bg-neutral-950/40 rounded-xl p-2.5 flex flex-col space-y-2 h-full opacity-40">
                  <span className="text-[7px] font-mono text-neutral-500 uppercase tracking-widest block pb-1 font-bold">Won (0)</span>
                  <div className="flex-1 flex items-center justify-center rounded-lg bg-white/[0.01]">
                    <span className="text-[6px] text-neutral-600">Empty</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="bg-neutral-950/40 rounded-xl p-2.5 flex flex-col space-y-2 h-full opacity-40">
                  <span className="text-[7px] font-mono text-neutral-500 uppercase tracking-widest block pb-1">Leads (0)</span>
                  <div className="flex-1 flex items-center justify-center rounded-lg bg-white/[0.01]">
                    <span className="text-[6px] text-neutral-600">Empty</span>
                  </div>
                </div>
                <div className="bg-neutral-950/40 rounded-xl p-2.5 flex flex-col space-y-2 h-full opacity-40">
                  <span className="text-[7px] font-mono text-neutral-500 uppercase tracking-widest block pb-1">Negotiate (0)</span>
                  <div className="flex-1 flex-row items-center justify-center rounded-lg bg-white/[0.01]">
                    <span className="text-[6px] text-neutral-600">Empty</span>
                  </div>
                </div>
                <div className="bg-neutral-950/40 rounded-xl p-2.5 flex flex-col space-y-2 h-full">
                  <span className="text-[7px] font-mono text-[#00d4ff] uppercase tracking-widest block pb-1 font-bold">Won (3)</span>
                  <div className="bg-emerald-500/5 rounded-lg p-2">
                    <h6 className="text-[9px] font-semibold text-emerald-400">Cyberdyne</h6>
                    <span className="text-[7px] font-mono text-neutral-400">$60,000</span>
                  </div>
                  <div className="bg-emerald-500/5 rounded-lg p-2">
                    <h6 className="text-[9px] font-semibold text-emerald-400">Tyrell Corp</h6>
                    <span className="text-[7px] font-mono text-neutral-400">$95,000</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )
    },
    {
      id: 'portfolio',
      name: 'Developer Space Portfolio',
      category: 'Design & Developer Portfolios',
      color: '#7c5cff',
      layout: 'phone',
      desc: 'Highly optimized frontends designed in React 19 and Space Grotesk typography, featuring interactive ScrambledText, ScrollFloat, and LottiePlayer micro-interaction widgets.',
      content: (
        <div className="w-full h-full bg-black p-5 flex flex-col justify-between font-sans select-none text-left">
          <div className="flex justify-between items-center text-[8px] font-mono text-neutral-500">
            <span>&copy; PORTFOLIO.X</span>
            <span>TOKYO, JAPAN</span>
          </div>
          <div className="space-y-4">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center font-headline font-bold text-xs text-[#7c5cff]">X</div>
            <h4 className="text-lg font-headline font-bold text-white tracking-tighter leading-none">
              Engineering absolute digital experiences at scale.
            </h4>
            <p className="text-[9px] text-neutral-400 font-sans leading-relaxed">
              Leading developer crafting high-performance 3D, WebGL shaders, and multi-agent software compilers globally.
            </p>
          </div>
          <div className="bg-neutral-900/40 rounded-xl p-3 flex justify-between items-center">
            <div className="text-left font-mono">
              <span className="text-[6px] text-neutral-500 uppercase block">Featured Project</span>
              <p className="text-[9px] font-semibold text-white mt-0.5">Sora Render Engine</p>
            </div>
            <span className="text-xs text-[#7c5cff] font-bold">→</span>
          </div>
        </div>
      )
    }
  ];

  const activeProduct = PRODUCTS.find(p => p.id === activeId) || PRODUCTS[0];

  return (
    <section
      className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col justify-center py-32 px-6 sm:px-12 md:px-24"
      id="devx-section-showcase"
    >
      <div className="absolute top-1/3 left-10 w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.06)_0%,rgba(0,0,0,0)_70%)] pointer-events-none filter blur-3xl" />
      <div className="absolute bottom-1/3 right-10 w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(0,212,255,0.06)_0%,rgba(0,0,0,0)_70%)] pointer-events-none filter blur-3xl" />

      {/* Grid line overlay */}
      <div className="absolute inset-0 bg-grid-lines pointer-events-none opacity-[0.06]" />

      <div className="w-full max-w-7xl mx-auto flex flex-col gap-20 relative z-10">
        
        {/* Section Heading info */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-8 text-left select-none">
          <div className="space-y-4">
            <div className="flex items-center gap-3 px-3 py-1 rounded-full bg-white/5 backdrop-blur-md w-fit">
              <span className="w-2 h-2 rounded-full bg-[#7c5cff]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#7c5cff]">Synthesized Showcase</span>
            </div>
            <h3 className="text-5xl sm:text-7xl font-bold font-headline tracking-tighter leading-none text-white">
              Generated Products.
            </h3>
            <p className="text-lg font-light text-neutral-400 max-w-xl font-sans leading-relaxed">
              DevX compiles production applications equipped with active schemas, secure routing policies, and accessible layouts. Click tabs to toggle inner screen elements.
            </p>
          </div>

          {/* Tab Selection */}
          <div className="flex flex-wrap gap-2 md:max-w-md bg-white/[0.01] p-1.5 rounded-2xl">
            {PRODUCTS.map(p => (
              <button
                key={p.id}
                onClick={() => setActiveId(p.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-mono transition-all duration-300 cursor-pointer ${
                  activeId === p.id 
                    ? 'bg-white text-black font-bold shadow-lg shadow-white/5' 
                    : 'bg-transparent text-neutral-400 hover:text-white'
                }`}
              >
                <span>{p.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Display Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left panel: Product Description Details */}
          <div className="lg:col-span-5 text-left space-y-8 flex flex-col justify-center select-none">
            <div className="space-y-4">
              <span 
                className="font-mono text-xs uppercase tracking-[0.25em] font-bold block"
                style={{ color: activeProduct.color }}
              >
                {activeProduct.category}
              </span>
              <h4 className="text-4xl md:text-5xl font-bold font-headline tracking-tighter leading-none text-white">
                {activeProduct.name}
              </h4>
              <p className="text-sm sm:text-base text-neutral-400 leading-relaxed font-sans pt-2">
                {activeProduct.desc} We compile pure React components, optimizing layouts for performance and accessibility completely autonomously.
              </p>
            </div>

            {/* Micro details audit checklist */}
            <div className="pt-6 space-y-4 font-mono text-xs text-neutral-500">
              <div className="flex justify-between items-center">
                <span>Compilation Speed</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" /> &lt; 40 seconds
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>AST Parser Safety</span>
                <span className="text-white font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> 100% Security Audited
                </span>
              </div>
              <div className="flex justify-between">
                <span>Database Relations</span>
                <span className="text-white font-semibold">Postgres Drizzle Migration Synced</span>
              </div>
            </div>
          </div>

          {/* Right panel: Floating 3D tilt device with slider controls */}
          <div className="lg:col-span-7 flex items-center justify-center p-2 relative">
            
            {/* Sliding Chevron Left */}
            <button
              onClick={handlePrev}
              className="absolute left-[-15px] sm:left-[-35px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 hover:text-white transition-all text-neutral-400 cursor-pointer z-30 drop-shadow-[0_0_15px_rgba(0,212,255,0.3)] border-0"
              aria-label="Previous Product"
            >
              <ChevronLeft className="w-6 h-6 stroke-[2]" />
            </button>

            <InteractiveDevice layout={activeProduct.layout}>
              {activeProduct.content}
            </InteractiveDevice>

            {/* Sliding Chevron Right */}
            <button
              onClick={handleNext}
              className="absolute right-[-15px] sm:right-[-35px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 hover:text-white transition-all text-neutral-400 cursor-pointer z-30 drop-shadow-[0_0_15px_rgba(124,92,255,0.3)] border-0"
              aria-label="Next Product"
            >
              <ChevronRight className="w-6 h-6 stroke-[2]" />
            </button>
            
          </div>

        </div>

      </div>
    </section>
  );
}
