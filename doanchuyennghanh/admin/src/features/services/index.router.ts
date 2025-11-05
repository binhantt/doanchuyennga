import type { RouteRecordRaw } from 'vue-router';

export const servicesRoutes: RouteRecordRaw[] = [
  {
    path: 'services',
    name: 'Services',
    component: () => import('./page/index.page.vue'),
    meta: {
      title: 'Quản lý dịch vụ',
      requiresAuth: true,
    },
  },
];

export default servicesRoutes;