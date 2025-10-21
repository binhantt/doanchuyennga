
import { ICON_PATHS } from "../../components/constants/icon"
import index from "./page/index.page.vue"
import products from "../products/index.router"
import home from "../home/index.router"
export default [
  {
    path: "/admin/dashboard",  
    name: "dashboard",
    component: index , 
    meta: { title: "Bảng điều khiển" ,  icon :  ICON_PATHS.Dashboard } , 
    children: [  
      ...home,
      ...products
    ]
  }
]
