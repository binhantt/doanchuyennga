import { ref } from 'vue';
import type { Service } from '../index';

export const useModal = () => {
  const isModalOpen = ref(false);
  const editingService = ref<Service | null>(null);

  const openModal = (service?: Service) => {
    isModalOpen.value = true;
    console.log(isModalOpen)
    editingService.value = service ? { ...service } : null;

  };
   
  const closeModal = () => {
    isModalOpen.value = false;
    editingService.value = null;
  };

  return {
    isModalOpen,
    editingService,
    openModal,
    closeModal,
  };
};