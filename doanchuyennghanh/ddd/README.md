# 🚀 HƯỚNG DẪN LÀM VIỆC VỚI BACKEND (DDD)

## 📋 TỔNG QUAN
Backend được xây dựng theo kiến trúc Clean Architecture với TypeScript, Express.js và Node.js, đảm bảo tách biệt rõ ràng giữa business logic và infrastructure.

## ⚡ CÀI ĐẶT VÀ CHẠY

### 1. Cài đặt dependencies
```bash
cd ddd
npm install
```

### 2. Setup environment
```bash
# Copy env example
cp .env.example .env

# Edit file .env với thông tin của bạn
PORT=3000
DATABASE_URL=mongodb://localhost:27017/your-db
JWT_SECRET=your-secret-key
```

### 3. Chạy development server
```bash
# Development mode
npm run dev

# Production mode
npm run build
npm start
```
→ Server chạy tại: http://localhost:3000

## 📁 CẤU TRÚC THƯ MỤC CHI TIẾT

```
src/
├── application/          # Use cases / Business logic
│   ├── interfaces/     # Port interfaces (contracts)
│   │   └── ICategoryService.ts
│   ├── services/       # Application services
│   │   └── CategoryService.ts
│   └── validators/     # Input validation
│       └── category.validator.ts
│
├── domain/             # Business entities & rules
│   ├── entities/       # Domain entities
│   │   └── Category.ts
│   ├── repositories/   # Repository interfaces
│   │   └── ICategoryRepository.ts
│   └── value-objects/ # Value objects
│       └── CategoryStatus.ts
│
├── infrastructure/     # External implementations
│   ├── config/        # Configuration
│   │   ├── database.ts
│   │   └── constants.ts
│   ├── database/      # Database implementations
│   │   └── models/    # Mongoose/Prisma models
│   ├── repositories/  # Repository implementations
│   │   └── CategoryRepository.ts
│   └── services/      # External service implementations
│       └── email.service.ts
│
├── interfaces/        # Interface adapters
│   ├── controllers/   # Route controllers
│   │   └── category.controller.ts
│   ├── middlewares/   # Express middlewares
│   │   ├── auth.middleware.ts
│   │   ├── validation.middleware.ts
│   │   └── error.middleware.ts
│   ├── routes/        # Route definitions
│   │   └── category.routes.ts
│   └── serializers/   # Response serializers
│       └── category.serializer.ts
│
├── shared/           # Shared utilities
│   ├── errors/       # Custom error classes
│   ├── utils/        # Utility functions
│   └── types/        # Global TypeScript types
│
├── types/            # Type definitions
│   └── api.types.ts
│
└── server.ts         # Application entry point
```

## 🎯 NGUYÊN TẮC CLEAN ARCHITECTURE

### 1. **Independence from Frameworks**
- Domain layer không phụ thuộc vào Express hay database
- Business logic được đặt trong domain và application layers

### 2. **Testability**
- Mỗi layer có thể test độc lập
- Sử dụng dependency injection để mock dependencies

### 3. **Separation of Concerns**
- **Domain**: Business rules và entities
- **Application**: Use cases và application logic
- **Infrastructure**: External dependencies (DB, API, etc.)
- **Interface**: Controllers và presenters

### 4. Dependency Rule
```
Interface Layer → Application Layer → Domain Layer ← Infrastructure Layer
```
- Dependencies chỉ đi vào trong (inward)
- Domain layer không phụ thuộc layer nào khác

## 🔧 CODE EXAMPLES

### 1. Domain Entity
```typescript
// src/domain/entities/Category.ts
export class Category {
  constructor(
    private readonly id: string,
    private name: string,
    private imageUrl: string,
    private createdAt: Date,
    private updatedAt: Date
  ) {}

  // Business logic
  updateName(newName: string): void {
    if (newName.length < 3) {
      throw new Error('Category name must be at least 3 characters')
    }
    this.name = newName
    this.updatedAt = new Date()
  }

  // Getters
  getId(): string { return this.id }
  getName(): string { return this.name }
  getImageUrl(): string { return this.imageUrl }
}
```

### 2. Repository Interface
```typescript
// src/domain/repositories/ICategoryRepository.ts
import { Category } from '../entities/Category'

export interface ICategoryRepository {
  findById(id: string): Promise<Category | null>
  findAll(): Promise<Category[]>
  save(category: Category): Promise<Category>
  delete(id: string): Promise<void>
}
```

