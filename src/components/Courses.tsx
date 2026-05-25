import React, { useState, useRef } from 'react';
import {
  Sparkles,
  ArrowRight,
  Clock,
  Award,
  Users,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Crown,
} from 'lucide-react';
import { Course } from '../types';
import { COURSES_DATA, isPremiumCourse } from '../data/coursesData';
import { motion } from 'motion/react';

export { COURSES_DATA };

interface CoursesSectionProps {
  onExploreCourse: (course: Course) => void;
}

function renderAbstractVector(seed: string) {
  if (seed === 'essential_mesh') {
    return (
      <svg viewBox="0 0 400 200" className="w-full h-full opacity-70">
        <defs>
          <linearGradient id="gradient-essential" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="100" r="70" fill="none" stroke="url(#gradient-essential)" strokeWidth="1" strokeDasharray="3,3" />
        <circle cx="200" cy="100" r="45" fill="none" stroke="url(#gradient-essential)" strokeWidth="2" />
        <circle cx="200" cy="100" r="20" fill="url(#gradient-essential)" />
      </svg>
    );
  }
  if (seed === 'professional_mesh') {
    return (
      <svg viewBox="0 0 400 200" className="w-full h-full opacity-70">
        <defs>
          <linearGradient id="gradient-professional" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00f2fe" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <path d="M 200 40 L 260 70 L 200 100 L 140 70 Z" fill="url(#gradient-professional)" opacity="0.3" />
        <path d="M 140 70 L 200 100 L 200 160 L 140 130 Z" fill="url(#gradient-professional)" opacity="0.5" />
        <path d="M 200 100 L 260 70 L 260 130 L 200 160 Z" fill="#a855f7" opacity="0.2" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full opacity-70">
      <defs>
        <linearGradient id="gradient-premium" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e2b13c" stopOpacity="1" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <g transform="translate(200, 100)">
        <polygon points="-50,-35 0,-60 50,-35 50,35 0,60 -50,35" fill="none" stroke="url(#gradient-premium)" strokeWidth="2" />
        <polygon points="-30,-21 0,-36 30,-21 30,21 0,36 -30,21" fill="none" stroke="#e2b13c" strokeWidth="1" strokeOpacity="0.5" />
        <circle cx="0" cy="0" r="12" fill="#e2b13c" className="animate-pulse" />
      </g>
    </svg>
  );
}

interface CourseCardProps {
  course: Course;
  index: number;
  onExplore: (course: Course) => void;
  variant?: 'desktop' | 'mobile';
}

function CourseCard({ course, index, onExplore, variant = 'desktop' }: CourseCardProps) {
  const isPremium = isPremiumCourse(course);
  const isProfessional = course.id === 'professional';
  const compact = variant === 'mobile';

  return (
    <motion.div
      id={`course-card-${variant}-${course.id}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`flex flex-col justify-between overflow-hidden rounded-2xl border glass-panel transition-all duration-500 relative group h-full ${
        isPremium
          ? 'border-brand-gold/40 shadow-[0_0_50px_rgba(226,177,60,0.18)] hover:border-brand-gold/80 hover:shadow-[0_0_60px_rgba(226,177,60,0.28)] premium-card-glow'
          : 'border-white/10 hover:border-brand-cyan/40 hover:shadow-[0_0_35px_rgba(0,242,254,0.15)]'
      }`}
    >
      {isPremium && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/8 via-transparent to-brand-purple/5 pointer-events-none z-0" />
          <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
            <span className="badge-glow px-3 py-1 rounded-full bg-brand-gold/25 border border-brand-gold/50 text-[9px] text-brand-gold font-accent font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Crown className="w-3 h-3" />
              Premium Experience
            </span>
            <span className="badge-glow px-3 py-1 rounded-full bg-brand-purple/20 border border-brand-purple/40 text-[9px] text-white font-accent font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-3 h-3 text-brand-gold" />
              Only 3 Students
            </span>
          </div>
        </>
      )}

      {isProfessional && !isPremium && (
        <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-brand-cyan/25 border border-brand-cyan/45 text-[10px] text-brand-cyan font-accent font-bold uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          Most Popular
        </div>
      )}

      <div className={`${compact ? 'h-40' : 'h-48'} w-full bg-black/45 border-b border-white/10 overflow-hidden flex items-center justify-center relative`}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-dark-900/90 mix-blend-multiply z-10" />
        <div
          className="absolute w-24 h-24 rounded-full filter blur-2xl opacity-25 animate-pulse-glow"
          style={{ backgroundColor: course.accentColor }}
        />
        {renderAbstractVector(course.imageSeed)}
      </div>

      <div className={`${compact ? 'p-6' : 'p-8'} flex-grow flex flex-col justify-between relative z-10`}>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <span
              className="font-accent font-semibold text-xs uppercase tracking-widest"
              style={{ color: course.accentColor }}
            >
              {course.level}
            </span>
            <h3
              className={`font-display font-bold text-white transition-colors duration-300 ${
                compact ? 'text-xl' : 'text-2xl'
              } ${isPremium ? 'text-gradient-gold' : 'group-hover:text-brand-cyan'}`}
            >
              {course.title}
            </h3>
            <p className="text-xs text-gray-400 font-sans">{course.subtitle}</p>
          </div>

          <p className="text-xs text-gray-300 font-sans leading-relaxed font-light line-clamp-2">
            {course.description}
          </p>

          <ul className="space-y-2">
            {course.features.slice(0, compact ? 3 : 4).map((feat, i) => (
              <li key={i} className="flex items-start gap-2 text-[11px] text-gray-400">
                <CheckCircle
                  className="w-3.5 h-3.5 flex-shrink-0 mt-0.5"
                  style={{ color: course.accentColor }}
                />
                <span>{feat}</span>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 py-3 border-y border-white/5 text-[11px] text-gray-400">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-brand-cyan/70" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-brand-cyan/70" />
              <span>{course.groupSize}</span>
            </div>
          </div>
        </div>

        <div className="pt-5 space-y-4">
          <div className="flex items-baseline gap-1 flex-wrap">
            <span className={`font-accent font-bold text-white tracking-tight ${compact ? 'text-2xl' : 'text-3xl'}`}>
              {course.price}
            </span>
            <span className="text-xs text-gray-500 font-sans">{course.pricePeriod}</span>
          </div>

          <button
            id={`explore-btn-${variant}-${course.id}`}
            onClick={() => onExplore(course)}
            className={`w-full py-3.5 rounded-xl font-accent font-bold text-xs tracking-wider uppercase transition-all duration-300 scale-100 hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer ${
              isPremium
                ? 'bg-gradient-to-r from-brand-gold to-amber-500 text-brand-dark-950 hover:shadow-[0_0_25px_rgba(226,177,60,0.45)]'
                : 'bg-gradient-to-r from-brand-cyan/15 to-brand-purple/15 hover:from-brand-cyan/25 hover:to-brand-purple/25 text-white border border-white/10 hover:border-brand-cyan/40 hover:shadow-[0_0_20px_rgba(0,242,254,0.2)]'
            }`}
          >
            Buy Course
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Courses({ onExploreCourse }: CoursesSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const width = scrollContainerRef.current.clientWidth - 24;
      if (width > 0) {
        const index = Math.round(scrollLeft / width);
        if (index !== currentSlide && index >= 0 && index < COURSES_DATA.length) {
          setCurrentSlide(index);
        }
      }
    }
  };

  const scrollToSlide = (index: number) => {
    if (scrollContainerRef.current) {
      const width = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollTo({ left: index * width, behavior: 'smooth' });
      setCurrentSlide(index);
    }
  };

  return (
    <section id="courses" className="relative py-24 md:py-36 overflow-hidden bg-brand-dark-950">
      <div className="absolute top-1/3 right-0 w-[450px] h-[450px] rounded-full bg-radial from-brand-purple/5 to-transparent filter blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full bg-radial from-brand-gold/5 to-transparent filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-purple/20 bg-brand-purple/5 text-xs text-brand-purple font-accent tracking-widest uppercase font-semibold">
            <Award className="w-3.5 h-3.5" />
            Four Learning Paths
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white">
            Choose Your Course
          </h2>
          <p className="text-gray-400 font-sans text-sm md:text-base font-light">
            From foundational group learning to exclusive premium coaching with only 3 students per cohort.
          </p>
        </div>

        <div className="hidden lg:grid lg:grid-cols-2 gap-8 items-stretch">
          {COURSES_DATA.map((course, index) => (
            <CourseCard
              key={course.id}
              course={course}
              index={index}
              onExplore={onExploreCourse}
              variant="desktop"
            />
          ))}
        </div>

        <div className="lg:hidden relative">
          <div className="absolute top-1/2 -left-3 -translate-y-1/2 z-30">
            <button
              onClick={() => currentSlide > 0 && scrollToSlide(currentSlide - 1)}
              className={`w-10 h-10 rounded-full border border-white/10 bg-brand-dark-900/80 flex items-center justify-center text-white transition-all ${
                currentSlide === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-100 hover:border-brand-cyan'
              }`}
              disabled={currentSlide === 0}
              aria-label="Previous course"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          <div className="absolute top-1/2 -right-3 -translate-y-1/2 z-30">
            <button
              onClick={() =>
                currentSlide < COURSES_DATA.length - 1 && scrollToSlide(currentSlide + 1)
              }
              className={`w-10 h-10 rounded-full border border-white/10 bg-brand-dark-900/80 flex items-center justify-center text-white transition-all ${
                currentSlide === COURSES_DATA.length - 1
                  ? 'opacity-30 cursor-not-allowed'
                  : 'opacity-100 hover:border-brand-cyan'
              }`}
              disabled={currentSlide === COURSES_DATA.length - 1}
              aria-label="Next course"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-6 scroll-smooth pb-6 px-1"
          >
            {COURSES_DATA.map((course, index) => (
              <div key={course.id} className="w-full flex-shrink-0 snap-center min-h-[520px]">
                <CourseCard
                  course={course}
                  index={index}
                  onExplore={onExploreCourse}
                  variant="mobile"
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-3 pt-4">
            {COURSES_DATA.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToSlide(index)}
                className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none ${
                  currentSlide === index
                    ? 'bg-gradient-to-r from-brand-cyan to-brand-purple w-6 shadow-[0_0_8px_rgba(0,242,254,0.5)]'
                    : 'bg-white/15 w-2.5'
                }`}
                aria-label={`Go to course ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
