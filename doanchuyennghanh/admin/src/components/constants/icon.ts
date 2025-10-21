// src/features/layout/constants/icons.ts
import {
    BellOutlined,
    MessageOutlined,
    MenuOutlined,
    SearchOutlined,
    LockOutlined,
    BarChartOutlined,
    TeamOutlined,
 LoginOutlined, 
   PlusOutlined ,
   EditOutlined,
   DeleteOutlined ,
   RetweetOutlined, 
    DashboardOutlined, UserOutlined, ShoppingOutlined, FileTextOutlined, SettingOutlined, LogoutOutlined
} from "@ant-design/icons-vue";

export const ICONS = {
    Dashboard: DashboardOutlined,
    Edit : EditOutlined, 
    Delete : DeleteOutlined,
    Users: UserOutlined,
    Categories: FileTextOutlined,
    Plus : PlusOutlined,
    Refresh : RetweetOutlined,
    Products: ShoppingOutlined,
    Orders: FileTextOutlined,
    Reports: FileTextOutlined,
    Settings: SettingOutlined,
    Account: UserOutlined,
    Logout: LogoutOutlined,
    Bell: BellOutlined,
    Message: MessageOutlined,
    Menu: MenuOutlined,
    Lock: LockOutlined,
    BarChar: BarChartOutlined,
    Team: TeamOutlined,
    Login : LoginOutlined,
    Search: SearchOutlined,
};
import Home from "../../assets/Home.svg";
import Login from "../../assets/login.svg"
export const ICON_PATHS = {
  Dashboard: Home,
  Login: Login,
  Lock: "/icons/lock.svg",
  Default: "/vite.svg",
};
