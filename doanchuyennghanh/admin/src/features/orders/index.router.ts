const ordersRoutes = [
  {
    path: 'orders',
    name: 'Orders',
    component: () => import('./components/Orders.vue'),
    meta: {
      title: 'Quản lý đơn hàng',
      requiresAuth: true
    }
  }
];

export default ordersRoutes;