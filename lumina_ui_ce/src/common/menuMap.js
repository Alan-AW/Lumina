import { LocalRouterMap } from './routerMap'

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
    label: getLabelOrIcon('/user'),
    key: '/user',
    icon: getLabelOrIcon('/user', true)
  },
  {
    label: getLabelOrIcon('/zone'),
    key: '/zone',
    icon: getLabelOrIcon('/zone', true)
  },
  {
    label: getLabelOrIcon('/room'),
    key: '/room',
    icon: getLabelOrIcon('/room', true)
  },
  {
    label: getLabelOrIcon('/unit'),
    key: '/unit',
    icon: getLabelOrIcon('/unit', true)
  },
  {
    label: getLabelOrIcon('/three_table'),
    key: '/three_table',
    icon: getLabelOrIcon('/three_table', true)
  },
]

export default menus