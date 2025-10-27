import { defineStore } from "pinia";
import { ref } from "vue";
import type { Product } from "../index";
import { get, deleteId , update, create  } from "../api/Api";
import { message } from "ant-design-vue";

export const useProductsStore = defineStore("products", () => {
  const products = ref<Product[]>([]);
  const loading = ref(false);
  const createProduct = async (productData: any) => {
    try {
     
      const res = await create(productData);
      products.value.push(res.data);
      message.success("Tạo sản phẩm thành công");
      return res.data;
    } catch (error: any) {
      console.error("Lỗi khi tạo sản phẩm:", error);
      message.error(error.response?.data?.message || "Tạo sản phẩm thất bại");
      throw error;
    }
  };

  // 🔵 FETCH PRODUCTS
  const fetchProducts = async () => {
    loading.value = true;
    try {
      const res = await get();
      products.value = res.data;
      console.log("Fetched products:", products.value);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách sản phẩm:", err);
      message.error("Không thể tải danh sách sản phẩm");
    } finally {
      loading.value = false;
    }
  };

  const updateProduct= async (product: Product, index: number) => {
    try {
      console.log(product);
      await update(product );
      products.value[index] = product;
      
      message.success("Cập nhật sản phẩm thành công");
    } catch (err) {
      console.error("Lỗi khi cập nhật trạng thái:", err);
      message.error("Cập nhật trạng thái thất bại");
    }
  };

  // 🔴 DELETE PRODUCT
  const deleteById = async (id: string) => {
    try {
      await deleteId(id);
      products.value = products.value.filter((p) => p.id !== id);
      message.success("Xóa sản phẩm thành công");
    } catch (err) {
      console.error("Lỗi khi xóa sản phẩm:", err);
      message.error("Xóa sản phẩm thất bại");
    }
  };
  return {
    products,
    loading,
    createProduct, // Alias create to createProduct
    fetchProducts,
    updateProduct: updateProduct,
    deleteById,
  } ;
});
