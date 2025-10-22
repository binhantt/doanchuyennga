# 🚀 HƯỚNG DẪN LÀM VIỆC VỚI DỰ ÁN ADMIN

## 📋 TỔNG QUAN
Dự án admin sử dụng Vue 3 + TypeScript + Vite, được thiết kế theo kiến trúc feature-based với các components có thể tái sử dụng.

## ⚡ CÀI ĐẶT VÀ CHẠY

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Chạy development server
```bash
npm run dev
```
→ Truy cập: http://localhost:5173

### 3. Build production
```bash
npm run build
```

## 📁 CẤU TRÚC THƯ MỤC

```
src/
├── components/          # Components dùng chung
│   ├── common/        # Components chung cho toàn bộ app
│   │   ├── input/     # Input components (BaseInput, BaseImage, ...)
│   │   ├── modal/     # Modal components
│   │   └── button/    # Button components
├── features/          # Tính năng theo module
│   └── categories/    # Module quản lý danh mục
│       ├── components/  # Components của danh mục
│       ├── services/    # API services
│       └── types/       # TypeScript types
├── router/             # Vue Router configuration
├── types/              # Global TypeScript types
├── hooks/              # Custom composables
└── utils/              # Utility functions
```

## 🎯 QUY TRÌNH PHÁT TRIỂN

### 1. Tạo Feature Mới
```bash
# Tạo folder feature mới
mkdir src/features/[tên-feature]
cd src/features/[tên-feature]

# Tạo cấu trúc
mkdir components services types
```

### 2. Tạo Component Mới
```typescript
<!-- Component template -->
<template>
  <div class="component-name">
    <!-- Nội dung -->
  </div>
</template>

<script setup lang="ts">
// Import statements
import { ref, computed } from 'vue'

// Props & Emits
const props = defineProps<{
  // prop definitions
}>()

const emit = defineEmits<{
  // emit definitions
}>()

// Reactive data
const localState = ref('')

// Methods
const handleAction = () => {
  // Logic here
}
</script>

<style scoped>
/* Component styles */
</style>
```

### 3. Tạo Service API
```typescript
// src/features/[feature]/services/api.ts
import axios from 'axios'
import type { YourType } from '../types'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export const featureService = {
  async getAll(): Promise<YourType[]> {
    const response = await axios.get(`${API_BASE}/api/feature`)
    return response.data
  },
  
  async create(data: YourType): Promise<YourType> {
    const response = await axios.post(`${API_BASE}/api/feature`, data)
    return response.data
  }
}
```

### 4. TypeScript Types
```typescript
// src/features/[feature]/types/index.ts
export interface Feature {
  id: string
  name: string
  description?: string
  createdAt: Date
  updatedAt: Date
}
```

## 🔧 COMPONENTS CHUNG

### BaseInput
```vue
<BaseInput
  v-model="form.name"
  label="Tên"
  placeholder="Nhập tên..."
  required
  :error="errors.name"
/>
```

### BaseModal
```vue
<BaseModal
  :isOpen="isModalOpen"
  title="Tiêu đề modal"
  @submit="handleSubmit"
  @close="handleClose"
>
  <!-- Nội dung modal -->
</BaseModal>
```

### BaseImage (Upload ảnh)
```vue
<BaseImage
  v-model="form.image_url"
  label="Hình ảnh"
  uploadText="Tải ảnh lên"
  :show-url-input="true"
/>
```

## 🎨 STYLING & CSS

### Tailwind CSS Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        }
      }
    },
  },
  plugins: [],
}
```

### Component Styling Patterns
```vue
<!-- Global styles -->
<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold text-gray-900">Title</h1>
    </div>
  </div>
</template>

<!-- Scoped component styles -->
<style scoped>
.custom-class {
  @apply bg-white rounded-lg shadow-sm border;
}
</style>
```

### Responsive Design
```vue
<!-- Mobile first approach -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <!-- Content -->
</div>

<!-- Breakpoint examples -->
<div class="text-sm md:text-base lg:text-lg">
  <!-- Responsive text -->
