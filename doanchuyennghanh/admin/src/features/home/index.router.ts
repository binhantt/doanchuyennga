
import { ICON_PATHS } from "../../components/constants/icon"
import index from "./page/index.page.vue"

export default [
  {
    path: "",  
    name: "home",
    component: index , 
    meta: { title: "Bảng điều khiển" ,  icon :  ICON_PATHS.Dashboard } , 
  }
]