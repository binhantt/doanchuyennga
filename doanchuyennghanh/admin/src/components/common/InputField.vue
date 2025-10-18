<template>
  <div>
    <label v-if="label" class="block mb-1 text-sm font-medium text-gray-700">
      {{ label }}
    </label>

    <div class="relative">
      <!-- Icon -->
      <component
        v-if="icon"
        :is="icon"
        class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg"
      />

      <!-- Input -->
      <input
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', )"
        class="w-full border border-gray-300 rounded-lg py-2 px-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  label: String,
  icon: Object,
  type: { type: String, default: "text" },
  placeholder: String,
  modelValue: String,
});
defineEmits(["update:modelValue"]);
</script>
