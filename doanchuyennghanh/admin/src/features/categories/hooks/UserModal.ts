// src/features/products/hooks/UserModal.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import type { Category } from "../index";

export const useModal = defineStore("categoriesModal", () => {
  const isModalOpen = ref(false);
  const editingCategory = ref<Category | null>(null);

 const openModal = (category: Category | null = null) => {
  editingCategory.value = category ? { ...category } : null; 
  isModalOpen.value = true;
};

  const closeModal = () => {
    setTimeout(() => {
      isModalOpen.value = false;
      setTimeout(() => {
        editingCategory.value = null;
      }, 300);
    }, 0);

  };

  return {
    isModalOpen,
    editingCategory,
    openModal,
    closeModal,
  };
});
