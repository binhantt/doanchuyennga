import { ICON_PATHS } from "../../components/constants/icon";
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
                meta: { title: "Danh sách sản phẩm",icon: ICON_PATHS.Dashboard  },
            },
        ],
    }
]