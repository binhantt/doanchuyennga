<template>
  <Table
    :columns="columns"
    :data="paginatedData"
    :loading="categoriesStore.loading"
    :pagination="pagination"
    @add="() => modalStore.openModal()"
    @refresh="fetchCategories"
    @change="handlePageChange"
  />
 <CategoryModal
  :isOpen="modalStore.isModalOpen"
  :category="modalStore.editingCategory"  
  @close="modalStore.closeModal"
  @save="handleSave"
/>
</template>
<script setup lang="ts">
import { message } from "ant-design-vue";
import Table from "../../../components/common/table/Table.vue";
import CategoryModal from "./modal.vue";
import { useModal } from "../hooks/UserModal";
import { usePagination } from "../../../hooks/usePagination";
import { h, onMounted, ref, watch } from "vue";
import { useCategoriesStore } from "../store/Store";
const categoriesStore = useCategoriesStore();
const modalStore = useModal();
const categoriesData = ref(categoriesStore.categories);
const { pagination, paginatedData, handlePageChange } = usePagination(categoriesData);
onMounted(async () => {
    await categoriesStore.fetchCategories();
    categoriesData.value = categoriesStore.categories;
});
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
  {title : "ảnh ", dataIndex: "image_url", key: "image_url",  // Sửa từ "image" sang "image_url"
    customRender: ({ text } : { text : string }) =>
      h("img", { src: text, alt: "ảnh", class: "w-12 h-12 rounded" })
  },
  {
    title: "Thao tác",
    key: "actions",
    align: "center",
    customRender: ({ record } : { record : any }) => {
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
              onClick: () => handleDelete(record.id),
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

const handleSave = async (category : any , index : number) => {
  if (index !== undefined) {
    if (category.id !== -1) {
      await categoriesStore.updateCategory(category.id, category);
      message.success("Cập nhật danh mục thành công!");
    }
  } else {
    // Thêm mới trên server
    await categoriesStore.createCategory(category);
    message.success("Thêm danh mục mới thành công!");
  }
  modalStore.closeModal();
};

const handleDelete = async (id : any) => {

  await categoriesStore.deleteById(id);
  message.success("Đã xóa danh mục!");
};

</script>
