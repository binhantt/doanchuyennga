# Wedding Packages - User Frontend

Trang frontend Next.js cho người dùng chọn gói cưới và dịch vụ.

## Tính năng

- ✅ Xem danh sách gói cưới
- ✅ Xem danh sách dịch vụ thêm
- ✅ Chọn gói cưới và dịch vụ
- ✅ Tính tổng giá tự động
- ✅ Quản lý state với Zustand (tương đương Pinia)
- ✅ Responsive design với Tailwind CSS

## Cấu trúc thư mục

```
features/wedding-packages/
├── types/index.ts              # Type definitions
├── store/useWeddingStore.ts    # Zustand store (tương đương Pinia)
├── api/weddingApi.ts          # API calls
├── hooks/useWeddingData.ts    # Custom hooks
├── components/
│   ├── PackageCard.tsx        # Card hiển thị gói cưới
│   ├── ServiceCard.tsx        # Card hiển thị dịch vụ
│   └── SelectionSummary.tsx   # Tóm tắt lựa chọn
└── index.ts                   # Export tất cả
```

## Cách sử dụng

1. **Khởi chạy backend API** (port 3001):
   ```bash
   cd doanchuyennghanh/ddd
   npm run dev
   ```

2. **Khởi chạy frontend** (port 3000):
   ```bash
   cd doanchuyennghanh/users
   npm run dev
   ```

3. **Truy cập trang**: http://localhost:3000/wedding-packages

## API Endpoints được sử dụng

- `GET /api/wedding-packages` - Lấy danh sách gói cưới
- `GET /api/services` - Lấy danh sách dịch vụ
- `GET /api/services/available` - Lấy dịch vụ khả dụng
- `GET /api/services/category/:id` - Lấy dịch vụ theo danh mục

## Store Management (Zustand)

Store quản lý:
- Danh sách gói cưới và dịch vụ
- Lựa chọn hiện tại của người dùng
- Tính tổng giá tự động
- Loading và error states

## Tùy chỉnh

- Thay đổi API URL trong `.env.local`
- Tùy chỉnh giao diện trong các component
- Thêm validation trong store
- Thêm tính năng đặt hàng

## Dependencies

- Next.js 15
- React 19
- Zustand (state management)
- Axios (HTTP client)
- Tailwind CSS (styling)
- TypeScript