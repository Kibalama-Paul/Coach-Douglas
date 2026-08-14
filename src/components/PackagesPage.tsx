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
  ChevronLeft,
  MapPin,
  Mail,
  Phone,
  UserCheck,
  Ruler,
  Activity,
  FileText,
  Target,
  Compass,
  ClipboardList,
  TrendingUp,
  Globe,
  User
} from 'lucide-react';
import { BannerContent } from '../types';

interface PackagesPageProps {
  content: BannerContent;
  isEmbedded?: boolean;
  onNavigateToHome?: () => void;
  onGetInTouch?: (pkgName?: string) => void;
}

export interface TrainingOption {
  id: string;
  name: string;
  badge: string;
  category: string;
  description: string;
  features: string[];
  formats: ('One-on-One Personal Training' | 'Online Coaching')[];
  accent: string;
  glowColor: string;
}

export const PERSONAL_TRAINING_OPTIONS: TrainingOption[] = [
  {
    id: 'daily',
    name: 'DAILY',
    badge: 'Single Session Focus',
    category: 'Session Intake',
    description: '60-minute personal training session',
    features: [
      '60 Min Intensive 1-on-1 Coaching',
      'Immediate Biomechanical & Technique Evaluation',
      'Post-Workout Recovery Guidance & Form Review'
    ],
    formats: ['One-on-One Personal Training', 'Online Coaching'],
    accent: '#FF6B35',
    glowColor: 'rgba(255, 107, 53, 0.25)',
  },
  {
    id: 'weekly',
    name: 'WEEKLY',
    badge: 'High Frequency',
    category: 'Weekly Impulse',
    description: '3–4 training sessions per week',
    features: [
      '3–4 High-Output Sessions Per Week',
      'Targeted Muscle Group Split Programming',
      'Weekly Workload & Recovery Audit'
    ],
    formats: ['One-on-One Personal Training', 'Online Coaching'],
    accent: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.25)',
  },
  {
    id: 'one-month',
    name: 'ONE MONTH',
    badge: '4-Week Program',
    category: 'Foundation Block',
    description: 'Structured personal training/coaching program',
    features: [
      'Customized Resistance & Cardio Structure',
      'Macronutrient Breakdown & Meal Planning',
      'Bi-Weekly Form & Biometric Audits'
    ],
    formats: ['One-on-One Personal Training', 'Online Coaching'],
    accent: '#EC4899',
    glowColor: 'rgba(236, 72, 153, 0.25)',
  },
  {
    id: 'two-months',
    name: 'TWO MONTHS',
    badge: '8-Week Program',
    category: 'Progressive Shred & Build',
    description: 'Progressive transformation program',
    features: [
      'Phase 1 & Phase 2 Periodized Loading Split',
      'Targeted Body Recomposition Strategy',
      'Biometric Check-ins & InBody Scans'
    ],
    formats: ['One-on-One Personal Training', 'Online Coaching'],
    accent: '#FACC15',
    glowColor: 'rgba(250, 204, 21, 0.25)',
  },
  {
    id: 'three-months',
    name: 'THREE MONTHS',
    badge: '12-Week Protocol',
    category: 'Total Physique Mastery',
    description: 'Comprehensive transformation and performance program',
    features: [
      '12-Week Complete Body & Mind Overhaul',
      'Custom Macro, Supplementation & Habit Audit',
      '24/7 VIP Priority Direct WhatsApp Mentorship'
    ],
    formats: ['One-on-One Personal Training', 'Online Coaching'],
    accent: '#8B5CF6',
    glowColor: 'rgba(139, 92, 246, 0.25)',
  },
  {
    id: 'one-year',
    name: 'ONE YEAR',
    badge: '52-Week Mastery',
    category: 'Long-Term Lifestyle & Performance',
    description: 'Long-term fitness, lifestyle and performance coaching',
    features: [
      'Year-Round Periodization & Peak Performance Phases',
      'Continuous Biomechanical Calibration & Joint Health',
      'Complete Lifestyle, Executive & Athletic Mastery'
    ],
    formats: ['One-on-One Personal Training', 'Online Coaching'],
    accent: '#FF6B35',
    glowColor: 'rgba(255, 107, 53, 0.3)',
  },
];

