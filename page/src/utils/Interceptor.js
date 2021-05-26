import router from "@/router";
import store from "@/store";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false });

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  if (!store.getters.routerLoadDone) {
    const accessRoutes = await store.dispatch("generateRoutes", true);
    router.addRoutes(accessRoutes);
    next({ ...to, replace: true });
  } else {
    next();
  }
});

router.afterEach(() => {
  NProgress.done();
});
