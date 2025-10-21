<template>
  <div class="w-64 bg-blue-500 text-white flex flex-col">
    <div class="flex items-center justify-center h-13.5 border-b border-blue-800">
      
      <h1 class="text-2xl font-bold text-white flex items-center gap-2">
        <component  :is="ICONS.Dashboard" />
        AdminPanel

      </h1>
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
  { name: "Danh mục", icon: ICONS.Categories, path: "/admin/dashboard/categories" },
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
