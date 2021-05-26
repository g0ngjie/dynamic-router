import Layout from "@/layout/index.vue";
import { randomAcquisition } from "./svgs";

/**
 * 生成路由json
 */
function getRouterJson(headPath, childPath, menuName, component) {
  return {
    path: headPath,
    name: "",
    component: Layout,
    meta: {
      title: "",
      //   icon: "",
    },
    children: [
      {
        path: childPath,
        name: headPath + childPath,
        component: component,
        meta: {
          title: menuName,
          icon: randomAcquisition(),
        },
      },
    ],
  };
}

/**
 * 404页面
 */
function notFound() {
  return { path: "*", redirect: "/404", meta: { title: "404" }, hidden: true };
}

/**
 * 拆分path
 * @param {string} path
 */
function splitPath(path) {
  const list = path.split("/");
  let headPath = `/${list[1]}`;
  let childPath = "";
  list.forEach((item, index) => {
    if (index > 1) {
      childPath += `/${item}`;
    }
  });
  return { headPath, childPath: childPath.substr(1, childPath.length - 1) };
}

/**
 * 根据权限 加载菜单
 * @param {Array} assessedMenus 权限菜单
 * @param {Array} asyncRoutes 预加载菜单
 */
export function LoadMenus(assessedMenus) {
  let resultArray = [];
  assessedMenus.forEach((item) => {
    const { name, path } = item;
    const { headPath, childPath } = splitPath(path);
    resultArray.push(
      getRouterJson(headPath, childPath, name, () =>
        import("@/views/view/index")
      )
    );
    // if (menuData[path]) {
    //   resultArray.push(
    //     getRouterJson(headPath, childPath, name, menuData[path])
    //   );
    // } else {
    //   resultArray.push(
    //     getRouterJson(headPath, childPath, item.name, () =>
    //       import("@/views/404/index")
    //     )
    //   );
    // }
  });

  resultArray.push(notFound());
  return resultArray;
}
