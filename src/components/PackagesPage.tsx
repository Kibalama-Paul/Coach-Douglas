import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowUpRight, 
  Check, 
  Sparkles, 
  Calendar, 
  Clock, 
  Zap, 
  Award, 
  Flame, 
  MessageCircle, 
  Instagram, 
  Dumbbell,
  ShieldCheck,
  Home,
  ChevronLeft
} from 'lucide-react';
import { BannerContent } from '../types';

interface PackagesPageProps {
  content: BannerContent;
  isEmbedded?: boolean;
  onNavigateToHome?: () => void;
  onGetInTouch?: (pkgName?: string) => void;
}

export interface TrainingPlan {
  id: string;
  name: string;
  category: 'DAILY' | 'WEEKLY' | 'MONTHLY';
  duration: string;
  priceNum: number;
  priceFormatted: string;
  popular?: boolean;
  savings?: string;
  description: string;
  features: string[];
}

export const TRAINING_PLANS: TrainingPlan[] = [
  {
    id: 'daily-60',
    name: 'Daily 1-on-1 Session',
    category: 'DAILY',
    duration: '60 min',
    priceNum: 200,
    priceFormatted: 'AED 200',
    description: 'High-intensity, focused 60-minute private personal training session.',
    features: [
      '60-Min Private 1-on-1 Coaching',
      'Form & Biomechanics Correction',
      'High-Intensity Strength Protocol',
      'Immediate Session Feedback',
    ],
  },
  {
    id: 'weekly-3x',
    name: 'Weekly Training Plan',
    category: 'WEEKLY',
    duration: '3 times',
    priceNum: 525,
    priceFormatted: 'AED 525',
    savings: 'Save AED 75',
    description: 'Structured 3-session weekly block for consistent athletic momentum.',
    features: [
      '3 Targeted 1-on-1 Sessions / Week',
      'Progressive Muscle Overload Plan',
      'Workout Routine Guidelines',
      'Active Recovery & Mobility Drill',
    ],
  },
  {
    id: 'monthly-1m',
    name: '1 Month Intensive Transformation',
    category: 'MONTHLY',
    duration: '1 Month',
    priceNum: 2500,
    priceFormatted: 'AED 2,500',
    description: 'Comprehensive 4-week foundation to establish discipline, strength, and nutritional habits.',
    features: [
      'Full 1 Month Coaching & Progression',
      'Personalized Macronutrient & Calorie Plan',
      'Bi-Weekly Technique & Metric Review',
      'Workout & Cardio Schedule',
      'Mobile Workout Tracking & Support',
    ],
  },
  {
    id: 'monthly-2m',
    name: '2 Months Hypertrophy & Conditioning',
    category: 'MONTHLY',
    duration: '2 Months',
    priceNum: 4000,
    priceFormatted: 'AED 4,000',
    savings: 'Save AED 1,000',
    popular: false,
    description: 'Dedicated 8-week physique recomposition and accelerated metabolic development.',
    features: [
      'Full 2 Months Periodized Protocol',
      'Advanced Nutrition & Macro Adjustments',
      'Weekly Video Technique Form Review',
      'InBody Body Composition Tracking',
      '24/7 WhatsApp Accountability',
    ],
  },
  {
    id: 'monthly-3m',
    name: '3 Months Total Physique Mastery',
    category: 'MONTHLY',
    duration: '3 Months',
    priceNum: 5500,
    priceFormatted: 'AED 5,500',
    savings: 'Best Value • Save AED 2,000',
    popular: true,
    description: 'The ultimate 12-week comprehensive transformation for mind, body, and high-performance lifestyle.',
    features: [
      'Complete 12-Week Transformation Roadmap',
      'Bespoke Hypertrophy & Fat Loss Blueprint',
      'Full Nutrition, Meal Planning & Supplementation',
      'Weekly Biofeedback & Milestone Assessments',
      'VIP 24/7 Priority WhatsApp Access',
      'Executive Stress & Recovery Optimization',
    ],
  },
];

