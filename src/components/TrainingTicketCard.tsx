import React, { useRef, useState } from 'react';
import { 
  CheckCircle2, 
  Download, 
  Mail, 
  MessageCircle, 
  Calendar, 
  Clock, 
  User, 
  Target, 
  Sparkles, 
  Share2, 
  Copy, 
  Check, 
  ShieldCheck, 
  QrCode, 
  Dumbbell,
  ArrowUpRight
} from 'lucide-react';
import * as htmlToImage from 'html-to-image';
import { TrainingTicket } from '../types';

interface TrainingTicketCardProps {
  ticket: TrainingTicket;
  onSendAnother?: () => void;
}

export function TrainingTicketCard({ ticket, onSendAnother }: TrainingTicketCardProps) {
  const ticketRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [emailStatus, setEmailStatus] = useState<'sent' | 'resending' | 'ready'>('sent');

  // Export ticket to PNG image
  const handleDownloadTicket = async () => {
    if (!ticketRef.current) return;
    try {
      setIsExporting(true);
      const dataUrl = await htmlToImage.toPng(ticketRef.current, {
        quality: 0.98,
        pixelRatio: 2,
        cacheBust: true,
      });
      const link = document.createElement('a');
      link.download = `CoachDouglas-Ticket-${ticket.ticketId}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export ticket:', err);
    } finally {
      setIsExporting(false);
    }
  };

  // Copy Ticket Details Text
  const handleCopyTicketDetails = () => {
    const text = `
══════════════════════════════════════════════════
🏋️ COACH DOUGLAS FITNESS - OFFICIAL TRAINING PASS
══════════════════════════════════════════════════
🎫 TICKET ID: ${ticket.ticketId}
👤 CLIENT FULL NAME: ${ticket.clientName}
📧 CLIENT EMAIL: ${ticket.clientEmail}
📦 PROGRAM PAID FOR: ${ticket.packageName}
💰 AMOUNT PAID: ${ticket.packagePrice} (${ticket.duration})
🎯 GOAL / TARGET FOCUS: ${ticket.goalProgram}
📅 DATE BOOKED: ${ticket.dateBooked}
⏳ EXPIRY DATE (VALID UNTIL): ${ticket.expiryDate}
🛡️ VERIFICATION STATUS: ${ticket.status} (Verified Active Pass)
📍 LOCATION: Global & Private 1-on-1
📱 COACH WHATSAPP: +971 52 942 1132
══════════════════════════════════════════════════
    `.trim();

    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  // Email Ticket to Client
  const handleEmailToClient = () => {
    setEmailStatus('resending');
    const subject = encodeURIComponent(`Coach Douglas Fitness - Official Training Ticket [${ticket.ticketId}]`);
    const body = encodeURIComponent(
      `Hello ${ticket.clientName},\n\n` +
      `Here is your official Coach Douglas Fitness training pass & booking confirmation:\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `• Ticket ID: ${ticket.ticketId}\n` +
      `• Client Full Name: ${ticket.clientName}\n` +
      `• Program Paid For: ${ticket.packageName} (${ticket.packagePrice})\n` +
      `• Duration / Validity: ${ticket.duration}\n` +
      `• Goal / Target Focus: ${ticket.goalProgram}\n` +
      `• Date Booked: ${ticket.dateBooked}\n` +
      `• Expiry Date: ${ticket.expiryDate}\n` +
      `• Pass Status: CONFIRMED & ACTIVE\n` +
      `• Coach WhatsApp: +971 52 942 1132\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
      `Coach Douglas Sebugwawo will contact you shortly to coordinate your onboarding, biometrics assessment, and session calendar.\n\n` +
      `Best regards,\n` +
      `Coach Douglas Fitness Team\n` +
      `Dubai, UAE • Worldwide Online`
    );

    window.location.href = `mailto:${ticket.clientEmail}?subject=${subject}&body=${body}`;
    setTimeout(() => setEmailStatus('sent'), 1000);
  };

  // Dispatch to WhatsApp
  const handleOpenWhatsApp = () => {
    const message = encodeURIComponent(
      `*🏋️ COACH DOUGLAS FITNESS - OFFICIAL TRAINING TICKET*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `🎫 *Ticket ID:* ${ticket.ticketId}\n` +
      `👤 *Client Full Name:* ${ticket.clientName}\n` +
      `📧 *Client Email:* ${ticket.clientEmail}\n` +
      `📦 *Program Paid For:* ${ticket.packageName} (${ticket.packagePrice})\n` +
      `⏱️ *Duration:* ${ticket.duration}\n` +
      `🎯 *Goal / Program:* ${ticket.goalProgram}\n` +
      `📅 *Date Booked:* ${ticket.dateBooked}\n` +
      `⏳ *Expiry Date:* ${ticket.expiryDate}\n` +
      `${ticket.notes ? `💬 *Notes:* ${ticket.notes}\n` : ''}` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `✅ *Status:* Confirmed & Active Pass\n` +
      `📧 *Official Pass Delivered to:* ${ticket.clientEmail}`
    );

    window.open(`https://wa.me/971529421132?text=${message}`, '_blank');
  };

  return (
    <div className="space-y-4 w-full animate-in fade-in zoom-in-95 duration-300">
      
      {/* Email Dispatched Banner */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-[#2eb886]/10 border border-[#2eb886]/30 text-xs">
        <div className="flex items-center gap-2 text-[#48d89e]">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-[#2eb886]" />
          <span>
            Ticket successfully generated and dispatched to <strong className="text-white underline">{ticket.clientEmail}</strong>
          </span>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#2eb886]/20 text-[#48d89e] text-[10px] font-bold uppercase tracking-wider">
          <ShieldCheck className="w-3 h-3" /> Verified
        </span>
      </div>

      {/* Visual Digital Ticket Pass for Download / Display */}
      <div 
        ref={ticketRef}
        className="relative bg-gradient-to-br from-[#0e0e14] via-[#09090d] to-[#14141d] rounded-3xl border-2 border-[#d4af37]/80 text-white shadow-2xl overflow-hidden p-5 sm:p-7 select-none font-montserrat"
      >
        {/* Glowing Accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2eb886]/10 rounded-full blur-3xl pointer-events-none" />
        
        {/* Ticket Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800/80 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#f5c842] to-[#b38316] text-black font-black flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Dumbbell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-1">
                COACH DOUGLAS<span className="text-[#f5c842]">.</span>
              </h3>
              <p className="text-[10px] text-neutral-400 font-mono tracking-widest uppercase">
                OFFICIAL TRAINING PASS
              </p>
            </div>
          </div>

          <div className="text-right">
            <div className="px-2.5 py-1 rounded-full bg-[#f5c842] text-black font-mono font-extrabold text-[11px] shadow">
              {ticket.ticketId}
            </div>
            <span className="text-[9px] text-[#48d89e] font-semibold tracking-wider uppercase block mt-1">
              ● ACTIVE PASS
            </span>
          </div>
        </div>

        {/* Ticket Body Content Grid */}
        <div className="py-4 space-y-3.5 relative z-10">
          
          {/* 1. Client Full Name Card (Prominent, Full Display, No Truncation) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-neutral-900/90 via-black/80 to-neutral-900/90 border border-white/15 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-2 mb-2 border-b border-neutral-800/80">
              <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-extrabold text-[#f5c842] uppercase tracking-wider">
                <User className="w-3.5 h-3.5 text-[#f5c842]" />
                <span>PASS ISSUED TO / CLIENT FULL NAME</span>
              </div>
              <span className="text-[10px] text-[#48d89e] font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#2eb886]" /> Verified Identity
              </span>
            </div>
            <div className="space-y-1">
              <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight break-words leading-tight">
                {ticket.clientName}
              </h3>
              <p className="text-xs text-neutral-400 font-mono flex items-center gap-1.5 break-all">
                <Mail className="w-3 h-3 text-neutral-500 shrink-0" />
                <span>{ticket.clientEmail}</span>
              </p>
            </div>
          </div>

          {/* 2. Program Paid For Card (High Prominence & Full Program Title) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#1b1910] via-black/90 to-[#121218] border-2 border-[#d4af37]/60 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#f5c842]/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 relative z-10">
              <div className="space-y-1.5 flex-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#f5c842]/20 border border-[#f5c842]/40 text-[#f5c842] text-[10px] font-extrabold uppercase tracking-wider">
                  <Dumbbell className="w-3 h-3" />
                  <span>PROGRAM PAID FOR</span>
                </div>
                <h4 className="text-base sm:text-xl font-black text-white tracking-tight break-words">
                  {ticket.packageName}
                </h4>
                <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-300">
                  <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 font-mono text-neutral-300">
                    {ticket.duration}
                  </span>
                  <span className="text-neutral-500">•</span>
                  <span className="text-neutral-400">1-on-1 & Personalized Coaching</span>
                </div>
              </div>

              <div className="sm:text-right shrink-0">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                  AMOUNT PAID
                </span>
                <span className="text-2xl sm:text-3xl font-black text-[#f5c842] font-mono tracking-tight">
                  {ticket.packagePrice}
                </span>
                <span className="text-[10px] text-[#48d89e] font-bold block">
                  PAID & CONFIRMED
                </span>
              </div>
            </div>

            {/* Program Goal / Target Focus sub-strip */}
            <div className="mt-3.5 pt-3 border-t border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs relative z-10">
              <div className="flex items-center gap-1.5 text-neutral-300 flex-wrap">
                <Target className="w-3.5 h-3.5 text-[#2eb886] shrink-0" />
                <span className="text-neutral-400">Goal / Target Program:</span>
                <strong className="text-white font-bold">{ticket.goalProgram}</strong>
              </div>
              <span className="text-[10px] text-neutral-400 font-mono">
                Dubai 1-on-1 & Online
              </span>
            </div>
          </div>

          {/* 3. Dates & Ticket Validity Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Date Booked */}
            <div className="p-3.5 rounded-xl bg-neutral-900/90 border border-neutral-800 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#f5c842]" />
                  Date Booked
                </span>
                <p className="text-sm font-black text-white font-mono">
                  {ticket.dateBooked}
                </p>
              </div>
              <span className="text-[10px] font-medium text-neutral-500 bg-black/50 px-2 py-1 rounded">
                Confirmed
              </span>
            </div>

            {/* Expiry Date */}
            <div className="p-3.5 rounded-xl bg-[#2eb886]/10 border border-[#2eb886]/30 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-[#48d89e] uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#2eb886]" />
                  Expiry Date (Valid Until)
                </span>
                <p className="text-sm font-black text-[#48d89e] font-mono">
                  {ticket.expiryDate}
                </p>
              </div>
              <span className="text-[10px] font-bold text-[#48d89e] bg-[#2eb886]/20 px-2 py-1 rounded uppercase tracking-wider">
                Active
              </span>
            </div>
          </div>

          {/* Client Email & Sent Confirmation */}
          <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-neutral-900/60 border border-neutral-800 text-xs">
            <div className="flex items-center gap-2 text-neutral-300 truncate">
              <Mail className="w-3.5 h-3.5 text-[#f5c842] shrink-0" />
              <span className="text-neutral-400">Pass Delivered to:</span>
              <strong className="text-white truncate">{ticket.clientEmail}</strong>
            </div>
            <span className="text-[10px] text-[#48d89e] font-semibold shrink-0">
              ✓ Email Dispatched
            </span>
          </div>

        </div>

        {/* Ticket Perforated Divider (Cut-out notches on left and right) */}
        <div className="relative py-3 flex items-center">
          <div className="absolute -left-7 sm:-left-9 w-5 h-5 bg-[#0a0a0c] rounded-full border-r border-neutral-800" />
          <div className="absolute -right-7 sm:-right-9 w-5 h-5 bg-[#0a0a0c] rounded-full border-l border-neutral-800" />
          <div className="w-full border-b-2 border-dashed border-neutral-700/80" />
        </div>

        {/* Ticket Footer / Verification & Barcode */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs relative z-10">
          <div className="flex items-center gap-3">
            {/* Simulated QR Code Box */}
            <div className="w-11 h-11 bg-white rounded-lg p-1 flex items-center justify-center shrink-0 shadow">
              <QrCode className="w-9 h-9 text-black" />
            </div>
            <div className="text-[11px] text-neutral-400">
              <div className="text-white font-semibold flex items-center gap-1">
                Dubai 1-on-1 & Online <Sparkles className="w-3 h-3 text-[#f5c842]" />
              </div>
              <div>Coach Douglas • +971 52 942 1132</div>
            </div>
          </div>

          {/* Barcode Strip Graphic */}
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-[2px] h-6 px-2 bg-neutral-900/90 rounded border border-neutral-800">
              <span className="w-0.5 h-4 bg-white" />
              <span className="w-1 h-4 bg-white" />
              <span className="w-0.5 h-4 bg-white" />
              <span className="w-1.5 h-4 bg-white" />
              <span className="w-0.5 h-4 bg-white" />
              <span className="w-1 h-4 bg-white" />
              <span className="w-2 h-4 bg-white" />
              <span className="w-0.5 h-4 bg-white" />
              <span className="w-1 h-4 bg-white" />
              <span className="w-0.5 h-4 bg-white" />
              <span className="w-1.5 h-4 bg-white" />
            </div>
            <span className="text-[9px] font-mono text-neutral-500 mt-0.5">
              PASS-AUTH-SECURE
            </span>
          </div>
        </div>

      </div>

      {/* Action Buttons for Client & Coach */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
        
        {/* Download Ticket Image */}
        <button
          onClick={handleDownloadTicket}
          disabled={isExporting}
          className="w-full py-2.5 px-3 rounded-xl bg-[#f5c842] hover:bg-amber-300 text-black font-extrabold text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>{isExporting ? 'Generating...' : 'Download Ticket (PNG)'}</span>
        </button>

        {/* Send to WhatsApp */}
        <button
          onClick={handleOpenWhatsApp}
          className="w-full py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-extrabold text-xs shadow-lg shadow-[#25D366]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 fill-black" />
          <span>Send to WhatsApp</span>
        </button>

        {/* Resend / Open in Email App */}
        <button
          onClick={handleEmailToClient}
          className="w-full py-2.5 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 hover:border-[#f5c842] font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Mail className="w-4 h-4 text-[#f5c842]" />
          <span>{emailStatus === 'resending' ? 'Opening Email...' : 'Email Ticket Copy'}</span>
        </button>

      </div>

      {/* Secondary Bottom Controls (Copy details + Book another) */}
      <div className="flex items-center justify-between text-xs text-neutral-400 pt-2 border-t border-neutral-900">
        <button
          onClick={handleCopyTicketDetails}
          className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          {copiedCode ? <Check className="w-3.5 h-3.5 text-[#2eb886]" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copiedCode ? 'Ticket Copied!' : 'Copy Ticket Info'}</span>
        </button>

        {onSendAnother && (
          <button
            onClick={onSendAnother}
            className="text-neutral-400 hover:text-[#f5c842] transition-colors cursor-pointer font-medium"
          >
            Generate Another Ticket →
          </button>
        )}
      </div>

    </div>
  );
}
