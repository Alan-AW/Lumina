/**
 * 顶部header组件
 */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { Layout, theme, Dropdown, Button, message, Modal, Select } from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ExclamationCircleFilled
} from '@ant-design/icons'
import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import { USER_TOKEN, FADEINDOWN } from 'contants'
import { CHANGE_LNTL, CHANGE_SIDER_MENU, CHECK_THEME_COLOR_DRAWER, USER_INFO, USER_PERMISSIONS } from 'contants/reduxContants'
import Weather from './weather'
import Timer from './timer'
import { useTranslation } from "react-i18next";
import baseUrl from 'network/baseUrl';

const { Header } = Layout
const { confirm } = Modal

const TopHeader = props => {
  const {
    isOpen, isOpenMenu, isOpenDrawer, userInfo,
    setUserInfo, setUserPermissions, changeLntl, lntl
  } = props
  const { i18n } = useTranslation()
  // 执行跳转
  const navigate = useNavigate()
  // 读取用户数据
  const { account, avatar } = userInfo
  console.log(avatar)
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
  // 国际化切换选项
  const lntlOptions = [{ label: '中文', value: 'zh_CN' }, { label: 'English', value: 'en_GB' }]
  function changeLntlT(val) {
    i18n.changeLanguage(val === 'zh_CN' ? 'zh' : 'en')
    changeLntl(val)
  }
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
    setUserInfo({})
    setUserPermissions([])
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
          alignItems: 'center'
        }}
        className="user-msg"
      >
        {/* 天气 */}
        <Weather />
        {/* 实时时间 */}
        <Timer />
        {/* 国际化 */}
        <Select
          style={{ minWidth: '80px', marginRight: '10px' }}
          defaultValue={lntl}
          options={lntlOptions}
          placeholder='lntl'
          onChange={value => changeLntlT(value)}
        />
        {/* 下拉选项 */}
        <Dropdown
          menu={{ items }}
          placement="bottom"
        >
          <span style={{ color: '#87ceeb' }}>
            <span style={{ marginRight: '10px' }}>
              {account}
            </span>
            <Avatar
              src={avatar.length ? `${baseUrl()}${avatar}` : './img/logo.png'}
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
  const { siderMenuReducer: { isOpen }, userInfo, themeConfig: { lntl } } = state
  return { isOpen, userInfo, lntl }
}

const mapDispatchToProps = {
  isOpenMenu() {
    return { type: CHANGE_SIDER_MENU }
  },
  isOpenDrawer() {
    return { type: CHECK_THEME_COLOR_DRAWER }
  },
  setUserInfo(value) {
    return { type: USER_INFO, value }
  },
  setUserPermissions(value) {
    return { type: USER_PERMISSIONS, value }
  },
  changeLntl(value) {
    return { type: CHANGE_LNTL, value }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopHeader)