import { ConfigProvider, theme, FloatButton } from 'antd'
import { useRoutes } from 'react-router-dom'
import { connect } from 'react-redux'
import 'dayjs/locale/zh-cn'
import locale from 'antd/locale/zh_CN'
import routers from 'router'


function App(props) {
  const { color, mode } = props
  // 主题
  const themeMode = mode ? theme.defaultAlgorithm : theme.darkAlgorithm
  const themeConfig = { token: { colorPrimary: color }, algorithm: themeMode }
  // 路由
  const element = useRoutes(routers)

  return (
    <ConfigProvider theme={themeConfig} locale={locale}>
      {element}
      <FloatButton.BackTop />
    </ConfigProvider>
  );
}

const mapStateToProps = (store) => {
  const { themeConfig: { color, mode } } = store
  return { color, mode }
}

export default connect(mapStateToProps)(App)