export const INCLUDED_FEATURES = [
  {
    title: 'One-on-One Assessment',
    desc: 'Comprehensive initial evaluation of physical baseline, kinetic movement patterns, and posture.',
    icon: UserCheck,
    color: '#FF6B35',
  },
  {
    title: 'Body Measurements',
    desc: 'Precise circumference tracking to monitor structural muscle growth and body composition changes.',
    icon: Ruler,
    color: '#10B981',
  },
  {
    title: 'BMI Assessment',
    desc: 'Scientific body mass index and health ratio calculation for accurate data-driven tracking.',
    icon: Activity,
    color: '#EC4899',
  },
  {
    title: 'Client Bio/Profile',
    desc: 'Customized digital athlete profile documenting your training background, biometrics, and milestones.',
    icon: FileText,
    color: '#FACC15',
  },
  {
    title: 'Personal Goals & Aspirations',
    desc: 'Deep goal alignment consultation targeting hyper-specific aesthetic, strength, and health targets.',
    icon: Target,
    color: '#8B5CF6',
  },
  {
    title: 'Fitness & Lifestyle Assessment',
    desc: 'Holistic audit of daily activity levels, sleep hygiene, stress management, and nutrition habits.',
    icon: Compass,
    color: '#FF6B35',
  },
  {
    title: 'Functional Training Programs',
    desc: 'Dynamic multi-planar routines engineered to enhance real-world athletic power, agility, and core stability.',
    icon: Dumbbell,
    color: '#10B981',
  },
  {
    title: 'Corrective Exercise Programs',
    desc: 'Targeted joint decompression and kinetic mobility drills to resolve postural imbalances and prevent injury.',
    icon: ShieldCheck,
    color: '#EC4899',
  },
  {
    title: 'Personalized Training Plans',
    desc: 'Bespoke workout split blueprints tailored to your body type, timeline, and recovery capacity.',
    icon: ClipboardList,
    color: '#FACC15',
  },
  {
    title: 'Progress Tracking',
    desc: 'Real-time logging of progressive overload gains, body fat loss, and strength performance markers.',
    icon: TrendingUp,
    color: '#8B5CF6',
  },
  {
    title: 'Ongoing Coaching & Guidance',
    desc: '24/7 direct mentor access, real-time strategy adjustments, and unrelenting motivation from Coach Douglas.',
    icon: Award,
    color: '#10B981',
  },
];

