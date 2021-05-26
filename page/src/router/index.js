import Vue from "vue";
import VueRouter from "vue-router";

/* 解决页面跳转 报 Uncaught (in promise)异常 */
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

import Layout from "@/layout/index.vue";
export const constantRoutes = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path*",
        component: () => import("@/views/redirect/index"),
      },
    ],
  },
  {
    path: "/404",
    component: () => import("@/views/404/index"),
    hidden: true,
  },
  {
    /* 首页 */
    path: "",
    component: Layout,
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/Home.vue"),
        meta: {
          title: "菜单管理",
          icon: 'example'
        },
      },
    ],
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes: constantRoutes,
});

export default router;