</div>
```

### Dark Mode Support
```vue
<!-- Dark mode classes -->
<div class="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  <!-- Dark mode support -->
</div>
```

### Custom Utility Classes
```css
/* src/style.css */
@layer utilities {
  .text-shadow {
    text-shadow: 0 2px 4px rgba(0,0,0,0.10);
  }
  
  .bg-gradient-custom {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
}
```

### Component-specific Styling
```vue
<script setup>
// Dynamic classes
const buttonClasses = computed(() => ({
  'bg-blue-500 hover:bg-blue-600': !disabled,
  'bg-gray-300 cursor-not-allowed': disabled,
  'px-4 py-2 rounded-lg font-medium': true
}))
</script>

<template>
  <button :class="buttonClasses">
    Click me
  </button>
</template>
```

### CSS Organization
```
assets/
├── css/
│   ├── main.css          # Global styles
│   ├── components.css    # Component utilities
│   └── animations.css    # Custom animations
└── tailwind.css         # Tailwind directives
```

### Best Practices
1. **Mobile-first**: Start with mobile styles
2. **Consistent spacing**: Use Tailwind spacing scale
3. **Semantic colors**: Use meaningful color names
4. **Dark mode**: Consider dark mode from start
5. **Performance**: Avoid inline styles when possible
6. **Accessibility**: Ensure proper contrast ratios

### Common Patterns
```vue
<!-- Card component -->
<div class="bg-white rounded-lg shadow-md p-6 border">
  <h3 class="text-lg font-semibold text-gray-900 mb-2">Card Title</h3>
  <p class="text-gray-600">Card content</p>
</div>

<!-- Form styling -->
<form class="space-y-4">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <BaseInput label="Name" v-model="form.name" />
    <BaseInput label="Email" v-model="form.email" type="email" />
  </div>
</form>

<!-- Button variants -->
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-danger">Danger</button>
```

## 🐛 DEBUG & TESTING

### Console Debugging
```typescript
// Development only
if (import.meta.env.DEV) {
  console.log('Debug info:', data)
}

// Component lifecycle debugging
import { onMounted, onUpdated } from 'vue'

onMounted(() => {
  console.log('Component mounted:', componentName)
})

onUpdated(() => {
  console.log('Component updated:', data.value)
})
```

### Vue DevTools Debugging
```vue
<!-- Add debugging info -->
<template>
  <div>
    <!-- Debug component state -->
    <div v-if="import.meta.env.DEV" class="debug-info">
      <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
    </div>
  </div>
</template>
```

### API Testing
```typescript
// Test API calls
const testApiCall = async () => {
  try {
    console.log('API Request:', { url, method, data })
    const response = await apiCall()
    console.log('API Response:', response)
    return response
  } catch (error) {
    console.error('API Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    })
    throw error
  }
}
```

### Performance Testing
```typescript
// Measure component render time
const startTime = performance.now()

onMounted(() => {
  const endTime = performance.now()
  console.log(`Component render time: ${endTime - startTime}ms`)
})
```

### Common Issues & Solutions

#### 1. Component không hiện
```bash
# Check import
import ComponentName from './ComponentName.vue'

# Check registration
export default {
  components: { ComponentName }
}
```

#### 2. Props không truyền
```vue
<!-- Check prop names -->
<MyComponent :user-data="userData" /> <!-- kebab-case -->

<!-- In component -->
const props = defineProps<{
  userData: User // camelCase
}>()
```

#### 3. API call failed
```typescript
// Check CORS
const config = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
}

// Check network
if (navigator.onLine) {
  // Make API call
} else {
  console.error('No internet connection')
}
```

#### 4. TypeScript errors
```typescript
// Check interface definitions
interface User {
  id: number
  name: string
  email?: string // optional
}

// Type assertions
const user = ref<User | null>(null)
```

### Testing Tools
```bash
# Install testing dependencies
npm install -D @vue/test-utils vitest jsdom

# Create test file
# src/components/__tests__/ComponentName.test.ts
import { mount } from '@vue/test-utils'
import ComponentName from '../ComponentName.vue'

test('component renders properly', () => {
  const wrapper = mount(ComponentName, {
    props: { msg: 'Hello' }
  })
  expect(wrapper.text()).toContain('Hello')
})
```

## 📋 CHECKLIST TRƯỚC KHI COMMIT

### Code Quality
- [ ] Code chạy không lỗi (npm run dev)
- [ ] Console clean (no debug logs)
- [ ] TypeScript compile successfully (npm run type-check)
- [ ] Không có console.log() trong production code
- [ ] Không có commented code không cần thiết

### Component Testing
- [ ] Components test thủ công
- [ ] Props validation đầy đủ
- [ ] Events hoạt động đúng
- [ ] Loading states implemented
- [ ] Error handling đầy đủ

### Design & UX
- [ ] Responsive design checked (mobile, tablet, desktop)
- [ ] Dark mode support (nếu có)
- [ ] Accessibility standards (ARIA labels, keyboard navigation)
- [ ] Consistent spacing và typography
- [ ] Cross-browser compatibility

### Performance
- [ ] Không có unnecessary re-renders
- [ ] Images optimized (lazy loading)
- [ ] API calls có proper caching
- [ ] Bundle size không quá lớn

### Security
- [ ] Input validation đầy đủ
- [ ] XSS prevention (v-html cẩn thận)
- [ ] Sensitive data không expose trong console
- [ ] API authentication đúng cách

### Documentation
- [ ] Code có comments cho logic phức tạp
- [ ] Props documented
- [ ] Events documented
- [ ] README updated (nếu cần)

### Git Commit
```bash
# Format commit message
git commit -m "type: description"

# Types:
# feat: New feature
# fix: Bug fix
# docs: Documentation
# style: Code style changes
# refactor: Code refactoring
# test: Adding tests
# chore: Maintenance tasks
```

### Pre-commit Commands
```bash
# Run before commit
npm run lint          # Check code style
npm run type-check    # TypeScript check
npm run build         # Build test
npm run test          # Run tests (nếu có)
```

## 🚀 DEPLOYMENT
1. Build project: `npm run build`
2. Upload `dist/` folder lên hosting
3. Configure environment variables
4. Setup API endpoints

## 📚 TÀI LIỆU THAM KHẢO
- [Vue 3 Documentation](https://vuejs.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---
**Happy coding! 🎉**
