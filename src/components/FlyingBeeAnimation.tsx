import React, { useState, useEffect, useRef } from 'react';

interface FlyingBeeAnimationProps {
  onComplete?: () => void;
  autoStart?: boolean;
  className?: string;
  isHeroMode?: boolean; // If true, runs within hero stage; if false, runs full screen in splash
}

interface TrailParticle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
  glow: number;
}

export const FlyingBeeAnimation: React.FC<FlyingBeeAnimationProps> = ({
  onComplete,
  autoStart = true,
  className = '',
  isHeroMode = false,
}) => {
  const [beeTransform, setBeeTransform] = useState({
    x: 0,
    y: 0,
    scale: 0.2,
    rotate: -35,
    rotateY: 45,
    opacity: 0,
  });

  const [hasLanded, setHasLanded] = useState(false);
  const [shockwave, setShockwave] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<TrailParticle[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const beePosRef = useRef({ x: 0, y: 0, active: false });

  // Canvas particle trail rendering loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const colors = ['#FFD700', '#FFE57F', '#FF9900', '#FFFFFF', '#FFB800'];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Emit new particles from current bee position if in flight
      if (beePosRef.current.active) {
        for (let i = 0; i < 3; i++) {
          particlesRef.current.push({
            x: beePosRef.current.x + (Math.random() - 0.5) * 20,
            y: beePosRef.current.y + (Math.random() - 0.5) * 20,
            size: Math.random() * 3 + 1.5,
            opacity: 0.9,
            color: colors[Math.floor(Math.random() * colors.length)],
            glow: Math.random() * 10 + 6,
          });
        }
      }

      // Update & draw particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.opacity -= 0.025;
        p.size *= 0.97;
        p.y += 0.3; // Slight gravity

        if (p.opacity <= 0.05 || p.size <= 0.5) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.shadowBlur = p.glow;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Flight sequence orchestration
  useEffect(() => {
    if (!autoStart) return;

    const startFlight = () => {
      setHasLanded(false);
      setShockwave(false);

      const winW = window.innerWidth;
      const winH = window.innerHeight;

      // Waypoint 0: Offscreen top right
      const startX = isHeroMode ? 260 : winW * 0.45;
      const startY = isHeroMode ? -220 : -winH * 0.35;
      beePosRef.current = { x: winW / 2 + startX, y: winH / 2 + startY, active: true };

      setBeeTransform({
        x: startX,
        y: startY,
        scale: 0.25,
        rotate: -35,
        rotateY: 40,
        opacity: 0.9,
      });

      // Waypoint 1 (at 400ms): Swoop down across to the left
      const t1 = setTimeout(() => {
        const midX = isHeroMode ? -180 : -winW * 0.3;
        const midY = isHeroMode ? 90 : winH * 0.15;
        beePosRef.current = { x: winW / 2 + midX, y: winH / 2 + midY, active: true };

        setBeeTransform({
          x: midX,
          y: midY,
          scale: 0.65,
          rotate: 20,
          rotateY: -25,
          opacity: 1,
        });
      }, 450);

      // Waypoint 2 (at 1000ms): Arc upward and bank toward center
      const t2 = setTimeout(() => {
        const arcX = isHeroMode ? 100 : winW * 0.15;
        const arcY = isHeroMode ? -70 : -winH * 0.1;
        beePosRef.current = { x: winW / 2 + arcX, y: winH / 2 + arcY, active: true };

        setBeeTransform({
          x: arcX,
          y: arcY,
          scale: 0.85,
          rotate: -15,
          rotateY: 15,
          opacity: 1,
        });
      }, 1050);

      // Waypoint 3 (at 1650ms): Hover just above target center
      const t3 = setTimeout(() => {
        beePosRef.current = { x: winW / 2, y: winH / 2 - 20, active: true };

        setBeeTransform({
          x: 0,
          y: -15,
          scale: 1.05,
          rotate: 0,
          rotateY: 0,
          opacity: 1,
        });
      }, 1650);

      // Waypoint 4 (at 2100ms): Touchdown & Lock into logo!
      const t4 = setTimeout(() => {
        beePosRef.current = { x: winW / 2, y: winH / 2, active: false };

        setBeeTransform({
          x: 0,
          y: 0,
          scale: 1.0,
          rotate: 0,
          rotateY: 0,
          opacity: 1,
        });
        setHasLanded(true);
        setShockwave(true);

        // Spawn burst particles around logo on landing
        const canvas = canvasRef.current;
        if (canvas) {
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          for (let i = 0; i < 40; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.random() * 80 + 20;
            particlesRef.current.push({
              x: centerX + Math.cos(angle) * dist,
              y: centerY + Math.sin(angle) * dist,
              size: Math.random() * 4 + 2,
              opacity: 1,
              color: i % 2 === 0 ? '#FFD700' : '#FFFFFF',
              glow: 14,
            });
          }
        }
      }, 2100);

      // Finish callback
      const t5 = setTimeout(() => {
        if (onComplete) onComplete();
      }, 2800);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
        clearTimeout(t5);
      };
    };

    const cleanup = startFlight();
    return () => cleanup && cleanup();
  }, [autoStart, isHeroMode, onComplete]);

  return (
    <div className={`relative flex items-center justify-center overflow-hidden ${className}`}>
      {/* Particle trail canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-10 w-full h-full"
      />

      {/* Landing Golden Shockwave Ring */}
      {shockwave && (
        <div
          className="pointer-events-none absolute w-48 h-48 sm:w-64 sm:h-64 rounded-full border-2 border-[#FFD700] z-20 animate-ping opacity-75"
          style={{ animationDuration: '0.8s', animationIterationCount: '1' }}
        />
      )}

      {/* Target Logo Anchor Base (Subtle ghost glow marking the landing slot) */}
      <div className="relative z-10 flex items-center justify-center">
        {!hasLanded && (
          <div className="absolute inset-0 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/25 blur-sm animate-pulse" />
        )}

        {/* The Golden Bee Character that flies in and lands */}
        <div
          className="relative transition-all duration-500 ease-out preserve-3d"
          style={{
            transform: `translate3d(${beeTransform.x}px, ${beeTransform.y}px, 0px) rotate(${beeTransform.rotate}deg) rotateY(${beeTransform.rotateY}deg) scale(${beeTransform.scale})`,
            opacity: beeTransform.opacity,
            transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)',
          }}
        >
          {/* Rapid Wing Flutter Vibration during flight */}
          <div className={!hasLanded ? 'animate-pulse' : ''}>
            <img
              src="/vandu-bee-logo.png"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  '/assets/aistudio/Picsart_26-11-05_03-45-34-935_89934389.png';
              }}
              alt="VANDU Golden Bee"
              className={`object-contain filter drop-shadow-[0_12px_30px_rgba(255,215,0,0.5)] ${
                isHeroMode ? 'w-48 h-48 sm:w-64 sm:h-64' : 'w-56 h-56 sm:w-72 sm:h-72'
              }`}
              draggable={false}
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Golden Specular Flash when landed */}
          {hasLanded && (
            <div
              className="absolute inset-0 rounded-full mix-blend-color-dodge pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,215,0,0.4) 40%, transparent 70%)',
                animation: 'goldShimmer 1.5s ease-out forwards',
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
