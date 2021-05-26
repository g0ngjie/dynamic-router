import request from "@/utils/Request";

/**
 * 获取菜单列表
 */
export const getMenusList = () => {
  return request({
    url: `/api/router`,
    method: "get",
  });
};

/**
 * 根据id获取菜单
 */
export const getMenusById = (id) => {
  return request({
    url: `/api/router/get/${id}`,
    method: "get",
  });
};

/**
 * 新增菜单
 */
export const addMenu = (params) => {
  return request({
    url: `/api/router/add`,
    method: "post",
    params,
  });
};

/**
 * 新增菜单
 */
export const updateMenu = (params) => {
  return request({
    url: `/api/router/update`,
    method: "post",
    params,
  });
};

/**
 * 删除
 */
export const delMenu = (params) => {
  return request({
    url: `/api/router/del`,
    method: "post",
    params,
  });
};
