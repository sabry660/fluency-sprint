import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

export default function Navbar({ activeSection, setActiveSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoPreviewOpen, setLogoPreviewOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Courses', id: 'courses' },
    { label: 'Contact', id: 'contact' },
  ];

  // Clean body overflow locks when mobile menu opens/closes
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none'; // Lock touch drag behind menu for premium feel
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!logoPreviewOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLogoPreviewOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
      window.removeEventListener('keydown', onKey);
    };
  }, [logoPreviewOpen, mobileMenuOpen]);

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = id === 'home' ? 120 : 80; // slightly more breathing padding for home top
      const currentScrollY = window.scrollY || window.pageYOffset;
      const elementRectTop = element.getBoundingClientRect().top;
      const offsetPosition = elementRectTop + currentScrollY - offset;

      // Instantly start releasing page locks before starting scroll transaction
      setMobileMenuOpen(false);

      // Release body overflow immediately to enable screen scrolling mechanics
      document.body.style.overflow = '';
      document.body.style.touchAction = '';

      // Perform smooth scroll inside a microtask timeout so layout-shifts don't abort or skew scroll animation
      setTimeout(() => {
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        setActiveSection(id);
      }, 50);
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-3.5 bg-brand-dark-950/65 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
          : 'py-5 md:py-6 bg-transparent border-b border-white/0'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo and Branding */}
        <button
          id="nav-logo-btn"
          type="button"
          onClick={() => setLogoPreviewOpen(true)}
          className="flex items-center gap-3 group focus:outline-none cursor-pointer"
          aria-label="View full Fluency Sprint logo"
        >
          <img
            src="/FS.jpg"
            alt="Fluency Sprint"
            className="h-16 md:h-[4.5rem] w-16 md:w-[4.5rem] rounded-full object-cover ring-2 ring-white/10 transition-all duration-300 group-hover:opacity-90 group-hover:ring-brand-cyan/40 group-hover:shadow-[0_0_20px_rgba(0,242,254,0.25)]"
          />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-10" id="desktop-nav">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`relative py-2.5 font-accent font-medium text-[14px] tracking-wide transition-all duration-300 focus:outline-none cursor-pointer ${
                  isActive ? 'text-brand-cyan' : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.label}
                {/* Smooth Underline Hover Effect with gradient glow */}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-brand-cyan to-brand-purple transition-all duration-400 ${
                    isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full'
                  }`}
                  style={{ transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s' }}
                />
              </button>
            );
          })}
        </nav>

        {/* Mobile Navigation Trigger */}
        <button
          id="mobile-menu-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all focus:outline-none hover:border-brand-cyan/40"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-brand-cyan" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Slide-in */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="md:hidden border-b border-white/10 bg-brand-dark-950/90 backdrop-blur-3xl overflow-hidden"
          >
            <div className="px-6 py-8 space-y-4 flex flex-col">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-link-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`py-3.5 text-left font-accent font-medium text-[16px] tracking-wide border-b border-white/5 transition-all focus:outline-none ${
                      isActive 
                        ? 'text-brand-cyan pl-3 border-l-2 border-l-brand-cyan bg-brand-cyan/5' 
                        : 'text-gray-300 pl-0 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full logo preview */}
      <AnimatePresence>
        {logoPreviewOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8">
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLogoPreviewOpen(false)}
              className="absolute inset-0 bg-brand-dark-950/90 backdrop-blur-md cursor-zoom-out"
              aria-label="Close logo preview"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
              className="relative z-10 w-full max-w-lg md:max-w-2xl"
              role="dialog"
              aria-modal="true"
              aria-label="Fluency Sprint full logo"
            >
              <button
                type="button"
                onClick={() => setLogoPreviewOpen(false)}
                className="absolute -top-2 -right-2 md:top-0 md:right-0 z-20 w-10 h-10 rounded-full border border-white/15 bg-brand-dark-900/90 flex items-center justify-center text-white hover:border-brand-cyan/50 hover:text-brand-cyan transition-all"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="glass-panel rounded-2xl md:rounded-3xl border border-white/10 bg-brand-dark-900/95 p-4 md:p-6 shadow-[0_0_60px_rgba(0,242,254,0.12)]">
                <img
                  src="/FS.jpg"
                  alt="Fluency Sprint Academy — full logo"
                  className="w-full h-auto rounded-xl object-contain"
                />
                <p className="mt-4 text-center text-[10px] md:text-xs font-accent text-gray-500 uppercase tracking-widest">
                  Fluency Sprint Academy
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
