<template>
  <div class="border-t pt-4">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-semibold">{{ title }}</h3>
      <div class="space-x-2" v-if="showModeToggle">
        <a-button 
          :type="!showMultiple ? 'primary' : 'default'"
          @click="$emit('toggle-mode', false)"
          size="small"
        >
          Thêm từng món
        </a-button>
        <a-button 
          :type="showMultiple ? 'primary' : 'default'"
          @click="$emit('toggle-mode', true)"
          size="small"
        >
          Thêm nhiều món
        </a-button>
      </div>
    </div>

    <!-- Single Dish Add -->
    <div v-if="!showMultiple" class="grid grid-cols-3 gap-4 mb-4">
      <div>
        <label class="block text-sm font-medium mb-2">Chọn món ăn:</label>
        <a-select
          :value="selectedDishId"
          @update:value="$emit('update:selectedDishId', $event)"
          placeholder="Chọn món ăn"
          class="w-full"
          show-search
          :filter-option="filterOption"
        >
          <a-select-option 
            v-for="dish in availableDishes" 
            :key="dish.id" 
            :value="dish.id"
          >
            {{ dish.name }} - {{ formatPrice(dish.price) }}
          </a-select-option>
        </a-select>
      </div>

      <div>
        <label class="block text-sm font-medium mb-2">Số lượng:</label>
        <a-input-number
          :value="selectedQuantity"
          @update:value="$emit('update:selectedQuantity', $event)"
          :min="1"
          :max="100"
          class="w-full"
        />
      </div>

      <div class="flex items-end">
        <a-button 
          type="primary" 
          @click="$emit('add-single')"
          :loading="loading"
          :disabled="!selectedDishId || !selectedQuantity"
          class="w-full"
        >
          {{ addButtonText }}
        </a-button>
      </div>
    </div>

    <!-- Multiple Dishes Add -->
    <slot name="multiple-selector" v-if="showMultiple"></slot>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
  addButtonText?: string;
  showModeToggle?: boolean;
  showMultiple?: boolean;
  availableDishes: any[];
  selectedDishId: number | null;
  selectedQuantity: number;
  loading?: boolean;
}

interface Emits {
  (e: 'toggle-mode', multiple: boolean): void;
  (e: 'update:selectedDishId', value: number | null): void;
  (e: 'update:selectedQuantity', value: number): void;
  (e: 'add-single'): void;
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Thêm món ăn',
  addButtonText: 'Thêm món ăn',
  showModeToggle: true,
  showMultiple: false,
  loading: false
});

const emit = defineEmits<Emits>();

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

const filterOption = (input: string, option: any) => {
  return option.children.toLowerCase().includes(input.toLowerCase());
};
</script>