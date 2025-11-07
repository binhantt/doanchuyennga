<template>
  <Table
    :columns="columns"
    :data="paginatedData"
    :loading="servicesStore.loading"
    :pagination="pagination"
    @add="() => modalStore.openModal()"
    @refresh="fetchServices"
    @change="handlePageChange"
  />
  <ServiceModal
    :isOpen="modalStore.isModalOpen"
    :service="modalStore.editingService"
    :confirmLoading="modalStore.confirmLoading"
    @update:open="modalStore.closeModal"
    @save="handleSave"
  />
  <ServiceDishManagementModal
    :isOpen="dishModalStore.isModalOpen"
    :service="dishModalStore.selectedService"
    @close="dishModalStore.closeModal"
    @updated="handleDishModalUpdated"
  />
</template>

<script setup lang="ts">
import { message, Modal } from "ant-design-vue";
import Table from "../../../components/common/table/Table.vue";
import ServiceModal from "./modal.vue";
import ServiceDishManagementModal from "./ServiceDishManagementModal.vue";
import { useServicesStore } from "../store/Store";
import { useModal } from "../hooks/UserModal";
import { useServiceDishModal } from "../hooks/UseServiceDishModal";
import { h, onMounted, ref, watch } from "vue";
import { usePagination } from "../../../hooks/usePagination";
import Image from "../../../components/common/bard/Image.vue";

const servicesStore = useServicesStore();
onMounted(async () => {
    await servicesStore.fetchServices();
    servicesData.value = servicesStore.services;
});

const modalStore = useModal();
const dishModalStore = useServiceDishModal();
const servicesData = ref(servicesStore.services);
const { pagination, paginatedData, handlePageChange } = usePagination(servicesData);  

const columns = [
  { title: "ID", dataIndex: "id", key: "id" },
  { title: "Tên dịch vụ", dataIndex: "name", key: "name" },
  { title: "Mô tả", dataIndex: "description", key: "description" },
  { 
    title: "Giá", 
    dataIndex: "price", 
    key: "price",
    customRender: ({ text }: { text: number }) =>
      h('span', { class: "font-semibold text-green-600" }, 
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(text)
      )
  },
  {
    title: "Danh mục", 
    dataIndex: "category_name", 
    key: "category_name",
    customRender: ({ text }: { text: string }) =>
      h('span', { class: "text-blue-500" }, text || "Chưa phân loại")
  },
  {
    title: "Ảnh", 
    dataIndex: "image_url", 
    key: "image_url",
    customRender: ({ text }: { text: string }) =>
      h(Image, { src: text, alt: "ảnh dịch vụ", class: "w-16 h-16 rounded" })
  },
  {
    title: "Trạng thái",
    dataIndex: "is_available",
    key: "is_available",
    customRender: ({ text }: { text: boolean }) =>
      h('span', { 
        class: text ? "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs" : "bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs"
      }, text ? "Có sẵn" : "Không có sẵn")
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
              onClick: () => modalStore.openModal(record),
            },
            "Sửa"
          ),
          h(
            "a",
            {
              class: "text-green-500 hover:underline cursor-pointer ml-2",
              onClick: () => dishModalStore.openModal(record),
            },
            "Quản lý món ăn"
          ),
          h(
            "a",
            {
              class: "text-red-500 hover:underline cursor-pointer ml-2",
              onClick: () => handleDelete(record.id),
            },
            "Xóa"
          ),
        ]
      ),
  },
];

const fetchServices = async () => {
  try {
    await servicesStore.fetchServices();
  } catch {
    message.error("Lỗi khi tải dịch vụ");
  }
};

const handleSave = async (payload: { service: any }) => {
  const { service } = payload;
  
  try {
    if (!service.id || service.id === -1 || service.id === "") {
      await servicesStore.createService(service);
      message.success("Thêm dịch vụ thành công!");
    } else {
      await servicesStore.updateService(service.id, service);
      message.success("Cập nhật dịch vụ thành công!");
    }
    modalStore.closeModal();
    await fetchServices();
  } catch (error) {
    console.error(error);
    message.error("Lưu dịch vụ thất bại!");
  }
};

const handleDishModalUpdated = async () => {
  await fetchServices();
};

const handleDelete = async (id: string) => {
  Modal.confirm({
    title: 'Xác nhận xóa',
    content: 'Bạn có chắc chắn muốn xóa dịch vụ này không?',
    okText: 'Xóa',
    okType: 'danger',
    cancelText: 'Hủy',
    async onOk() {
      try {
        await servicesStore.deleteById(id);
        message.success('Xóa dịch vụ thành công!');
        await fetchServices();
      } catch (error) {
        console.error('❌ Lỗi khi xóa dịch vụ:', error);
        message.error('Có lỗi xảy ra khi xóa dịch vụ');
      }
    },
  });
};

// Watch for data changes to update total
watch(() => servicesStore.services, (newServices) => {
  console.log('Services data changed:', newServices);
  servicesData.value = newServices; // Cập nhật ref
  pagination.value.total = newServices.length;
}, { immediate: true, deep: true });
</script>