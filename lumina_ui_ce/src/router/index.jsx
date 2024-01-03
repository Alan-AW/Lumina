// 全局公共页面
import { lazy } from 'react'
import lazyLoad from './lazy_load'

const Login = lazy(() => import('pages/login'))
const NotFound = lazy(() => import('pages/404'))

const defaultRouter = [
  {
    path: '/login',
    element: lazyLoad(<Login />),
  },
  {
    path: '*',
    element: lazyLoad(<NotFound />),
  }
]

export default defaultRouter
