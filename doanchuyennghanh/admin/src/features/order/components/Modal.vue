<template>
  <ModalSelect
    v-model:is-open="open"
    :title="title"
    @cancel="handleCancel"
    @ok="handleOk"
  >

    <a-form
      ref="formRef"
      :model="formState"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
    <FormItem :items="userItems" />
    <a-divider>Món ăn</a-divider>
    <a-table :columns="dishColumns" :data-source="formState.dishes" :pagination="false">
        <template #bodyCell="{ column, text }">
          <template v-if="column.dataIndex === 'price'">
            <span>{{ formatCurrency(text) }}</span>
          </template>
          <template v-if="column.dataIndex === 'images'">
            <Image v-if="text && text.length > 0" :src="text[0]" />
          </template>
        </template>
      </a-table>
    </a-form>
    <Text class="flex justify-end mt-3" :label="'Tổng cộng'" :value="formatCurrency(formState.totalAmount)" />
  </ModalSelect >
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import type { UnwrapRef } from 'vue';
import type { Rule } from 'ant-design-vue/es/form';
import type { Order } from '../index';
import Image from '../../../components/common/bard/Image.vue';
import ModalSelect from '../../../components/common/modal/modalselect.vue';
import FormItem from '../../../components/common/menu/form-item.vue';
import { computed } from 'vue';
import Text from '../../../components/common/bard/text.vue';

const props = defineProps<{
  isOpen: boolean;
  order: Order | null;
}>();

const emit = defineEmits(['update:isOpen', 'save']);

const formRef = ref();
const open = ref<boolean>(props.isOpen);
const title = ref<string>('Chi tiết đơn hàng');

const formState: UnwrapRef<Order> = reactive({
  id: 0,
  eventDate: '',
  guestCount: 0,
  totalAmount: '',
  discountAmount: '',
  finalAmount: '',
  status: '',
  user: {
    id: 0,
    username: '',
    email: '',
    phoneNumber: '',
    address: '',
  },
  dishes: [],
});

const userItems = computed(() => [
  { label: 'ID', value: formState.user.id },
  { label: 'Tên người dùng', value: formState.user.username },
  { label: 'Email', value: formState.user.email },
  { label: 'Số điện thoại', value: formState.user.phoneNumber },
  { label: 'Địa chỉ', value: formState.user.address },
]);

const rules: Record<string, Rule[]> = {}; // No validation needed for display modal

const labelCol = { span: 6 };
const wrapperCol = { span: 14 };

const dishColumns = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Tên món', dataIndex: 'name', key: 'name' },
  { title: 'Số lượng', dataIndex: 'quantity', key: 'quantity' },
  { title: 'Giá', dataIndex: 'price', key: 'price' },
  { title: 'Hình ảnh', dataIndex: 'images', key: 'images' },
];

const formatCurrency = (value: string | number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(value));
};

watch(
  () => props.isOpen,
  (val) => {
    open.value = val;
  },
);

watch(
  () => props.order,
  (val) => {
    if (val) {
      Object.assign(formState, val);
    }
  },
);

const handleOk = () => {
  // Handle 'ok' event from ModalSelect if needed
  emit('save');
};

const handleCancel = () => {
  emit('update:isOpen', false);
  formRef.value.resetFields();
};
</script>

<style scoped></style>