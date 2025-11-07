<template>
  <div>
    <!-- Nút in dữ liệu -->
    <div class="mb-4 flex justify-end">
      <button 
        @click="printData" 
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a1 1 0 001-1v-4a1 1 0 00-1-1H9a1 1 0 00-1 1v4a1 1 0 001 1zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
        </svg>
        In danh sách gói cưới
      </button>
    </div>

    <Table
      :columns="columns"
      :data="paginatedData"
      :loading="packagesStore.loading"
      :pagination="pagination"
      @add="() => modalStore.openModal()"
      @refresh="fetchPackages"
      @change="handlePageChange"
    />
    
    <WeddingPackageModal
      :isOpen="modalStore.isModalOpen"
      :package="modalStore.editingPackage"
      @close="modalStore.closeModal"
      @save="handleSave"
    />

    <!-- Template in ẩn -->
    <div id="printTemplate" class="hidden">
      <div class="print-content">
        <div class="text-center mb-6">
          <h1 class="text-2xl font-bold">DANH SÁCH GÓI CƯỚI</h1>
          <p class="text-gray-600">Ngày in: {{ new Date().toLocaleDateString('vi-VN') }}</p>
        </div>
        
        <table class="w-full border-collapse border border-gray-300">
          <thead>
            <tr class="bg-gray-100">
              <th class="border border-gray-300 px-4 py-2 text-left">STT</th>
              <th class="border border-gray-300 px-4 py-2 text-left">Tên gói</th>
              <th class="border border-gray-300 px-4 py-2 text-left">Mô tả</th>
              <th class="border border-gray-300 px-4 py-2 text-left">Giá</th>
              <th class="border border-gray-300 px-4 py-2 text-left">Thời gian</th>
              <th class="border border-gray-300 px-4 py-2 text-left">Số khách</th>
              <th class="border border-gray-300 px-4 py-2 text-left">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(pkg, index) in packagesStore.packages" :key="pkg.id">
              <td class="border border-gray-300 px-4 py-2">{{ index + 1 }}</td>
              <td class="border border-gray-300 px-4 py-2">{{ pkg.name }}</td>
              <td class="border border-gray-300 px-4 py-2">{{ pkg.description || 'Không có mô tả' }}</td>
              <td class="border border-gray-300 px-4 py-2">{{ pkg.price ? Number(pkg.price).toLocaleString('vi-VN') + ' ₫' : '' }}</td>
              <td class="border border-gray-300 px-4 py-2">{{ pkg.duration_hours }} giờ</td>
              <td class="border border-gray-300 px-4 py-2">{{ pkg.max_guests }} khách</td>
              <td class="border border-gray-300 px-4 py-2">{{ pkg.is_available ? 'Có sẵn' : 'Không có sẵn' }}</td>
            </tr>
          </tbody>
        </table>
        
        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600">Tổng số gói cưới: {{ packagesStore.packages.length }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { message, Modal } from "ant-design-vue";
import Table from "../../../components/common/table/Table.vue";
import WeddingPackageModal from "./WeddingPackageModal.vue";
import { useWeddingPackagesStore } from "../store/Store";
import { useModal } from "../hooks/UserModal";
import { h, onMounted, ref, watch } from "vue";
import { usePagination } from "../../../hooks/usePagination";
import Image from "../../../components/common/bard/Image.vue";

const packagesStore = useWeddingPackagesStore();

onMounted(async () => {
  await packagesStore.fetchPackages();
  packagesData.value = packagesStore.packages;
});

const modalStore = useModal();
const packagesData = ref(packagesStore.packages);
const { pagination, paginatedData, handlePageChange } = usePagination(packagesData);

const columns = [
  { title: "ID", dataIndex: "id", key: "id" },
  { title: "Tên gói", dataIndex: "name", key: "name" },
  { 
    title: "Mô tả", 
    dataIndex: "description", 
    key: "description",
    customRender: ({ text }: { text: string }) => {
      const shortText = text ? (text.length > 30 ? text.substring(0, 30) + '...' : text) : 'Không có mô tả';
      return h('span', { title: text }, shortText);
    }
  },
  {
    title: "Ảnh", 
    dataIndex: "image_url", 
    key: "image_url",
    customRender: ({ text }: { text: string }) =>
      h(Image, { src: text, alt: "ảnh gói cưới", class: "w-16 h-16 rounded" })
  },
  {
    title: "Giá",
    dataIndex: "price",
    key: "price",
    customRender: ({ text }: { text: number }) =>
      text ? Number(text).toLocaleString("vi-VN") + " ₫" : "",
  },
  {
    title: "Thời gian",
    dataIndex: "duration_hours",
    key: "duration_hours",
    customRender: ({ text }: { text: number }) => `${text} giờ`,
  },
  {
    title: "Số khách tối đa",
    dataIndex: "max_guests",
    key: "max_guests",
    customRender: ({ text }: { text: number }) => `${text} khách`,
  },
  {
    title: "Trạng thái",
    dataIndex: "is_available",
    key: "is_available",
    customRender: ({ text }: { text: boolean }) =>
      text
        ? h("span", { class: "text-green-600" }, "Có sẵn")
        : h("span", { class: "text-red-500" }, "Không có sẵn"),
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
              class: "text-red-500 hover:underline cursor-pointer",
              onClick: () => handleDelete(record.id),
            },
            "Xóa"
          ),
        ]
      ),
  },
];

const fetchPackages = async () => {
  try {
    await packagesStore.fetchPackages();
  } catch {
    message.error("Lỗi khi tải gói cưới");
  }
};

const handleSave = async (packageData: any) => {
  try {
    if (packageData.id) {
      const index = packagesStore.packages.findIndex((p) => p.id === packageData.id);
      if (index !== -1) {
        await packagesStore.updatePackage(packageData, index);
      }
    } else {
      await packagesStore.createPackage(packageData);
    }
  } catch (error) {
    console.error('❌ Lỗi khi lưu gói cưới:', error);
    message.error('Có lỗi xảy ra khi lưu gói cưới');
    return;
  }
  modalStore.closeModal();
};

const handleDelete = async (id: any) => {
  Modal.confirm({
    title: 'Xác nhận xóa',
    content: 'Bạn có chắc chắn muốn xóa gói cưới này không?',
    okText: 'Xóa',
    okType: 'danger',
    cancelText: 'Hủy',
    async onOk() {
      try {
        await packagesStore.deleteById(id);
        message.success('Xóa gói cưới thành công!');
      } catch (error) {
        console.error('❌ Lỗi khi xóa gói cưới:', error);
        message.error('Có lỗi xảy ra khi xóa gói cưới');
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
      <title>Danh sách gói cưới</title>
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
watch(() => packagesStore.packages, (newPackages) => {
  console.log('Wedding packages data changed:', newPackages);
  packagesData.value = newPackages;
  pagination.value.total = newPackages.length;
}, { immediate: true, deep: true });
</script>