// 用户路由权限列表
import { SET_USER_MESSAGE } from 'contants/reduxContants'

const inintState = {
  username: '未登录',
  default: false,
  is_active: false,
  avatar: null,
  last_login: '1970-1-1',
  register: '1970-1-1',
  roles: []
}

const userMessage = (prevState = inintState, action) => {
  const { type, value } = action
  switch (type) {
    case SET_USER_MESSAGE:
      let newUserMessge = { ...prevState }
      newUserMessge = value
      return newUserMessge
    default:
      return prevState
  }
}

export default userMessage