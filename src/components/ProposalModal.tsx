import React, { useState, useEffect } from 'react';
import { X, CheckCircle, MessageSquare, Send, Sparkles, PhoneCall } from 'lucide-react';
import { SERVICES_DATA } from '../data/marketingData.ts';

interface ProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedService?: string;
  initialNotes?: string;
}

export const ProposalModal: React.FC<ProposalModalProps> = ({
  isOpen,
  onClose,
  preSelectedService = '',
  initialNotes = '',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    email: '',
    phone: '',
    service: preSelectedService || 'Digital Marketing',
    budget: '$2,500 – $5,000 / mo',
    notes: initialNotes || '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (preSelectedService) {
      setFormData((prev) => ({ ...prev, service: preSelectedService }));
    }
    if (initialNotes) {
      setFormData((prev) => ({ ...prev, notes: initialNotes }));
    }
  }, [preSelectedService, initialNotes]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setError('Please provide your name, valid email, and contact number.');
      return;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  const whatsappMessage = encodeURIComponent(
    `Hello VANDU DIGITAL ADS Team,\nI would like to request a proposal for ${formData.service}.\nBrand: ${formData.brand || 'N/A'}\nName: ${formData.name}\nBudget: ${formData.budget}`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in">
      <div
        className="relative w-full max-w-xl bg-[#0c0c12] border border-[#FFD700]/30 rounded-2xl p-6 sm:p-8 shadow-[0_0_60px_rgba(255,215,0,0.18)] overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Metallic Gold Border Accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-full transition-colors cursor-pointer"
          aria-label="Close Proposal Form"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="space-y-1 pr-6 mb-6">
              <span className="text-[11px] font-mono tracking-widest uppercase text-[#FFD700]">
                Direct Discovery Request
              </span>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
                Request a Custom Proposal
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 font-sans">
                Tell us about your brand goals. Our strategists will prepare a custom campaign 
                growth roadmap within 24 hours.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-950/50 border border-red-500/40 text-xs text-red-300">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rahul Nair"
                    className="w-full px-3.5 py-2.5 bg-neutral-900/90 border border-neutral-800 focus:border-[#FFD700]/60 rounded-xl text-xs sm:text-sm text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Brand / Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="e.g. Zenith Jewels"
                    className="w-full px-3.5 py-2.5 bg-neutral-900/90 border border-neutral-800 focus:border-[#FFD700]/60 rounded-xl text-xs sm:text-sm text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="rahul@company.com"
                    className="w-full px-3.5 py-2.5 bg-neutral-900/90 border border-neutral-800 focus:border-[#FFD700]/60 rounded-xl text-xs sm:text-sm text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 bg-neutral-900/90 border border-neutral-800 focus:border-[#FFD700]/60 rounded-xl text-xs sm:text-sm text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Primary Service Focus
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-neutral-900/90 border border-neutral-800 focus:border-[#FFD700]/60 rounded-xl text-xs sm:text-sm text-white focus:outline-none"
                  >
                    {SERVICES_DATA.map((s) => (
                      <option key={s.id} value={s.name} className="bg-neutral-900 text-white">
                        {s.name}
                      </option>
                    ))}
                    <option value="Full Comprehensive Suite" className="bg-neutral-900 text-white">
                      Full Comprehensive Suite
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Target Monthly Budget
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-neutral-900/90 border border-neutral-800 focus:border-[#FFD700]/60 rounded-xl text-xs sm:text-sm text-white focus:outline-none"
                  >
                    <option value="$500 – $1,500 / mo">$500 – $1,500 / mo</option>
                    <option value="$1,500 – $3,000 / mo">$1,500 – $3,000 / mo</option>
                    <option value="$3,000 – $7,500 / mo">$3,000 – $7,500 / mo</option>
                    <option value="$7,500 – $15,000+ / mo">$7,500 – $15,000+ / mo</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Project Goals & Notes
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Share any specific goals, target audience, timeline, or current challenges..."
                  className="w-full px-3.5 py-2.5 bg-neutral-900/90 border border-neutral-800 focus:border-[#FFD700]/60 rounded-xl text-xs sm:text-sm text-white focus:outline-none resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-black bg-gradient-to-r from-[#FFE57F] via-[#FFD700] to-[#FF9900] hover:brightness-110 active:scale-98 transition-all shadow-[0_0_20px_rgba(255,215,0,0.35)] cursor-pointer"
                >
                  Submit Proposal Request
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="py-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-[#FFD700]/15 border border-[#FFD700] flex items-center justify-center mx-auto text-[#FFD700]">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="font-cinzel text-2xl font-bold text-white">
                Proposal Request Received!
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto">
                Thank you, <strong className="text-white">{formData.name}</strong>. Our senior marketing 
                director has been dispatched to review your request for{' '}
                <strong className="text-[#FFD700]">{formData.service}</strong>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-900/70 border border-neutral-800 max-w-sm mx-auto text-left text-xs space-y-1">
              <div className="text-neutral-400">Confirmation Code: <span className="font-mono text-white">VANDU-{Math.floor(100000 + Math.random() * 900000)}</span></div>
              <div className="text-neutral-400">Expected Response: <span className="text-[#FFD700] font-semibold">Under 4 Hours</span></div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Instant Connect via WhatsApp</span>
              </a>

              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold text-neutral-300 bg-neutral-900 hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
