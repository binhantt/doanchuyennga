import { defineStore } from "pinia";
import { ref } from "vue";
import type { Voucher } from "../index";
import { get, deleteId, update, create } from "../api/Api";
import { message } from "ant-design-vue";

export const useVouchersStore = defineStore("vouchers", () => {
  const vouchers = ref<Voucher[]>([]);
  const loading = ref(false);
  
  const createVoucher = async (voucherData: any) => {
    try {
      const res = await create(voucherData);
      vouchers.value.push(res.data);
      message.success("Tạo voucher thành công");
      return res.data;
    } catch (error: any) {
      console.error("Lỗi khi tạo voucher:", error);
      message.error(error.response?.data?.message || "Tạo voucher thất bại");
      throw error;
    }
  };

  // 🔵 FETCH VOUCHERS
  const fetchVouchers = async () => {
    loading.value = true;
    try {
      const res = await get();
      vouchers.value = res.data;
      console.log("Fetched vouchers:", vouchers.value);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách voucher:", err);
      message.error("Không thể tải danh sách voucher");
    } finally {
      loading.value = false;
    }
  };

  const updateVoucher = async (voucher: Voucher, index: number) => {
    try {
      console.log(voucher);
      await update(voucher);
      vouchers.value[index] = voucher;
      
      message.success("Cập nhật voucher thành công");
    } catch (err) {
      console.error("Lỗi khi cập nhật voucher:", err);
      message.error("Cập nhật voucher thất bại");
    }
  };

  // 🔴 DELETE VOUCHER
  const deleteById = async (id: string) => {
    try {
      await deleteId(id);
      vouchers.value = vouchers.value.filter((v) => v.id !== id);
      message.success("Xóa voucher thành công");
    } catch (err) {
      console.error("Lỗi khi xóa voucher:", err);
      message.error("Xóa voucher thất bại");
    }
  };
  
  return {
    vouchers,
    loading,
    createVoucher,
    fetchVouchers,
    updateVoucher,
    deleteById,
  };
});
