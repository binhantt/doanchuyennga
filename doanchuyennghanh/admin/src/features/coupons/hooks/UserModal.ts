
import { defineStore } from "pinia";
import { ref } from "vue";
import type { Voucher } from "../index";

export const useModal = defineStore("voucherModal", () => {
  const isModalOpen = ref(false);
  const editingVoucher = ref<Voucher | null>(null);

  const openModal = (voucher: Voucher | null = null) => {
    editingVoucher.value = voucher;
    isModalOpen.value = true;
  };

  const closeModal = () => {
    isModalOpen.value = false;
    setTimeout(() => {
      editingVoucher.value = null;
    }, 300);
    console.log("Modal closed");
  };

  return {
    isModalOpen,
    editingVoucher,
    openModal,
    closeModal,
  };
});
