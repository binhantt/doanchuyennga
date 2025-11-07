<template>
  <a-modal
    v-model:open="isVisible"
    :title="`Quản lý món ăn - ${service?.name || ''}`"
    width="900px"
    @cancel="handleClose"
    :footer="null"
  >
    <div v-if="service" class="space-y-6">
      <!-- Service Info Component -->
      <ServiceInfo
        title="Thông tin dịch vụ"
        name-label="Tên dịch vụ"
        price-label="Giá hiện tại"
        :item="service"
        :current-price="currentServicePrice"
        :show-price-change="true"
      />

      <!-- Dish Selector Component -->
      <DishSelector
        title="Thêm món ăn vào dịch vụ"
        add-button-text="Thêm món ăn"
        :show-mode-toggle="true"
        :show-multiple="showMultipleAdd"
        :available-dishes="availableDishes"
        v-model:selected-dish-id="selectedDishId"
        v-model:selected-quantity="selectedQuantity"
        :loading="adding"
        @toggle-mode="showMultipleAdd = $event"
        @add-single="addDishToService"
      >
        <template #multiple-selector>
          <DishGrid
            :available-dishes="availableDishes"
            v-model:selected-items="selectedDishes"
            :loading="adding"
            @add-multiple="addMultipleDishesToService"
          />
        </template>
      </DishSelector>

      <!-- Service Dish List Component -->
      <ServiceDishList
        :dishes="serviceDishes"
        :loading="loading"
        @update-quantity="updateQuantity"
        @remove-dish="removeDish"
      />

      <!-- Price Calculator Component -->
      <PriceCalculator
        v-if="serviceDishes.length > 0"
        :total-price="totalDishPrice"
        :service-fee-rate="0.2"
        :show-breakdown="false"
      />

      <!-- Footer Actions -->
      <div class="flex justify-end space-x-3 border-t pt-4">
        <a-button @click="handleClose">
          Đóng
        </a-button>
      </div>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { message } from 'ant-design-vue';
import { Api } from '../api/api';
import { get as getDishes } from '../../products/api/api';
import ServiceInfo from '../components/ServiceInfo.vue';
import DishSelector from '../components/DishSelector.vue';
import DishGrid from '../components/DishGrid.vue';
import PriceCalculator from '../components/PriceCalculator.vue';
import ServiceDishList from './ServiceDishList.vue';

interface Props {
  isOpen: boolean;
  service: any;
}

