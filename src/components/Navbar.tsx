import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo3D } from './Logo3D.tsx';
import { useLanguage } from '../context/LanguageContext.tsx';
import { TRANSLATIONS } from '../i18n/translations.ts';
import { Sparkles, Menu, X, Play, ArrowRight, MessageCircle, ChevronRight, Globe } from 'lucide-react';

interface NavbarProps {
  onOpenProposal: (serviceName?: string) => void;
  onReplaySplash: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenProposal,
  onReplaySplash,
  activeSection,
  onNavigate,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { language, setLanguage, isML } = useLanguage();
  const t = TRANSLATIONS[language].nav;

  const navItems = [
    {
      id: 'overview',
      index: '01',
      label: t.overview,
      desc: isML ? 'ലോഗോയും പ്രധാന വിവരങ്ങളും' : 'Brand core & interactive fly stage',
    },
    {
      id: 'services',
      index: '02',
      label: t.services,
      desc: isML ? '11 പ്രധാന ഡിജിറ്റൽ സർവീസുകൾ' : 'Social, performance, video & branding',
    },
    {
      id: 'pricing',
      index: '03',
      label: t.pricing,
      desc: isML ? 'വ്യക്തിഗത സർവീസുകൾ, പാക്കേജുകൾ & ഓഫറുകൾ' : 'Individual rates, packages & special offers',
    },
    {
      id: 'architect',
      index: '04',
      label: t.architect,
      desc: isML ? 'ബജറ്റും പ്രതീക്ഷിക്കുന്ന റീച്ചും' : 'Model reach, clicks & ROAS yield',
    },
    {
      id: 'case-studies',
      index: '05',
      label: t.caseStudies,
      desc: isML ? 'പരിശോധിച്ച വിജയ കണക്കുകൾ' : 'Verified metrics & animated ROI counters',
    },
    {
      id: 'client-success',
      index: '06',
      label: t.clientSuccess,
      desc: isML ? 'ക്ലയന്റുകളുടെ അനുഭവ സാക്ഷ്യങ്ങൾ' : 'Testimonials slider & 3D client cards',
    },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setDrawerOpen(false);
  };

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && drawerOpen) {
        setDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [drawerOpen]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  const whatsappMessage = encodeURIComponent(
    isML
      ? 'നമസ്കാരം VANDU DIGITAL ADS! എന്റെ ബ്രാൻഡ് വളർത്തുന്നതിനായി മാർക്കറ്റിംഗ് സർവീസുകളെക്കുറിച്ച് അറിയാൻ ആഗ്രഹിക്കുന്നു.'
      : 'Hi VANDU DIGITAL ADS! I want to discuss growing my brand with your marketing services.'
  );

  return (
    <header className="sticky top-0 z-40 w-full glass-header backdrop-blur-xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-3 sm:gap-6">
        {/* Zone 1: Brand Wordmark with 3D Logo (Primary Focal Anchor) */}
        <div
          onClick={() => handleLinkClick('overview')}
          className="flex items-center gap-2.5 sm:gap-3.5 cursor-pointer whitespace-nowrap shrink-0 group select-none"
        >
          {/* Mini 3D Bee Logo */}
          <Logo3D size="sm" interactive={true} floating={false} withGlow={true} />

          <div className="flex flex-col">
            <span className="font-cinzel text-lg sm:text-2xl font-black tracking-wider gold-gradient-text-bright group-hover:scale-102 transition-transform duration-200">
              VANDU
            </span>
            <span className="font-outfit text-[9px] sm:text-xs font-bold tracking-[0.25em] uppercase text-white/90 -mt-0.5 sm:-mt-1">
              {t.brandSub}
            </span>
          </div>
        </div>

        {/* Zone 2: Desktop Quick Links (Hidden on small screens) */}
        <nav className="hidden xl:flex items-center gap-6 text-xs sm:text-sm font-medium text-neutral-300">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`transition-colors whitespace-nowrap shrink-0 relative py-1 cursor-pointer ${
                  isActive
                    ? 'text-[#FFD700] font-semibold'
                    : 'text-neutral-300 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#FF9900] to-[#FFD700] rounded-full shadow-[0_0_8px_#FFD700]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Language Switcher, Primary CTA & Menu Trigger */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Language Switcher Toggle in Navbar */}
          <div className="flex items-center p-0.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-semibold">
            <button
              onClick={() => setLanguage('en')}
              title="English"
              className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-gradient-to-r from-[#FFD700] to-[#FF9900] text-black font-bold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('ml')}
              title="മലയാളം (Malayalam)"
              className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
                language === 'ml'
                  ? 'bg-gradient-to-r from-[#FFD700] to-[#FF9900] text-black font-bold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              മല
            </button>
          </div>

          {/* Primary CTA Button */}
          <button
            onClick={() => onOpenProposal()}
            className="relative group overflow-hidden px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold tracking-wide text-black bg-gradient-to-r from-[#FFE57F] via-[#FFD700] to-[#FF9900] hover:brightness-110 active:scale-98 transition-all duration-200 shadow-[0_0_18px_rgba(255,215,0,0.35)] cursor-pointer whitespace-nowrap shrink-0"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-black/80" />
              <span>{t.getProposal}</span>
            </span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          </button>

          {/* Menu Drawer Button */}
          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="Open Navigation Drawer"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-lg sm:rounded-xl text-xs font-semibold text-neutral-200 hover:text-[#FFD700] bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 hover:border-[#FFD700]/40 transition-all cursor-pointer"
          >
            <Menu className="w-4 h-4 text-[#FFD700]" />
            <span className="hidden sm:inline">{t.menu}</span>
          </button>
        </div>
      </div>

      {/* Slide-Over Menu Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setDrawerOpen(false)}
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Slide-in Drawer Container */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="absolute top-0 right-0 bottom-0 w-full max-w-sm bg-[#09090d] border-l border-[#FFD700]/25 shadow-[0_0_50px_rgba(0,0,0,0.9)] flex flex-col justify-between p-6 sm:p-8 overflow-y-auto"
            >
              {/* Drawer Header */}
              <div>
                <div className="flex items-center justify-between pb-5 border-b border-neutral-800">
                  <div className="flex items-center gap-3">
                    <Logo3D size="sm" interactive={false} floating={false} withGlow={true} />
                    <div>
                      <span className="font-cinzel text-lg font-black gold-gradient-text-bright tracking-wider">
                        VANDU
                      </span>
                      <div className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">
                        {t.menuTitle}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setDrawerOpen(false)}
                    className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800/80 transition-colors cursor-pointer"
                    aria-label="Close Menu Drawer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Language Switcher inside Drawer */}
                <div className="mt-5 p-3 rounded-xl bg-neutral-900/60 border border-neutral-800/80">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-[#FFD700]" />
                      <span>{isML ? 'ഭാഷ തിരഞ്ഞെടുക്കുക' : 'Select Language'}</span>
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500 uppercase">
                      {isML ? 'മലയാളം' : 'English'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setLanguage('en')}
                      className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        language === 'en'
                          ? 'bg-gradient-to-r from-[#FFD700] to-[#FF9900] text-black font-bold shadow-sm'
                          : 'bg-neutral-900 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <span>English</span>
                    </button>

                    <button
                      onClick={() => setLanguage('ml')}
                      className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        language === 'ml'
                          ? 'bg-gradient-to-r from-[#FFD700] to-[#FF9900] text-black font-bold shadow-sm'
                          : 'bg-neutral-900 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <span>മലയാളം</span>
                    </button>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="mt-5 space-y-2">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#FFD700] mb-2.5">
                    {isML ? 'പേജുകൾ' : 'Explore Platform'}
                  </div>

                  {navItems.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleLinkClick(item.id)}
                        className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
                          isActive
                            ? 'bg-[#FFD700]/10 border-[#FFD700]/50 text-white shadow-sm'
                            : 'bg-neutral-900/40 border-neutral-800/80 text-neutral-300 hover:text-white hover:bg-neutral-800/60 hover:border-neutral-700'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[11px] text-[#FFD700]">
                              {item.index}
                            </span>
                            <span className="text-sm font-semibold">{item.label}</span>
                          </div>
                          <p className="text-[11px] text-neutral-400 mt-0.5 ml-5">
                            {item.desc}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-[#FFD700] group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    );
                  })}
                </div>

                {/* Quick Actions in Drawer */}
                <div className="mt-5 pt-5 border-t border-neutral-800/80 space-y-2.5">
                  <button
                    onClick={() => {
                      setDrawerOpen(false);
                      onReplaySplash();
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-neutral-900/60 hover:bg-neutral-800 border border-neutral-800 hover:border-[#FFD700]/40 text-xs font-semibold text-neutral-200 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <Play className="w-4 h-4 text-[#FFD700]" />
                      <span>{t.replayIntro}</span>
                    </div>
                  </button>

                  <a
                    href={`https://wa.me/?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-800/40 text-xs font-semibold text-emerald-300 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <MessageCircle className="w-4 h-4 text-emerald-400" />
                      <span>{t.whatsappSupport}</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase">
                      Online
                    </span>
                  </a>
                </div>
              </div>

              {/* Drawer Bottom CTA */}
              <div className="pt-5 border-t border-neutral-800 mt-5 space-y-3">
                <button
                  onClick={() => {
                    setDrawerOpen(false);
                    onOpenProposal();
                  }}
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-black bg-gradient-to-r from-[#FFE57F] via-[#FFD700] to-[#FF9900] hover:brightness-110 active:scale-98 transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)] cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>{t.requestProposal}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-center text-[10px] text-neutral-500 font-mono">
                  &copy; {new Date().getFullYear()} VANDU DIGITAL ADS
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};
