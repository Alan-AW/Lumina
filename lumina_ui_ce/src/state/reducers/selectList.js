// 所有select下拉组件数据

import {
  SET_ROOMS_CHOICES, SET_ROLES_CHOICSE, SET_COMPANY_CHOICSE, SET_UNIT_SETTING_CHOICSE
} from 'contants/reduxContants'


// 房间
const roomInitState = []

const roomList = (prevState = roomInitState, action) => {
  let newState = [...prevState]
  const { type, value } = action
  switch (type) {
    case SET_ROOMS_CHOICES:
      newState = value
      return newState
    default:
      return prevState
  }
}

// 角色
const roleInitState = []

const roleList = (prevState = roleInitState, action) => {
  let newState = [...prevState]
  const { type, value } = action
  switch (type) {
    case SET_ROLES_CHOICSE:
      newState = value
      return newState
    default:
      return prevState
  }
}

// 公司
const companyInitState = []

const companyList = (prevState = companyInitState, action) => {
  let newState = [...prevState]
  const { type, value } = action
  switch (type) {
    case SET_COMPANY_CHOICSE:
      newState = value
      return newState
    default:
      return prevState
  }
}


// 设置列表
const unitSetListInitState = []

const unitSetList = (prevState = unitSetListInitState, action) => {
  let newState = [...prevState]
  const { type, value } = action
  switch (type) {
    case SET_UNIT_SETTING_CHOICSE:
      newState = value
      return newState
    default:
      return prevState
  }
}

export { roomList, roleList, companyList, unitSetList }
