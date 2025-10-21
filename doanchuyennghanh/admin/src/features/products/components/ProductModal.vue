<template>
<FormModal
  :isOpen="isOpen"
  :title="product ? 'Sửa sản phẩm' : 'Thêm sản phẩm'"
  @submit="handleSubmit"
  @close="Close"
  class="max-w-2xl"
>
  <div class="space-y-4">
    <BaseInput 
      label="Tên sản phẩm" 
      v-model="form.name" 
      class="w-full"
      required
    />
    
    <BaseInput 
      label="Danh mục sản phẩm" 
      v-model="form.category_name" 
      class="w-full"
      placeholder="Nhập tên danh mục"
    />
    
    <BaseInput 
      label="Giá" 
      v-model="form.price" 
      type="number"
      class="w-full"
      placeholder="0"
    />
    
    <BaseInput 
      label="Hình ảnh (URL)" 
      v-model="form.imageUrl" 
      class="w-full"
      placeholder="https://example.com/image.jpg"
    />
    
    <BaseInput 
      label="Mô tả" 
      v-model="form.description" 
      tag="textarea" 
      class="w-full"
      placeholder="Mô tả sản phẩm..."
    />
    
    <div class="flex items-center gap-2">
      <input 
        type="checkbox" 
        id="is_available" 
        v-model="form.is_available" 
        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
      />
      <label for="is_available" class="text-sm font-medium text-gray-700">
        Đang có sẵn
      </label>
    </div>
    
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
      <select 
        v-model="form.status" 
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option :value="ProductStatus.Published">Đã xuất bản</option>
        <option :value="ProductStatus.Draft">Bản nháp</option>
      </select>
    </div>
  </div>
</FormModal>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { ProductStatus, type Product } from "../index";
import BaseInput from "../../../components/common/input/BaseInput.vue";
import FormModal from "../../../components/common/modal/FormModal.vue";
const props = defineProps<{
  isOpen: boolean;
  product: Product | null;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "save", product: Product): void;
}>();
 console.log(props.product);
// Form state
const form = ref<Product>({
  id: "",
  name: "",
  imageUrl: "",
  description: "",
  is_available: true,
  category_name: "",
  price: "",
  status: ProductStatus.Published,
});

const emptyProduct: Product = {
  id: "",
  name: "",
  imageUrl: "",
  description: "",
  is_available: true,
  category_name: "",
  price: "",
  status: ProductStatus.Published,
};

const resetForm = () => {
  form.value = { ...emptyProduct };
};

// Đồng bộ khi product đổi (mở sửa) hoặc null (mở tạo mới)
watch(
  () => props.product,
  (newVal) => {
    if (newVal) {
      form.value = { ...newVal };
    } else {
      resetForm();
    }
  },
  { immediate: true }
);

// Reset form mỗi khi đóng modal để tránh dữ liệu cũ
watch(
  () => props.isOpen,
  (isOpen) => {
    if (!isOpen) {
      resetForm();
    }
  }
);

// Validation function
const validateForm = (): boolean => {
  if (!form.value.name.trim()) {
    alert('Vui lòng nhập tên sản phẩm');
    return false;
  }
  if (!form.value.category_name.trim()) {
    alert('Vui lòng nhập danh mục sản phẩm');
    return false;
  }
  if (!form.value.price || parseFloat(form.value.price) < 0) {
    alert('Vui lòng nhập giá hợp lệ');
    return false;
  }
  return true;
};

// Gửi dữ liệu lên parent
const handleSubmit = () => {
  if (validateForm()) {
    const productData = {
      ...form.value,
      price: parseFloat(form.value.price).toString(),
    };
    emit("save", productData);
  }
};

const Close = () => emit("close");
</script>
