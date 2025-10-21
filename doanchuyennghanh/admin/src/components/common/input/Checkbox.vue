<template>
  <a-checkbox v-model:checked="modelValue">
    <slot />
  </a-checkbox>
</template>

<script setup lang="ts">
const modelValue = defineModel<boolean>();
</script>
