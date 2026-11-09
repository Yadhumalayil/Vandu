import React, { useState, useEffect } from 'react';
import { CinematicSplash } from './components/CinematicSplash.tsx';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { ServicesSection } from './components/ServicesSection.tsx';
import { CampaignArchitect } from './components/CampaignArchitect.tsx';
import { CaseStudiesSection } from './components/CaseStudiesSection.tsx';
import { ClientSuccessSection } from './components/ClientSuccessSection.tsx';
import { Footer } from './components/Footer.tsx';
import { ProposalModal } from './components/ProposalModal.tsx';
import { GoldParticlesCanvas } from './components/GoldParticlesCanvas.tsx';
import { LanguageProvider } from './context/LanguageContext.tsx';
import { PricingProvider } from './context/PricingContext.tsx';
import { PricingModule } from './components/pricing/PricingModule.tsx';

function AppContent() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');
  const [isProposalOpen, setIsProposalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');
  const [proposalNotes, setProposalNotes] = useState<string>('');

  const handleOpenProposal = (serviceName?: string, customNotes?: string) => {
    setSelectedService(serviceName || '');
    setProposalNotes(customNotes || '');
    setIsProposalOpen(true);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'overview') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Observe active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['services', 'pricing', 'architect', 'case-studies', 'client-success'];
      const scrollPosition = window.scrollY + 200;

      if (window.scrollY < 300) {
        setActiveSection('overview');
        return;
      }

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#FFD700]/30 selection:text-[#FFD700] relative">
      {/* 1. Cinematic 3D Splash Screen */}
      {showSplash && (
        <CinematicSplash onComplete={() => setShowSplash(false)} />
      )}

      {/* Subtle Global Background Particles (Low density for max performance) */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden opacity-40">
        <GoldParticlesCanvas density="low" interactive={false} />
      </div>

      {/* 2. Top Bar Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenProposal={handleOpenProposal}
        onReplaySplash={() => setShowSplash(true)}
      />

      {/* 3. Main Content Areas */}
      <main id="overview">
        {/* Hero Section with Dominant 3D Logo and Flying Bee Trigger */}
        <HeroSection
          onNavigate={handleNavigate}
          onOpenProposal={() => handleOpenProposal()}
        />

        {/* Digital Marketing Services (All 11 disciplines) */}
        <ServicesSection
          onOpenProposal={(serviceName) => handleOpenProposal(serviceName)}
        />

        {/* PRICING & OFFERS MODULE (Individual Services, Monthly Packages, Special Offers, Custom Packages/Calculator, Customer Enquiry) */}
        <PricingModule />

        {/* Simple Campaign Budget Planner */}
        <CampaignArchitect
          onOpenProposalWithPlan={(planSummary) =>
            handleOpenProposal('Custom Campaign Blueprint', planSummary)
          }
        />

        {/* Case Studies Section with Framer Motion Animated Incrementing Counters */}
        <CaseStudiesSection
          onOpenProposal={(serviceName) => handleOpenProposal(serviceName)}
        />

        {/* Client Success Section with Testimonial Slider & 3D Hover Cards */}
        <ClientSuccessSection
          onOpenProposal={(serviceName) => handleOpenProposal(serviceName)}
        />
      </main>

      {/* 4. Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenProposal={(serviceName) => handleOpenProposal(serviceName)}
        onReplaySplash={() => setShowSplash(true)}
      />

      {/* 5. Custom Proposal / Discovery Modal */}
      <ProposalModal
        isOpen={isProposalOpen}
        onClose={() => setIsProposalOpen(false)}
        preSelectedService={selectedService}
        initialNotes={proposalNotes}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <PricingProvider>
        <AppContent />
      </PricingProvider>
    </LanguageProvider>
  );
}
