<template>
  <Table
    :columns="columns"
    :data="paginatedData"
    :loading="productsStore.loading"
    :pagination="pagination"
    @add="() => modalStore.openModal()"
    @refresh="fetchProducts"
    @change="handlePageChange"
  />
  <ProductModal
    :isOpen="modalStore.isModalOpen"
    :product="modalStore.editingProduct"
    @close="modalStore.closeModal"
    @save="handleSave"
  />
</template>

<script setup lang="ts">
import { message } from "ant-design-vue";
import Table from "../../../components/common/table/Table.vue";
import ProductModal from "../components/ProductModal.vue";
import { useProductsStore } from "../store/Store";
import { useModal } from "../hooks/UserModal";
import { h, onMounted, ref, computed, watch } from "vue";
import { usePagination } from "../../../hooks/usePagination";
const productsStore = useProductsStore();

onMounted(async () => {
    console.log('Products component mounted, fetching data...');
    await productsStore.fetchProducts();
    // Cập nhật ref sau khi data được load
    productsData.value = productsStore.products;
    console.log('Products data loaded:', productsStore.products);
});
const modalStore = useModal();
// Pagination setup - sử dụng ref để đảm bảo reactivity
const productsData = ref(productsStore.products);
const { pagination, paginatedData, handlePageChange } = usePagination(productsData);

const columns = [
  { title: "ID", dataIndex: "id", key: "id" },
  { title: "Tên sản phẩm", dataIndex: "name", key: "name" },
  { title: "Mô tả", dataIndex: "description", key: "description" },
  { title: "Danh mục", dataIndex: "category_name", key: "category" },
  {
    title: "Giá",
    dataIndex: "price",
    key: "price",
    customRender: ({ text } : { text : number }) =>
      text ? Number(text).toLocaleString("vi-VN") + " ₫" : "",
  },
  {
    title: "Trạng thái",
    dataIndex: "is_available",
    key: "is_available",
    customRender: ({ text  } : { text : boolean }) =>
      text
        ? h("span", { class: "text-green-600" }, "Đang bán")
        : h("span", { class: "text-red-500" }, "Hết hàng"),
  },
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
      ),
  },
];

const fetchProducts = async () => {
  try {
    await productsStore.fetchProducts();
  } catch {
    message.error("Lỗi khi tải sản phẩm");
  }
};

const handleSave = (product : any) => {
  if (product.id) {
    const index = productsStore.products.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      productsStore.products[index] = { ...productsStore.products[index], ...product };
      console.log(product);
      message.success("Cập nhật sản phẩm thành công!");
    }
  } else {
    product.id = Date.now();
    productsStore.products.push(product);
    message.success("Thêm sản phẩm mới thành công!");
  }
  modalStore.closeModal();
};
const handleDelete = (id : any) => {
  productsStore.products = productsStore.products.filter((p) => p.id !== id);
  message.success("Đã xóa sản phẩm!");
};

// Watch for data changes to update total
watch(() => productsStore.products, (newProducts) => {
  console.log('Products data changed:', newProducts);
  productsData.value = newProducts; // Cập nhật ref
  pagination.value.total = newProducts.length;
}, { immediate: true, deep: true });

</script>
