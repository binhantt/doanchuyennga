<template>
  <div class="w-64 bg-blue-500 text-white flex flex-col text-white overflow-y-auto max-h-screen custom-scrollbar-hide">
    <div class="flex items-center justify-center h-13.5 border-b border-blue-800">
      
      <h1 class="text-2xl font-bold text-white flex items-center gap-2">
        <component  :is="ICONS.Dashboard" />
        AdminPanel

      </h1>
    </div>
    <nav class="flex-1 px-4 py-6">
  <a-menu
    v-model:selectedKeys="selectedKeys"
    v-model:openKeys="openKeys"
    mode="inline"
    :inline-collapsed="false"
    class="bg-blue-500"
  >
    <template class="text-white" v-for="item in menuItems" :key="item.name">
      <SidebarSection v-if="item.section" :title="item.section" />
      <SidebarItem :item="item" :isActive="activeItem === item.name" @click="setActiveItem" />
    </template>
  </a-menu>
</nav>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { ICONS } from "../constants/icon";
import SidebarItem from "../Sidebar/SidebarItem.vue";
import SidebarSection from "../Sidebar/SidebarSection.vue";
import type { SidebarItemType } from "../types/Sidebar";
import { useRoute } from "vue-router";

const menuItems: SidebarItemType[] = [
  { name: "Dashboard", icon: ICONS.Dashboard, section: "QUẢN LÝ", path: "/admin/dashboard" },
  { name: "Người dùng", icon: ICONS.Users, path: "/admin/dashboard/users" },
  { name: "Danh mục", icon: ICONS.Categories, path: "/admin/dashboard/categories" },
  {
    name: "Sản phẩm",
    icon: ICONS.Products,
    path: "",
    children: [
      { name: "Món ăn", icon: ICONS.Products, path: "/admin/dashboard/products/food" },
      { name: "Dịch vụ", icon: ICONS.Products, path: "/admin/dashboard/products/services" }
    ]
  },
  { name: "Đơn hàng", icon: ICONS.Orders, path: "/admin/dashboard/orders" },
  { name: "Báo cáo", icon: ICONS.Reports, path: "/admin/dashboard/reports" },
  { name: "Cài đặt", icon: ICONS.Settings, section: "CẤU HÌNH", path: "/admin/dashboard/settings" },
  { name: "Tài khoản", icon: ICONS.Account, path: "/admin/dashboard/account" },
  { name: "Đăng xuất", icon: ICONS.Logout, path: "/admin/dashboard/logout" },
];

const activeItem = ref("Dashboard");
const selectedKeys = ref<string[]>([]);
const openKeys = ref<string[]>([]);
const route = useRoute();

const setActiveItem = (item: SidebarItemType) => {
  activeItem.value = item.name;
  localStorage.setItem("activeItem", item.name);
  selectedKeys.value = [item.path];
  if (!item.children) {
    const parent = menuItems.find(menuItem => menuItem.children?.some(child => child.path === item.path));
    if (parent) {
      openKeys.value = [parent.name];
    } else {
      openKeys.value = [];
    }
  }
};

watch(route, (newRoute) => {
  selectedKeys.value = [newRoute.path];
  const parent = menuItems.find(item => item.children?.some(child => child.path === newRoute.path));
  if (parent) {
    openKeys.value = [parent.name];
  } else {
    openKeys.value = [];
  }
}, { immediate: true });

onMounted(() => {
  const saved = localStorage.getItem("activeItem");
  if (saved) {
    activeItem.value = saved;
  }
  selectedKeys.value = [route.path];
  const parent = menuItems.find(item => item.children?.some(child => child.path === route.path));
  if (parent) {
    openKeys.value = [parent.name];
  }
});
</script>

