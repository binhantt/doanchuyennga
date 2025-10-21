<template>
  <a-table-cell :style="alignStyle">
    <slot />
  </a-table-cell>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  align?: "left" | "center" | "right";
}>();
const alignStyle = computed(() => ({
  textAlign: props.align || "left",
  padding: "12px 24px",
}));
</script>
