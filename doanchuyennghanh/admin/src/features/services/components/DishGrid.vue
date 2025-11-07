<template>
  <div class="space-y-4">
    <!-- Available Dishes Grid -->
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-60 overflow-y-auto border rounded p-4">
      <div 
        v-for="dish in availableDishes" 
        :key="dish.id"
        class="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer"
        :class="{ 'border-blue-500 bg-blue-50': isSelected(dish.id) }"
        @click="toggleSelection(dish)"
      >
        <img 
          :src="dish.image_url || '/placeholder-dish.jpg'" 
          :alt="dish.name"
          class="w-full h-20 object-cover rounded mb-2"
        />
        <h4 class="font-medium text-sm">{{ dish.name }}</h4>
        <TruncatedText 
          v-if="dish.description"
          :text="dish.description"
          :max-length="50"
          text-class="text-xs text-gray-500 mb-1"
        />
        <p class="text-xs text-gray-600 mb-2">{{ formatPrice(dish.price) }}</p>
        
        <div v-if="isSelected(dish.id)" class="mt-2">
          <label class="block text-xs font-medium mb-1">Số lượng:</label>
          <a-input-number
            :value="getQuantity(dish.id)"
            :min="1"
            :max="100"
            size="small"
            @change="(value) => updateQuantity(dish.id, value)"
            @click.stop
          />
        </div>
      </div>
    </div>

    <!-- Selected Summary -->
    <div v-if="selectedItems.length > 0" class="bg-blue-50 p-4 rounded-lg">
      <h4 class="font-medium mb-2">Đã chọn {{ selectedItems.length }} món:</h4>
      <div class="flex flex-wrap gap-2 mb-3">
        <span 
          v-for="item in selectedItems" 
          :key="item.dish_id"
          class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
        >
          {{ getDishName(item.dish_id) }} x{{ item.quantity }}
        </span>
      </div>
      <div class="flex justify-between items-center">
        <span class="font-medium">
          Tổng: {{ formatPrice(calculateTotal()) }}
        </span>
        <div class="space-x-2">
          <a-button @click="clearAll" size="small">
            Xóa tất cả
          </a-button>
          <a-button 
            type="primary" 
            @click="$emit('add-multiple')"
            :loading="loading"
            size="small"
          >
            Thêm {{ selectedItems.length }} món
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  availableDishes: any[];
  selectedItems: Array<{dish_id: number, quantity: number}>;
  loading?: boolean;
}

interface Emits {
  (e: 'update:selectedItems', items: Array<{dish_id: number, quantity: number}>): void;
  (e: 'add-multiple'): void;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
});

const emit = defineEmits<Emits>();

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

const isSelected = (dishId: number) => {
  return props.selectedItems.some(item => item.dish_id === dishId);
};

const getQuantity = (dishId: number) => {
  const item = props.selectedItems.find(item => item.dish_id === dishId);
  return item ? item.quantity : 1;
};

const getDishName = (dishId: number) => {
  const dish = props.availableDishes.find(d => d.id === dishId);
  return dish ? dish.name : '';
};

const updateQuantity = (dishId: number, quantity: number) => {
  const newItems = [...props.selectedItems];
  const index = newItems.findIndex(item => item.dish_id === dishId);
  if (index !== -1) {
    newItems[index].quantity = quantity;
    emit('update:selectedItems', newItems);
  }
};

const toggleSelection = (dish: any) => {
  const newItems = [...props.selectedItems];
  const index = newItems.findIndex(item => item.dish_id === dish.id);
  
  if (index !== -1) {
    newItems.splice(index, 1);
  } else {
    newItems.push({ dish_id: dish.id, quantity: 1 });
  }
  
  emit('update:selectedItems', newItems);
};

const calculateTotal = () => {
  return props.selectedItems.reduce((total, item) => {
    const dish = props.availableDishes.find(d => d.id === item.dish_id);
    return total + (dish ? dish.price * item.quantity : 0);
  }, 0);
};

const clearAll = () => {
  emit('update:selectedItems', []);
};
</script>