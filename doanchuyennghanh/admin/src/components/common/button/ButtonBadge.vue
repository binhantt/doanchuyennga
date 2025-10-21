<template>
  <a-badge :count="count" size="small" :offset="offset">
    <ButtonPrimary :class="'bg-white hover:!bg-gray-100 p-0'"
      :type="type"
      :loading="loading"
      :disabled="disabled"
      :block="false"
      @click="$emit('click')"
      class="!p-2"
    >
      <component v-if="icon" :is="icon" class="text-lg text-gray-600" />
    </ButtonPrimary>
  </a-badge>
</template>

<script setup lang="ts">
import ButtonPrimary from "./ButtonPrimary.vue";

const props = defineProps({
  icon: { type: Object, required: true }, // icon như BellOutlined
  count: { type: Number, default: 0 },
  offset: { type: Array, default: () => [-2, 2] },
  type: { type: String, default: "text" },
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
});

defineEmits(["click"]);
</script>
