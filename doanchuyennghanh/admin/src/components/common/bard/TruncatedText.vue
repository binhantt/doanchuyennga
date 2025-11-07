<template>
  <div class="relative">
    <p :class="textClass">
      {{ isExpanded ? text : truncatedText }}
      <span 
        v-if="shouldShowToggle" 
        @click="toggleExpanded"
        class="text-blue-500 hover:text-blue-700 cursor-pointer ml-1 font-medium"
      >
        {{ isExpanded ? 'Thu gọn' : 'Xem thêm' }}
      </span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Props {
  text: string;
  maxLength?: number;
  textClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  maxLength: 100,
  textClass: 'text-sm text-gray-600'
});

const isExpanded = ref(false);

const truncatedText = computed(() => {
  if (props.text.length <= props.maxLength) {
    return props.text;
  }
  return props.text.substring(0, props.maxLength) + '...';
});

const shouldShowToggle = computed(() => {
  return props.text.length > props.maxLength;
});

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value;
};
</script>