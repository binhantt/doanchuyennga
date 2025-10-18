
import { ICON_PATHS } from "../../components/constants/icon"
import LoginAdminPage from "./page/index.page.vue"

export default [
  {
    path: "/login",  
    name: "Login-admin",
    component: LoginAdminPage , 
    meta: { title: "Đăng nhập Admin" , iocn :  ICON_PATHS.Login  }
  }
]
