import { Router } from "express";
import { buildGroupedRoutes } from "../../../shared";
import OrderController from "../Controller/OrderController";

const router = Router();

// Routes cho Mobile App - tra cứu đơn hàng
export const appRoutes = buildGroupedRoutes(router, [
  {
    basePath: "/auth",
    routes: [
      {
        method: "post",
        path: "/login-order",
        handler: OrderController.LoginWithOrderCode,
      },
    ],
  },
  {
    basePath: "/orders",
    routes: [
      {
        method: "get",
        path: "/code/:orderCode",
        handler: OrderController.GetByOrderCode,
      },
      {
        method: "get",
        path: "/customer/:orderCode",
        handler: OrderController.GetOrdersByCustomer,
      },
    ],
  },
]);