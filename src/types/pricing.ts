export type ServiceCategory = 'design' | 'video' | 'social' | 'branding';

export interface IndividualService {
  id: string;
  name: string;
  nameML?: string;
  category: ServiceCategory;
  description: string;
  descriptionML?: string;
  price: number; // in INR (₹)
  iconName: string;
  enabled: boolean;
  featured?: boolean;
}

export interface MonthlyPackage {
  id: string;
  name: string;
  nameML?: string;
  price: number; // in INR (₹) per month
  period: string;
  periodML?: string;
  recommended?: boolean;
  deliverables: string[];
  deliverablesML?: string[];
  enabled: boolean;
  tagline?: string;
  taglineML?: string;
}

export type DiscountType = 'percentage' | 'fixed' | 'free_item';

export interface SpecialOffer {
  id: string;
  code: string;
  title: string;
  titleML?: string;
  description: string;
  descriptionML?: string;
  discountType: DiscountType;
  discountValue: number; // percentage (e.g. 20) or fixed amount (e.g. 200)
  freeItem?: string;
  freeItemML?: string;
  expiryDate: string; // ISO string or human date e.g. '2026-12-31'
  eligibility: string;
  eligibilityML?: string;
  enabled: boolean;
}

export interface SelectedServiceItem {
  serviceId: string;
  name: string;
  unitPrice: number;
  quantity: number;
}

export interface CustomerEnquiryData {
  customerName: string;
  businessName: string;
  phoneNumber: string;
  selectedServices: SelectedServiceItem[];
  selectedPackageId?: string;
  selectedPackageName?: string;
  selectedPackagePrice?: number;
  selectedOfferId?: string;
  selectedOfferCode?: string;
  quantityTotal: number;
  message: string;
  subtotal: number;
  discountAmount: number;
  finalTotal: number;
}
