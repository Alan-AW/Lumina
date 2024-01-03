import { combineReducers } from 'redux'
import siderMenuReducer from './openSiderMenu'
import checkThemeColorDrawer from './openThemeColorDrawer'
import themeConfig from './themeConfig'
import userInfo from './userInfo'
import userPermissions from './userPermissions'
import { roomList, roleList, companyList } from './selectList'

// 合并reducer
export default combineReducers({
  siderMenuReducer, checkThemeColorDrawer,
  themeConfig, userInfo, userPermissions,
  roomList, roleList, companyList
})

// 持久化reducer黑名单
export const blackList = []

// 持久化reducer白名单
export const whiteList = [
  'siderMenuReducer',
  'themeConfig',
  'userPermissions',
  'userInfo'
]