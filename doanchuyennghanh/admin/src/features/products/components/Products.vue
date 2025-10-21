<template>
  <Table
    :columns="columns"
    :loading="loading"
    :hasData="products.length > 0"
  >
    <ProductRow v-for="p in products" :key="p.id" :product="p" />
  </Table>
  <!-- ProductModal emit 'save' với dữ liệu form; bắt ở handleSave -->
  <ProductModal
    :key="modalStore.isModalOpen ? (modalStore.editingProduct?.id || 'new') : 'closed'"
    :isOpen="modalStore.isModalOpen"
    :product="modalStore.editingProduct"
    @close="modalStore.closeModal"
    @save="handleSave"
  />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import Table from "../../../components/common/Table.vue";
import ProductRow from "../components/ProductRow.vue";
import ProductModal from "./ProductModal.vue";
import { useProductsStore } from "../store/Store";
import { useModal } from "../hooks/UserModal";
import type { Product } from "../index";
import {updateProduct, deleteProduct} from "../api/productsApi";
const productsStore = useProductsStore();
const modalStore = useModal();
const { products, loading } = storeToRefs(productsStore);

const columns = [
  { key: "check", title: "" },
  { key: "id", title: "ID" },
  { key: "name", title: "Sản phẩm" },
  { key: "description", title: "Mô tả" },
  { key: "category", title: "Danh mục" },
  { key: "price",   title: "Giá" },
  { key: "status", title: "Trạng thái" },
  { key: "action", title: "Thao tác", align: "center" },
];

const handleSave = (product: Product ) => {
    console.log(product)
  if (product.id) {
    const index = productsStore.products.findIndex(p => p.id === product.id);
    productsStore.products[index] = {...productsStore.products[index], ...product};
  } else {
    productsStore.products.push(product);
  }
  modalStore.closeModal();
};

onMounted(() => {
  productsStore.fetchProducts();
});
</script>
