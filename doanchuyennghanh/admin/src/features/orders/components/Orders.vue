<template>
  <Table
    :columns="columns"
    :data="paginatedData"
    :loading="ordersStore.loading"
    :pagination="pagination"
    :show-add-button="false"
    @refresh="fetchOrders"
    @change="(paginationEvent) => handlePageChange(paginationEvent.current, paginationEvent.pageSize)"
  />

  <OrderDetailsModal
    :visible="detailsModal.visible"
    :order="detailsModal.order"
    :order-dishes="orderDishes"
    :wedding-package-price="weddingPackagePrice"
    :service-price="servicePrice"
    :print-loading="printLoading"
    @change="(pagination) => handlePageChange(pagination.current, pagination.pageSize)"

    @close="closeModal"
    @print="handlePrint"
  />

  <PrintTemplate
    :order="detailsModal.order"
    :order-dishes="orderDishes"
    :wedding-package-price="weddingPackagePrice"
    :service-price="servicePrice"
  />
</template>

<script setup lang="ts">
import { h, onMounted, ref, watch } from "vue";
import { Tag } from "ant-design-vue";
import Table from "../../../components/common/table/Table.vue";
import OrderDetailsModal from "./OrderDetailsModal.vue";
import PrintTemplate from "./PrintTemplate.vue";
import { useOrdersStore } from "../store/Store";
import { usePagination } from "../../../hooks/usePagination";
import { useOrderOperations } from "../composables/useOrderOperations";
import { usePrint } from "../composables/usePrint";
import { formatCurrency, formatDate, getStatusColor, getStatusText, getNextStatus } from "../utils/orderUtils";

const ordersStore = useOrdersStore();

onMounted(async () => {
  await ordersStore.fetchOrders();
  ordersData.value = ordersStore.orders;
});

const ordersData = ref(ordersStore.orders);
const { pagination, paginatedData, handlePageChange } = usePagination(ordersData);

const {
  detailsModal,
  orderDishes,
  weddingPackagePrice,
  servicePrice,
  fetchOrders,
  handleStatusChange,
  viewOrderDetails,
  closeModal
} = useOrderOperations();

const { printLoading, printOrderDetails } = usePrint();

const columns = [
  { title: "ID", dataIndex: "id", key: "id" },
  { title: "Khách hàng", dataIndex: "username", key: "username" },
  {
    title: "Ngày tổ chức",
    dataIndex: "event_date",
    key: "event_date",
    customRender: ({ text }: { text: string }) => formatDate(text)
  },
  {
    title: "Thành tiền",
    dataIndex: "final_amount",
    key: "final_amount",
    customRender: ({ text }: { text: number }) =>
      text ? Number(text).toLocaleString("vi-VN") + " ₫" : "",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    customRender: ({ text }: { text: string }) =>
      h(Tag, { color: getStatusColor(text) }, () => getStatusText(text))
  },
  {
    title: "Thao tác",
    key: "actions",
    align: "center",
    customRender: ({ record }: { record: any }) =>
      h(
        "div",
        { class: "flex justify-center gap-2" },
        [
          h(
            "a",
            {
              class: "text-blue-500 hover:underline cursor-pointer",
              onClick: () => viewOrderDetails(record),
            },
            "Xem chi tiết"
          ),
          h(
            "a",
            {
              class: "text-green-500 hover:underline cursor-pointer",
              onClick: () => handleStatusChange(record.id, getNextStatus(record.status)),
            },
            "Cập nhật"
          ),
        ]
      ),
  },
];

const handlePrint = () => {
  printOrderDetails(detailsModal.order);
};
// Watch for data changes to update total
watch(() => ordersStore.orders, (newOrders) => {
  console.log('Orders data changed:', newOrders);
  ordersData.value = newOrders;
  pagination.value.total = newOrders.length;
}, { immediate: true, deep: true });
</script>