### 3. Use Case (Application Service)
```typescript
// src/application/services/CategoryService.ts
import { ICategoryRepository } from '../../domain/repositories/ICategoryRepository'
import { Category } from '../../domain/entities/Category'

export class CategoryService {
  constructor(private categoryRepository: ICategoryRepository) {}

  async createCategory(name: string, imageUrl: string): Promise<Category> {
    // Business logic validation
    if (!name || name.trim().length === 0) {
      throw new Error('Category name is required')
    }

    const category = new Category(
      generateId(),
      name.trim(),
      imageUrl,
      new Date(),
      new Date()
    )

    return await this.categoryRepository.save(category)
  }

  async getAllCategories(): Promise<Category[]> {
    return await this.categoryRepository.findAll()
  }
}
```

### 4. Controller
```typescript
// src/interfaces/controllers/category.controller.ts
import { Request, Response } from 'express'
import { CategoryService } from '../../application/services/CategoryService'

export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  async createCategory(req: Request, res: Response): Promise<void> {
    try {
      const { name, imageUrl } = req.body
      const category = await this.categoryService.createCategory(name, imageUrl)
      
      res.status(201).json({
        success: true,
        data: category
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      })
    }
  }
}
```

### 5. Dependency Injection
```typescript
// src/infrastructure/config/dependencies.ts
import { CategoryService } from '../application/services/CategoryService'
import { CategoryRepository } from '../infrastructure/repositories/CategoryRepository'
import { CategoryController } from '../interfaces/controllers/category.controller'

// Create instances
const categoryRepository = new CategoryRepository()
const categoryService = new CategoryService(categoryRepository)
const categoryController = new CategoryController(categoryService)

export { categoryController }
```

## 🧪 TESTING

### Unit Test Example
```typescript
// src/domain/entities/__tests__/Category.test.ts
import { Category } from '../Category'

describe('Category Entity', () => {
  it('should create a valid category', () => {
    const category = new Category('1', 'Test Category', 'image.jpg', new Date(), new Date())
    expect(category.getName()).toBe('Test Category')
  })

  it('should throw error for short name', () => {
    const category = new Category('1', 'Test', 'image.jpg', new Date(), new Date())
    expect(() => category.updateName('ab')).toThrow('Category name must be at least 3 characters')
  })
})
```

### Integration Test
```typescript
// Test API endpoints
import request from 'supertest'
import app from '../../server'

describe('Category API', () => {
  it('POST /api/categories', async () => {
    const response = await request(app)
      .post('/api/categories')
      .send({ name: 'New Category', imageUrl: 'image.jpg' })
      
    expect(response.status).toBe(201)
    expect(response.body.success).toBe(true)
  })
})
```

## 🔍 DEBUGGING

### Common Issues
1. **Circular Dependencies**: Check import statements
2. **Database Connection**: Verify connection string
3. **TypeScript Errors**: Check tsconfig.json
4. **Missing Dependencies**: Run `npm install`

### Debug Middleware
```typescript
// src/interfaces/middlewares/debug.middleware.ts
export const debugMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
  console.log('Headers:', req.headers)
  console.log('Body:', req.body)
  next()
}
```

## 📚 BEST PRACTICES

### 1. Error Handling
```typescript
// Always wrap in try-catch
async handleRequest(req: Request, res: Response) {
  try {
    // Logic here
  } catch (error) {
    logger.error('Request failed:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
```

### 2. Logging
```typescript
// Use structured logging
import winston from 'winston'

export const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
})
```

### 3. Validation
```typescript
// Validate input early
import Joi from 'joi'

const categorySchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  imageUrl: Joi.string().uri().optional()
})
```

## 🚀 DEPLOYMENT

### 1. Environment Setup
```bash
# Production environment variables
NODE_ENV=production
PORT=3000
DATABASE_URL=mongodb://prod-db:27017/myapp
JWT_SECRET=your-production-secret
```

### 2. Docker Setup
```dockerfile
# Dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### 3. PM2 Process Manager
```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start dist/server.js --name "backend-api"

# Monitor
pm2 monit
```

---
**Happy backend coding! 🎉**

Dependencies chỉ đi từ layer ngoài vào trong, layer trong không biết về layer ngoài.