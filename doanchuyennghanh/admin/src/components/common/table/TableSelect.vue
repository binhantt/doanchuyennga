<template>
  <a-card
    class="rounded-xl shadow-md transition-all duration-300 hover:shadow-lg"
    bordered
  >
  
    <a-table
      :columns="columns"
      :data-source="data"
      :loading="loading"
      :pagination="pagination"
      row-key="id"
      :locale="{
        emptyText: loading ? 'Đang tải dữ liệu...' : 'Không có dữ liệu để hiển thị'
      }"
      @change="$emit('change', $event)"
    >
    </a-table>
  </a-card>
</template>

<script setup lang="ts">


defineProps<{
  columns: any[];
  data?: any[];
  loading?: boolean;
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
    showSizeChanger?: boolean;
    pageSizeOptions?: string[];
    showTotal?: (total: number, range: [number, number]) => string;
  };
}>();

defineEmits(["add", "refresh", "change"]);

</script>