export function PackagesPage({ content, isEmbedded = false, onNavigateToHome, onGetInTouch }: PackagesPageProps) {
  const [selectedPlanId, setSelectedPlanId] = useState<string>('monthly-3m');
  const [activeView, setActiveView] = useState<'cards' | 'table'>('cards');

  const currentPlan = TRAINING_PLANS.find((p) => p.id === selectedPlanId) || TRAINING_PLANS[4];

  const handleBookSelected = (planName?: string) => {
    const targetName = planName || `${currentPlan.name} (${currentPlan.priceFormatted})`;
    if (onGetInTouch) {
      onGetInTouch(targetName);
    }
  };

  return (
    <div className="w-full bg-transparent text-white min-h-[900px] rounded-3xl border border-neutral-900/60 shadow-2xl p-3.5 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-between relative overflow-hidden font-montserrat select-none backdrop-blur-[2px]">
      
      {/* Studio Top Spotlights - Faithful to reference image atmosphere */}
      <div className="absolute -top-16 left-1/4 w-96 h-80 bg-gradient-to-b from-white/10 via-amber-200/5 to-transparent blur-3xl pointer-events-none transform -rotate-12" />
      <div className="absolute -top-16 right-1/4 w-96 h-80 bg-gradient-to-b from-white/10 via-amber-200/5 to-transparent blur-3xl pointer-events-none transform rotate-12" />
      
      {/* Subtle Brand Accent Glows (10% Gold, 5% Healing Green) */}
      <div className="absolute -top-36 -right-36 w-96 h-96 rounded-full bg-[#2eb886]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-36 -left-36 w-96 h-96 rounded-full bg-[#d4af37]/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-radial from-[#d4af37]/5 via-transparent to-transparent blur-3xl pointer-events-none" />

      {/* Top Navigation Header - Hidden on Home Page when isEmbedded is true */}
      {!isEmbedded && (
        <header className="flex items-center justify-between gap-3 sm:gap-4 w-full shrink-0 relative z-20 pb-4 border-b border-neutral-900/80">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Direct Home Button */}
            <button
              onClick={onNavigateToHome}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 hover:border-[#f5c842] transition-all text-xs font-bold shadow-sm cursor-pointer group"
              title="Return to Home Page"
            >
              <ChevronLeft className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#f5c842] transition-colors" />
              <Home className="w-3.5 h-3.5 text-[#f5c842]" />
              <span className="hidden sm:inline">Home</span>
            </button>

            <div 
              className="flex items-center gap-2.5 cursor-pointer group" 
              onClick={onNavigateToHome}
              title="Back to Home"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-[#2eb886] ring-4 ring-[#2eb886]/20 animate-pulse" />
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-1 group-hover:text-amber-400 transition-colors">
                {content.brandName}
                <span className="text-[#d4af37] text-xl font-black leading-none">.</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-neutral-300">
              {content.navLinks.map((link, idx) => {
                const isPackages = link.toLowerCase() === 'packages';
                const isHome = link.toLowerCase() === 'home';
                return (
                  <span
                    key={idx}
                    onClick={() => {
                      if (isHome && onNavigateToHome) {
                        onNavigateToHome();
                      }
                    }}
                    className={`transition-colors cursor-pointer tracking-wide flex items-center gap-1.5 ${
                      isPackages
                        ? 'text-[#f5c842] font-bold border-b-2 border-[#f5c842] pb-0.5'
                        : isHome
                        ? 'text-neutral-300 hover:text-white font-semibold'
                        : 'hover:text-white text-neutral-400'
                    }`}
                  >
                    {isHome && <Home className="w-3.5 h-3.5 text-[#f5c842]" />}
                    {link}
                  </span>
                );
              })}
            </nav>

            <div
              onClick={() => handleBookSelected()}
              className="group flex items-center gap-2 sm:gap-3 bg-white text-black pl-4 sm:pl-5 pr-2 py-1.5 sm:py-2 rounded-full font-bold text-xs sm:text-sm tracking-tight hover:bg-amber-400 transition-all shadow-lg hover:shadow-amber-500/20 cursor-pointer"
            >
              <span>{content.ctaText}</span>
              <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-neutral-900 transition-colors">
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
              </span>
            </div>
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <main className="py-6 sm:py-8 relative z-10 space-y-8 max-w-6xl mx-auto w-full">
        
        {/* HERO SECTION: Glowing Gold "Packages" with Bounding Transformation Box & Cursor Click (Exact CodeCraft Graphic Style) */}
        <div className="flex flex-col items-center justify-center text-center space-y-4 pt-2">
          
          {/* Glowing Transformation Bounding Box */}
          <div className="relative inline-block px-8 py-3.5 sm:px-14 sm:py-5 my-2">
            {/* The gold bounding frame */}
            <div className="absolute inset-0 border-[1.5px] border-[#e5a824] shadow-[0_0_25px_rgba(229,168,36,0.35)] rounded-none pointer-events-none" />
            
            {/* 8 Control Handles on Corners & Midpoints */}
            {/* Top-Left */}
            <span className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-[#ffea79] border border-black shadow-[0_0_8px_#f5c842]" />
            {/* Top-Center */}
            <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#ffea79] border border-black shadow-[0_0_8px_#f5c842]" />
            {/* Top-Right */}
            <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-[#ffea79] border border-black shadow-[0_0_8px_#f5c842]" />
            {/* Right-Center */}
            <span className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-[#ffea79] border border-black shadow-[0_0_8px_#f5c842]" />
            {/* Bottom-Center */}
            <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#ffea79] border border-black shadow-[0_0_8px_#f5c842]" />
            {/* Left-Center */}
            <span className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-3 bg-[#ffea79] border border-black shadow-[0_0_8px_#f5c842]" />
            {/* Bottom-Left */}
            <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-[#ffea79] border border-black shadow-[0_0_8px_#f5c842]" />
            {/* Bottom-Right */}
            <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-[#ffea79] border border-black shadow-[0_0_8px_#f5c842]" />

            {/* 3D Cursor pointer clicking the bottom-right corner with radiating sparkles */}
            <div className="absolute -bottom-5 -right-7 sm:-bottom-7 sm:-right-9 z-20 flex items-start pointer-events-none select-none">
              {/* Sparkle rays */}
              <div className="absolute -top-2 -left-2 w-7 h-7 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-[#fff3a8] rounded-full shadow-[0_0_12px_#ffe066]" />
                <span className="absolute w-4 h-0.5 bg-[#ffe066]/90 rotate-45 shadow-[0_0_6px_#ffea79]" />
                <span className="absolute w-4 h-0.5 bg-[#ffe066]/90 -rotate-45 shadow-[0_0_6px_#ffea79]" />
                <span className="absolute w-0.5 h-4 bg-[#ffe066]/90 shadow-[0_0_6px_#ffea79]" />
                <span className="absolute w-4 h-0.5 bg-[#ffe066]/90 shadow-[0_0_6px_#ffea79]" />
              </div>
              {/* Glossy 3D Pointer Cursor */}
              <svg className="w-7 h-7 sm:w-9 sm:h-9 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] filter" viewBox="0 0 24 24" fill="none">
                <path d="M4 2L20 10L12 13L9 21L4 2Z" fill="#ffffff" stroke="#1c1c1e" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M6 5.5L16.5 10.8L11.5 12.8L9.5 17.5L6 5.5Z" fill="#f4f4f6" />
              </svg>
            </div>

            {/* Bold 3D Golden "Packages" Title */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-b from-[#fff6bb] via-[#f5c842] to-[#b38316] bg-clip-text text-transparent filter drop-shadow-[0_4px_16px_rgba(245,200,66,0.45)] uppercase">
              Packages
            </h1>
          </div>

          {/* Subheading & Description */}
          <div className="space-y-1 max-w-2xl mx-auto px-4">
            <h2 className="text-sm sm:text-base font-bold tracking-widest text-[#f5c842] uppercase">
              CHOOSE YOUR TRAINING PLAN
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 font-medium">
              Flexible training options designed to fit your schedule and fitness goals.
            </p>
          </div>

          {/* View Mode Switcher (Reference Cards vs Markdown Table View) */}
          <div className="flex items-center gap-2 p-1 bg-neutral-900/90 rounded-full border border-neutral-800 text-xs">
            <button
              onClick={() => setActiveView('cards')}
              className={`px-4 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
                activeView === 'cards'
                  ? 'bg-[#f5c842] text-black shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Overview Cards
            </button>
            <button
              onClick={() => setActiveView('table')}
              className={`px-4 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
                activeView === 'table'
                  ? 'bg-[#f5c842] text-black shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              All Plans Price Table
            </button>
          </div>
        </div>        {/* 1. THREE DISTINCTIVE CARDS (Matches BASIC, EXCLUSIVE, STANDARD design from CodeCraft Reference) */}
        {activeView === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch pt-2">
            
            {/* LEFT CARD: BASIC (Daily & Weekly Flexible Options) */}
            <motion.div 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              onClick={() => setSelectedPlanId('daily-60')}
              className={`relative bg-[#0d0d11]/90 rounded-3xl p-6 lg:p-7 flex flex-col justify-between transition-all duration-300 border cursor-pointer group ${
                selectedPlanId === 'daily-60' || selectedPlanId === 'weekly-3x'
                  ? 'border-neutral-500 shadow-xl shadow-white/5 ring-1 ring-neutral-400/30'
                  : 'border-neutral-800/90 hover:border-neutral-700'
              }`}
            >
              {/* Header Tab Pill with Yellow Cursor Accent */}
              <div className="relative mb-6">
                <div className="w-full py-2.5 rounded-2xl bg-neutral-900 border border-neutral-700/80 flex items-center justify-center shadow-inner">
                  <span className="text-sm font-extrabold tracking-widest text-white uppercase">
                    BASIC
                  </span>
                </div>
                {/* Yellow Cursor Accent Pinning the Corner */}
                <div className="absolute -top-1.5 -right-1.5 w-6 h-6 flex items-center justify-center pointer-events-none">
                  <svg className="w-5 h-5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] filter" viewBox="0 0 24 24" fill="none">
                    <path d="M4 2L20 10L12 13L9 21L4 2Z" fill="#f5c842" stroke="#000000" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* Card Plans Content */}
              <div className="space-y-4">
                <div className="text-center pb-3 border-b border-neutral-800/80">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Single & Weekly Intro</span>
                  <div className="text-2xl font-black text-white mt-1">AED 200 <span className="text-xs text-neutral-400 font-normal">/ 60 min</span></div>
                  <div className="text-xs text-amber-400/90 font-medium mt-0.5">Or Weekly (3x): AED 525</div>
                </div>

                <div className="space-y-2.5 text-center text-xs text-neutral-300">
                  <div className="py-1 px-2 rounded-lg bg-neutral-900/60 border border-neutral-800/50">
                    <strong className="text-white">DAILY:</strong> 60 Min 1-on-1 Workout
                  </div>
                  <div className="py-1 px-2 rounded-lg bg-neutral-900/60 border border-neutral-800/50">
                    <strong className="text-white">WEEKLY:</strong> 3 Sessions (AED 525)
                  </div>
                  <div className="text-neutral-400 leading-relaxed pt-1">
                    Form & Posture Biomechanical Evaluation
                  </div>
                  <div className="text-neutral-400 leading-relaxed">
                    Personalized Workout Plan & Direct Feedback
                  </div>
                  <div className="text-neutral-400 leading-relaxed">
                    User Training Manual (Standard Issue)
                  </div>
                </div>
              </div>

              {/* Plan Select CTA */}
              <div className="pt-6 mt-4 border-t border-neutral-800/80">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookSelected('Daily / Weekly Basic Plan (AED 200 - AED 525)');
                  }}
                  className="w-full py-2.5 rounded-xl font-bold text-xs bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 transition-all flex items-center justify-center gap-2 cursor-pointer group-hover:border-neutral-500"
                >
                  <span>Select Basic Plan</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>

            {/* CENTER CARD: EXCLUSIVE (Taller, Highlighted Gold Border, 3 Months Mastery) */}
            <motion.div 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onClick={() => setSelectedPlanId('monthly-3m')}
              className={`relative bg-[#0e0e13] rounded-3xl p-6 lg:p-8 flex flex-col justify-between transition-all duration-300 border-2 cursor-pointer group transform md:-translate-y-2 shadow-2xl ${
                selectedPlanId === 'monthly-3m' || selectedPlanId === 'monthly-2m'
                  ? 'border-[#f5c842] shadow-[0_0_35px_rgba(245,200,66,0.18)] ring-1 ring-[#f5c842]/50'
                  : 'border-[#d4af37]/70 hover:border-[#f5c842]'
              }`}
            >
              {/* Highlight Badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-0.5 rounded-full bg-gradient-to-r from-[#f5c842] to-[#d4af37] text-black text-[10px] font-black uppercase tracking-widest shadow-md">
                MOST POPULAR • BEST VALUE
              </div>

              {/* Header Tab Pill with Yellow Cursor Accent */}
              <div className="relative mb-6 mt-1">
                <div className="w-full py-3 rounded-2xl bg-neutral-900 border border-[#f5c842]/50 flex items-center justify-center shadow-[0_0_15px_rgba(245,200,66,0.15)]">
                  <span className="text-sm font-black tracking-widest text-[#f5c842] uppercase">
                    EXCLUSIVE
                  </span>
                </div>
                {/* Yellow Cursor Accent Pinning the Corner */}
                <div className="absolute -top-1.5 -right-1.5 w-6 h-6 flex items-center justify-center pointer-events-none">
                  <svg className="w-5 h-5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] filter" viewBox="0 0 24 24" fill="none">
                    <path d="M4 2L20 10L12 13L9 21L4 2Z" fill="#f5c842" stroke="#000000" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* Card Plans Content */}
              <div className="space-y-4">
                <div className="text-center pb-3 border-b border-neutral-800">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">Complete 3 Months Protocol</span>
                  <div className="text-3xl font-black text-white mt-1">AED 5,500 <span className="text-xs text-neutral-400 font-normal">/ 3 Months</span></div>
                  <div className="text-xs text-[#48d89e] font-semibold mt-0.5">Save AED 2,000 • Or 2 Months: AED 4,000</div>
                </div>

                <div className="space-y-2.5 text-center text-xs text-neutral-200">
                  <div className="py-1.5 px-2 rounded-lg bg-neutral-900/90 border border-amber-500/30 text-amber-200 font-medium">
                    Complete 12-Week Total Transformation
                  </div>
                  <div className="text-neutral-300 leading-relaxed">
                    Advanced Hypertrophy & Fat Loss Protocol
                  </div>
                  <div className="text-neutral-300 leading-relaxed">
                    Personalized Macro & Nutrition Programming
                  </div>
                  <div className="text-neutral-300 leading-relaxed">
                    1-on-1 Direct 24/7 WhatsApp VIP Accountability
                  </div>
                  <div className="text-neutral-300 leading-relaxed">
                    InBody Composition & Biometric Check-ins
                  </div>
                  <div className="text-neutral-400 leading-relaxed">
                    User Transformation Manual (Standard Issue)
                  </div>
                </div>
              </div>

              {/* Plan Select CTA */}
              <div className="pt-6 mt-4 border-t border-neutral-800">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookSelected('3 Months Total Physique Mastery (AED 5,500)');
                  }}
                  className="w-full py-3 rounded-xl font-extrabold text-xs bg-[#f5c842] hover:bg-amber-300 text-black shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Book Exclusive 3-Month Plan</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </motion.div>

            {/* RIGHT CARD: STANDARD (1 Month Dedicated Program) */}
            <motion.div 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              onClick={() => setSelectedPlanId('monthly-1m')}
              className={`relative bg-[#0d0d11]/90 rounded-3xl p-6 lg:p-7 flex flex-col justify-between transition-all duration-300 border cursor-pointer group ${
                selectedPlanId === 'monthly-1m'
                  ? 'border-neutral-500 shadow-xl shadow-white/5 ring-1 ring-neutral-400/30'
                  : 'border-neutral-800/90 hover:border-neutral-700'
              }`}
            >
              {/* Header Tab Pill with Yellow Cursor Accent */}
              <div className="relative mb-6">
                <div className="w-full py-2.5 rounded-2xl bg-neutral-900 border border-neutral-700/80 flex items-center justify-center shadow-inner">
                  <span className="text-sm font-extrabold tracking-widest text-white uppercase">
                    STANDARD
                  </span>
                </div>
                {/* Yellow Cursor Accent Pinning the Corner */}
                <div className="absolute -top-1.5 -right-1.5 w-6 h-6 flex items-center justify-center pointer-events-none">
                  <svg className="w-5 h-5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] filter" viewBox="0 0 24 24" fill="none">
                    <path d="M4 2L20 10L12 13L9 21L4 2Z" fill="#f5c842" stroke="#000000" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* Card Plans Content */}
              <div className="space-y-4">
                <div className="text-center pb-3 border-b border-neutral-800/80">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">1 Month Program</span>
                  <div className="text-2xl font-black text-white mt-1">AED 2,500 <span className="text-xs text-neutral-400 font-normal">/ 1 Month</span></div>
                  <div className="text-xs text-neutral-400 font-medium mt-0.5">Comprehensive Single-Month Block</div>
                </div>

                <div className="space-y-2.5 text-center text-xs text-neutral-300">
                  <div className="py-1 px-2 rounded-lg bg-neutral-900/60 border border-neutral-800/50">
                    <strong className="text-white">MONTHLY:</strong> 1 Full Month (AED 2,500)
                  </div>
                  <div className="text-neutral-400 leading-relaxed">
                    Customized Resistance & Cardio Structure
                  </div>
                  <div className="text-neutral-400 leading-relaxed">
                    Tailored Macronutrient Breakdown
                  </div>
                  <div className="text-neutral-400 leading-relaxed">
                    Bi-Weekly Form Analysis & Check-ins
                  </div>
                  <div className="text-neutral-400 leading-relaxed">
                    User Training Manual (Standard Issue)
                  </div>
                </div>
              </div>

              {/* Plan Select CTA */}
              <div className="pt-6 mt-4 border-t border-neutral-800/80">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookSelected('1 Month Intensive Transformation (AED 2,500)');
                  }}
                  className="w-full py-2.5 rounded-xl font-bold text-xs bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 transition-all flex items-center justify-center gap-2 cursor-pointer group-hover:border-neutral-500"
                >
                  <span>Select Standard Plan</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* 2. COMPLETE TRAINING PRICE TABLE (All 5 Plans from user's table) */}
        {activeView === 'table' && (
          <div className="bg-[#0e0e14]/90 rounded-3xl border border-neutral-800 overflow-hidden shadow-xl p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between px-2">
              <div>
                <h3 className="text-base font-bold text-white uppercase tracking-wider">
                  TRAINING PRICES & FREQUENCIES
                </h3>
                <p className="text-xs text-neutral-400">Click any row to select your training tier</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#2eb886] font-semibold">
                <ShieldCheck className="w-4 h-4" /> 100% Results Guaranteed
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-neutral-800 text-[11px] font-bold uppercase tracking-widest text-neutral-400">
                    <th className="py-3 px-4">PLAN</th>
                    <th className="py-3 px-4">DURATION / FREQUENCY</th>
                    <th className="py-3 px-4">DETAILS & INCLUSIONS</th>
                    <th className="py-3 px-4 text-right">PRICE</th>
                    <th className="py-3 px-4 text-center">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-900 text-xs">
                  {TRAINING_PLANS.map((plan) => {
                    const isSelected = selectedPlanId === plan.id;
                    return (
                      <tr 
                        key={plan.id}
                        onClick={() => setSelectedPlanId(plan.id)}
                        className={`transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#f5c842]/10 text-white font-medium'
                            : 'hover:bg-neutral-900/60 text-neutral-300'
                        }`}
                      >
                        <td className="py-3.5 px-4 font-black">
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#f5c842]' : 'bg-neutral-600'}`} />
                            <span className={isSelected ? 'text-[#f5c842]' : 'text-white'}>{plan.category}</span>
                            {plan.popular && (
                              <span className="px-2 py-0.5 rounded-full bg-[#f5c842] text-black text-[9px] font-black uppercase">
                                Best
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-white">
                          {plan.duration}
                        </td>
                        <td className="py-3.5 px-4 text-neutral-300 max-w-xs truncate">
                          {plan.description}
                        </td>
                        <td className="py-3.5 px-4 text-right font-black text-sm text-[#f5c842]">
                          {plan.priceFormatted}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleBookSelected(`${plan.category} (${plan.duration}) - ${plan.priceFormatted}`);
                            }}
                            className={`px-3 py-1.5 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#f5c842] text-black shadow'
                                : 'bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700'
                            }`}
                          >
                            Book Plan
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. REFERENCE PILL BANNER: (Matches "EACH SERVICE MEANS CUSTOMISATIONS TO THE PROTOTYPE WEBSITE.") */}
        <div className="flex justify-center pt-2">
          <div className="px-6 py-2.5 rounded-full bg-[#121217] border border-neutral-800/90 text-center shadow-lg max-w-2xl">
            <p className="text-[10px] sm:text-xs tracking-wider text-neutral-300 font-semibold uppercase">
              EACH PLAN MEANS BESPOKE CUSTOMISATIONS TO ACCELERATE YOUR TRANSFORMATION.
            </p>
          </div>
        </div>

        {/* 4. "START YOUR TRAINING JOURNEY" & PROMINENT [ BOOK YOUR TRAINING ] CTA */}
        <div className="bg-gradient-to-b from-[#111116] to-[#0a0a0d] rounded-3xl border border-neutral-800 p-6 sm:p-8 text-center space-y-4 shadow-xl">
          <div className="space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              START YOUR TRAINING JOURNEY
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto">
              Choose the plan that works best for you and take the first step toward becoming stronger, fitter, and more confident.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleBookSelected()}
              className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-[#f5c842] via-[#ffea79] to-[#d4af37] text-black font-extrabold text-sm sm:text-base tracking-wider uppercase shadow-[0_0_25px_rgba(245,200,66,0.35)] hover:shadow-[0_0_35px_rgba(245,200,66,0.6)] hover:scale-[1.02] transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <span>BOOK YOUR TRAINING</span>
              <ArrowUpRight className="w-5 h-5 stroke-[3]" />
            </button>

            <a
              href={`https://wa.me/971529421132?text=${encodeURIComponent(
                `Hi Coach Douglas, I would like to book the ${currentPlan.name} (${currentPlan.duration} - ${currentPlan.priceFormatted}) for personal training.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs sm:text-sm tracking-wide border border-neutral-700 hover:border-[#2eb886] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#2eb886]" />
              <span>WhatsApp: +971 52 942 1132</span>
            </a>
          </div>

          <div className="text-[11px] text-neutral-500 pt-1">
            Currently selected: <span className="text-[#f5c842] font-semibold">{currentPlan.name} ({currentPlan.duration} — {currentPlan.priceFormatted})</span>
          </div>
        </div>

      </main>

      {/* 5. FOOTER BRANDING BAR (Matches reference image's <codecraft | @codecraftng footer style) */}
      <footer className="pt-6 border-t border-neutral-900/90 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 mt-6">
        
        {/* Left: Brand Identity in reference style */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#f5c842] text-black font-black text-base flex items-center justify-center shadow-md">
            &lt;
          </div>
          <div>
            <div className="text-white font-black tracking-tight text-sm uppercase">
              COACH DOUGLAS
            </div>
            <div className="text-[10px] text-neutral-400 tracking-wider uppercase">
              PERSONAL TRAINING & ONLINE COACHING
            </div>
          </div>
        </div>

        {/* Center: Return to Home button */}
        <button
          onClick={onNavigateToHome}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 hover:border-[#f5c842] transition-all text-xs font-semibold cursor-pointer group"
        >
          <Home className="w-3.5 h-3.5 text-[#f5c842] group-hover:scale-110 transition-transform" />
          <span>Back to Home</span>
        </button>

        {/* Right: Instagram handle pill in reference style */}
        <div className="flex items-center gap-3">
          <a
            href="https://www.instagram.com/healinghands_fitness?utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-neutral-900/90 border border-neutral-800 text-white hover:border-[#f5c842] transition-colors"
          >
            <div className="w-5 h-5 rounded-md bg-neutral-800 flex items-center justify-center">
              <Instagram className="w-3.5 h-3.5 text-[#f5c842]" />
            </div>
            <span className="text-xs font-mono font-medium text-neutral-300">@healinghands_fitness</span>
          </a>

          <div className="hidden sm:flex items-center gap-2 text-[11px] text-neutral-500">
            <span className="w-2 h-2 rounded-full bg-[#2eb886]" />
            <span>Accepting New Clients</span>
          </div>
        </div>

      </footer>
    </div>
  );
}
