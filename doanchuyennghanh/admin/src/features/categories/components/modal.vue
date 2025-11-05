<template>
  <BaseModal
    :isOpen="isOpen"
    :title="category ? 'Sửa danh mục' : 'Thêm danh mục'"
    @submit="handleSubmit"
    @close="Close"
    class="max-w-2xl"
  >
    <div class="space-y-4">
      <!-- Tên danh mục -->
      <BaseInput 
        label="Tên danh mục" 
        v-model="form.name" 
        class="w-full"
        required
      />
      <!-- Dropdown chọn danh mục cha -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Danh mục cha</label>
        <select 
          v-model="form.category_id" 
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="0">Không có danh mục cha</option>
          <option 
            v-for="cat in parentCategories" 
            :key="cat.id" 
            :value="cat.id"
            :disabled="cat.id === form.id"
          >
            {{ cat.name }}
          </option>
        </select>
      </div>

      <Imageupdae 
        v-model:imageUrl="form.image_url"
        @update:imageUrl="form.image_url = $event"
      />
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from "../../../components/common/modal/FormModal.vue";
import BaseInput from "../../../components/common/input/BaseInput.vue"; 
import { ref, watch } from "vue";
import type { Category } from "../index";
import Imageupdae from "./Imageupdae.vue";
const props = defineProps<{
  isOpen: boolean;
  category: Category | null;
  index?: number;// thêm index nếu muốn truyền kèm 
  parentCategories?: Category[]; // Danh sách danh mục cha (trừ danh mục hiện tại)
}>();
console.log(props.parentCategories)
const emit = defineEmits<{
  (e: "close"): void;
  (e: "save", payload: { category: Category; extraData: any }): void;
}>();

// Form reactive
const form = ref<Category>({
  id: "",
  name: "",
  image_url: "",
  category_id : 0,  
});

watch(
  [() => props.category, () => props.isOpen],
  ([newCategory, isOpen]) => {
    if (isOpen) {
      form.value = newCategory 
        ? { ...newCategory, category_id: newCategory.category_id || 0 } 
        : { id: "", name: "", image_url: "", category_id: 0 };
    }
  },
  { immediate: true }
);

// Submit dữ liệu lên parent
const handleSubmit = () => {
  if (!form.value.name.trim()) {
    alert("Vui lòng nhập tên danh mục");
    return;
  }
  
  emit("save", { 
    category: { ...form.value }, 
    extraData: { index: props.index } 
  });
};

// Close modal
const Close = () => emit("close");
</script>
