import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  IndividualService,
  MonthlyPackage,
  SpecialOffer,
  SelectedServiceItem,
} from '../types/pricing.ts';
import {
  DEFAULT_INDIVIDUAL_SERVICES,
  DEFAULT_MONTHLY_PACKAGES,
  DEFAULT_SPECIAL_OFFERS,
} from '../data/defaultPricingData.ts';

export type PricingTab = 'services' | 'packages' | 'offers' | 'calculator' | 'enquiry';

interface PricingContextType {
  services: IndividualService[];
  packages: MonthlyPackage[];
  offers: SpecialOffer[];
  activeTab: PricingTab;
  setActiveTab: (tab: PricingTab) => void;
  // Calculator & Cart state
  selectedServices: Record<string, number>;
  selectedPackageId: string | null;
  selectedOfferId: string | null;
  setServiceQuantity: (serviceId: string, quantity: number) => void;
  incrementService: (serviceId: string) => void;
  decrementService: (serviceId: string) => void;
  setSelectedPackageId: (packageId: string | null) => void;
  setSelectedOfferId: (offerId: string | null) => void;
  clearSelections: () => void;
  // Direct shortcuts
  orderServiceNow: (serviceId: string) => void;
  orderPackageNow: (packageId: string) => void;
  applyOfferToCalculator: (offerId: string) => void;
  // Calculations
  subtotal: number;
  discountAmount: number;
  finalTotal: number;
  activeOffer: SpecialOffer | null;
  selectedItemsList: SelectedServiceItem[];
  formatINR: (amount: number) => string;
  // Admin Management
  isAdminModalOpen: boolean;
  setIsAdminModalOpen: (open: boolean) => void;
  isAdminAuthenticated: boolean;
  setIsAdminAuthenticated: (auth: boolean) => void;
  updateService: (service: IndividualService) => void;
  addService: (service: IndividualService) => void;
  toggleService: (id: string) => void;
  updatePackage: (pkg: MonthlyPackage) => void;
  updateOffer: (offer: SpecialOffer) => void;
  addOffer: (offer: SpecialOffer) => void;
  toggleOffer: (id: string) => void;
  resetToDefaults: () => void;
}

const PricingContext = createContext<PricingContextType | undefined>(undefined);

const STORAGE_KEYS = {
  SERVICES: 'vandu_pricing_services_v1',
  PACKAGES: 'vandu_pricing_packages_v1',
  OFFERS: 'vandu_pricing_offers_v1',
  ADMIN_AUTH: 'vandu_admin_auth_state_v1',
};

export const formatINR = (amount: number): string => {
  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
};

