import { Router  } from "express";
import { buildGroupedRoutes } from "../../../shared";
import UserController from "../Controller/UserController";
import ServicesControllers from "../Controller/ServicesControllers";
import weddingPackageController from "../Controller/WeddingPackageController";
import OrderController from "../Controller/OrderController";
import DisheController from "../Controller/DishesController";
import VoucherController from "../Controller/VoucherCotrollers";
import CategroyCotroller from "../Controller/CategroyCotroller";

const router = Router();
export const userRoutes = buildGroupedRoutes(router, [
  {
    basePath: "/",
    routes: [
      {
        method: "post",  
        path: "/create",
        handler:UserController.createUser , 
      },
    ],
  },
  {
    basePath : "/services",
    routes :[
      {
        method: "post",  
        path: "/create",
        handler : ServicesControllers.Create
      },
      {
        method: "get",  
        path: "/",
        handler : ServicesControllers.GetAll
      },
      {
        method: "get",  
        path: "/available",
        handler : ServicesControllers.GetAvailable
      }
    ]
  },
  {
    basePath : "/wedding-packages",
    routes :[
      {
        method: "get",  
        path: "/",
        handler : weddingPackageController.GetAll
      },
      {
        method: "get",  
        path: "/featured",
        handler : weddingPackageController.GetFeatured
      }
    ]
  },
  {
    basePath : "/orders",
    routes :[
      {
        method: "post",  
        path: "/",
        handler : OrderController.Create
      },
      {
        method: "get",  
        path: "/:id",
        handler : OrderController.GetById
      }
    ]
  },
  {
    basePath : "/dishes",
    routes :[
      {
        method: "get",  
        path: "/",
        handler : DisheController.GetAll
      }
    ]
  },
  {
    basePath : "/vouchers",
    routes :[
      {
        method: "get",  
        path: "/",
        handler : VoucherController.getAllVouchers
      },
      {
        method: "get",  
        path: "/code/:code",
        handler : VoucherController.getVoucherByCode
      },
    
    ]
  },

]);