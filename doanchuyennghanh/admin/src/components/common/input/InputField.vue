<template>
  <div>
    <label v-if="label" class="block mb-1 text-sm font-medium text-gray-700">
      {{ label }}
    </label>
    <a-input :type="type" :placeholder="placeholder" v-model:value="inputValue" class="w-full">
      <template #prefix>
        <component v-if="icon" :is="icon" class="text-gray-400 text-lg" />
      </template>
    </a-input>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
  label: String,
  icon: Object, // truyền component icon, ví dụ: UserOutlined
  type: { type: String, default: "text" },
  placeholder: String,
  modelValue: String,
});
const emit = defineEmits(["update:modelValue"]);
const inputValue = ref(props.modelValue || "");
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal !== inputValue.value) inputValue.value = newVal || "";
  }
);
watch(inputValue, (val) => {
  emit("update:modelValue", val);
});
</script>
