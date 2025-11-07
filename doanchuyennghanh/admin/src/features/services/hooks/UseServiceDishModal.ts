import { defineStore } from "pinia";
import { ref } from "vue";

export const useServiceDishModal = defineStore("serviceDishModal", () => {
  const isModalOpen = ref(false);
  const selectedService = ref<any | null>(null);

  const openModal = (service: any | null = null) => {
    selectedService.value = service;
    isModalOpen.value = true;
  };

  const closeModal = () => {
    isModalOpen.value = false;
    console.log("Service Dish Modal closed");
    // Đặt selectedService về null sau khi modal đã đóng hoàn toàn
    setTimeout(() => {
      selectedService.value = null;
    }, 300);
  };

  return {
    isModalOpen,
    selectedService,
    openModal,
    closeModal,
  };
});
