export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  category_id: number;
  image_url: string;
  is_available: boolean;
  created_at?: string;
  updated_at?: string;
  category_name?: string;
}

export interface ServiceListResponse {
  data: Service[];
  total?: number;
}