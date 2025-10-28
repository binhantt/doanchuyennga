<template>
  <Teleport to="body">
    <div>
      <a-modal
        :open="isOpen"
        :title="title" 
        centered
        :maskClosable="false"
        :destroyOnClose="true"
        class="rounded-lg"
        @cancel="close"
      >
        <template #title>
          <ModalHeader :title="title" @close="close" />
        </template>
        <slot />
        <template #footer>
          <div class="pt-4 flex justify-end space-x-3">
            <BaseButton type="button" @click="close" class="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 flex justify-center items-center">
              Hủy
            </BaseButton>
            <BaseButton type="button" @click="handleSubmit" class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 flex justify-center items-center">
              Lưu
            </BaseButton>
          </div>
        </template>
      </a-modal>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import ModalHeader from "./ModalHeader.vue";
import BaseButton from "../button/BaseButton.vue";

const props = defineProps<{
  isOpen: boolean;
  title: string;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "submit"): void;
}>();

const handleSubmit = () => {
  emit("submit");
};

const close = () => {
  emit("close");
};
</script>