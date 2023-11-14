import { lazy } from 'react'
import { Suspense } from 'react'
import Loading from 'components/loading'
import { LocalRouterMap } from 'common/routerMap'

// 自定义懒加载，预防全屏闪屏
const lazyLoad = component => <Suspense fallback={<Loading />}>{component}</Suspense >
// 读取组件
const getComponentPage = key => lazyLoad(LocalRouterMap[key].element)

const Login = lazy(() => import('pages/login'))
const NotFound = lazy(() => import('pages/404'))
const AdminLayout = lazy(() => import('components/adminLayout'))
const Index = lazy(() => import('pages/index'))

const appRouter = [
  {
    path: '',
    element: lazyLoad(<AdminLayout />),
    children: [
      {
        index: true,
        element: lazyLoad(<Index />)
      },
      {
        path: '/user',
        element: getComponentPage('/user')
      },
      {
        path: '/zone',
        element: getComponentPage('/zone')
      },
      {
        path: '/room',
        element: getComponentPage('/room')
      },
      {
        path: '/unit',
        element: getComponentPage('/unit')
      },
      {
        path: '/three_table',
        element: getComponentPage('/three_table')
      },
      {
        path: '/cultivars',
        element: getComponentPage('/cultivars')
      },
      {
        path: '/models',
        element: getComponentPage('/models')
      },
      {
        path: '/phases',
        element: getComponentPage('/phases')
      },
      {
        path: '/base',
        element: getComponentPage('/base')
      },
      {
        path: '/triggers',
        element: getComponentPage('/triggers')
      }
    ]
  },
  {
    path: '/login',
    element: lazyLoad(<Login />),
  },
  {
    path: '*',
    element: lazyLoad(<NotFound />),
  }
]

export default appRouter
