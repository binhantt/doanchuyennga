import { defineStore } from "pinia";
import { ref } from "vue";
import { getOrders } from "../api/Api";
import { message } from "ant-design-vue";

export const useOrdersStore = defineStore("orders", () => {
  const orders = ref<any[]>([]); // You might want to define a proper Order type
  const loading = ref(false);

  const fetchOrders = async () => {
    loading.value = true;
    try {
      const res = await getOrders();
      orders.value = res.data;
      console.log("Fetched orders:", orders.value);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách đơn hàng:", err);
      message.error("Không thể tải danh sách đơn hàng");
    } finally {
      loading.value = false;
    }
  };

  return {
    orders,
    loading,
    fetchOrders,
  };
});