import { MarketingService, CaseStudy, ClientReview, AdChannel, CampaignGoal } from '../types/marketing.ts';

export const SERVICES_DATA: MarketingService[] = [
  {
    id: 'digital-marketing',
    name: 'Digital Marketing',
    nameML: 'ഡിജിറ്റൽ മാർക്കറ്റിംഗ്',
    category: 'performance',
    shortDesc: 'End-to-end full-funnel digital growth, omnichannel strategy, and ROI-driven conversion pipelines.',
    shortDescML: 'സമ്പൂർണ്ണ ഫണൽ ഡിജിറ്റൽ വളർച്ച, ഓമ്നിചാനൽ പരസ്യങ്ങൾ, ഉയർന്ന കൺവേർഷൻ പൈപ്പ്‌ലൈൻ.',
    fullDesc: 'Our complete digital marketing suite integrates search, display, programmatic channels, and retargeting into a cohesive revenue engine designed to capture high-intent customers.',
    deliverables: [
      'Comprehensive Market & Competitor Audit',
      'Full-Funnel Omnichannel Media Planning',
      'Conversion Rate Optimization (CRO)',
      'Custom Bi-Weekly Performance Analytics & Reporting'
    ],
    metrics: {
      turnaround: '3–5 Days Setup',
      avgBoost: '+280% Qualified Traffic',
      bestFor: 'Growing Businesses & E-Commerce'
    },
    startingPrice: '$899/mo',
    featured: true
  },
  {
    id: 'social-media-management',
    name: 'Social Media Management',
    nameML: 'സോഷ്യൽ മീഡിയ മാനേജ്മെന്റ്',
    category: 'social',
    shortDesc: 'Curated daily storytelling, community nurturing, and algorithmic organic reach across all platforms.',
    shortDescML: 'ദിനവുമുള്ള ആകർഷകമായ പോസ്റ്റുകൾ, കമ്മ്യൂണിറ്റി വളർച്ച, ഉയർന്ന എൻഗേജ്മെന്റ്.',
    fullDesc: 'We handle your complete social presence—from high-polish content calendars and copywriting to community engagement and audience cultivation that turns passive scrollers into loyal advocates.',
    deliverables: [
      'Monthly Strategic Content Calendar',
      'Daily Grid & Story Publishing',
      'Active Community DM & Comment Management',
      'Monthly Trend Adaptation & Follower Growth'
    ],
    metrics: {
      turnaround: 'Continuous 30-Day Cycles',
      avgBoost: '+340% Engagement Rate',
      bestFor: 'Consumer Brands & Public Figures'
    },
    startingPrice: '$699/mo',
    featured: true
  },
  {
    id: 'instagram-marketing',
    name: 'Instagram Marketing',
    nameML: 'ഇൻസ്റ്റാഗ്രാം മാർക്കറ്റിംഗ്',
    category: 'social',
    shortDesc: 'High-aesthetic grid curation, viral Reels production, and targeted sponsored story boosts.',
    shortDescML: 'വൈറൽ റീൽസ് നിർമ്മാണം, മനോഹരമായ ഗ്രിഡ് ഡിസൈൻ, ടാർഗെറ്റഡ് സ്പോൺസേർഡ് സ്റ്റോറികൾ.',
    fullDesc: 'Instagram requires visual magnetism and rapid pacing. We build cohesive visual brand feeds, high-retention 9:16 Reels, and targeted influencer collaboration funnels.',
    deliverables: [
      'Visual Grid Aesthetic & Palette Mastery',
      '12–20 High-Retention Viral Reels / Mo',
      'Interactive Stories with Polls & Link Funnels',
      'Instagram Shop & Bio Link Architecture'
    ],
    metrics: {
      turnaround: 'Weekly Drops',
      avgBoost: '+420% Organic Reach',
      bestFor: 'Fashion, Lifestyle, Food & Retail'
    },
    startingPrice: '$749/mo'
  },
  {
    id: 'facebook-advertising',
    name: 'Facebook Advertising',
    nameML: 'ഫേസ്ബുക്ക് പരസ്യങ്ങൾ',
    category: 'performance',
    shortDesc: 'Precision lookalike modeling, pixel attribution, and hyper-targeted lead generation ad sets.',
    shortDescML: 'കൃത്യമായ ഓഡിയൻസ് ടാർഗെറ്റിംഗ്, പിക്സൽ ഒപ്റ്റിമൈസേഷൻ, ഹൈ-ക്വാളിറ്റി ലീഡ് പരസ്യങ്ങൾ.',
    fullDesc: 'Leverage Meta’s machine learning to find your ideal buyers. We craft modular multi-variant ad creatives, custom conversion events, and automated lead capture forms.',
    deliverables: [
      'Meta Conversions API & Pixel Integration',
      'Custom & Lookalike Audience Modeling',
      'Multi-Variant Copy & Creative Testing',
      'Automated Inbound Lead CRM Routing'
    ],
    metrics: {
      turnaround: '48h Launch',
      avgBoost: '+310% Lead Volume',
      bestFor: 'B2B, Real Estate, Local Services'
    },
    startingPrice: '$649/mo'
  },
  {
    id: 'youtube-promotion',
    name: 'YouTube Promotion',
    nameML: 'യൂട്യൂബ് പ്രൊമോഷൻ',
    category: 'performance',
    shortDesc: 'In-stream skippable ads, YouTube Shorts distribution, and subscriber conversion funnels.',
    shortDescML: 'ഇൻ-സ്ട്രീം വീഡിയോ പരസ്യങ്ങൾ, യൂട്യൂബ് ഷോർട്ട്സ്, സബ്സ്ക്രൈബർ ഫണലുകൾ.',
    fullDesc: 'Dominate the world’s second largest search engine. We structure high-hook video ads, YouTube Shorts optimization, and search-driven video SEO that builds long-term authority.',
    deliverables: [
      'In-Stream & Discovery Ad Campaigns',
      'High-CTR Custom 3D Thumbnails',
      'Video SEO & Algorithmic Tag Optimization',
      'Audience Retention & Drop-Off Analytics'
    ],
    metrics: {
      turnaround: '3–4 Days',
      avgBoost: '+500K Video Views',
      bestFor: 'Educators, Brands & Creators'
    },
    startingPrice: '$799/mo'
  },
  {
    id: 'content-creation',
    name: 'Content Creation',
    nameML: 'കണ്ടന്റ് ക്രിയേഷൻ',
    category: 'creative',
    shortDesc: 'High-impact copywriting, viral hooks, educational carousels, and conversion-first assets.',
    shortDescML: 'വൈറൽ സ്ക്രിപ്റ്റുകൾ, വിദ്യാഭ്യാസപരമായ കറൗസലുകൾ, ഉപഭോക്താക്കളെ ആകർഷിക്കുന്ന കോപ്പിറൈറ്റിംഗ്.',
    fullDesc: 'Stop users mid-scroll with content crafted for modern attention spans. We write magnetic hooks, visual carousels, and brand narratives that spark conversations.',
    deliverables: [
      '30 Viral Scripts & Hook Frameworks',
      'Educational Multi-Slide Carousels',
      'High-Converting Ad Copywriting',
      'Brand Voice & Tone Bible'
    ],
    metrics: {
      turnaround: '3–5 Days',
      avgBoost: '3.8x Save & Share Rate',
      bestFor: 'SaaS, Coaches & Agencies'
    },
    startingPrice: '$549/mo'
  },
  {
    id: 'poster-design',
    name: 'Poster Design',
    nameML: 'പോസ്റ്റർ ഡിസൈൻ',
    category: 'creative',
    shortDesc: 'Cinematic visual art, luxury event promotions, product launch flyers, and billboard designs.',
    shortDescML: 'സിനിമാറ്റിക് വിഷ്വൽ ആർട്ട്, ഇവന്റ് പ്രൊമോഷനുകൾ, ഉൽപ്പന്ന ലോഞ്ച് പോസ്റ്ററുകൾ, ബിൽബോർഡുകൾ.',
    fullDesc: 'From high-density digital display ads to print-ready billboards, our poster designs command attention with striking typography, depth layering, and golden color palettes.',
    deliverables: [
      'Ultra-HD Digital & Print-Ready Files (CMYK/RGB)',
      'Vector Layered Source Assets',
      'Multiple Aspect Ratio Formats (A4, 16:9, 4:5)',
      '3D Realistic Mockup Showcases'
    ],
    metrics: {
      turnaround: '24–48 Hours',
      avgBoost: '100% Print-Ready Fidelity',
      bestFor: 'Concerts, Events & Retail Drops'
    },
    startingPrice: '$249/ea'
  },
  {
    id: 'logo-design',
    name: 'Logo Design',
    nameML: '3D ലോഗോ ഡിസൈൻ',
    category: 'branding',
    shortDesc: 'Metallic 3D emblems, vector geometry, and iconic brand marks crafted for timeless distinction.',
    shortDescML: 'മെറ്റാലിക് 3D എംബ്ലംസ്, വെക്റ്റർ ജ്യാമിതി, പ്രൗഢമായ ബ്രാൻഡ് ലോഗോകൾ.',
    fullDesc: 'Just like the signature golden bee of VANDU, your brand deserves an unforgettable mark. We engineer logos that radiate prestige across digital screens, packaging, and physical signage.',
    deliverables: [
      '3 Distinct Bespoke Identity Concepts',
      '3D Metallic & Flat Vector Variations',
      'Comprehensive Logo Guideline & Safe Zone Guide',
      'Full Vector Formats (SVG, AI, EPS, PNG, PDF)'
    ],
    metrics: {
      turnaround: '3–5 Days',
      avgBoost: 'Timeless Longevity',
      bestFor: 'Startups, Rebrands & Luxury Ventures'
    },
    startingPrice: '$499',
    featured: true
  },
  {
    id: 'video-editing',
    name: 'Video Editing',
    nameML: 'സിനിമാറ്റിക് വീഡിയോ എഡിറ്റിംഗ്',
    category: 'creative',
    shortDesc: 'Cinematic color grading, fast-paced motion graphics, sound design, and 4K commercial cuts.',
    shortDescML: 'സിനിമാറ്റിക് കളർ ഗ്രേഡിംഗ്, 4K മോഷൻ ഗ്രാഫിക്സ്, റീൽസ് എഡിറ്റിംഗ്, സ്റ്റുഡിയോ സൗണ്ട് ഡിസൈൻ.',
    fullDesc: 'We turn raw footage into high-retention video assets. Includes rhythmic pacing, dynamic zooms, animated kinetic typography, 3D title cards, and studio sound mastering.',
    deliverables: [
      '4K 60fps Final Master Render',
      'Dynamic Subtitles & Kinetic Typography',
      'Cinematic Color Grading & LUT Application',
      'Custom Sound Design & Licensed Audio'
    ],
    metrics: {
      turnaround: '48–72 Hours',
      avgBoost: '+68% Average Watch Time',
      bestFor: 'Commercials, Reels & YouTube'
    },
    startingPrice: '$399/video'
  },
  {
    id: 'branding',
    name: 'Branding',
    nameML: 'ബ്രാൻഡിംഗ് & ഐഡന്റിറ്റി',
    category: 'branding',
    shortDesc: 'Holistic brand architecture, luxury color systems, custom typography, and corporate identity.',
    shortDescML: 'പൂർണ്ണ ബ്രാൻഡ് ആർക്കിടെക്ചർ, കളർ സിസ്റ്റം, ടൈപ്പോഗ്രാഫി, കോർപ്പറേറ്റ് ഐഡന്റിറ്റി ബുക്ക്.',
    fullDesc: 'Transform from a business into an institution. We establish your core brand pillars, color harmonies, typography scales, messaging frameworks, and full design system.',
    deliverables: [
      '60+ Page Master Brand Identity Book',
      'Primary, Secondary & Monospace Type System',
      'Harmonized 60-30-10 Color Hierarchy',
      'Social Media & Stationary Design Kit'
    ],
    metrics: {
      turnaround: '7–10 Days',
      avgBoost: '+180% Perceived Value',
      bestFor: 'Enterprises & Premium Brands'
    },
    startingPrice: '$1,299'
  },
  {
    id: 'advertising-campaigns',
    name: 'Advertising Campaigns',
    nameML: 'അഡ്വർടൈസിംഗ് കാമ്പെയ്നുകൾ',
    category: 'performance',
    shortDesc: 'Full-spectrum seasonal launches, multi-channel media buys, and aggressive growth scaling.',
    shortDescML: 'സീസണൽ ലോഞ്ചുകൾ, മൾട്ടി-ചാനൽ മീഡിയ പ്ലാനിംഗ്, മികച്ച ROAS വളർച്ച.',
    fullDesc: 'For businesses ready to take center stage. We orchestrate synchronised launches spanning social ads, search, influencer partnerships, and remarketing campaigns.',
    deliverables: [
      'End-to-End Campaign Creative Blueprint',
      'Cross-Platform Ad Asset Production (15+ assets)',
      'Real-Time Bid & Budget Optimization',
      'Weekly Executive ROAS Briefings'
    ],
    metrics: {
      turnaround: '1 Week Prep & Launch',
      avgBoost: '4.2x Average ROAS',
      bestFor: 'Product Launches & High-Scale Growth'
    },
    startingPrice: '$1,499/mo',
    featured: true
  }
];

