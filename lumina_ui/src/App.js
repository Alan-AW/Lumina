import { ConfigProvider, theme, FloatButton } from 'antd'
import { useRoutes } from 'react-router-dom'
import { connect } from 'react-redux'
import 'dayjs/locale/zh-cn'
import routers from 'router'
// 国际化
import zh from 'antd/locale/zh_CN'
import en from 'antd/locale/en_GB'

function App(props) {
  const { color, mode, lntl } = props
  // 主题
  const themeMode = mode ? theme.defaultAlgorithm : theme.darkAlgorithm
  const themeConfig = { token: { colorPrimary: color }, algorithm: themeMode }
  // 路由
  const element = useRoutes(routers)
  // 国际化语言
  const locale = lntl === 'zh_CN' ? zh : en

  return (
    <ConfigProvider theme={themeConfig} locale={locale}>
      {element}
      <FloatButton.BackTop />
    </ConfigProvider>
  );
}

const mapStateToProps = store => {
  const { themeConfig: { color, mode, lntl } } = store
  return { color, mode, lntl }
}

export default connect(mapStateToProps)(App)
