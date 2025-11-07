import { defineStore } from "pinia";
import { ref } from "vue";
import * as api from "../api/api";
import { message } from "ant-design-vue";

export interface Order {
  id?: number;
  user_id?: number;
  event_date: string;
  guest_count: number;
  total_amount: number;
  discount_amount: number;
  final_amount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  wedding_package_id?: number | null;
  service_id?: number | null;
  notes?: string | null;
  order_type?: 'dishes_only' | 'with_wedding_package' | 'with_service' | 'mixed';
  created_at?: string;
  updated_at?: string;
  // Thông tin join
  username?: string;
  email?: string;
  phoneNumber?: string;
  wedding_package_name?: string;
  service_name?: string;
}

export interface OrderStatistics {
  total_orders: number;
  total_revenue: number;
  average_order_value: number;
  pending_orders: number;
  confirmed_orders: number;
  completed_orders: number;
  cancelled_orders: number;
}

export const useOrdersStore = defineStore("orders", () => {
  const orders = ref<Order[]>([]);
  const loading = ref(false);
  const statistics = ref<OrderStatistics | null>(null);

  const fetchOrders = async () => {
    loading.value = true;
    try {
      const response = await api.getAll();
      orders.value = response.data || [];
      console.log("✅ Lấy danh sách đơn hàng thành công:", orders.value);
    } catch (error) {
      console.error("❌ Lỗi khi lấy danh sách đơn hàng:", error);
      message.error("Không thể tải danh sách đơn hàng");
    } finally {
      loading.value = false;
    }
  };

  const fetchStatistics = async () => {
    try {
      const response = await api.getStatistics();
      statistics.value = response.data;
      console.log("✅ Lấy thống kê thành công:", statistics.value);
    } catch (error) {
      console.error("❌ Lỗi khi lấy thống kê:", error);
      message.error("Không thể tải thống kê");
    }
  };

  const updateOrderStatus = async (id: number, status: string) => {
    loading.value = true;
    try {
      const response = await api.updateStatus(id, status);
      if (response.success) {
        // Cập nhật order trong danh sách
        const orderIndex = orders.value.findIndex(order => order.id === id);
        if (orderIndex !== -1) {
          orders.value[orderIndex].status = status as any;
        }
        message.success("Cập nhật trạng thái đơn hàng thành công!");
        return response;
      }
    } catch (error) {
      console.error("❌ Lỗi khi cập nhật trạng thái:", error);
      message.error("Có lỗi xảy ra khi cập nhật trạng thái");
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const fetchOrdersByStatus = async (status: string) => {
    loading.value = true;
    try {
      const response = await api.getByStatus(status);
      orders.value = response.data || [];
      console.log(`✅ Lấy đơn hàng theo trạng thái ${status} thành công:`, orders.value);
    } catch (error) {
      console.error("❌ Lỗi khi lấy đơn hàng theo trạng thái:", error);
      message.error("Không thể tải đơn hàng theo trạng thái");
    } finally {
      loading.value = false;
    }
  };

  const fetchOrdersByDateRange = async (startDate: string, endDate: string) => {
    loading.value = true;
    try {
      const response = await api.getByDateRange(startDate, endDate);
      orders.value = response.data || [];
      console.log("✅ Lấy đơn hàng theo khoảng thời gian thành công:", orders.value);
    } catch (error) {
      console.error("❌ Lỗi khi lấy đơn hàng theo thời gian:", error);
      message.error("Không thể tải đơn hàng theo khoảng thời gian");
    } finally {
      loading.value = false;
    }
  };

  return {
    orders,
    loading,
    statistics,
    fetchOrders,
    fetchStatistics,
    updateOrderStatus,
    fetchOrdersByStatus,
    fetchOrdersByDateRange,
  };
});