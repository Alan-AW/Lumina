// 所有select下拉组件数据

import {
  SET_ZONE_CHOICES, SET_ROOMS_CHOICES, SET_ROLES_CHOICSE, SET_COMPANY_CHOICSE
} from 'contants/reduxContants'

// 区域
const zoneInitState = []

const zoneList = (prevState = zoneInitState, action) => {
  let newState = [...prevState]
  const { type, value } = action
  switch (type) {
    case SET_ZONE_CHOICES:
      newState = value
      return newState
    default:
      return prevState
  }
}

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

export { zoneList, roomList, roleList, companyList }
