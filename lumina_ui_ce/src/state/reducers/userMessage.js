// 用户路由权限列表
import { SET_USER_MESSAGE } from 'contants/reduxContants'

const inintState = {
  account: '未登录',
  avatar: '',
  role: ''
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