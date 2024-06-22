// 全局公共页面
import { lazy } from 'react'
import lazyLoad from './lazy_load'

const Login = lazy(() => import('pages/login'))

const defaultRouter = [
  {
    path: '/login',
    element: lazyLoad(<Login />),
  },
  {
    path: '*',
    element: lazyLoad(<Login />),
  }
]

export default defaultRouter
