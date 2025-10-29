export const ProductStatus = {
  Published: "Đã xuất bản",
  Draft: "Bản nháp",
}

export interface Product {
  id : string;
  name:  string;
  image_url: string;
  description: string;
  is_available: boolean;
  category_name: string;
  category_id: string;
  price: string;
  status: keyof typeof ProductStatus;
}

export interface ProductListResponse {
  data: Product[];
  total?: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  phoneNumber: string;
  address: string;
}

export interface Dish {
  id: number;
  dishId: number;
  name: string;
  description: string;
  quantity: number;
  price: string;
  category: string;
  images: string[];
}

export interface Order {
  id: number;
  eventDate: string;
  guestCount: number;
  totalAmount: string;
  discountAmount: string;
  finalAmount: string;
  status: string; // You might want to define an enum for OrderStatus
  user: User;
  dishes: Dish[];
}

export interface OrderListResponse {
  message: string;
  data: Order[];
}