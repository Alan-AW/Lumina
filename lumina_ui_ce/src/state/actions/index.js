import {
  SET_ZONE_CHOICES, SET_ROOMS_CHOICES, SET_ROLES_CHOICSE, SET_COMPANY_CHOICSE
} from 'contants/reduxContants'
import { choicesZones, choicesRooms, choicesRoles, choicesCompany } from 'network/api'

// 异步获取区域下拉框
const getZoneAction = () => {
  return dispatch => {
    choicesZones().then(res => {
      dispatch({ type: SET_ZONE_CHOICES, value: res.data })
    })
  }
}

// 异步获取房间下拉框
const getRoomAction = () => {
  return dispatch => {
    choicesRooms().then(res => {
      dispatch({ type: SET_ROOMS_CHOICES, value: res.data })
    })
  }
}

// 异步获取角色下拉框
const getRoleAction = () => {
  return dispatch => {
    choicesRoles().then(res => {
      dispatch({ type: SET_ROLES_CHOICSE, value: res.data })
    })
  }
}

// 异步获取公司下拉框
const getCompanyAction = () => {
  return dispatch => {
    choicesCompany().then(res => {
      dispatch({ type: SET_COMPANY_CHOICSE, value: res.data })
    })
  }
}

export { getZoneAction, getRoomAction, getRoleAction, getCompanyAction }