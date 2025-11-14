import { createRouter, createWebHistory } from 'vue-router'
import adminRoutes from '../features/Login/index.router'
import dashboardRouter from '../features/dashboard/index.router'
import logoutRouter from '../features/logout/index.router'






// Khai báo routes
const routes = [
  { path: '/', redirect: '/login' ,  },
  ...adminRoutes,
  ...dashboardRouter,
  ...logoutRouter,


] 

export const router = createRouter({
  history: createWebHistory(), 
  routes, 
})
function getCookie(name: string) {
  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((row) => row.startsWith(name + "="));
  return tokenCookie ? tokenCookie.split("=")[1] : null;
}
router.beforeEach((to, from, next) => {
  const isAuthenticated = getCookie('token') !== null;
  console.log("Authenticated:", isAuthenticated);

  // Nếu route yêu cầu đăng nhập mà chưa có token -> về login
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/login');
  } 
  // Nếu đã đăng nhập mà truy cập login -> chuyển sang dashboard
  else if (to.path === '/login' && isAuthenticated) {
    next('/admin/dashboard');
  } 
  else {
    next();
  }
});

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} | Admin Panel` : "Admin Panel";
  const icon = to.meta.icon as string; // Explicitly cast to string
  const link: HTMLLinkElement = (document.querySelector("link[rel~='icon']") || document.createElement("link")) as HTMLLinkElement;
  link.rel = "icon";
  link.href = icon;
  document.head.appendChild(link);
});
