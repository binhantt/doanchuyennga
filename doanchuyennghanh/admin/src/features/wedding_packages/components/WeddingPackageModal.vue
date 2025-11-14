<template>
  <Modal
    :open="props.isOpen"
    :title="props.package ? 'Sửa gói cưới' : 'Thêm gói cưới mới'"
    @cancel="handleCancel"
    :footer="null"
    width="900px"
    centered
    :destroyOnClose="true"
    :maskClosable="false"
  >
    <Form
      :model="formData"
      :rules="rules"
      @finish="handleSubmit"
      layout="vertical"x
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
          <FormItem label="Số khách" name="guest_count">
            <InputNumber
              v-model:value="formData.guest_count"
              :min="1"
              placeholder="Số khách"
              style="width: 100%"
            />
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem label="Loại địa điểm" name="venue_type">
            <Select
              v-model:value="formData.venue_type"
              placeholder="Chọn loại địa điểm"
              style="width: 100%"
            >
              <SelectOption value="indoor">Trong nhà</SelectOption>
              <SelectOption value="outdoor">Ngoài trời</SelectOption>
              <SelectOption value="themed">Theo chủ đề</SelectOption>
            </Select>
          </FormItem>
        </Col>
      </Row>

      <FormItem label="Mô tả" name="description">
        <TextArea
          v-model:value="formData.description"
          :rows="4"
          placeholder="Nhập mô tả chi tiết về gói cưới, bao gồm các dịch vụ, tiện ích và đặc điểm nổi bật..."
        />
      </FormItem>

      <FormItem label="Ảnh gói cưới">
        <div class="space-y-4">
          <!-- Tab chọn loại ảnh -->
          <div class="flex gap-2 mb-4">
            <Button 
              :type="imageInputType === 'upload' ? 'primary' : 'default'"
              @click="imageInputType = 'upload'"
              size="small"
            >
              <UploadOutlined />
              Tải ảnh lên
            </Button>
            <Button 
              :type="imageInputType === 'url' ? 'primary' : 'default'"
              @click="imageInputType = 'url'"
              size="small"
            >
              <LinkOutlined />
              Nhập URL ảnh
            </Button>
          </div>

          <!-- Upload ảnh từ thiết bị -->
          <div v-if="imageInputType === 'upload'">
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
            <div class="text-xs text-gray-500 mt-2">
              Hỗ trợ: JPG, PNG. Kích thước tối đa: 2MB
            </div>
          </div>

          <!-- Nhập URL ảnh -->
          <div v-if="imageInputType === 'url'" class="space-y-3">
            <Input
              v-model:value="imageUrl"
              placeholder="Nhập URL ảnh (ví dụ: https://example.com/image.jpg)"
              @blur="handleImageUrlChange"
            >
              <template #prefix>
                <LinkOutlined class="text-gray-400" />
              </template>
            </Input>
            
            <!-- Preview ảnh từ URL -->
            <div v-if="imageUrl && isValidImageUrl" class="border rounded-lg p-4 bg-gray-50">
              <div class="text-sm text-gray-600 mb-2">Xem trước ảnh:</div>
              <img 
                :src="imageUrl" 
                alt="Preview" 
                class="max-w-full h-32 object-cover rounded border"
                @error="handleImageError"
                @load="handleImageLoad"
              />
            </div>
            
            <!-- Thông báo lỗi URL -->
            <div v-if="imageUrl && !isValidImageUrl" class="text-red-500 text-sm">
              URL ảnh không hợp lệ hoặc không thể tải được
            </div>
            
            <div class="text-xs text-gray-500">
              Nhập URL trực tiếp đến file ảnh (JPG, PNG, GIF, WebP)
            </div>
          </div>
        </div>
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
            {{ props.package ? 'Cập nhật' : 'Thêm mới' }}
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
import { ref, watch, reactive, computed } from 'vue';
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
  Select,
  message
} from 'ant-design-vue';
const { Option: SelectOption } = Select;
const { TextArea } = Input;
import { PlusOutlined, UploadOutlined, LinkOutlined } from '@ant-design/icons-vue';
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

console.log('🎭 WeddingPackageModal initialized');
console.log('📝 Initial props:', { isOpen: props.isOpen, package: props.package });

const formRef = ref();
const loading = ref(false);
const fileList = ref<UploadFile[]>([]);
const previewVisible = ref(false);
const previewImage = ref('');
const previewTitle = ref('');

// Image input type and URL handling
const imageInputType = ref<'upload' | 'url'>('upload');
const imageUrl = ref('');
const isValidImageUrl = ref(false);

const formData = reactive<WeddingPackage>({
  name: '',
  description: '',
  price: 0,
  guest_count: 1,
  venue_type: 'indoor',
  image_url: '',
});



const rules = {
  name: [{ required: true, message: 'Vui lòng nhập tên gói cưới!' }],
  price: [{ required: true, message: 'Vui lòng nhập giá gói!' }],
  guest_count: [{ required: true, message: 'Vui lòng nhập số khách!' }],
  venue_type: [{ required: true, message: 'Vui lòng chọn loại địa điểm!' }],
};

const resetForm = () => {
  Object.assign(formData, {
    name: '',
    description: '',
    price: 0,
    guest_count: 1,
    venue_type: 'indoor',
    image_url: '',
  });
  fileList.value = [];
  imageUrl.value = '';
  isValidImageUrl.value = false;
  imageInputType.value = 'upload';
  formRef.value?.resetFields();
};

