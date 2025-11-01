export enum DiscountType {
  Percent = "percent",
  Amount = "amount"
}

export interface Voucher {
  id?: number | string;
  code: string;
  description: string;
  discount_type: DiscountType;
  discount_value: number;
  min_order_amount: number;
  max_uses: number;
  used_count?: number;
  valid_from: string;
  valid_to: string;
  is_active: boolean;
}export enum DiscountType {
  Percent = "percent",
  Amount = "amount"
}

export interface Voucher {
  id?: number | string;
  code: string;
  description: string;
  discount_type: DiscountType;
  discount_value: number;
  min_order_amount: number;
  max_uses: number;
  used_count?: number;
  valid_from: string;
  valid_to: string;
  is_active: boolean;
}export const ProductStatus = {
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
  price: number;
  status: keyof typeof ProductStatus;
}

export interface ProductListResponse {
  data: Product[];
  total?: number;
}
