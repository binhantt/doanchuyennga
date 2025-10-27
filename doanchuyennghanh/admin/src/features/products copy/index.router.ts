import { ICON_PATHS } from "../../components/constants/icon";
import index from "./page/index.page.vue";
export default [
    {
        path: "products",
        name: "products",
        component: index,
        meta: { title: "Sản phẩm", icon: ICON_PATHS.Dashboard },
    }
]