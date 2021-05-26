import Vue from "vue";

import "babel-polyfill"; //解决vue在ie的兼容性问题
import "normalize.css/normalize.css"; //优化 css 跨浏览器的一致性

import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/styles/index.scss"; //global css
import '@/icons' // icon

import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/utils/Interceptor"; //拦截器

Vue.use(Element);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
