import { ICON_PATHS } from "../../components/constants/icon";
import IndexPage from "./page/index.page.vue";
export default [
    {
        path: "categories",
        name: "categories",
        component: IndexPage,
        meta: { title: "Danh mục", icon: ICON_PATHS.Dashboard },
    }
]