<template>
  <Table
    :columns="columns"
    :data="paginatedData"
    :loading="vouchersStore.loading"
    :pagination="pagination"
    @add="() => modalStore.openModal()"
    @refresh="fetchVouchers"
    @change="(pagination) => handlePageChange(pagination.current, pagination.pageSize)"
  />

  <VoucherModal
    :isOpen="modalStore.isModalOpen"
    :voucher="modalStore.editingVoucher"
    @close="modalStore.closeModal"
    @save="handleSave"
  />
</template>

<script setup lang="ts">
import { message, Modal } from "ant-design-vue";
import { h, onMounted, ref, watch } from "vue";
import Table from "../../../components/common/table/Table.vue";
import VoucherModal from "./Modal.vue";
import { useVouchersStore } from "../store/Store";
import { useModal } from "../hooks/UserModal";
import { usePagination } from "../../../hooks/usePagination"; // ✅ dùng bản đã update
import { DiscountType } from "../index";

const vouchersStore = useVouchersStore();
const modalStore = useModal();

// Dữ liệu voucher
const vouchersData = ref(vouchersStore.vouchers);

// Pagination (mỗi trang 3 dòng)
const { pagination, paginatedData, handlePageChange } = usePagination(vouchersData, 3);

// Tải dữ liệu khi vào trang
onMounted(async () => {
  await vouchersStore.fetchVouchers();
  vouchersData.value = vouchersStore.vouchers;
});

// Cập nhật khi store thay đổi
watch(
  () => vouchersStore.vouchers,
  (newVouchers) => {
    vouchersData.value = newVouchers;
    pagination.value.total = newVouchers.length;
  },
  { immediate: true, deep: true }
);

// Định dạng ngày
const formatDate = (dateString: string) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("vi-VN");
};

// Cột bảng
const columns = [
  { title: "ID", dataIndex: "id", key: "id", width: 60 },
  { title: "Mã voucher", dataIndex: "code", key: "code" },
  { title: "Mô tả", dataIndex: "description", key: "description" },
  {
    title: "Loại giảm giá",
    dataIndex: "discount_type",
    key: "discount_type",
    customRender: ({ text }: { text: string }) =>
      text === DiscountType.Percent ? "Phần trăm (%)" : "Số tiền cố định (VNĐ)",
  },
  {
    title: "Giá trị giảm",
    dataIndex: "discount_value",
    key: "discount_value",
    customRender: ({ text, record }: { text: number; record: any }) =>
      record.discount_type === DiscountType.Percent
        ? `${text}%`
        : `${Number(text).toLocaleString("vi-VN")} ₫`,
  },
  {
    title: "Đơn hàng tối thiểu",
    dataIndex: "min_order_amount",
    key: "min_order_amount",
    customRender: ({ text }: { text: number }) =>
      `${Number(text).toLocaleString("vi-VN")} ₫`,
  },
  {
    title: "Hiệu lực",
    key: "validity",
    customRender: ({ record }: { record: any }) =>
      `${formatDate(record.valid_from)} - ${formatDate(record.valid_to)}`,
  },
  {
    title: "Trạng thái",
    dataIndex: "is_active",
    key: "is_active",
    customRender: ({ text }: { text: boolean | number }) =>
      text === true || text === 1
        ? h("span", { class: "text-green-600" }, "Đang hoạt động")
        : h("span", { class: "text-red-500" }, "Không hoạt động"),
  },
  {
    title: "Thao tác",
    key: "actions",
    align: "center",
    customRender: ({ record }: { record: any }) =>
      h("div", { class: "flex justify-center gap-2" }, [
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
      ]),
  },
];

// Hàm tải lại
const fetchVouchers = async () => {
  try {
    await vouchersStore.fetchVouchers();
  } catch {
    message.error("Lỗi khi tải vouchers");
  }
};

// Lưu voucher
const handleSave = async (voucher: any) => {
  try {
    if (voucher.id) {
      const index = vouchersStore.vouchers.findIndex((v) => v.id === voucher.id);
      if (index !== -1) {
        await vouchersStore.updateVoucher(voucher, index);
      }
    } else {
      await vouchersStore.createVoucher(voucher);
    }
    modalStore.closeModal();
  } catch (error) {
    console.error("❌ Lỗi khi lưu voucher:", error);
    message.error("Có lỗi xảy ra khi lưu voucher");
  }
};

// Xóa voucher
const handleDelete = async (id: any) => {
  Modal.confirm({
    title: "Xác nhận xóa",
    content: "Bạn có chắc chắn muốn xóa voucher này không?",
    okText: "Xóa",
    okType: "danger",
    cancelText: "Hủy",
    async onOk() {
      try {
        await vouchersStore.deleteById(id);
        message.success("Xóa voucher thành công!");
      } catch (error) {
        console.error("❌ Lỗi khi xóa voucher:", error);
        message.error("Có lỗi xảy ra khi xóa voucher");
      }
    },
  });
};
</script>
