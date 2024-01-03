/**
 * 主要显示区域
 */
import { Outlet } from 'react-router-dom'
import { Layout, theme } from 'antd'
import TopHeader from '../topHeader'

const { Content } = Layout;

const RightContent = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className="site-layout">
      <TopHeader />
      <Content
        style={{
          margin: 'var(--content-margin)',
          padding: 'var(--content-padding)',
          background: colorBgContainer,
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)"
        }}
      >
        <Outlet />
      </Content>
    </Layout>
  )
}

export default RightContent