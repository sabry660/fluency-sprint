import React from 'react';
import { Target, HelpCircle, ShieldCheck, Zap, Globe, MessageSquare, Flame } from 'lucide-react';
import { motion } from 'motion/react';

export default function About() {
  return (
    <section
      id="about"
      className="relative py-24 md:py-36 overflow-hidden bg-brand-dark-950/60"
    >
      {/* Decorative Blur Backplate */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-radial from-brand-cyan/5 to-transparent filter blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Intention Copy */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 text-brand-cyan">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
              <span className="font-accent font-semibold text-xs tracking-widest uppercase">
                THE PHILOSOPHY
              </span>
            </div>

            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white leading-[1.15]">
              Why <br />
              <span className="text-gradient">Fluency Sprint?</span>
            </h2>

            <p className="text-gray-300 font-sans text-sm md:text-base leading-relaxed font-light">
              Fluency Sprint is built for learners who want real progress, not endless theory. We focus on accelerating your English fluency through practical speaking, real-life communication, and modern interactive learning methods.
            </p>

            <p className="text-gray-400 font-sans text-xs md:text-sm leading-relaxed font-light">
              Our approach is simple — learn faster, speak confidently, and think in English naturally. Whether you're starting from basics or refining advanced fluency, Fluency Sprint guides you step-by-step toward real-world mastery.
            </p>

            <div className="pt-4 border-t border-white/5 space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="p-1.5 rounded-lg bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan mt-1">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-accent font-semibold text-white text-sm">Fearless Speaking habit</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Shatter the psychological barrier to speak starting on day one.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-1.5 rounded-lg bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan mt-1">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-accent font-semibold text-white text-sm">Global Career Readiness</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Currated specifically for business leaders, digital innovators, and scholars.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Interactive Glass cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div className="glass-panel glass-panel-hover p-8 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.5)] space-y-4 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-brand-cyan/20 to-brand-cyan/2 flex items-center justify-center border border-brand-cyan/30 text-brand-cyan transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(0,242,254,0.4)]">
                <Target className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h3 className="font-display font-semibold text-lg text-white group-hover:text-brand-cyan transition-colors duration-300">Direct Natural Concept</h3>
              <p className="text-xs text-gray-300 leading-relaxed font-light">
                Connect ideas directly to oral English structures without internal translation steps. This maximizes spoken reflex and conversational cadence.
              </p>
            </div>

            <div className="glass-panel glass-panel-hover p-8 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.5)] space-y-4 group sm:translate-y-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-brand-purple/20 to-brand-purple/2 flex items-center justify-center border border-brand-purple/30 text-brand-purple transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                <MessageSquare className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h3 className="font-display font-semibold text-lg text-white group-hover:text-brand-purple transition-colors duration-300">Dynamic Feedback</h3>
              <p className="text-xs text-gray-300 leading-relaxed font-light">
                Receive context-rich, nuanced constructive reviews on cadence, posture, vocal control, and word pairings in micro-cycles.
              </p>
            </div>

            <div className="glass-panel glass-panel-hover p-8 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.5)] space-y-4 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-brand-cyan/20 to-brand-cyan/2 flex items-center justify-center border border-brand-cyan/30 text-brand-cyan transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(0,242,254,0.4)]">
                <Zap className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h3 className="font-display font-semibold text-lg text-white group-hover:text-brand-cyan transition-colors duration-300">Active Recalling</h3>
              <p className="text-xs text-gray-300 leading-relaxed font-light">
                Leverage spatial spacing and active scenario-based immersion to wire neural english structures deep into long-term memory permanently.
              </p>
            </div>

            <div className="glass-panel glass-panel-hover p-8 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.5)] space-y-4 group sm:translate-y-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-brand-purple/20 to-brand-purple/2 flex items-center justify-center border border-brand-purple/30 text-brand-purple transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h3 className="font-display font-semibold text-lg text-white group-hover:text-brand-purple transition-colors duration-300">Exclusive Cohorts</h3>
              <p className="text-xs text-gray-300 leading-relaxed font-light">
                Engage in luxury learning environments alongside curated digital creators, executives, and high-impact career professionals.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
