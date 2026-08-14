import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Copy, Check, Palette, Sparkles } from 'lucide-react';
import { ColorDefinition } from '../types';

export const paletteData: ColorDefinition[] = [
  {
    name: 'Sunset Orange (Action & Energy)',
    percentage: '30%',
    hex: '#FF6B35',
    description: 'Primary action buttons, energy glows, and hero highlights.',
    role: 'Primary CTA, energy aura, main highlight accents',
  },
  {
    name: 'Emerald Vitality (Results & 10-Year Badge)',
    percentage: '25%',
    hex: '#10B981',
    description: '10-year experience badges, live availability, and active client results.',
    role: '10-Year Badge, progress tracking, live status indicator',
  },
  {
    name: 'Electric Pink (Dynamic Streaks & Hover)',
    percentage: '15%',
    hex: '#EC4899',
    description: 'Dynamic gradient streaks and interactive hover borders.',
    role: 'Gradient glows, interactive hover borders, dynamic accents',
  },
  {
    name: 'Radiant Gold (Credentials & Packages)',
    percentage: '15%',
    hex: '#FACC15',
    description: 'Credential markers, category tags, and package highlights.',
    role: 'Credential markers, category tags, price matrix badges',
  },
  {
    name: 'Royal Purple (Online Coaching & Ambient Depth)',
    percentage: '15%',
    hex: '#8B5CF6',
    description: 'Online coaching badges and subtle ambient background depth.',
    role: 'Online coaching badges, ambient background aura',
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
          <Palette className="w-5 h-5 text-[#FF6B35]" />
          <h3 className="text-base font-bold text-white tracking-tight">
            Vibrant High-Contrast Color Palette System
          </h3>
        </div>
        <span className="text-xs font-mono text-neutral-400 bg-neutral-800 px-2.5 py-1 rounded-full border border-neutral-700">
          Dark Theme (30 / 25 / 15 / 15 / 15)
        </span>
      </div>

      {/* Visual Proportional Bar */}
      <div className="w-full h-4 rounded-full overflow-hidden flex border border-neutral-800 mb-5 shadow-inner">
        <div
          style={{ width: '30%' }}
          className="bg-[#FF6B35] relative group flex items-center justify-center text-[10px] font-bold text-black"
          title="30% Sunset Orange"
        >
          30%
        </div>
        <div
          style={{ width: '25%' }}
          className="bg-[#10B981] relative group flex items-center justify-center text-[10px] font-bold text-black"
          title="25% Emerald"
        >
          25%
        </div>
        <div
          style={{ width: '15%' }}
          className="bg-[#EC4899] relative group flex items-center justify-center text-[10px] font-bold text-black"
          title="15% Pink"
        >
          15%
        </div>
        <div
          style={{ width: '15%' }}
          className="bg-[#FACC15] relative group flex items-center justify-center text-[10px] font-bold text-black"
          title="15% Gold"
        >
          15%
        </div>
        <div
          style={{ width: '15%' }}
          className="bg-[#8B5CF6] relative group flex items-center justify-center text-[10px] font-bold text-white"
          title="15% Purple"
        >
          15%
        </div>
      </div>

      {/* Grid of Palette Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
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
                  <Check className="w-3 h-3 text-[#10B981]" />
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
