import React from 'react';
import { MarketingService } from '../types/marketing.ts';
import { X, CheckCircle2, Clock, TrendingUp, Sparkles, Target, ArrowRight } from 'lucide-react';

interface ServiceDetailModalProps {
  service: MarketingService | null;
  onClose: () => void;
  onBookService: (serviceName: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onBookService,
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-[#0c0c11] border border-[#FFD700]/30 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(255,215,0,0.15)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Golden Top Edge Glow */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-full transition-colors cursor-pointer"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 pr-8">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#FFD700]">
            VANDU Service Specification
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
            {service.name}
          </h2>
          <p className="text-sm text-neutral-300 leading-relaxed font-sans pt-1">
            {service.fullDesc}
          </p>
        </div>

        {/* Performance Metrics Highlights */}
        <div className="grid grid-cols-3 gap-3 my-6 p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
          <div className="flex flex-col">
            <span className="text-[11px] font-medium text-neutral-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#FFD700]" />
              Turnaround
            </span>
            <span className="text-sm font-semibold text-white mt-1">
              {service.metrics.turnaround}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-[11px] font-medium text-neutral-400 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-[#FF9900]" />
              Impact
            </span>
            <span className="text-sm font-semibold text-[#FFD700] mt-1 font-mono">
              {service.metrics.avgBoost}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-[11px] font-medium text-neutral-400 flex items-center gap-1">
              <Target className="w-3.5 h-3.5 text-amber-400" />
              Starting
            </span>
            <span className="text-sm font-semibold text-white mt-1 font-mono">
              {service.startingPrice}
            </span>
          </div>
        </div>

        {/* Core Deliverables List */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
            Included Deliverables & Strategy
          </h3>
          <ul className="space-y-2.5">
            {service.deliverables.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-[#FFD700] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-neutral-400 font-sans">
            Tailored specifically for <strong className="text-neutral-200">{service.metrics.bestFor}</strong>
          </span>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2.5 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onBookService(service.name);
                onClose();
              }}
              className="w-1/2 sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-black bg-gradient-to-r from-[#FFE57F] via-[#FFD700] to-[#FF9900] hover:brightness-110 rounded-lg shadow-[0_0_15px_rgba(255,215,0,0.3)] transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Request Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
