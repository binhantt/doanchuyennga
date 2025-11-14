<template>
  <div class="border-t pt-4">
    <h3 class="text-lg font-semibold mb-4">Món ăn hiện tại ({{ dishes.length }} món)</h3>
    
    <div v-if="loading" class="text-center py-4">
      <a-spin size="large" />
    </div>

    <div v-else-if="dishes.length === 0" class="text-center py-8 text-gray-500">
      Chưa có món ăn nào trong dịch vụ này
    </div>

    <div v-else class="space-y-3">
      <div 
        v-for="dish in dishes" 
        :key="dish.service_dish_id"
        class="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
      >
        <div class="flex items-center space-x-4">
          <img 
            :src="dish.dish.image_url || '/placeholder-dish.jpg'" 
            :alt="dish.dish.name"
            class="w-16 h-16 object-cover rounded-lg"
          />
          <div>
            <h4 class="font-medium">{{ dish.dish.name }}</h4>
            <TruncatedText 
              :text="dish.dish.description || 'Không có mô tả'"
              :max-length="80"
              text-class="text-sm text-gray-600"
            />
            <p class="text-sm font-medium text-green-600">
              {{ formatPrice(dish.dish.price) }} x {{ dish.quantity }} = {{ formatPrice(dish.dish.price * dish.quantity) }}
            </p>
          </div>
        </div>
        
        <div class="flex items-center space-x-3">
          <div class="flex items-center space-x-2">
            <span class="text-sm font-medium">Số lượng:</span>
            <a-input-number
              :value="dish.quantity"
              :min="1"
              :max="100"
              size="small"
              @change="(value) => $emit('update-quantity', dish.service_dish_id, value)"
            />
          </div>
          
          <a-button 
            type="text" 
            danger 
            size="small"
            @click="$emit('remove-dish', dish.service_dish_id)"
          >
            Xóa
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TruncatedText from '../../../components/common/bard/TruncatedText.vue';

interface Props {
  dishes: any[];
  loading?: boolean;
}

interface Emits {
  (e: 'update-quantity', serviceDishId: number, quantity: number): void;
  (e: 'remove-dish', serviceDishId: number): void;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
});

const emit = defineEmits<Emits>();

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};
</script>