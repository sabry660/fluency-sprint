import React from 'react';
import { Mail, Phone, MapPin, MessageSquare, ArrowRight } from 'lucide-react';

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-24 md:py-36 overflow-hidden bg-brand-dark-950/40"
    >
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] rounded-full bg-radial from-brand-cyan/5 to-transparent filter blur-[70px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24 space-y-4">
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white">
            Get in Touch
          </h2>
          <p className="text-gray-400 font-sans text-sm md:text-base font-light">
            Have questions about our courses, enrollment, or schedules? Reach out and our team will get back to you shortly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          <div className="lg:col-span-5 flex flex-col gap-4">
            <a
              href="mailto:Fluencysprint1@gmail.com"
              className="glass-panel p-5 rounded-2xl border border-white/5 bg-brand-dark-900/40 hover:border-brand-cyan/20 transition-all duration-300 shadow-lg flex items-center gap-4 group"
            >
              <div className="w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-gray-500 font-accent uppercase tracking-widest font-semibold block">
                  Email
                </span>
                <span className="text-xs text-white font-medium group-hover:text-brand-cyan transition-colors">
                  Fluencysprint1@gmail.com
                </span>
              </div>
            </a>

            <a
              href="tel:+201000298588"
              className="glass-panel p-5 rounded-2xl border border-white/5 bg-brand-dark-900/40 hover:border-brand-cyan/20 transition-all duration-300 shadow-lg flex items-center gap-4 group"
            >
              <div className="w-11 h-11 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-gray-500 font-accent uppercase tracking-widest font-semibold block">
                  Phone
                </span>
                <span className="text-xs text-white font-medium group-hover:text-brand-cyan transition-colors">
                  +20 1000298588
                </span>
              </div>
            </a>

            <div className="glass-panel p-5 rounded-2xl border border-white/5 bg-brand-dark-900/40 hover:border-brand-cyan/20 transition-all duration-300 shadow-lg flex items-center gap-4 group">
              <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-gray-500 font-accent uppercase tracking-widest font-semibold block">
                  Location
                </span>
                <span className="text-xs text-white font-medium">Alexandria, Egypt</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="glass-panel p-8 rounded-3xl border border-white/5 bg-gradient-to-br from-brand-dark-900/90 to-brand-dark-950/90 hover:border-brand-cyan/15 transition-all duration-500 shadow-2xl flex flex-col justify-between h-full relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-44 h-44 rounded-full bg-brand-cyan/5 filter blur-2xl opacity-40 pointer-events-none group-hover:bg-brand-cyan/10 transition-colors" />

              <div className="space-y-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg md:text-xl font-display font-medium text-white tracking-tight">
                    Contact Us
                  </h3>
                  <p className="text-xs text-gray-400 font-sans leading-relaxed">
                    Whether you need help choosing a course, have a question about payment, or want to learn more about Fluency Sprint — send us a message and we&apos;ll respond as soon as possible.
                  </p>
                </div>
              </div>

              <div className="pt-6 relative z-10 flex flex-col sm:flex-row gap-3">
                <a
                  id="contact-email-btn"
                  href="mailto:Fluencysprint1@gmail.com"
                  className="w-full sm:w-auto px-10 py-4 rounded-xl font-accent font-bold text-xs tracking-wider uppercase bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-cyan bg-[length:200%_auto] hover:bg-[100%_center] text-brand-dark-950 shadow-[0_0_25px_rgba(0,242,254,0.3)] hover:shadow-[0_0_40px_rgba(139,92,246,0.55)] transition-all duration-500 scale-100 hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-2.5 cursor-pointer whitespace-nowrap"
                >
                  Contact Us
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  id="contact-phone-btn"
                  href="tel:+201000298588"
                  className="w-full sm:w-auto px-10 py-4 rounded-xl font-accent font-bold text-xs tracking-wider uppercase border border-white/10 hover:border-brand-cyan/40 bg-white/5 hover:bg-brand-cyan/5 text-white transition-all duration-300 flex items-center justify-center gap-2.5"
                >
                  Call Us
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
