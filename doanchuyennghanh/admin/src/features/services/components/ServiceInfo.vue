<template>
  <div class="bg-blue-50 p-4 rounded-lg">
    <h3 class="text-lg font-semibold text-blue-800 mb-2">{{ title }}</h3>
    <div class="grid grid-cols-2 gap-4">
      <div><span class="font-medium">{{ nameLabel }}:</span> {{ item.name }}</div>
      <div>
        <span class="font-medium">{{ priceLabel }}:</span> 
        <span class="text-lg font-bold text-blue-600">
          {{ formatPrice(currentPrice) }}
        </span>
        <span v-if="showPriceChange && currentPrice !== (item.price || 0)" class="text-xs text-orange-600 ml-2">
          (Đã thay đổi từ {{ formatPrice(item.price || 0) }})
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
  nameLabel?: string;
  priceLabel?: string;
  item: any;
  currentPrice?: number;
  showPriceChange?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Thông tin',
  nameLabel: 'Tên',
  priceLabel: 'Giá hiện tại',
  currentPrice: 0,
  showPriceChange: false
});

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};
</script>