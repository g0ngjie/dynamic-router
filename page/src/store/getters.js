const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  permission_routes: (state) => state.permission.routes,
  routerLoadDone: (state) => state.permission.routerLoadDone, //router是否已经加载完成
  visitedViews: (state) => state.tagsView.visitedViews,
  cachedViews: (state) => state.tagsView.cachedViews,
};
export default getters;
