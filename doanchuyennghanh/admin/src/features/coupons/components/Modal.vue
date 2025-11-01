<template>
<FormModal
  :isOpen="isOpen"
  :title="voucher ? 'Sửa voucher' : 'Thêm voucher'"
  @submit="handleSubmit"
  @close="Close"
  class="max-w-4xl w-full"
>
  <div class="space-y-6 form-container">
    <div>
      <BaseInput 
        label="Mã voucher" 
        v-model="form.code" 
        class="w-full"
        required
        placeholder="Nhập mã voucher (VD: WELCOME10)"
      />
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <BaseSelect 
          label="Loại giảm giá" 
          v-model="form.discount_type"
          :options="discountTypeOptions"
          placeholder="Chọn loại giảm giá"
          required
        />
      </div>
      
      <div>
        <BaseInput 
          label="Giá trị giảm" 
          v-model="form.discount_value" 
          type="number"
          class="w-full"
          placeholder="0"
          min="0"
          required
        />
        <div class="text-xs text-gray-500 mt-1">
          {{ form.discount_type === 'percent' ? '% giảm giá' : 'VNĐ giảm trực tiếp' }}
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <BaseInput 
          label="Giá trị đơn hàng tối thiểu (VNĐ)" 
          v-model="form.min_order_amount" 
          type="number"
          class="w-full"
          placeholder="0"
          min="0"
        />
      </div>
      
      <div>
        <BaseInput 
          label="Số lần sử dụng tối đa" 
          v-model="form.max_uses" 
          type="number"
          class="w-full"
          placeholder="1"
          min="1"
        />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <BaseInput 
          label="Ngày bắt đầu" 
          v-model="form.valid_from" 
          type="date"
          class="w-full"
          required
        />
      </div>
      
      <div>
        <BaseInput 
          label="Ngày kết thúc" 
          v-model="form.valid_to" 
          type="date"
          class="w-full"
          required
        />
      </div>
    </div>

    <!-- Mô tả -->
    <div>
      <BaseInput 
        label="Mô tả voucher" 
        v-model="form.description" 
        tag="textarea" 
        class="w-full"
        placeholder="Nhập mô tả chi tiết về voucher..."
      />
    </div>

    <!-- Trạng thái -->
    <div class="flex items-center space-x-3">
      <input 
        type="checkbox" 
        id="is_active" 
        v-model="form.is_active" 
        class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
      />
      <label for="is_active" class="text-sm font-medium text-gray-700 cursor-pointer">
        Voucher đang hoạt động
      </label>
    </div>
  </div>
</FormModal>
</template>
<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { message } from "ant-design-vue";
import { DiscountType, type Voucher } from "../index";
import BaseInput from "../../../components/common/input/BaseInput.vue";
import BaseSelect from "../../../components/common/select/select.vue";
import FormModal from "../../../components/common/modal/FormModal.vue";

const props = defineProps<{
  isOpen: boolean;
  voucher: Voucher | null;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "save", voucher: Voucher): void;
}>();

// Form state
const form = ref<Voucher>({
  code: "",
  description: "",
  discount_type: DiscountType.Percent,
  discount_value: 0,
  min_order_amount: 0,
  max_uses: 1,
  valid_from: new Date().toISOString().split('T')[0],
  valid_to: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0],
  is_active: true,
  used_count: 0,
});

const emptyVoucher: Voucher = {
  code: "",
  description: "",
  discount_type: DiscountType.Percent,
  discount_value: 0,
  min_order_amount: 0,
  max_uses: 1,
  valid_from: new Date().toISOString().split('T')[0],
  valid_to: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0],
  is_active: true,
  used_count: 0,
};

const resetForm = () => {
  form.value = { ...emptyVoucher };
};

// Computed
const discountTypeOptions = computed(() => [
  { value: DiscountType.Percent, label: 'Phần trăm (%)' },
  { value: DiscountType.Amount, label: 'Số tiền cố định (VNĐ)' }
]);

// Đồng bộ khi voucher đổi (mở sửa) hoặc null (mở tạo mới)
watch(
  () => props.voucher,
  (newVal) => {
    if (newVal) {
      form.value = { 
        ...newVal,
        is_active: newVal.is_active === 1 || newVal.is_active === true
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
  if (!form.value.code.trim()) {
    message.warning('⚠️ Vui lòng nhập mã voucher');
    return false;
  }
  if (!form.value.discount_type) {
    message.warning('⚠️ Vui lòng chọn loại giảm giá');
    return false;
  }
  if (!form.value.discount_value || form.value.discount_value <= 0) {
    message.warning('⚠️ Vui lòng nhập giá trị giảm hợp lệ');
    return false;
  }
  if (form.value.discount_type === DiscountType.Percent && form.value.discount_value > 100) {
    message.warning('⚠️ Phần trăm giảm giá không thể vượt quá 100%');
    return false;
  }
  if (!form.value.valid_from) {
    message.warning('⚠️ Vui lòng chọn ngày bắt đầu');
    return false;
  }
  if (!form.value.valid_to) {
    message.warning('⚠️ Vui lòng chọn ngày kết thúc');
    return false;
  }
  if (new Date(form.value.valid_to) < new Date(form.value.valid_from)) {
    message.warning('⚠️ Ngày kết thúc phải sau ngày bắt đầu');
    return false;
  }
  return true;
};

// Gửi dữ liệu lên parent
const handleSubmit = () => {
  if (validateForm()) {
    const voucherData = {
      ...form.value,
      discount_value: Number(form.value.discount_value),
      min_order_amount: Number(form.value.min_order_amount),
      max_uses: Number(form.value.max_uses),
    };
    emit("save", voucherData);
  }
};

const Close = () => emit("close");
</script>
