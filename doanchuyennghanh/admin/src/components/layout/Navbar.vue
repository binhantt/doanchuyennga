<script setup lang="ts">
import { ICONS } from "../constants/icon";
import InputField from "../common/InputField.vue";
</script>

<template>
  <header class="flex justify-between items-center p-4 bg-white border-b border-gray-200">
    <div class="flex items-center space-x-4">
      <button class="text-gray-600 focus:outline-none lg:hidden">
        <component :is="ICONS.Menu" class="text-xl" />
      </button>
      <div class="relative">
        <InputField />
        <component
          :is="ICONS.Search"
          class="absolute left-3 top-1.5 text-gray-400 text-lg"
        />
      </div>
    </div>
    <div class="flex items-center space-x-4">
      <div class="relative">
        <button class="text-gray-600">
          <component :is="ICONS.Bell" class="text-xl" />
        </button>
        <span
          class="absolute -top-1 -right-1 h-4 w-4 text-xs flex items-center justify-center bg-red-500 text-white rounded-full"
          >5</span
        >
      </div>
      <div class="relative">
        <button class="text-gray-600">
          <component :is="ICONS.Message" class="text-xl" />
        </button>
        <span
          class="absolute -top-1 -right-1 h-4 w-4 text-xs flex items-center justify-center bg-red-500 text-white rounded-full"
          >3</span
        >
      </div>
      <div class="flex items-center">
        <div
          class="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg"
        >
          <component :is="ICONS.Users" />
        </div>
        <div class="ml-3 text-right">
          <p class="text-sm font-semibold text-gray-800">Admin</p>
          <p class="text-xs text-gray-500">Quản trị viên</p>
        </div>
      </div>
    </div>
  </header>
</template>
