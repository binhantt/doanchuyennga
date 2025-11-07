import { ref, reactive } from 'vue';
import { message } from 'ant-design-vue';
import { useOrdersStore } from '../store/Store';
import type { Order } from '../store/Store';

export const useOrderOperations = () => {
  const ordersStore = useOrdersStore();
  
  const detailsModal = reactive({
    visible: false,
    order: null as Order | null
  });

  const orderDishes = ref<any[]>([]);
  const weddingPackagePrice = ref(0);
  const servicePrice = ref(0);

  const fetchOrders = async () => {
    try {
      await ordersStore.fetchOrders();
    } catch {
      message.error("Lỗi khi tải đơn hàng");
    }
  };

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      await ordersStore.updateOrderStatus(orderId, newStatus);
      message.success('Cập nhật trạng thái thành công!');
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const viewOrderDetails = async (order: Order) => {
    detailsModal.order = order;
    detailsModal.visible = true;
    
    // Lấy chi tiết dishes của order
    if (order.id) {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/admin/orders/${order.id}`);
        const data = await response.json();
        if (data.success) {
          orderDishes.value = data.data.dishes || [];
          
          // Lấy giá wedding package
          if (data.data.wedding_package) {
            weddingPackagePrice.value = data.data.wedding_package.price;
          }
          
          // Lấy giá service
          if (data.data.service) {
            servicePrice.value = data.data.service.price;
          }
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    }
  };

  const closeModal = () => {
    detailsModal.visible = false;
    detailsModal.order = null;
    orderDishes.value = [];
    weddingPackagePrice.value = 0;
    servicePrice.value = 0;
  };

  return {
    detailsModal,
    orderDishes,
    weddingPackagePrice,
    servicePrice,
    fetchOrders,
    handleStatusChange,
    viewOrderDetails,
    closeModal
  };
};