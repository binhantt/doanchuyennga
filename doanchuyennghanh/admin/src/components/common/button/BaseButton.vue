<template>
  <a-button :type="type" :loading="loading" :disabled="disabled" :block="block" class="!" @click="$emit('click')">
    <slot />
  </a-button>
</template>

<script setup lang="ts">
defineOptions({
  name: "ButtonPrimary",
});

const props = defineProps({
  type: {
    type: String,
    default: "primary",
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  block: {
    type: Boolean,
    default: true,
  },
});

defineEmits(["click"]);
</script>