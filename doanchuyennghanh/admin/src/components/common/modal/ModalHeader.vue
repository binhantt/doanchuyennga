<template>
  <div class="flex justify-between items-center pb-4 border-b">
    <h3 class="text-lg font-semibold text-gray-800">
      <slot name="title">
        {{ title }}
      </slot>
    </h3>
    <a-button type="text" shape="circle" size="small" @click="$emit('close')" class="hover:!bg-gray-100">
      <template #icon>
        <CloseOutlined class="text-gray-500 hover:text-gray-700" />
      </template>
    </a-button>
  </div>
</template>

<script setup lang="ts">
import { CloseOutlined } from "@ant-design/icons-vue";

defineProps<{
  title: string;
}>();

defineEmits<{
  (e: "close"): void;
}>();
</script>
