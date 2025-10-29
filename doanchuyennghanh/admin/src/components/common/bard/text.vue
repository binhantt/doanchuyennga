<template>
  <div class="flex justify-start w-full gap-3">
    <span class="font-medium">{{ label }}:</span>
    <span>{{ value }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  value: string | number;
  label: string;
}>();
</script>

<style scoped></style>