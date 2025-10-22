<template>
  <div class="space-y-4">
    <BaseImage
      v-model="form.image_url"
      label="Hình ảnh danh mục"
      uploadText="Tải ảnh lên"
      :show-url-input="true"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { BaseImage } from '../../../components/common/input/index';
import type { Category } from '../index';
const props = defineProps<{
  imageUrl?: string;
}>();

const emit = defineEmits<{
  'update:imageUrl': [value: string]
}>();

const form = ref({
  image_url: props.imageUrl || "",
});

watch(
  () => props.imageUrl,
  (newValue) => {
    if (newValue !== form.value.image_url) {
      form.value.image_url = newValue || "";
    }
  }
);

watch(
  () => form.value.image_url,
  (newValue) => {
    emit('update:imageUrl', newValue);
  }
);
</script>
