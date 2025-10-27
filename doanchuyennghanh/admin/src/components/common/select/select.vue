<template>
  <div class="">
    <label v-if="label" class="block text-sm font-medium text-gray-700 mb-1">
      <component v-if="icon" :is="icon" class="inline-block align-middle mr-2" />
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>
    
    <a-select
      v-model:value="selectedValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :loading="loading"
      :allow-clear="allowClear"
      :show-search="showSearch"
      :filter-option="filterOption"
      :mode="mode"
      :size="size"
      :class="['w-full  focus:outline-none focus:ring-2 transition-colors', hasError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-transparent']"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    >
      <a-select-option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :disabled="option.disabled"
      >
        <span v-if="option.icon" class="inline-block align-middle mr-2">{{ option.icon }}</span>
        {{ option.label }}
      </a-select-option>
    </a-select>
    
    <div v-if="errorMessage" class="mt-1 text-sm text-red-600">
      ⚠️ {{ errorMessage }}
    </div>
    
    <div v-else-if="hint" class="mt-1 text-sm text-gray-500">
      💡 {{ hint }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'

export interface SelectOption {
  label: string
  value: string | number
  disabled?: boolean
  icon?: string
}

interface Props {
  modelValue?: string | number | Array<string | number>
  label?: string
  placeholder?: string
  options: SelectOption[]
  disabled?: boolean
  loading?: boolean
  required?: boolean
  allowClear?: boolean
  showSearch?: boolean
  filterOption?: boolean | Function
  mode?: 'default' | 'multiple' | 'tags'
  size?: 'large' | 'middle' | 'small'
  icon?: any
  errorMessage?: string
  hint?: string
}

interface Emits {
  (e: 'update:modelValue', value: string | number | Array<string | number>): void
  (e: 'change', value: string | number | Array<string | number>, option: any): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Vui lòng chọn...',
  disabled: false,
  loading: false,
  required: false,
  allowClear: true,
  showSearch: false,
  filterOption: true,
  mode: 'default',
  size: 'middle'
})

const emit = defineEmits<Emits>()

const selectedValue = ref(props.modelValue)

const hasError = computed(() => !!props.errorMessage)

watch(() => props.modelValue, (newValue) => {
  selectedValue.value = newValue
})

const handleChange = (value: string | number | Array<string | number>, option: any) => {
  emit('update:modelValue', value)
  emit('change', value, option)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}
</script>