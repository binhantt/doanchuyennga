<template>
  <Table
    :columns="columns"
    :data="paginatedData"
    :loading="productsStore.loading"
    :show-add-button="true"
    :pagination="pagination"
    :showPrintButton="true"
    :printButtonText="'In danh sách sản phẩm'"
    @add="() => modalStore.openModal()"
    @refresh="fetchProducts"
    @change="handlePageChange"
    @print="printData"
  />
  <ProductModal
    :isOpen="modalStore.isModalOpen"
    :product="modalStore.editingProduct"
    @close="modalStore.closeModal"
    @save="handleSave"
  />

  <!-- Template for printing -->
  <div id="printTemplate" style="display: none;">
    <div class="text-center mb-6">
      <h1 class="text-2xl font-bold">DANH SÁCH SẢN PHẨM</h1>
      <p class="text-gray-600 mt-2">Ngày in: {{ new Date().toLocaleDateString('vi-VN') }}</p>
    </div>
    
    <table>
      <thead>
        <tr>
          <th>STT</th>
          <th>Tên sản phẩm</th>
          <th>Mô tả</th>
          <th>Danh mục</th>
          <th>Giá (VNĐ)</th>
          <th>Trạng thái</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in productsStore.products" :key="product.id">
          <td class="text-center">{{ index + 1 }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.description ? (product.description.length > 30 ? product.description.substring(0, 30) + '...' : product.description) : 'Không có mô tả' }}</td>
          <td>{{ product.category_name || 'Chưa phân loại' }}</td>
          <td class="text-center">{{ Number(product.price).toLocaleString('vi-VN') }}</td>
          <td class="text-center">{{ product.is_available ? 'Đang bán' : 'Hết hàng' }}</td>
        </tr>
      </tbody>
    </table>
    
    <div class="mt-6 text-sm text-gray-600">
      <p>Tổng số sản phẩm: {{ productsStore.products.length }}</p>
      <p>Tổng giá trị: {{ productsStore.products.reduce((sum, product) => sum + Number(product.price), 0).toLocaleString('vi-VN') }} ₫</p>
    </div>
  </div>
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
import TruncatedText from "../../../components/common/TruncatedText.vue";
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
  { 
    title: "Mô tả", 
    dataIndex: "description", 
    key: "description",
    customRender: ({ text }: { text: string }) => {
      const shortText = text ? (text.length > 30 ? text.substring(0, 30) + '...' : text) : 'Không có mô tả';
      return h('span', { title: text }, shortText);
    }
  },
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

// Hàm in dữ liệu
const printData = () => {
  const printContent = document.getElementById('printTemplate')?.innerHTML;
  if (!printContent) {
    message.error('Không thể tạo nội dung in');
    return;
  }

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    message.error('Không thể mở cửa sổ in');
    return;
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Danh sách sản phẩm</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; font-weight: bold; }
        .text-center { text-align: center; }
        .mb-6 { margin-bottom: 24px; }
        .mt-6 { margin-top: 24px; }
        .text-2xl { font-size: 24px; }
        .font-bold { font-weight: bold; }
        .text-gray-600 { color: #666; }
        .text-sm { font-size: 14px; }
        @media print {
          body { margin: 0; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      ${printContent}
    </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();
  
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 250);
};

// Watch for data changes to update total
watch(() => productsStore.products, (newProducts) => {
  console.log('Products data changed:', newProducts);
  productsData.value = newProducts; // Cập nhật ref
  pagination.value.total = newProducts.length;
}, { immediate: true, deep: true });

</script>