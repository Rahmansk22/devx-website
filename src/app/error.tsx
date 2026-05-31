'use client';

import { useEffect } from 'react';
import DevXLogo from '@/components/DevXLogo';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Next.js App Router boundary caught error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center p-6 select-none relative font-sans">
      
      {/* Glow Effects */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(255,59,48,0.06)_0%,rgba(0,0,0,0)_70%)] pointer-events-none filter blur-[100px] z-0" />

      <div className="relative z-10 space-y-8 max-w-md">
        
        {/* Animated Brand Logo */}
        <div className="flex justify-center">
          <DevXLogo size={120} glow={true} interactive={true} />
        </div>

        {/* Headlines */}
        <div className="space-y-3">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-red-500 font-bold">System Compiler Exception (500)</span>
          <h2 className="text-4xl font-headline font-bold text-white tracking-tighter leading-none">
            Build Execution Interrupted.
          </h2>
          <p className="text-sm text-neutral-400 font-sans leading-relaxed pt-2">
            The multi-agent orchestrator encountered a synchronization lock. We are compiling diagnostic ast data streams.
          </p>
        </div>

        {/* Controls */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-6 py-3 rounded-full bg-white text-black hover:bg-neutral-100 font-headline font-semibold text-xs uppercase tracking-wider border border-white transition-all duration-300 shadow-lg cursor-pointer"
          >
            Hot-Reload Cache
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-full bg-transparent text-white hover:bg-white/5 font-headline font-semibold text-xs uppercase tracking-wider border border-white/10 transition-all duration-300 cursor-pointer"
          >
            Restart Engine
          </button>
        </div>

      </div>
    </div>
  );
}
