export enum ProductStatus {
  Published = "Đã xuất bản",
  Draft = "Bản nháp",
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
  status: ProductStatus;
}

export interface ProductListResponse {
  data: Product[];
  total?: number;
}
