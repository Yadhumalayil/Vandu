import React from 'react';
import { usePricing } from '../../context/PricingContext.tsx';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { TRANSLATIONS } from '../../i18n/translations.ts';
import {
  Calculator,
  Plus,
  Minus,
  Trash2,
  Tag,
  Check,
  ArrowRight,
  Sparkles,
  Info,
} from 'lucide-react';

export const PriceCalculatorView: React.FC = () => {
  const {
    services,
    packages,
    offers,
    selectedServices,
    setServiceQuantity,
    incrementService,
    decrementService,
    selectedPackageId,
    setSelectedPackageId,
    selectedOfferId,
    setSelectedOfferId,
    clearSelections,
    subtotal,
    discountAmount,
    finalTotal,
    activeOffer,
    formatINR,
    setActiveTab,
  } = usePricing();

  const { language, isML } = useLanguage();
  const t = TRANSLATIONS[language].pricing.calculator;

  const enabledServices = services.filter((s) => s.enabled);
  const enabledPackages = packages.filter((p) => p.enabled);
  const enabledOffers = offers.filter((o) => o.enabled);

  const selectedPackage = packages.find((p) => p.id === selectedPackageId);

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Selectors (Services, Quantities, Package, Offers) */}
        <div className="lg:col-span-7 space-y-8 glass-gold-card rounded-3xl p-6 sm:p-8 border border-neutral-800">
          {/* Section 1: Monthly Retainer Package Selector */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#FFD700] flex items-center gap-1.5">
                <span>1. {t.monthlyTier}</span>
              </label>
              {selectedPackageId && (
                <button
                  onClick={() => setSelectedPackageId(null)}
                  className="text-[11px] text-neutral-400 hover:text-white underline cursor-pointer"
                >
                  {isML ? 'പാക്കേജ് മാറ്റുക' : 'Remove package'}
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {enabledPackages.map((pkg) => {
                const isSelected = selectedPackageId === pkg.id;
                const pkgName = isML && pkg.nameML ? pkg.nameML : pkg.name;

                return (
                  <button
                    key={pkg.id}
                    onClick={() => setSelectedPackageId(isSelected ? null : pkg.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative ${
                      isSelected
                        ? 'bg-[#FFD700]/15 border-[#FFD700] shadow-[0_0_15px_rgba(255,215,0,0.2)]'
                        : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    {pkg.recommended && (
                      <span className="absolute -top-2.5 right-2 px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#FFD700] text-black">
                        BEST
                      </span>
                    )}
                    <div className="text-xs font-bold text-white">{pkgName}</div>
                    <div className="text-sm font-mono font-bold gold-gradient-text-bright mt-1">
                      {formatINR(pkg.price)}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Individual Services & Quantity Counters */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#FFD700] mb-3">
              2. {t.serviceSelect}
            </label>

            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {enabledServices.map((service) => {
                const currentQty = selectedServices[service.id] || 0;
                const serviceName = isML && service.nameML ? service.nameML : service.name;

                return (
                  <div
                    key={service.id}
                    className={`p-3 sm:p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
                      currentQty > 0
                        ? 'bg-neutral-900/90 border-[#FFD700]/50'
                        : 'bg-neutral-900/40 border-neutral-800/80 hover:border-neutral-700'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="text-xs sm:text-sm font-bold text-white truncate">
                        {serviceName}
                      </div>
                      <div className="text-[11px] font-mono text-neutral-400 mt-0.5">
                        {formatINR(service.price)} {isML ? 'ഓരോന്നിനും' : '/ item'}
                      </div>
                    </div>

                    {/* Quantity Selector Stepper */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => decrementService(service.id)}
                        disabled={currentQty === 0}
                        aria-label={`Decrease ${serviceName}`}
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                          currentQty > 0
                            ? 'bg-neutral-800 hover:bg-neutral-700 text-white'
                            : 'bg-neutral-900 text-neutral-600 cursor-not-allowed'
                        }`}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>

                      <span className="w-8 text-center font-mono text-sm font-bold text-[#FFD700]">
                        {currentQty}
                      </span>

                      <button
                        onClick={() => incrementService(service.id)}
                        aria-label={`Increase ${serviceName}`}
                        className="w-7 h-7 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 3: Promotional Offer Dropdown */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#FFD700] mb-2.5">
              3. {t.offersLabel}
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                onClick={() => setSelectedOfferId(null)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer text-xs ${
                  selectedOfferId === null
                    ? 'bg-[#FFD700]/15 border-[#FFD700] text-white font-bold'
                    : 'bg-neutral-900/50 border-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                <span>{t.noOffer}</span>
              </button>

              {enabledOffers.map((offer) => {
                const isSelected = selectedOfferId === offer.id;
                const offerTitle = isML && offer.titleML ? offer.titleML : offer.title;

                return (
                  <button
                    key={offer.id}
                    onClick={() => setSelectedOfferId(offer.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#FFD700]/15 border-[#FFD700] text-white font-bold shadow-sm'
                        : 'bg-neutral-900/50 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-semibold text-white">{offerTitle}</div>
                      <div className="text-[10px] font-mono text-[#FFD700] mt-0.5">
                        Code: {offer.code}
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-[#FFD700]" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Live Price Cockpit & Total Summary */}
        <div className="lg:col-span-5 sticky top-24 glass-gold-card rounded-3xl p-6 sm:p-8 border border-[#FFD700]/30 shadow-[0_15px_45px_rgba(0,0,0,0.9)] space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#FFD700]" />
              <h3 className="font-cinzel text-xl font-bold text-white">
                {isML ? 'ലൈവ് കണക്കുകൂട്ടൽ' : 'Live Computation'}
              </h3>
            </div>
            <button
              onClick={clearSelections}
              className="text-[11px] text-neutral-400 hover:text-red-400 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3 h-3" />
              <span>{isML ? 'റീസെറ്റ്' : 'Reset'}</span>
            </button>
          </div>

          {/* Line items breakdown */}
          <div className="space-y-3 text-xs">
            {/* Selected Package line */}
            {selectedPackage && (
              <div className="p-3 rounded-xl bg-neutral-900/70 border border-neutral-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white">
                    {isML && selectedPackage.nameML ? selectedPackage.nameML : selectedPackage.name}
                  </span>
                  <span className="text-[10px] text-neutral-400 block font-mono">
                    {isML ? 'പ്രതിമാസ പാക്കേജ്' : 'Monthly Tier'}
                  </span>
                </div>
                <span className="font-mono font-bold text-white">
                  {formatINR(selectedPackage.price)}
                </span>
              </div>
            )}

            {/* Individual services count */}
            {Object.keys(selectedServices).length > 0 ? (
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {Object.entries(selectedServices).map(([id, qty]) => {
                  const s = services.find((item) => item.id === id);
                  if (!s || qty <= 0) return null;
                  const itemTotal = s.price * qty;

                  return (
                    <div
                      key={id}
                      className="flex items-center justify-between text-neutral-300 py-1 border-b border-neutral-850"
                    >
                      <span className="truncate pr-2">
                        {isML && s.nameML ? s.nameML : s.name} &times; {qty}
                      </span>
                      <span className="font-mono font-semibold text-neutral-200 shrink-0">
                        {formatINR(itemTotal)}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              !selectedPackage && (
                <div className="py-6 text-center text-neutral-500 font-sans italic">
                  {isML
                    ? 'ഒരു സർവീസോ പാക്കേജോ തിരഞ്ഞെടുക്കുക'
                    : 'Select services or a package from the left to compute total.'}
                </div>
              )
            )}
          </div>

          {/* Pricing Totals Box */}
          <div className="pt-4 border-t border-neutral-800 space-y-2.5">
            <div className="flex items-center justify-between text-xs text-neutral-400">
              <span>{t.subtotal}:</span>
              <span className="font-mono text-sm text-neutral-200">{formatINR(subtotal)}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex items-center justify-between text-xs text-emerald-400 font-semibold">
                <span className="flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" />
                  <span>
                    {t.discount} ({activeOffer?.code}):
                  </span>
                </span>
                <span className="font-mono">-{formatINR(discountAmount)}</span>
              </div>
            )}

            {/* Final Big Total */}
            <div className="pt-3 border-t border-neutral-800/80 flex items-baseline justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#FFD700] block">
                  {t.finalTotal}
                </span>
                {discountAmount > 0 && (
                  <span className="text-[11px] text-emerald-400 font-bold">
                    {t.youSave}: {formatINR(discountAmount)}!
                  </span>
                )}
              </div>
              <div className="font-mono text-3xl sm:text-4xl font-black gold-gradient-text-bright">
                {formatINR(finalTotal)}
              </div>
            </div>
          </div>

          {/* Proceed to Enquiry Button */}
          <div className="pt-2">
            <button
              onClick={() => setActiveTab('enquiry')}
              disabled={subtotal === 0}
              className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                subtotal > 0
                  ? 'text-black bg-gradient-to-r from-[#FFE57F] via-[#FFD700] to-[#FF9900] hover:brightness-110 shadow-[0_0_20px_rgba(255,215,0,0.35)] active:scale-98'
                  : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
              }`}
            >
              <span>{t.proceedToEnquiry}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
