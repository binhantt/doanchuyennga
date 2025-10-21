export enum ProductStatus {
  Published = "Đã xuất bản",
  Draft = "Bản nháp",
}

export interface Product {
  id : string;
  name:  string;
  imageUrl: string;
  description: string;
  is_available: boolean;
  category_name: string;
  price: string;
  status: ProductStatus;
}

export interface ProductListResponse {
  data: Product[];
  total?: number;
}
