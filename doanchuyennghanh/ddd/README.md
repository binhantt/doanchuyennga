# Cấu Trúc Backend

Dự án backend được xây dựng theo kiến trúc Clean Architecture với TypeScript và Express.js.

## Cấu Trúc Thư Mục

```
src/
├── application/          # Use cases / Business logic
│   ├── interfaces/      # Port interfaces
│   ├── services/        # Application services
│   └── validators/      # Input validation
│
├── domain/              # Business entities & rules
│   ├── entities/        # Domain entities
│   ├── repositories/    # Repository interfaces
│   └── value-objects/   # Value objects
│
├── infrastructure/      # External implementations
│   ├── config/         # Configuration
│   ├── database/       # Database implementations
│   ├── repositories/   # Repository implementations
│   └── services/       # External service implementations
│
├── interfaces/          # Interface adapters
│   ├── controllers/    # Route controllers
│   ├── middlewares/    # Express middlewares
│   ├── routes/         # Route definitions
│   └── serializers/    # Response serializers
│
├── types/              # TypeScript type definitions
│
└── server.ts           # Application entry point
```

## Mô Tả Chi Tiết

### 1. Application Layer
- **interfaces/**: Định nghĩa các port interface cho giao tiếp giữa các layer
- **services/**: Chứa business logic và use cases
- **validators/**: Xử lý validation input data

### 2. Domain Layer
- **entities/**: Các business entities core
- **repositories/**: Interface cho repositories
- **value-objects/**: Các value objects không thay đổi

### 3. Infrastructure Layer  
- **config/**: Cấu hình ứng dụng (database, cache, etc.)
- **database/**: Implementation cho database connections
- **repositories/**: Implementation của repository interfaces
- **services/**: Implementation của external services

### 4. Interface Layer
- **controllers/**: Xử lý requests và responses
- **middlewares/**: Express middlewares (auth, validation, etc.)
- **routes/**: Định nghĩa API routes
- **serializers/**: Format response data

## Nguyên Tắc Clean Architecture

1. **Independence from Frameworks**: Core business logic không phụ thuộc framework
2. **Testability**: Dễ dàng test từng layer riêng biệt
3. **Independence from UI**: Business rules không phụ thuộc interface
4. **Independence from Database**: Business rules không phụ thuộc database
5. **Independence from External Agency**: Business rules không biết về external interfaces

## Luồng Dependencies

```
Interface Layer → Application Layer → Domain Layer ← Infrastructure Layer
```

Dependencies chỉ đi từ layer ngoài vào trong, layer trong không biết về layer ngoài.