import { ref } from "vue";
import type { WeddingPackage } from "../store/Store";

export const useModal = () => {
  const isModalOpen = ref(false);
  const editingPackage = ref<WeddingPackage | null>(null);

  const openModal = (packageData?: WeddingPackage) => {
    editingPackage.value = packageData || null;
    isModalOpen.value = true;
  };

  const closeModal = () => {
    isModalOpen.value = false;
    editingPackage.value = null;
  };

  return {
    isModalOpen,
    editingPackage,
    openModal,
    closeModal,
  };
};