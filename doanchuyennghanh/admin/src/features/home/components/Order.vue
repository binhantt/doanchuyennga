<template>
       <a-col :span="6" :xs="24" :lg="8">
      <a-card title="Đơn hàng mới nhất">
        <a-table
          :columns="columns"
          :data-source="orders"
          :pagination="false"
          row-key="id"
          size="small"
        />
      </a-card>
    </a-col>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const columns = [
  { title: "Khách hàng", dataIndex: "customer", key: "customer" },
  { title: "Tổng tiền", dataIndex: "total", key: "total" },
  { title: "Trạng thái", dataIndex: "status", key: "status" },
]
const orders = [
  { id: 1, customer: "Nguyen Van A", total: "$120", status: "Đã thanh toán" },
  { id: 2, customer: "Tran Thi B", total: "$75", status: "Chưa thanh toán" },
  { id: 3, customer: "Le Van C", total: "$300", status: "Đang vận chuyển" },
];

</script>
