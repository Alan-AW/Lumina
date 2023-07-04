/**
 * 顶部header组件
 */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { Layout, theme, Dropdown, Button, message, Modal } from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ExclamationCircleFilled
} from '@ant-design/icons'
import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import { USER_TOKEN, FADEINDOWN } from 'contants'
import { CHANGE_SIDER_MENU, CHECK_THEME_COLOR_DRAWER, SET_USER_MESSAGE } from 'contants/reduxContants'
import Weather from './weather'
import Timer from './timer'

const { Header } = Layout
const { confirm } = Modal

const TopHeader = props => {
  const { isOpen, isOpenMenu, isOpenDrawer, userMessage, setUserMessage } = props
  // 执行跳转
  const navigate = useNavigate()
  // 读取用户数据
  const { username, avatar, last_login } = userMessage
  // 用户信息下拉菜单
  const items = [
    {
      key: '1',
      label: (<Button type='link' onClick={() => isOpenDrawer()}>主题颜色</Button>),
    },
    {
      key: '2',
      label: (<Button type="link" onClick={() => clickLogout()}>退出登陆</Button>)
    }
  ]

  // 点击退出登陆
  const clickLogout = () => {
    confirm({
      title: 'Logout',
      icon: <ExclamationCircleFilled />,
      content: '是否确定退出登陆？',
      okText: 'Yes',
      cancelText: 'No',
      onOk() {
        logout()
      },
      onCancel() {
        message.info("ok!")
      },
    })
  }

  // 退出登陆
  const logout = () => {
    // 清除token
    localStorage.removeItem(USER_TOKEN)
    // 清除用户信息
    setUserMessage({})
    // 跳转到登陆页面
    navigate('/login', { replace: true })
  }

  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Header
      className={FADEINDOWN}
      style={{
        padding: '0 16px',
        background: colorBgContainer,
      }}
    >
      {
        React.createElement(
          isOpen ? MenuFoldOutlined : MenuUnfoldOutlined, {
          className: 'trigger',
          onClick: () => isOpenMenu(!isOpen),
        })
      }
      <div
        style={{
          float: 'right',
          marginRight: '16px',
          display: 'flex',
        }}
        className="user-msg"
      >
        <Weather />
        <Timer />
        <span>上次登陆：</span>
        <del style={{ color: '#999', marginRight: '10px' }}>{last_login}</del>
        <Dropdown
          menu={{ items }}
          placement="bottom"
        // style={{ width: '100px' }}
        >
          <span style={{ color: '#87ceeb' }}>
            <span style={{ marginRight: '10px' }}>
              {username}
            </span>
            <Avatar
              src={avatar}
              style={{ backgroundColor: '#87d068' }}
              icon={<UserOutlined />}
            />
          </span>
        </Dropdown>
      </div>
    </Header>
  )
}

const mapStateToProps = state => {
  const { siderMenuReducer: { isOpen }, userMessage } = state
  return { isOpen, userMessage }
}

const mapDispatchToProps = {
  isOpenMenu() {
    return { type: CHANGE_SIDER_MENU }
  },
  isOpenDrawer() {
    return { type: CHECK_THEME_COLOR_DRAWER }
  },
  setUserMessage(value) {
    return { type: SET_USER_MESSAGE, value }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopHeader)