<template>
  <a-sub-menu v-if="item.children" :key="item.name" class="text-white hover:text-white" popupClassName="submenu-popup-scroll">
    <template #title>
      <div class="flex items-center w-full px-4 py-2">
        <component :is="item.icon" class="mr-3 text-white" />
        <span class="text-white">{{ item.name }}</span>
      </div>  
    </template>
    <a-menu-item v-for="child in item.children" :key="child.name" @click="onClick(child)" class="text-white">
      <RouterLink :to="child.path" class="flex text-white items-center w-full px-4 py-2">
        <component :is="child.icon" class="mr-3" />
        <span class="e hover:text-blue-500">{{ child.name }}</span>
      </RouterLink>
    </a-menu-item>
  </a-sub-menu> 
  <a-menu-item v-else :key="item.name || item.title" @click="onClick(item)" class="text-white hover:text-blue-500">
    <RouterLink
      :to="item.path"
      class="flex text-white items-center w-full px-4 py-2 focus:text-blue-500"
    >
      <component :is="item.icon" class="mr-3" />
      <span class="hover:text-blue-500 group-hover:text-blue-500 " >{{ item.name }}</span>
    </RouterLink>
  </a-menu-item>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { RouterLink } from "vue-router";
import  type { SidebarItemType } from "../types/Sidebar";
defineProps<{
  item: SidebarItemType;
  isActive: boolean;
}>()
const emit = defineEmits(["click"]);
const onClick = (item: SidebarItemType) => emit("click", item);

</script>
