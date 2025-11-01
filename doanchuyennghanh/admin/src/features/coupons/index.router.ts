import { ICON_PATHS } from "../../components/constants/icon";
import index from "./page/index.page.vue";
export default [
    {
        path: "coupons",
        name: "coupons",
        meta: { title: "Mã giảm giá", icon: ICON_PATHS.Dashboard },
        component: index,
    }
]