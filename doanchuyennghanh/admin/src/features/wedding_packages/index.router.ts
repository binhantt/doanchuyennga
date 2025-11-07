import type { RouteRecordRaw } from "vue-router";

const weddingPackagesRoutes: RouteRecordRaw[] = [
  {
    path: "wedding-packages",
    name: "WeddingPackages",
    component: () => import("./components/WeddingPackages.vue"),
    meta: {
      title: "Quản lý gói cưới",
      requiresAuth: true,
    },
  },
];

export default weddingPackagesRoutes;