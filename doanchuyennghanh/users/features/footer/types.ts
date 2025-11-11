export interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

export interface FooterLink {
  name: string;
  href: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  workingHours: string;
}

export interface FooterProps {
  className?: string;
}