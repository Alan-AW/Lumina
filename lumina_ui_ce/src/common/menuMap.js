// 全局菜单映射，根据动态路由映射表来生成菜单
import LocalRouterMap from 'router/router_map'

/**
 * @description 读取菜单项标题或图标
 * @param {key} 用户权限-路由地址
 * @param {getIcon} 是否读取当前菜单的图标
 * @returns 返回菜单项的标题或图标
 */
// function getLabelOrIcon(key = '/', getIcon = false) {
//   return getIcon ? LocalRouterMap[key].icon : LocalRouterMap[key].title
// }

/**
 * @description 根据用户权限列表生成菜单
 * @param {permissions} 用户权限列表 
 * @returns 菜单项
 */
function createMenu(permissions) {
  if (permissions.length === 0) return []
  const menus = permissions.map(item => {
    return {
      label: item.title,
      key: item.url,
      icon: LocalRouterMap[item.url]?.icon
    }
  })
  return menus
}

export default createMenu