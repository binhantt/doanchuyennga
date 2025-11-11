export interface WeddingPackage {
  id: number;
  name: string;
  description: string;
  price: number;
  guest_count: number;
  venue_type: 'indoor' | 'outdoor' | 'garden' | 'beach';
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  category_id: number;
  is_available: boolean;
  image_url?: string;
}

export interface PackageSelection {
  selectedPackage: WeddingPackage | null;
  selectedServices: Service[];
  totalPrice: number;
}