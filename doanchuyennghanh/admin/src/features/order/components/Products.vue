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
import { message, Modal } from "ant-design-vue";
import Table from "../../../components/common/table/Table.vue";
import ProductModal from "../components/ProductModal.vue";
import { useProductsStore } from "../store/Store";
import { useModal } from "../hooks/UserModal";
import { h, onMounted, ref, computed, watch } from "vue";
import { usePagination } from "../../../hooks/usePagination";
import Image from "../../../components/common/bard/Image.vue";
const productsStore = useProductsStore();
onMounted(async () => {
    await productsStore.fetchProducts();
    productsData.value = productsStore.products;
});
const modalStore = useModal();
const productsData = ref(productsStore.products);
const { pagination, paginatedData, handlePageChange } = usePagination(productsData);

const columns = [
  { title: "ID", dataIndex: "id", key: "id" },
  { title: "Tên sản phẩm", dataIndex: "name", key: "name" },
  { title: "Mô tả", dataIndex: "description", key: "description" },
  { title: "Danh mục", dataIndex: "category_name", key: "category" },

  {title : "ảnh ", dataIndex: "image_url", key: "image_url",  // Sửa từ "image" sang "image_url"
    customRender: ({ text } : { text : string }) =>
      h(Image, { src: text, alt: "ảnh", class: "w-1 h-1 rounded" })
  },
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

const handleSave = async (product : any ) => {
  try {
    if (product.id) {
      const index = productsStore.products.findIndex((p) => p.id === product.id);
      if (index !== -1) {
        await productsStore.updateProduct(product,index);
      }
    } else {
       await productsStore.createProduct(product);
    }
  } catch (error) {
    console.error('❌ Lỗi khi lưu sản phẩm:', error);
    message.error('Có lỗi xảy ra khi lưu sản phẩm');
    return; // Không đóng modal nếu có lỗi
  }
  modalStore.closeModal();
};
const handleDelete = async (id : any) => {
  Modal.confirm({
    title: 'Xác nhận xóa',
    content: 'Bạn có chắc chắn muốn xóa sản phẩm này không?',
    okText: 'Xóa',
    okType: 'danger',
    cancelText: 'Hủy',
    async onOk() {
      try {
        await productsStore.deleteById(id);
        message.success('Xóa sản phẩm thành công!');
      } catch (error) {
        console.error('❌ Lỗi khi xóa sản phẩm:', error);
        message.error('Có lỗi xảy ra khi xóa sản phẩm');
      }
    },
    onCancel() {
      console.log('Hủy xóa');
    },
  });
};

// Watch for data changes to update total
watch(() => productsStore.products, (newProducts) => {
  console.log('Products data changed:', newProducts);
  productsData.value = newProducts; // Cập nhật ref
  pagination.value.total = newProducts.length;
}, { immediate: true, deep: true });

</script>
