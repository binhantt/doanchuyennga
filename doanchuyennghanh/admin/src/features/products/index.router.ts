import { ICON_PATHS } from "../../components/constants/icon";
import index from "../products/page/index.page.vue";
export default [
    {
        path: "products",
        name: "products",
        component: index,
        meta: { title: "Sản phẩm", icon: ICON_PATHS.Dashboard },
    }
]