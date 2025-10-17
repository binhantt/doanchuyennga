import { Router } from "express";
import { buildGroupedRoutes } from "../../../shared";
import UserController from "../Controller/UserController";
import AthuController from "../Controller/AthuController";
import DisheController from "../Controller/DishesController";
import OrderCotroller from "../Controller/OrderCotroller";
const router = Router();
export const AdminRouter = buildGroupedRoutes(router, [
  {
    basePath: "/users",
    routes: [
      {
        method: "get",
        path: "/getall",
        handler: UserController.getAllUsers,
      },
      {
        method: "delete",
        path: "/delete/:id",
        handler: UserController.deteleUser,
      }
    ],
  },
  {
    basePath: "/athu",
    routes: [
      {
        method: "post",
        path: "/login",
        handler: AthuController.login,
      },
    ]
  },
  {
    basePath: "/dishes",
    routes: [
      {
        method: "get",
        path: "/",
        handler: DisheController.GetAll,
      }, 
      {
        method: "post",
        path: "/create",
        handler: DisheController.Create,
      },
      {
        method: "delete", 
        path: "/delete/:id",
        handler: DisheController.detele,
      }, 
      {
        method: "put",  
        path: "/update",
        handler: DisheController.Update,
      }, 
      
    ]
  },
  {
    basePath: "/orders",
    routes: [
      {
        method: "get",  
        path : "/getall",
        handler  : OrderCotroller.getAllOrders,
      },
      {
        method: "post",  
        path : "/create_food",
        handler  : OrderCotroller.CreateOrderfood,
      }
      
    ]
  }
]);
