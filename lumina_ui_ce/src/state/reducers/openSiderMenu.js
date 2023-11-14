// 改变侧边栏状态
import { CHANGE_SIDER_MENU } from 'contants/reduxContants'

const initState = { isOpen: true }

const siderMenuReducer = (prevState = initState, action) => {
  const { type } = action
  switch (type) {
    case CHANGE_SIDER_MENU:
      let newState = { ...prevState }
      newState.isOpen = !newState.isOpen
      return newState
    default:
      return prevState
  }
}

export default siderMenuReducer