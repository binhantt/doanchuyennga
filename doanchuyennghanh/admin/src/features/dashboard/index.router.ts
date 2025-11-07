
import { ICON_PATHS } from "../../components/constants/icon"
import index from "./page/index.page.vue"
import products from "../products/index.router"
import home from "../home/index.router"
import categories from "../categories/index.router"
import users from "../users/index.router"
import order from "../order/index.router"
import coupons from "../coupons/index.router"
import weddingPackagesRoutes from "../wedding_packages/index.router"
export default [
  {
    path: "/admin/dashboard",  
    name: "dashboard",
    component: index , 
    meta: { title: "Bảng điều khiển" ,  icon :  ICON_PATHS.Dashboard, requiresAuth: true } , 
    children: [  
      ...home,
      ...products,
      ...categories,
      ...users,
      ...order,
      ...coupons ,
      ...weddingPackagesRoutes
    ]
  }
]