export const CAMPAIGN_GOALS: CampaignGoal[] = [
  {
    id: 'awareness',
    name: 'Brand Awareness',
    nameML: 'ബ്രാൻഡ് അവബോധം',
    description: 'Maximize brand exposure and view frequency',
    descriptionML: 'ബ്രാൻഡ് റീച്ചും കാഴ്ച്ചക്കാരും പരമാവധിയാക്കുക',
    multiplier: 1.4,
  },
  {
    id: 'leads',
    name: 'Lead Generation',
    nameML: 'ക്വാളിറ്റി ലീഡ്സ്',
    description: 'Capture qualified inbound inquiries and phone leads',
    descriptionML: 'നേരിട്ടുള്ള ഫോൺ, വാട്സാപ്പ് എൻക്വയറികൾ നേടുക',
    multiplier: 1.0,
  },
  {
    id: 'sales',
    name: 'E-Commerce Sales',
    nameML: 'ഓൺലൈൻ വിൽപന',
    description: 'Drive direct online purchases and revenue',
    descriptionML: 'നേരിട്ടുള്ള ഓൺലൈൻ ഓർഡറുകളും വരുമാനവും കൂട്ടുക',
    multiplier: 0.9,
  },
  {
    id: 'app',
    name: 'App Downloads',
    nameML: 'ആപ്പ് ഡൗൺലോഡ്സ്',
    description: 'Acquire high-LTV app installs and registrations',
    descriptionML: 'ഉയർന്ന നിലവാരമുള്ള ആപ്പ് ഇൻസ്റ്റാളുകൾ നേടുക',
    multiplier: 1.1,
  },
  {
    id: 'local',
    name: 'Local Footfall',
    nameML: 'സ്റ്റോർ സന്ദർശനം',
    description: 'Direct in-person visits to stores or showrooms',
    descriptionML: 'കടകളിലേക്കും ഷോറൂമുകളിലേക്കും ആളുകളെ ആകർഷിക്കുക',
    multiplier: 1.25,
  },
];

