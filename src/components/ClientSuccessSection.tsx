import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CLIENT_REVIEWS, CLIENT_LOGOS } from '../data/marketingData.ts';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2, Sparkles, Building2 } from 'lucide-react';

interface ClientSuccessSectionProps {
  onOpenProposal: (serviceName?: string) => void;
}

export const ClientSuccessSection: React.FC<ClientSuccessSectionProps> = ({ onOpenProposal }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  // 3D Card Interactive Tilt State
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [cardTilt, setCardTilt] = useState({ rotateX: 0, rotateY: 0, lightX: 50, lightY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play interval
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % CLIENT_REVIEWS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % CLIENT_REVIEWS.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + CLIENT_REVIEWS.length) % CLIENT_REVIEWS.length);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle 3D tilt angles (max 7 degrees for luxury subtlety)
    const rotX = -((y - centerY) / centerY) * 7;
    const rotY = ((x - centerX) / centerX) * 7;

    setCardTilt({
      rotateX: rotX,
      rotateY: rotY,
      lightX: (x / rect.width) * 100,
      lightY: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCardTilt({ rotateX: 0, rotateY: 0, lightX: 50, lightY: 50 });
  };

  const currentReview = CLIENT_REVIEWS[currentIndex];

  return (
    <section id="client-success" className="py-20 md:py-28 relative bg-[#050507] border-t border-neutral-900 overflow-hidden">
      {/* Background Gold Ambient Bloom */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] pointer-events-none rounded-full blur-[140px] -z-10 opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(255, 215, 0, 0.35) 0%, rgba(255, 153, 0, 0.1) 50%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="text-xs font-bold uppercase tracking-widest text-[#FFD700] flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>Client Success & Endorsements</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-black text-white">
            Trusted by Visionary Brands. <br />
            <span className="gold-gradient-text-bright">Proven Across High-Stakes Markets.</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 font-sans">
            Hear directly from founders, CMOs, and directors who scaled their enterprise revenue and brand prestige with VANDU DIGITAL ADS.
          </p>
        </div>

        {/* 1. Partner & Client Logos Row */}
        <div className="mb-14">
          <div className="text-center text-[11px] font-mono tracking-widest uppercase text-neutral-500 mb-6">
            Featured Enterprise & Luxury Client Network
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {CLIENT_LOGOS.map((client) => (
              <div
                key={client.id}
                className="group p-4 rounded-xl bg-neutral-900/40 hover:bg-neutral-900/80 border border-neutral-800/80 hover:border-[#FFD700]/40 transition-all duration-300 flex flex-col items-center justify-center text-center select-none"
              >
                {/* Metallic Gold Monogram Badge */}
                <div className="w-10 h-10 rounded-lg bg-black border border-[#FFD700]/30 group-hover:border-[#FFD700] flex items-center justify-center text-xs font-bold gold-gradient-text-bright shadow-sm mb-2 transition-all">
                  {client.badge}
                </div>
                <span className="font-cinzel text-xs font-bold text-white group-hover:text-[#FFD700] transition-colors tracking-wider">
                  {client.name}
                </span>
                <span className="text-[10px] text-neutral-500 font-sans mt-0.5 truncate w-full">
                  {client.tagline}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Interactive Testimonial Slider with Subtle 3D Card Hover */}
        <div
          className="relative max-w-3xl mx-auto perspective-1000"
          style={{ perspective: '1200px' }}
          onMouseEnter={() => {
            setIsPaused(true);
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsPaused(false);
            handleMouseLeave();
          }}
          onMouseMove={handleMouseMove}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentReview.id}
              ref={cardRef}
              initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="relative rounded-3xl glass-gold-card p-8 sm:p-10 border border-[#FFD700]/30 shadow-[0_20px_50px_rgba(0,0,0,0.85)] preserve-3d transition-transform duration-150 ease-out"
              style={{
                transform: `rotateX(${cardTilt.rotateX}deg) rotateY(${cardTilt.rotateY}deg) translateZ(${isHovered ? '12px' : '0px'})`,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Dynamic Specular Light Glare that tracks cursor */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none mix-blend-color-dodge transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at ${cardTilt.lightX}% ${cardTilt.lightY}%, rgba(255, 255, 255, 0.18) 0%, rgba(255, 215, 0, 0.08) 35%, transparent 65%)`,
                  opacity: isHovered ? 1 : 0.4,
                }}
              />

              {/* Top Card Bar: Rating & Verified Impact Tag */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-neutral-800/80">
                {/* 5-Star Metallic Rating */}
                <div className="flex items-center gap-1.5">
                  {[...Array(currentReview.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FFD700] text-[#FFD700]" />
                  ))}
                  <span className="text-xs font-mono font-semibold text-neutral-400 ml-1.5">
                    5.0 Verified Score
                  </span>
                </div>

                {/* Verified Impact Metric */}
                {currentReview.impactMetric && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 text-xs font-mono font-bold text-[#FFD700]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{currentReview.impactMetric}</span>
                  </div>
                )}
              </div>

              {/* Quotation Body */}
              <div className="my-6 relative">
                <Quote className="absolute -top-3 -left-3 w-8 h-8 text-[#FFD700]/15 pointer-events-none -scale-x-100" />
                <p className="font-sans text-base sm:text-lg text-neutral-200 leading-relaxed italic relative z-10">
                  &ldquo;{currentReview.content}&rdquo;
                </p>
              </div>

              {/* Bottom Card Footer: Author Profile & Brand Lockup */}
              <div className="pt-6 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  {/* Brand Monogram Avatar */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-neutral-900 via-neutral-800 to-black border border-[#FFD700]/40 flex items-center justify-center font-cinzel font-extrabold text-sm gold-gradient-text-bright shadow-md">
                    {currentReview.brandSymbol || 'VA'}
                  </div>

                  <div>
                    <h4 className="font-cinzel text-base font-bold text-white tracking-wide">
                      {currentReview.author}
                    </h4>
                    <p className="text-xs text-neutral-400 font-sans">
                      {currentReview.role} &bull; <span className="text-neutral-200 font-medium">{currentReview.company}</span>
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block">
                    Campaign Scope
                  </span>
                  <span className="text-xs font-semibold text-[#FFD700]">
                    {currentReview.campaignType}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider Navigation Buttons */}
          <div className="flex items-center justify-between mt-6 px-2">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous Testimonial"
                className="p-2.5 rounded-full bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-800 hover:border-[#FFD700]/40 text-neutral-300 hover:text-[#FFD700] transition-all cursor-pointer shadow-md"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNext}
                aria-label="Next Testimonial"
                className="p-2.5 rounded-full bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-800 hover:border-[#FFD700]/40 text-neutral-300 hover:text-[#FFD700] transition-all cursor-pointer shadow-md"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Slide Indicator Dots */}
            <div className="flex items-center gap-1.5">
              {CLIENT_REVIEWS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === idx
                      ? 'w-6 bg-gradient-to-r from-[#FFD700] to-[#FF9900] shadow-[0_0_8px_#FFD700]'
                      : 'w-2 bg-neutral-800 hover:bg-neutral-700'
                  }`}
                />
              ))}
            </div>

            <div className="text-xs font-mono text-neutral-500">
              0{currentIndex + 1} / 0{CLIENT_REVIEWS.length}
            </div>
          </div>
        </div>

        {/* Call to Action Bar */}
        <div className="mt-14 pt-8 border-t border-neutral-900 text-center">
          <button
            onClick={() => onOpenProposal('Brand Scaling Partnership')}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-xs sm:text-sm text-black bg-gradient-to-r from-[#FFE57F] via-[#FFD700] to-[#FF9900] hover:brightness-110 active:scale-98 transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)] cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Join Our Roster of Successful Brands</span>
          </button>
        </div>
      </div>
    </section>
  );
};
