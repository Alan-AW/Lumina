// 所有select下拉组件数据

import {
  SET_BUSINESS_CHOICES
} from 'contants/reduxContants'

// 商户
const businessInitState = []

const businessReducer = (prevState = businessInitState, action) => {
  let newState = [...prevState]
  const { type, value } = action
  switch (type) {
    case SET_BUSINESS_CHOICES:
      newState = value
      return newState
    default:
      return prevState
  }
}


export { businessReducer }
