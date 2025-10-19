<template>
  <div class="w-64 bg-blue-500 text-white flex flex-col">
    <div class="flex items-center justify-center h-20 border-b border-blue-800">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
           fill="none" stroke="currentColor" stroke-width="2"
           stroke-linecap="round" stroke-linejoin="round"
           class="h-8 w-8 mr-2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
      <h1 class="text-2xl font-bold">AdminPanel</h1>
    </div>
    <nav class="flex-1 px-4 py-6">
      <ul>
        <template v-for="(item, index) in menuItems" :key="item.name">
          <SidebarSection v-if="item.section" :title="item.section" />
          <SidebarItem
            :item="item"
            :isActive="activeItem === item.name"
            @click="setActiveItem"
          />
        </template>
      </ul>
    </nav>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ICONS } from "../constants/icon";
import SidebarItem from "../Sidebar/SidebarItem.vue";
import SidebarSection from "../Sidebar/SidebarSection.vue";
import type { SidebarItem as SidebarItemType } from "../types/Sidebar";
const activeItem = ref("Dashboard");
const setActiveItem = (name: string) => {
  activeItem.value = name;
  localStorage.setItem("activeItem", name); // 👉 Lưu lại vào localStorage
};

onMounted(() => {
  const saved = localStorage.getItem("activeItem");
  if (saved) {
    activeItem.value = saved;
  }
});

const menuItems: SidebarItemType[] = [
  { name: "Dashboard", icon: ICONS.Dashboard, section: "QUẢN LÝ", path: "/admin/dashboard" },
  { name: "Người dùng", icon: ICONS.Users, path: "/admin/dashboard/users" },
  { name: "Sản phẩm", icon: ICONS.Products, path: "/admin/dashboard/products" },
  { name: "Đơn hàng", icon: ICONS.Orders, path: "/admin/dashboard/orders" },
  { name: "Báo cáo", icon: ICONS.Reports, path: "/admin/dashboard/reports" },
  { name: "Cài đặt", icon: ICONS.Settings, section: "CẤU HÌNH", path: "/admin/dashboard/settings" },
  { name: "Tài khoản", icon: ICONS.Account, path: "/admin/dashboard/account" },
  { name: "Đăng xuất", icon: ICONS.Logout, path: "/admin/dashboard/logout" },
];
</script>

<style scoped>
</style>
