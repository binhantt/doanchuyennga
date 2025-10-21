import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router/index";
import { createPinia } from "pinia";
import "./assets/index.css";
import Toast from "vue3-toastify";
import Antd from 'ant-design-vue';
import "vue3-toastify/dist/index.css";
import 'ant-design-vue/dist/reset.css'; 
const app = createApp(App);
app.use(router);
app.use(Toast, {
  autoClose: 2000,
  position: "top-right",
  theme: "colored",
});
app.use(createPinia());
app.use(Antd);
app.mount("#app");