export const PricingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Data States with LocalStorage Persistence
  const [services, setServices] = useState<IndividualService[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SERVICES);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load services from localStorage', e);
    }
    return DEFAULT_INDIVIDUAL_SERVICES;
  });

  const [packages, setPackages] = useState<MonthlyPackage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PACKAGES);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load packages from localStorage', e);
    }
    return DEFAULT_MONTHLY_PACKAGES;
  });

  const [offers, setOffers] = useState<SpecialOffer[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.OFFERS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load offers from localStorage', e);
    }
    return DEFAULT_SPECIAL_OFFERS;
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
    } catch (e) {
      console.warn(e);
    }
  }, [services]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(packages));
    } catch (e) {
      console.warn(e);
    }
  }, [packages]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(offers));
    } catch (e) {
      console.warn(e);
    }
  }, [offers]);

  // 2. Active Tab State
  const [activeTab, setActiveTab] = useState<PricingTab>('services');

  // 3. Calculator Selections
  const [selectedServices, setSelectedServices] = useState<Record<string, number>>({});
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);

  // 4. Admin Modal & Auth
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, String(isAdminAuthenticated));
    } catch {
      // ignore
    }
  }, [isAdminAuthenticated]);

  // Selections Handlers
  const setServiceQuantity = (serviceId: string, quantity: number) => {
    setSelectedServices((prev) => {
      const updated = { ...prev };
      if (quantity <= 0) {
        delete updated[serviceId];
      } else {
        updated[serviceId] = quantity;
      }
      return updated;
    });
  };

  const incrementService = (serviceId: string) => {
    setSelectedServices((prev) => ({
      ...prev,
      [serviceId]: (prev[serviceId] || 0) + 1,
    }));
  };

  const decrementService = (serviceId: string) => {
    setSelectedServices((prev) => {
      const current = prev[serviceId] || 0;
      if (current <= 1) {
        const next = { ...prev };
        delete next[serviceId];
        return next;
      }
      return { ...prev, [serviceId]: current - 1 };
    });
  };

  const clearSelections = () => {
    setSelectedServices({});
    setSelectedPackageId(null);
    setSelectedOfferId(null);
  };

  const orderServiceNow = (serviceId: string) => {
    setSelectedServices({ [serviceId]: 1 });
    setActiveTab('enquiry');
  };

  const orderPackageNow = (packageId: string) => {
    setSelectedPackageId(packageId);
    setActiveTab('enquiry');
  };

  const applyOfferToCalculator = (offerId: string) => {
    setSelectedOfferId(offerId);
    setActiveTab('calculator');
  };

  // Selected Items List
  const selectedItemsList = useMemo<SelectedServiceItem[]>(() => {
    return Object.entries(selectedServices)
      .map(([id, qty]) => {
        const service = services.find((s) => s.id === id);
        if (!service || qty <= 0) return null;
        return {
          serviceId: service.id,
          name: service.name,
          unitPrice: service.price,
          quantity: qty,
        };
      })
      .filter((item): item is SelectedServiceItem => item !== null);
  }, [selectedServices, services]);

  // Active Offer
  const activeOffer = useMemo(() => {
    if (!selectedOfferId) return null;
    return offers.find((o) => o.id === selectedOfferId && o.enabled) || null;
  }, [selectedOfferId, offers]);

  // Dynamic Price Calculations
  const { subtotal, discountAmount, finalTotal } = useMemo(() => {
    let sum = 0;

    // 1. Services sum
    selectedItemsList.forEach((item) => {
      sum += item.unitPrice * item.quantity;
    });

    // 2. Package sum
    if (selectedPackageId) {
      const pkg = packages.find((p) => p.id === selectedPackageId && p.enabled);
      if (pkg) {
        sum += pkg.price;
      }
    }

    // 3. Discount calculation
    let discount = 0;
    if (activeOffer && sum > 0) {
      if (activeOffer.discountType === 'percentage') {
        discount = Math.round((sum * activeOffer.discountValue) / 100);
      } else if (activeOffer.discountType === 'fixed') {
        discount = Math.min(sum, activeOffer.discountValue);
      } else if (activeOffer.discountType === 'free_item') {
        // Flat value deduction for free item
        discount = Math.min(sum, activeOffer.discountValue);
      }
    }

    const total = Math.max(0, sum - discount);

    return {
      subtotal: sum,
      discountAmount: discount,
      finalTotal: total,
    };
  }, [selectedItemsList, selectedPackageId, packages, activeOffer]);

  // Admin Actions
  const updateService = (updated: IndividualService) => {
    setServices((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
  };

  const addService = (newService: IndividualService) => {
    setServices((prev) => [...prev, newService]);
  };

  const toggleService = (id: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const updatePackage = (updated: MonthlyPackage) => {
    setPackages((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const updateOffer = (updated: SpecialOffer) => {
    setOffers((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
  };

  const addOffer = (newOffer: SpecialOffer) => {
    setOffers((prev) => [...prev, newOffer]);
  };

  const toggleOffer = (id: string) => {
    setOffers((prev) =>
      prev.map((o) => (o.id === id ? { ...o, enabled: !o.enabled } : o))
    );
  };

  const resetToDefaults = () => {
    setServices(DEFAULT_INDIVIDUAL_SERVICES);
    setPackages(DEFAULT_MONTHLY_PACKAGES);
    setOffers(DEFAULT_SPECIAL_OFFERS);
    localStorage.removeItem(STORAGE_KEYS.SERVICES);
    localStorage.removeItem(STORAGE_KEYS.PACKAGES);
    localStorage.removeItem(STORAGE_KEYS.OFFERS);
  };

  return (
    <PricingContext.Provider
      value={{
        services,
        packages,
        offers,
        activeTab,
        setActiveTab,
        selectedServices,
        selectedPackageId,
        selectedOfferId,
        setServiceQuantity,
        incrementService,
        decrementService,
        setSelectedPackageId,
        setSelectedOfferId,
        clearSelections,
        orderServiceNow,
        orderPackageNow,
        applyOfferToCalculator,
        subtotal,
        discountAmount,
        finalTotal,
        activeOffer,
        selectedItemsList,
        formatINR,
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
      }}
    >
      {children}
    </PricingContext.Provider>
  );
};

export const usePricing = () => {
  const context = useContext(PricingContext);
  if (!context) {
    throw new Error('usePricing must be used within a PricingProvider');
  }
  return context;
};
