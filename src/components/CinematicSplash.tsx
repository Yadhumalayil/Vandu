import React, { useState, useEffect } from 'react';
import { GoldParticlesCanvas } from './GoldParticlesCanvas.tsx';
import { FlyingBeeAnimation } from './FlyingBeeAnimation.tsx';

interface CinematicSplashProps {
  onComplete: () => void;
}

export const CinematicSplash: React.FC<CinematicSplashProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'flying' | 'landed' | 'revealing_text' | 'exiting'>('flying');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Phase 1: Bee flies in and lands around 2.1s
    const tLanded = setTimeout(() => {
      setPhase('landed');
    }, 2100);

    // Phase 2: Text sweeps in right after landing
    const tText = setTimeout(() => {
      setPhase('revealing_text');
    }, 2300);

    // Phase 3: Transition out
    const tExit = setTimeout(() => {
      setPhase('exiting');
    }, 3100);

    // Phase 4: Complete
    const tDone = setTimeout(() => {
      onComplete();
    }, 3600);

    // Progress bar ticker
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2.8;
      });
    }, 80);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onComplete();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(tLanded);
      clearTimeout(tText);
      clearTimeout(tExit);
      clearTimeout(tDone);
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] overflow-hidden transition-all duration-700 ease-in-out ${
        phase === 'exiting' ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Gold Dust Embers */}
      <GoldParticlesCanvas density="high" interactive={false} />

      {/* Cinematic Golden Radial Lighting Flare */}
      <div
        className="absolute inset-0 pointer-events-none opacity-80"
        style={{
          background:
            'radial-gradient(circle at 50% 48%, rgba(255, 215, 0, 0.16) 0%, rgba(255, 153, 0, 0.06) 40%, rgba(5, 5, 5, 0.98) 75%)',
        }}
      />

      {/* Skip Button */}
      <button
        onClick={onComplete}
        className="absolute top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider uppercase text-neutral-300 hover:text-[#FFD700] bg-black/60 hover:bg-black/90 border border-neutral-800 hover:border-[#FFD700]/40 rounded-full backdrop-blur-md transition-all duration-200 cursor-pointer shadow-lg"
      >
        <span>Skip Intro</span>
        <span className="text-[10px] text-neutral-500 font-mono">ESC</span>
      </button>

      {/* Center 3D Stage: The Fly Flies In and Lands into Logo */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-xl">
        {/* Flying Bee Animation */}
        <div className="w-72 h-72 sm:w-88 sm:h-88 flex items-center justify-center relative">
          <FlyingBeeAnimation
            autoStart={true}
            isHeroMode={false}
            className="w-full h-full"
          />
        </div>

        {/* Brand Typography Lockup reveals upon landing */}
        <div className="mt-2 flex flex-col items-center">
          <h1
            className={`font-cinzel text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-wider transition-all duration-700 ease-out ${
              phase === 'revealing_text' || phase === 'exiting'
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-4 scale-95'
            }`}
          >
            <span
              className="gold-gradient-text-bright inline-block"
              style={{
                textShadow:
                  '0 2px 10px rgba(0,0,0,0.9), 0 0 25px rgba(255, 215, 0, 0.5), 0 0 50px rgba(255, 153, 0, 0.35)',
              }}
            >
              VANDU
            </span>
          </h1>

          <p
            className={`font-outfit text-sm sm:text-base md:text-lg font-semibold uppercase tracking-[0.45em] text-white/95 mt-2 transition-all duration-700 ease-out ${
              phase === 'revealing_text' || phase === 'exiting'
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-3'
            }`}
            style={{
              textShadow: '0 2px 12px rgba(0,0,0,0.8), 0 0 15px rgba(255,255,255,0.25)',
            }}
          >
            DIGITAL ADS
          </p>

          <p
            className={`text-xs text-neutral-400 font-sans tracking-widest uppercase mt-3 transition-opacity duration-700 ${
              phase === 'revealing_text' || phase === 'exiting' ? 'opacity-80' : 'opacity-0'
            }`}
          >
            Premium 3D Digital Advertising &bull; Performance &bull; Creative
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 sm:w-64 flex flex-col items-center gap-2 z-20">
        <div className="w-full h-1 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800">
          <div
            className="h-full bg-gradient-to-r from-[#FF9900] via-[#FFD700] to-amber-200 transition-all duration-100 ease-out rounded-full shadow-[0_0_8px_#FFD700]"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <span className="text-[11px] font-mono tracking-widest text-neutral-500 uppercase">
          {phase === 'flying' ? 'Bee Approaching...' : 'VANDU Ready'}
        </span>
      </div>
    </div>
  );
};
