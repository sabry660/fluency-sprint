import React, { useEffect } from 'react';
import { X, Clock, Users, DollarSign, CheckCircle2, Star, Sparkles, Crown } from 'lucide-react';
import { Course } from '../types';
import { isPremiumCourse } from '../data/coursesData';
import { motion, AnimatePresence } from 'motion/react';

interface ExploreModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onBuyCourse: (course: Course) => void;
}

export default function ExploreModal({ course, isOpen, onClose, onBuyCourse }: ExploreModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!course) return null;

  const isPremium = isPremiumCourse(course);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
          <motion.div
            id="explore-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-dark-950/80 backdrop-blur-md cursor-zoom-out"
          />

          <motion.div
            id="explore-modal-panel"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className={`relative w-full max-w-3xl glass-panel bg-brand-dark-900/95 border rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[85vh] flex flex-col ${
              isPremium ? 'border-brand-gold/30' : 'border-white/10'
            }`}
          >
            <div
              className="h-1.5 w-full bg-gradient-to-r"
              style={{
                backgroundImage: isPremium
                  ? 'linear-gradient(to right, #e2b13c, #a855f7, #e2b13c)'
                  : `linear-gradient(to right, ${course.accentColor}, #8b5cf6)`,
              }}
            />

            <div className="p-6 md:p-8 border-b border-white/5 flex items-start justify-between gap-4">
              <div className="space-y-2">
                {isPremium && (
                  <div className="flex flex-wrap gap-2">
                    <span className="badge-glow inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-brand-gold/20 border border-brand-gold/40 text-[9px] text-brand-gold font-accent font-bold uppercase tracking-wider">
                      <Crown className="w-3 h-3" />
                      Premium Experience
                    </span>
                    <span className="badge-glow inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-brand-purple/20 border border-brand-purple/35 text-[9px] text-white font-accent font-bold uppercase tracking-wider">
                      Only 3 Students
                    </span>
                  </div>
                )}
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-brand-cyan uppercase tracking-widest font-semibold font-accent">
                  <Star className="w-3 h-3 fill-current" />
                  Course Details
                </span>
                <h3 className="text-2xl md:text-3xl font-display font-medium text-white tracking-tight">
                  {course.title}
                </h3>
                <p className="text-xs text-gray-400 font-sans">{course.subtitle}</p>
              </div>

              <button
                id="close-explore-modal-btn"
                onClick={onClose}
                className="w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center border border-white/10 hover:border-white/35 bg-white/5 hover:bg-white/10 text-white transition-all focus:outline-none"
                aria-label="Close details"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-grow">
              <div className="space-y-3">
                <h4 className="text-xs font-accent font-semibold tracking-wider text-gray-500 uppercase">
                  About This Course
                </h4>
                <p className="text-sm font-sans tracking-wide text-gray-300 leading-relaxed font-light">
                  {course.description}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-accent font-semibold tracking-wider text-gray-500 uppercase flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-brand-purple/70" />
                  What&apos;s Included
                </h4>
                <ul className="space-y-3">
                  {course.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-brand-cyan mt-0.5 flex-shrink-0" />
                      <span className="font-light">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-3 gap-3 md:gap-4 pt-4 border-t border-white/5 text-center">
                <div className="p-3 rounded-xl bg-white/2 border border-white/5">
                  <Clock className="w-4 h-4 text-brand-cyan mx-auto mb-1 opacity-70" />
                  <span className="block text-[10px] text-gray-500 font-accent uppercase tracking-widest font-semibold">
                    Duration
                  </span>
                  <span className="text-[11px] md:text-sm text-white font-medium block mt-0.5">
                    {course.duration}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white/2 border border-white/5">
                  <Users className="w-4 h-4 text-brand-cyan mx-auto mb-1 opacity-70" />
                  <span className="block text-[10px] text-gray-500 font-accent uppercase tracking-widest font-semibold">
                    Group Size
                  </span>
                  <span className="text-[11px] md:text-sm text-white font-medium block mt-0.5">
                    {course.groupSize}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white/2 border border-white/5">
                  <DollarSign className="w-4 h-4 text-brand-cyan mx-auto mb-1 opacity-70" />
                  <span className="block text-[10px] text-gray-500 font-accent uppercase tracking-widest font-semibold">
                    Investment
                  </span>
                  <span className="text-[11px] md:text-sm text-white font-bold block mt-0.5">
                    {course.price}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 border-t border-white/5 bg-brand-dark-950/80 backdrop-blur flex items-center justify-between gap-4">
              <div>
                <span className="text-[11px] text-gray-500 block font-accent tracking-wider uppercase font-semibold">
                  Total Investment
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl md:text-2xl font-bold text-white font-accent">{course.price}</span>
                  <span className="text-xs text-gray-500">{course.pricePeriod}</span>
                </div>
              </div>

              <button
                id="buy-course-modal-trigger"
                onClick={() => onBuyCourse(course)}
                className={`px-8 py-3.5 rounded-xl font-accent font-bold text-xs tracking-wider uppercase transition-all duration-300 scale-100 hover:scale-[1.03] active:scale-[0.98] cursor-pointer ${
                  isPremium
                    ? 'bg-gradient-to-r from-brand-gold to-amber-500 text-brand-dark-950 hover:shadow-[0_0_25px_rgba(226,177,60,0.4)]'
                    : 'bg-gradient-to-r from-brand-cyan to-brand-purple hover:shadow-[0_0_20px_rgba(0,242,254,0.35)] text-brand-dark-950'
                }`}
              >
                Buy Course
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
