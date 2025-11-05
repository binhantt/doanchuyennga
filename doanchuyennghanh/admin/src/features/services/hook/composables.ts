import { ref } from "vue";
import type { Service } from "./types";

export const useServiceModal = () => {
  const isOpen = ref(false);
  const editingService = ref<Service | null>(null);

  const openCreateModal = () => {
    console.log("🆕 Opening create modal");
    editingService.value = null;
    isOpen.value = true;
  };

  const openEditModal = (service: Service) => {
    console.log("✏️ Opening edit modal for:", service);
    editingService.value = { ...service };
    isOpen.value = true;
  };

  const closeModal = () => {
    console.log("❌ Closing modal");
    isOpen.value = false;
    editingService.value = null;
  };

  return {
    isOpen,
    editingService,
    openCreateModal,
    openEditModal,
    closeModal,
  };
};