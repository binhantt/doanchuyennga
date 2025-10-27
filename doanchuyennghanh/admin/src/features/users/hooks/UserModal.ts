
import { ref } from "vue";
import { useUserStore as useUsersStore } from "../store/store";
import type { User } from "../index";
import { defineStore } from "pinia";

export const useUserModal = defineStore("userModal", () => {
 
  const isModalOpen = ref(false);
  const editingUser = ref<User | null>(null);
  const openModal = (user?: User) => {
    editingUser.value = user || null;
    console.log('editingUser.value', editingUser.value);
    isModalOpen.value = true;
  };

  const closeModal = () => {
    isModalOpen.value = false;
    editingUser.value = null;
  };
  return {
    isModalOpen,
    editingUser,
    openModal,
    closeModal,
  };
})
