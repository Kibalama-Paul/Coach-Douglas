import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  ArrowUpRight, 
  Flame, 
  Activity, 
  TrendingUp, 
  Clock,
  Sparkles,
  Zap,
  Dumbbell,
  Home,
  Package,
  Phone,
  Calendar,
  MessageCircle,
  Award,
  ChevronLeft
} from 'lucide-react';

interface ShowcaseSectionProps {
  onGetInTouch?: (serviceName?: string) => void;
  onNavigate?: (page: string) => void;
}

const SERVICES_CAROUSEL = [
  {
    id: '01',
    title: 'Personal Training',
    tagline: 'Dubai 1-on-1 In-Person VIP Coaching',
    description:
      'One-on-one coaching in Dubai with personalized workouts, technique correction, motivation, and continuous progress monitoring.',
    stats: 'Private Gyms / Residences',
    accent: '#d4af37',
  },
  {
    id: '02',
    title: 'Online Coaching',
    tagline: 'Worldwide Elite Programming & Accountability',
    description:
      'Get professional fitness coaching wherever you are in the world, with structured programs and ongoing support.',
    stats: 'Custom App + 24/7 Support',
    accent: '#2eb886',
  },
  {
    id: '03',
    title: 'Body Transformation',
    tagline: 'Comprehensive Metabolic & Physique Overhaul',
    description:
      'A complete approach combining training, nutrition, accountability, and lifestyle strategies to help you achieve lasting results.',
    stats: 'Fat Loss & Hypertrophy',
    accent: '#d4af37',
  },
  {
    id: '04',
    title: 'Strength & Conditioning',
    tagline: 'Athletic Power, Mobility & Longevity',
    description:
      'Build strength, improve athletic performance, increase endurance, and develop a stronger, more capable body.',
    stats: '8+ Years Proven Expertise',
    accent: '#2eb886',
  },
];

const HIGHLIGHTS = [
  'Personalized Training Programs',
  'Worldwide Online Coaching',
  'Strength & Muscle Development',
  'Fat Loss & Body Transformation',
  'Nutrition Guidance',
  'Progress Tracking',
  'One-on-One Accountability',
];

