import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowUpRight, 
  MapPin, 
  Globe, 
  Dumbbell, 
  HeartHandshake, 
  Target, 
  Award, 
  Sparkles, 
  Instagram, 
  MessageSquare, 
  CheckCircle2, 
  Mail,
  Flame,
  ShieldCheck,
  Zap,
  TrendingUp,
  Activity
} from 'lucide-react';
import { BannerContent } from '../types';

interface AboutPageProps {
  content: BannerContent;
  onNavigateToHome?: () => void;
  onNavigateToPackages?: () => void;
  onGetInTouch?: (serviceName?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  content,
  onNavigateToHome,
  onNavigateToPackages,
  onGetInTouch,
}) => {
  return (
    <div className="space-y-12 sm:space-y-16 pb-12">
      {/* ================= HERO SECTION (Inspired by cinematic spotlight reference) ================= */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl bg-black border border-neutral-900 shadow-2xl p-6 sm:p-10 md:p-14 text-white"
      >
        {/* Ambient glow backdrop accents */}
        <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-[#2eb886]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-[#d4af37]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Portrait & Visual Spotlight Card */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative group w-full max-w-[360px]">
              {/* Glowing vertical cyan/green/gold neon accents matching reference */}
              <div className="absolute -inset-1.5 bg-gradient-to-b from-[#2eb886]/40 via-[#d4af37]/30 to-transparent rounded-[32px] blur-lg opacity-70 group-hover:opacity-100 transition duration-500" />
              
              <div className="relative rounded-[28px] bg-[#0c0c0e] border border-neutral-800 p-3 sm:p-4 overflow-hidden shadow-2xl">
                {/* Image Frame with dark spotlight gradient */}
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800/80 shadow-2xl">
                  <img
                    src="https://res.cloudinary.com/dirfcqs1f/image/upload/v1786672601/WhatsApp_Image_2026-08-14_at_04.13.54_uf1de4.jpg"
                    alt="Coach Douglas Sebugwawo - Head Coach"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Subtle lighting overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  <div className="absolute top-0 right-1/3 w-1.5 h-full bg-gradient-to-b from-[#2eb886] via-[#2eb886]/40 to-transparent opacity-80 blur-[0.5px] pointer-events-none" />
                  
                  {/* Bottom overlay badge inside photo */}
                  <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-3 rounded-xl border border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#2eb886] animate-pulse" />
                        <span className="text-xs font-bold text-white tracking-wide">Dubai & Worldwide</span>
                      </div>
                      <span className="text-[10px] font-semibold text-[#d4af37] bg-[#d4af37]/10 px-2 py-0.5 rounded-md border border-[#d4af37]/30">
                        Head Coach
                      </span>
                    </div>
                  </div>
                </div>

                {/* Signature and Socials Row below Photo */}
                <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between px-1">
                  <div>
                    <span className="font-serif italic text-lg tracking-wider text-neutral-300 font-light select-none">
                      Douglas Sebugwawo
                    </span>
                    <p className="text-[10px] text-neutral-500 uppercase tracking-wider font-mono">Head Coach</p>
                  </div>
                  
                  {/* Social links */}
                  <div className="flex items-center gap-2">
                    <a
                      href="https://www.instagram.com/healinghands_fitness?utm_source=qr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-[#d4af37] transition-all"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="https://wa.me"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-[#2eb886] transition-all"
                      aria-label="WhatsApp"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => onGetInTouch && onGetInTouch('General Inquiry')}
                      className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-[#d4af37] transition-all cursor-pointer"
                      aria-label="Email"
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Content & Bio */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              About Personal & Coaching
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.08] text-white">
                MEET COACH <br />
                <span className="text-[#d4af37]">DOUGLAS</span> SEBUGWAWO
              </h1>
              
              {/* Tagline / Roles */}
              <p className="text-sm sm:text-base md:text-lg font-semibold text-[#48d89e] flex flex-wrap items-center gap-2 tracking-wide">
                <span>Personal Trainer</span>
                <span className="text-neutral-600">•</span>
                <span>Fitness Coach</span>
                <span className="text-neutral-600">•</span>
                <span>Transformation Specialist</span>
              </p>
            </div>

            {/* Structured Bio Text */}
            <div className="space-y-4 text-neutral-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              <p className="border-l-2 border-[#2eb886] pl-4">
                Coach Douglas Sebugwawo is a fitness professional dedicated to helping people become stronger, healthier, more confident, and more disciplined through structured and personalized coaching.
              </p>
              <p className="text-neutral-400">
                Based in Dubai and working with clients worldwide, Douglas combines professional training methods with a client-first approach that focuses on sustainable results rather than quick fixes.
              </p>
            </div>

            {/* Key stats row */}
            <div className="grid grid-cols-3 gap-3 pt-2 max-w-lg">
              <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800">
                <span className="text-xl sm:text-2xl font-black text-white">100%</span>
                <p className="text-[11px] text-neutral-400 uppercase tracking-wider mt-0.5">Bespoke Strategy</p>
              </div>
              <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800">
                <span className="text-xl sm:text-2xl font-black text-[#d4af37]">Dubai</span>
                <p className="text-[11px] text-neutral-400 uppercase tracking-wider mt-0.5">1-on-1 Private</p>
              </div>
              <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800">
                <span className="text-xl sm:text-2xl font-black text-[#2eb886]">Global</span>
                <p className="text-[11px] text-neutral-400 uppercase tracking-wider mt-0.5">Online Coaching</p>
              </div>
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onGetInTouch && onGetInTouch('Dubai 1-on-1 VIP Personal Training')}
                className="get-in-touch-glow px-6 py-3 rounded-full bg-white text-black font-bold text-sm tracking-tight hover:bg-neutral-200 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Book 1-on-1 Consultation</span>
                <ArrowUpRight className="w-4 h-4 text-[#d4af37]" />
              </button>

              <button
                onClick={() => onNavigateToPackages && onNavigateToPackages()}
                className="px-6 py-3 rounded-full bg-neutral-900 text-neutral-200 border border-neutral-800 hover:border-neutral-700 hover:text-white font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>View Coaching Packages</span>
              </button>
            </div>
          </div>

        </div>
      </motion.section>

      {/* ================= CREDENTIALS & TRUST BAR (matching reference logo bar) ================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-4 px-6 rounded-2xl bg-neutral-950/80 border border-neutral-900 flex flex-wrap items-center justify-around gap-6 text-neutral-400"
      >
        <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-widest text-neutral-300">
          <ShieldCheck className="w-4 h-4 text-[#2eb886]" />
          <span>REPs Certified UAE</span>
        </div>
        <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-widest text-neutral-300">
          <Award className="w-4 h-4 text-[#d4af37]" />
          <span>Biomechanics & Strength</span>
        </div>
        <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-widest text-neutral-300">
          <Activity className="w-4 h-4 text-[#2eb886]" />
          <span>Advanced Hypertrophy</span>
        </div>
        <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-widest text-neutral-300">
          <Globe className="w-4 h-4 text-[#d4af37]" />
          <span>Dubai & Global Reach</span>
        </div>
      </motion.div>

      {/* ================= COACHING PHILOSOPHY SECTION ================= */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-6 text-center max-w-4xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2eb886]/10 border border-[#2eb886]/30 text-[#48d89e] text-xs font-semibold uppercase tracking-widest">
          <Zap className="w-3.5 h-3.5" />
          My Coaching Philosophy
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight">
          TRAIN SMART. STAY CONSISTENT. <br />
          <span className="text-[#d4af37]">GET RESULTS.</span>
        </h2>

        <div className="space-y-4 text-neutral-300 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto font-normal">
          <p className="font-semibold text-white text-lg sm:text-xl">
            Fitness is more than lifting weights.
          </p>
          <p className="text-neutral-400">
            It's about developing discipline, building confidence, improving your health, and creating habits that continue long after a workout ends.
          </p>
          <p className="text-neutral-300 bg-neutral-950 p-4 rounded-2xl border border-neutral-900 text-sm sm:text-base">
            Every client receives a strategy built around their individual goals, fitness level, lifestyle, and progress.
          </p>
        </div>
      </motion.section>

      {/* ================= WHAT I BELIEVE (3 Core Pillars) ================= */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[#d4af37] text-xs font-semibold uppercase tracking-widest">
            <Target className="w-3.5 h-3.5" />
            Core Principles
          </div>
          <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
            What I Believe
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Belief 1: Consistency */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group relative p-6 sm:p-7 rounded-2xl bg-neutral-950 border border-neutral-800/90 hover:border-[#2eb886]/50 transition-all shadow-xl flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#2eb886]/10 border border-[#2eb886]/30 flex items-center justify-center text-[#2eb886] group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Consistency beats intensity.
              </h4>
              <p className="text-sm text-neutral-400 leading-relaxed">
                You don't need to be perfect. You need a plan you can follow consistently.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-900 flex items-center gap-2 text-xs font-medium text-[#2eb886]">
              <CheckCircle2 className="w-4 h-4" />
              <span>Sustainable habit mastery</span>
            </div>
          </motion.div>

          {/* Belief 2: Transformation */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group relative p-6 sm:p-7 rounded-2xl bg-neutral-950 border border-neutral-800/90 hover:border-[#d4af37]/50 transition-all shadow-xl flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] group-hover:scale-110 transition-transform">
                <Flame className="w-6 h-6" />
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Your body can change.
              </h4>
              <p className="text-sm text-neutral-400 leading-relaxed">
                With the right training, nutrition, recovery, and mindset, meaningful transformation is achievable.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-900 flex items-center gap-2 text-xs font-medium text-[#d4af37]">
              <CheckCircle2 className="w-4 h-4" />
              <span>Physique & metabolic adaptation</span>
            </div>
          </motion.div>

          {/* Belief 3: Accountability */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="group relative p-6 sm:p-7 rounded-2xl bg-neutral-950 border border-neutral-800/90 hover:border-white/40 transition-all shadow-xl flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Coaching creates accountability.
              </h4>
              <p className="text-sm text-neutral-400 leading-relaxed">
                You shouldn't have to figure everything out alone. The right coach gives you structure, guidance, and accountability.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-900 flex items-center gap-2 text-xs font-medium text-white">
              <CheckCircle2 className="w-4 h-4" />
              <span>Direct personal mentorship</span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ================= DUAL COACHING DOMAINS (Dubai In-Person & Worldwide Online) ================= */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-semibold uppercase tracking-widest">
            <Award className="w-3.5 h-3.5" />
            Where We Train
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
            Personal Training In Dubai & Worldwide Online
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Personal Training in Dubai */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-neutral-950 border border-neutral-800 p-6 sm:p-8 flex flex-col justify-between group hover:border-[#d4af37] transition-colors"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37]">
                  <MapPin className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37] bg-[#d4af37]/10 px-3 py-1 rounded-full border border-[#d4af37]/30">
                  Dubai • In-Person
                </span>
              </div>

              <h4 className="text-2xl font-bold text-white tracking-tight">
                Personal Training in Dubai
              </h4>

              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                For clients based in Dubai, Coach Douglas provides personalized one-on-one training designed around your goals.
              </p>

              <p className="text-sm text-neutral-400 leading-relaxed">
                From beginners starting their fitness journey to experienced individuals looking to take their performance to another level, every session has a purpose.
              </p>

              <ul className="space-y-2.5 pt-3">
                <li className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <span>Private gym & residential 1-on-1 sessions</span>
                </li>
                <li className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <span>Real-time biomechanics & posture optimization</span>
                </li>
                <li className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <span>Downtown, Marina, Palm Jumeirah & DIFC locations</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-900 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-neutral-400 uppercase tracking-wider">Format</span>
                <p className="text-sm font-bold text-white">Private 1-on-1 Sessions</p>
              </div>
              <button
                onClick={() => onGetInTouch && onGetInTouch('Dubai VIP 1-on-1 Personal Training')}
                className="px-5 py-2.5 rounded-full bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#e2bd47] transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Inquire Dubai</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

          {/* Card 2: Worldwide Online Coaching */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-neutral-950 border border-neutral-800 p-6 sm:p-8 flex flex-col justify-between group hover:border-[#2eb886] transition-colors"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#2eb886]/10 border border-[#2eb886]/30 flex items-center justify-center text-[#2eb886]">
                  <Globe className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#48d89e] bg-[#2eb886]/10 px-3 py-1 rounded-full border border-[#2eb886]/30">
                  Worldwide • Virtual
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#48d89e]">
                  YOUR COACH. WHEREVER YOU ARE.
                </span>
                <h4 className="text-2xl font-bold text-white tracking-tight">
                  Worldwide Online Coaching
                </h4>
              </div>

              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                You don't need to live in Dubai to work with Coach Douglas.
              </p>

              <p className="text-sm text-neutral-400 leading-relaxed">
                Through online coaching, clients around the world receive personalized workout programs, progress monitoring, coaching support, and guidance designed to keep them moving forward.
              </p>

              <ul className="space-y-2.5 pt-3">
                <li className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-[#2eb886] shrink-0" />
                  <span>Custom App Workout & Macro Protocol</span>
                </li>
                <li className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-[#2eb886] shrink-0" />
                  <span>Weekly Video Analysis & Habit Audits</span>
                </li>
                <li className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-[#2eb886] shrink-0" />
                  <span>24/7 Direct WhatsApp Coach Access</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-900 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-neutral-400 uppercase tracking-wider">Format</span>
                <p className="text-sm font-bold text-white">Full Digital App Coaching</p>
              </div>
              <button
                onClick={() => onGetInTouch && onGetInTouch('Worldwide Online Coaching')}
                className="px-5 py-2.5 rounded-full bg-[#2eb886] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#34cb94] transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Apply Online</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ================= BOTTOM CTA BANNER ================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl bg-gradient-to-r from-neutral-950 via-neutral-900 to-black border border-neutral-800 p-8 sm:p-10 text-center space-y-6 relative overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-3 max-w-2xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
            Ready To Start Your Transformation?
          </h3>
          <p className="text-sm text-neutral-400">
            Whether in Dubai or anywhere in the world, let's build a customized training and discipline framework tailored strictly to your goals.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => onGetInTouch && onGetInTouch('General Inquiry')}
            className="get-in-touch-glow px-6 py-3 rounded-full bg-white text-black font-bold text-sm hover:bg-neutral-200 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Get in Touch with Coach Douglas</span>
            <ArrowUpRight className="w-4 h-4 text-[#d4af37]" />
          </button>
          <button
            onClick={() => onNavigateToHome && onNavigateToHome()}
            className="px-6 py-3 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white text-sm font-semibold transition-all cursor-pointer"
          >
            <span>Back to Home Banner</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
