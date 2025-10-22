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
}>();
const emit = defineEmits<{
  (e: "close"): void;
  (e: "save", payload: { category: Category; extraData: any }): void;
}>();

// Form reactive
const form = ref<Category>({
  id: "",
  name: "",
  image_url: ""
});

watch(
  [() => props.category, () => props.isOpen],
  ([newCategory, isOpen]) => {
    if (isOpen) {
      form.value = newCategory ? { ...newCategory } : { id: "", name: "", image_url: "" };
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
