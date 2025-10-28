import { ICON_PATHS } from "../../components/constants/icon";
import index from "./page/index.page.vue";
export default [
    {
        path: "orders",
        name: "orders",
        meta: { title: "Đơn hàng", icon: ICON_PATHS.Dashboard },
        children: [
            {
                path: "food",
                name: "order.index",
                component: index,
                meta: { title: "Danh sách đơn hàng",icon: ICON_PATHS.Dashboard  },
            },
        ],
    }
]