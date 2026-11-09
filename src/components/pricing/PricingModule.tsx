import React from 'react';
import { usePricing, PricingTab } from '../../context/PricingContext.tsx';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { TRANSLATIONS } from '../../i18n/translations.ts';
import { IndividualServicesView } from './IndividualServicesView.tsx';
import { MonthlyPackagesView } from './MonthlyPackagesView.tsx';
import { SpecialOffersView } from './SpecialOffersView.tsx';
import { PriceCalculatorView } from './PriceCalculatorView.tsx';
import { CustomerEnquiryView } from './CustomerEnquiryView.tsx';
import { AdminPriceManager } from './AdminPriceManager.tsx';
import {
  Tag,
  Layers,
  Percent,
  Calculator,
  MessageSquare,
  Lock,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';

export const PricingModule: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    setIsAdminModalOpen,
    selectedItemsList,
    selectedPackageId,
    subtotal,
  } = usePricing();

  const { language, isML } = useLanguage();
  const t = TRANSLATIONS[language].pricing;

  const totalCartCount = selectedItemsList.length + (selectedPackageId ? 1 : 0);

  const tabs: { id: PricingTab; label: string; icon: React.ElementType; badge?: string }[] = [
    {
      id: 'services',
      label: t.tabs.services,
      icon: Tag,
    },
    {
      id: 'packages',
      label: t.tabs.packages,
      icon: Layers,
      badge: 'Popular',
    },
    {
      id: 'offers',
      label: t.tabs.offers,
      icon: Percent,
      badge: 'Special',
    },
    {
      id: 'calculator',
      label: t.tabs.calculator,
      icon: Calculator,
    },
    {
      id: 'enquiry',
      label: t.tabs.enquiry,
      icon: MessageSquare,
      badge: totalCartCount > 0 ? `${totalCartCount}` : undefined,
    },
  ];

  return (
    <section id="pricing" className="py-20 md:py-28 relative bg-[#050508] border-t border-neutral-900">
      {/* Background Ambient Glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] pointer-events-none rounded-full blur-[150px] -z-10 opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, rgba(255, 153, 0, 0.1) 50%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="text-xs font-bold uppercase tracking-widest text-[#FFD700] flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>{t.badge}</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-black text-white">
            {t.headline} <br />
            <span className="gold-gradient-text-bright">{t.headlineGradient}</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 font-sans">
            {t.subtitle}
          </p>
        </div>

        {/* 5-Tab Navigation Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 p-1.5 bg-neutral-900/70 border border-neutral-800/90 rounded-2xl max-w-4xl mx-auto shadow-lg backdrop-blur-md">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer whitespace-nowrap relative ${
                  isActive
                    ? 'bg-gradient-to-r from-[#FFE57F] via-[#FFD700] to-[#FF9900] text-black shadow-[0_0_18px_rgba(255,215,0,0.3)]'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-[#FFD700]'}`} />
                <span>{tab.label}</span>

                {tab.badge && (
                  <span
                    className={`ml-1 px-1.5 py-0.2 rounded-full text-[9px] font-mono font-black ${
                      isActive
                        ? 'bg-black text-[#FFD700]'
                        : 'bg-[#FFD700]/20 text-[#FFD700]'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Tab View Rendering */}
        <div className="min-h-[500px]">
          {activeTab === 'services' && <IndividualServicesView />}
          {activeTab === 'packages' && <MonthlyPackagesView />}
          {activeTab === 'offers' && <SpecialOffersView />}
          {activeTab === 'calculator' && <PriceCalculatorView />}
          {activeTab === 'enquiry' && <CustomerEnquiryView />}
        </div>

        {/* Bottom Bar: Admin Portal Discreet Trigger */}
        <div className="mt-16 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[#FFD700]">VANDU DIGITAL ADS</span>
            <span>&bull;</span>
            <span>{isML ? 'സുതാര്യമായ നിരക്കുകൾ' : 'Direct Verified Pricing in Indian Rupees (₹)'}</span>
          </div>

          <button
            onClick={() => setIsAdminModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 hover:border-[#FFD700]/40 text-neutral-400 hover:text-[#FFD700] transition-all cursor-pointer text-xs font-mono"
          >
            <Lock className="w-3.5 h-3.5 text-[#FFD700]" />
            <span>{t.adminManageBtn}</span>
          </button>
        </div>
      </div>

      {/* Admin Price Manager Modal */}
      <AdminPriceManager />
    </section>
  );
};
