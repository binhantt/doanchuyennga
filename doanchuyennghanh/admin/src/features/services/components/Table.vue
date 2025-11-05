<template>

  <Table
    :columns="columns"
    :data="paginatedData"
    :loading="servicesStore.loading"
    :pagination="pagination"
    @add="() => modalStore.openModal()"
    @refresh="fetchServices"
    @change="(pagination) => handlePageChange(pagination.current, pagination.pageSize)"
  />
  <ServiceModal
    :isOpen="modalStore.isModalOpen"
    :service="modalStore.editingService.value"  
    @close="modalStore.closeModal"
    @save="handleSave"
  />
</template>

<script setup lang="ts">
import { message, Modal } from "ant-design-vue";
import Table from "../../../components/common/table/Table.vue";
import ServiceModal from "./modal.vue";
import { useModal } from "../hooks/UserModal";
import { usePagination } from "../../../hooks/usePagination";
import { computed, h, onMounted, ref, watch } from "vue";
import { useServicesStore } from "../store/Store";
import Image from "../../../components/common/bard/Image.vue";

const servicesStore = useServicesStore();
const modalStore = useModal();
servicesStore.fetchServices();

const { pagination, paginatedData, handlePageChange } = usePagination(computed(() => servicesStore.services));

watch(
  () => servicesStore.services,
  (newData) => {
    pagination.value.total = newData.length;
    if (pagination.value.current > Math.ceil(newData.length / pagination.value.pageSize)) {
      pagination.value.current = 1;
    }
  },
  { immediate: true }
);

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
    customRender: ({ record }: { record: any }) => {
      return h(
        "div",
        { class: "flex justify-center gap-2" },
        [
          h(
            "a",
            {
              class: "text-blue-500 hover:underline cursor-pointer",
              onClick: () => {
                console.log('🖱️ Edit clicked, record:', record);
                modalStore.openModal(record);
                console.log('📂 Modal store after open:', modalStore.editingService);
              }
            },
            "Sửa"
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
      )
    }
  },
];

const fetchServices = async () => {
  try {
    await servicesStore.fetchServices();
  } catch {
    message.error("Lỗi khi tải dịch vụ");
  }
};

const handleSave = async (payload: { service: any; extraData?: any }) => {
  const { service } = payload;
  console.log('handleSave - service:', service);
  
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

const handleDelete = async (id: string) => {
  console.log(id);
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
      } catch (error) {
        console.error('❌ Lỗi khi xóa dịch vụ:', error);
        message.error('Có lỗi xảy ra khi xóa dịch vụ');
      }
    },
    onCancel() {
      console.log('Hủy xóa dịch vụ');
    },
  });
};
</script>