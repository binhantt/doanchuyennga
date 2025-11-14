export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  workingHours: string;
  socialMedia: {
    facebook?: string;
    instagram?: string;
    zalo?: string;
  };
}