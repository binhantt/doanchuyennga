<template>
  <div class="w-64 bg-blue-500 text-white flex flex-col text-white overflow-y-auto max-h-screen custom-scrollbar-hide">
    <div class="flex items-center justify-center h-13.5 border-b border-blue-800">
      <h1 class="text-2xl font-bold text-white flex items-center my-3 gap-2">
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
    class="bg-blue-500  "
  >
    <template class="text-white " v-for="item in menuItems" :key="item.name">
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
  { name: "Đơn hàng",
     icon: ICONS.Orders, 
     path: "",
      children: [
      { name: "Món ăn", icon: ICONS.Orders, path: "/admin/dashboard/orders/food" },
      { name: "Dịch vụ", icon: ICONS.Orders, path: "/admin/dashboard/orders/services" }
    ]
   },
   {name : "Mã giảm giá", icon: ICONS.Coupon, path: "/admin/dashboard/coupons"},
  { name: "Báo cáo", icon: ICONS.Reports, path: "/admin/dashboard/reports" },
  // { name: "Đánh giá", icon: ICONS.Reviews, path: "/admin/dashboard/reviews" },
  { name: "Đăng xuất", icon: ICONS.Logout, path: "/logout" },
];

const activeItem = ref("Dashboard");
const selectedKeys = ref<string[]>([]);
const openKeys = ref<string[]>([]);
const route = useRoute();

const setActiveItem = (item: SidebarItemType) => {
  activeItem.value = item.name;
  localStorage.setItem("activeItem", item.name);

  if (!item.children) { // Only set selectedKeys for leaf nodes
    selectedKeys.value = [item.name]; // Use item.name as key
    // Ensure parent is open if it's a child
    const parent = menuItems.find(menuItem => menuItem.children?.some(child => child.name === item.name)); // Find parent by child's name
    if (parent) {
      openKeys.value = [parent.name]; // Open this parent and close others
    } else {
      openKeys.value = []; // No parent, close all submenus
    }
  } else { // If it's a parent item, toggle its open state
    if (openKeys.value.includes(item.name)) {
      openKeys.value = []; // Close this parent
    } else {
      openKeys.value = [item.name]; // Open this parent and close others
    }
  }
};

const updateMenuStateFromRoute = (currentPath: string) => {
  let currentItem: SidebarItemType | undefined;
  let parentItem: SidebarItemType | undefined;

  // Find the menu item corresponding to the current route path
  for (const item of menuItems) {
    if (item.path === currentPath) {
      currentItem = item;
      break;
    }
    if (item.children) {
      const child = item.children.find(c => c.path === currentPath);
      if (child) {
        currentItem = child;
        parentItem = item;
        break;
      }
    }
  }

  if (currentItem) {
    selectedKeys.value = [currentItem.name]; // Use item.name as key
    if (parentItem) {
      openKeys.value = [parentItem.name];
    } else if (currentItem.children) { // If current item is a parent and has children, open it
      openKeys.value = [currentItem.name];
    } else {
      openKeys.value = [];
    }
  } else {
    selectedKeys.value = [];
    openKeys.value = [];
  }
};

watch(route, (newRoute) => {
  updateMenuStateFromRoute(newRoute.path);
}, { immediate: true });

onMounted(() => {
  const saved = localStorage.getItem("activeItem");
  if (saved) {
    activeItem.value = saved;
  }
  updateMenuStateFromRoute(route.path);
});
</script>

