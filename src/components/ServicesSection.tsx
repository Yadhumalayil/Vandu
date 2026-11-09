import React, { useState, useMemo } from 'react';
import { SERVICES_DATA } from '../data/marketingData.ts';
import { MarketingService } from '../types/marketing.ts';
import { ServiceDetailModal } from './ServiceDetailModal.tsx';
import { Search, ArrowUpRight, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { TRANSLATIONS } from '../i18n/translations.ts';

interface ServicesSectionProps {
  onOpenProposal: (serviceName?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenProposal }) => {
  const { language, isML } = useLanguage();
  const t = TRANSLATIONS[language].services;

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalService, setActiveModalService] = useState<MarketingService | null>(null);

  const categories = [
    { id: 'all', label: t.allTab },
    { id: 'performance', label: t.performanceTab },
    { id: 'social', label: t.socialTab },
    { id: 'creative', label: t.creativeTab },
    { id: 'branding', label: t.brandingTab },
  ];

  const filteredServices = useMemo(() => {
    return SERVICES_DATA.filter((service) => {
      const matchesCategory =
        selectedCategory === 'all' || service.category === selectedCategory;
      const serviceName = isML && service.nameML ? service.nameML : service.name;
      const serviceDesc = isML && service.shortDescML ? service.shortDescML : service.shortDesc;
      const matchesSearch =
        serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        serviceDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.deliverables.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, isML]);

  return (
    <section id="services" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-bold uppercase tracking-widest text-[#FFD700]">
              {t.badge}
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-black text-white">
              {t.headline} <br />
              <span className="gold-gradient-text-bright">{t.headlineGradient}</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 font-sans">
              {t.subtitle}
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 bg-neutral-900/80 border border-neutral-800 focus:border-[#FFD700]/50 rounded-xl text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 p-1.5 bg-neutral-900/60 border border-neutral-800/80 rounded-xl w-fit">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-[#FFD700] to-[#FF9900] text-black shadow-[0_0_15px_rgba(255,215,0,0.25)]'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 3D Glassmorphism Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service, idx) => {
            const currentName = isML && service.nameML ? service.nameML : service.name;
            const currentDesc = isML && service.shortDescML ? service.shortDescML : service.shortDesc;

            return (
              <div
                key={service.id}
                className="group relative glass-gold-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 preserve-3d"
              >
                {/* Top Accent Lighting Glow on Hover */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent group-hover:via-[#FFD700]/80 transition-all duration-500" />

                <div>
                  {/* Clean Editorial Number & Category Header */}
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-3">
                    <span className="text-[#FFD700]">0{idx + 1}.</span>
                    <span className="uppercase tracking-wider text-[11px] text-neutral-400">
                      {service.category}
                    </span>
                  </div>

                  {/* Service Name */}
                  <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white group-hover:text-[#FFD700] transition-colors flex items-center justify-between">
                    <span>{currentName}</span>
                    <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-[#FFD700] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-neutral-300 mt-3 leading-relaxed font-sans">
                    {currentDesc}
                  </p>

                  {/* Deliverables Snippet */}
                  <div className="mt-5 pt-4 border-t border-neutral-800/80 space-y-2">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                      {t.coreDeliverables}
                    </div>
                    <ul className="space-y-1.5">
                      {service.deliverables.slice(0, 3).map((item, dIdx) => (
                        <li key={dIdx} className="text-xs text-neutral-400 flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#FFD700] shrink-0 mt-0.5" />
                          <span className="truncate">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Meta & Action Area */}
                <div className="mt-6 pt-4 border-t border-neutral-800/60 flex items-center justify-between gap-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider">
                      {t.expectedLift}
                    </span>
                    <span className="text-xs font-bold text-[#FFD700] font-mono">
                      {service.metrics.avgBoost}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveModalService(service)}
                      className="px-3 py-1.5 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-colors cursor-pointer"
                    >
                      {t.detailsBtn}
                    </button>
                    <button
                      onClick={() => onOpenProposal(currentName)}
                      className="px-3.5 py-1.5 text-xs font-bold text-black bg-gradient-to-r from-[#FFD700] to-[#FF9900] hover:brightness-110 rounded-lg shadow-sm transition-all cursor-pointer whitespace-nowrap"
                    >
                      {t.selectBtn}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty Search Fallback */}
        {filteredServices.length === 0 && (
          <div className="py-16 text-center rounded-2xl border border-neutral-800 bg-neutral-900/30">
            <p className="text-sm text-neutral-400">
              {t.noResults}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-3 text-xs text-[#FFD700] underline cursor-pointer"
            >
              {t.resetFilters}
            </button>
          </div>
        )}
      </div>

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={activeModalService}
        onClose={() => setActiveModalService(null)}
        onBookService={(serviceName) => {
          onOpenProposal(serviceName);
        }}
      />
    </section>
  );
};
