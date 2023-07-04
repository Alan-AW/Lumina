// 是否展开主题色板抽屉
import { CHECK_THEME_COLOR_DRAWER } from 'contants/reduxContants'

const initState = { isOpenDrawer: false }

const checkThemeColorDrawer = (prevState = initState, action) => {
  const { type } = action
  switch (type) {
    case CHECK_THEME_COLOR_DRAWER:
      let newState = { ...prevState }
      newState.isOpenDrawer = !newState.isOpenDrawer
      return newState
    default:
      return prevState
  }
}

export default checkThemeColorDrawer