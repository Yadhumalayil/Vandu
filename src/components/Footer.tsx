import React from 'react';
import { Logo3D } from './Logo3D.tsx';
import { Play, Sparkles, Mail, MapPin, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenProposal: (serviceName?: string) => void;
  onReplaySplash: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenProposal,
  onReplaySplash,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#040406] border-t border-neutral-900 pt-16 pb-12 relative overflow-hidden">
      {/* Golden Ambient Blur in Background */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#FFD700]/5 blur-[100px] pointer-events-none -z-10"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-neutral-900">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <Logo3D size="md" interactive={true} floating={false} withGlow={true} />
              <div className="flex flex-col">
                <span className="font-cinzel text-2xl font-black gold-gradient-text-bright tracking-wider">
                  VANDU
                </span>
                <span className="font-outfit text-xs font-bold tracking-[0.35em] uppercase text-white/90 -mt-1">
                  DIGITAL ADS
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed max-w-sm">
              Premium 3D digital advertising, viral social media campaigns, high-converting performance marketing, 
              and bespoke brand identities crafted for undeniable market leadership.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={onReplaySplash}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-neutral-300 hover:text-[#FFD700] bg-neutral-900 border border-neutral-800 hover:border-[#FFD700]/30 rounded-lg transition-all cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 text-[#FFD700]" />
                <span>Replay 3D Cinematic Intro</span>
              </button>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
              Platform Navigation
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <button
                  onClick={() => onNavigate('overview')}
                  className="hover:text-[#FFD700] transition-colors cursor-pointer"
                >
                  Overview & 3D Logo
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-[#FFD700] transition-colors cursor-pointer"
                >
                  All 11 Digital Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('pricing')}
                  className="hover:text-[#FFD700] transition-colors cursor-pointer text-[#FFD700] font-semibold"
                >
                  Pricing, Packages & Offers (₹)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('architect')}
                  className="hover:text-[#FFD700] transition-colors cursor-pointer"
                >
                  Budget & Yield Planner
                </button>
              </li>
              <li>
                <a
                  href="https://wa.me/?text=Hi%20VANDU%20DIGITAL%20ADS!"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#FFD700] transition-colors cursor-pointer"
                >
                  WhatsApp Direct Connect
                </a>
              </li>
            </ul>
          </div>

          {/* Core Services Directory */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
              Featured Specializations
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-neutral-400">
              <button
                onClick={() => onOpenProposal('Instagram Marketing')}
                className="text-left hover:text-[#FFD700] transition-colors cursor-pointer"
              >
                Instagram Marketing
              </button>
              <button
                onClick={() => onOpenProposal('Facebook Advertising')}
                className="text-left hover:text-[#FFD700] transition-colors cursor-pointer"
              >
                Facebook Advertising
              </button>
              <button
                onClick={() => onOpenProposal('YouTube Promotion')}
                className="text-left hover:text-[#FFD700] transition-colors cursor-pointer"
              >
                YouTube Promotion
              </button>
              <button
                onClick={() => onOpenProposal('3D Logo Design')}
                className="text-left hover:text-[#FFD700] transition-colors cursor-pointer"
              >
                3D Logo Design
              </button>
              <button
                onClick={() => onOpenProposal('Video Editing')}
                className="text-left hover:text-[#FFD700] transition-colors cursor-pointer"
              >
                Cinematic Video Editing
              </button>
              <button
                onClick={() => onOpenProposal('Poster Design')}
                className="text-left hover:text-[#FFD700] transition-colors cursor-pointer"
              >
                Luxury Poster Design
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            &copy; {new Date().getFullYear()} VANDU DIGITAL ADS. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onOpenProposal()}
              className="text-neutral-400 hover:text-[#FFD700] transition-colors cursor-pointer"
            >
              Direct Client Inquiries
            </button>
            <span aria-hidden="true">&bull;</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
