<template>
  <a-button
    type="primary"
    :disabled="disabled"
    :loading="loading"
    class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 disabled:opacity-50"
    @click="$emit('click')"
  >
    <slot />
  </a-button>
</template>

<script setup lang="ts">
defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
defineEmits(["click"]);
</script>