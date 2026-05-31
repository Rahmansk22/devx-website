'use client';

import DevXLogo from '@/components/DevXLogo';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center p-6 select-none relative font-sans">
      
      {/* Glow Effects */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(0,212,255,0.06)_0%,rgba(0,0,0,0)_70%)] pointer-events-none filter blur-[100px] z-0" />

      <div className="relative z-10 space-y-8 max-w-md">
        
        {/* Animated Brand Logo */}
        <div className="flex justify-center">
          <DevXLogo size={120} glow={true} interactive={true} />
        </div>

        {/* Headlines */}
        <div className="space-y-3">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#00d4ff] font-bold">Locus Code Exception (404)</span>
          <h2 className="text-4xl font-headline font-bold text-white tracking-tighter leading-none">
            Endpoint Not Resolved.
          </h2>
          <p className="text-sm text-neutral-400 font-sans leading-relaxed pt-2">
            The target node could not be localized on our worldwide edge CDN distribution servers.
          </p>
        </div>

        {/* Controls */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 rounded-full bg-white text-black hover:bg-neutral-100 font-headline font-semibold text-xs uppercase tracking-wider border border-white transition-all duration-300 shadow-lg cursor-pointer"
          >
            Return to Core
          </button>
        </div>

      </div>
    </div>
  );
}
