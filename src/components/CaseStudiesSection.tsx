import React, { useRef, useEffect } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'motion/react';
import { CASE_STUDIES } from '../data/marketingData.ts';
import { Award, TrendingUp, Users, Eye, DollarSign } from 'lucide-react';

interface CaseStudiesSectionProps {
  onOpenProposal: (serviceName?: string) => void;
}

interface CounterProps {
  from?: number;
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

// Reusable Framer Motion Animated Incrementing Counter
export const Counter: React.FC<CounterProps> = ({
  from = 0,
  to,
  duration = 2.2,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const motionVal = useMotionValue(from);

  const displayVal = useTransform(motionVal, (current) => {
    if (decimals > 0) {
      return `${prefix}${current.toFixed(decimals)}${suffix}`;
    }
    return `${prefix}${Math.round(current).toLocaleString()}${suffix}`;
  });

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionVal, to, {
        duration,
        ease: [0.16, 1, 0.3, 1], // luxury smooth deceleration curve
      });
      return controls.stop;
    }
  }, [isInView, motionVal, to, duration]);

  return (
    <span ref={ref} className={`tabular-nums font-mono ${className}`}>
      <motion.span>{displayVal}</motion.span>
    </span>
  );
};

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({ onOpenProposal }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });

  // Key performance aggregate metrics
  const aggregateMetrics = [
    {
      label: 'Average Client ROI',
      target: 380,
      prefix: '+',
      suffix: '%',
      decimals: 0,
      icon: TrendingUp,
      color: 'text-[#FFD700]',
      desc: 'Audited return across all active campaigns',
    },
    {
      label: 'Qualified Leads Generated',
      target: 54280,
      prefix: '',
      suffix: '+',
      decimals: 0,
      icon: Users,
      color: 'text-amber-400',
      desc: 'High-intent CRM & WhatsApp inquiries',
    },
    {
      label: 'Total Ad Impressions',
      target: 18.5,
      prefix: '',
      suffix: 'M+',
      decimals: 1,
      icon: Eye,
      color: 'text-yellow-300',
      desc: 'Targeted multi-channel ad impressions',
    },
    {
      label: 'Client Revenue Unlocked',
      target: 4.8,
      prefix: '$',
      suffix: 'M+',
      decimals: 1,
      icon: DollarSign,
      color: 'text-emerald-400',
      desc: 'Direct verifiable gross revenue driven',
    },
  ];

  return (
    <section id="case-studies" ref={sectionRef} className="py-20 md:py-28 relative bg-[#060608] border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="text-xs font-bold uppercase tracking-widest text-[#FFD700] flex items-center justify-center gap-2">
            <Award className="w-4 h-4" />
            <span>Proven Track Record</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-black text-white">
            Case Studies & Performance. <br />
            <span className="gold-gradient-text-bright">Concrete Outcomes & Verified Returns.</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 font-sans">
            Every campaign executed by VANDU DIGITAL ADS is tracked against strict mathematical benchmarks 
            and audited returns on ad spend.
          </p>
        </div>

        {/* 1. Grand Aggregate Animated Incrementing Performance Counters Strip */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 p-6 sm:p-8 rounded-3xl glass-gold-card border border-[#FFD700]/30 shadow-[0_15px_40px_rgba(0,0,0,0.8)] relative overflow-hidden"
        >
          {/* Top Gold Shimmer Border */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent" />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-neutral-800/80">
            {aggregateMetrics.map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <div key={idx} className={`flex flex-col ${idx !== 0 ? 'pt-4 lg:pt-0 lg:pl-8' : ''}`}>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                    <Icon className="w-4 h-4 text-[#FFD700]" />
                    <span>{metric.label}</span>
                  </div>

                  {/* Animated Incrementing Counter */}
                  <div className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                    <Counter
                      to={metric.target}
                      prefix={metric.prefix}
                      suffix={metric.suffix}
                      decimals={metric.decimals}
                      duration={2.2}
                      className={metric.color}
                    />
                  </div>

                  <p className="text-xs text-neutral-500 font-sans mt-2">
                    {metric.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* 2. Three Featured Deep-Dive Case Studies */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {CASE_STUDIES.map((study, idx) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="glass-gold-card rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5"
            >
              <div>
                {/* Meta header */}
                <div className="flex items-center justify-between text-xs text-neutral-400 pb-3 border-b border-neutral-800">
                  <span className="font-semibold text-white">{study.client}</span>
                  <span className="text-[11px] font-mono text-[#FFD700]">{study.duration}</span>
                </div>

                {/* Service & Headline */}
                <div className="text-xs text-neutral-500 font-medium mt-3">
                  {study.industry} &bull; {study.service}
                </div>
                <h3 className="font-cinzel text-xl font-bold text-white mt-2 leading-snug">
                  {study.headline}
                </h3>
                <p className="text-xs text-neutral-300 mt-3 leading-relaxed font-sans">
                  {study.summary}
                </p>
              </div>

              {/* Verified Result Metrics Strip with Animated Incrementing Counters */}
              <div className="mt-6 pt-4 border-t border-neutral-800/80 grid grid-cols-3 gap-2 text-center bg-neutral-900/50 p-3 rounded-xl">
                <div>
                  <div className="text-[10px] text-neutral-500 font-mono uppercase">Target ROI</div>
                  <div className="text-sm font-extrabold text-[#FFD700] font-mono mt-0.5">
                    {idx === 0 ? (
                      <Counter to={4.8} decimals={1} suffix="x" />
                    ) : idx === 1 ? (
                      <Counter to={5.2} decimals={1} suffix="x" />
                    ) : (
                      <Counter to={3.9} decimals={1} suffix="x" />
                    )}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-neutral-500 font-mono uppercase">Audience Reach</div>
                  <div className="text-sm font-extrabold text-white font-mono mt-0.5">
                    {idx === 0 ? (
                      <Counter to={1.4} decimals={1} suffix="M" />
                    ) : idx === 1 ? (
                      <Counter to={820} suffix="K" />
                    ) : (
                      <Counter to={2.8} decimals={1} suffix="M" />
                    )}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-neutral-500 font-mono uppercase">Conversions</div>
                  <div className="text-xs font-bold text-neutral-300 font-mono mt-0.5 truncate">
                    {idx === 0 ? (
                      <Counter to={3840} suffix=" Orders" />
                    ) : idx === 1 ? (
                      <Counter to={1280} suffix=" Bookings" />
                    ) : (
                      <Counter to={48000} suffix=" Installs" />
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>


        {/* Bottom CTA Banner */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-neutral-950 via-[#101016] to-neutral-950 border border-[#FFD700]/30 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-cinzel text-2xl sm:text-3xl font-black text-white">
              Ready to Multiply Your Advertising Returns?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-sans max-w-xl">
              Partner with VANDU DIGITAL ADS for precision campaigns, 3D brand mastery, and high-velocity social growth.
            </p>
          </div>

          <button
            onClick={() => onOpenProposal('Full-Funnel Campaign')}
            className="px-8 py-3.5 rounded-xl font-bold text-sm text-black bg-gradient-to-r from-[#FFE57F] via-[#FFD700] to-[#FF9900] hover:brightness-110 active:scale-98 transition-all shadow-[0_0_25px_rgba(255,215,0,0.35)] cursor-pointer whitespace-nowrap shrink-0"
          >
            Schedule Discovery Consultation
          </button>
        </div>
      </div>
    </section>
  );
};
