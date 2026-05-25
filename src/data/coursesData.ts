import { Course } from '../types';

export const COURSES_DATA: Course[] = [
  {
    id: 'essential',
    title: 'Essential',
    subtitle: 'English foundations for confident beginners',
    duration: '2 Months',
    level: 'Foundations',
    price: '3,500 EGP',
    pricePeriod: '/ 2 Months',
    groupSize: '8–10 students',
    isPremium: false,
    bgGradient: 'from-brand-cyan/20 to-brand-purple/5',
    accentColor: '#00f2fe',
    imageSeed: 'essential_mesh',
    description:
      'Build a strong English foundation with vocabulary, speaking basics, and guided group practice in a supportive cohort environment.',
    topics: [
      'English foundations',
      'Vocabulary & speaking basics',
      'Group interaction practice',
    ],
    features: [
      'English foundations',
      'Vocabulary & speaking basics',
      'Group interaction practice',
      'Role plays between students under instructor supervision',
      'Group size: 8–10 students',
    ],
  },
  {
    id: 'professional',
    title: 'Professional',
    subtitle: 'Real-life communication and fluency development',
    duration: '2 Months',
    level: 'Fluency Track',
    price: '5,000 EGP',
    pricePeriod: '/ 2 Months',
    groupSize: '8–10 students',
    isPremium: false,
    bgGradient: 'from-brand-purple/20 to-brand-cyan/5',
    accentColor: '#a855f7',
    imageSeed: 'professional_mesh',
    description:
      'Advance your speaking with real-life communication training, fluency development, and structured advanced speaking exercises.',
    topics: [
      'Real-life communication training',
      'Fluency development',
      'Advanced speaking exercises',
    ],
    features: [
      'Real-life communication training',
      'Fluency development',
      'Advanced speaking exercises',
      'Role plays between students under instructor supervision',
      'Group size: 8–10 students',
    ],
  },
  {
    id: 'premium-essential',
    title: 'Premium Essential',
    subtitle: 'Intensive Essential with direct instructor coaching',
    duration: '2 Months',
    level: 'Premium Foundations',
    price: '8,000 EGP',
    pricePeriod: '/ 2 Months',
    groupSize: 'Only 3 students',
    isPremium: true,
    bgGradient: 'from-brand-gold/25 to-brand-purple/10',
    accentColor: '#e2b13c',
    imageSeed: 'premium_essential_mesh',
    description:
      'Premium version of the Essential course with intensive instructor interaction and daily personalized follow-up for faster speaking improvement.',
    topics: [
      'Everything included in Essential',
      'Daily personalized follow-up',
      'Direct speaking practice with the instructor',
    ],
    features: [
      'Everything included in Essential',
      'Daily personalized follow-up',
      'Direct speaking practice with the instructor',
      'Role plays between student and instructor',
      'Faster speaking improvement',
      'Exclusive small-group experience',
      'Limited to only 3 students',
    ],
  },
  {
    id: 'premium-professional',
    title: 'Premium Professional',
    subtitle: 'Advanced personalized coaching for elite fluency',
    duration: '2 Months',
    level: 'Premium Fluency',
    price: '8,000 EGP',
    pricePeriod: '/ 2 Months',
    groupSize: 'Only 3 students',
    isPremium: true,
    bgGradient: 'from-brand-gold/30 to-brand-cyan/10',
    accentColor: '#f59e0b',
    imageSeed: 'premium_professional_mesh',
    description:
      'Premium version of the Professional course with advanced personalized coaching and direct instructor interaction for accelerated fluency.',
    topics: [
      'Everything included in Professional',
      'Daily personalized follow-up',
      'Advanced fluency coaching',
    ],
    features: [
      'Everything included in Professional',
      'Daily personalized follow-up',
      'Direct speaking practice with the instructor',
      'Role plays between student and instructor',
      'Advanced fluency coaching',
      'Exclusive small-group experience',
      'Limited to only 3 students',
    ],
  },
];

export function isPremiumCourse(course: Course): boolean {
  return course.isPremium;
}
