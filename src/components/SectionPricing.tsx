'use client';

import React, { useState } from 'react';
import { Check, Sparkles } from 'lucide-react';

const TIERS = [
  {
    name: 'Architect',
    desc: 'Ideal for solo engineers prototyping complex structures.',
    priceMonthly: '$19',
    priceAnnually: '$13',
    features: [
      '10 Synthetic Projects',
      'Turbo Orchestration',
      'Basic E2B Sandbox Access',
      'Standard Token Limits',
      'Community Support',
    ],
    cta: 'Upgrade to Architect',
    popular: false,
    color: '#00d4ff',
  },
  {
    name: 'Developer Pro',
    desc: 'The gold standard for production-grade agentic development.',
    priceMonthly: '$49',
    priceAnnually: '$34',
    features: [
      'Unlimited Projects',
      'Pro Multi-Agent Orchestration',
      'Pre-warmed Sandbox Pools',
      'Claude 3.5 & GPT-4o Pro',
      '1-Click Global Deploy',
      '24/7 Synthesis Support',
    ],
    cta: 'Upgrade to Pro',
    popular: true,
    color: '#7c5cff',
  },
  {
    name: 'Engineering Suite',
    desc: 'Maximum bandwidth for fast-moving product teams.',
    priceMonthly: '$149',
    priceAnnually: '$99',
    features: [
      'Everything in Pro',
      'High-Priority Build Queue',
      'Custom Model Fine-tuning',
      'Dedicated Synthesis Nodes',
      'SOC2 Compliance Suite',
      'White-label Deployments',
      'Unlimited Sandbox Duration',
    ],
    cta: 'Upgrade to Suite',
    popular: false,
    color: '#f59e0b',
  }
];

export default function SectionPricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section 
      className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col justify-center py-32 px-6 sm:px-12 md:px-24"
      id="devx-section-pricing"
    >
      {/* Background spot glows */}
      <div className="absolute top-1/3 left-10 w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.05)_0%,rgba(0,0,0,0)_70%)] pointer-events-none filter blur-3xl" />
      <div className="absolute bottom-1/3 right-10 w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(0,212,255,0.04)_0%,rgba(0,0,0,0)_70%)] pointer-events-none filter blur-3xl" />
      
      {/* Grid lines overlay */}
      <div className="absolute inset-0 bg-grid-lines pointer-events-none opacity-[0.05]" />

      <div className="w-full max-w-7xl mx-auto flex flex-col gap-16 relative z-10">
        
        {/* Headings */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-8 text-left select-none">
          <div className="space-y-4">
            <div className="flex items-center gap-3 px-3 py-1 rounded-full bg-white/5 backdrop-blur-md w-fit border border-white/5">
              <span className="w-2 h-2 rounded-full bg-[#00d4ff]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#00d4ff]">Transparent Tiers</span>
            </div>
            <h3 className="text-5xl sm:text-7xl font-bold font-headline tracking-tighter leading-none text-white">
              Pricing for Scale.
            </h3>
            <p className="text-lg font-light text-neutral-400 font-sans max-w-xl leading-relaxed">
              Synthesize production apps with flexible plans designed to grow with your pipeline.
            </p>
          </div>

          {/* Monthly/Annual Billing Switcher (Glossy pill) */}
          <div className="flex items-center gap-2 bg-white/[0.02] border border-white/5 p-1 rounded-full w-fit">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${!isAnnual ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${isAnnual ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'}`}
            >
              Annually <span className="text-[10px] text-[#7c5cff] font-bold ml-1 font-sans">(-30%)</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {TIERS.map((tier, idx) => {
            const price = isAnnual ? tier.priceAnnually : tier.priceMonthly;
            return (
              <div 
                key={idx}
                className={`apple-liquid-glass p-8 rounded-3xl flex flex-col justify-between relative select-none transition-all duration-300 hover:border-white/20 shadow-2xl ${
                  tier.popular ? 'border-[#7c5cff]/30 shadow-[#7c5cff]/5' : ''
                }`}
              >
                {/* Popular Pill badge */}
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#7c5cff] border border-white/10 shadow-[0_0_15px_rgba(124,92,255,0.4)] flex items-center gap-1.5 text-[9px] font-mono font-bold tracking-widest text-white uppercase">
                    <Sparkles className="w-3 h-3 text-white" />
                    <span>MOST POPULAR</span>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Tier Title */}
                  <div className="space-y-2">
                    <h4 
                      className="text-xl font-headline font-bold"
                      style={{ color: tier.color }}
                    >
                      {tier.name}
                    </h4>
                    <p className="text-xs text-neutral-400 font-sans leading-relaxed">{tier.desc}</p>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 select-text">
                    <span className="text-4xl sm:text-5xl font-headline font-bold text-white tracking-tighter">
                      {price}
                    </span>
                    {price !== 'Custom' && price !== '$0' && (
                      <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
                        / month
                      </span>
                    )}
                  </div>

                  <div className="w-full h-px bg-white/5" />

                  {/* Features */}
                  <ul className="space-y-3.5">
                    {tier.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-xs text-neutral-300 font-sans leading-tight">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Action button */}
                <button 
                  className={`w-full py-4 mt-8 rounded-full font-headline font-bold text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                    tier.popular 
                      ? 'bg-[#7c5cff] text-white hover:bg-[#6c4be0] shadow-lg shadow-[#7c5cff]/10 hover:shadow-[#7c5cff]/20 border border-white/10' 
                      : 'bg-white/5 text-white hover:bg-white/10 border border-white/5'
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
