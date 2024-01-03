// 用户路由权限列表
import { USER_PERMISSIONS } from 'contants/reduxContants'

const inintState = []

const userPermissions = (prevState = inintState, action) => {
  const { type, value } = action
  switch (type) {
    case USER_PERMISSIONS:
      let newUserPermissions = value
      return newUserPermissions
    default:
      return prevState
  }
}

export default userPermissions