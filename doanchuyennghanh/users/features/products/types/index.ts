export interface Product {
  id: number;
  name: string;
  description: string;
  price: number | string;
  image_url?: string;
  category_id?: number;
  category_name?: string;
  is_available: boolean | number;
  created_at?: string;
  updated_at?: string;
}

export interface ProductCategory {
  id: number;
  name: string;
  description?: string;
}