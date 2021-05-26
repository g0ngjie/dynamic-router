import { constantRoutes } from "@/router/index";
import { getMenusList } from "@/api/index";
import { LoadMenus } from "@/utils/Menus";

export default {
  state: {
    routes: [],
    addRoutes: [],
    routerLoadDone: false,
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes;
      state.routes = constantRoutes.concat(routes);
      state.routerLoadDone = true;
    },
  },
  actions: {
    reloadRouterLoadDone({ state }) {
      state.routerLoadDone = false;
    },
    async generateRoutes({ commit }) {
      const { body, code } = await getMenusList();
      if (code === 100) {
        const accessedRoutes = LoadMenus(body || []);
        commit("SET_ROUTES", accessedRoutes);
        return accessedRoutes;
      }
      commit("SET_ROUTES", []);
      return [];
    },
  },
};
