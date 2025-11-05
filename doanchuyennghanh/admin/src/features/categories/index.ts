
export interface Category {
  id: string;
  name: string;
  image_url: string;
  category_id: number; // ID của danh mục cha (0 nếu không có)
  parent_name?: string; // Tên danh mục cha (để hiển thị)
}

export interface CategoryListResponse {
  data: Category[];
  total?: number;
}
