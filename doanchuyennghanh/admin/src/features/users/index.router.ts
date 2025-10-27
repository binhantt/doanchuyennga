import { ICON_PATHS } from "../../components/constants/icon";
import index from "./page/index.page.vue";
export default [
    {
        path: "users",
        name: "users",
        component: index,
        meta: { title: "Người dùng", icon: ICON_PATHS.Dashboard },
    }
]