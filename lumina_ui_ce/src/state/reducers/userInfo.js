// 用户基本信息
import { USER_INFO } from 'contants/reduxContants'

const inintState = {
  account: '未登录',
  avatar: '',
  role: 'AnonymousUser'
}

const userInfo = (prevState = inintState, action) => {
  const { type, value } = action
  switch (type) {
    case USER_INFO:
      let newUserMessge = { ...prevState }
      newUserMessge = value
      return newUserMessge
    default:
      return prevState
  }
}

export default userInfo