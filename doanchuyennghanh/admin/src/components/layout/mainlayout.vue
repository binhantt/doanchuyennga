<script setup lang="ts">
import Navbar from './Navbar.vue';
import Sidebar from './Sidebar.vue';
</script>

<template>
  <div class="flex min-h-screen bg-gray-50">
    <Sidebar />
    <div class="flex flex-col flex-1">
      <Navbar />
      <!-- Main content area -->
      <main class="flex-1 p-4">
        <slot />
      </main>
    </div>
  </div>
</template>
