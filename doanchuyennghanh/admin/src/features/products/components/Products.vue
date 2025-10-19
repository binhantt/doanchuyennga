<template>
  <Table
    :columns="columns"
    :loading="loading"
    :hasData="products.length > 0"
  >
    <ProductRow v-for="p in products" :key="p.id" :product="p" />
  </Table>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Table from "../../../components/common/Table.vue";
import ProductRow from "../components/ProductRow.vue";
import type { Product } from "../types";
import { getProducts } from "../api/productsApi";

const loading = ref(true);
const products = ref<Product[]>([]);

const columns = [
  { key: "check", title: "" },
  { key: "name", title: "Sản phẩm" },
  { key: "sku", title: "Mã SKU" },
  { key: "category", title: "Danh mục" },
  { key: "stock", title: "Kho" },
  { key: "price", title: "Giá" },
  { key: "status", title: "Trạng thái" },
  { key: "action", title: "Thao tác", align: "center" },
];

// ✅ Fetch dữ liệu khi mount
onMounted(async () => {
  try {
    loading.value = true;
    products.value = await getProducts(); // lấy từ API đã chuẩn hóa
  } catch (error) {
    console.error("Lỗi khi tải sản phẩm:", error);
  } finally {
    loading.value = false;
  }
});
</script>
