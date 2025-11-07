<template>
  <Header/>
  <Table
    :columns="columns"
    :data="paginatedData"
    :loading="packagesStore.loading"
    :pagination="pagination"
    :showPrintButton="true"
    :printButtonText="'In danh sách gói cưới'"
    @add="() => modalStore.openModal()"
    @refresh="fetchPackages"
    @change="handlePageChange"
    @print="printData"
  />
  
  <WeddingPackageModal
    :isOpen="modalStore.isModalOpen.value"
    :package="modalStore.editingPackage.value"
    @close="modalStore.closeModal"
    @save="handleSave"
  />

  <!-- Template for printing -->
  <div id="printTemplate" style="display: none;">
    <div class="text-center mb-6">
      <h1 class="text-2xl font-bold">DANH SÁCH GÓI CƯỚI</h1>
      <p class="text-gray-600 mt-2">Ngày in: {{ new Date().toLocaleDateString('vi-VN') }}</p>
    </div>
    
    <table>
      <thead>
        <tr>
          <th>STT</th>
          <th>Tên gói cưới</th>
          <th>Mô tả</th>
          <th>Giá (VNĐ)</th>
          <th>Số khách</th>
          <th>Loại địa điểm</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(pkg, index) in packagesStore.packages" :key="pkg.id">
          <td class="text-center">{{ index + 1 }}</td>
          <td>{{ pkg.name }}</td>
          <td>{{ pkg.description ? (pkg.description.length > 30 ? pkg.description.substring(0, 30) + '...' : pkg.description) : 'Không có mô tả' }}</td>
          <td class="text-center">{{ Number(pkg.price).toLocaleString('vi-VN') }}</td>
          <td class="text-center">{{ pkg.guest_count }}</td>
          <td class="text-center">{{ getVenueTypeText(pkg.venue_type) }}</td>
        </tr>
      </tbody>
    </table>
    
    <div class="mt-6 text-sm text-gray-600">
      <p>Tổng số gói cưới: {{ packagesStore.packages.length }}</p>
      <p>Tổng giá trị: {{ packagesStore.packages.reduce((sum, pkg) => sum + Number(pkg.price), 0).toLocaleString('vi-VN') }} ₫</p>
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
import Header from "./Header.vue";

const packagesStore = useWeddingPackagesStore();
const modalStore = useModal();

console.log('🏗️ WeddingPackages component initialized');
console.log('📊 Initial modal state:', modalStore.isModalOpen.value);

onMounted(async () => {
  console.log('🎯 Component mounted, fetching packages...');
  await packagesStore.fetchPackages();
  packagesData.value = packagesStore.packages;
  console.log('📦 Packages loaded:', packagesStore.packages.length);
});

const packagesData = ref(packagesStore.packages);
const { pagination, paginatedData, handlePageChange } = usePagination(packagesData);

const columns = [
  { title: "ID", dataIndex: "id", key: "id" },
  { title: "Tên gói cưới", dataIndex: "name", key: "name" },
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
      h(Image, { src: text, alt: "ảnh gói cưới", class: "w-1 h-1 rounded" })
  },
  {
    title: "Giá",
    dataIndex: "price",
    key: "price",
    customRender: ({ text }: { text: number }) =>
      text ? Number(text).toLocaleString("vi-VN") + " ₫" : "",
  },
  {
    title: "Số khách",
    dataIndex: "guest_count",
    key: "guest_count",
    customRender: ({ text }: { text: number }) => `${text} khách`,
  },
  {
    title: "Loại địa điểm",
    dataIndex: "venue_type",
    key: "venue_type",
    customRender: ({ text }: { text: string }) => getVenueTypeText(text),
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

const getVenueTypeText = (type: string) => {
  const typeMap = {
    'indoor': 'Trong nhà',
    'outdoor': 'Ngoài trời', 
    'themed': 'Theo chủ đề'
  };
  return typeMap[type as keyof typeof typeMap] || type;
};

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

// Watch modal state changes
watch(() => modalStore.isModalOpen.value, (newValue, oldValue) => {
  console.log('👀 Modal state changed:', { from: oldValue, to: newValue });
}, { immediate: true });

// Watch for data changes to update total
watch(() => packagesStore.packages, (newPackages) => {
  console.log('📊 Packages data changed, count:', newPackages.length);
  packagesData.value = newPackages;
  pagination.value.total = newPackages.length;
}, { immediate: true, deep: true });
</script>