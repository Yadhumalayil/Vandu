import React, { useState } from 'react';
import { usePricing } from '../../context/PricingContext.tsx';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { TRANSLATIONS } from '../../i18n/translations.ts';
import {
  Image,
  Instagram,
  Smartphone,
  Sparkles,
  Layout,
  CreditCard,
  Film,
  Video,
  PlayCircle,
  CheckSquare,
  PenTool,
  MessageCircle,
  Plus,
  ArrowRight,
  Check,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Image,
  Instagram,
  Smartphone,
  Sparkles,
  Layout,
  CreditCard,
  Film,
  Video,
  PlayCircle,
  CheckSquare,
  PenTool,
};

export const IndividualServicesView: React.FC = () => {
  const { services, orderServiceNow, incrementService, selectedServices, formatINR } = usePricing();
  const { language, isML } = useLanguage();
  const t = TRANSLATIONS[language].pricing;

  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: isML ? 'എല്ലാം' : 'All Deliverables' },
    { id: 'design', label: isML ? 'പോസ്റ്റർ & ഗ്രാഫിക്സ്' : 'Design & Posters' },
    { id: 'video', label: isML ? 'റീൽസ് & വീഡിയോസ്' : 'Video & Reels' },
    { id: 'social', label: isML ? 'സോഷ്യൽ & കണ്ടന്റ്' : 'Social & Copy' },
    { id: 'branding', label: isML ? 'ലോഗോ & ബ്രാൻഡിംഗ്' : 'Branding & Identity' },
  ];

  const visibleServices = services.filter((s) => {
    if (!s.enabled) return false;
    if (categoryFilter === 'all') return true;
    return s.category === categoryFilter;
  });

  const getWhatsAppServiceLink = (serviceName: string, price: number) => {
    const text = isML
      ? `നമസ്കാരം VANDU DIGITAL ADS! എനിക്ക് "${serviceName}" (വില: ${formatINR(price)}) ഓർഡർ ചെയ്യുന്നതിനെക്കുറിച്ച് സംസാരിക്കാൻ താല്പര്യമുണ്ട്.`
      : `Hello VANDU DIGITAL ADS! I want to order "${serviceName}" priced at ${formatINR(price)}. Please share the timeline and next steps.`;
    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-neutral-900/60 border border-neutral-800/80 rounded-2xl w-fit mx-auto">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategoryFilter(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
              categoryFilter === cat.id
                ? 'bg-gradient-to-r from-[#FFD700] to-[#FF9900] text-black shadow-[0_0_15px_rgba(255,215,0,0.25)]'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid of Individual Services */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleServices.map((service, idx) => {
          const IconComponent = ICON_MAP[service.iconName] || Sparkles;
          const currentName = isML && service.nameML ? service.nameML : service.name;
          const currentDesc = isML && service.descriptionML ? service.descriptionML : service.description;
          const inCartQty = selectedServices[service.id] || 0;

          return (
            <div
              key={service.id}
              className="group relative glass-gold-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_30px_rgba(255,215,0,0.12)] preserve-3d"
            >
              {/* Top Accent Gold Glow */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent group-hover:via-[#FFD700] transition-all duration-500" />

              <div>
                {/* Header row: Icon & Category */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-black border border-[#FFD700]/30 group-hover:border-[#FFD700] flex items-center justify-center text-[#FFD700] shadow-sm transition-all duration-300">
                    <IconComponent className="w-6 h-6 stroke-[1.75]" />
                  </div>

                  <div className="flex items-center gap-2">
                    {service.featured && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#FFD700]/15 text-[#FFD700] border border-[#FFD700]/40">
                        {isML ? 'പ്രധാനപ്പെട്ടത്' : 'Popular'}
                      </span>
                    )}
                    <span className="font-mono text-xs text-neutral-500 uppercase">
                      0{idx + 1}
                    </span>
                  </div>
                </div>

                {/* Service Name */}
                <h3 className="font-cinzel text-xl font-bold text-white group-hover:text-[#FFD700] transition-colors">
                  {currentName}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-neutral-300 mt-2.5 leading-relaxed font-sans">
                  {currentDesc}
                </p>
              </div>

              {/* Bottom: Price in ₹ & Buttons */}
              <div className="mt-6 pt-5 border-t border-neutral-800/80 space-y-3.5">
                <div className="flex items-baseline justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                    {isML ? 'പ്രത്യേക നിരക്ക്' : 'Direct Rate'}
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-mono text-2xl font-black gold-gradient-text-bright">
                      {formatINR(service.price)}
                    </span>
                    <span className="text-[10px] text-neutral-500 font-sans">
                      {isML ? '/ഓർഡർ' : '/order'}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  {/* Order Now (navigates to Enquiry Form) */}
                  <button
                    onClick={() => orderServiceNow(service.id)}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-bold text-xs text-black bg-gradient-to-r from-[#FFE57F] via-[#FFD700] to-[#FF9900] hover:brightness-110 active:scale-98 transition-all cursor-pointer shadow-sm"
                  >
                    <span>{t.orderNow}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {/* WhatsApp Direct Enquiry */}
                  <a
                    href={getWhatsAppServiceLink(currentName, service.price)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-semibold text-xs text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-800/50 hover:border-emerald-700 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp</span>
                  </a>
                </div>

                {/* Add to Custom Calculator Cart helper */}
                <button
                  onClick={() => incrementService(service.id)}
                  className={`w-full py-1.5 px-3 rounded-lg text-[11px] font-mono flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    inCartQty > 0
                      ? 'bg-[#FFD700]/15 text-[#FFD700] border border-[#FFD700]/40'
                      : 'text-neutral-400 hover:text-white bg-neutral-900/60 hover:bg-neutral-800/80 border border-neutral-800'
                  }`}
                >
                  {inCartQty > 0 ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#FFD700]" />
                      <span>
                        {inCartQty} in Calculator • {isML ? 'കൂടുതൽ ചേർക്കുക' : 'Add another (+)'}
                      </span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3 h-3 text-[#FFD700]" />
                      <span>{isML ? 'കാൽക്കുലേറ്ററിലേക്ക് ചേർക്കുക' : 'Add to Custom Calculator'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
