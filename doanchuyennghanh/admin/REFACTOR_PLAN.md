# 🎯 ADMIN PANEL REFACTOR PLAN

## 📁 Cấu trúc thư mục mới (Professional Structure)

```
src/
├── 📁 assets/                    # Static assets
│   ├── images/
│   ├── icons/
│   └── styles/
│       ├── globals.css
│       ├── variables.css
│       └── components.css
│
├── 📁 components/                # Shared components
│   ├── ui/                      # Basic UI components
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Modal/
│   │   ├── Table/
│   │   └── index.ts
│   ├── layout/                  # Layout components
│   │   ├── AppLayout.vue
│   │   ├── Sidebar.vue
│   │   ├── Header.vue
│   │   └── index.ts
│   └── common/                  # Common business components
│       ├── DataTable/
│       ├── SearchFilter/
│       └── index.ts
│
├── 📁 composables/              # Shared composables
│   ├── useApi.ts
│   ├── useAuth.ts
│   ├── usePagination.ts
│   ├── useModal.ts
│   └── index.ts
│
├── 📁 constants/                # App constants
│   ├── api.ts
│   ├── routes.ts
│   ├── status.ts
│   └── index.ts
│
├── 📁 features/                 # Feature modules
│   ├── auth/
│   │   ├── components/
│   │   ├── composables/
│   │   ├── services/
│   │   ├── stores/
│   │   ├── types/
│   │   └── index.ts
│   ├── dashboard/
│   ├── orders/
│   ├── users/
│   ├── products/
│   └── ...
│
├── 📁 services/                 # API services
│   ├── api.ts
│   ├── auth.service.ts
│   ├── orders.service.ts
│   └── index.ts
│
├── 📁 stores/                   # Global stores
│   ├── auth.store.ts
│   ├── app.store.ts
│   └── index.ts
│
├── 📁 types/                    # Global types
│   ├── api.ts
│   ├── common.ts
│   ├── entities.ts
│   └── index.ts
│
├── 📁 utils/                    # Utility functions
│   ├── format.ts
│   ├── validation.ts
│   ├── helpers.ts
│   └── index.ts
│
├── 📁 router/
│   ├── index.ts
│   ├── guards.ts
│   └── routes.ts
│
├── App.vue
└── main.ts
```

## 🎯 Nguyên tắc refactor:

### 1. **Naming Convention**
- PascalCase cho components: `UserTable.vue`, `OrderModal.vue`
- camelCase cho files: `userService.ts`, `orderTypes.ts`
- kebab-case cho routes: `/user-management`, `/order-details`

### 2. **Type Safety**
- Tất cả API responses phải có types
- Strict TypeScript configuration
- Interface cho tất cả props và emits

### 3. **Code Organization**
- Mỗi feature là một module độc lập
- Shared logic trong composables
- Constants tập trung
- Error handling thống nhất

### 4. **Performance**
- Lazy loading cho routes
- Component lazy loading
- Optimized bundle splitting

### 5. **Developer Experience**
- Auto-import setup
- ESLint + Prettier
- Husky pre-commit hooks
- Component documentation

## 🔧 Implementation Steps:

### Phase 1: Core Infrastructure
1. Setup new folder structure
2. Create base types and constants
3. Refactor shared components
4. Setup composables

### Phase 2: Feature Migration
1. Migrate auth module
2. Migrate dashboard
3. Migrate orders (already partially done)
4. Migrate users
5. Migrate products

### Phase 3: Optimization
1. Performance optimization
2. Error handling improvement
3. Testing setup
4. Documentation

## 📋 Checklist:

- [ ] Setup new folder structure
- [ ] Create global types
- [ ] Refactor shared components
- [ ] Create composables
- [ ] Migrate features one by one
- [ ] Add error handling
- [ ] Performance optimization
- [ ] Documentation