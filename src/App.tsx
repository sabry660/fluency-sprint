import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Courses from './components/Courses';
import { COURSES_DATA } from './data/coursesData';
import ExploreModal from './components/ExploreModal';
import RegistrationModal from './components/RegistrationModal';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Course } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  
  // Modal visibility states
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  // Dynamic scroll handler to highlight active sections in navbar
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'courses', 'contact'];
      let currentSection = 'home';
      
      // Look for the element occupying the critical scroll line threshold (140px offset from viewport top)
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            currentSection = sectionId;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Invoke initial trace
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleExploreCourse = (course: Course) => {
    setSelectedCourse(course);
    setIsExploreOpen(true);
  };

  const handleBuyCourseDirect = (course: Course) => {
    setSelectedCourse(course);
    setIsRegisterOpen(true);
  };

  // Triggered clicking "Buy Course" inside explore modal
  const handleBuyCourse = (course: Course) => {
    setSelectedCourse(course);
    setIsExploreOpen(false); // Close details modal first
    
    // Tiny delay to allow normal spring exit animation before enter
    setTimeout(() => {
      setIsRegisterOpen(true);
    }, 200);
  };

  return (
    <div className="relative min-h-screen selection:bg-brand-cyan selection:text-brand-dark-950 font-sans antialiased text-gray-200">
      
      {/* Immersive subtle ambient backgrounds */}
      <div className="absolute top-0 left-0 right-0 h-[650px] bg-gradient-to-b from-brand-cyan/5 via-brand-purple/2 to-transparent pointer-events-none" />

      {/* Sticky Glass Navbar */}
      <Navbar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />

      {/* Main Structural Stream */}
      <main className="relative">
        
        {/* Hero Section */}
        <Hero 
          onExploreCourses={() => {
            setActiveSection('courses');
            const element = document.getElementById('courses');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }} 
        />

        {/* Philosophy / About Section */}
        <About />

        {/* Symmetrical Courses Grid */}
        <Courses onExploreCourse={handleBuyCourseDirect} />

        {/* Contact and Diagnostic booking section */}
        <Contact />

      </main>

      {/* Interactive course explorer details popup modal */}
      <ExploreModal
        course={selectedCourse}
        isOpen={isExploreOpen}
        onClose={() => setIsExploreOpen(false)}
        onBuyCourse={handleBuyCourse}
      />

      {/* Comprehensive registration checkout form modal */}
      <RegistrationModal
        course={selectedCourse}
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        availableCourses={COURSES_DATA}
      />

      {/* Primary dark footer */}
      <Footer />

    </div>
  );
}
