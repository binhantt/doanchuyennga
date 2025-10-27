<template>
<FormModal
  :isOpen="isOpen"
  :title="product ? 'Sửa sản phẩm' : 'Thêm sản phẩm'"
  @submit="handleSubmit"
  @close="Close"
  class="max-w-4xl w-full"
>
  <div class="space-y-6 form-container">
    <div>
      <BaseInput 
        label="Tên sản phẩm" 
        v-model="form.name" 
        class="w-full"
        required
        placeholder="Nhập tên sản phẩm"
      />
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <BaseSelect 
          label=" Danh mục" 
          v-model="form.category_id"
          :options="categoryOptions"
          placeholder="Chọn danh mục"
          :loading="categoryStore.loading"
          required
          show-search
          allow-clear
          @change="handleCategoryChange"
        />
      </div>
      
      <div>
        <BaseInput 
          label="Giá (VNĐ)" 
          v-model="form.price" 
          type="number"
          class="w-full"
          placeholder="0"
          min="0"
        />
      </div>
    </div>

    <!-- Hàng 3: Hình ảnh -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-3">Hình ảnh sản phẩm</label>
      <BaseImage 
        v-model="form.image_url" 
        uploadText="Tải ảnh lên hoặc kéo thả"
        :show-url-input="true"
      />
    </div>

    <!-- Hàng 4: Mô tả -->
    <div>
      <BaseInput 
        label="Mô tả sản phẩm" 
        v-model="form.description" 
        tag="textarea" 
        class="w-full"
        placeholder="Nhập mô tả chi tiết về sản phẩm..."
      
      />
    </div>

    <!-- Hàng 5: Trạng thái -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="flex items-center space-x-3">
        <input 
          type="checkbox" 
          id="is_available" 
          v-model="form.is_available" 
          class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        />
        <label for="is_available" class="text-sm font-medium text-gray-700 cursor-pointer">
          Sản phẩm đang có sẵn
        </label>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
        <select 
          v-model="form.status" 
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        >
          <option :value="ProductStatus.Published">🟢 Đã xuất bản</option>
          <option :value="ProductStatus.Draft">🟡 Bản nháp</option>
        </select>
      </div>
    </div>
  </div>
</FormModal>
</template>
<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import { message } from "ant-design-vue";
import { ProductStatus, type Product } from "../index";
import BaseInput from "../../../components/common/input/BaseInput.vue";
import BaseImage from "../../../components/common/input/BaseImage.vue";
import BaseSelect from "../../../components/common/select/select.vue";
import FormModal from "../../../components/common/modal/FormModal.vue";
import { useCategoryStore } from "../../../store/getcategory";
const props = defineProps<{
  isOpen: boolean;
  product: Product | null;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "save", product: Product): void;
}>();
 console.log(props.product);
// Store
const categoryStore = useCategoryStore()

// Form state
const form = ref<Product>({
  id: "",
  name: "",
  image_url: "",
  description: "",
  is_available: true,
  category_id: "",
  category_name: "",
  price: 0,
  status: ProductStatus.Published,
});

const emptyProduct: Product = {
  id: "",
  name: "",
  image_url: "",
  description: "",
  is_available: true,
  category_id: "",
  category_name: "",
  price: 0,
  status: ProductStatus.Published,
};

const resetForm = () => {
  form.value = { ...emptyProduct };
};

// Computed
const categoryOptions = computed(() => categoryStore.categoryOptions)

// Methods
const handleCategoryChange = (categoryId: string) => {
  form.value.category_id = categoryId
  const category = categoryStore.getCategoryById(categoryId)
  form.value.category_name = category?.name || ''
}

const getInitialCategoryId = (product: Product | null): string => {
  if (!product) return ''
  // Nếu có category_id thì dùng luôn
  if (product.category_id) return product.category_id
  // Nếu không có category_id nhưng có category_name, tìm category theo tên
  if (product.category_name) {
    const category = categoryStore.categories.find(cat => cat.name === product.category_name)
    if (category) return category.id
  }
  return ''
}

// Đồng bộ khi product đổi (mở sửa) hoặc null (mở tạo mới)
watch(
  () => props.product,
  (newVal) => {
    if (newVal) {
      form.value = { 
        ...newVal,
        category_id: getInitialCategoryId(newVal)
      };
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
    message.warning('⚠️ Vui lòng nhập tên sản phẩm');
    return false;
  }
  if (!form.value.category_id) {
    message.warning('⚠️ Vui lòng chọn danh mục sản phẩm');
    return false;
  }
  if (!form.value.price ||  form.value.price <= 0) {
    message.warning('⚠️ Vui lòng nhập giá hợp lệ');
    return false;
  }
  return true;
};

// Gửi dữ liệu lên parent
const handleSubmit = () => {
  if (validateForm()) {
    const productData = {
      ...form.value,
      price: Number(form.value.price),
      // Loại bỏ category_name khi gửi lên API, chỉ gửi category_id
      category_name: undefined,
    };
    emit("save",  productData);
  }
};

const Close = () => emit("close");

// Lifecycle
onMounted(async () => {
  // Load categories khi component mount
  if (categoryStore.categories.length === 0) {
    await categoryStore.fetchCategories()
  }
});
</script>
