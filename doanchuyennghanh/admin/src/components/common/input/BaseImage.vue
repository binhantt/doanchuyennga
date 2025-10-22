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
        <UploadOutlined />
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
import { ref, watch } from "vue";
import { UploadOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { Api } from "../../../features/categories/api/api";
import Image from "../bard/Image.vue";

const props = defineProps<{
  modelValue?: string;
  label?: string;
  uploadText?: string;
  showUrlInput?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const previewUrl = ref<string>("");
const imageUrl = ref<string>(props.modelValue || "");
const loading = ref<boolean>(false);

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== imageUrl.value) {
      imageUrl.value = newValue || "";
      previewUrl.value = newValue || "";
    }
  },
  { immediate: true }
);
const beforeUpload = async (file: File) => {
  console.log("File selected:", file.name, "Size:", file.size, "Type:", file.type);
  const isImage = file.type.startsWith("image/");
  if (!isImage) {
    message.warning("Vui lòng chọn file ảnh hợp lệ!");
    return false;
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Ảnh phải nhỏ hơn 2MB!");
    return false;
  }
  try {
    loading.value = true;
    message.loading({ content: "Đang tải ảnh lên...", key: "uploading" });
    const formData = new FormData();
    formData.append("image", file);
    const response = await Api.updateimgg(formData);
    console.log("Upload response received:", response);
    const uploadedUrl =
      response?.data?.url || response?.data?.data?.url || response?.url || "";

    if (uploadedUrl) {
      previewUrl.value = uploadedUrl;
      imageUrl.value = uploadedUrl;
      emit("update:modelValue", uploadedUrl);
      message.success({ content: "Tải ảnh thành công!", key: "uploading" });
      console.log("Upload success, URL:", uploadedUrl);
    } else {
      console.error("Invalid response structure:", response);
      message.error({ content: "Upload thất bại: Dữ liệu phản hồi không hợp lệ", key: "uploading" });
    }
  } catch (error: any) {
    console.error("Upload error details:", error);
    const msg =
      error.response?.data?.error?.message ||
      error.message ||
      "Không thể tải ảnh, vui lòng thử lại!";
    message.error({ content: `Upload thất bại: ${msg}`, key: "uploading" });
  } finally {
    loading.value = false;
  }
  return false; // Ngăn upload mặc định
};

const updateImageUrl = (value: string) => {
  imageUrl.value = value;
  previewUrl.value = value;
  emit("update:modelValue", value);
  message.info("Đã cập nhật URL ảnh thủ công!");
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
