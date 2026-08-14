import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Mail, 
  MapPin, 
  Phone, 
  Send, 
  Search, 
  CheckCircle2, 
  MessageCircle, 
  Sparkles,
  Instagram,
  Facebook,
  Youtube,
  Share2,
  ExternalLink,
  Home,
  ArrowUp,
  Ticket,
  Calendar,
  Clock,
  Target,
  Dumbbell,
  ShieldCheck
} from 'lucide-react';
import { TrainingTicketCard } from './TrainingTicketCard';
import { TrainingTicket } from '../types';

interface ContactSectionProps {
  onSuccess?: () => void;
  onNavigateHome?: () => void;
  hideHomeButton?: boolean;
}

interface SocialItem {
  id: string;
  name: string;
  handle: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  glowColor: string;
}

const SOCIAL_LINKS: SocialItem[] = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    handle: '+971 52 942 1132',
    href: 'https://wa.me/971529421132?text=Hi%20Coach%20Douglas%2C%20I%20would%20like%20to%20inquire%20about%20your%20training%20programs.',
    icon: MessageCircle,
    color: '#25D366',
    glowColor: 'rgba(37, 211, 102, 0.45)',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@healinghands_fitness',
    href: 'https://www.instagram.com/healinghands_fitness?utm_source=qr',
    icon: Instagram,
    color: '#E1306C',
    glowColor: 'rgba(225, 48, 108, 0.45)',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    handle: 'Heavenly Douglas (@heavenlydouglas1987)',
    href: 'https://www.facebook.com/heavenlydouglas1987',
    icon: Facebook,
    color: '#1877F2',
    glowColor: 'rgba(24, 119, 242, 0.45)',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    handle: 'Coach Douglas Fitness',
    href: 'https://youtu.be/EOSLOjCqiOM',
    icon: Youtube,
    color: '#FF0000',
    glowColor: 'rgba(255, 0, 0, 0.45)',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    handle: '@d.u.b.a.i7',
    href: 'https://www.tiktok.com/@d.u.b.a.i7?is_from_webapp=1&sender_device=pc',
    icon: Sparkles,
    color: '#00f2fe',
    glowColor: 'rgba(0, 242, 254, 0.45)',
  },
];

export const PACKAGES_OPTIONS = [
  {
    id: '3-months',
    name: '3 Months Total Physique Mastery',
    price: 'AED 5,500',
    duration: '3 Months (90 Days)',
    daysValid: 90,
  },
  {
    id: '2-months',
    name: '2 Months Hypertrophy & Conditioning',
    price: 'AED 4,000',
    duration: '2 Months (60 Days)',
    daysValid: 60,
  },
  {
    id: '1-month',
    name: '1 Month Intensive Transformation',
    price: 'AED 2,500',
    duration: '1 Month (30 Days)',
    daysValid: 30,
  },
  {
    id: 'weekly',
    name: 'Weekly Training Plan (3 Sessions)',
    price: 'AED 525',
    duration: 'Weekly (14 Days validity)',
    daysValid: 14,
  },
  {
    id: 'daily',
    name: 'Daily 1-on-1 Session (60 min)',
    price: 'AED 200',
    duration: '1 Session (7 Days validity)',
    daysValid: 7,
  },
  {
    id: 'vip-custom',
    name: 'Custom VIP Protocol',
    price: 'Bespoke Rate',
    duration: 'Custom Schedule (30 Days)',
    daysValid: 30,
  },
];

export const GOAL_SUGGESTIONS = [
  'Physique Transformation & Fat Loss',
  'Hypertrophy & Muscle Building',
  'Metabolic Conditioning & Agility',
  'Strength & Posture Alignment',
  'Online Contest & VIP Sculpting',
];

