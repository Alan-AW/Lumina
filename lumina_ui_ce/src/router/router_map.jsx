/**
 * 全局路由映射，所有组件在这个地方懒加载，配合动态生成权限路由
 */

import { lazy } from 'react'
import {
  ClusterOutlined, HomeOutlined,
  LockOutlined, UsergroupAddOutlined
} from '@ant-design/icons'
import { Trans } from "react-i18next";

// 后台框架模版
const AdminLayout = lazy(() => import('components/adminLayout'))
// 首页
const Home = lazy(() => import('pages/index'))
// 用户管理
const User = lazy(() => import('pages/users'))
// 角色管理
const Roles = lazy(() => import('pages/roles'))
// 权限管理
const Permission = lazy(() => import('pages/permission'))
// 公司管理
const Company = lazy(() => import('pages/company'))
// 操作日志
const Logs = lazy(() => import('pages/logs'))
// 房间管理
const Room = lazy(() => import('pages/room'))
// 机器管理
const Unit = lazy(() => import('pages/unit'))
// 机器设置项列表
const UnitSetList = lazy(() => import('pages/unitSetList'))
// 品种管理
const Cultivar = lazy(() => import('pages/cultivar'))
// 算法管理
const Algorithm = lazy(() => import('pages/algorithm'))
// 三维表格模版
const ThreeTable = lazy(() => import('pages/threeTable'))
const Cultivars = lazy(() => import('pages/threeTable/child/cultivars'))
const Models = lazy(() => import('pages/threeTable/child/models'))
const Phases = lazy(() => import('pages/threeTable/child/phases'))
const Base = lazy(() => import('pages/threeTable/child/base'))
const Triggers = lazy(() => import('pages/threeTable/child/triggers'))

// 路由映射
const LocalRouterMap = {
  'index': { element: <Home /> },
  '/': { icon: <HomeOutlined />, element: <AdminLayout /> },
  '/user': { icon: <UsergroupAddOutlined />, element: <User /> },
  '/roles': { icon: <UsergroupAddOutlined />, element: <Roles /> },
  '/permission': { icon: <LockOutlined />, element: <Permission /> },
  '/company': { icon: <UsergroupAddOutlined />, element: <Company /> },
  '/logs': { icon: <UsergroupAddOutlined />, element: <Logs /> },
  '/room': { icon: <LockOutlined />, element: <Room /> },
  '/unit': { icon: <ClusterOutlined />, element: <Unit /> },
  '/unit_set_list': { icon: <ClusterOutlined />, element: <UnitSetList /> },
  '/cultivar': { icon: <ClusterOutlined />, element: <Cultivar /> },
  '/algorithm': { icon: <ClusterOutlined />, element: <Algorithm /> },
  '/three_table': { icon: <ClusterOutlined />, element: <ThreeTable /> },
  '/cultivars': <Cultivars />,
  '/models': <Models />,
  '/phases': <Phases />,
  '/base': <Base />,
  '/triggers': <Triggers />,
}

export default LocalRouterMap;
