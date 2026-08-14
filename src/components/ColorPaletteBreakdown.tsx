import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Copy, Check, Palette, Sparkles } from 'lucide-react';
import { ColorDefinition } from '../types';

export const paletteData: ColorDefinition[] = [
  {
    name: 'Plane Black (Canvas & Surfaces)',
    percentage: '70%',
    hex: '#000000',
    description: 'Ultra-deep plane black backdrop creating premium negative space without distractions.',
    role: 'Background, layout container, structural framing',
  },
  {
    name: 'Pure White (Typography & CTA)',
    percentage: '15%',
    hex: '#FFFFFF',
    description: 'High-contrast crisp white for main hero title, secondary headings, and primary CTA pill.',
    role: 'Hero typography, primary callout button, navigation labels',
  },
  {
    name: 'Metallic Gold (Accents & Numerals)',
    percentage: '10%',
    hex: '#D4AF37',
    description: 'Luxury gold accents for service tags (#01 - #04), CTA arrow badge, and signature details.',
    role: 'Service indices, directional button icon, decorative rules',
  },
  {
    name: 'Healing Green (Vitality & Status)',
    percentage: '5%',
    hex: '#2EB886',
    description: 'Calming botanical healing green for live availability indicator, micro-badge, and glow pulses.',
    role: 'Live status dot, availability badge, subtle ambient lighting',
  },
];

export function ColorPaletteBreakdown() {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-2xl p-5 md:p-6 backdrop-blur-md">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-800">
        <div className="flex items-center gap-2.5">
          <Palette className="w-5 h-5 text-[#d4af37]" />
          <h3 className="text-base font-bold text-white tracking-tight">
            Design Color Palette Ratio (70 / 15 / 10 / 5)
          </h3>
        </div>
        <span className="text-xs font-mono text-neutral-400 bg-neutral-800 px-2.5 py-1 rounded-full border border-neutral-700">
          Sugo Display & Montserrat
        </span>
      </div>

      {/* Visual Proportional Bar */}
      <div className="w-full h-4 rounded-full overflow-hidden flex border border-neutral-800 mb-5 shadow-inner">
        <div
          style={{ width: '70%' }}
          className="bg-black border-r border-neutral-800 relative group flex items-center justify-center text-[10px] font-bold text-neutral-400"
          title="70% Black"
        >
          70%
        </div>
        <div
          style={{ width: '15%' }}
          className="bg-white border-r border-neutral-300 relative group flex items-center justify-center text-[10px] font-bold text-black"
          title="15% White"
        >
          15%
        </div>
        <div
          style={{ width: '10%' }}
          className="bg-[#d4af37] border-r border-[#b8952b] relative group flex items-center justify-center text-[10px] font-bold text-black"
          title="10% Gold"
        >
          10%
        </div>
        <div
          style={{ width: '5%' }}
          className="bg-[#2eb886] relative group flex items-center justify-center text-[9px] font-bold text-black"
          title="5% Healing Green"
        >
          5%
        </div>
      </div>

      {/* Grid of Palette Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {paletteData.map((item, idx) => (
          <motion.div
            key={item.hex}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className="p-3.5 rounded-xl bg-neutral-950/70 border border-neutral-800/80 flex flex-col justify-between space-y-2 hover:border-neutral-700 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full border border-neutral-700 shadow-sm"
                  style={{ backgroundColor: item.hex }}
                />
                <span className="text-xs font-bold text-white">{item.percentage}</span>
              </div>
              <button
                onClick={() => copyToClipboard(item.hex)}
                className="text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-1 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800 transition-colors"
                title="Click to copy HEX"
              >
                {copiedHex === item.hex ? (
                  <Check className="w-3 h-3 text-[#2eb886]" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
                {item.hex}
              </button>
            </div>
            
            <div>
              <p className="text-xs font-semibold text-neutral-200">{item.name}</p>
              <p className="text-[11px] text-neutral-400 mt-0.5 leading-snug">{item.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
