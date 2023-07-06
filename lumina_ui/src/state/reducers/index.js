import { combineReducers } from 'redux'
import siderMenuReducer from './openSiderMenu'
import checkThemeColorDrawer from './openThemeColorDrawer'
import themeConfig from './themeConfig'
import userMessage from './userMessage'
import { zoneList, roomList, roleList } from './selectList'

// 合并reducer
export default combineReducers({
  siderMenuReducer, checkThemeColorDrawer,
  themeConfig, userMessage, zoneList, roomList, roleList
})

// 持久化reducer黑名单
export const blackList = []

// 持久化reducer白名单
export const whiteList = [
  'siderMenuReducer',
  'themeConfig',
  'userMessage'
]