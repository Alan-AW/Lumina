import { lazy } from 'react'
import {
  ClusterOutlined, HomeOutlined, ApartmentOutlined, LockOutlined, UsergroupAddOutlined
} from '@ant-design/icons'

const User = lazy(() => import('pages/users'))
const Room = lazy(() => import('pages/room'))
const Zone = lazy(() => import('pages/zone'))
const Unit = lazy(() => import('pages/unit'))
const ThreeTable = lazy(() => import('pages/threeTable'))
const Cultivars = lazy(() => import('pages/threeTable/child/cultivars'))
const Models = lazy(() => import('pages/threeTable/child/models'))
const Phases = lazy(() => import('pages/threeTable/child/phases'))
const Base = lazy(() => import('pages/threeTable/child/base'))
const Triggers = lazy(() => import('pages/threeTable/child/triggers'))

export const LocalRouterMap = {
  '/': { title: '首页', icon: <HomeOutlined /> },
  '/user': { title: '用户管理', icon: <UsergroupAddOutlined />, element: <User /> },
  '/zone': { title: '区域管理', icon: <ApartmentOutlined />, element: <Zone /> },
  '/room': { title: '房间管理', icon: <LockOutlined />, element: <Room /> },
  '/unit': { title: '机器管理', icon: <ClusterOutlined />, element: <Unit /> },
  '/three_table': { title: '种植模型管理', icon: <ClusterOutlined />, element: <ThreeTable /> },
  '/cultivars': { element: <Cultivars /> },
  '/models': { element: <Models /> },
  '/phases': { element: <Phases /> },
  '/base': { element: <Base /> },
  '/triggers': { element: <Triggers /> },
}