interface Emits {
  (e: 'close'): void;
  (e: 'updated'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// Modal visibility
const isVisible = computed({
  get: () => props.isOpen,
  set: (value) => {
    if (!value) {
      handleClose();
    }
  }
});

// State
const allDishes = ref<any[]>([]);
const serviceDishes = ref<any[]>([]);
const selectedDishId = ref<number | null>(null);
const selectedQuantity = ref<number>(1);
const loading = ref(false);
const adding = ref(false);

// Multiple dishes selection
const selectedDishes = ref<Array<{dish_id: number, quantity: number}>>([]);
const showMultipleAdd = ref(false);

// Computed
const availableDishes = computed(() => {
  const currentDishIds = serviceDishes.value.map(sd => sd.dish.id);
  return allDishes.value.filter(dish => !currentDishIds.includes(dish.id));
});

const totalDishPrice = computed(() => {
  return serviceDishes.value.reduce((total, sd) => total + (sd.dish.price * sd.quantity), 0);
});

const finalServicePrice = computed(() => {
  return Math.round(totalDishPrice.value * 1.2);
});

const currentServicePrice = computed(() => {
  // Return calculated price if there are dishes, otherwise return original service price
  return serviceDishes.value.length > 0 ? finalServicePrice.value : (props.service?.price || 0);
});

// Methods
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

const loadAllDishes = async () => {
  try {
    const response = await getDishes();
    allDishes.value = response.data || [];
  } catch (error) {
    console.error('Error loading dishes:', error);
    message.error('Lỗi khi tải danh sách món ăn');
  }
};

const loadServiceDishes = async () => {
  if (!props.service?.id) return;
  
  loading.value = true;
  try {
    const response = await Api.getServiceWithDishes(props.service.id);
    serviceDishes.value = response.data.dishes || [];
  } catch (error) {
    console.error('Error loading service dishes:', error);
    message.error('Lỗi khi tải danh sách món ăn của dịch vụ');
  } finally {
    loading.value = false;
  }
};

const addDishToService = async () => {
  if (!selectedDishId.value || !selectedQuantity.value || !props.service?.id) return;
  
  adding.value = true;
  try {
    await Api.addDishToService({
      service_id: props.service.id,
      dish_id: selectedDishId.value,
      quantity: selectedQuantity.value
    });
    
    message.success('Thêm món ăn thành công!');
    selectedDishId.value = null;
    selectedQuantity.value = 1;
    await loadServiceDishes();
    await updateServicePrice();
  } catch (error: any) {
    console.error('Error adding dish:', error);
    message.error(error.response?.data?.error || 'Lỗi khi thêm món ăn');
  } finally {
    adding.value = false;
  }
};

const updateServicePrice = async () => {
  if (!props.service?.id) return;
  
  try {
    const newPrice = finalServicePrice.value;
    
    // Update local service data immediately for UI responsiveness
    if (props.service) {
      props.service.price = newPrice;
    }
    
    // Update service price in backend
    await Api.update(props.service.id, {
      ...props.service,
      price: newPrice
    });
    
    emit('updated');
  } catch (error) {
    console.error('Error updating service price:', error);
    message.error('Lỗi khi cập nhật giá dịch vụ');
    
    // Revert local change on error
    if (props.service) {
      await loadServiceDishes(); // Reload to get correct data
    }
  }
};

const removeDish = async (serviceDishId: number) => {
  try {
    // Optimistic update - remove from UI immediately
    const originalDishes = [...serviceDishes.value];
    serviceDishes.value = serviceDishes.value.filter(sd => sd.service_dish_id !== serviceDishId);
    
    await Api.deleteServiceDish(serviceDishId);
    message.success('Xóa món ăn thành công!');
    
    // Refresh data and update price
    await Promise.all([
      loadServiceDishes(),
      updateServicePrice()
    ]);
    
    emit('updated');
  } catch (error: any) {
    console.error('Error removing dish:', error);
    message.error(error.response?.data?.error || 'Lỗi khi xóa món ăn');
    // Revert optimistic update on error
    await loadServiceDishes();
  }
};

const updateQuantity = async (serviceDishId: number, quantity: number) => {
  if (!quantity || quantity < 1) return;
  
  try {
    await Api.updateServiceDishQuantity(serviceDishId, quantity);
    message.success('Cập nhật số lượng thành công!');
    await loadServiceDishes();
    await updateServicePrice();
  } catch (error: any) {
    console.error('Error updating quantity:', error);
    message.error(error.response?.data?.error || 'Lỗi khi cập nhật số lượng');
  }
};

// Simplified methods since logic moved to components

const addMultipleDishesToService = async () => {
  if (!props.service?.id || selectedDishes.value.length === 0) return;
  
  adding.value = true;
  try {
    await Api.addMultipleDishesToService(props.service.id, selectedDishes.value);
    
    message.success(`Thêm ${selectedDishes.value.length} món ăn thành công!`);
    clearSelection();
    showMultipleAdd.value = false;
    await loadServiceDishes();
    await updateServicePrice();
  } catch (error: any) {
    console.error('Error adding multiple dishes:', error);
    message.error(error.response?.data?.error || 'Lỗi khi thêm món ăn');
  } finally {
    adding.value = false;
  }
};

const handleClose = () => {
  selectedDishId.value = null;
  selectedQuantity.value = 1;
  selectedDishes.value = [];
  showMultipleAdd.value = false;
  emit('close');
};

// Watch for modal open/close
watch(() => props.isOpen, (isOpen) => {
  if (isOpen && props.service) {
    loadAllDishes();
    loadServiceDishes();
  }
});
</script>