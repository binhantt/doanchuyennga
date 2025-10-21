import { defineStore } from "pinia";
import { ref } from "vue";
import type { Product } from "../index";
import { getProducts } from "../api/productsApi";
import { ProductStatus } from "../index";

export const useProductsStore = defineStore("products", () => {
  const products = ref<Product[]>([]);
  const loading = ref(false);

  const fetchProducts = async () => {
    loading.value = true;
    try {
      const res = await getProducts();
      products.value = res.data;
    } catch (err) {
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const updateProductStatus = (id: string, status: ProductStatus) => {
    const product = products.value.find((p) => p.id === id);
    if (product) product.status = status;
  };

  const deleteById = (id: string) => {
    products.value = products.value.filter((p) => p.id !== id);
  };

  return {
    products,
    loading,
    fetchProducts,
    updateProductStatus,
    deleteById,
  };
});
