<template>
  <BaseModal
    :isOpen="isOpen"
    :title="service ? 'Sửa dịch vụ' : 'Thêm dịch vụ'"
    @submit="handleSubmit"
    @close="handleClose"
    class="max-w-2xl"
  >
    <div class="space-y-4">
      <!-- Tên dịch vụ -->
      <BaseInput 
        label="Tên dịch vụ" 
        v-model="form.name" 
        class="w-full"
        required
      />

      <!-- Mô tả -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Mô tả</label>
        <textarea 
          v-model="form.description" 
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
          placeholder="Nhập mô tả dịch vụ..."
        ></textarea>
      </div>

      <!-- Giá -->
      <BaseInput 
        label="Giá (VND)" 
        v-model="form.price" 
        type="number"
        class="w-full"
        required
      />

      <!-- Dropdown chọn danh mục -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Danh mục</label>
        <select 
          v-model="form.category_id" 
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="0">Chọn danh mục</option>
          <option 
            v-for="category in categories" 
            :key="category.id" 
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>

      <!-- Trạng thái -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Trạng thái</label>
        <div class="flex items-center space-x-4">
          <label class="flex items-center">
            <input 
              type="radio" 
              v-model="form.is_available" 
              :value="true"
              class="mr-2"
            />
            Có sẵn
          </label>
          <label class="flex items-center">
            <input 
              type="radio" 
              v-model="form.is_available" 
              :value="false"
              class="mr-2"
            />
            Không có sẵn
          </label>
        </div>
      </div>

      <!-- Ảnh -->
      <Imageupdae 
        v-model:imageUrl="form.image_url"
        @update:imageUrl="form.image_url = $event"
      />
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, onMounted, toRaw, watchEffect } from "vue";
import BaseModal from "../../../components/common/modal/FormModal.vue";
import BaseInput from "../../../components/common/input/BaseInput.vue";
import Imageupdae from "../../categories/components/Imageupdae.vue";
import { useCategoriesStore } from "../../categories/store/Store";
import type { Service } from "../index";

// Nhận props & emit
const props = defineProps<{
  isOpen: boolean;
  service: Service | null;
  index?: number;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "save", payload: { service: Service; extraData: any }): void;
}>();

// Store categories
const categoriesStore = useCategoriesStore();
const categories = ref<any[]>([]);

// Form reactive (default)
const form = ref<Service>({
  id: "",
  name: "",
  description: "",
  price: 0,
  category_id: 0,
  image_url: "",
  is_available: true,
});

// Load danh mục khi mount
onMounted(async () => {
  await categoriesStore.fetchCategories();
  categories.value = categoriesStore.categories;
});

// Watch để cập nhật form khi mở modal
watchEffect(() => {
  if (!props.isOpen) return;
  const newService = props.service;
  console.log("watchEffect chạy", newService);

  if (newService) {
    const raw = toRaw(newService);
    console.log(raw)
    form.value = {
      id: raw.id || "",
      name: raw.name || "",
      description: raw.description || "",
      price: Number(raw.price) || 0,
      category_id: Number(raw.category_id) || 0,
      image_url: raw.image_url || "",
      is_available: raw.is_available === 1 || raw.is_available === true,
    };
  } else {
    form.value = {
      id: "",
      name: "",
      description: "",
      price: 0,
      category_id: 0,
      image_url: "",
      is_available: true,
    };
  }
});


// Submit form
const handleSubmit = () => {
  const data = form.value;

  if (!data.name.trim()) {
    alert("Vui lòng nhập tên dịch vụ");
    return;
  }

  if (!data.description.trim()) {
    alert("Vui lòng nhập mô tả dịch vụ");
    return;
  }

  if (!data.price || data.price <= 0) {
    alert("Vui lòng nhập giá hợp lệ");
    return;
  }

  if (!data.category_id || data.category_id === 0) {
    alert("Vui lòng chọn danh mục");
    return;
  }

  emit("save", {
    service: {
      ...data,
      price: Number(data.price),
      category_id: Number(data.category_id),
      is_available: !!data.is_available,
    },
    extraData: { index: props.index },
  });
};

// Đóng modal
const handleClose = () => emit("close");
</script>
