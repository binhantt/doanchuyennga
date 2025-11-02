<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
  // Xóa tất cả cookie (bao gồm 'token' nếu có)
  document.cookie.split(';').forEach((c) => {
    const cookieName = c.split('=')[0].trim();
    document.cookie = `${cookieName}=; Max-Age=0; path=/;`;
  });

  // Xóa toàn bộ localStorage (bao gồm 'admin_token')
  localStorage.clear();

  // Điều hướng về trang đăng nhập, tránh quay lại trang cũ
  router.replace('/login');
});
</script>

<template>
  <div class="flex min-h-screen bg-gray-50 items-center justify-center">
    <div class="text-center">
      <h1 class="text-2xl font-bold mb-4">Đang đăng xuất...</h1>
      <p>Vui lòng đợi trong giây lát</p>
    </div>
  </div>
</template>
