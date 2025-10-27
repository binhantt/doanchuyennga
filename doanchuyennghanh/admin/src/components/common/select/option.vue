<template>
  <div class="option-item" :class="{ disabled: disabled }">
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  value: string | number
  label?: string
  disabled?: boolean
  icon?: string
}

defineProps<Props>()
</script>

<style scoped>
.option-item {
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.option-item:hover:not(.disabled) {
  background-color: #f3f4f6;
}

.option-item.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>