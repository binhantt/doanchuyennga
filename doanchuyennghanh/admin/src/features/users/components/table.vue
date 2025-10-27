<template>
  <Table
    :columns="columns"
    :data="paginatedData"
    :loading="usersStore.loading"
    :pagination="pagination"
    @add="() => modalStore.openModal()"
    @refresh="fetchUsers"
    @change="handlePageChange"
  />
  <UserModal
    :isOpen="modalStore.isModalOpen"
    :user="modalStore.editingUser || null"
    @close="modalStore.closeModal"
    @save="handleSave"
  />
</template>
<script setup lang="ts">
import { message, Modal } from "ant-design-vue";
import Table from "../../../components/common/table/Table.vue";
import UserModal from "../components/modal_coponet.vue";
import { useUserStore as useUsersStore } from "../store/store";
import { useUserModal as useModal } from "../hooks/UserModal";
import { h, onMounted, ref, computed, watch } from "vue";
import { usePagination } from "../../../hooks/usePagination";
import type { User } from "../index";

const usersStore = useUsersStore();
const modalStore = useModal();

const usersData = ref(usersStore.users);
const { pagination, paginatedData, handlePageChange } = usePagination(usersData);

onMounted(async () => {
  await usersStore.fetchUsers();
  usersData.value = usersStore.users;
});

const columns = [
  { title: "ID", dataIndex: "id", key: "id" },
  { title: "Tên người dùng", dataIndex: "username", key: "username" },
  { title: "Email", dataIndex: "email", key: "email" },
  { title: "Số điện thoại", dataIndex: "phoneNumber", key: "phoneNumber" },
  { title: "Địa chỉ", dataIndex: "address", key: "address" },
  { title: "Vai trò", dataIndex: "role", key: "role" },
  {
    title: "Thao tác",
    key: "actions",
    align: "center",
    customRender: ({ record }: { record: User }) => {
      // Nếu user không phải admin thì ẩn nút
      if (record.role === "admin") {
        return null;
      }

      // Nếu là Admin thì hiển thị Sửa / Xóa
      return h("div", { class: "flex justify-center gap-2" }, [
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
      ]);
    },
  },
];

const fetchUsers = async () => {
  try {
    await usersStore.fetchUsers();
  } catch {
    message.error("Lỗi khi tải người dùng");
  }
};

const handleSave = async (user: User) => {  
  try {
    if (user.id) {
      await usersStore.updateUser(user.id, user);
    } else {
      await usersStore.createUser(user);
    }
    message.success("Lưu người dùng thành công!");
    modalStore.closeModal();
  } catch (error) {
    console.error("❌ Lỗi khi lưu người dùng:", error);
    message.error("Có lỗi xảy ra khi lưu người dùng");
  }
};

const handleDelete = async (id: string) => {
  Modal.confirm({
    title: "Xác nhận xóa",
    content: "Bạn có chắc chắn muốn xóa người dùng này không?",
    okText: "Xóa",
    okType: "danger",
    cancelText: "Hủy",
    async onOk() {
      try {
        await usersStore.deleteUser(id);
        message.success("Xóa người dùng thành công!");
      } catch (error) {
        console.error("❌ Lỗi khi xóa người dùng:", error);
        message.error("Có lỗi xảy ra khi xóa người dùng");
      }
    },
  });
};
</script>