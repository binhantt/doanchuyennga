<template>
  <td :class="['px-6 py-4', alignClass]">
    <slot />
  </td>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  align?: "left" | "center" | "right";
}>();

const alignClass = computed(() => {
  switch (props.align) {
    case "center":
      return "text-center";
    case "right":
      return "text-right";
    default:
      return "text-left";
  }
});
</script>
