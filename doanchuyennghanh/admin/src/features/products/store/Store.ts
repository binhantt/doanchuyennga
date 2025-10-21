import { defineStore } from "pinia";
import { ref } from "vue";
import type { Product } from "../index";
import { getProducts  , deleteProduct , updateProduct} from "../api/productsApi";
import { ProductStatus } from "../index";
import { message } from "ant-design-vue";

export const useProductsStore = defineStore("products", () => {
  const products = ref<Product[]>([]);
  const loading = ref(false);

  const fetchProducts = async () => {
    loading.value = true;
    try {
      const res = await getProducts();
      products.value = res.data;
      console.log("Fetched products:", products.value);
    } catch (err) {
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const updateProductStatus = (id: string, status: ProductStatus) => {
  const product = products.value.find((p) => p.id === id);
  if (!product) return;
  const formData = new FormData();
  formData.append("status", status.toString());
  updateProduct(product.id.toString(), formData)
    .then(() => {
      product.status = status;
    })
    .catch((err) => {
      console.error(err);
      message.error("Cập nhật trạng thái thất bại");
    });
};


  const deleteById = (id: string) => {
    deleteProduct(id).then(() => {
      products.value = products.value.filter((p) => p.id !== id);
    });
  };

  return {
    products,
    loading,
    fetchProducts,
    updateProductStatus,
    deleteById,
  };
});
