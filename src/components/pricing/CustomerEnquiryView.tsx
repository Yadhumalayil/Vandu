import React, { useState } from 'react';
import { usePricing } from '../../context/PricingContext.tsx';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { TRANSLATIONS } from '../../i18n/translations.ts';
import {
  MessageSquare,
  Send,
  CheckCircle2,
  Sparkles,
  Phone,
  Building,
  User,
  ShoppingBag,
  Layers,
  FileText,
} from 'lucide-react';

export const CustomerEnquiryView: React.FC = () => {
  const {
    services,
    packages,
    selectedServices,
    selectedPackageId,
    selectedOfferId,
    offers,
    selectedItemsList,
    subtotal,
    discountAmount,
    finalTotal,
    formatINR,
    clearSelections,
  } = usePricing();

  const { language, isML } = useLanguage();
  const t = TRANSLATIONS[language].pricing.enquiry;

  const [customerName, setCustomerName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const selectedPackage = packages.find((p) => p.id === selectedPackageId);
  const activeOffer = offers.find((o) => o.id === selectedOfferId);

  // Total quantity calculation
  const totalQuantity =
    selectedItemsList.reduce((sum, item) => sum + item.quantity, 0) + (selectedPackage ? 1 : 0);

  // Generate structured WhatsApp enquiry message
  const generateWhatsAppMessage = () => {
    let msg = isML
      ? `*VANDU DIGITAL ADS — പുതിയ ഓർഡർ & എൻക്വയറി*\n`
      : `*VANDU DIGITAL ADS — New Order & Enquiry*\n`;

    msg += `--------------------------------\n`;
    if (customerName) msg += `${isML ? 'പേര്' : 'Name'}: ${customerName}\n`;
    if (businessName) msg += `${isML ? 'സ്ഥാപനം' : 'Business'}: ${businessName}\n`;
    if (phoneNumber) msg += `${isML ? 'ഫോൺ' : 'Phone'}: ${phoneNumber}\n`;

    msg += `\n*${isML ? 'ഓർഡർ വിശദാംശങ്ങൾ:' : 'Selected Deliverables:'}*\n`;
    if (selectedPackage) {
      msg += `• ${isML ? 'പാക്കേജ്' : 'Package'}: ${selectedPackage.name} (${formatINR(selectedPackage.price)}/mo)\n`;
    }
    if (selectedItemsList.length > 0) {
      selectedItemsList.forEach((item) => {
        msg += `• ${item.name} x ${item.quantity} = ${formatINR(item.unitPrice * item.quantity)}\n`;
      });
    }
    if (!selectedPackage && selectedItemsList.length === 0) {
      msg += `• General Custom Digital Marketing Inquiry\n`;
    }

    if (activeOffer) {
      msg += `• ${isML ? 'ബാധകമായ ഓഫർ' : 'Applied Offer'}: ${activeOffer.title} (${activeOffer.code})\n`;
    }

    msg += `\n*${isML ? 'ആകെ തുക' : 'Calculated Total'}*: ${formatINR(finalTotal || subtotal)}\n`;
    if (discountAmount > 0) {
      msg += `*${isML ? 'ലഭിച്ച ഇളവ്' : 'Savings'}*: ${formatINR(discountAmount)}\n`;
    }

    if (customMessage) {
      msg += `\n*${isML ? 'കുറിപ്പുകൾ' : 'Notes'}*: ${customMessage}\n`;
    }
    msg += `--------------------------------\n`;
    msg += `Sent via VANDU DIGITAL ADS Platform`;

    return `https://wa.me/?text=${encodeURIComponent(msg)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phoneNumber.trim()) {
      setErrorMsg(
        isML
          ? 'ദയവായി നിങ്ങളുടെ പേരും ഫോൺ നമ്പറും നൽകുക.'
          : 'Please enter your name and phone number.'
      );
      return;
    }
    setErrorMsg('');
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    clearSelections();
    setCustomerName('');
    setBusinessName('');
    setPhoneNumber('');
    setCustomMessage('');
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {!submitted ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Column */}
          <div className="lg:col-span-7 glass-gold-card rounded-3xl p-6 sm:p-8 border border-neutral-800">
            <div className="mb-6">
              <h3 className="font-cinzel text-2xl font-bold text-white">{t.title}</h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1.5 font-sans leading-relaxed">
                {t.subtitle}
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/50 border border-red-500/40 text-xs text-red-300">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Customer Name */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#FFD700]" />
                  <span>{t.nameLabel}</span>
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder={t.namePlaceholder}
                  className="w-full px-3.5 py-2.5 bg-neutral-900/90 border border-neutral-800 focus:border-[#FFD700]/60 rounded-xl text-xs sm:text-sm text-white focus:outline-none transition-colors"
                />
              </div>

              {/* Business Name */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-[#FFD700]" />
                  <span>{t.bizLabel}</span>
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder={t.bizPlaceholder}
                  className="w-full px-3.5 py-2.5 bg-neutral-900/90 border border-neutral-800 focus:border-[#FFD700]/60 rounded-xl text-xs sm:text-sm text-white focus:outline-none transition-colors"
                />
              </div>

              {/* Phone / WhatsApp */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#FFD700]" />
                  <span>{t.phoneLabel}</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder={t.phonePlaceholder}
                  className="w-full px-3.5 py-2.5 bg-neutral-900/90 border border-neutral-800 focus:border-[#FFD700]/60 rounded-xl text-xs sm:text-sm text-white focus:outline-none transition-colors"
                />
              </div>

              {/* Notes / Message */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#FFD700]" />
                  <span>{t.messageLabel}</span>
                </label>
                <textarea
                  rows={3}
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder={t.messagePlaceholder}
                  className="w-full px-3.5 py-2.5 bg-neutral-900/90 border border-neutral-800 focus:border-[#FFD700]/60 rounded-xl text-xs sm:text-sm text-white focus:outline-none resize-none transition-colors"
                />
              </div>

              {/* Submit & WhatsApp buttons */}
              <div className="pt-3 space-y-2.5">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-black bg-gradient-to-r from-[#FFE57F] via-[#FFD700] to-[#FF9900] hover:brightness-110 active:scale-98 transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)] cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.submitDirect}</span>
                </button>

                <a
                  href={generateWhatsAppMessage()}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-6 rounded-xl font-bold text-xs sm:text-sm text-white bg-emerald-700 hover:bg-emerald-600 active:scale-98 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-200" />
                  <span>{t.sendWhatsApp}</span>
                </a>
              </div>
            </form>
          </div>

          {/* Right Column: Dynamic Order Summary Box */}
          <div className="lg:col-span-5 glass-gold-card rounded-3xl p-6 sm:p-7 border border-[#FFD700]/30 shadow-lg space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-neutral-800">
              <ShoppingBag className="w-5 h-5 text-[#FFD700]" />
              <h4 className="font-cinzel text-lg font-bold text-white">{t.orderSummary}</h4>
            </div>

            {/* Selected Package */}
            {selectedPackage && (
              <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                  {t.selectedPackageLabel}
                </span>
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <span>{selectedPackage.name}</span>
                  <span className="font-mono text-[#FFD700]">
                    {formatINR(selectedPackage.price)}
                  </span>
                </div>
              </div>
            )}

            {/* Selected Services */}
            {selectedItemsList.length > 0 && (
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                  {t.selectedServicesLabel}
                </span>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {selectedItemsList.map((item) => (
                    <div
                      key={item.serviceId}
                      className="flex items-center justify-between text-xs text-neutral-300 py-1 border-b border-neutral-850"
                    >
                      <span className="truncate pr-2">
                        {item.name} &times; {item.quantity}
                      </span>
                      <span className="font-mono font-semibold shrink-0">
                        {formatINR(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!selectedPackage && selectedItemsList.length === 0 && (
              <div className="p-4 rounded-xl bg-neutral-900/50 border border-dashed border-neutral-800 text-center text-xs text-neutral-400">
                {isML
                  ? 'നിങ്ങൾ വ്യക്തിഗത സർവീസുകളോ പാക്കേജോ തിരഞ്ഞെടുത്തിട്ടില്ല. ജനറൽ എൻക്വയറിയായി സമർപ്പിക്കാവുന്നതാണ്.'
                  : 'No specific items preselected. Your enquiry will be treated as a comprehensive custom consultation.'}
              </div>
            )}

            {/* Total breakdown */}
            <div className="pt-3 border-t border-neutral-800 space-y-2 text-xs">
              <div className="flex items-center justify-between text-neutral-400">
                <span>{t.quantityLabel}:</span>
                <span className="font-mono text-white font-bold">{totalQuantity}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex items-center justify-between text-emerald-400 font-semibold">
                  <span>Discount ({activeOffer?.code}):</span>
                  <span className="font-mono">-{formatINR(discountAmount)}</span>
                </div>
              )}

              <div className="pt-2 border-t border-neutral-800/80 flex items-baseline justify-between text-white">
                <span className="font-bold text-sm">Estimated Total:</span>
                <span className="font-mono text-2xl font-black gold-gradient-text-bright">
                  {formatINR(finalTotal || subtotal)}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Confirmation State */
        <div className="glass-gold-card rounded-3xl p-8 sm:p-12 text-center space-y-6 border border-[#FFD700]/40">
          <div className="w-16 h-16 rounded-full bg-[#FFD700]/15 border border-[#FFD700] flex items-center justify-center mx-auto text-[#FFD700]">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h3 className="font-cinzel text-2xl sm:text-3xl font-black text-white">
              {t.successTitle}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
              {t.successSubtitle}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800 max-w-md mx-auto text-left text-xs space-y-1.5 font-mono">
            <div className="text-neutral-400">
              Client: <span className="text-white font-bold">{customerName}</span>
            </div>
            {businessName && (
              <div className="text-neutral-400">
                Brand: <span className="text-white">{businessName}</span>
              </div>
            )}
            <div className="text-neutral-400">
              Ticket Ref: <span className="text-[#FFD700]">VANDU-PRC-{Math.floor(100000 + Math.random() * 900000)}</span>
            </div>
            <div className="text-neutral-400">
              Quoted Value: <span className="text-[#FFD700] font-bold">{formatINR(finalTotal || subtotal)}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href={generateWhatsAppMessage()}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t.sendWhatsApp}</span>
            </a>

            <button
              onClick={handleReset}
              className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-semibold text-neutral-300 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 transition-colors cursor-pointer"
            >
              {isML ? 'മറ്റൊരു ഓർഡർ ചെയ്യുക' : 'Place Another Enquiry'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
