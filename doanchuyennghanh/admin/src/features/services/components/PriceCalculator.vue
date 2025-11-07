<template>
  <div class="bg-green-50 p-4 rounded-lg">
    <div class="flex justify-between items-center">
      <span class="font-medium">{{ totalLabel }}:</span>
      <span class="text-lg font-bold text-green-600">
        {{ formatPrice(totalPrice) }}
      </span>
    </div>
    <div v-if="showServiceFee" class="flex justify-between items-center mt-2">
      <span class="font-medium">{{ serviceFeeLabel }}:</span>
      <span class="text-xl font-bold text-blue-600">
        {{ formatPrice(finalPrice) }}
      </span>
    </div>
    <div v-if="showBreakdown && breakdown.length > 0" class="mt-3 pt-3 border-t border-green-200">
      <h5 class="text-sm font-medium mb-2">Chi tiết:</h5>
      <div v-for="item in breakdown" :key="item.id" class="flex justify-between text-sm">
        <span>{{ item.name }} x{{ item.quantity }}</span>
        <span>{{ formatPrice(item.price * item.quantity) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  totalPrice: number;
  serviceFeeRate?: number;
  totalLabel?: string;
  serviceFeeLabel?: string;
  showServiceFee?: boolean;
  showBreakdown?: boolean;
  breakdown?: Array<{id: number, name: string, price: number, quantity: number}>;
}

const props = withDefaults(defineProps<Props>(), {
  serviceFeeRate: 0.2,
  totalLabel: 'Tổng giá món ăn',
  serviceFeeLabel: 'Giá dịch vụ (+ 20% phí)',
  showServiceFee: true,
  showBreakdown: false,
  breakdown: () => []
});

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

import { computed } from 'vue';

const finalPrice = computed(() => {
  return Math.round(props.totalPrice * (1 + props.serviceFeeRate));
});
</script>