
export interface SocialLinks {
  linkedin?: string;
  github?: string;
  twitter?: string;
  instagram?: string;
  website?: string;
}

export interface UserData {
  fullName: string;
  designation: string;
  company: string;
  email: string;
  phone: string;
  tagline: string;
  profileImage: string;
  themeColor: string;
  socials: SocialLinks;
}

export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
}
