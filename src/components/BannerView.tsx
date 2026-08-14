import React, { forwardRef, useState } from 'react';
import { ArrowUpRight, Shield, Flame, Activity, Home, Dumbbell, Package, Sparkles, Phone, Menu, X, User, Film } from 'lucide-react';
import { motion } from 'motion/react';
import { BannerContent } from '../types';

interface BannerViewProps {
  content: BannerContent;
  height?: number | string;
  isExporting?: boolean;
  fixedWidth?: number | string;
  onNavigate?: (page: string) => void;
  onGetInTouch?: () => void;
}

export const BannerView = forwardRef<HTMLDivElement, BannerViewProps>(
  ({ content, height = 900, isExporting = false, onNavigate, onGetInTouch }, ref) => {
    const isPureBlack = content.themeStyle === 'pure-black';
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const allPages = [
      { name: 'Home', icon: Home, highlight: false },
      { name: 'About', icon: User, highlight: false },
      { name: 'Projects', icon: Film, highlight: false },
      { name: 'Services', icon: Dumbbell, highlight: false },
      { name: 'Packages', icon: Package, highlight: true },
      { name: 'Transformation', icon: Sparkles, highlight: false },
      { name: 'Contact', icon: Phone, highlight: false },
    ];

    const handleNavClick = (pageName: string) => {
      setMobileMenuOpen(false);
      if (onNavigate) {
        onNavigate(pageName);
      }
    };

    return (
      <div className="w-full overflow-x-auto flex justify-center py-2">
        <div
          ref={ref}
          id="coach-douglas-banner-container"
          className={`relative w-full overflow-hidden select-none transition-all duration-300 ${isExporting ? (isPureBlack ? 'bg-black text-white' : 'bg-[#08080a] text-white') : 'bg-transparent text-white'
            } border border-neutral-900/60 shadow-2xl rounded-3xl backdrop-blur-[2px]`}
          style={{
            height: isExporting ? `${height}px` : undefined,
          }}
        >
          {/* Subtle geometric grid / guide lines (minimal & clean) */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

          {/* 5% Healing Green subtle ambient accent in top-right or status indicator */}
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#2eb886]/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#d4af37]/5 blur-3xl pointer-events-none" />

          {/* Main Content Container with optimized spacing */}
          <div className="relative z-10 flex flex-col justify-between h-full p-4 sm:p-6 md:p-8 lg:p-10 gap-4 sm:gap-6">

            {/* Top Header / Navigation Bar */}
            <header id="banner-header" className="flex flex-col gap-2 sm:gap-3 w-full shrink-0">
              <div className="flex items-center justify-between gap-4 w-full">
                {/* Brand Logo with subtle color glow */}
                <div
                  onClick={() => handleNavClick('Home')}
                  className="group relative flex items-center gap-3 cursor-pointer py-1 px-2 rounded-xl transition-all"
                >
                  {/* Subtle ambient colorful backlight glow */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#d4af37]/25 via-[#2eb886]/20 to-[#d4af37]/10 rounded-2xl blur-md opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none" />

                  {/* Pulse Dot with vivid green glow */}
                  <div className="relative w-2.5 h-2.5 rounded-full bg-[#2eb886] ring-4 ring-[#2eb886]/30 shadow-[0_0_10px_#2eb886] animate-pulse" />

                  {/* Bingo Font Logo Text with small color glow */}
                  <span className="relative font-bingo text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-1 logo-color-glow transition-transform group-hover:scale-[1.02]">
                    {content.brandName}
                    <span className="text-[#d4af37] text-2xl font-black leading-none drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]">.</span>
                  </span>
                </div>

                {/* Nav Menu & CTA */}
                <div className="flex items-center gap-2 sm:gap-6 md:gap-10">
                  {/* Mobile Menu Toggle Button */}
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden flex items-center justify-center p-1.5 sm:p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white cursor-pointer"
                    aria-label="Toggle navigation"
                  >
                    {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                  </button>

                  {/* Get in touch CTA Button with glowing aura */}
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#d4af37] via-[#f5c842] to-[#2eb886] rounded-full blur-md opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse pointer-events-none" />
                    <div
                      id="banner-cta-button"
                      onClick={() => onGetInTouch && onGetInTouch()}
                      className="relative get-in-touch-glow flex items-center gap-1.5 sm:gap-3 bg-white text-black pl-3 sm:pl-6 pr-1.5 sm:pr-2 py-1 sm:py-2 rounded-full font-semibold text-xs sm:text-sm md:text-base tracking-tight hover:bg-neutral-100 transition-all shadow-xl cursor-pointer"
                    >
                      <span>{content.ctaText}</span>
                      <span className="w-5 h-5 sm:w-8 sm:h-8 rounded-full bg-[#d4af37] text-black flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                        <ArrowUpRight className="w-3 h-3 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded Mobile Menu Drawer (if toggled) */}
              {mobileMenuOpen && (
                <div className="md:hidden bg-neutral-950/95 border border-neutral-800 rounded-2xl p-3 shadow-xl space-y-1.5 animate-fadeIn">
                  <div className="text-[10px] uppercase font-bold text-[#d4af37] tracking-wider px-2 py-1">
                    Quick Page Navigation
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {allPages.map((page) => {
                      const Icon = page.icon;
                      return (
                        <button
                          key={page.name}
                          onClick={() => handleNavClick(page.name)}
                          className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${page.highlight
                              ? 'bg-[#d4af37] text-black font-bold'
                              : 'bg-neutral-900 text-neutral-200 hover:bg-neutral-800 border border-neutral-800/80'
                            }`}
                        >
                          <Icon className={`w-3.5 h-3.5 ${page.highlight ? 'text-black' : 'text-[#d4af37]'}`} />
                          <span>{page.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </header>

            {/* Middle Body Section - Compact, well-balanced spacing */}
            <main id="banner-main-grid" className="my-2 sm:my-3 py-1 sm:py-2 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-10 items-center">
              {/* Left Column: Headline (BUILD THE BODY. MASTER THE MIND.) */}
              <div className="lg:col-span-7 flex flex-col justify-center space-y-3 sm:space-y-4 md:space-y-5">
                {content.showStatusBadge && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#2eb886]/10 border border-[#2eb886]/30 text-[#48d89e] text-xs md:text-sm font-medium w-fit">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2eb886]" />
                    {content.statusBadgeText}
                  </div>
                )}

                {content.greeting && (
                  <p className="text-lg sm:text-3xl lg:text-4xl font-medium text-neutral-300 tracking-tight">
                    {content.greeting}
                  </p>
                )}

                <h1 className="text-2xl sm:text-5xl md:text-6xl lg:text-[5.4rem] font-extrabold tracking-[-0.035em] text-white leading-[1.05] sm:leading-[0.98] uppercase">
                  <span className="block">{content.titleLine1}</span>
                  <span className="block text-white mt-0.5 sm:mt-1">{content.titleLine2}</span>
                </h1>
              </div>

              {/* Right Column: Statement & Subtext */}
              <div className="lg:col-span-5 flex flex-col justify-center space-y-3 sm:space-y-5 lg:pl-6">
                <div className="space-y-1.5 sm:space-y-4 max-w-lg">
                  <h2 className="text-base sm:text-2xl lg:text-3xl font-bold tracking-tight text-white leading-snug">
                    {content.quoteTitle}
                  </h2>
                  <p className="text-xs sm:text-base lg:text-lg text-neutral-300 font-medium leading-relaxed">
                    {content.quoteDescription}
                  </p>
                </div>

                {/* Minimalist Gold accent touch */}
                <div className="pt-1 sm:pt-2 flex items-center gap-3">
                  <div className="h-0.5 w-10 sm:w-14 bg-gradient-to-r from-[#d4af37] to-transparent rounded-full" />
                  <span className="text-[11px] sm:text-xs md:text-sm uppercase tracking-widest text-[#d4af37] font-semibold">
                    Dubai • Global Online
                  </span>
                </div>
              </div>
            </main>

            {/* Bottom Row: 4 Pillars / Capabilities with automatic right-to-left animation */}
            <footer id="banner-footer-services" className="pt-3 sm:pt-4 border-t border-neutral-900/80 shrink-0 relative overflow-hidden">
              {/* Subtle edge gradient masks */}
              <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />

              <div className="flex overflow-hidden select-none w-full">
                <motion.div
                  className="flex items-center gap-8 sm:gap-12 md:gap-16 shrink-0 pr-8 sm:pr-12 md:pr-16"
                  animate={{ x: ['0%', '-50%'] }}
                  transition={{
                    ease: 'linear',
                    duration: 32,
                    repeat: Infinity,
                  }}
                >
                  {[...content.services, ...content.services, ...content.services, ...content.services].map((service, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 sm:gap-3.5 shrink-0 group">
                      <span className="text-[#d4af37] font-bold text-xs sm:text-sm md:text-base tracking-wider flex items-center gap-1 font-mono">
                        <span className="text-[#d4af37] opacity-80">#</span>
                        <span>{service.id}</span>
                      </span>
                      <span className="text-white text-xs sm:text-sm md:text-base lg:text-lg font-semibold tracking-tight leading-snug whitespace-nowrap">
                        {service.name}
                      </span>
                      {/* Gold separator accent */}
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]/40 ml-4 sm:ml-6 shrink-0" />
                    </div>
                  ))}
                </motion.div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    );
  }
);

BannerView.displayName = 'BannerView';

