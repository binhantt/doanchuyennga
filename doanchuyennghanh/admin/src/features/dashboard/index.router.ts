
import { ICON_PATHS } from "../../components/constants/icon"
import LoginAdminPage from "./page/index.page.vue"

export default [
  {
    path: "/admin/dashboard",  
    name: "dashboard",
    component: LoginAdminPage , 
    meta: { title: "Bảng điều khiển" ,  icon :  ICON_PATHS.Dashboard }
  }
]
