// 所有select下拉组件数据

import {
  SET_ZONE_CHOICES, SET_ROOMS_CHOICES
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

export { zoneList, roomList }
