<template>
  <span
    :class="[
      baseClasses,
      status === ProductStatus.Published
        ? 'bg-green-100 text-green-800'
        : 'bg-gray-100 text-gray-800',
    ]"
  >
    {{ status }}
  </span>
</template>

<script setup lang="ts">
import { ProductStatus } from "../index";

defineProps<{ status: ProductStatus }>();

const baseClasses = "px-2.5 py-0.5 rounded-full text-xs font-medium";
</script>
