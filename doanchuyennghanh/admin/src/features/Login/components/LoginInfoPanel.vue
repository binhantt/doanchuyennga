<template>
  <div class="flex flex-col justify-center items-start bg-blue-700 text-white p-12 h-screen w-full md:w-1/2">
        <h1 class="text-3xl font-bold leading-snug text-whitev ml-8">
          Quản lý hệ thống một cách hiệu quả
        </h1>
      <a-list :data-source="features" item-layout="horizontal">
        <template #renderItem="{ item }">
          <a-list-item class="!border-none">
            <a-space>
              <component :is="item.icon" class="text-xl" />
              <span class="text-base">{{ item.text }}</span>
            </a-space>
          </a-list-item>
        </template>
      </a-list>
      <p class="text-sm opacity-80 mt-10 ml-8">
        © 2025 AdminPanel. Tất cả quyền được bảo lưu.
      </p>

  </div>
</template>

<script setup lang="ts">
import { ICONS } from "../../../components/constants/icon";

const features = [
  { icon: ICONS.Settings, text: "Bảo mật tối ưu với xác thực hai lớp" },
  { icon: ICONS.Message, text: "Thống kê và báo cáo chi tiết" },
  { icon: ICONS.Users, text: "Quản lý người dùng và phân quyền" },
  { icon: ICONS.Bell, text: "Thông báo và cảnh báo theo thời gian thực" },
];
</script>

<style scoped>
:deep(.ant-card-head-title) {
  color: white;
}

:deep(.ant-list-item) {
  color: white;
}
</style>
