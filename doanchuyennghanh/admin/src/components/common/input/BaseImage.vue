<template>
  <div class="image-upload-field">
    <label v-if="label" class="field-label">{{ label }}</label>
    <a-upload
      name="file"
      list-type="picture-card"
      :show-upload-list="false"
      :before-upload="beforeUpload"
      :loading="loading"
    >
      <div v-if="previewUrl || imageUrl" class="upload-preview">
        <Image :src="previewUrl || imageUrl" alt="preview" />
      </div>
      <div v-else>
        <upload-outlined></upload-outlined>
        <div class="ant-upload-text">{{ uploadText || 'Upload' }}</div>
      </div>
    </a-upload>

    <a-input
      v-if="showUrlInput"
      v-model:value="imageUrl"
      placeholder="Or paste image URL"
      @change="updateImageUrl(imageUrl)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { UploadOutlined } from '@ant-design/icons-vue';
import { Api } from '../../../features/categories/api/api';
import Image from '../bard/Image.vue';

// Props & Emits
const props = defineProps<{
  modelValue?: string;
  label?: string;
  uploadText?: string;
  showUrlInput?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

// State
const previewUrl = ref<string>('');
const imageUrl = ref<string>(props.modelValue || '');
const loading = ref<boolean>(false);
const fileName = ref<string>('');

// Watch for external modelValue changes
watch(() => props.modelValue, (newValue) => {
  if (newValue !== imageUrl.value) {
    imageUrl.value = newValue || '';
    previewUrl.value = newValue || ''; // Đồng bộ preview khi có URL từ bên ngoài
  }
}, { immediate: true });

// Handle file upload
const beforeUpload = async (file: File) => {
  console.log('File selected:', file.name, 'Size:', file.size, 'Type:', file.type);
  const isImage = file.type.startsWith('image/');
  if (!isImage) {
    alert('Please upload an image file!');
    return false;
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    alert('Image must be smaller than 2MB!');
    return false;
  }
  try {
    loading.value = true;
    console.log('Starting upload for file:', file.name);
    
    // Tạo FormData để upload
    const formData = new FormData();
    formData.append('image', file);
    
    // Kiểm tra FormData có file không
    for (let pair of formData.entries()) {
      console.log('FormData entry:', pair[0], pair[1]);
    }
    
    const response = await Api.updateimgg(formData);
    console.log('Upload response received:', response);
    
    if (response && response.data && response.data.url) {
      const uploadedUrl = response.data.url;
      previewUrl.value = uploadedUrl;
      imageUrl.value = uploadedUrl;
      emit('update:modelValue', uploadedUrl);
      console.log('Upload success, URL:', uploadedUrl);
    } else if (response && response.url) {
      const uploadedUrl = response.url;
      previewUrl.value = uploadedUrl;
      imageUrl.value = uploadedUrl;
      emit('update:modelValue', uploadedUrl);
      console.log('Upload success, URL:', uploadedUrl);
    } else {
      console.error('Invalid response structure:', response);
      alert('Upload failed: Invalid response format');
    }
  } catch (error: any) {
    console.error('Upload error details:', error);
    console.error('Error response:', error.response?.data);
    
    let errorMessage = 'Upload failed! ';
    if (error.response?.data?.error?.message) {
      errorMessage += error.response.data.error.message;
    } else if (error.message) {
      errorMessage += error.message;
    } else {
      errorMessage += 'Please try again.';
    }
    alert(errorMessage);
  } finally {
    loading.value = false;
  }
  return false; // Prevent default upload
}
const updateImageUrl = (value: string) => {
  imageUrl.value = value;
  previewUrl.value = value; // Cập nhật preview khi paste URL
  emit('update:modelValue', value);
};
</script>

<style scoped>
.image-upload-field {
  width: 100%;
}

.upload-preview {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.upload-preview img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.field-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}
</style>

