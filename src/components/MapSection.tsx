import React from 'react';
import { motion } from 'motion/react';
import { 
  MapPin, 
  Globe, 
  ExternalLink, 
  Navigation, 
  Sparkles, 
  Compass, 
  Clock, 
  ShieldCheck 
} from 'lucide-react';

export const MapSection: React.FC = () => {
  const locationName = "Volfoni Thionville";
  const address = "26 Rue de Verdun, Thionville, 57100, GES, FR";
  const website = "www.volfoni.fr";
  const websiteUrl = "https://www.volfoni.fr";
  const googleMapsDirectionsUrl = "https://www.google.com/maps/dir/?api=1&destination=Volfoni+Thionville+26+Rue+de+Verdun+Thionville+57100";

  return (
    <section id="location-section" className="w-full relative py-4 sm:py-6 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[450px] h-[450px] bg-[#FF6B35]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-[#10B981]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 space-y-6">
        
        {/* Section Heading Label */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6B35]/10 border border-[#FF6B35]/30 text-[#FF6B35] text-[11px] font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            Official Physical Location
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-[2.6rem] font-extrabold text-white tracking-tight leading-tight">
            Find Us in Thionville
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm max-w-xl mx-auto">
            Train in person, attend private consultations, or connect from anywhere across the globe.
          </p>
        </div>

        {/* Two-Column Grid: Location Details & Embedded Google Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          
          {/* ================= LEFT CARD: Location Details ================= */}
          <motion.div 
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col h-full"
          >
            <div className="flex-1 relative rounded-[26px] p-5 sm:p-7 md:p-8 bg-black/30 backdrop-blur-[2px] border border-white/15 shadow-2xl overflow-hidden flex flex-col justify-between group">
              {/* Glass Reflection Highlight Stripe */}
              <div className="absolute -top-24 -left-24 w-80 h-80 bg-gradient-to-br from-white/20 via-white/5 to-transparent rounded-full blur-2xl pointer-events-none" />
              <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FF6B35]/40 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              <div className="relative z-10 space-y-5">
                {/* Location Title & Verified Badge */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#10B981]">
                      Active Facility & Meeting Hub
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                    {locationName}
                  </h3>
                </div>

                {/* Address Box */}
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#FF6B35]/15 border border-[#FF6B35]/30 flex items-center justify-center text-[#FF6B35] shrink-0 mt-0.5">
                      <Compass className="w-4 h-4 text-[#FF6B35]" />
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                        Street Address
                      </span>
                      <p className="text-sm font-semibold text-white leading-relaxed">
                        {address}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Website Box */}
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#10B981]/15 border border-[#10B981]/30 flex items-center justify-center text-[#10B981] shrink-0">
                      <Globe className="w-4 h-4 text-[#10B981]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                        Official Website
                      </span>
                      <a
                        href={websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-bold text-[#f5c842] hover:text-[#ffe066] hover:underline flex items-center gap-1.5 transition-colors truncate"
                      >
                        <span>{website}</span>
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Highlight Features */}
                <div className="space-y-2 pt-1">
                  <div className="text-[11px] font-bold text-[#d4af37] uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Facility Highlights:
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" /> In-person consultations
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" /> 1-on-1 private training
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" /> Nutrition & mindset planning
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" /> Central Thionville access
                    </li>
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="relative z-10 pt-5 mt-5 border-t border-white/10 flex flex-col sm:flex-row items-center gap-2.5">
                <a
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#f5c842] hover:from-[#ff7e4f] hover:to-[#ffe066] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg shadow-[#FF6B35]/20 hover:scale-[1.01] transition-all cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5 fill-black" />
                  <span>Get Directions</span>
                </a>
                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 text-white font-semibold text-xs border border-white/15 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Globe className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Visit Website</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* ================= RIGHT CARD: Embedded Map ================= */}
          <motion.div 
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col h-full"
          >
            <div className="flex-1 relative rounded-[26px] p-3 sm:p-4 bg-black/30 backdrop-blur-[2px] border border-white/15 shadow-2xl overflow-hidden flex flex-col">
              {/* Glass Reflection Highlight */}
              <div className="absolute -top-24 -right-24 w-80 h-80 bg-gradient-to-bl from-[#10B981]/20 via-white/5 to-transparent rounded-full blur-2xl pointer-events-none" />
              
              {/* Map Header bar inside card */}
              <div className="flex items-center justify-between px-3 py-2 mb-3 rounded-xl bg-black/50 border border-white/10 text-xs">
                <div className="flex items-center gap-2 text-neutral-200">
                  <MapPin className="w-3.5 h-3.5 text-[#FF6B35]" />
                  <span className="font-semibold text-white">Google Maps Interactive View</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#48d89e] font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Pin</span>
                </div>
              </div>

              {/* Responsive Iframe Container */}
              <div className="flex-1 w-full min-h-[350px] sm:min-h-[420px] rounded-2xl overflow-hidden border border-white/10 relative shadow-inner bg-neutral-950">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2599.2291821534022!2d6.154424876492747!3d49.34781067140287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479525ab309ae307%3A0xb5a8af3258fd59ad!2sVolfoni%20Thionville!5e0!3m2!1sen!2sug!4v1795011992664!5m2!1sen!2sug"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Volfoni Thionville Location Map"
                  className="w-full h-full min-h-[350px] sm:min-h-[420px] rounded-2xl transition-opacity duration-500"
                />
              </div>

              {/* Map Footer helper pill */}
              <div className="mt-2.5 px-3 py-1.5 rounded-xl bg-black/40 border border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-400 gap-1">
                <span>📍 Volfoni Thionville • 26 Rue de Verdun, 57100 Thionville</span>
                <a
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FF6B35] hover:underline flex items-center gap-1 font-medium"
                >
                  Open full Google Map <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
