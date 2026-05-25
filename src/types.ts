export type CourseId =
  | 'essential'
  | 'professional'
  | 'premium-essential'
  | 'premium-professional';

export interface Course {
  id: CourseId;
  title: string;
  subtitle: string;
  duration: string;
  level: string;
  price: string;
  pricePeriod: string;
  description: string;
  topics: string[];
  features: string[];
  groupSize: string;
  isPremium: boolean;
  bgGradient: string;
  accentColor: string;
  imageSeed: string;
}

export interface RegistrationFormData {
  fullName: string;
  email: string;
  phone: string;
  courseId: CourseId;
}

export interface WebAppConfig {
  googleSheetsUrl: string;
}
