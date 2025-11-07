import { defineStore } from "pinia";
import { ref } from "vue";

export const useModal = defineStore("serviceModal", () => {
  const isModalOpen = ref(false);
  const editingService = ref<any | null>(null);
  const confirmLoading = ref(false);

  const openModal = (service: any | null = null) => {
    editingService.value = service;
    isModalOpen.value = true;
  };

  const closeModal = () => {
    isModalOpen.value = false;
    console.log("Modal closed");
    // Đặt editingService về null sau khi modal đã đóng hoàn toàn
    setTimeout(() => {
      editingService.value = null;
    }, 300);
  };

  return {
    isModalOpen,
    editingService,
    confirmLoading,
    openModal,
    closeModal,
  };
});