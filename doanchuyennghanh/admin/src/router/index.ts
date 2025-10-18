import { createRouter, createWebHistory } from 'vue-router'
import adminRoutes   from '../features/Login/index.router'
import dashboardRouter from '../features/dashboard/index.router'
// Khai báo routes
const routes = [
  { path: '/', redirect: '/login' },
  ...adminRoutes  ,
  ...dashboardRouter,
]
 // 🪄 Cập nhật tiêu đề tab khi chuyển route
 
export const router = createRouter({
  history: createWebHistory(), 
  routes, 
  
})
router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} | Admin Panel` : "Admin Panel";
    const icon = to.meta.icon ; // fallback icon
  const link = document.querySelector("link[rel~='icon']") ||document.createElement("link");
  link.rel = "icon";
  link.href = icon;
  document.head.appendChild(link);
});