export const AD_CHANNELS: AdChannel[] = [
  {
    id: 'instagram',
    name: 'Instagram Ads',
    nameML: 'ഇൻസ്റ്റാഗ്രാം പരസ്യങ്ങൾ',
    cpm: 4.80,
    ctr: 2.1,
    convRate: 3.2,
    iconName: 'Instagram',
  },
  {
    id: 'facebook',
    name: 'Facebook Ads',
    nameML: 'ഫേസ്ബുക്ക് പരസ്യങ്ങൾ',
    cpm: 3.90,
    ctr: 1.8,
    convRate: 2.9,
    iconName: 'Facebook',
  },
  {
    id: 'youtube',
    name: 'YouTube Promotion',
    nameML: 'യൂട്യൂബ് പ്രൊമോഷൻ',
    cpm: 5.60,
    ctr: 1.4,
    convRate: 2.4,
    iconName: 'Youtube',
  },
  {
    id: 'google',
    name: 'Google Search & Display',
    nameML: 'ഗൂഗിൾ സെർച്ച് & ഡിസ്പ്ലേ',
    cpm: 6.20,
    ctr: 3.5,
    convRate: 4.1,
    iconName: 'Globe',
  },
  {
    id: 'content',
    name: 'Creative Content Studio',
    nameML: 'ക്രിയേറ്റീവ് കണ്ടന്റ് സ്റ്റുഡിയോ',
    cpm: 2.50,
    ctr: 2.8,
    convRate: 3.8,
    iconName: 'Sparkles',
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'aurora-fashion',
    client: 'AURA Luxe Apparel',
    industry: 'Premium E-Commerce',
    industryML: 'പ്രീമിയം ഇ-കൊമേഴ്സ്',
    service: 'Advertising Campaigns & Instagram',
    serviceML: 'പരസ്യ കാമ്പെയ്നുകളും ഇൻസ്റ്റാഗ്രാമും',
    headline: '+380% ROAS and $420K Revenue in 90 Days',
    headlineML: '90 ദിവസത്തിനകം +380% ROAS നേട്ടവും വൻ വരുമാനവും',
    results: {
      roas: '4.8x',
      reach: '1.4M',
      conversions: '3,840 Orders',
      conversionsML: '3,840 ഓർഡറുകൾ',
    },
    summary:
      'Restructured their visual identity with dark metallic aesthetics and launched dynamic retargeting reels that lowered customer acquisition cost from $42 to $16.',
    summaryML:
      'ഡാർക്ക് മെറ്റാലിക് സൗന്ദര്യശാസ്ത്രത്തോടെ ബ്രാൻഡ് പുനർരൂപകൽപ്പന ചെയ്യുകയും, കസ്റ്റമർ അക്വിസിഷൻ ചെലവ് ഗണ്യമായി കുറയ്ക്കുകയും ചെയ്തു.',
    duration: '90 Days',
    durationML: '90 ദിവസങ്ങൾ',
  },
  {
    id: 'oasis-hospitality',
    client: 'The Imperial Pavilion',
    industry: 'Luxury Hospitality & Dining',
    industryML: 'ലക്ഷ്വറി ഹോസ്പിറ്റാലിറ്റി',
    service: 'Social Media Management & Video',
    serviceML: 'സോഷ്യൽ മീഡിയയും 4K വീഡിയോയും',
    headline: '+240% Inbound Weekend Reservations',
    headlineML: 'വീക്കെൻഡ് ഡൈനിംഗ് ബുക്കിംഗുകളിൽ +240% വർദ്ധനവ്',
    results: {
      roas: '5.2x',
      reach: '820K',
      conversions: '1,280 Bookings',
      conversionsML: '1,280 ബുക്കിംഗുകൾ',
    },
    summary:
      'Produced cinematic 4K food trailers and local geo-fenced Instagram sponsored posts that completely booked weekend dining for 4 consecutive months.',
    summaryML:
      'സിനിമാറ്റിക് 4K ഫുഡ് ട്രെയിലറുകളും പ്രാദേശിക ജിയോ-ടാർഗെറ്റഡ് ഇൻസ്റ്റാഗ്രാം പരസ്യങ്ങളും വഴി തുടർച്ചയായ 4 മാസങ്ങളിൽ മുൻകൂട്ടി ബുക്കിംഗ് പൂർത്തിയാക്കി.',
    duration: '60 Days',
    durationML: '60 ദിവസങ്ങൾ',
  },
  {
    id: 'zenith-fintech',
    client: 'Zenith Pay International',
    industry: 'FinTech & Mobile App',
    industryML: 'ഫിൻടെക് & മൊബൈൽ ആപ്പ്',
    service: 'Digital Marketing & YouTube Ads',
    serviceML: 'ഡിജിറ്റൽ മാർക്കറ്റിംഗും യൂട്യൂബ് പരസ്യങ്ങളും',
    headline: '48,000 Verified App Installs at $0.62 CPI',
    headlineML: '48,000 പരിശോധിച്ച ആപ്പ് ഇൻസ്റ്റാളുകൾ കുറഞ്ഞ ചെലവിൽ',
    results: {
      roas: '3.9x',
      reach: '2.8M',
      conversions: '48,000 Installs',
      conversionsML: '48,000 ഇൻസ്റ്റാളുകൾ',
    },
    summary:
      'Architected high-hook YouTube skippable ads and Facebook Lead Ads driving seamless app onboarding across three metropolitan territories.',
    summaryML:
      'യൂട്യൂബ് സ്കിപ്പബിൾ പരസ്യങ്ങളും ഫേസ്ബുക്ക് ലീഡ് പരസ്യങ്ങളും ആസൂത്രണം ചെയ്ത് റെക്കോർഡ് വേഗത്തിൽ പുതിയ ഉപയോക്താക്കളെ നേടി.',
    duration: '120 Days',
    durationML: '120 ദിവസങ്ങൾ',
  },
];

