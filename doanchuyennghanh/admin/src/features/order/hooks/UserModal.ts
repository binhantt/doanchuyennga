
import { defineStore } from "pinia";
import { ref } from "vue";
import type { Order } from "../index";

export const useOrderModal = defineStore("orderModal", () => {
  const isModalOpen = ref(false);
  const editingOrder = ref<Order | null>(null);

  const openModal = (order: Order | null = null) => {
    editingOrder.value = order;
    isModalOpen.value = true;
  };

  const closeModal = () => {
    isModalOpen.value = false;
    console.log("Modal closed");
    // Đặt editingOrder về null sau khi modal đã đóng hoàn toàn
    setTimeout(() => {
      editingOrder.value = null;
    }, 300);
  };

  return {
    isModalOpen,
    editingOrder,
    openModal,
    closeModal,
  };
});