export function ShowcaseSection({ onGetInTouch, onNavigate }: ShowcaseSectionProps) {
  const [activeServiceIdx, setActiveServiceIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [leftPhoneTab, setLeftPhoneTab] = useState<'home' | 'services' | 'packages' | 'transform' | 'contact'>('home');
  const [rightPhoneTab, setRightPhoneTab] = useState<'home' | 'services' | 'packages' | 'transform' | 'contact'>('transform');

  // 5-second interval timer for the middle services section
  useEffect(() => {
    const intervalTime = 5000;
    const stepTime = 50;
    const stepIncrement = (stepTime / intervalTime) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveServiceIdx((curr) => (curr + 1) % SERVICES_CAROUSEL.length);
          return 0;
        }
        return prev + stepIncrement;
      });
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const activeService = SERVICES_CAROUSEL[activeServiceIdx];

  const handlePhoneNav = (tab: 'home' | 'services' | 'packages' | 'transform' | 'contact', isLeft: boolean) => {
    if (isLeft) {
      setLeftPhoneTab(tab);
    } else {
      setRightPhoneTab(tab);
    }

    if (tab === 'packages' && onNavigate) {
      onNavigate('packages');
    } else if (tab === 'contact' && onGetInTouch) {
      onGetInTouch('Mobile App Inquiry');
    }
  };

  interface NavButtonItem {
    id: 'home' | 'services' | 'packages' | 'transform' | 'contact';
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    highlight?: boolean;
  }

  const navButtons: NavButtonItem[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'services', label: 'Services', icon: Dumbbell },
    { id: 'packages', label: 'Packages', icon: Package, highlight: true },
    { id: 'transform', label: 'Transform', icon: TrendingUp },
    { id: 'contact', label: 'Contact', icon: Phone },
  ];

  return (
    <section id="showcase-services" className="w-full bg-black text-white rounded-3xl border border-neutral-900 shadow-2xl p-5 sm:p-7 lg:p-9 relative overflow-hidden my-0">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#2eb886]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#d4af37]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto space-y-2 mb-6 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Elite Fitness Coaching Ecosystem
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white uppercase">
          Why Train With <span className="text-[#d4af37]">Coach Douglas?</span>
        </h2>
        <p className="text-xs sm:text-sm font-semibold tracking-wider text-[#2eb886] uppercase">
          TRAIN WITH PURPOSE. TRANSFORM WITH A PLAN.
        </p>
        <p className="text-xs text-neutral-300 max-w-2xl mx-auto leading-relaxed">
          Your goals are unique, and your training should be too. Coach Douglas Sebugwawo combines structured workouts, professional guidance, accountability, and personalized coaching to help you achieve measurable results.
        </p>
      </motion.div>

      {/* 3-Column Grid: Left Phone Screen | Middle Animated Services | Right Phone Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-center relative z-10">
        
        {/* ================= LEFT PHONE SCREEN: Plan & Purpose App UI ================= */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-4 flex flex-col items-center"
        >
          {/* Realistic iPhone Bezel with top & bottom navigation */}
          <div className="w-full max-w-[320px] bg-[#0d0d10] border-[6px] border-[#222228] rounded-[44px] p-3.5 shadow-2xl relative shadow-black/80 ring-1 ring-white/10 flex flex-col justify-between min-h-[580px]">
            {/* Speaker & camera notch */}
            <div>
              <div className="w-24 h-3.5 bg-[#222228] rounded-full mx-auto mb-2.5 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-black/80" />
              </div>

              {/* Mobile Phone Top Header Bar */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-800/80">
                <span className="text-[10px] font-bold text-[#d4af37] flex items-center gap-1 drop-shadow-[0_0_6px_rgba(212,175,55,0.4)]">
                  <Flame className="w-3 h-3 text-[#2eb886] drop-shadow-[0_0_6px_rgba(46,184,134,0.6)]" /> Douglas App
                </span>
                <span className="text-[9px] text-[#2eb886] font-mono bg-[#2eb886]/10 border border-[#2eb886]/30 px-2 py-0.5 rounded-full font-bold">
                  Active Pass
                </span>
              </div>

              {/* Inner Dynamic Screen Content based on Left Phone Tab */}
              {leftPhoneTab === 'home' && (
                <div className="space-y-3 animate-fadeIn">
                  {/* Header inside phone */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-neutral-400 block font-medium">Hello, Athlete 👋</span>
                      <h4 className="text-xs font-bold text-white flex items-center gap-1">
                        Ready to crush goals?
                      </h4>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-[#2eb886]/10 border border-[#2eb886]/30 flex items-center justify-center text-[#2eb886]">
                      <Flame className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Progress Card */}
                  <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-2.5 relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-[#2eb886]/15 rounded-full blur-xl" />
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-neutral-300 font-semibold">Today's Progress</span>
                      <span className="text-[8px] text-[#48d89e] font-mono bg-[#2eb886]/20 px-1.5 py-0.5 rounded-full font-bold">
                        80%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xl font-black text-white">80%</span>
                        <p className="text-[9px] text-neutral-400 font-medium">Keep it up!</p>
                      </div>
                      <div className="w-10 h-10 rounded-full border-4 border-[#2eb886] border-t-neutral-800 flex items-center justify-center text-[9px] font-bold text-white">
                        80%
                      </div>
                    </div>
                  </div>

                  {/* This Week tracker */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-neutral-400 font-medium">
                      <span>This Week</span>
                      <span className="text-[#d4af37] text-[9px]">Active Routine</span>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center">
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                        <div
                          key={i}
                          className={`py-1 rounded-md text-[9px] font-bold ${
                            i < 2
                              ? 'bg-[#2eb886] text-black'
                              : 'bg-neutral-800 text-neutral-400'
                          }`}
                        >
                          {day}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Highlights List */}
                  <div className="bg-neutral-950/90 border border-neutral-800/80 rounded-2xl p-2.5 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold text-[#d4af37] uppercase tracking-wider">
                        Highlights:
                      </span>
                      <span className="text-[8px] text-neutral-500 font-mono">Customized</span>
                    </div>
                    <div className="space-y-1 max-h-[100px] overflow-y-auto pr-1">
                      {HIGHLIGHTS.slice(0, 4).map((item, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[10px] text-neutral-200">
                          <CheckCircle2 className="w-3 h-3 text-[#2eb886] shrink-0" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {leftPhoneTab === 'packages' && (
                <div className="space-y-2.5 animate-fadeIn">
                  <div className="bg-neutral-900 border border-[#d4af37]/60 rounded-xl p-2.5">
                    <span className="text-[9px] font-bold text-[#d4af37] uppercase tracking-wider block">VIP Packages</span>
                    <h5 className="text-xs font-bold text-white mt-0.5">Dubai 1-on-1 Training</h5>
                    <p className="text-[9px] text-neutral-300 mt-1 leading-tight">
                      Private gym sessions, customized nutrition & weekly body scans.
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[10px] font-extrabold text-[#2eb886]">AED 3,200/mo</span>
                      <button
                        onClick={() => onNavigate && onNavigate('packages')}
                        className="text-[9px] px-2 py-0.5 bg-[#d4af37] text-black font-bold rounded-lg flex items-center gap-0.5 cursor-pointer"
                      >
                        View All <ArrowUpRight className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  </div>

                  <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-2.5">
                    <span className="text-[9px] font-bold text-[#2eb886] uppercase tracking-wider block">Online Coaching</span>
                    <h5 className="text-xs font-bold text-white mt-0.5">Worldwide Accelerator</h5>
                    <p className="text-[9px] text-neutral-400 mt-1 leading-tight">
                      Global workout programming with 24/7 direct coach chat.
                    </p>
                  </div>
                </div>
              )}

              {leftPhoneTab === 'services' && (
                <div className="space-y-2 animate-fadeIn">
                  <div className="text-[10px] font-bold text-[#d4af37] uppercase tracking-wider">
                    Core Specializations
                  </div>
                  {SERVICES_CAROUSEL.map((srv) => (
                    <div key={srv.id} className="p-2 rounded-xl bg-neutral-900/80 border border-neutral-800 flex items-center justify-between">
                      <div>
                        <h6 className="text-[11px] font-bold text-white">{srv.title}</h6>
                        <span className="text-[9px] text-neutral-400">{srv.stats}</span>
                      </div>
                      <span className="text-[9px] font-mono text-[#d4af37] font-bold">#{srv.id}</span>
                    </div>
                  ))}
                </div>
              )}

              {leftPhoneTab === 'transform' && (
                <div className="space-y-2 animate-fadeIn">
                  <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-2.5 text-center">
                    <span className="text-[9px] text-neutral-400 uppercase">Average Client Fat Loss</span>
                    <span className="text-xl font-black text-[#2eb886] block">-6.8 kg</span>
                    <span className="text-[9px] text-neutral-500">in first 8 weeks</span>
                  </div>
                  <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-2 space-y-1">
                    <span className="text-[9px] font-bold text-[#d4af37] uppercase block">Resilience Blueprint</span>
                    <p className="text-[9px] text-neutral-300">Targeted hypertrophy, strength recovery, and mindset mastery.</p>
                  </div>
                </div>
              )}

              {leftPhoneTab === 'contact' && (
                <div className="space-y-2 animate-fadeIn text-center">
                  <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-3 space-y-1.5">
                    <Phone className="w-5 h-5 text-[#d4af37] mx-auto" />
                    <h5 className="text-xs font-bold text-white">Direct Coach Contact</h5>
                    <p className="text-[9.5px] text-[#2eb886] font-mono font-bold">+971 52 942 1132</p>
                    <p className="text-[9px] text-neutral-400">Dubai Marina / Downtown</p>
                  </div>
                  <button
                    onClick={() => onGetInTouch && onGetInTouch('Phone Contact')}
                    className="w-full py-1.5 bg-[#d4af37] text-black font-bold text-[10px] rounded-lg cursor-pointer"
                  >
                    Open Booking Form
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Mobile Navigation Bar (Navigation Buttons For Each Page) */}
            <div className="pt-2 border-t border-neutral-800/90 mt-2">
              <div className="grid grid-cols-5 gap-1 bg-neutral-950 p-1 rounded-2xl border border-neutral-800/80">
                {navButtons.map((btn) => {
                  const Icon = btn.icon;
                  const isActive = leftPhoneTab === btn.id;
                  return (
                    <button
                      key={btn.id}
                      onClick={() => handlePhoneNav(btn.id, true)}
                      className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#d4af37] text-black font-bold shadow-sm'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                      title={btn.label}
                    >
                      <Icon className={`w-3 h-3 ${isActive ? 'text-black' : btn.highlight ? 'text-[#d4af37]' : 'text-neutral-400'}`} />
                      <span className="text-[7.5px] tracking-tighter mt-0.5">{btn.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-3 text-center">
            <span className="text-[11px] font-bold text-[#d4af37] uppercase tracking-wider block">
              1-on-1 Mobile Coaching View
            </span>
            <p className="text-xs text-neutral-400 mt-1 max-w-[280px]">
              Tap the phone navigation buttons below to test each mobile page.
            </p>
          </div>
        </motion.div>

        {/* ================= MIDDLE SECTION: Services Carousel (Cycles every 5 seconds) ================= */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-4 flex flex-col justify-center space-y-6"
        >
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2eb886]/10 border border-[#2eb886]/30 text-[#48d89e] text-xs font-semibold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2eb886] animate-pulse" />
              Services Section
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight uppercase">
              COACHING BUILT <span className="text-[#d4af37]">AROUND YOU</span>
            </h3>
            <p className="text-xs text-neutral-400 flex items-center justify-center lg:justify-start gap-1">
              <Clock className="w-3.5 h-3.5 text-[#d4af37]" /> Pop-up interval: 5 seconds
            </p>
          </div>

          {/* 5-Second Progress Indicator Bar */}
          <div className="w-full bg-neutral-900 h-1.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#d4af37] to-[#2eb886] transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Quick Select Tabs (01, 02, 03, 04) */}
          <div className="grid grid-cols-4 gap-2">
            {SERVICES_CAROUSEL.map((srv, idx) => (
              <button
                key={srv.id}
                onClick={() => {
                  setActiveServiceIdx(idx);
                  setProgress(0);
                }}
                className={`py-2 px-1 rounded-xl text-center transition-all cursor-pointer border ${
                  activeServiceIdx === idx
                    ? 'bg-neutral-800 border-[#d4af37] text-white shadow-lg'
                    : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                <span className="block text-xs font-mono font-bold text-[#d4af37]">#{srv.id}</span>
                <span className="text-[10px] font-semibold truncate block mt-0.5">{srv.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Active Animated Card with AnimatePresence */}
          <div className="min-h-[240px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="bg-neutral-900/90 border-2 border-[#d4af37]/80 rounded-2xl p-6 space-y-4 shadow-xl shadow-[#d4af37]/5 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[#d4af37] font-mono font-extrabold text-sm tracking-wider">
                    {activeService.id} — {activeService.title}
                  </span>
                  <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-neutral-950 border border-neutral-800 text-neutral-300">
                    {activeService.stats}
                  </span>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-white tracking-tight">{activeService.tagline}</h4>
                  <p className="text-xs sm:text-sm text-neutral-300 mt-2 leading-relaxed">
                    {activeService.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-neutral-800">
                  <button
                    onClick={() => onGetInTouch && onGetInTouch(activeService.title)}
                    className="group text-xs font-bold text-[#d4af37] hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Inquire About {activeService.title}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                  <span className="text-[11px] text-neutral-400 font-mono">5s Interval</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ================= RIGHT PHONE SCREEN: Transformation Section App UI ================= */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:col-span-4 flex flex-col items-center"
        >
          {/* Realistic iPhone Bezel matching user reference with bottom navigation */}
          <div id="showcase-transform" className="w-full max-w-[320px] bg-[#0d0d10] border-[6px] border-[#222228] rounded-[44px] p-3.5 shadow-2xl relative shadow-black/80 ring-1 ring-white/10 flex flex-col justify-between min-h-[580px]">
            <div>
              {/* Speaker notch */}
              <div className="w-24 h-3.5 bg-[#222228] rounded-full mx-auto mb-2.5 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-black/80" />
              </div>

              {/* Top Quick Bar */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-800/80">
                <span className="text-[10px] font-bold text-[#2eb886] uppercase tracking-wider block">
                  Transformation Metrics
                </span>
                <span className="text-[9px] text-[#d4af37] font-mono bg-[#d4af37]/10 px-1.5 py-0.5 rounded-full font-bold">
                  Verified Coach
                </span>
              </div>

              {/* Inner Dynamic Screen Content based on Right Phone Tab */}
              {rightPhoneTab === 'transform' && (
                <div className="space-y-3 animate-fadeIn">
                  {/* Activity Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-neutral-400 font-medium">Weekly Coaching Cycle</span>
                      <h4 className="text-xs font-bold text-white">Active Volume</h4>
                    </div>
                    <div className="flex items-center gap-1 bg-neutral-900 px-2 py-0.5 rounded-full border border-neutral-800 text-[9px] text-neutral-300">
                      <TrendingUp className="w-2.5 h-2.5 text-[#d4af37]" />
                      <span>Live Data</span>
                    </div>
                  </div>

                  {/* Activity / Calorie Metric Highlight */}
                  <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-2.5 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-400 text-[10px]">Weekly Volume</span>
                      <span className="text-white font-bold text-xs">4,350 kcal</span>
                    </div>
                    {/* Bar Graph Simulation */}
                    <div className="h-14 flex items-end justify-between gap-1 pt-1 px-1">
                      {[40, 65, 50, 95, 75, 85, 60].map((val, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-0.5">
                          <div
                            className={`w-full rounded-t-md transition-all ${
                              idx === 3
                                ? 'bg-[#2eb886] shadow-sm shadow-[#2eb886]/50'
                                : 'bg-neutral-800'
                            }`}
                            style={{ height: `${val}%` }}
                          />
                          <span className="text-[8px] text-neutral-500 font-mono">
                            {['M', 'T', 'W', 'T', 'F', 'S', 'S'][idx]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Three Metric Pills (Calories, Distance, Active Time) */}
                  <div className="grid grid-cols-3 gap-1">
                    <div className="bg-neutral-950 p-1.5 rounded-xl border border-neutral-800/80 text-center">
                      <span className="text-[7.5px] text-neutral-400 block uppercase">Calories</span>
                      <span className="text-[10px] font-extrabold text-[#2eb886]">650 kcal</span>
                    </div>
                    <div className="bg-neutral-950 p-1.5 rounded-xl border border-neutral-800/80 text-center">
                      <span className="text-[7.5px] text-neutral-400 block uppercase">Distance</span>
                      <span className="text-[10px] font-extrabold text-white">3.2 km</span>
                    </div>
                    <div className="bg-neutral-950 p-1.5 rounded-xl border border-neutral-800/80 text-center">
                      <span className="text-[7.5px] text-neutral-400 block uppercase">Active Time</span>
                      <span className="text-[10px] font-extrabold text-[#d4af37]">1h 25m</span>
                    </div>
                  </div>

                  {/* Transformation Philosophy Statement */}
                  <div className="bg-neutral-900/60 border border-neutral-800/60 rounded-xl p-2 space-y-0.5">
                    <p className="text-[9px] font-bold text-white uppercase tracking-tight">
                      YOUR GOAL. YOUR JOURNEY. YOUR TRANSFORMATION.
                    </p>
                    <p className="text-[8.5px] text-neutral-300 leading-tight">
                      Real progress comes from consistency, discipline, and the right strategy.
                    </p>
                  </div>
                </div>
              )}

              {rightPhoneTab === 'packages' && (
                <div className="space-y-2 animate-fadeIn">
                  <div className="bg-neutral-900 border border-[#d4af37] rounded-xl p-2.5 text-center">
                    <Award className="w-5 h-5 text-[#d4af37] mx-auto mb-1" />
                    <h5 className="text-xs font-bold text-white">Choose Your Package</h5>
                    <p className="text-[9px] text-neutral-300 mt-1">1-on-1 Dubai & Worldwide Online tiers</p>
                    <button
                      onClick={() => onNavigate && onNavigate('packages')}
                      className="mt-2 w-full py-1.5 bg-[#d4af37] text-black font-bold text-[10px] rounded-lg flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>Open Packages Page</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}

              {rightPhoneTab === 'home' && (
                <div className="space-y-2 animate-fadeIn">
                  <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-2.5">
                    <span className="text-[9px] font-bold text-[#d4af37] uppercase block">Resilience Dashboard</span>
                    <h5 className="text-xs font-bold text-white mt-1">Welcome back, Athlete</h5>
                    <p className="text-[9px] text-neutral-300 mt-1">Next Workout: Upper Body Power & Mobility</p>
                  </div>
                </div>
              )}

              {rightPhoneTab === 'services' && (
                <div className="space-y-1.5 animate-fadeIn">
                  <span className="text-[9px] font-bold text-[#2eb886] uppercase block">Specialized Modules</span>
                  <div className="p-2 bg-neutral-900 rounded-xl border border-neutral-800 text-[10px]">
                    <span className="font-bold text-white block">Hypertrophy & Physique</span>
                    <span className="text-neutral-400 text-[9px]">Custom split programming</span>
                  </div>
                  <div className="p-2 bg-neutral-900 rounded-xl border border-neutral-800 text-[10px]">
                    <span className="font-bold text-white block">Metabolic Conditioning</span>
                    <span className="text-neutral-400 text-[9px]">Cardiovascular endurance</span>
                  </div>
                </div>
              )}

              {rightPhoneTab === 'contact' && (
                <div className="space-y-2 animate-fadeIn text-center">
                  <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-2.5">
                    <h5 className="text-xs font-bold text-white">Get In Touch</h5>
                    <p className="text-[9px] text-neutral-300 mt-1">Book your free 1-on-1 consultation</p>
                    <button
                      onClick={() => onGetInTouch && onGetInTouch('Transformation Inquiry')}
                      className="mt-2 w-full py-1.5 bg-white text-black font-bold text-[10px] rounded-lg cursor-pointer"
                    >
                      Schedule Consultation
                    </button>
                  </div>
                </div>
              )}

              {/* Bottom Phone Action */}
              <button
                onClick={() => onGetInTouch && onGetInTouch('Transformation Program')}
                className="w-full mt-2 py-1.5 bg-white text-black font-bold text-[10px] rounded-xl hover:bg-neutral-200 transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Start Transformation</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>

            {/* Bottom Mobile Navigation Bar for Right Phone (Navigation Buttons For Each Page) */}
            <div className="pt-2 border-t border-neutral-800/90 mt-2">
              <div className="grid grid-cols-5 gap-1 bg-neutral-950 p-1 rounded-2xl border border-neutral-800/80">
                {navButtons.map((btn) => {
                  const Icon = btn.icon;
                  const isActive = rightPhoneTab === btn.id;
                  return (
                    <button
                      key={btn.id}
                      onClick={() => handlePhoneNav(btn.id, false)}
                      className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#2eb886] text-black font-bold shadow-sm'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                      title={btn.label}
                    >
                      <Icon className={`w-3 h-3 ${isActive ? 'text-black' : btn.highlight ? 'text-[#d4af37]' : 'text-neutral-400'}`} />
                      <span className="text-[7.5px] tracking-tighter mt-0.5">{btn.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-3 text-center">
            <span className="text-[11px] font-bold text-[#2eb886] uppercase tracking-wider block">
              Transformation Metrics Screen
            </span>
            <p className="text-xs text-neutral-400 mt-1 max-w-[280px]">
              Tap any mobile button to explore features and metrics.
            </p>
          </div>
        </motion.div>
      </div>

      {/* ================= FOOTER BACK TO HOME BUTTON ================= */}
      <div className="flex items-center justify-center pt-8 mt-6 border-t border-neutral-900/90 relative z-10">
        <button
          onClick={() => {
            if (onNavigate) {
              onNavigate('home');
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="group relative flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 hover:border-[#d4af37]/60 text-neutral-300 hover:text-white text-xs sm:text-sm font-semibold transition-all shadow-lg hover:shadow-[#d4af37]/10 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 text-[#d4af37] group-hover:-translate-x-0.5 transition-transform" />
          <Home className="w-4 h-4 text-[#d4af37]" />
          <span>Back to Home</span>
        </button>
      </div>
    </section>
  );
}