export function PackagesPage({ content, isEmbedded = false, onNavigateToHome, onGetInTouch }: PackagesPageProps) {
  const [selectedOptionId, setSelectedOptionId] = useState<string>('three-months');
  const [selectedFormat, setSelectedFormat] = useState<'One-on-One Personal Training' | 'Online Coaching'>('One-on-One Personal Training');

  const currentOption = PERSONAL_TRAINING_OPTIONS.find((o) => o.id === selectedOptionId) || PERSONAL_TRAINING_OPTIONS[4];

  const handleBookSelected = (optionName?: string, formatOverride?: string) => {
    const targetFormat = formatOverride || selectedFormat;
    const targetName = optionName || `${currentOption.name} (${currentOption.description}) — Mode: ${targetFormat}`;
    if (onGetInTouch) {
      onGetInTouch(targetName);
    }
  };

  return (
    <div className="w-full bg-transparent text-white min-h-[900px] rounded-3xl border border-neutral-900/60 shadow-2xl p-3.5 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-between relative overflow-hidden font-montserrat select-none backdrop-blur-[2px]">
      
      {/* Studio Ambient Glows */}
      <div className="absolute -top-16 left-1/4 w-96 h-80 bg-gradient-to-b from-white/10 via-amber-200/5 to-transparent blur-3xl pointer-events-none transform -rotate-12" />
      <div className="absolute -top-16 right-1/4 w-96 h-80 bg-gradient-to-b from-white/10 via-amber-200/5 to-transparent blur-3xl pointer-events-none transform rotate-12" />
      
      <div className="absolute -top-36 -right-36 w-96 h-96 rounded-full bg-[#10B981]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-36 -left-36 w-96 h-96 rounded-full bg-[#FF6B35]/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-radial from-[#FACC15]/5 via-transparent to-transparent blur-3xl pointer-events-none" />

      {/* Top Navigation Header - Hidden on Home Page when isEmbedded is true */}
      {!isEmbedded && (
        <header className="flex items-center justify-between gap-3 sm:gap-4 w-full shrink-0 relative z-20 pb-4 border-b border-neutral-900/80">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={onNavigateToHome}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 hover:border-[#FF6B35] transition-all text-xs font-bold shadow-sm cursor-pointer group"
              title="Return to Home Page"
            >
              <ChevronLeft className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#FF6B35] transition-colors" />
              <Home className="w-3.5 h-3.5 text-[#FF6B35]" />
              <span className="hidden sm:inline">Home</span>
            </button>

            <div 
              className="flex items-center gap-2.5 cursor-pointer group" 
              onClick={onNavigateToHome}
              title="Back to Home"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] ring-4 ring-[#10B981]/20 animate-pulse" />
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-1 group-hover:text-[#FF6B35] transition-colors">
                {content.brandName}
                <span className="text-[#FF6B35] text-xl font-black leading-none">.</span>
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
                        ? 'text-[#FF6B35] font-bold border-b-2 border-[#FF6B35] pb-0.5'
                        : isHome
                        ? 'text-neutral-300 hover:text-white font-semibold'
                        : 'hover:text-white text-neutral-400'
                    }`}
                  >
                    {isHome && <Home className="w-3.5 h-3.5 text-[#FF6B35]" />}
                    {link}
                  </span>
                );
              })}
            </nav>

            <div
              onClick={() => handleBookSelected()}
              className="group flex items-center gap-2 sm:gap-3 bg-white text-black pl-4 sm:pl-5 pr-2 py-1.5 sm:py-2 rounded-full font-bold text-xs sm:text-sm tracking-tight hover:bg-[#FF6B35] transition-all shadow-lg hover:shadow-orange-500/20 cursor-pointer"
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
      <main className="py-6 sm:py-8 relative z-10 space-y-12 max-w-6xl mx-auto w-full">
        
        {/* HERO HEADER: Glowing Bounding Frame for PERSONAL TRAINING OPTIONS */}
        <div className="flex flex-col items-center justify-center text-center space-y-4 pt-2">
          
          <div className="relative inline-block px-6 py-3.5 sm:px-12 sm:py-5 my-2">
            {/* Orange/Gold Bounding Frame */}
            <div className="absolute inset-0 border-[1.5px] border-[#FF6B35] shadow-[0_0_30px_rgba(255,107,53,0.35)] rounded-none pointer-events-none" />
            
            {/* Control Handles on Corners & Midpoints */}
            <span className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-[#FACC15] border border-black shadow-[0_0_8px_#FACC15]" />
            <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#FACC15] border border-black shadow-[0_0_8px_#FACC15]" />
            <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-[#FACC15] border border-black shadow-[0_0_8px_#FACC15]" />
            <span className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-[#FACC15] border border-black shadow-[0_0_8px_#FACC15]" />
            <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#FACC15] border border-black shadow-[0_0_8px_#FACC15]" />
            <span className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-3 bg-[#FACC15] border border-black shadow-[0_0_8px_#FACC15]" />
            <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-[#FACC15] border border-black shadow-[0_0_8px_#FACC15]" />
            <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-[#FACC15] border border-black shadow-[0_0_8px_#FACC15]" />

            {/* 3D Cursor pointer clicking the corner */}
            <div className="absolute -bottom-5 -right-7 sm:-bottom-7 sm:-right-9 z-20 flex items-start pointer-events-none select-none">
              <div className="absolute -top-2 -left-2 w-7 h-7 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-[#FACC15] rounded-full shadow-[0_0_12px_#FACC15]" />
                <span className="absolute w-4 h-0.5 bg-[#FF6B35]/90 rotate-45" />
                <span className="absolute w-4 h-0.5 bg-[#FF6B35]/90 -rotate-45" />
              </div>
              <svg className="w-7 h-7 sm:w-9 sm:h-9 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] filter" viewBox="0 0 24 24" fill="none">
                <path d="M4 2L20 10L12 13L9 21L4 2Z" fill="#ffffff" stroke="#1c1c1e" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M6 5.5L16.5 10.8L11.5 12.8L9.5 17.5L6 5.5Z" fill="#f4f4f6" />
              </svg>
            </div>

            {/* Main Header Title */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-b from-white via-[#FF6B35] to-[#FACC15] bg-clip-text text-transparent filter drop-shadow-[0_4px_16px_rgba(255,107,53,0.35)] uppercase">
              PERSONAL TRAINING OPTIONS
            </h1>
          </div>

          {/* Subtitle */}
          <div className="space-y-1.5 max-w-2xl mx-auto px-4">
            <h2 className="text-xs sm:text-sm font-bold tracking-widest text-[#10B981] uppercase flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              10 YEARS EXPERIENCE • BESPOKE PROTOCOLS
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 font-medium leading-relaxed">
              Select your preferred duration. All options can be delivered through dedicated <strong className="text-white">One-on-One Personal Training</strong> or <strong className="text-white">Worldwide Online Coaching</strong>.
            </p>
          </div>
        </div>

        {/* FORMAT SELECTION BANNER: ONE-ON-ONE VS ONLINE COACHING */}
        <div className="bg-[#0e0e13]/90 rounded-3xl border border-neutral-800/90 p-5 sm:p-7 shadow-xl backdrop-blur-md space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-neutral-800/80">
            <div>
              <span className="text-[11px] font-bold text-[#FACC15] uppercase tracking-wider block">Coaching Delivery Mode</span>
              <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight">
                Choose Your Coaching Format
              </h3>
            </div>
            
            {/* Format Selector Pills */}
            <div className="flex items-center gap-2 bg-neutral-950 p-1.5 rounded-2xl border border-neutral-800">
              <button
                onClick={() => setSelectedFormat('One-on-One Personal Training')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  selectedFormat === 'One-on-One Personal Training'
                    ? 'bg-[#FF6B35] text-black shadow-lg shadow-orange-500/20'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Dumbbell className="w-3.5 h-3.5" />
                <span>One-on-One Personal Training</span>
              </button>

              <button
                onClick={() => setSelectedFormat('Online Coaching')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  selectedFormat === 'Online Coaching'
                    ? 'bg-[#8B5CF6] text-white shadow-lg shadow-purple-500/20'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Online Coaching</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            {/* One-on-One Personal Training Callout */}
            <div 
              onClick={() => setSelectedFormat('One-on-One Personal Training')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                selectedFormat === 'One-on-One Personal Training'
                  ? 'bg-[#FF6B35]/10 border-[#FF6B35] shadow-lg shadow-orange-500/10'
                  : 'bg-neutral-900/50 border-neutral-800/80 hover:border-neutral-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-white text-sm">
                  <Dumbbell className="w-4 h-4 text-[#FF6B35]" />
                  <span>One-on-One Personal Training</span>
                </div>
                <span className="text-[10px] font-black uppercase text-[#FF6B35] bg-[#FF6B35]/15 px-2.5 py-0.5 rounded-full border border-[#FF6B35]/30">
                  Private & Hands-on
                </span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Dedicated private hands-on coaching with real-time biomechanical analysis, instant posture calibration, and maximum workout intensity in person.
              </p>
            </div>

            {/* Online Coaching Callout */}
            <div 
              onClick={() => setSelectedFormat('Online Coaching')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                selectedFormat === 'Online Coaching'
                  ? 'bg-[#8B5CF6]/10 border-[#8B5CF6] shadow-lg shadow-purple-500/10'
                  : 'bg-neutral-900/50 border-neutral-800/80 hover:border-neutral-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-white text-sm">
                  <Globe className="w-4 h-4 text-[#8B5CF6]" />
                  <span>Worldwide Online Coaching</span>
                </div>
                <span className="text-[10px] font-black uppercase text-[#8B5CF6] bg-[#8B5CF6]/15 px-2.5 py-0.5 rounded-full border border-[#8B5CF6]/30">
                  Custom App & 24/7 Access
                </span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Seamless digital fitness coaching with bespoke mobile app protocols, weekly video audits, nutritional strategies, and round-the-clock direct coach mentorship.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 1: THE 6 PERSONAL TRAINING OPTIONS GRID (NO PRICES DISPLAYED) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#FF6B35]" />
              SELECT YOUR DURATION PROTOCOL
            </h3>
            <span className="text-xs font-mono text-neutral-400">
              Selected Format: <span className="text-[#FF6B35] font-bold">{selectedFormat}</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
            {PERSONAL_TRAINING_OPTIONS.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              return (
                <motion.div
                  key={opt.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setSelectedOptionId(opt.id)}
                  className={`relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 border cursor-pointer group bg-[#0c0c11]/90 backdrop-blur-md ${
                    isSelected
                      ? 'border-2 shadow-2xl ring-1'
                      : 'border-neutral-800/90 hover:border-neutral-700'
                  }`}
                  style={{
                    borderColor: isSelected ? opt.accent : undefined,
                    boxShadow: isSelected ? `0 0 30px ${opt.glowColor}` : undefined,
                  }}
                >
                  {/* Top Badge */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-800/80">
                    <span 
                      className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border"
                      style={{ color: opt.accent, borderColor: `${opt.accent}40`, backgroundColor: `${opt.accent}15` }}
                    >
                      {opt.badge}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-400">
                      {opt.category}
                    </span>
                  </div>

                  {/* Title & Main Description */}
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-2xl font-black text-white tracking-wider uppercase font-bingo">
                        {opt.name}
                      </h4>
                      <p className="text-xs font-bold mt-1 text-neutral-200" style={{ color: opt.accent }}>
                        {opt.description}
                      </p>
                    </div>

                    {/* Features list */}
                    <div className="space-y-2 pt-2 border-t border-neutral-800/60">
                      {opt.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                          <Check className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: opt.accent }} />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Available Delivery Modes & CTA */}
                  <div className="pt-6 mt-6 border-t border-neutral-800/80 space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-neutral-400">
                      <span>Format Flexibility:</span>
                      <span className="font-semibold text-white">One-on-One OR Online</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedOptionId(opt.id);
                        handleBookSelected(`${opt.name} (${opt.description})`);
                      }}
                      className="w-full py-3 rounded-xl font-extrabold text-xs text-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                      style={{ backgroundColor: opt.accent }}
                    >
                      <span>Inquire For {opt.name}</span>
                      <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* SECTION 2: WHAT EVERY SELECTED PACKAGE INCLUDES */}
        <section className="bg-gradient-to-b from-[#111116] via-[#0d0d12] to-[#08080a] rounded-3xl border border-neutral-800 p-6 sm:p-10 space-y-8 shadow-2xl relative overflow-hidden">
          
          <div className="relative z-10 space-y-2 text-center max-w-3xl mx-auto">
            <span className="px-3.5 py-1 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 text-[#10B981] text-xs font-black uppercase tracking-widest inline-block">
              PREMIUM STANDARDS INCLUDED
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
              WHAT EVERY SELECTED PACKAGE INCLUDES
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400">
              Regardless of the duration or coaching format you choose, every client receives Coach Douglas’s signature 11-step comprehensive assessment and optimization framework.
            </p>
          </div>

          {/* 11 Premium Included Features Grid */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {INCLUDED_FEATURES.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  className="p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800/90 hover:border-neutral-700 transition-all flex items-start gap-4 group"
                >
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border"
                    style={{ 
                      backgroundColor: `${item.color}15`, 
                      borderColor: `${item.color}35`,
                      color: item.color 
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white tracking-wide group-hover:text-[#FACC15] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="relative z-10 text-center pt-2">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900/90 border border-neutral-800 text-neutral-300 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              <span>Zero Hidden Fees • 100% Tailored Biomechanical Guidance</span>
            </div>
          </div>
        </section>

        {/* SECTION 3: PROMINENT CTA BANNER */}
        <div className="bg-gradient-to-r from-[#111116] via-[#16141d] to-[#0d0d12] rounded-3xl border border-neutral-800 p-6 sm:p-10 text-center space-y-6 shadow-xl">
          <div className="space-y-2 max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              READY TO LOCK IN YOUR INTAKE?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400">
              Select your package duration and lock in your custom training consultation directly with Coach Douglas.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-1">
            <button
              onClick={() => handleBookSelected()}
              className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-[#FF6B35] via-[#EC4899] to-[#FACC15] text-black font-extrabold text-sm sm:text-base tracking-wider uppercase shadow-[0_0_25px_rgba(255,107,53,0.35)] hover:shadow-[0_0_35px_rgba(255,107,53,0.6)] hover:scale-[1.02] transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <span>INQUIRE FOR YOUR PACKAGE</span>
              <ArrowUpRight className="w-5 h-5 stroke-[3]" />
            </button>

            <a
              href={`https://wa.me/971529421132?text=${encodeURIComponent(
                `Hi Coach Douglas, I am interested in inquiring about the ${currentOption.name} (${currentOption.description}) option via ${selectedFormat}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs sm:text-sm tracking-wide border border-neutral-700 hover:border-[#10B981] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#10B981]" />
              <span>WhatsApp Direct Mentorship</span>
            </a>
          </div>

          <div className="text-[11px] text-neutral-500">
            Selected Option: <span className="text-[#FF6B35] font-semibold">{currentOption.name} ({currentOption.description})</span> • Format: <span className="text-[#8B5CF6] font-semibold">{selectedFormat}</span>
          </div>
        </div>

      </main>

      {/* FOOTER BRANDING BAR */}
      <footer className="pt-6 border-t border-neutral-900/90 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 mt-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#FF6B35] text-black font-black text-base flex items-center justify-center shadow-md">
            &lt;
          </div>
          <div>
            <div className="text-white font-black tracking-tight text-sm uppercase">
              COACH DOUGLAS
            </div>
            <div className="text-[10px] text-neutral-400 tracking-wider uppercase">
              1-ON-1 PERSONAL TRAINING & WORLDWIDE ONLINE COACHING
            </div>
          </div>
        </div>

        {!isEmbedded && (
          <button
            onClick={onNavigateToHome}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 hover:border-[#FF6B35] transition-all text-xs font-semibold cursor-pointer group"
          >
            <Home className="w-3.5 h-3.5 text-[#FF6B35] group-hover:scale-110 transition-transform" />
            <span>Back to Home</span>
          </button>
        )}

        <div className="flex items-center gap-3">
          <a
            href="https://www.instagram.com/healinghands_fitness?utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-neutral-900/90 border border-neutral-800 text-white hover:border-[#EC4899] transition-colors"
          >
            <div className="w-5 h-5 rounded-md bg-neutral-800 flex items-center justify-center">
              <Instagram className="w-3.5 h-3.5 text-[#EC4899]" />
            </div>
            <span className="text-xs font-mono font-medium text-neutral-300">@healinghands_fitness</span>
          </a>

          <div className="hidden sm:flex items-center gap-2 text-[11px] text-neutral-500">
            <span className="w-2 h-2 rounded-full bg-[#10B981]" />
            <span>10 Yrs Experience • Active Roster</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
