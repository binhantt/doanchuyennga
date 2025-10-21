<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 p-6 transform transition-transform duration-300"
          :class="[isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0', $attrs.class]">
        <ModalHeader :title="title" @close="close" />
       <a-modal
    v-model:open="visible"
    :title="title"
    centered
    :footer="null"
    :maskClosable="false"
    :destroyOnClose="true"
    class="rounded-lg"
  >
          <slot/>
          <div class="pt-4 flex justify-end space-x-3">
            <BaseButton type="button" @click="close" class="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300">
              Hủy
            </BaseButton>
            <BaseButton type="button" @click="handleSubmit" class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
              Lưu
            </BaseButton>
          </div>
         </a-modal>
      </div>
    </div>
  </Teleport>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  isOpen: boolean;
  title: string;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "submit"): void;
}>();

// Trạng thái hiển thị modal
const visible = ref(props.isOpen);

watch(
  () => props.isOpen,
  (val) => (visible.value = val)
);

watch(visible, (val) => {
  if (!val) emit("close");
});

const handleSubmit = () => {
  emit("submit");
};

const close = () => {
  visible.value = false;
  emit("close");
};
</script>