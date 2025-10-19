<script setup lang="ts">
defineProps<{
  status: "Còn hàng" | "Hết hàng";
}>();
</script>

<template>
  <span
    :class="[
      'px-3 py-1 rounded-full text-xs font-medium',
      status === 'Còn hàng'
        ? 'bg-green-100 text-green-700'
        : 'bg-red-100 text-red-700',
    ]"
  >
    {{ status }}
  </span>
</template>
