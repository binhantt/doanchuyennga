<template>
<FormModal
  :isOpen="isOpen"
  :title="user ? 'Sửa người dùng' : 'Thêm người dùng'"
  @submit="handleSubmit"
  @close="Close"
  class="max-w-4xl w-full"
>
  <div class="space-y-6 form-container">
    <div>
      <BaseInput 
        label="Tên người dùng" 
        v-model="form.username" 
        class="w-full"
        required
        placeholder="Nhập tên người dùng"
      />
    </div>
    <div>
      <BaseInput 
        label="Email" 
        v-model="form.email" 
        type="email"
        class="w-full"
        required
        placeholder="Nhập email"
      />
    </div>
    <div>
      <BaseInput 
        label="Số điện thoại" 
        v-model="form.phoneNumber" 
        class="w-full"
        placeholder="Nhập số điện thoại"
      />
    </div>
    <div>
      <BaseInput 
        label="Địa chỉ" 
        v-model="form.address" 
        tag="textarea" 
        class="w-full"
        placeholder="Nhập địa chỉ..."
      />
    </div>
    <div>
      <BaseInput 
        label="Mật khẩu" 
        v-model="form.password" 
        type="password"
        class="w-full"
        placeholder="Nhập mật khẩu"
      />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Vai trò</label>
      <select 
        v-model="form.role" 
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
      >
        <option value="user">Người dùng</option>
        <option value="admin">Quản trị viên</option>
      </select>
    </div>
  </div>
</FormModal>
</template>
<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import { message } from "ant-design-vue";
import { useUserModal } from "../hooks/UserModal";
import type { User } from "../index";
import BaseInput from "../../../components/common/input/BaseInput.vue";
import FormModal from "../../../components/common/modal/FormModal.vue";
useUserModal();
console.log(useUserModal().editingUser)
const props = defineProps<{
  isOpen: boolean;
  user: User | null;
}>();

console.log(props.user)
const emit = defineEmits<{
  (e: "close"): void;
  (e: "save", user: User): void;
}>();
// Form state
const form = ref<User>({
  id: "",
  username: "",
  email: "",
  phoneNumber: "",
  address: "",
  password: "",
  role: "user",
});

const emptyUser: User = {
  id: "",
  username: "",
  email: "",
  phoneNumber: "",
  address: "",
  password: "",
  role: "user",
};

const resetForm = () => {
  form.value = { ...emptyUser };
};

// Đồng bộ khi user đổi (mở sửa) hoặc null (mở tạo mới)
watch(
  () => props.user,
  (newVal) => {
    
    if (newVal) {
      form.value = {
        id: newVal.id || "",
        username: newVal.username || "",
        email: newVal.email || "",
        phoneNumber: newVal.phoneNumber || "",
        address: newVal.address || "",
        password: newVal.password || "",
        role: newVal.role || "user",
      };
    } else {
      resetForm();
    }
  },
  { immediate: true }
);

// Reset form mỗi khi đóng modal để tránh dữ liệu cũ
watch(
  () => props.isOpen,
  (isOpen) => {
    console.log(props.user)
    if (!isOpen) {
      resetForm();
    }
  }
);

// Validation function
const validateForm = (): boolean => {
  if (!String(form.value.username || '').trim()) {
    message.warning('⚠️ Vui lòng nhập tên người dùng');
    return false;
  }
  if (!String(form.value.email || '').trim()) {
    message.warning('⚠️ Vui lòng nhập email');
    return false;
  }
  if (!String(form.value.phoneNumber || '').trim()) {
    message.warning('⚠️ Vui lòng nhập số điện thoại');
    return false;
  }
  if (!String(form.value.address || '').trim()) {
    message.warning('⚠️ Vui lòng nhập địa chỉ');
    return false;
  }
  if (!String(form.value.password || '').trim() && !form.value.id) { // Password is required for new users
    message.warning('⚠️ Vui lòng nhập mật khẩu');
    return false;
  }
  return true;
};

// Gửi dữ liệu lên parent
const handleSubmit = () => {
  if (validateForm()) {
    const userData: User = {
      ...form.value,
    }
    emit("save",  userData);
  }
};

const Close = () => emit("close");

</script>
