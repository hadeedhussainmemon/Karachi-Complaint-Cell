'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ClipboardList, Map, ShieldAlert, Sparkles } from 'lucide-react';

import { useLanguage } from '@/components/LanguageProvider';

export default function Hero({ content }: { content?: any }) {
  const { t } = useLanguage();
  return (
    <div className="relative w-full bg-background pt-16 pb-20 md:pt-20 md:pb-32">
      
      {/* Decorative Floating Blurs */}
      

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12">
          
          {/* Hero Texts */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left z-10">
            
            {/* Live Indicator */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-primary/10 text-primary dark:bg-accent/10 dark:text-accent border border-primary/20 dark:border-accent/20 shadow-sm"
            >
              <Sparkles className="h-3 w-3 text-secondary animate-spin" />
              <span>{t('heroBadge')}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold tracking-tight leading-none text-gray-900 dark:text-white"
            >
              {content?.heroTitle1 || t('heroTitle1')} <span className="text-primary">
                {content?.heroTitle2 || t('heroTitle2')}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium"
            >
              Report daily civic issues like water, power, sewerage, and road damage. Explore the majestic landscapes of Pakistan’s largest province, and stay informed on official announcements.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Link
                href="/complaint"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 text-base font-bold text-white bg-primary hover:bg-primary-hover rounded-xl shadow-lg shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5"
              >
                <ClipboardList className="h-5 w-5 text-secondary" />
                {content?.submitBtnText || t('submitComplaintBtn')}
                <ArrowRight className="h-4.5 w-4.5 text-secondary" />
              </Link>
              
              <Link
                href="/locations"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 text-base font-bold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl border border-gray-300 dark:border-gray-800 shadow-md transition-all duration-200 hover:-translate-y-0.5"
              >
                <Map className="h-5 w-5 text-primary" />
                {content?.exploreBtnText || t('exploreLocations')}
              </Link>
            </motion.div>
            
            {/* Quick stats mini-bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-6 grid grid-cols-3 gap-4 border-t border-gray-200 dark:border-gray-800 max-w-md mx-auto lg:mx-0 text-left"
            >
              <div>
                <p className="text-2xl font-black text-primary dark:text-accent">98.4%</p>
                <p className="text-xs text-gray-500 font-semibold">Resolution Rate</p>
              </div>
              <div>
                <p className="text-2xl font-black text-gray-900 dark:text-white">24/7</p>
                <p className="text-xs text-gray-500 font-semibold">Active Dispatch</p>
              </div>
              <div>
                <p className="text-2xl font-black text-secondary">37</p>
                <p className="text-xs text-gray-500 font-semibold">Districts Tracked</p>
              </div>
            </motion.div>

          </div>

          {/* Hero Animated Karachi Graphic */}
          <div className="lg:col-span-5 flex justify-center items-center relative z-0">
            
            {/* Floating Glow Orb Behind Map */}
            

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-[420px] aspect-square flex items-center justify-center bg-white/30 dark:bg-gray-900/30 border border-white/40 dark:border-gray-800/40 rounded-3xl backdrop-blur-md shadow-2xl p-6 overflow-hidden"
            >
              
              {/* Floating Grid pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

              {/* Styled SVG map overlay grid of Karachi */}
              <svg
                viewBox="0 0 100 100"
                className="w-4/5 h-4/5 text-primary dark:text-accent/60 opacity-80 filter drop-shadow-[0_10px_15px_rgba(15,118,110,0.3)] animate-float"
              >
                {/* Triangular-Wedge abstraction of Karachi Province map outline */}
                <path
                  d="M 15 65 L 45 10 L 85 40 L 68 85 L 35 90 L 15 65 Z"
                  fill="url(#emeraldGradient)"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="2"
                  className="stroke-primary dark:stroke-accent"
                />
                
                {/* Lyari Marker */}
                <circle cx="20" cy="68" r="3" fill="#D4A017" className="animate-ping" />
                <circle cx="20" cy="68" r="2" fill="#D4A017" />
                <text x="25" y="70" className="text-[3.5px] fill-gray-600 dark:fill-gray-300 font-bold">Lyari</text>
                
                {/* Quetta Marker */}
                <circle cx="48" cy="22" r="3" fill="#38BDF8" className="animate-ping" />
                <circle cx="48" cy="22" r="2" fill="#38BDF8" />
                <text x="53" y="24" className="text-[3.5px] fill-gray-900 dark:fill-white font-black">KMC HEAD OFFICE</text>

                {/* Korangi Marker */}
                <circle cx="58" cy="26" r="2.5" fill="#10B981" />
                <text x="63" y="28" className="text-[3.5px] fill-gray-600 dark:fill-gray-300 font-bold">Korangi</text>

                {/* Saddar Marker */}
                <circle cx="44" cy="55" r="2.5" fill="#10B981" />
                <text x="49" y="57" className="text-[3.5px] fill-gray-600 dark:fill-gray-300 font-bold">Saddar</text>

                {/* Gradients */}
                <defs>
                  <linearGradient id="emeraldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0f766e" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#d4a017" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Interface Card Floating inside hero */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl p-4 border border-white/20 dark:border-gray-800/40 flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400">
                    <ShieldAlert className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800 dark:text-gray-200">Sewerage Overflow</p>
                    <p className="text-[10px] text-gray-500 font-semibold">Saddar • In Progress</p>
                  </div>
                </div>
                <span className="text-[10px] font-black uppercase text-secondary bg-secondary/10 px-2 py-0.5 rounded-md">
                  Urgent
                </span>
              </div>

            </motion.div>

          </div>

        </div>
      </div>
    </div>
  );
}





