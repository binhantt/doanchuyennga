<template>
  <div
    class="flex flex-col justify-center items-start text-white bg-blue-700 p-12 h-screen w-full md:w-1/2"
  >
    <div class="max-w-md space-y-6">
      <h1 class="text-3xl font-bold leading-snug">
        Quản lý hệ thống một cách hiệu quả
      </h1>

      <ul class="space-y-3 mt-6 text-base">
        <li class="flex items-center gap-3">
          <i class="fa-solid fa-shield-halved text-xl"></i>
          <span>Bảo mật tối ưu với xác thực hai lớp</span>
        </li>
        <li class="flex items-center gap-3">
          <i class="fa-solid fa-chart-column text-xl"></i>
          <span>Thống kê và báo cáo chi tiết</span>
        </li>
        <li class="flex items-center gap-3">
          <i class="fa-solid fa-users-gear text-xl"></i>
          <span>Quản lý người dùng và phân quyền</span>
        </li>
        <li class="flex items-center gap-3">
          <i class="fa-solid fa-bell text-xl"></i>
          <span>Thông báo và cảnh báo theo thời gian thực</span>
        </li>
      </ul>

      <p class="text-sm opacity-80 mt-10">
        © 2025 AdminPanel. Tất cả quyền được bảo lưu.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Không cần props vì panel này là tĩnh
</script>
