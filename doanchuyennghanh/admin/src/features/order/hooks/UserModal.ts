
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
    setTimeout(() => {
      isModalOpen.value = false;
      setTimeout(() => {
        editingOrder.value = null;
      }, 300);
    }, 0);
    console.log("Modal closed");
  };

  return {
    isModalOpen,
    editingOrder,
    openModal,
    closeModal,
  };
});
