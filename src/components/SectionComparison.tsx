'use client';

import React from 'react';
import { Check, X, ShieldAlert, Sparkles, Database, Code } from 'lucide-react';

const COMPARISON_FEATURES = [
  {
    name: 'Output Standard',
    desc: 'What the compiler actually produces.',
    devx: 'Zero-Abstraction Next.js 15, React 19 & Tailwind v4 source code.',
    others: 'Proprietary locked-in code templates and mock outputs.',
    icon: Code,
  },
  {
    name: 'Database Integration',
    desc: 'Handling of storage and relationships.',
    devx: 'Active PostgreSQL schemas with Drizzle / Prisma migrations.',
    others: 'Static local storage mocks or unlinked JSON mock files.',
    icon: Database,
  },
  {
    name: 'Error Resolution',
    desc: 'Handling of syntax and compilation failures.',
    devx: 'Event-driven Self-Healing Auto-Fix loops in under 45 seconds.',
    others: 'Manual console debugging with prompt retry loops.',
    icon: ShieldAlert,
  },
  {
    name: 'Agent Architecture',
    desc: 'How the neural system orchestrates changes.',
    devx: '6 specialized micro-agents working concurrently in sandboxes.',
    others: 'A single, generalized LLM wrapper attempting full-stack generation.',
    icon: Sparkles,
  }
];

export default function SectionComparison() {
  return (
    <section 
      className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col justify-center py-32 px-6 sm:px-12 md:px-24"
      id="devx-section-comparison"
    >
      {/* Background spot glows */}
      <div className="absolute top-1/4 right-10 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.05)_0%,rgba(0,0,0,0)_70%)] pointer-events-none filter blur-3xl" />
      <div className="absolute bottom-1/4 left-10 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(0,212,255,0.04)_0%,rgba(0,0,0,0)_70%)] pointer-events-none filter blur-3xl" />
      
      {/* Grid lines overlay */}
      <div className="absolute inset-0 bg-grid-lines pointer-events-none opacity-[0.05]" />

      <div className="w-full max-w-7xl mx-auto flex flex-col gap-20 relative z-10">
        
        {/* Headings */}
        <div className="space-y-4 text-left max-w-2xl select-none">
          <div className="flex items-center gap-3 px-3 py-1 rounded-full bg-white/5 backdrop-blur-md w-fit border border-white/5">
            <span className="w-2 h-2 rounded-full bg-[#7c5cff]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#7c5cff]">Market Positioning</span>
          </div>
          <h3 className="text-5xl sm:text-7xl font-bold font-headline tracking-tighter leading-none text-white">
            Built Different.
          </h3>
          <p className="text-lg font-light text-neutral-400 font-sans leading-relaxed">
            Other platforms generate prototypes. DevX compiles production systems. Here is how we compare to generalized AI code assistants.
          </p>
        </div>

        {/* Comparison Grid (Responsive Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {COMPARISON_FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div 
                key={idx}
                className="apple-liquid-glass p-8 rounded-3xl flex flex-col justify-between space-y-8 select-none transition-all duration-300 hover:border-[#7c5cff]/30 shadow-2xl"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 text-[#00d4ff]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-headline font-bold text-white leading-none">{feature.name}</h4>
                      <p className="text-xs text-neutral-500 font-sans mt-1">{feature.desc}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                  {/* DevX Pillar */}
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono tracking-widest text-[#7c5cff] font-bold uppercase flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" /> DEV X
                    </span>
                    <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                      {feature.devx}
                    </p>
                  </div>

                  {/* Standard Assistants Pillar */}
                  <div className="space-y-2 opacity-50">
                    <span className="text-[9px] font-mono tracking-widest text-neutral-500 font-bold uppercase flex items-center gap-1.5">
                      <X className="w-3.5 h-3.5 text-red-500 stroke-[3]" /> OTHER ASSISTANTS
                    </span>
                    <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                      {feature.others}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
