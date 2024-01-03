// 动态权限控制 && 路由的生成
import LocalRouterMap from "router/router_map";
import defaultRouters from 'router'
import lazyLoad from 'router/lazy_load'

/**
 * @param {Array} list 用户权限列表
 * @returns {Array} 用户权限路由表
 * @description 工具函数，用于生成默认路由的权限子路由
 */
const createChildRouter = list => {
  const path = '/'
  const element = lazyLoad(LocalRouterMap[path].element)
  // 准备admin框架的子路由
  let children = []
  // 开始生成路由表
  list.forEach(item => {
    children.push({
      path: item.url,
      element: lazyLoad(LocalRouterMap[item.url]?.element)
    })
  })
  children.unshift({
    index: true,
    element: LocalRouterMap['index']?.element
  })
  let adminRouter = { path, element, children }
  return adminRouter;
}

/**
 * @param {Array} permissions 用户权限列表
 * @returns {Array} 路由表
 * @description 生成用户权限总路由
 * @author <xcdh560@foxmail.com>
 */
const createUserPermissionRouter = permissions => {
  // 初始化路由表
  if (!permissions.length) {
    return defaultRouters
  }
  // 生成子路由列表
  let createRouterList = createChildRouter(permissions)
  // 准备总路由表
  let newRouters = [...defaultRouters]
  // 在404页面之前添加所有生成的权限路由
  newRouters.splice(-1, 0, createRouterList)
  return newRouters
}

export default createUserPermissionRouter;
