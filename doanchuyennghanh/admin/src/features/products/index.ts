// src/features/products/types.ts
export enum ProductStatus {
  Published = "Đã xuất bản",
  Draft = "Bản nháp",
}

export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  sku: string;
  category: string;
  stock: number;
  price: string;
  status: ProductStatus;
}

export interface ProductListResponse {
  products: Product[];
  total: number;
}
