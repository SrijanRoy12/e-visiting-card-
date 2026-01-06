
import { UserData } from './types';

export const DEFAULT_USER_DATA: UserData = {
  fullName: 'Alex Sterling',
  designation: 'Principal UI/UX Designer',
  company: 'Visionary Tech Solutions',
  email: 'alex.sterling@example.com',
  phone: '+1 (555) 0123-456',
  tagline: 'Designing the future, one pixel at a time.',
  profileImage: 'https://picsum.photos/400/400?random=1',
  themeColor: '#3b82f6',
  socials: {
    linkedin: 'linkedin.com/in/alexsterling',
    github: 'github.com/alexsterling',
    twitter: 'twitter.com/alex_ux',
    instagram: 'instagram.com/alex_designs',
    website: 'alexsterling.design'
  }
};

export const PROFESSION_THEMES: Record<string, string> = {
  'Developer': '#0f172a',
  'Designer': '#ec4899',
  'Manager': '#10b981',
  'CEO': '#8b5cf6',
  'Marketing': '#f59e0b',
  'Default': '#3b82f6'
};
