import { LocalRouterMap } from 'router/routerMap'

function getLabelOrIcon(key = '/', getIcon = false) {
  return getIcon ? LocalRouterMap[key].icon : LocalRouterMap[key].title
}

const menus = [
  {
    label: getLabelOrIcon('/'),
    key: '/',
    icon: getLabelOrIcon('/', true)
  },
  {
    label: getLabelOrIcon('/room'),
    key: '/room',
    icon: getLabelOrIcon('/room', true)
  },
  {
    label: getLabelOrIcon('/zone'),
    key: '/zone',
    icon: getLabelOrIcon('/zone', true)
  },
  {
    label: getLabelOrIcon('/unit'),
    key: '/unit',
    icon: getLabelOrIcon('/unit', true)
  },
]

export default menus