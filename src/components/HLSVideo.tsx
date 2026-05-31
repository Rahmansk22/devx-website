'use client';

import { useEffect, useRef } from 'react';

// Custom type definitions to prevent ESLint 'any' or compiler errors
interface HlsInstance {
  loadSource: (src: string) => void;
  attachMedia: (video: HTMLVideoElement) => void;
  destroy: () => void;
}

interface HlsConstructor {
  isSupported: () => boolean;
  new (config?: {
    maxMaxBufferLength?: number;
    enableWorker?: boolean;
    lowLatencyMode?: boolean;
  }): HlsInstance;
}

declare global {
  interface Window {
    Hls?: HlsConstructor;
  }
}

interface HLSVideoProps {
  src: string;
  className?: string;
}

export default function HLSVideo({ src, className = '' }: HLSVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hlsInstance: HlsInstance | null = null;

    // Check for native HLS playback (like Safari)
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
    } else {
      // Load hls.js dynamically from jsDelivr CDN
      const scriptId = 'hls-js-cdn-script';
      let script = document.getElementById(scriptId) as HTMLScriptElement;

      const initHls = () => {
        const HlsLib = window.Hls;
        if (HlsLib && HlsLib.isSupported()) {
          hlsInstance = new HlsLib({
            maxMaxBufferLength: 10,
            enableWorker: true,
            lowLatencyMode: true
          });
          hlsInstance.loadSource(src);
          hlsInstance.attachMedia(video);
        }
      };

      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://cdn.jsdelivr.net/npm/hls.js@1.5.8/dist/hls.min.js';
        script.async = true;
        document.body.appendChild(script);
        script.onload = initHls;
      } else {
        // Script already loaded or loading, wait a moment and init
        if (window.Hls) {
          initHls();
        } else {
          script.addEventListener('load', initHls);
        }
      }

      return () => {
        if (hlsInstance) {
          hlsInstance.destroy();
        }
        if (script) {
          script.removeEventListener('load', initHls);
        }
      };
    }
  }, [src]);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      className={`w-full h-full object-cover select-none pointer-events-none ${className}`}
    />
  );
}
