export interface SocialLink {
  name: string;
  url: string;
  alt: string;
}

export interface UserData {
  name: string;
  designation: string;
  currentDesignation: string;
  bio: string;
  resumeUrl: string;
  socialLinks: SocialLink[];
}