
import { defineStore } from "pinia";
import { ref } from "vue";
import type { Product } from "../index";

export const useModal = defineStore("modal", () => {
  const isModalOpen = ref(false);
  const editingProduct = ref<Product | null>(null);

  const openModal = (product: Product | null = null) => {
    editingProduct.value = product;
    isModalOpen.value = true;
  };

  const closeModal = () => {
    setTimeout(() => {
      isModalOpen.value = false;
      setTimeout(() => {
        editingProduct.value = null;
      }, 300);
    }, 0);
    console.log("Modal closed");
  };

  return {
    isModalOpen,
    editingProduct,
    openModal,
    closeModal,
  };
});
