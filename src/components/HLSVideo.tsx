'use client';

import { useEffect, useRef } from 'react';

// Custom type definitions to prevent ESLint 'any' or compiler errors
// Custom type definitions to prevent ESLint 'any' or compiler errors
interface HlsInstance {
  loadSource: (src: string) => void;
  attachMedia: (video: HTMLVideoElement) => void;
  destroy: () => void;
  on: (event: string, callback: (event: string, data: unknown) => void) => void;
  levels: Array<unknown>;
  startLevel: number;
  currentLevel: number;
  loadLevel: number;
  startLoad: () => void;
}

interface HlsConstructor {
  isSupported: () => boolean;
  new (config?: {
    maxMaxBufferLength?: number;
    enableWorker?: boolean;
    lowLatencyMode?: boolean;
    capLevelToPlayerSize?: boolean;
    maxBufferSize?: number;
    testBandwidth?: number;
    abrBandWidthFactor?: number;
    abrBandWidthUpFactor?: number;
    autoStartLoad?: boolean;
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

    // Instantly skip the first 3.0 seconds (video editor blurry zoom/fade intro) on load and on loops
    const handleTimeUpdate = () => {
      if (video.currentTime < 3.0) {
        video.currentTime = 3.0;
      }
    };
    video.addEventListener('timeupdate', handleTimeUpdate);

    let hlsInstance: HlsInstance | null = null;

    // Load hls.js dynamically from jsDelivr CDN
    const scriptId = 'hls-js-cdn-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    const initHls = () => {
      const HlsLib = window.Hls;
      // Prioritize Hls.js quality locking if supported (MSE enabled, works in Chrome, Safari, Firefox, Edge)
      if (HlsLib && HlsLib.isSupported()) {
        hlsInstance = new HlsLib({
          maxMaxBufferLength: 60, // Double pre-load buffer range to 60 seconds for ultra-smooth 4K playback
          enableWorker: true,
          lowLatencyMode: false, // Maintain ultimate playback quality and frame integrity
          capLevelToPlayerSize: false, // Completely disable capping resolution to container dimensions
          maxBufferSize: 150 * 1024 * 1024, // 150MB buffer size limit to prevent any network bottlenecks at high bitrates
          testBandwidth: 200000000, // Hardcode initial bandwidth estimate to 200 Mbps to force 4K load instantly
          abrBandWidthFactor: 1.0, // Eliminate conservative safety margins in ABR network calculations
          abrBandWidthUpFactor: 1.0, // Force aggressive instant quality upgrading
          autoStartLoad: false, // Prevent Hls.js from fetching segment 0 (blurry) before quality locking is active
        });

        // Force the stream loader to start at the highest available level parsed from the manifest (4K/1080p UHD)
        hlsInstance.on('hlsManifestParsed', () => {
          if (hlsInstance && hlsInstance.levels && hlsInstance.levels.length > 0) {
            const highestLevel = hlsInstance.levels.length - 1;
            hlsInstance.startLevel = highestLevel;
            hlsInstance.currentLevel = highestLevel;
            hlsInstance.loadLevel = highestLevel;
            hlsInstance.startLoad(); // Trigger loading segments ONLY after the highest 4K quality level is strictly locked!
          }
        });

        // Intercept any level switching and force it to stay locked to the highest resolution
        hlsInstance.on('hlsLevelSwitching', (event: string, data: unknown) => {
          if (hlsInstance && hlsInstance.levels && hlsInstance.levels.length > 0) {
            const highestLevel = hlsInstance.levels.length - 1;
            const levelData = data as { level: number } | null | undefined;
            if (levelData && levelData.level !== highestLevel) {
              hlsInstance.currentLevel = highestLevel;
              hlsInstance.loadLevel = highestLevel;
            }
          }
        });

        hlsInstance.loadSource(src);
        hlsInstance.attachMedia(video);
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Fallback to native HLS only if MSE is completely unsupported (e.g. older iOS Safari)
        video.src = src;
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
      video.removeEventListener('timeupdate', handleTimeUpdate);
      if (hlsInstance) {
        hlsInstance.destroy();
      }
      if (script) {
        script.removeEventListener('load', initHls);
      }
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      className={`w-full h-full object-cover select-none pointer-events-none ${className}`}
    />
  );
}
