<template>
<FormModal
  :isOpen="isOpen"
  :title="product ? 'Sửa sản phẩm' : 'Thêm sản phẩm'"
  @submit="handleSubmit"
  @close="Close"
  class="max-w-2xl"
>
 <input type="text" v-model="form.name" placeholder="Nhập tên danh mục" class="w-full" required />
  <BaseInput label="Tên sản phẩm" v-model="form.name" class="w-full" />
  <BaseInput label="Danh muc san pham" v-model="form.category_name" type="number" class="w-full" />
<BaseInput label="Hình ảnh (URL)" v-model="form.imageUrl" class="w-full" />

<BaseInput label="Mô tả" v-model="form.description" tag="textarea" class="w-full" />

</FormModal>

</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { ProductStatus, type Product } from "../index";
import BaseInput from "../../../components/common/input/BaseInput.vue";
import FormModal from "../../../components/common/modal/FormModal.vue";

// Props
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

// Gửi dữ liệu lên parent
const handleSubmit = () => {
  emit("save", { ...form.value });
};

const Close = () => emit("close");
</script>
