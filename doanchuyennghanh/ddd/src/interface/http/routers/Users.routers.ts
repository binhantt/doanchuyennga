import { Router  } from "express";
import { buildGroupedRoutes } from "../../../shared";
import UserController from "../Controller/UserController";
import ServicesControllers from "../Controller/ServicesControllers";
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
      }
    ]
  }
]);