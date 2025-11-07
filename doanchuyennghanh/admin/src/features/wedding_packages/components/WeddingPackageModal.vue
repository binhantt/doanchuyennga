<template>
  <Modal
    :open="isOpen"
    :title="package ? 'Sửa gói cưới' : 'Thêm gói cưới mới'"
    @cancel="handleCancel"
    :footer="null"
    width="600px"
  >
    <Form
      :model="formData"
      :rules="rules"
      @finish="handleSubmit"
      layout="vertical"
      ref="formRef"
    >
      <Row :gutter="16">
        <Col :span="12">
          <FormItem label="Tên gói cưới" name="name">
            <Input v-model:value="formData.name" placeholder="Nhập tên gói cưới" />
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem label="Giá (VNĐ)" name="price">
            <InputNumber
              v-model:value="formData.price"
              :min="0"
              :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
              :parser="value => value.replace(/\$\s?|(,*)/g, '')"
              placeholder="Nhập giá gói"
              style="width: 100%"
            />
          </FormItem>
        </Col>
      </Row>

      <Row :gutter="16">
        <Col :span="12">
          <FormItem label="Thời gian (giờ)" name="duration_hours">
            <InputNumber
              v-model:value="formData.duration_hours"
              :min="1"
              :max="24"
              placeholder="Số giờ"
              style="width: 100%"
            />
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem label="Số khách tối đa" name="max_guests">
            <InputNumber
              v-model:value="formData.max_guests"
              :min="1"
              placeholder="Số khách"
              style="width: 100%"
            />
          </FormItem>
        </Col>
      </Row>

      <FormItem label="Mô tả" name="description">
        <TextArea
          v-model:value="formData.description"
          :rows="4"
          placeholder="Nhập mô tả gói cưới"
        />
      </FormItem>

      <FormItem label="Ảnh gói cưới" name="image">
        <Upload
          v-model:file-list="fileList"
          :before-upload="beforeUpload"
          list-type="picture-card"
          :max-count="1"
          @preview="handlePreview"
          @remove="handleRemove"
        >
          <div v-if="fileList.length < 1">
            <PlusOutlined />
            <div style="margin-top: 8px">Tải ảnh lên</div>
          </div>
        </Upload>
      </FormItem>

      <FormItem label="Trạng thái" name="is_available">
        <Switch
          v-model:checked="formData.is_available"
          checked-children="Có sẵn"
          un-checked-children="Không có sẵn"
        />
      </FormItem>

      <FormItem>
        <div class="flex justify-end gap-2">
          <Button @click="handleCancel">Hủy</Button>
          <Button type="primary" html-type="submit" :loading="loading">
            {{ package ? 'Cập nhật' : 'Thêm mới' }}
          </Button>
        </div>
      </FormItem>
    </Form>

    <!-- Preview Modal -->
    <Modal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancelPreview">
      <img alt="preview" style="width: 100%" :src="previewImage" />
    </Modal>
  </Modal>
</template>

<script setup lang="ts">
import { ref, watch, reactive } from 'vue';
import {
  Modal,
  Form,
  FormItem,
  Input,
  InputNumber,
  Button,
  Upload,
  Switch,
  Row,
  Col,
  message
} from 'ant-design-vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import type { WeddingPackage } from '../store/Store';
import type { UploadFile, UploadProps } from 'ant-design-vue';

interface Props {
  isOpen: boolean;
  package?: WeddingPackage | null;
}

interface Emits {
  (e: 'close'): void;
  (e: 'save', data: WeddingPackage): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const formRef = ref();
const loading = ref(false);
const fileList = ref<UploadFile[]>([]);
const previewVisible = ref(false);
const previewImage = ref('');
const previewTitle = ref('');

const formData = reactive<WeddingPackage>({
  name: '',
  description: '',
  price: 0,
  duration_hours: 1,
  max_guests: 1,
  image_url: '',
  is_available: true,
});

const rules = {
  name: [{ required: true, message: 'Vui lòng nhập tên gói cưới!' }],
  price: [{ required: true, message: 'Vui lòng nhập giá gói!' }],
  duration_hours: [{ required: true, message: 'Vui lòng nhập thời gian!' }],
  max_guests: [{ required: true, message: 'Vui lòng nhập số khách!' }],
};

const resetForm = () => {
  Object.assign(formData, {
    name: '',
    description: '',
    price: 0,
    duration_hours: 1,
    max_guests: 1,
    image_url: '',
    is_available: true,
  });
  fileList.value = [];
  formRef.value?.resetFields();
};

const handleCancel = () => {
  resetForm();
  emit('close');
};

const handleSubmit = async () => {
  try {
    loading.value = true;
    
    const submitData = { ...formData };
    
    // Xử lý file upload nếu có
    if (fileList.value.length > 0 && fileList.value[0].originFileObj) {
      submitData.image_url = fileList.value[0].originFileObj as any;
    }

    emit('save', submitData);
    resetForm();
  } catch (error) {
    console.error('Lỗi khi submit form:', error);
  } finally {
    loading.value = false;
  }
};

const beforeUpload: UploadProps['beforeUpload'] = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('Chỉ có thể tải lên file JPG/PNG!');
    return false;
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Ảnh phải nhỏ hơn 2MB!');
    return false;
  }
  return false; // Prevent auto upload
};

const handlePreview = async (file: UploadFile) => {
  if (!file.url && !file.preview) {
    file.preview = await getBase64(file.originFileObj as File);
  }
  previewImage.value = file.url || file.preview || '';
  previewVisible.value = true;
  previewTitle.value = file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1);
};

const handleRemove = () => {
  fileList.value = [];
};

const handleCancelPreview = () => {
  previewVisible.value = false;
};

const getBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

// Watch for props changes
watch(
  () => props.package,
  (newPackage) => {
    if (newPackage) {
      Object.assign(formData, newPackage);
      
      // Set up file list if image exists
      if (newPackage.image_url) {
        fileList.value = [
          {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: newPackage.image_url,
          },
        ];
      }
    } else {
      resetForm();
    }
  },
  { immediate: true }
);

watch(
  () => props.isOpen,
  (isOpen) => {
    if (!isOpen) {
      resetForm();
    }
  }
);
</script>