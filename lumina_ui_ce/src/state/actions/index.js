import {
  SET_ROOMS_CHOICES, SET_ROLES_CHOICSE, SET_COMPANY_CHOICSE, SET_UNIT_SETTING_CHOICSE, SET_CULTIVARS_CHOICSE
} from 'contants/reduxContants'
import { choicesRooms, choicesRoles, choicesCompany, choicesUnitSetList, choicesCultivars } from 'network/api'

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

// 异步获取设备功能列表下拉框
const getUnitSetListAction = language => {
  return dispatch => {
    choicesUnitSetList(language).then(res => {
      dispatch({ type: SET_UNIT_SETTING_CHOICSE, value: res.data })
    })
  }
}

// 异步获取品类列表下拉框
const getCultivatsListAction = language => {
  return dispatch => {
    choicesCultivars(language).then(res => {
      dispatch({ type: SET_CULTIVARS_CHOICSE, value: res.data })
    })
  }
}

export { getRoomAction, getRoleAction, getCompanyAction, getUnitSetListAction, getCultivatsListAction }