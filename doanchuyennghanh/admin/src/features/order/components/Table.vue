<template>
  <Table
    :columns="columns"
    :data="paginatedData"
    :loading="ordersStore.loading"
    :pagination="pagination"
    @add="() => modalStore.openModal()"
    @refresh="fetchOrders"
    @change="handlePageChange"
  />
  <OrderModal
    :isOpen="modalStore.isModalOpen"
    :order="modalStore.editingOrder"
    :confirmLoading="modalStore.confirmLoading"
    @update:open="modalStore.closeModal"
    @save="handleSave"
  />
</template>

<script setup lang="ts">
import { message, Modal } from "ant-design-vue";
import Table from "../../../components/common/table/Table.vue";
import OrderModal from "./Modal.vue";
import { useOrdersStore } from "../store/Store";
import { useOrderModal } from "../hooks/UserModal";
import { h, onMounted, ref, watch } from "vue";
import { usePagination } from "../../../hooks/usePagination";
const ordersStore = useOrdersStore();
onMounted(async () => {
    await ordersStore.fetchOrders();
    ordersData.value = ordersStore.orders;
});
const modalStore = useOrderModal();
const ordersData = ref(ordersStore.orders);
const { pagination, paginatedData, handlePageChange } = usePagination(ordersData);  

const columns = [
  { title: "ID", dataIndex: "id", key: "id" },
  { title: "Ngày sự kiện", dataIndex: "eventDate", key: "eventDate" },
  { title: "Số khách", dataIndex: "guestCount", key: "guestCount" },
  { title: "Tổng tiền", dataIndex: "totalAmount", key: "totalAmount" },
  { title: "Giảm giá", dataIndex: "discountAmount", key: "discountAmount" },
  { title: "Thành tiền", dataIndex: "finalAmount", key: "finalAmount" },
  { title: "Trạng thái", dataIndex: "status", key: "status" },
  { title: "Người dùng", dataIndex: ["user", "username"], key: "username" },
  {
    title: "Thao tác",
    key: "actions",
    align: "center",
    customRender: ({ record } : { record : any }) =>
      h(
        "div",
        { class: "flex justify-center gap-2" },
        [
          h(
            "a",
            {
              class: "text-blue-500 hover:underline cursor-pointer",
              onClick: () => modalStore.openModal(record),
            },
            "Xem"
          ),
          h(
            "a",
            {
              class: "text-red-500 hover:underline cursor-pointer",
              onClick: () => handleDelete(record.id),
            },
            "Xóa"
          ),
        ]
      ),
  },
];

const fetchOrders = async () => {
  try {
    await ordersStore.fetchOrders();
  } catch {
    message.error("Lỗi khi tải đơn hàng");
  }
};

const handleDelete = async (id : any) => {
  Modal.confirm({
    title: 'Xác nhận xóa',
    content: 'Bạn có chắc chắn muốn xóa đơn hàng này không?',
    okText: 'Xóa',
    okType: 'danger',
    cancelText: 'Hủy',
    async onOk() {
      try {
        await ordersStore.deleteById(id); // Nếu có hàm xóa đơn hàng
        message.success('Xóa đơn hàng thành công!');
        // Sau khi xóa, có thể gọi lại fetchOrders để cập nhật bảng
        await fetchOrders();
      } catch (error) {
        console.error('❌ Lỗi khi xóa đơn hàng:', error);
        message.error('Có lỗi xảy ra khi xóa đơn hàng');
      }
    },
    onCancel() {
      console.log('Hủy xóa');
    },
  });
};
const handleSave = ()=>{

}
// atch for data changes to update total
watch(() => ordersStore.orders, (newOrders) => {
  console.log('Orders data changed:', newOrders);
  ordersData.value = newOrders; // Cập nhật ref
  pagination.value.total = newOrders.length;
}, { immediate: true, deep: true });

</script>
