import React, { useState } from 'react';
import { Logo3D } from './Logo3D.tsx';
import { Smartphone, MonitorPlay, Image as ImageIcon, Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Play, Sparkles, Check, Copy } from 'lucide-react';

interface CreativeStudioProps {
  onOpenProposal: (serviceName?: string) => void;
}

export const CreativeStudio: React.FC<CreativeStudioProps> = ({ onOpenProposal }) => {
  const [activeFormat, setActiveFormat] = useState<'instagram_feed' | 'instagram_story' | 'youtube_preroll' | 'luxury_poster'>('instagram_feed');
  const [brandName, setBrandName] = useState<string>('VANDU LUXE');
  const [headline, setHeadline] = useState<string>('Redefining Market Dominance with 3D Precision.');
  const [ctaText, setCtaText] = useState<string>('Shop Collection');
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopySpec = () => {
    const spec = `VANDU DIGITAL ADS Creative Spec\nFormat: ${activeFormat}\nBrand: ${brandName}\nHeadline: ${headline}\nCTA: ${ctaText}`;
    navigator.clipboard?.writeText?.(spec);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="creative" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="text-xs font-bold uppercase tracking-widest text-[#FFD700] flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>VANDU Creative Studio</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-black text-white">
            High-Impact Ad Creatives. <br />
            <span className="gold-gradient-text-bright">Live Omnichannel Previewer.</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 font-sans">
            Test and preview how your brand looks inside real digital ad placements—rendered with 
            VANDU’s signature metallic gold aesthetics and 3D visual language.
          </p>
        </div>

        {/* Format Selector Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'instagram_feed', label: 'Instagram Feed Ad (1:1)', icon: Smartphone },
            { id: 'instagram_story', label: 'Reels / Story (9:16)', icon: Smartphone },
            { id: 'youtube_preroll', label: 'YouTube Pre-Roll (16:9)', icon: MonitorPlay },
            { id: 'luxury_poster', label: 'Luxury Brand Poster', icon: ImageIcon },
          ].map((fmt) => {
            const Icon = fmt.icon;
            const isSelected = activeFormat === fmt.id;
            return (
              <button
                key={fmt.id}
                onClick={() => setActiveFormat(fmt.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#FFD700] to-[#FF9900] text-black shadow-[0_0_20px_rgba(255,215,0,0.3)]'
                    : 'bg-neutral-900/70 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{fmt.label}</span>
              </button>
            );
          })}
        </div>

        {/* 2-Column Layout: Customizer on Left, Live Mockup on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Customizer Controls */}
          <div className="lg:col-span-5 space-y-6 glass-gold-card rounded-2xl p-6 sm:p-8">
            <div className="border-b border-neutral-800 pb-4">
              <h3 className="font-cinzel text-xl font-bold text-white">
                Creative Blueprint Editor
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Customize ad copy and call-to-action to see changes reflected in the live preview.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                  Brand Name
                </label>
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-neutral-900/90 border border-neutral-800 focus:border-[#FFD700]/60 rounded-xl text-sm text-white focus:outline-none"
                  placeholder="e.g. VANDU LUXE"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                  Ad Headline & Hook
                </label>
                <textarea
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 bg-neutral-900/90 border border-neutral-800 focus:border-[#FFD700]/60 rounded-xl text-sm text-white focus:outline-none resize-none"
                  placeholder="e.g. Redefining Market Dominance..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                  Call-to-Action (CTA) Label
                </label>
                <input
                  type="text"
                  value={ctaText}
                  onChange={(e) => setCtaText(e.target.value)}
                  className="w-full px-4 py-2.5 bg-neutral-900/90 border border-neutral-800 focus:border-[#FFD700]/60 rounded-xl text-sm text-white focus:outline-none"
                  placeholder="e.g. Shop Collection, Book Now"
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-4 border-t border-neutral-800 flex items-center gap-3">
              <button
                onClick={handleCopySpec}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-[#FFD700]" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Spec Copied!' : 'Copy Creative Spec'}</span>
              </button>

              <button
                onClick={() => onOpenProposal('Video Editing & Ad Creative')}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-[#FFD700] to-[#FF9900] hover:brightness-110 transition-all cursor-pointer text-center"
              >
                Produce This Creative
              </button>
            </div>
          </div>

          {/* Live Mockup Stage */}
          <div className="lg:col-span-7 flex justify-center items-center p-4 sm:p-8">
            {/* 1. Instagram Feed Mockup */}
            {activeFormat === 'instagram_feed' && (
              <div className="w-full max-w-[390px] bg-black border border-neutral-800 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
                {/* Instagram Header */}
                <div className="p-3.5 flex items-center justify-between border-b border-neutral-900">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full p-0.5 bg-gradient-to-tr from-[#FF9900] via-[#FFD700] to-amber-200">
                      <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                        <img src="/vandu-bee-logo.png" alt="" className="w-6 h-6 object-contain" />
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1">
                        <span>{brandName || 'vandu.ads'}</span>
                      </div>
                      <div className="text-[10px] text-neutral-500">Sponsored</div>
                    </div>
                  </div>
                  <MoreHorizontal className="w-4 h-4 text-neutral-500" />
                </div>

                {/* Creative Visual Canvas */}
                <div className="relative aspect-square bg-[#08080a] flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#FFD700]/15 via-transparent to-amber-500/10" />
                  <Logo3D size="lg" interactive={true} floating={true} withGlow={true} />
                  
                  {/* Overlay Banner */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/75 backdrop-blur-md border border-[#FFD700]/30">
                    <div className="text-xs font-bold text-white line-clamp-1">{headline}</div>
                    <div className="text-[10px] text-[#FFD700] font-mono mt-0.5">High-Velocity Campaign</div>
                  </div>
                </div>

                {/* CTA Action Strip */}
                <div className="p-3 bg-neutral-900/90 flex items-center justify-between border-y border-neutral-800">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">{ctaText}</span>
                  <button className="px-3 py-1 bg-[#FFD700] text-black font-bold text-xs rounded-md shadow-sm">
                    {ctaText} &rsaquo;
                  </button>
                </div>

                {/* Instagram Actions & Caption */}
                <div className="p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-4">
                      <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                      <MessageCircle className="w-5 h-5 text-neutral-300" />
                      <Send className="w-5 h-5 text-neutral-300" />
                    </div>
                    <Bookmark className="w-5 h-5 text-neutral-300" />
                  </div>
                  <div className="text-xs font-semibold text-white">2,840 likes</div>
                  <div className="text-xs text-neutral-300">
                    <span className="font-bold text-white mr-1.5">{brandName || 'vandu.ads'}</span>
                    {headline}
                  </div>
                </div>
              </div>
            )}

            {/* 2. Instagram Story / Reels 9:16 Mockup */}
            {activeFormat === 'instagram_story' && (
              <div className="w-full max-w-[320px] aspect-[9/16] bg-black border border-neutral-800 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative flex flex-col justify-between p-4">
                {/* Background 3D Visual */}
                <div className="absolute inset-0 bg-[#08080a] flex items-center justify-center">
                  <div className="absolute inset-0 bg-radial from-[#FFD700]/20 via-transparent to-black" />
                  <Logo3D size="xl" interactive={true} floating={true} withGlow={true} />
                </div>

                {/* Top Story Bar */}
                <div className="relative z-10 space-y-2">
                  <div className="w-full h-1 bg-neutral-800 rounded-full overflow-hidden">
                    <div className="w-2/3 h-full bg-[#FFD700] rounded-full" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-black border border-[#FFD700] p-0.5">
                      <img src="/vandu-bee-logo.png" alt="" className="w-full h-full object-contain" />
                    </div>
                    <span className="text-xs font-bold text-white drop-shadow">{brandName}</span>
                    <span className="text-[10px] text-neutral-400">Sponsored</span>
                  </div>
                </div>

                {/* Center Copy */}
                <div className="relative z-10 text-center px-2">
                  <h4 className="font-cinzel text-xl font-black text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                    {headline}
                  </h4>
                </div>

                {/* Bottom Swipe Up CTA */}
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#FF9900] text-black text-xs font-bold text-center shadow-lg">
                    {ctaText}
                  </div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-white/80">
                    Swipe up to learn more
                  </span>
                </div>
              </div>
            )}

            {/* 3. YouTube Pre-Roll Mockup */}
            {activeFormat === 'youtube_preroll' && (
              <div className="w-full max-w-[560px] aspect-video bg-black border border-neutral-800 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative flex flex-col justify-between p-4">
                <div className="absolute inset-0 bg-[#09090c] flex items-center justify-center">
                  <div className="absolute inset-0 bg-radial from-[#FF9900]/15 via-transparent to-black" />
                  <Logo3D size="lg" interactive={true} floating={true} withGlow={true} />
                </div>

                {/* Top Video Header */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-[#FFD700] text-black font-extrabold text-[10px] rounded">
                      Ad &bull; 0:15
                    </span>
                    <span className="text-xs font-semibold text-white drop-shadow">{brandName}</span>
                  </div>
                </div>

                {/* Headline Banner */}
                <div className="relative z-10 max-w-sm p-3 rounded-lg bg-black/80 backdrop-blur-md border border-[#FFD700]/30">
                  <h4 className="text-sm font-bold text-white">{headline}</h4>
                  <p className="text-[11px] text-neutral-400 mt-0.5">vanduads.com</p>
                </div>

                {/* Bottom Controls Strip & Skip Button */}
                <div className="relative z-10 flex items-center justify-between">
                  <button className="px-4 py-1.5 rounded bg-[#FFD700] text-black font-bold text-xs">
                    {ctaText}
                  </button>
                  <div className="px-3 py-1 bg-black/80 border border-neutral-700 text-xs text-white rounded">
                    Skip in 3s
                  </div>
                </div>
              </div>
            )}

            {/* 4. Luxury Brand Poster Mockup */}
            {activeFormat === 'luxury_poster' && (
              <div className="w-full max-w-[380px] aspect-[3/4] bg-[#0c0c10] border-2 border-[#FFD700]/40 rounded-xl p-8 relative flex flex-col justify-between shadow-[0_25px_60px_rgba(255,215,0,0.12)]">
                {/* Luxury Gold Border Details */}
                <div className="absolute inset-3 border border-[#FFD700]/20 pointer-events-none rounded-lg" />

                <div className="relative z-10 text-center space-y-1">
                  <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#FFD700]">
                    Official Campaign Artwork
                  </div>
                  <h3 className="font-cinzel text-2xl font-black text-white tracking-widest">
                    {brandName}
                  </h3>
                </div>

                <div className="relative z-10 flex items-center justify-center my-4">
                  <Logo3D size="xl" interactive={true} floating={true} withGlow={true} />
                </div>

                <div className="relative z-10 text-center space-y-3">
                  <p className="font-outfit text-sm text-neutral-300 font-medium leading-relaxed">
                    &ldquo;{headline}&rdquo;
                  </p>
                  <div className="text-[10px] font-mono tracking-widest text-[#FFD700] uppercase">
                    VANDU DIGITAL ADS &bull; 2026 EDITION
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
