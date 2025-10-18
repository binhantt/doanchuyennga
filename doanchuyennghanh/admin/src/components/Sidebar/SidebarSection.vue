<template>
  <li class="px-4 py-2 mt-4 text-xs uppercase text-blue-300 font-bold">
    {{ title }}
  </li>
</template>

<script setup lang="ts">
defineProps<{ title: string }>();
</script>
