<template>
  <div class="w-full">
    <!-- Label -->
    <label v-if="label" class="block mb-1 text-sm font-medium text-gray-700">
      {{ label }}
    </label>

    <!-- Input / Textarea -->
    <a-input
      v-if="tag !== 'textarea'"
      v-model:value="inputValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :allow-clear="allowClear"
      :prefix="icon ? h(icon) : null"
      class="w-full"
    />

    <a-textarea
      v-else
      v-model:value="inputValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :rows="rows"
      :auto-size="{ minRows: 3, maxRows: 6 }"
      class="w-full"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, h } from "vue";
const props = defineProps({
  label: String,
  modelValue: [String, Number],
  placeholder: String,
  tag: {
    type: String,
    default: "input", // 'input' hoặc 'textarea'
  },
  icon: Object,
  disabled: {
    type: Boolean,
    default: false,
  },
  allowClear: {
    type: Boolean,
    default: true,
  },
  rows: {
    type: Number,
    default: 3,
  },
});

const emit = defineEmits(["update:modelValue"]);

const inputValue = ref(props.modelValue);

watch(
  () => props.modelValue,
  (val) => {
    inputValue.value = val;
  }
);

watch(inputValue, (val) => {
  emit("update:modelValue", val);
});
</script>
