import React from 'react';
import { Compass, Sparkles, ChevronRight, Globe, Layers } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onExploreCourses: () => void;
}

export default function Hero({ onExploreCourses }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-[95vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-28 md:pt-20"
    >
      {/* Animated Aurora Gradient Theme with moving blurred shapes */}
      <div className="aurora-mesh">
        <div className="aurora-blur aurora-1" />
        <div className="aurora-blur aurora-2" />
        <div className="aurora-blur aurora-3" />
      </div>

      {/* Background Decorative Ambient Orbs */}
      <div className="absolute top-1/4 left-1/10 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-radial from-brand-cyan/20 to-transparent filter blur-[80px] animate-float-slow" />
      <div className="absolute bottom-10 right-1/10 w-[200px] md:w-[450px] h-[200px] md:h-[450px] rounded-full bg-radial from-brand-purple/15 to-transparent filter blur-[100px] animate-float-medium" />
      
      {/* Dynamic Grid Overlay to simulate top-tier SaaS interfaces */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 text-center z-10 space-y-9">
        {/* Upper Micro-Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-cyan/25 bg-brand-cyan/5 text-xs text-brand-cyan font-accent tracking-widest uppercase font-semibold shadow-[0_0_15px_rgba(0,242,254,0.1)] hover:border-brand-cyan/50 hover:bg-brand-cyan/10 transition-all duration-300"
        >
          <Sparkles className="w-3.5 h-3.5 text-brand-cyan animate-pulse" />
          The New Standard of Linguistic Immersive Excellence
        </motion.div>

        {/* Big Premium Header */}
        <div className="max-w-4xl mx-auto space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-display text-4xl sm:text-5xl md:text-8xl font-black tracking-tight text-white leading-[1.05]"
          >
            Master <span className="text-gradient-cyan-purple font-extrabold relative inline-block">English Fluency</span> <br />
            at Sprint Speed
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-gray-300 text-base md:text-xl font-sans max-w-2xl mx-auto font-light leading-relaxed tracking-wide"
          >
            Fluency Sprint helps you speak English naturally, confidently, and faster through immersive practice, real conversations, and modern learning techniques designed for real-world success.
          </motion.p>
        </div>

        {/* CTA Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4"
        >
          <button
            id="hero-explore-cta"
            onClick={onExploreCourses}
            className="w-full sm:w-auto px-10 py-4.5 rounded-xl font-accent font-bold text-xs tracking-wider uppercase bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-cyan bg-[length:200%_auto] hover:bg-[100%_center] text-brand-dark-950 shadow-[0_0_30px_rgba(0,242,254,0.35)] hover:shadow-[0_0_45px_rgba(139,92,246,0.6)] transition-all duration-500 scale-100 hover:scale-[1.03] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2.5 group"
          >
            Explore Courses
            <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 stroke-[2.5]" />
          </button>

          <button
            id="hero-scroll-btn"
            onClick={() => {
              const element = document.getElementById('about');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="w-full sm:w-auto px-10 py-4.5 rounded-xl font-accent font-bold text-xs tracking-wider uppercase border border-white/10 hover:border-brand-cyan/40 bg-white/5 hover:bg-brand-cyan/5 text-white shadow-[0_4px_15px_rgba(0,0,0,0.15)] transition-all duration-300 scale-100 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
          >
            Start Your Journey
          </button>
        </motion.div>

        {/* Multi-metric stats bar at the bottom of hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="pt-16 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          {[
            { metric: '99%', label: 'Fluency Triumph Rate' },
            { metric: '10,000+', label: 'Elite Global Students' },
            { metric: '1-on-1', label: 'Immersive Mentoring' },
            { metric: '30+', label: 'Premium Modules' },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl border border-white/5 bg-brand-dark-900/40 backdrop-blur-md shadow-2xl transition-all duration-300 hover:border-brand-cyan/20 hover:bg-brand-dark-900/60"
            >
              <div className="text-xl md:text-3xl font-display font-semibold text-white tracking-tight text-gradient-cyan-purple">
                {stat.metric}
              </div>
              <div className="text-[10px] md:text-xs font-accent text-gray-500 uppercase tracking-widest mt-1.5 font-bold">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Luxury Fade Mask border at bottom to blend into About */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-brand-dark-950 to-transparent pointer-events-none" />
    </section>
  );
}
