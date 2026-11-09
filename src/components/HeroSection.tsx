import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'motion/react';
import { Logo3D } from './Logo3D.tsx';
import { useLanguage } from '../context/LanguageContext.tsx';
import { TRANSLATIONS } from '../i18n/translations.ts';
import { ArrowRight, MessageCircle, Play, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
  onOpenProposal: () => void;
}

interface SparkleParticle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
  isStar: boolean;
  vx: number;
  vy: number;
  rotation: number;
  rotSpeed: number;
}

// 4-Pointed Golden Star Sparkle Renderer
function drawSparkleStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  outerRadius: number,
  innerRadius: number,
  color: string,
  alpha: number,
  rotation: number
) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rotation);
  ctx.beginPath();
  const spikes = 4;
  let rot = (Math.PI / 2) * 3;
  const step = Math.PI / spikes;

  ctx.moveTo(0, -outerRadius);
  for (let i = 0; i < spikes; i++) {
    const x1 = Math.cos(rot) * outerRadius;
    const y1 = Math.sin(rot) * outerRadius;
    ctx.lineTo(x1, y1);
    rot += step;

    const x2 = Math.cos(rot) * innerRadius;
    const y2 = Math.sin(rot) * innerRadius;
    ctx.lineTo(x2, y2);
    rot += step;
  }
  ctx.lineTo(0, -outerRadius);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.globalAlpha = alpha;
  ctx.shadowColor = color;
  ctx.shadowBlur = 10;
  ctx.fill();
  ctx.restore();
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onOpenProposal }) => {
  const { language, isML } = useLanguage();
  const t = TRANSLATIONS[language].hero;

  const [isFlying, setIsFlying] = useState(false);
  const [hasLanded, setHasLanded] = useState(false);
  const [showShockwave, setShowShockwave] = useState(false);
  const [flightKey, setFlightKey] = useState(0);

  // Framer Motion Animation Controls
  const beeControls = useAnimation();
  const logoScaleControls = useAnimation();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const flyingBeeRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<SparkleParticle[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const isFlyingRef = useRef(false);

  // Keep ref in sync for render loop
  useEffect(() => {
    isFlyingRef.current = isFlying && !hasLanded;
  }, [isFlying, hasLanded]);

  // Golden particle trail on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 450);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || 450;
      height = canvas.height = canvas.parentElement?.clientHeight || 450;
    };
    window.addEventListener('resize', handleResize);

    const colors = ['#FFD700', '#FFE57F', '#FF9900', '#FFFFFF', '#FFF4B8'];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Actively spawn trailing golden sparkles directly behind the flying bee
      if (isFlyingRef.current && flyingBeeRef.current && canvas) {
        const beeRect = flyingBeeRef.current.getBoundingClientRect();
        const canvasRect = canvas.getBoundingClientRect();

        const beeCenterX = beeRect.left + beeRect.width / 2 - canvasRect.left;
        const beeCenterY = beeRect.top + beeRect.height / 2 - canvasRect.top;

        // Emit 4-6 sparkling particles per frame along flight path
        for (let i = 0; i < 4; i++) {
          const isStar = Math.random() > 0.4;
          particlesRef.current.push({
            x: beeCenterX + (Math.random() - 0.5) * 28,
            y: beeCenterY + (Math.random() - 0.5) * 28,
            size: isStar ? Math.random() * 4 + 2.5 : Math.random() * 2.8 + 1.2,
            opacity: Math.random() * 0.4 + 0.6,
            color: colors[Math.floor(Math.random() * colors.length)],
            isStar,
            vx: (Math.random() - 0.5) * 1.5 - 0.5,
            vy: (Math.random() - 0.5) * 1.5 + 0.8, // gentle drift downwards
            rotation: Math.random() * Math.PI,
            rotSpeed: (Math.random() - 0.5) * 0.1,
          });
        }
      }

      // Update & render each particle
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.opacity -= 0.024;
        p.size *= 0.97;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;

        if (p.opacity <= 0.04 || p.size <= 0.4) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        if (p.isStar) {
          drawSparkleStar(
            ctx,
            p.x,
            p.y,
            p.size * 2.2,
            p.size * 0.45,
            p.color,
            p.opacity,
            p.rotation
          );
        } else {
          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;
          ctx.shadowBlur = p.size * 3.5;
          ctx.shadowColor = p.color;
          ctx.fill();
          ctx.restore();
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Spawn golden spark burst on touchdown
  const spawnLandingSparks = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const colors = ['#FFD700', '#FFFFFF', '#FFB800', '#FFE57F', '#FFF099'];
    for (let i = 0; i < 55; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 60 + 15;
      const isStar = Math.random() > 0.45;
      particlesRef.current.push({
        x: centerX + Math.cos(angle) * (speed * 0.4),
        y: centerY + Math.sin(angle) * (speed * 0.4),
        size: isStar ? Math.random() * 5 + 3 : Math.random() * 3.5 + 1.5,
        opacity: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        isStar,
        vx: Math.cos(angle) * (Math.random() * 2.2 + 0.8),
        vy: Math.sin(angle) * (Math.random() * 2.2 + 0.8),
        rotation: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.15,
      });
    }
  };

  // Execute synchronized Framer Motion flight and landing scale sequence
  const startFlightSequence = async () => {
    if (isFlying) return;
    setIsFlying(true);
    setHasLanded(false);
    setShowShockwave(false);

    // Initial logo state before landing
    logoScaleControls.set({ scale: 1 });

    // Step 1: Fly across the screen with 3D banking, rotation and bezier trajectory
    await beeControls.start({
      x: [340, -190, 110, -40, 0],
      y: [-220, 70, -60, 25, 0],
      scale: [0.35, 0.65, 0.85, 1.08, 1.0],
      rotate: [-35, 22, -18, 8, 0],
      rotateY: [40, -30, 20, -5, 0],
      opacity: [0, 1, 1, 1, 1],
      transition: {
        duration: 2.4,
        times: [0, 0.35, 0.65, 0.88, 1],
        ease: [0.25, 0.1, 0.25, 1],
      },
    });

    // Step 2: Touchdown at (0, 0) - Trigger landing scale effect on the logo
    setHasLanded(true);
    setShowShockwave(true);
    spawnLandingSparks();

    // Synced landing scale bounce effect using Framer Motion
    await logoScaleControls.start({
      scale: [1, 1.25, 0.93, 1.06, 1],
      transition: {
        duration: 0.65,
        ease: 'easeOut',
      },
    });

    // Step 3: Complete flight sequence, keep docked
    setTimeout(() => {
      setShowShockwave(false);
      setIsFlying(false);
    }, 400);
  };

  // Trigger flight on initial mount
  useEffect(() => {
    const timer = setTimeout(() => {
      startFlightSequence();
    }, 400);

    return () => clearTimeout(timer);
  }, [flightKey]);

  const whatsappMessage = encodeURIComponent(
    isML
      ? 'നമസ്കാരം VANDU DIGITAL ADS! എന്റെ ബ്രാൻഡ് വളർത്തുന്നതിനായി മാർക്കറ്റിംഗ് സർവീസുകളെക്കുറിച്ച് അറിയാൻ ആഗ്രഹിക്കുന്നു.'
      : 'Hi VANDU DIGITAL ADS! I want to discuss growing my brand with your digital marketing services.'
  );

  return (
    <section className="relative pt-10 pb-16 md:pt-14 md:pb-24 overflow-hidden">
      {/* Golden Background Ambient Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[800px] h-[400px] md:h-[600px] pointer-events-none rounded-full blur-[130px] -z-10 opacity-25"
        style={{
          background:
            'radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, rgba(255, 153, 0, 0.15) 45%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Top Brand Subtitle & Malayalam Identity */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/80 border border-[#FFD700]/30 text-xs text-neutral-300 backdrop-blur-md mb-6">
            <span className="font-bold text-[#FFD700]">വണ്ട്</span>
            <span className="text-neutral-600">&bull;</span>
            <span className="font-semibold uppercase tracking-wider text-white">
              VANDU DIGITAL ADS
            </span>
            <span className="text-neutral-600">&bull;</span>
            <span className="text-neutral-400">{t.agencyBadge}</span>
          </div>

          {/* Central 3D Logo Stage with Synced Flying Bee & Golden Sparkle Trail */}
          <div className="relative w-full max-w-sm aspect-square flex items-center justify-center my-2">
            {/* Ambient Gold Rotating Rings */}
            <div
              className="absolute inset-2 rounded-full border border-[#FFD700]/20 animate-spin pointer-events-none"
              style={{ animationDuration: '35s' }}
            />
            <div
              className="absolute inset-8 rounded-full border border-dashed border-[#FF9900]/25 animate-spin pointer-events-none"
              style={{ animationDirection: 'reverse', animationDuration: '28s' }}
            />

            {/* Canvas for Golden Spark Trail & Touchdown Burst (Expanded for wide flight path) */}
            <canvas
              ref={canvasRef}
              className="pointer-events-none absolute -inset-20 z-15 w-[calc(100%+160px)] h-[calc(100%+160px)]"
            />

            {/* Landing Golden Shockwave Ring (Synced with Landing Scale) */}
            <AnimatePresence>
              {showShockwave && (
                <motion.div
                  initial={{ scale: 0.7, opacity: 0.95 }}
                  animate={{ scale: 2.2, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.75, ease: 'easeOut' }}
                  className="pointer-events-none absolute w-52 h-52 rounded-full border-2 border-[#FFD700] shadow-[0_0_20px_#FFD700] z-25"
                />
              )}
            </AnimatePresence>

            {/* Target 3D Logo Container Animated with Framer Motion Landing Scale */}
            <motion.div
              animate={logoScaleControls}
              className="relative z-10 w-full h-full flex items-center justify-center"
            >
              {/* While flight is running and not yet landed, show the Flying Bee; once landed, show interactive 3D logo */}
              {isFlying && !hasLanded ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Target base glow */}
                  <div className="absolute w-44 h-44 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/25 blur-sm animate-pulse" />

                  {/* Framer Motion Flying Bee Element */}
                  <motion.div
                    ref={flyingBeeRef}
                    animate={beeControls}
                    initial={{
                      x: 340,
                      y: -220,
                      scale: 0.35,
                      rotate: -35,
                      rotateY: 40,
                      opacity: 0,
                    }}
                    className="relative z-20 preserve-3d"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Golden Comet Light Aura behind the flying bee */}
                    <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent blur-md pointer-events-none animate-pulse" />

                    {/* Gentle wing vibration during flight */}
                    <div className="animate-pulse relative">
                      <img
                        src="/vandu-bee-logo.png"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            '/assets/aistudio/Picsart_26-11-05_03-45-34-935_89934389.png';
                        }}
                        alt="Flying Bee"
                        className="w-56 h-56 sm:w-72 sm:h-72 object-contain filter drop-shadow-[0_16px_35px_rgba(255,215,0,0.6)] pointer-events-none"
                        draggable={false}
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </motion.div>
                </div>
              ) : (
                /* Resting 3D Interactive Logo with Touch/Tilt Parallax & Specular Sheen */
                <Logo3D
                  size="hero"
                  interactive={true}
                  floating={true}
                  withGlow={true}
                  className="cursor-grab active:cursor-grabbing"
                />
              )}
            </motion.div>
          </div>

          {/* Interactive Button to Replay Framer Motion Bee Flight with Golden Sparkles */}
          <div className="mt-3 mb-6">
            <button
              onClick={() => {
                setFlightKey((prev) => prev + 1);
                startFlightSequence();
              }}
              disabled={isFlying}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-neutral-200 hover:text-[#FFD700] bg-neutral-900/90 hover:bg-neutral-800 border border-[#FFD700]/30 hover:border-[#FFD700] transition-all cursor-pointer shadow-md disabled:opacity-50"
            >
              {isFlying ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-[#FFD700] animate-ping" />
                  <span>{t.flyingStatus}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />
                  <span>{t.flyBeeBtn}</span>
                </>
              )}
            </button>
          </div>

          {/* Main Clean Headline */}
          <h1
            className="font-cinzel text-4xl sm:text-5xl md:text-6xl font-black text-white max-w-4xl tracking-tight leading-[1.1]"
            style={{ textWrap: 'balance' }}
          >
            {t.headlineStart}{' '}
            <span className="gold-gradient-text-bright">{t.headlineGradient}</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-base sm:text-lg text-neutral-300 max-w-2xl font-sans leading-relaxed">
            {t.subtitle}
          </p>

          {/* Clean Dual CTAs: WhatsApp & Proposal */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto">
            <a
              href={`https://wa.me/?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
              <span>{t.whatsappCta}</span>
            </a>

            <button
              onClick={onOpenProposal}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm text-black bg-gradient-to-r from-[#FFE57F] via-[#FFD700] to-[#FF9900] hover:brightness-110 active:scale-98 transition-all shadow-[0_0_25px_rgba(255,215,0,0.35)] cursor-pointer"
            >
              <span>{t.proposalCta}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 3 Simple Quantified Proof Metrics */}
          <div className="mt-14 pt-6 border-t border-neutral-900 grid grid-cols-3 gap-6 sm:gap-12 text-center w-full max-w-2xl">
            <div>
              <div className="font-cinzel text-2xl sm:text-3xl font-extrabold gold-gradient-text tabular-nums">
                +340%
              </div>
              <div className="text-xs text-neutral-400 mt-0.5">{t.roasLabel}</div>
            </div>
            <div>
              <div className="font-cinzel text-2xl sm:text-3xl font-extrabold gold-gradient-text tabular-nums">
                12M+
              </div>
              <div className="text-xs text-neutral-400 mt-0.5">{t.impressionsLabel}</div>
            </div>
            <div>
              <div className="font-cinzel text-2xl sm:text-3xl font-extrabold gold-gradient-text tabular-nums">
                450+
              </div>
              <div className="text-xs text-neutral-400 mt-0.5">{t.campaignsLabel}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
