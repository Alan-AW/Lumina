/**
 * 主题颜色
 */
import { Drawer, Switch } from 'antd'
import { connect } from 'react-redux'
import { SketchPicker } from 'react-color'
import { CHECK_THEME_COLOR_DRAWER, CHANGE_THEME_COLOR, CHANGE_THEME_MODE } from 'contants/reduxContants'


const ThemeColor = props => {
  const { color, mode, isOpenDrawer, closeDrawer, changeColor, changeMode } = props

  const colorChange = value => {
    changeColor(value.hex)
  }

  const modeChange = value => {
    changeMode(value);
  }

  return (
    <Drawer
      title="个性化"
      placement="right"
      onClose={() => closeDrawer()}
      open={isOpenDrawer}
      width="360px"
    >
      <div style={{
        margin: "20px auto",
        textAlign: 'center'
      }}>
        <Switch
          onChange={modeChange}
          checkedChildren="日上三杆"
          unCheckedChildren="月满西楼"
          checked={mode}
        />
      </div>
      <div style={{
        textAlign: 'center',
        display: "flex",
        justifyContent: 'center'
      }}>
        <SketchPicker
          width='100%'
          color={color}
          onChange={colorChange}
        />
      </div>
    </Drawer>
  )
}

const mapStateToProps = state => {
  const {
    themeConfig: { color },
    themeConfig: { mode },
    checkThemeColorDrawer: { isOpenDrawer }
  } = state
  return { color, mode, isOpenDrawer }
}

const mapDispatchToProps = {
  closeDrawer() {
    return { type: CHECK_THEME_COLOR_DRAWER }
  },
  changeColor(value) {
    return { type: CHANGE_THEME_COLOR, value }
  },
  changeMode(value) {
    return { type: CHANGE_THEME_MODE, value }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ThemeColor)