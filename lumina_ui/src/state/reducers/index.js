import { combineReducers } from 'redux'
import siderMenuReducer from './openSiderMenu'
import checkThemeColorDrawer from './openThemeColorDrawer'
import themeConfig from './themeConfig'
import userMessage from './userMessage'
import { businessReducer } from './selectList'

// 合并reducer
export default combineReducers({
  siderMenuReducer, checkThemeColorDrawer,
  themeConfig, userMessage, businessReducer
})

// 持久化reducer黑名单
export const blackList = []

// 持久化reducer白名单
export const whiteList = [
  'siderMenuReducer',
  'themeConfig',
  'userMessage'
]