export function ContactSection({ onSuccess, onNavigateHome, hideHomeButton = false }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    websiteOrGoal: 'Physique Transformation & Fat Loss',
    message: '',
  });

  const [selectedPackageId, setSelectedPackageId] = useState('3-months');
  const [dateBooked, setDateBooked] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  const [generatedTicket, setGeneratedTicket] = useState<TrainingTicket | null>(null);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  // Selected package details
  const selectedPkg = PACKAGES_OPTIONS.find(p => p.id === selectedPackageId) || PACKAGES_OPTIONS[0];

  // Calculate dynamic expiry preview
  const calculateExpiryPreview = (bookDateStr: string, daysValid: number) => {
    try {
      const parts = bookDateStr.split('-');
      if (parts.length === 3) {
        const start = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        const expiry = new Date(start.getTime() + daysValid * 24 * 60 * 60 * 1000);
        return expiry.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        });
      }
    } catch {
      // fallback
    }
    const today = new Date();
    const expiry = new Date(today.getTime() + daysValid * 24 * 60 * 60 * 1000);
    return expiry.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const currentExpiryPreview = calculateExpiryPreview(dateBooked, selectedPkg.daysValid);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;

    // Calculate dates
    let formattedBookedDate = '';
    try {
      const parts = dateBooked.split('-');
      const start = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
      formattedBookedDate = start.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      formattedBookedDate = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    }

    const formattedExpiryDate = calculateExpiryPreview(dateBooked, selectedPkg.daysValid);
    const randomTicketNumber = Math.floor(1000 + Math.random() * 9000);
    const ticketId = `TKT-DXB-${randomTicketNumber}-2026`;

    const ticket: TrainingTicket = {
      ticketId,
      clientName: formData.name.trim(),
      clientEmail: formData.email.trim(),
      packageId: selectedPkg.id,
      packageName: selectedPkg.name,
      packagePrice: selectedPkg.price,
      goalProgram: formData.websiteOrGoal.trim() || 'Physique Transformation & Fat Loss',
      dateBooked: formattedBookedDate,
      expiryDate: formattedExpiryDate,
      duration: selectedPkg.duration,
      notes: formData.message.trim(),
      createdAt: new Date().toISOString(),
      status: 'CONFIRMED',
    };

    // Construct detailed WhatsApp message with all entered ticket information
    const lines = [
      `*🏋️ COACH DOUGLAS FITNESS - OFFICIAL TRAINING TICKET*`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `🎫 *Ticket ID:* ${ticket.ticketId}`,
      `👤 *Client Full Name:* ${ticket.clientName}`,
      `📧 *Client Email:* ${ticket.clientEmail}`,
      `📦 *Program Paid For:* ${ticket.packageName} (${ticket.packagePrice})`,
      `⏱️ *Duration / Validity:* ${ticket.duration}`,
      `🎯 *Goal / Program:* ${ticket.goalProgram}`,
      `📅 *Date Booked:* ${ticket.dateBooked}`,
      `⏳ *Expiry Date:* ${ticket.expiryDate}`,
      `🛡️ *Status:* Confirmed & Active Pass`,
    ];

    if (ticket.notes) {
      lines.push(`💬 *Client Message:* ${ticket.notes}`);
    }

    lines.push(`━━━━━━━━━━━━━━━━━━━━`);
    lines.push(`📧 *Delivered to:* ${ticket.clientEmail}`);
    lines.push(`📍 *Location:* Dubai 1-on-1 / Online Worldwide`);

    const fullMessage = lines.join('\n');
    const whatsappUrl = `https://wa.me/971529421132?text=${encodeURIComponent(fullMessage)}`;

    // Open WhatsApp directly in new tab
    window.open(whatsappUrl, '_blank');

    setGeneratedTicket(ticket);
    if (onSuccess) onSuccess();
  };

  return (
    <section id="contact-section" className="w-full relative py-4 sm:py-6 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[450px] h-[450px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-[#d4af37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 space-y-6">
        
        {/* Section Heading Headers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 items-stretch">
          
          {/* ================= LEFT CARD: Contact Info Section ================= */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col h-full"
          >
            {/* Top Label */}
            <div className="text-center mb-2.5">
              <span className="text-xs sm:text-sm font-semibold text-neutral-300 tracking-wide">
                Contact Info & Coaching Pass
              </span>
            </div>

            {/* Transparent Glassmorphic Card matching Banner transparency */}
            <div className="flex-1 relative rounded-[26px] p-4 sm:p-6 md:p-8 bg-black/30 backdrop-blur-[2px] border border-white/15 shadow-2xl overflow-hidden flex flex-col justify-between group">
              {/* Glass Reflection Highlight Stripe */}
              <div className="absolute -top-24 -left-24 w-80 h-80 bg-gradient-to-br from-white/25 via-white/5 to-transparent rounded-full blur-2xl pointer-events-none" />
              <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-400/40 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              
              {/* Subtle diagonal glass glare line */}
              <div className="absolute top-0 right-1/4 w-32 h-[300%] bg-gradient-to-b from-white/10 via-transparent to-white/5 rotate-45 pointer-events-none" />

              <div className="relative z-10 space-y-5">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f5c842]/10 border border-[#f5c842]/30 text-[#f5c842] text-[11px] font-bold uppercase tracking-wider mb-2">
                    <Ticket className="w-3.5 h-3.5" />
                    Instant Digital Ticket Issuance
                  </div>
                  <h3 className="text-2xl sm:text-4xl lg:text-[2.5rem] font-extrabold text-white tracking-tight leading-tight">
                    Get in Touch & Book Pass
                  </h3>
                </div>

                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed max-w-md font-normal">
                  Reserve your personalized coaching program. When you submit your details, an official verified training ticket is generated and sent directly to your email with your package dates, goal, and expiry.
                </p>

                {/* Contact Points */}
                <div className="space-y-3.5 pt-1">
                  {/* Email */}
                  <a
                    href="mailto:heavenlydouglas@gmail.com"
                    className="flex items-center gap-3 text-neutral-200 hover:text-white transition-colors group/item"
                  >
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300 group-hover/item:text-[#d4af37] group-hover/item:border-[#d4af37]/40 transition-all shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium truncate">heavenlydouglas@gmail.com</span>
                  </a>

                  {/* Location */}
                  <div className="flex items-center gap-3 text-neutral-200">
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300 shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium">Dubai, United Arab Emirates</span>
                  </div>

                  {/* Phone */}
                  <a
                    href="tel:+971529421132"
                    className="flex items-center gap-3 text-neutral-200 hover:text-white transition-colors group/item"
                  >
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300 group-hover/item:text-[#2eb886] group-hover/item:border-[#2eb886]/40 transition-all shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium font-mono tracking-wide">
                      +971 52 942 1132
                    </span>
                  </a>
                </div>

                {/* Ticket Feature Highlights */}
                <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-2 text-xs text-neutral-300">
                  <div className="text-[11px] font-bold text-[#f5c842] uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Ticket includes:
                  </div>
                  <ul className="grid grid-cols-2 gap-1.5 text-[11px] text-neutral-400 font-medium">
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2eb886]" /> Selected Package
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2eb886]" /> Date Booked
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2eb886]" /> Client Full Name
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2eb886]" /> Goal / Program
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2eb886]" /> Expiry Date
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2eb886]" /> Email Pass Copy
                    </li>
                  </ul>
                </div>
              </div>

              {/* Status pill at bottom of info card */}
              <div className="relative z-10 pt-4 mt-4 flex items-center justify-between border-t border-white/10 text-[11px] text-neutral-400">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#2eb886] animate-pulse" />
                  Accepting 1-on-1 & Online Clients
                </span>
                <span className="text-[#d4af37] font-semibold">VIP Protocol</span>
              </div>
            </div>
          </motion.div>

          {/* ================= RIGHT CARD: Contact Form & Ticket Generation ================= */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col h-full"
          >
            {/* Top Label */}
            <div className="text-center mb-2.5">
              <span className="text-xs sm:text-sm font-semibold text-neutral-300 tracking-wide">
                {generatedTicket ? 'Generated Training Ticket' : 'Booking & Ticket Generator Form'}
              </span>
            </div>

            {/* Transparent Glassmorphic Form Card matching Banner transparency */}
            <div className="flex-1 relative rounded-[26px] p-5 sm:p-7 bg-black/30 backdrop-blur-[2px] border border-white/15 shadow-2xl overflow-hidden flex flex-col justify-between">
              {/* Glass Reflection Highlight */}
              <div className="absolute -top-24 -right-24 w-80 h-80 bg-gradient-to-bl from-purple-400/20 via-white/5 to-transparent rounded-full blur-2xl pointer-events-none" />
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-400/40 to-transparent" />
              <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              
              <div className="relative z-10 my-auto">
                {generatedTicket ? (
                  <TrainingTicketCard 
                    ticket={generatedTicket} 
                    onSendAnother={() => {
                      setGeneratedTicket(null);
                      setFormData({
                        name: '',
                        email: '',
                        websiteOrGoal: 'Physique Transformation & Fat Loss',
                        message: '',
                      });
                    }}
                  />
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    
                    {/* Live Ticket Preview Header Banner */}
                    <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-gradient-to-r from-[#d4af37]/15 to-transparent border border-[#d4af37]/30 text-xs">
                      <div className="flex items-center gap-2 text-white">
                        <Ticket className="w-4 h-4 text-[#f5c842]" />
                        <span className="font-bold">Book & Generate Official Ticket</span>
                      </div>
                      <span className="text-[10px] text-[#48d89e] font-semibold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> Auto-Dispatched to Email
                      </span>
                    </div>

                    {/* Particular Package Selector */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-neutral-300 uppercase tracking-wider flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Dumbbell className="w-3 h-3 text-[#f5c842]" />
                          Particular Package*
                        </span>
                        <span className="text-[#f5c842] font-mono text-[11px]">{selectedPkg.price}</span>
                      </label>
                      <select
                        value={selectedPackageId}
                        onChange={(e) => setSelectedPackageId(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-black/70 border border-white/20 focus:border-[#f5c842] focus:bg-black/90 rounded-xl text-white text-xs sm:text-sm outline-none transition-all cursor-pointer font-medium"
                      >
                        {PACKAGES_OPTIONS.map((pkg) => (
                          <option key={pkg.id} value={pkg.id} className="bg-neutral-950 text-white py-1">
                            {pkg.name} — {pkg.price} ({pkg.duration})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Client Name & Client Email Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Name Input */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-neutral-300 uppercase tracking-wider">
                          Client Full Name*
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Alexander Vance"
                          className="w-full px-3.5 py-2.5 bg-white/[0.07] border border-white/15 focus:border-[#f5c842] focus:bg-white/[0.12] rounded-xl text-white placeholder:text-neutral-500 text-xs sm:text-sm outline-none transition-all"
                        />
                      </div>

                      {/* Email Input */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-neutral-300 uppercase tracking-wider flex items-center justify-between">
                          <span>Client Email*</span>
                          <span className="text-[9px] text-[#48d89e] lowercase font-normal">(ticket destination)</span>
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="client@email.com"
                            className="w-full px-3.5 py-2.5 pr-8 bg-white/[0.07] border border-white/15 focus:border-[#f5c842] focus:bg-white/[0.12] rounded-xl text-white placeholder:text-neutral-500 text-xs sm:text-sm outline-none transition-all"
                          />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
                            <Mail className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Goal / Program Input & Quick Selector */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
                        <Target className="w-3 h-3 text-[#2eb886]" />
                        Goal / Program Focus*
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.websiteOrGoal}
                        onChange={(e) => setFormData({ ...formData, websiteOrGoal: e.target.value })}
                        placeholder="e.g. Hypertrophy, Fat Loss, Strength & Posture"
                        className="w-full px-3.5 py-2 bg-white/[0.07] border border-white/15 focus:border-[#2eb886] focus:bg-white/[0.12] rounded-xl text-white placeholder:text-neutral-500 text-xs outline-none transition-all"
                      />
                      
                      {/* Quick goal chips */}
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {GOAL_SUGGESTIONS.map((goal, idx) => (
                          <button
                            type="button"
                            key={idx}
                            onClick={() => setFormData({ ...formData, websiteOrGoal: goal })}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all cursor-pointer ${
                              formData.websiteOrGoal === goal
                                ? 'bg-[#2eb886] text-black shadow'
                                : 'bg-neutral-900/90 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
                            }`}
                          >
                            {goal}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Date Booked & Auto-Calculated Expiry Date Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-xl bg-black/40 border border-white/10">
                      {/* Date Booked Input */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-[#f5c842]" />
                          Date Booked
                        </label>
                        <input
                          type="date"
                          value={dateBooked}
                          onChange={(e) => setDateBooked(e.target.value)}
                          className="w-full px-3 py-1.5 bg-neutral-900 border border-neutral-700 focus:border-[#f5c842] rounded-lg text-white text-xs font-mono outline-none cursor-pointer"
                        />
                      </div>

                      {/* Dynamic Expiry Date */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#2eb886]" />
                          Expiry Date (Calculated)
                        </label>
                        <div className="px-3 py-1.5 bg-[#2eb886]/10 border border-[#2eb886]/30 rounded-lg text-[#48d89e] text-xs font-bold font-mono">
                          {currentExpiryPreview}
                        </div>
                      </div>
                    </div>

                    {/* Client Message / Notes */}
                    <div className="space-y-1">
                      <textarea
                        rows={2}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Additional notes or fitness background (optional)..."
                        className="w-full px-3.5 py-2 bg-white/[0.07] border border-white/15 focus:border-[#f5c842] focus:bg-white/[0.12] rounded-xl text-white placeholder:text-neutral-500 text-xs outline-none transition-all resize-none"
                      />
                    </div>

                    {/* Generate Ticket & Submit Button */}
                    <div className="pt-1">
                      <button
                        type="submit"
                        className="w-full relative group overflow-hidden py-3 px-6 rounded-2xl bg-gradient-to-r from-[#f5c842] via-[#ffe066] to-[#d4af37] text-black font-black text-sm tracking-wider uppercase shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Ticket className="w-4 h-4 text-black stroke-[2.5]" />
                        <span>Generate & Email Training Ticket</span>
                        <Send className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>

        </div>

        {/* ================= SOCIAL MEDIA BUTTONS SECTION (COMPACT ONE-LINE ROW) ================= */}
        <div className="pt-4 border-t border-neutral-900">
          <div className="text-center space-y-0.5 mb-4">
            <h4 className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
              Connect Across Digital Platforms
            </h4>
            <p className="text-xs text-neutral-400">
              Interactive channels — hover over any button to illuminate
            </p>
          </div>

          {/* Social Buttons in a single horizontal row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-3 max-w-4xl mx-auto">
            {SOCIAL_LINKS.map((social) => {
              const Icon = social.icon;
              const isHovered = hoveredSocial === social.id;

              return (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredSocial(social.id)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  className="relative group rounded-xl p-2 sm:p-2.5 flex flex-col items-center justify-center text-center transition-all duration-300 bg-neutral-950 border border-neutral-800 hover:border-neutral-700 cursor-pointer overflow-hidden"
                  style={{
                    boxShadow: isHovered
                      ? `0 0 20px ${social.glowColor}, inset 0 0 10px ${social.glowColor}`
                      : 'none',
                    borderColor: isHovered ? social.color : undefined,
                  }}
                >
                  {/* Glowing ambient radial light behind icon */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"
                    style={{
                      background: `radial-gradient(circle at center, ${social.glowColor} 0%, transparent 75%)`,
                    }}
                  />

                  {/* Icon with interactive color shift */}
                  <div
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center mb-1.5 transition-all duration-300 relative z-10"
                    style={{
                      backgroundColor: isHovered ? `${social.color}20` : '#171717',
                      color: isHovered ? social.color : '#a3a3a3',
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Name */}
                  <span className="text-[11px] sm:text-xs font-bold text-white relative z-10 group-hover:text-white transition-colors truncate max-w-full">
                    {social.name}
                  </span>
                </a>
              );
            })}
          </div>
        </div>

        {/* ================= HOME / BACK TO TOP BUTTON ABOVE FOOTER ================= */}
        {!hideHomeButton && (
          <div className="flex items-center justify-center pt-2">
            <button
              onClick={() => {
                if (onNavigateHome) {
                  onNavigateHome();
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="group relative flex items-center gap-2 px-5 py-2 rounded-full bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 hover:border-[#d4af37]/60 text-neutral-300 hover:text-white text-xs sm:text-sm font-semibold transition-all shadow-lg hover:shadow-[#d4af37]/10 cursor-pointer"
            >
              <Home className="w-4 h-4 text-[#d4af37] group-hover:scale-110 transition-transform" />
              <span>Home</span>
              <ArrowUp className="w-3.5 h-3.5 text-neutral-500 group-hover:text-[#d4af37] group-hover:-translate-y-0.5 transition-all" />
            </button>
          </div>
        )}

        {/* ================= MANDATED FOOTER ================= */}
        <footer className="pt-6 pb-2 border-t border-neutral-900/80 text-center relative z-10">
          <p className="text-xs sm:text-sm font-medium text-neutral-400 tracking-wide">
            © 2026 Coach Douglas. Built through resilience.
          </p>
        </footer>

      </div>
    </section>
  );
}
