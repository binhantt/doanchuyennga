<template>
  <a-modal
    :open="isOpen"
    :title="title"
    @cancel="handleCancel"
    :footer="null"
    width="90vw"
 "
  >
    <slot ></slot>
   <div class="flex justify-end gap-2 mt-3">
      <a-button key="back" @click="handleCancel">Hủy</a-button>
      <a-button type="primary" key="submit" :loading="confirmLoading" @click="handleOk">
        Chọn
      </a-button>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { Modal as AModal, Button as AButton } from 'ant-design-vue';
import ButtonPrimary from '../button/BaseButton.vue';

const props = defineProps<{
  isOpen: boolean;
  title: string;
  confirmLoading?: boolean;
}>();

const emit = defineEmits(['update:isOpen', 'ok', 'cancel']);

const handleOk = () => {
  emit('ok');
};

const handleCancel = () => {
  emit('update:isOpen', false);
  emit('cancel');
};
</script>

<style scoped></style>