import { Router } from "express";
import { buildGroupedRoutes } from "../../../shared";
import UserController from "../Controller/UserController";
import AthuController from "../Controller/AthuController";
import DisheController from "../Controller/DishesController";
import OrderCotroller from "../Controller/OrderCotroller";
import CategroyCotroller from "../Controller/CategroyCotroller";
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
        method: "post",
        path: "/create",
        handler: UserController.createUser, 
      },
      {
        method: "put",
        path: "/update/:id",
        handler: UserController.updateUser, 
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
        path: "/update/:id",
        handler: DisheController.Update,
      }, 
      
    ]
  },
  {
     basePath :  "/categories",
     routes : [
       {
          method : "get",
          path : "/",
           handler  : CategroyCotroller.GetALl ,
       },
       {
          method : "post",
          path : "/create",
           handler  : CategroyCotroller.Creacte,
       }, 
      {
          method : "delete",
          path : "/delete/:id",
           handler  : CategroyCotroller.delete,
      },
      {
          method : "put",
          path : "/update/:id",
           handler  : CategroyCotroller.updated,
      }
     ]
  } , 
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
