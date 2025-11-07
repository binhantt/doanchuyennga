<template>
  <Table
    :columns="columns"
    :data="paginatedData"
    :show-add-button="true"
    :loading="categoriesStore.loading"
    :pagination="pagination"
    @add="() => modalStore.openModal()"
    @refresh="fetchCategories"
     @change="(pagination) => handlePageChange(pagination.current, pagination.pageSize)"
  />
 <CategoryModal
  :isOpen="modalStore.isModalOpen"
  :category="modalStore.editingCategory"  
  :parentCategories="categoriesStore.categories.filter(c => c.id !== modalStore.editingCategory?.id)"
  @close="modalStore.closeModal"
  @save="handleSave"
/>
</template>
<script setup lang="ts">
import { message, Modal } from "ant-design-vue";
import Table from "../../../components/common/table/Table.vue";
import CategoryModal from "./modal.vue";
import { useModal } from "../hooks/UserModal";
import { usePagination } from "../../../hooks/usePagination";
import { computed, h, onMounted, ref, watch } from "vue";
import { useCategoriesStore } from "../store/Store";
import Image from "../../../components/common/bard/Image.vue";
const categoriesStore = useCategoriesStore();
const modalStore = useModal();
 categoriesStore.fetchCategories()
const { pagination, paginatedData, handlePageChange } = usePagination(computed(() => categoriesStore.categories));

watch(
  () => categoriesStore.categories,
  (newData) => {
    pagination.value.total = newData.length;
    if (pagination.value.current > Math.ceil(newData.length / pagination.value.pageSize)) {
      pagination.value.current = 1; // reset page nếu page hiện tại > total page
    }
  },
  { immediate: true }
);
const columns = [
  { title: "ID", dataIndex: "id", key: "id" },
  { title: "Tên danh mục", dataIndex: "name", key: "name" },
  {title : "danh muc cha" , dataIndex : "parent_name" , key :"parent_name" , 
    customRender: ({ text } : { text : string }) =>
      h('span', { class: "text-blue-500 hover:underline cursor-pointer" }, text || "không có danh mục cha")
  },
  {title : "ảnh ", dataIndex: "image_url", key: "image_url",  // Sửa từ "image" sang "image_url"
    customRender: ({ text } : { text : string }) =>
      h(Image, { src: text, alt: "ảnh", class: "w-1 h-1 rounded" })
  },
  {
    title: "Thao tác",
    key: "actions",
    align: "center",
    customRender: ({ record,  }: { record: any; }) => {
      return h(
        "div",
        { class: "flex justify-center gap-2" },
        [
          h(
            "a",
            {
              class: "text-blue-500 hover:underline cursor-pointer",
              onClick: () => {

                modalStore.openModal(record);
              }
            },
            "Sửa"
          ),
          h(
            "a",
            {
              class: "text-red-500 hover:underline cursor-pointer",
              onClick: () => handleDelete(record.id ),
            },
            "Xóa"
          ),
        ]
      )
    }
  },
];
const fetchCategories = async () => {
  try {
    await categoriesStore.fetchCategories();
  } catch {
    message.error("Lỗi khi tải danh mục");
  }
};
const handleSave = async (payload: { category: any; extraData?: any }) => {
  const { category } = payload;
  console.log('handleSave - category:', category);
  
  try {
    if (!category.id || category.id === -1 || category.id === "") {
      await categoriesStore.createCategory(category);
      message.success("Thêm danh mục thành công!");
    } else {
      await categoriesStore.updateCategory(category.id, category);
      message.success("Cập nhật danh mục thành công!");
    }
    modalStore.closeModal();
    await fetchCategories();
  } catch (error) {
    console.error(error);
    message.error("Lưu danh mục thất bại!");
  }
};

const handleDelete = async (id: string ) => {
  console.log(id)
  Modal.confirm({
    title: 'Xác nhận xóa',
    content: 'Bạn có chắc chắn muốn xóa danh mục này không?',
    okText: 'Xóa',
    okType: 'danger',
    cancelText: 'Hủy',
    async onOk() {
      try {
      
        await categoriesStore.deleteById(id);
        message.success('Xóa danh mục thành công!');
      } catch (error) {
        console.error('❌ Lỗi khi xóa danh mục:', error);
        message.error('Có lỗi xảy ra khi xóa danh mục');
      }
    },
    onCancel() {
      console.log('Hủy xóa danh mục');
    },
  });
};

</script>
