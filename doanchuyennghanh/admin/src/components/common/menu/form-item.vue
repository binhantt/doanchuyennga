<template>
  <div>
    <Text
      v-for="(item, index) in items"
      :key="item.id || index"
      :label="item.label || itemLabel || 'Tên'"
      :value="item.value || item.name"
    />
  </div>
</template>
<script setup lang="ts">
import Text from '../../../components/common/bard/text.vue';

defineProps<{
  items: { name?: string; value?: string | number; id?: number; label?: string }[];
  itemLabel?: string;
}>();
</script>
