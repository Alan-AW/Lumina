import { lazy } from 'react'
import {
  ClusterOutlined, HomeOutlined, ApartmentOutlined, LockOutlined, UsergroupAddOutlined
} from '@ant-design/icons'

const User = lazy(() => import('pages/users'))
const Room = lazy(() => import('pages/room'))
const Zone = lazy(() => import('pages/zone'))
const Unit = lazy(() => import('pages/unit'))
const ThreeTable = lazy(() => import('pages/threeTable'))

export const LocalRouterMap = {
  '/': { title: '首页', icon: <HomeOutlined /> },
  '/user': { title: '用户管理', icon: <UsergroupAddOutlined />, element: <User /> },
  '/zone': { title: '区域管理', icon: <ApartmentOutlined />, element: <Zone /> },
  '/room': { title: '房间管理', icon: <LockOutlined />, element: <Room /> },
  '/unit': { title: '机器管理', icon: <ClusterOutlined />, element: <Unit /> },
  '/three_table': { title: '树', icon: <ClusterOutlined />, element: <ThreeTable /> },
}
