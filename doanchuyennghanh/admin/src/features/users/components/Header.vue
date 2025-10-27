
<template>
  <a-card class="mb-6 rounded-2xl shadow-sm border border-gray-100">
    <a-space align="center" class="w-full justify-between">

      <a-space align="center">
        <a-avatar shape="square" size="large" style="background-color: #e6f4ff; color: #1677ff">
          <template #icon>
            <DatabaseOutlined />
          </template>
        </a-avatar>

        <div>
          <a-typography-title level="3" class="!m-0 !text-gray-800">
            Users Management
          </a-typography-title>
          <a-typography-text type="secondary" class="text-sm">
            Quản lý danh sách người dùng, chỉnh sửa và theo dõi tình trạng.
          </a-typography-text>
        </div>
      </a-space>
     
    </a-space>
  </a-card>
</template>

<script setup lang="ts">
import { DatabaseOutlined, PlusOutlined } from "@ant-design/icons-vue"   
</script>

<style scoped>
.mb-6 {
  margin-bottom: 1.5rem;
}
</style>
