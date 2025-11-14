import { Router } from "express";
import { buildGroupedRoutes } from "../../../shared";
import { uploadSingle } from "../../../infrastructure/http/multer";
import UserController from "../Controller/UserController";
import AthuController from "../Controller/AthuController";
import DisheController from "../Controller/DishesController";
import CategroyCotroller from "../Controller/CategroyCotroller";
import VoucherController from "../Controller/VoucherCotrollers";
import WeddingPackageController from "../Controller/WeddingPackageController";
import PackageDishController from "../Controller/PackageDishController";
import OrderController from "../Controller/OrderController";
import PackageController from "../Controller/PackageController";
import ServiceControllers from "../Controller/ServicesControllers";
import ServiceDishController from "../Controller/ServiceDishController";

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
        path: "/",
        handler: OrderController.GetAll,
      },
      {
        method: "get",
        path: "/statistics",
        handler: OrderController.GetStatistics,
      },
      {
        method: "get",
        path: "/date-range",
        handler: OrderController.GetByDateRange,
      },
      {
        method: "get",
        path: "/status/:status",
        handler: OrderController.GetByStatus,
      },
      {
        method: "get",
        path: "/user/:userId",
        handler: OrderController.GetByUserId,
      },
      {
        method: "get",
        path: "/:id",
        handler: OrderController.GetById,
      },
      {
        method: "post",
        path: "/create",
        handler: OrderController.Create,
      },
      {
        method: "post",
        path: "/create-with-voucher",
        handler: OrderController.CreateWithVoucher,
      },
      {
        method: "put",
        path: "/update-status/:id",
        handler: OrderController.UpdateStatus,
      },
    
    ]
  },
  {
    basePath: "/vouchers",
    routes: [
      {
        method: "get",
        path: "/",
        handler: VoucherController.getAllVouchers,
      },
      {
        method: "get",
        path: "/:id",
        handler: VoucherController.getVoucherById,
      },
      {
        method: "get",
        path: "/code/:code",
        handler: VoucherController.getVoucherByCode,
      },
      {
        method: "post",
        path: "/create",
        handler: VoucherController.createVoucher,
      },
      {
        method: "put",
        path: "/update/:id",
        handler: VoucherController.updateVoucher,
      },
      {
        method: "delete",
        path: "/delete/:id",
        handler: VoucherController.deleteVoucher,
      }
    ]
  },
  {
    basePath: "/wedding-packages",
    routes: [
      {
        method: "get",
        path: "/",
        handler: WeddingPackageController.GetAll,
      },
      {
        method: "post",
        path: "/create",
        handler: (req: any, res: any) => {
          uploadSingle(req, res, (err: any) => {
            if (err) {
              return res.status(400).json({
                success: false,
                error: err.message
              });
            }
            WeddingPackageController.Create(req, res);
          });
        },
      },
      {
        method: "put",
        path: "/update/:id",
        handler: (req: any, res: any) => {
          uploadSingle(req, res, (err: any) => {
            if (err) {
              return res.status(400).json({
                success: false,
                error: err.message
              });
            }
            WeddingPackageController.Update(req, res);
          });
        },
      },
      {
        method: "delete",
        path: "/delete/:id",
        handler: WeddingPackageController.Delete,
      }
    ]
  },
  {
    basePath: "/package-dishes",
    routes: [
      {
        method: "get",
        path: "/",
        handler: PackageDishController.GetAll,
      },
      {
        method: "get",
        path: "/package/:packageId",
        handler: PackageDishController.GetByPackageId,
      },
      {
        method: "get",
        path: "/dish/:dishId",
        handler: PackageDishController.GetByDishId,
      },
      {
        method: "post",
        path: "/create",
        handler: PackageDishController.Create,
      },
      {
        method: "post",
        path: "/add-multiple-wedding",
        handler: PackageDishController.AddMultipleDishesToWeddingPackage,
      },
      {
        method: "post",
        path: "/add-multiple-general",
        handler: PackageDishController.AddMultipleDishesToGeneralPackage,
      },
      {
        method: "put",
        path: "/update-quantity/:id",
        handler: PackageDishController.UpdateQuantity,
      },
      {
        method: "delete",
        path: "/delete/:id",
        handler: PackageDishController.Delete,
      }
    ]
  },
  {
    basePath: "/packages",
    routes: [
      {
        method: "get",
        path: "/",
        handler: PackageController.GetAll,
      },
      {
        method: "get",
        path: "/available",
        handler: PackageController.GetAvailable,
      },
      {
        method: "get",
        path: "/types",
        handler: PackageController.GetPackageTypes,
      },
      {
        method: "get",
        path: "/type/:type",
        handler: PackageController.GetByType,
      },
      {
        method: "get",
        path: "/:id",
        handler: PackageController.GetById,
      },
      {
        method: "post",
        path: "/create",
        handler: PackageController.Create,
      },
      {
        method: "put",
        path: "/update/:id",
        handler: PackageController.Update,
      },
      {
        method: "delete",
        path: "/delete/:id",
        handler: PackageController.Delete,
      }
    ]
  },
  {
    basePath: "/services",
    routes: [
      {
        method: "get",
        path: "/",
        handler: ServiceControllers.GetAll,
      },
      {
        method: "get",
        path: "/available",
        handler: ServiceControllers.GetAvailable,
      },
      {
        method: "get",
        path: "/category/:categoryId",
        handler: ServiceControllers.GetByCategory,
      },
      {
        method: "get",
        path: "/:id",
        handler: ServiceControllers.GetById,
      },
      {
        method: "post",
        path: "/create",
        handler: ServiceControllers.Create,
      },
      {
        method: "put",
        path: "/update/:id",
        handler: ServiceControllers.Update,
      },
      {
        method: "delete",
        path: "/delete/:id",
        handler: ServiceControllers.Delete,
      }
    ]
  },
  {
    basePath: "/service-dishes",
    routes: [
      {
        method: "get",
        path: "/service/:serviceId",
        handler: ServiceDishController.GetByServiceId,
      },
      {
        method: "get",
        path: "/dish/:dishId",
        handler: ServiceDishController.GetByDishId,
      },
      {
        method: "get",
        path: "/service-with-dishes/:serviceId",
        handler: ServiceDishController.GetServiceWithDishes,
      },
      {
        method: "get",
        path: "/all-services-with-dishes",
        handler: ServiceDishController.GetAllServicesWithDishes,
      },
      {
        method: "get",
        path: "/:id",
        handler: ServiceDishController.GetById,
      },
      {
        method: "post",
        path: "/create",
        handler: ServiceDishController.Create,
      },
      {
        method: "post",
        path: "/add-multiple",
        handler: ServiceDishController.AddMultipleDishesToService,
      },
      {
        method: "post",
        path: "/create-service-with-dishes",
        handler: ServiceDishController.CreateServiceWithDishes,
      },
      {
        method: "put",
        path: "/update-quantity/:id",
        handler: ServiceDishController.UpdateQuantity,
      },
      {
        method: "delete",
        path: "/delete/:id",
        handler: ServiceDishController.Delete,
      }
    ]
  },

]);
