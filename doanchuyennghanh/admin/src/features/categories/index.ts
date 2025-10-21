
export interface Category {
  id : string;
  name:  string;
  image_url: string;
}

export interface CategoryListResponse {
  data: Category[];
  total?: number;
}
