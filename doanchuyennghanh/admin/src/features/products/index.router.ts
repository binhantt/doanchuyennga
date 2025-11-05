import { ICON_PATHS } from "../../components/constants/icon";
import servicesRoutes from "../services/index.router";
import index from "./page/index.page.vue";
export default [
    {
        path: "products",
        name: "products",
        meta: { title: "Sản phẩm", icon: ICON_PATHS.Dashboard },
        children: [
            {
                path: "food",
                name: "products.index",
                component: index,
                meta: { title: "Danh sáchản phẩm",icon: ICON_PATHS.Dashboard  },
            },
           ...servicesRoutes
        ],
    }
]