const handleCancel = () => {
  console.log('❌ Modal cancel clicked');
  resetForm();
  emit('close');
  console.log('📤 Close event emitted');
};

const handleSubmit = async () => {
  try {
    loading.value = true;
    
    // Đảm bảo có đầy đủ dữ liệu
    const submitData = {
      id: props.package?.id,
      name: formData.name || '',
      description: formData.description || '',
      price: formData.price || 0,
      guest_count: formData.guest_count || 1,
      venue_type: formData.venue_type || 'indoor',
      image_url: '',
    };
    
    // Xử lý ảnh theo loại input
    if (imageInputType.value === 'upload' && fileList.value.length > 0 && fileList.value[0].originFileObj) {
      // Sử dụng file upload
      submitData.image_url = fileList.value[0].originFileObj as any;
    } else if (imageInputType.value === 'url' && imageUrl.value && isValidImageUrl.value) {
      // Sử dụng URL ảnh
      submitData.image_url = imageUrl.value;
    }

    console.log('📤 Submitting data:', submitData);
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

// Handle image URL input
const handleImageUrlChange = () => {
  if (imageUrl.value) {
    // Clear file list when using URL
    fileList.value = [];
    // Validate URL format
    const urlPattern = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i;
    if (urlPattern.test(imageUrl.value)) {
      isValidImageUrl.value = true;
      formData.image_url = imageUrl.value;
    } else {
      isValidImageUrl.value = false;
    }
  } else {
    isValidImageUrl.value = false;
    formData.image_url = '';
  }
};

const handleImageError = () => {
  isValidImageUrl.value = false;
  message.error('Không thể tải ảnh từ URL này');
};

const handleImageLoad = () => {
  isValidImageUrl.value = true;
  formData.image_url = imageUrl.value;
};

// Watch for image input type changes
watch(imageInputType, (newType) => {
  if (newType === 'upload') {
    // Clear URL when switching to upload
    imageUrl.value = '';
    isValidImageUrl.value = false;
  } else if (newType === 'url') {
    // Clear file list when switching to URL
    fileList.value = [];
  }
});

// Watch for props changes
watch(
  () => props.package,
  (newPackage, oldPackage) => {
    console.log('📦 Package prop changed:', { from: oldPackage, to: newPackage });
    console.log('🔓 Modal isOpen:', props.isOpen);
    
    // Chỉ xử lý khi modal đang mở
    if (!props.isOpen) {
      console.log('⏸️ Modal not open, skipping package update');
      return;
    }
    
    if (newPackage && newPackage.name !== undefined) {
      // Safely assign properties
      formData.name = newPackage.name || '';
      formData.description = newPackage.description || '';
      formData.price = newPackage.price || 0;
      formData.duration_hours = newPackage.duration_hours || 1;
      formData.max_guests = newPackage.max_guests || 1;
      formData.image_url = newPackage.image_url || '';
      formData.is_available = newPackage.is_available !== undefined ? newPackage.is_available : true;
      
      // Set up image data if exists
      if (newPackage.image_url) {
        // Check if it's a URL or file path
        if (newPackage.image_url.startsWith('http')) {
          // It's a URL
          imageInputType.value = 'url';
          imageUrl.value = newPackage.image_url;
          isValidImageUrl.value = true;
          fileList.value = [];
        } else {
          // It's a file path
          imageInputType.value = 'upload';
          fileList.value = [
            {
              uid: '-1',
              name: 'image.png',
              status: 'done',
              url: newPackage.image_url,
            },
          ];
          imageUrl.value = '';
          isValidImageUrl.value = false;
        }
      } else {
        fileList.value = [];
        imageUrl.value = '';
        isValidImageUrl.value = false;
        imageInputType.value = 'upload';
      }
    } else {
      resetForm();
    }
  }
);

watch(
  () => props.isOpen,
  (isOpen, wasOpen) => {
    console.log('🔄 Modal isOpen changed:', { from: wasOpen, to: isOpen });
    
    if (isOpen) {
      console.log('🚪 Modal opening, loading data...');
      // Khi modal mở, load dữ liệu từ props.package
      const packageData = props.package;
      if (packageData && packageData.name !== undefined) {
        formData.name = packageData.name || '';
        formData.description = packageData.description || '';
        formData.price = packageData.price || 0;
        formData.guest_count = packageData.guest_count || 1;
        formData.venue_type = packageData.venue_type || 'indoor';
        formData.image_url = packageData.image_url || '';
        
        // Set up image data if exists
        if (packageData.image_url) {
          // Check if it's a URL or file path
          if (packageData.image_url.startsWith('http')) {
            // It's a URL
            imageInputType.value = 'url';
            imageUrl.value = packageData.image_url;
            isValidImageUrl.value = true;
            fileList.value = [];
          } else {
            // It's a file path
            imageInputType.value = 'upload';
            fileList.value = [
              {
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: packageData.image_url,
              },
            ];
            imageUrl.value = '';
            isValidImageUrl.value = false;
          }
        } else {
          fileList.value = [];
          imageUrl.value = '';
          isValidImageUrl.value = false;
          imageInputType.value = 'upload';
        }
      } else {
        resetForm();
      }
    } else {
      resetForm();
    }
  }
);
</script>