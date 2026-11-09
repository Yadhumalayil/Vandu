export interface MarketingService {
  id: string;
  name: string;
  nameML?: string;
  category: 'performance' | 'social' | 'creative' | 'branding';
  shortDesc: string;
  shortDescML?: string;
  fullDesc: string;
  fullDescML?: string;
  deliverables: string[];
  deliverablesML?: string[];
  metrics: {
    turnaround: string;
    avgBoost: string;
    bestFor: string;
  };
  startingPrice: string;
  featured?: boolean;
}

export interface CampaignGoal {
  id: string;
  name: string;
  nameML?: string;
  description: string;
  descriptionML?: string;
  multiplier: number;
}

export interface AdChannel {
  id: string;
  name: string;
  nameML?: string;
  cpm: number; // cost per 1000 impressions in USD
  ctr: number; // expected click-through rate %
  convRate: number; // conversion rate %
  iconName: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  industryML?: string;
  service: string;
  serviceML?: string;
  headline: string;
  headlineML?: string;
  results: {
    roas: string;
    reach: string;
    conversions: string;
    conversionsML?: string;
  };
  summary: string;
  summaryML?: string;
  duration: string;
  durationML?: string;
}

export interface ClientReview {
  id: string;
  author: string;
  role: string;
  roleML?: string;
  company: string;
  rating: number;
  content: string;
  contentML?: string;
  campaignType: string;
  campaignTypeML?: string;
  impactMetric?: string;
  impactMetricML?: string;
  brandSymbol?: string;
}
