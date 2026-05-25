import React from 'react';
import { Mail, Phone, BookOpen, Compass, Shield, ShieldAlert } from 'lucide-react';

export default function Footer() {
  const socialIcons = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/fluency-sprint-academy/',
      color: 'hover:text-[#0077B5] hover:border-[#0077B5]/40 hover:shadow-[0_0_15px_rgba(0,119,181,0.4)]',
      svg: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/fluency.sprint?igsh=ODVqNHpzc3JhYXZ4',
      color: 'hover:text-[#E1306C] hover:border-[#E1306C]/40 hover:shadow-[0_0_15px_rgba(225,48,108,0.4)]',
      svg: (
        <svg className="w-5 h-5 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      )
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@fluency.sprint?_r=1&_t=ZS-96Zcy1J0WlY',
      color: 'hover:text-[#00f2fe] hover:border-[#00f2fe]/40 hover:shadow-[0_0_15px_rgba(0,242,254,0.4)]',
      svg: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.95 1.15 2.25 1.91 3.67 2.18.01 1.33.01 2.65 0 3.98-.95-.12-1.93-.41-2.77-1-.74-.53-1.35-1.25-1.72-2.1-.03 2.12-.01 4.24-.03 6.36C17 19.34 12.33 24 6.55 24 2.66 24-1 20.35-.95 15.11c.06-4.52 4.1-8.1 8.52-7.56v4.06c-2.45-.48-4.63 1.25-4.53 3.79.1 2.15 2.05 3.69 4.14 3.33 1.63-.28 2.68-1.57 2.67-3.21l.03-12.72c1-.04 2.02.05 2.92.35-.38.82-.93 1.53-1.63 2.07-.35-.85-.88-1.6-1.53-2.18z" />
        </svg>
      )
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/201000298588',
      color: 'hover:text-[#25D366] hover:border-[#25D366]/40 hover:shadow-[0_0_15px_rgba(37,211,102,0.4)]',
      svg: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 11.966.01c3.184.001 6.177 1.24 8.43 3.496 2.251 2.255 3.491 5.253 3.491 8.438 0 6.613-5.338 11.953-11.906 11.953-2.003-.001-3.973-.505-5.723-1.464L0 24zm6.59-3.37c1.643.975 3.25 1.488 4.793 1.49 5.393 0 9.78-4.368 9.784-9.743.003-2.602-.12-5.048-1.84-6.77C17.604 3.882 15.034 3 11.961 3c-5.397 0-9.786 4.37-9.79 9.746 0 2.028.533 4.01 1.545 5.768l-.999 3.649 3.731-.973z" />
        </svg>
      )
    }
  ];

  const handleLinkClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer
      id="main-footer"
      className="relative bg-brand-dark-950/90 border-t border-white/5 pt-20 pb-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-16">
        
        {/* Foot top layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Logo & Slogan Column */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center">
              <img
                src="/logo.jpg"
                alt="Fluency Sprint"
                className="h-14 w-14 rounded-full object-cover"
              />
            </div>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed max-w-sm font-light">
              Transforming academic barriers into global conversational confidence. Designed around practical fluency frameworks rather than outdated textbook constraints.
            </p>
          </div>

          {/* Quick Sitemap Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-accent font-semibold text-xs text-white tracking-widest uppercase">
              RESOURCES
            </h4>
            <ul className="space-y-2 text-xs text-gray-500">
              <li>
                <button 
                  onClick={() => handleLinkClick('home')}
                  className="hover:text-brand-cyan transition-colors focus:outline-none cursor-pointer"
                >
                  Home Lobby
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('about')}
                  className="hover:text-brand-cyan transition-colors focus:outline-none cursor-pointer"
                >
                  Our Philosophy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('courses')}
                  className="hover:text-brand-cyan transition-colors focus:outline-none cursor-pointer"
                >
                  Elite Syllabus
                </button>
              </li>
            </ul>
          </div>

          {/* Contacts info column */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-accent font-semibold text-xs text-white tracking-widest uppercase">
              SOCIETY COMMERCE
            </h4>
            <div className="space-y-3.5 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-cyan/70" />
                <span>Fluencysprint1@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-cyan/70" />
                <span>+20 1000298588</span>
              </div>
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-brand-cyan/70" />
                <span>Alexandria, Egypt</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Base bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-[11px] text-gray-600 font-sans tracking-wide">
            © {new Date().getFullYear()} Fluency Sprint. All absolute rights reserved.
          </div>

          {/* User Requested Glowing Socials */}
          <div className="flex items-center gap-3" id="social-glowing-btns">
            {socialIcons.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noreferrer noopener"
                className={`w-10 h-10 rounded-full border border-white/10 bg-white/2 hover:scale-105 flex items-center justify-center text-gray-400 transition-all duration-300 transform ${social.color}`}
                aria-label={social.name}
              >
                {social.svg}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
