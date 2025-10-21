<template>
  <a-menu mode="inline" class="bg-blue-500" >
    <a-menu-item-group>
      <template #title>
        <span class="text-xs uppercase  text-white font-semibold">
          {{ title }}
        </span>
      </template>
 
    </a-menu-item-group>
  </a-menu>
</template>

<script setup lang="ts">
defineProps<{ title: string }>();
</script>
