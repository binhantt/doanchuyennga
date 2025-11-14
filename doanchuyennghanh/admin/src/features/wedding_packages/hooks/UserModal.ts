import { ref } from "vue";
import type { WeddingPackage } from "../store/Store";

export const useModal = () => {
  const isModalOpen = ref(false);
  const editingPackage = ref<WeddingPackage | null>(null);

  console.log('🔧 Modal hook initialized, isOpen:', isModalOpen.value);

  const openModal = (packageData?: WeddingPackage) => {
    console.log('🚀 Opening modal with data:', packageData);
    console.log('📍 Call stack:', new Error().stack);
    editingPackage.value = packageData || null;
    isModalOpen.value = true;
    console.log('✅ Modal opened, isOpen:', isModalOpen.value);
  };

  const closeModal = () => {
    console.log('❌ Closing modal');
    isModalOpen.value = false;
    editingPackage.value = null;
    console.log('✅ Modal closed, isOpen:', isModalOpen.value);
  };

  return {
    isModalOpen,
    editingPackage,
    openModal,
    closeModal,
  };
};