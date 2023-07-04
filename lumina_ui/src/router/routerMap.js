import { lazy } from 'react'
import {
  ClusterOutlined, HomeOutlined, ApartmentOutlined, LockOutlined
} from '@ant-design/icons'
const Room = lazy(() => import('pages/room'))
const Zone = lazy(() => import('pages/zone'))
const Unit = lazy(() => import('pages/unit'))

export const LocalRouterMap = {
  '/': { title: '首页', icon: <HomeOutlined /> },
  '/room': { title: '房间管理', icon: <ClusterOutlined />, element: <Room /> },
  '/zone': { title: '区域管理', icon: <ApartmentOutlined />, element: <Zone /> },
  '/unit': { title: '机器管理', icon: <LockOutlined />, element: <Unit /> },
}