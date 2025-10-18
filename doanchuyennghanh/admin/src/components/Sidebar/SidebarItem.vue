<template>
  <RouterLink
    :to="item.path"
    class="flex items-center px-4 py-3 rounded-lg transition-colors duration-200"
    :class="{
      ' text-custom-blue-dark font-semibold shadow': isActive,
      'text-blue-100 hover:bg-blue-800': !isActive
    }"
    @click="onClick"
  >
    <component :is="item.icon" class="mr-3" />
    <span>{{ item.name }}</span>
  </RouterLink>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import type { SidebarItem as SidebarItemType } from "../types/Sidebar";

const props = defineProps<{
  item: SidebarItemType;
  isActive: boolean;
}>();

const emit = defineEmits(["click"]);
const onClick = () => emit("click", props.item.name);
</script>
