<template>
  <div class="min-h-screen flex">
    <LoginInfoPanel class="hidden lg:flex w-1/2" />
    <div class="w-full lg:w-1/2 flex items-center justify-center bg-gray-50">
      <div class="w-full max-w-md p-8 bg-white rounded-2xl shadow-md">
        <div class="text-center mb-6">
          <h2 class="text-2xl font-bold text-gray-800">Đăng Nhập Admin</h2>
          <p class="text-gray-500 text-sm mt-2">
            Vui lòng đăng nhập để tiếp tục vào hệ thống quản trị
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  </div>
</template>

<script setup>
import LoginInfoPanel from "../components/LoginInfoPanel.vue";
import LoginForm from "../components/LoginForm.vue";
</script>
