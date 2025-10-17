<template>
  <label class="flex items-center gap-2 cursor-pointer select-none">
    <input
      type="checkbox"
      v-model="modelValue"
      class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
    />
    <span><slot /></span>
  </label>
</template>

<script setup lang="ts">
const modelValue = defineModel<boolean>();
</script>
