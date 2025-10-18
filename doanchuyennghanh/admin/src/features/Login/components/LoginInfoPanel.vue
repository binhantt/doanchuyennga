<template>
  <div
    class="flex flex-col justify-center items-start text-white bg-blue-700 p-12 h-screen w-full md:w-1/2"
  >
    <div class="max-w-md space-y-6">
      <h1 class="text-3xl font-bold leading-snug">
        Quản lý hệ thống một cách hiệu quả
      </h1>

      <ul class="space-y-3 mt-6 text-base">
        <li class="flex items-center gap-3" v-for="(item, index) in features" :key="index">
          <component :is="item.icon" class="text-xl" />
          <span>{{ item.text }}</span>
        </li>
      </ul>

      <p class="text-sm opacity-80 mt-10">
        © 2025 AdminPanel. Tất cả quyền được bảo lưu.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ICONS } from "../../../components/constants/icon";

// Danh sách tính năng hiển thị bên trái
const features = [
  { icon: ICONS.Settings, text: "Bảo mật tối ưu với xác thực hai lớp" },
  { icon: ICONS.Message, text: "Thống kê và báo cáo chi tiết" },
  { icon: ICONS.Users, text: "Quản lý người dùng và phân quyền" },
  { icon: ICONS.Bell, text: "Thông báo và cảnh báo theo thời gian thực" },
];
</script>
