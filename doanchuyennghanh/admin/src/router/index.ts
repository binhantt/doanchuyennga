import { createRouter, createWebHistory } from 'vue-router'
import adminRoutes   from '../features/Login/LoginAdmin.router'

// Khai báo routes
const routes = [
  { path: '/', redirect: '/login' },
  ...adminRoutes  
]

// Tạo router
export const router = createRouter({
  history: createWebHistory(), 
  routes,
})
