// 主题颜色 && 模式reducer
import { CHANGE_THEME_COLOR, CHANGE_THEME_MODE, CHANGE_LNTL } from 'contants/reduxContants'

const inintState = { color: "#50E3C2", mode: true, lntl: 'zh_CN' }

const themeConfig = (prevState = inintState, action) => {
  const { type, value } = action
  switch (type) {
    case CHANGE_THEME_COLOR:
      let newColor = { ...prevState }
      newColor.color = value
      return newColor
    case CHANGE_THEME_MODE:
      let newMode = { ...prevState }
      newMode.mode = value
      return newMode
    case CHANGE_LNTL:
      let newLntl = { ...prevState }
      newLntl.lntl = value
      return newLntl
    default:
      return prevState
  }
}

export default themeConfig