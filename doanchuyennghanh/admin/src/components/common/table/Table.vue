<template>
  <a-card
    class="rounded-xl shadow-md transition-all duration-300 hover:shadow-lg"
    bordered
  >
    <div class="flex flex-col sm:flex-row justify-between items-center gap-3 mb-4">
      <BaseInput
        v-model="searchValue"
        placeholder="Tìm kiếm sản phẩm..."
        :icon="SearchOutlined"
        class="w-full sm:w-1/3"
      />

      <div class="flex gap-2">
        <BaseButton type="primary" @click="$emit('add')">
          <PlusOutlined />
          Thêm  mới
        </BaseButton>

        <BaseButton type="default" @click="$emit('refresh')">
          <ReloadOutlined />
          Làm mới
        </BaseButton>
      </div>
    </div>
    <a-table
      :columns="columns"
      :data-source="data"
      :loading="loading"
      :pagination="false"
      row-key="id"
      :locale="{
        emptyText: loading ? 'Đang tải dữ liệu...' : 'Không có dữ liệu để hiển thị'
      }"
    >
    </a-table>
  </a-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { PlusOutlined, ReloadOutlined, SearchOutlined } from "@ant-design/icons-vue";
import BaseInput from "../input/BaseInput.vue";
import BaseButton from "../button/BaseButton.vue";

defineProps<{
  columns: any[];
  data?: any[];
  loading?: boolean;
}>();

defineEmits(["add", "refresh"]);

const searchValue = ref("");
</script>


