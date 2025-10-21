<template>
      <a-col :xs="24" :sm="12" :lg="6" v-for="card in stats" :key="card.title">
      <a-card>
        <div class="flex justify-between items-center">
          <div>
            <p class="text-gray-500">{{ card.title }}</p>
            <p class="text-2xl font-bold">{{ card.value }}</p>
          </div>
          <a-avatar :size="48" :style="{ backgroundColor: card.color, color: '#fff' }">
            <component :is="card.icon" />
          </a-avatar>
        </div>
      </a-card>
    </a-col>
</template>
<script setup lang="ts">
import { BoxPlotOutlined, DollarOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons-vue';

// Thống kê card
const stats = [
  { title: "Tổng đơn hàng", value: 1245, color: "#1890ff", icon: ShoppingCartOutlined },
  { title: "Khách hàng mới", value: 342, color: "#52c41a", icon: UserOutlined },
  { title: "Doanh thu", value: "$12,450", color: "#faad14", icon: DollarOutlined },
  { title: "Sản phẩm", value: 128, color: "#f5222d", icon: BoxPlotOutlined },
]

</script>
