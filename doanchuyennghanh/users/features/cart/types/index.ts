export interface CartItem {
  id: string;
  type: 'package' | 'service' | 'product' | 'dish';
  itemId: number;
  name: string;
  price: number;
  quantity: number;
  image_url?: string;
  description?: string;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  event_date: string;
  guest_count: number;
  event_address: string;
  notes?: string;
}

export interface OrderRequest {
  customer: CustomerInfo;
  items: CartItem[];
  total_amount: number;
  discount_amount?: number;
  final_amount: number;
  voucher_code?: string;
}

export interface OrderResponse {
  id: number;
  order_number: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  total_amount: number;
  final_amount: number;
  created_at: string;
}