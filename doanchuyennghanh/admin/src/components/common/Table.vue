<template>
  <div class="bg-white rounded-lg shadow overflow-hidden">
    <table class="min-w-full text-left border-collapse">
      <!-- Header -->
      <thead class="bg-gray-100 border-b text-gray-700">
        <tr>
          <th
            v-for="col in columns"
            :key="col.key"
            class="px-6 py-3 font-semibold text-sm uppercase tracking-wide"
            :class="{
              'text-center': col.align === 'center',
              'text-right': col.align === 'right',
              'text-left': !col.align || col.align === 'left'
            }"
          >
            {{ col.title }}
          </th>
        </tr>
      </thead>

      <!-- Body -->
      <tbody>
        <!-- Loading -->
        <tr v-if="loading">
          <td :colspan="columns.length" class="py-8 text-center text-gray-500">
            <div class="flex justify-center items-center gap-3">
              <svg
                class="w-6 h-6 animate-spin text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              <span>Đang tải dữ liệu...</span>
            </div>
          </td>
        </tr>

        <!-- Không có dữ liệu -->
        <tr v-else-if="!hasData">
          <td :colspan="columns.length" class="py-8 text-center text-gray-500">
            Không có dữ liệu để hiển thị
          </td>
        </tr>

        <!-- Dữ liệu -->
        <slot v-else />
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  columns: { key: string; title: string; align?: "left" | "center" | "right" }[];
  loading?: boolean;
  hasData?: boolean;
}>();
</script>
