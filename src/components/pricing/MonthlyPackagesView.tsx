import React from 'react';
import { usePricing } from '../../context/PricingContext.tsx';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { TRANSLATIONS } from '../../i18n/translations.ts';
import { Check, Crown, Sparkles, ArrowRight, MessageCircle, ShieldCheck } from 'lucide-react';

export const MonthlyPackagesView: React.FC = () => {
  const { packages, orderPackageNow, formatINR } = usePricing();
  const { language, isML } = useLanguage();
  const t = TRANSLATIONS[language].pricing;

  const getWhatsAppPackageLink = (pkgName: string, price: number) => {
    const text = isML
      ? `നമസ്കാരം VANDU DIGITAL ADS! എനിക്ക് "${pkgName}" (${formatINR(price)}/മാസം) സബ്‌സ്‌ക്രൈബ് ചെയ്യുന്നതിനെക്കുറിച്ച് സംസാരിക്കാൻ താല്പര്യമുണ്ട്.`
      : `Hello VANDU DIGITAL ADS! I am interested in subscribing to the "${pkgName}" (${formatINR(price)}/month). Please share the onboarding details.`;
    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  };

  const visiblePackages = packages.filter((p) => p.enabled);

  return (
    <div className="space-y-12 animate-fade-in">
      {/* 3-Column Tier Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {visiblePackages.map((pkg) => {
          const isRecommended = pkg.recommended;
          const currentName = isML && pkg.nameML ? pkg.nameML : pkg.name;
          const currentTagline = isML && pkg.taglineML ? pkg.taglineML : pkg.tagline;
          const deliverables =
            isML && pkg.deliverablesML && pkg.deliverablesML.length > 0
              ? pkg.deliverablesML
              : pkg.deliverables;

          return (
            <div
              key={pkg.id}
              className={`relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 preserve-3d ${
                isRecommended
                  ? 'glass-gold-card border-2 border-[#FFD700] shadow-[0_0_40px_rgba(255,215,0,0.22)] -translate-y-2 lg:-translate-y-3 z-10'
                  : 'glass-gold-card border border-neutral-800 hover:border-[#FFD700]/40'
              }`}
            >
              {/* Recommended Top Badge */}
              {isRecommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#FFE57F] via-[#FFD700] to-[#FF9900] text-black text-xs font-black tracking-wider uppercase flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,215,0,0.5)]">
                  <Crown className="w-3.5 h-3.5 fill-black" />
                  <span>{t.recommendedBadge}</span>
                </div>
              )}

              {/* Ambient Top Glow */}
              <div
                className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent ${
                  isRecommended ? 'via-[#FFD700]' : 'via-[#FFD700]/30'
                } to-transparent`}
              />

              <div>
                {/* Package Header */}
                <div className="flex items-center justify-between pb-4 border-b border-neutral-800/80">
                  <div>
                    <h3 className="font-cinzel text-2xl font-black text-white">
                      {currentName}
                    </h3>
                    <p className="text-xs text-neutral-400 font-sans mt-1">
                      {currentTagline}
                    </p>
                  </div>
                  {isRecommended && (
                    <Sparkles className="w-6 h-6 text-[#FFD700] shrink-0 animate-pulse" />
                  )}
                </div>

                {/* Price Display */}
                <div className="py-6 flex items-baseline gap-2">
                  <span className="font-mono text-4xl sm:text-5xl font-black gold-gradient-text-bright tracking-tight">
                    {formatINR(pkg.price)}
                  </span>
                  <span className="text-sm font-sans font-medium text-neutral-400">
                    {isML ? pkg.periodML || '/മാസം' : pkg.period}
                  </span>
                </div>

                {/* Deliverables Checklist */}
                <div className="space-y-3 pt-2">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                    {t.includesHeader}
                  </div>
                  <ul className="space-y-3">
                    {deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            isRecommended
                              ? 'bg-[#FFD700] text-black shadow-[0_0_8px_#FFD700]'
                              : 'bg-neutral-800 text-[#FFD700]'
                          }`}
                        >
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-neutral-800/80 space-y-3">
                <button
                  onClick={() => orderPackageNow(pkg.id)}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isRecommended
                      ? 'text-black bg-gradient-to-r from-[#FFE57F] via-[#FFD700] to-[#FF9900] hover:brightness-110 shadow-[0_0_20px_rgba(255,215,0,0.35)]'
                      : 'text-black bg-neutral-200 hover:bg-white'
                  }`}
                >
                  <span>{isML ? 'ഈ പാക്കേജ് തിരഞ്ഞെടുക്കൂ' : 'Select This Package'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={getWhatsAppPackageLink(currentName, pkg.price)}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-800/50 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t.whatsappEnquiry}</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust Banner Under Packages */}
      <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-[#FFD700] shrink-0" />
          <span>
            {isML
              ? 'എല്ലാ പ്രതിമാസ പാക്കേജുകളിലും വേഗത്തിലുള്ള ഡെലിവറിയും ക്വാളിറ്റി അഷ്വറൻസും ഉറപ്പാക്കുന്നു.'
              : 'All monthly retainer packages include priority turnaround, dedicated account lead, and transparent revision windows.'}
          </span>
        </div>
        <span className="font-mono text-[#FFD700] shrink-0">
          {isML ? 'നോ ഹിഡൻ ചാർജസ്' : '100% No Hidden Fees'}
        </span>
      </div>
    </div>
  );
};