export interface ClientLogo {
  id: string;
  name: string;
  tagline: string;
  badge: string;
}

export const CLIENT_LOGOS: ClientLogo[] = [
  { id: 'goldcrest', name: 'GOLDCREST', tagline: 'Jewels & Diamonds', badge: 'GJ' },
  { id: 'imperial', name: 'THE IMPERIAL', tagline: 'Pavilion & Dining', badge: 'IP' },
  { id: 'zenith', name: 'ZENITH PAY', tagline: 'Global FinTech', badge: 'ZP' },
  { id: 'aura', name: 'AURA LUXE', tagline: 'Apparel & Couture', badge: 'AL' },
  { id: 'krypton', name: 'KRYPTON TECH', tagline: 'Enterprise AI', badge: 'KT' },
  { id: 'velocita', name: 'VELOCITA', tagline: 'Electric Mobility', badge: 'VM' },
];

export const CLIENT_REVIEWS: ClientReview[] = [
  {
    id: '1',
    author: 'Vikramaditya Shenoy',
    role: 'Managing Director',
    roleML: 'മാനേജിംഗ് ഡയറക്ടർ',
    company: 'Goldcrest Jewels & Diamonds',
    rating: 5,
    content:
      'VANDU DIGITAL ADS elevated our brand presence into pure luxury. The 3D branding, golden aesthetic, and Instagram campaigns delivered 4x more qualified inquiries than our previous agency.',
    contentML:
      'വണ്ട് ഡിജിറ്റൽ പരസ്യങ്ങൾ ഞങ്ങളുടെ ബ്രാൻഡിനെ അതീവ പ്രൗഢിയുള്ളതാക്കി മാറ്റി. ഇവരുടെ 3D ബ്രാൻഡിംഗും ഇൻസ്റ്റാഗ്രാം കാമ്പെയ്‌നുകളും ഞങ്ങൾക്ക് നാലിരട്ടി ഉയർന്ന എൻക്വയറികൾ നേടിത്തന്നു.',
    campaignType: 'Branding & Social Ads',
    campaignTypeML: 'ബ്രാൻഡിംഗ് & സോഷ്യൽ പരസ്യങ്ങൾ',
    impactMetric: '+420% Inbound Leads',
    impactMetricML: '+420% കൂടുതൽ ലീഡുകൾ',
    brandSymbol: 'GJ',
  },
  {
    id: '2',
    author: 'Sarah Al-Mansoor',
    role: 'Founder & CMO',
    roleML: 'സ്ഥാപക & CMO',
    company: 'The Imperial Pavilion',
    rating: 5,
    content:
      'The attention to detail and cinematic video editing is world-class. Our viral reels consistently hit 100K+ organic views, and our Friday-Saturday dining bookings are completely sold out weeks in advance.',
    contentML:
      'സിനിമാറ്റിക് വീഡിയോ എഡിറ്റിംഗും കൃത്യതയും അന്താരാഷ്ട്ര നിലവാരമുള്ളതാണ്. ഞങ്ങളുടെ റീൽസുകൾ ലക്ഷക്കണക്കിന് ആളുകളിലേക്ക് എത്തുകയും വീക്കെൻഡ് ബുക്കിംഗുകൾ ദിവസങ്ങൾക്ക് മുമ്പേ പൂർണ്ണമാവുകയും ചെയ്യുന്നു.',
    campaignType: 'Video Editing & Instagram',
    campaignTypeML: 'വീഡിയോ എഡിറ്റിംഗ് & ഇൻസ്റ്റാഗ്രാം',
    impactMetric: '100% Sold Out Reservations',
    impactMetricML: '100% ഫുൾ ബുക്കിംഗ്',
    brandSymbol: 'IP',
  },
  {
    id: '3',
    author: 'Karthik Narayanan',
    role: 'Head of Growth',
    roleML: 'ഹെഡ് ഓഫ് ഗ്രോത്ത്',
    company: 'Zenith Pay International',
    rating: 5,
    content:
      'The Campaign Architect and ROI focus are remarkable. They don’t just deliver vanity metrics—they delivered 48,000 verified app installs with a sub-$1 cost per lead.',
    contentML:
      'വണ്ട് നൽകുന്ന കാമ്പെയ്ൻ പ്ലാനിംഗും ROI കൃത്യതയും അത്ഭുതകരമാണ്. വെറും സംഖ്യകൾ കാണിക്കുന്നതിന് പകരം, കുറഞ്ഞ ചെലവിൽ 48,000-ൽ അധികം യഥാർത്ഥ ഉപയോക്താക്കളെ ലഭ്യമാക്കി.',
    campaignType: 'Performance Marketing',
    campaignTypeML: 'പെർഫോമൻസ് മാർക്കറ്റിംഗ്',
    impactMetric: '48,000 App Installs',
    impactMetricML: '48,000 ആപ്പ് ഇൻസ്റ്റാളുകൾ',
    brandSymbol: 'ZP',
  },
  {
    id: '4',
    author: 'Elena Rostova',
    role: 'Creative Director',
    roleML: 'ക്രിയേറ്റീവ് ഡയറക്ടർ',
    company: 'AURA Luxe Apparel',
    rating: 5,
    content:
      'Our conversion rate jumped from 1.4% to 3.8% in just 60 days. The metallic 3D poster campaigns and retargeting reels transformed our entire product drop cycle.',
    contentML:
      'വെറും 60 ദിവസത്തിനുള്ളിൽ ഞങ്ങളുടെ കൺവേർഷൻ റേറ്റ് 1.4% ൽ നിന്ന് 3.8% ആയി ഉയർന്നു. 3D പോസ്റ്റർ പരസ്യങ്ങളും റീ ടാർഗറ്റിംഗ് റീൽസുകളും ഞങ്ങളുടെ ഉൽപ്പന്ന വിൽപനയിൽ വൻ കുതിച്ചുചാട്ടമുണ്ടാക്കി.',
    campaignType: 'Omnichannel Advertising',
    campaignTypeML: 'ഓമ്നിചാനൽ പരസ്യങ്ങൾ',
    impactMetric: '4.8x ROAS Multiplier',
    impactMetricML: '4.8x ഉയർന്ന ROAS',
    brandSymbol: 'AL',
  },
  {
    id: '5',
    author: 'Marcus Vance',
    role: 'VP of Marketing',
    roleML: 'വി.പി മാർക്കറ്റിംഗ്',
    company: 'Krypton Technologies',
    rating: 5,
    content:
      'VANDU combines deep technical conversion know-how with visual prestige that commands attention. Our enterprise pipeline grew by $2.4M within four months.',
    contentML:
      'സാങ്കേതിക മികവും ആകർഷകമായ വിഷ്വലുകളും സംയോജിപ്പിക്കുന്നതിൽ വണ്ട് വേറിട്ടുനിൽക്കുന്നു. നാല് മാസത്തിനുള്ളിൽ ഞങ്ങളുടെ ബിസിനസ് പൈപ്പ്‌ലൈൻ വൻതോതിൽ വികസിച്ചു.',
    campaignType: 'B2B Digital Marketing',
    campaignTypeML: 'B2B ഡിജിറ്റൽ മാർക്കറ്റിംഗ്',
    impactMetric: '+$2.4M Pipeline Growth',
    impactMetricML: 'വൻ ബിസിനസ് വളർച്ച',
    brandSymbol: 'KT',
  },
];
