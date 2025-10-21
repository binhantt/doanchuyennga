<script setup lang="ts">
import Navbar from '../../../components/layout/Navbar.vue';
import Sidebar from '../../../components/layout/Sidebar.vue';
</script>
<template>
  <div class="flex min-h-screen bg-gray-50">
    <Sidebar />
    <div class="flex flex-col flex-1">
      <Navbar />
      <main class="flex-1 p-4">
               <RouterView/>
      </main>   
    </div>
  </div>
</template>
