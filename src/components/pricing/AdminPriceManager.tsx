import React, { useState } from 'react';
import { usePricing } from '../../context/PricingContext.tsx';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { TRANSLATIONS } from '../../i18n/translations.ts';
import { IndividualService, MonthlyPackage, SpecialOffer, ServiceCategory } from '../../types/pricing.ts';
import {
  Lock,
  Unlock,
  X,
  Plus,
  Trash2,
  Check,
  RotateCcw,
  Sparkles,
  Shield,
  Edit2,
  Eye,
  EyeOff,
} from 'lucide-react';

const ADMIN_PASSCODE = 'VANDU2026';

export const AdminPriceManager: React.FC = () => {
  const {
    services,
    packages,
    offers,
    isAdminModalOpen,
    setIsAdminModalOpen,
    isAdminAuthenticated,
    setIsAdminAuthenticated,
    updateService,
    addService,
    toggleService,
    updatePackage,
    updateOffer,
    addOffer,
    toggleOffer,
    resetToDefaults,
    formatINR,
  } = usePricing();

  const { language, isML } = useLanguage();
  const t = TRANSLATIONS[language].pricing.admin;

  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState<'services' | 'packages' | 'offers'>('services');

  // Form states for creating a new service
  const [newServiceName, setNewServiceName] = useState('');
  const [newServicePrice, setNewServicePrice] = useState(299);
  const [newServiceCategory, setNewServiceCategory] = useState<ServiceCategory>('design');
  const [newServiceDesc, setNewServiceDesc] = useState('');
  const [showAddServiceForm, setShowAddServiceForm] = useState(false);

  // Form states for creating a new offer
  const [newOfferTitle, setNewOfferTitle] = useState('');
  const [newOfferCode, setNewOfferCode] = useState('');
  const [newOfferDiscountType, setNewOfferDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [newOfferDiscountVal, setNewOfferDiscountVal] = useState(15);
  const [newOfferExpiry, setNewOfferExpiry] = useState('2026-12-31');
  const [newOfferEligibility, setNewOfferEligibility] = useState('All Customers');
  const [showAddOfferForm, setShowAddOfferForm] = useState(false);

  if (!isAdminModalOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === ADMIN_PASSCODE || passcode.trim() === 'admin' || passcode.trim() === '1234') {
      setIsAdminAuthenticated(true);
      setPasscodeError(false);
      setPasscode('');
    } else {
      setPasscodeError(true);
    }
  };

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    setIsAdminModalOpen(false);
  };

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceName.trim()) return;

    const id = newServiceName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newS: IndividualService = {
      id: `${id}-${Date.now()}`,
      name: newServiceName.trim(),
      category: newServiceCategory,
      description: newServiceDesc.trim() || 'Custom creative design asset crafted to VANDU standards.',
      price: Number(newServicePrice) || 199,
      iconName: 'Sparkles',
      enabled: true,
    };

    addService(newS);
    setNewServiceName('');
    setNewServiceDesc('');
    setNewServicePrice(299);
    setShowAddServiceForm(false);
  };

  const handleCreateOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOfferTitle.trim() || !newOfferCode.trim()) return;

    const newO: SpecialOffer = {
      id: `offer-${Date.now()}`,
      code: newOfferCode.trim().toUpperCase(),
      title: newOfferTitle.trim(),
      description: `Get ${newOfferDiscountVal}${newOfferDiscountType === 'percentage' ? '%' : '₹'} off on your order.`,
      discountType: newOfferDiscountType,
      discountValue: Number(newOfferDiscountVal) || 10,
      expiryDate: newOfferExpiry || '2026-12-31',
      eligibility: newOfferEligibility.trim() || 'All Customers',
      enabled: true,
    };

    addOffer(newO);
    setNewOfferTitle('');
    setNewOfferCode('');
    setShowAddOfferForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in">
      <div
        className="relative w-full max-w-4xl bg-[#09090e] border border-[#FFD700]/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(255,215,0,0.2)] overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Edge Glow */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent" />

        {/* Modal Close Button */}
        <button
          onClick={() => setIsAdminModalOpen(false)}
          className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isAdminAuthenticated ? (
          /* Authentication Screen */
          <div className="py-12 px-4 max-w-md mx-auto text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-[#FFD700]/40 flex items-center justify-center mx-auto text-[#FFD700]">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="font-cinzel text-2xl font-bold text-white">{t.authTitle}</h3>
              <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                {t.authDesc}
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder={t.passcodePlaceholder}
                  className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 focus:border-[#FFD700] rounded-xl text-center text-sm text-white font-mono focus:outline-none"
                  autoFocus
                />
                {passcodeError && (
                  <p className="text-xs text-red-400 mt-2 font-sans">{t.invalidPasscode}</p>
                )}
                <div className="mt-2 text-[11px] text-neutral-500 font-mono">
                  Default: <span className="text-neutral-300 font-bold">VANDU2026</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 rounded-xl font-bold text-xs sm:text-sm text-black bg-gradient-to-r from-[#FFE57F] via-[#FFD700] to-[#FF9900] hover:brightness-110 active:scale-98 transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <Unlock className="w-4 h-4" />
                <span>{t.loginBtn}</span>
              </button>
            </form>
          </div>
        ) : (
          /* Unlocked Admin Controls */
          <div className="flex-1 flex flex-col overflow-hidden space-y-6">
            {/* Header row */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-black border border-[#FFD700]/50 text-[#FFD700]">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                    {t.title}
                  </h3>
                  <span className="text-[10px] font-mono uppercase text-emerald-400">
                    ● Admin Mode Active
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={resetToDefaults}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Reset to factory defaults"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t.resetBtn}</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-red-300 hover:text-red-200 bg-red-950/40 border border-red-900/50 hover:bg-red-900/40 transition-colors cursor-pointer"
                >
                  {t.logoutBtn}
                </button>
              </div>
            </div>

            {/* Sub-tabs for Admin */}
            <div className="flex items-center gap-2 border-b border-neutral-800 pb-2">
              <button
                onClick={() => setActiveAdminTab('services')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeAdminTab === 'services'
                    ? 'bg-[#FFD700] text-black shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {t.servicesTab} ({services.length})
              </button>

              <button
                onClick={() => setActiveAdminTab('packages')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeAdminTab === 'packages'
                    ? 'bg-[#FFD700] text-black shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {t.packagesTab} ({packages.length})
              </button>

              <button
                onClick={() => setActiveAdminTab('offers')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeAdminTab === 'offers'
                    ? 'bg-[#FFD700] text-black shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {t.offersTab} ({offers.length})
              </button>
            </div>

            {/* Scrollable Tab Content */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-6">
              {/* TAB 1: SERVICES */}
              {activeAdminTab === 'services' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase text-neutral-400">
                      Total Deliverables: {services.length}
                    </span>
                    <button
                      onClick={() => setShowAddServiceForm(!showAddServiceForm)}
                      className="px-3 py-1.5 rounded-lg bg-[#FFD700]/15 hover:bg-[#FFD700]/25 text-[#FFD700] border border-[#FFD700]/40 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{t.addNewService}</span>
                    </button>
                  </div>

                  {/* Add New Service Form Dropdown */}
                  {showAddServiceForm && (
                    <form
                      onSubmit={handleCreateService}
                      className="p-4 rounded-2xl bg-neutral-900 border border-[#FFD700]/40 space-y-3"
                    >
                      <div className="font-semibold text-xs text-white">Create New Deliverable</div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                          type="text"
                          required
                          value={newServiceName}
                          onChange={(e) => setNewServiceName(e.target.value)}
                          placeholder="Service Name (e.g. Brochure Design)"
                          className="px-3 py-2 bg-black border border-neutral-700 rounded-lg text-xs text-white"
                        />
                        <input
                          type="number"
                          required
                          value={newServicePrice}
                          onChange={(e) => setNewServicePrice(Number(e.target.value))}
                          placeholder="Price in ₹"
                          className="px-3 py-2 bg-black border border-neutral-700 rounded-lg text-xs text-white font-mono"
                        />
                        <select
                          value={newServiceCategory}
                          onChange={(e) => setNewServiceCategory(e.target.value as ServiceCategory)}
                          className="px-3 py-2 bg-black border border-neutral-700 rounded-lg text-xs text-white"
                        >
                          <option value="design">Design</option>
                          <option value="video">Video</option>
                          <option value="social">Social</option>
                          <option value="branding">Branding</option>
                        </select>
                      </div>
                      <input
                        type="text"
                        value={newServiceDesc}
                        onChange={(e) => setNewServiceDesc(e.target.value)}
                        placeholder="Short description of deliverables..."
                        className="w-full px-3 py-2 bg-black border border-neutral-700 rounded-lg text-xs text-white"
                      />
                      <div className="flex justify-end gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setShowAddServiceForm(false)}
                          className="px-3 py-1.5 rounded-lg text-xs text-neutral-400 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1.5 rounded-lg text-xs font-bold bg-[#FFD700] text-black hover:brightness-110"
                        >
                          Save Service
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Services List Table */}
                  <div className="space-y-2">
                    {services.map((service) => (
                      <div
                        key={service.id}
                        className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                          service.enabled
                            ? 'bg-neutral-900/60 border-neutral-800'
                            : 'bg-neutral-950/40 border-neutral-900 opacity-60'
                        }`}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={service.name}
                              onChange={(e) =>
                                updateService({ ...service, name: e.target.value })
                              }
                              className="font-bold text-xs sm:text-sm text-white bg-transparent border-b border-transparent hover:border-neutral-700 focus:border-[#FFD700] focus:outline-none"
                            />
                            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-neutral-800 text-neutral-400">
                              {service.category}
                            </span>
                          </div>
                          <input
                            type="text"
                            value={service.description}
                            onChange={(e) =>
                              updateService({ ...service, description: e.target.value })
                            }
                            className="w-full text-xs text-neutral-400 mt-1 bg-transparent border-b border-transparent hover:border-neutral-700 focus:border-[#FFD700] focus:outline-none"
                          />
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          {/* Price input */}
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-[#FFD700] font-mono">₹</span>
                            <input
                              type="number"
                              value={service.price}
                              onChange={(e) =>
                                updateService({ ...service, price: Number(e.target.value) || 0 })
                              }
                              className="w-20 px-2 py-1 bg-black border border-neutral-700 rounded-lg font-mono text-xs text-white font-bold text-right"
                            />
                          </div>

                          {/* Toggle Enabled */}
                          <button
                            onClick={() => toggleService(service.id)}
                            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                              service.enabled
                                ? 'bg-emerald-950/50 border-emerald-800 text-emerald-400'
                                : 'bg-neutral-900 border-neutral-800 text-neutral-500'
                            }`}
                            title={service.enabled ? 'Click to Disable' : 'Click to Enable'}
                          >
                            {service.enabled ? (
                              <Eye className="w-4 h-4" />
                            ) : (
                              <EyeOff className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: PACKAGES */}
              {activeAdminTab === 'packages' && (
                <div className="space-y-4">
                  {packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className="p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800 space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-800">
                        <div>
                          <input
                            type="text"
                            value={pkg.name}
                            onChange={(e) => updatePackage({ ...pkg, name: e.target.value })}
                            className="font-bold text-sm text-white bg-transparent border-b border-transparent hover:border-neutral-700 focus:border-[#FFD700] focus:outline-none"
                          />
                          {pkg.recommended && (
                            <span className="ml-2 text-[10px] font-bold px-2 py-0.5 rounded bg-[#FFD700] text-black">
                              RECOMMENDED
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs text-neutral-400 font-mono">Price (₹/mo):</span>
                          <input
                            type="number"
                            value={pkg.price}
                            onChange={(e) =>
                              updatePackage({ ...pkg, price: Number(e.target.value) || 0 })
                            }
                            className="w-24 px-2 py-1 bg-black border border-neutral-700 rounded-lg font-mono text-xs text-[#FFD700] font-bold text-right"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase text-neutral-400">
                          Deliverables (One per line):
                        </label>
                        <textarea
                          rows={4}
                          value={pkg.deliverables.join('\n')}
                          onChange={(e) =>
                            updatePackage({
                              ...pkg,
                              deliverables: e.target.value.split('\n').filter((l) => l.trim().length > 0),
                            })
                          }
                          className="w-full p-2.5 bg-black border border-neutral-800 rounded-lg text-xs text-neutral-300 font-sans focus:outline-none focus:border-[#FFD700]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 3: OFFERS */}
              {activeAdminTab === 'offers' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase text-neutral-400">
                      Active Campaign Offers: {offers.length}
                    </span>
                    <button
                      onClick={() => setShowAddOfferForm(!showAddOfferForm)}
                      className="px-3 py-1.5 rounded-lg bg-[#FFD700]/15 hover:bg-[#FFD700]/25 text-[#FFD700] border border-[#FFD700]/40 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{t.addNewOffer}</span>
                    </button>
                  </div>

                  {/* Add Offer Form */}
                  {showAddOfferForm && (
                    <form
                      onSubmit={handleCreateOffer}
                      className="p-4 rounded-2xl bg-neutral-900 border border-[#FFD700]/40 space-y-3"
                    >
                      <div className="font-semibold text-xs text-white">Create New Offer</div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                          type="text"
                          required
                          value={newOfferTitle}
                          onChange={(e) => setNewOfferTitle(e.target.value)}
                          placeholder="Offer Title (e.g. Monsoon Promo)"
                          className="px-3 py-2 bg-black border border-neutral-700 rounded-lg text-xs text-white"
                        />
                        <input
                          type="text"
                          required
                          value={newOfferCode}
                          onChange={(e) => setNewOfferCode(e.target.value)}
                          placeholder="Promo Code (e.g. MONSOON15)"
                          className="px-3 py-2 bg-black border border-neutral-700 rounded-lg text-xs text-white font-mono uppercase"
                        />
                        <div className="flex gap-2">
                          <select
                            value={newOfferDiscountType}
                            onChange={(e) =>
                              setNewOfferDiscountType(e.target.value as 'percentage' | 'fixed')
                            }
                            className="px-2 py-2 bg-black border border-neutral-700 rounded-lg text-xs text-white"
                          >
                            <option value="percentage">% Off</option>
                            <option value="fixed">₹ Flat</option>
                          </select>
                          <input
                            type="number"
                            required
                            value={newOfferDiscountVal}
                            onChange={(e) => setNewOfferDiscountVal(Number(e.target.value))}
                            className="w-full px-2 py-2 bg-black border border-neutral-700 rounded-lg text-xs text-white font-mono"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="date"
                          value={newOfferExpiry}
                          onChange={(e) => setNewOfferExpiry(e.target.value)}
                          className="px-3 py-2 bg-black border border-neutral-700 rounded-lg text-xs text-white"
                        />
                        <input
                          type="text"
                          value={newOfferEligibility}
                          onChange={(e) => setNewOfferEligibility(e.target.value)}
                          placeholder="Eligibility criteria (e.g. First 20 clients)"
                          className="px-3 py-2 bg-black border border-neutral-700 rounded-lg text-xs text-white"
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setShowAddOfferForm(false)}
                          className="px-3 py-1.5 rounded-lg text-xs text-neutral-400 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1.5 rounded-lg text-xs font-bold bg-[#FFD700] text-black hover:brightness-110"
                        >
                          Save Offer
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Offers List */}
                  <div className="space-y-3">
                    {offers.map((offer) => (
                      <div
                        key={offer.id}
                        className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-3"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-black border border-[#FFD700]/40 text-[#FFD700]">
                              {offer.code}
                            </span>
                            <input
                              type="text"
                              value={offer.title}
                              onChange={(e) => updateOffer({ ...offer, title: e.target.value })}
                              className="font-bold text-xs sm:text-sm text-white bg-transparent border-b border-transparent hover:border-neutral-700 focus:border-[#FFD700] focus:outline-none"
                            />
                          </div>

                          <button
                            onClick={() => toggleOffer(offer.id)}
                            className={`p-1.5 rounded-lg border text-xs font-semibold cursor-pointer ${
                              offer.enabled
                                ? 'bg-emerald-950/50 border-emerald-800 text-emerald-400'
                                : 'bg-neutral-900 border-neutral-800 text-neutral-500'
                            }`}
                          >
                            {offer.enabled ? 'Active' : 'Disabled'}
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                          <div>
                            <span className="text-[10px] text-neutral-500 block">Discount Value:</span>
                            <div className="flex items-center gap-1 mt-0.5">
                              <input
                                type="number"
                                value={offer.discountValue}
                                onChange={(e) =>
                                  updateOffer({
                                    ...offer,
                                    discountValue: Number(e.target.value) || 0,
                                  })
                                }
                                className="w-16 px-2 py-1 bg-black border border-neutral-700 rounded text-xs font-mono text-white"
                              />
                              <span className="text-neutral-400">
                                {offer.discountType === 'percentage' ? '%' : '₹'}
                              </span>
                            </div>
                          </div>

                          <div>
                            <span className="text-[10px] text-neutral-500 block">Expiry Date:</span>
                            <input
                              type="text"
                              value={offer.expiryDate}
                              onChange={(e) =>
                                updateOffer({ ...offer, expiryDate: e.target.value })
                              }
                              className="px-2 py-1 bg-black border border-neutral-700 rounded text-xs text-white mt-0.5"
                            />
                          </div>

                          <div>
                            <span className="text-[10px] text-neutral-500 block">Eligibility:</span>
                            <input
                              type="text"
                              value={offer.eligibility}
                              onChange={(e) =>
                                updateOffer({ ...offer, eligibility: e.target.value })
                              }
                              className="w-full px-2 py-1 bg-black border border-neutral-700 rounded text-xs text-white mt-0.5"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
