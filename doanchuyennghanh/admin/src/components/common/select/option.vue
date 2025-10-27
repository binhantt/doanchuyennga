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
