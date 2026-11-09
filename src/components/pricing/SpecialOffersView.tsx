import React, { useState } from 'react';
import { usePricing } from '../../context/PricingContext.tsx';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { TRANSLATIONS } from '../../i18n/translations.ts';
import {
  Tag,
  Percent,
  Calendar,
  Users,
  Gift,
  CheckCircle,
  Copy,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const SpecialOffersView: React.FC = () => {
  const { offers, applyOfferToCalculator, selectedOfferId, formatINR } = usePricing();
  const { language, isML } = useLanguage();
  const t = TRANSLATIONS[language].pricing;

  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const activeOffers = offers.filter((o) => o.enabled);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activeOffers.map((offer) => {
          const isSelected = selectedOfferId === offer.id;
          const currentTitle = isML && offer.titleML ? offer.titleML : offer.title;
          const currentDesc = isML && offer.descriptionML ? offer.descriptionML : offer.description;
          const currentEligibility =
            isML && offer.eligibilityML ? offer.eligibilityML : offer.eligibility;

          // Simulated savings display
          let simulatedOriginal = 2999;
          let simulatedDiscount = 0;
          if (offer.discountType === 'percentage') {
            simulatedDiscount = Math.round((simulatedOriginal * offer.discountValue) / 100);
          } else if (offer.discountType === 'fixed') {
            simulatedDiscount = offer.discountValue;
          } else if (offer.discountType === 'free_item') {
            simulatedDiscount = offer.discountValue;
          }
          const simulatedFinal = Math.max(0, simulatedOriginal - simulatedDiscount);

          return (
            <div
              key={offer.id}
              className={`relative rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 preserve-3d ${
                isSelected
                  ? 'glass-gold-card border-2 border-[#FFD700] shadow-[0_0_30px_rgba(255,215,0,0.25)]'
                  : 'glass-gold-card border border-neutral-800 hover:border-[#FFD700]/50'
              }`}
            >
              {/* Top Shimmer */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent" />

              <div>
                {/* Header: Offer Badge & Coupon Code */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-black border border-[#FFD700]/40 text-[#FFD700]">
                      {offer.discountType === 'free_item' ? (
                        <Gift className="w-5 h-5 text-[#FF9900]" />
                      ) : (
                        <Percent className="w-5 h-5 text-[#FFD700]" />
                      )}
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#FFD700]">
                      {t.activeOfferBadge}
                    </span>
                  </div>

                  {/* Promo Code Chip */}
                  <button
                    onClick={() => handleCopyCode(offer.code)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-900 border border-neutral-700 hover:border-[#FFD700] font-mono text-xs font-bold text-white transition-all cursor-pointer"
                    title="Copy Promo Code"
                  >
                    <span>{offer.code}</span>
                    {copiedCode === offer.code ? (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-neutral-400" />
                    )}
                  </button>
                </div>

                {/* Title & Description */}
                <h3 className="font-cinzel text-xl font-bold text-white">
                  {currentTitle}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 mt-2 font-sans leading-relaxed">
                  {currentDesc}
                </p>

                {/* Simulated Price & Customer Savings Box */}
                <div className="mt-5 p-3.5 rounded-xl bg-neutral-900/70 border border-neutral-800 space-y-2">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                    {isML ? 'ഉദാഹരണ സേവിംഗ്സ് കാൽക്കുലേഷൻ' : 'Simulated Example Savings (Growth Package):'}
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-400">
                      {isML ? 'സാധാരണ വില:' : 'Original Price:'}
                    </span>
                    <span className="line-through text-neutral-500 font-mono">
                      {formatINR(simulatedOriginal)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-emerald-400 font-semibold">
                      {isML ? 'നിങ്ങളുടെ ലാഭം:' : 'Customer Savings:'}
                    </span>
                    <span className="text-emerald-400 font-mono font-bold">
                      -{formatINR(simulatedDiscount)}
                      {offer.discountType === 'percentage' && ` (${offer.discountValue}% OFF)`}
                    </span>
                  </div>

                  <div className="pt-1.5 border-t border-neutral-800 flex items-center justify-between text-xs font-bold">
                    <span className="text-white">
                      {isML ? 'ഓഫർ പ്രകാരമുള്ള വില:' : 'Discounted Price:'}
                    </span>
                    <span className="font-mono text-sm gold-gradient-text-bright">
                      {formatINR(simulatedFinal)}
                    </span>
                  </div>
                </div>

                {/* Eligibility & Expiry Metadata */}
                <div className="mt-4 pt-3 border-t border-neutral-800/80 grid grid-cols-2 gap-2 text-[11px] text-neutral-400">
                  <div className="flex items-center gap-1.5 truncate">
                    <Users className="w-3.5 h-3.5 text-[#FFD700] shrink-0" />
                    <span className="truncate">{currentEligibility}</span>
                  </div>
                  <div className="flex items-center gap-1.5 justify-end">
                    <Calendar className="w-3.5 h-3.5 text-[#FF9900] shrink-0" />
                    <span>
                      {t.expiryLabel}: {offer.expiryDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Apply to Calculator Action */}
              <div className="mt-6 pt-4 border-t border-neutral-800">
                <button
                  onClick={() => applyOfferToCalculator(offer.id)}
                  className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#FFD700] text-black shadow-[0_0_15px_rgba(255,215,0,0.4)]'
                      : 'bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 hover:border-[#FFD700]/50'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    {isSelected
                      ? isML
                        ? 'ഓഫർ കാൽക്കുലേറ്ററിൽ പ്രയോഗിച്ചു'
                        : 'Offer Active in Calculator'
                      : t.applyOfferBtn}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
