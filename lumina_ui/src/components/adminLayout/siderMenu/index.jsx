/**
 * 左侧导航菜单
 */
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import Logo from '../logo'
import { FADEINLEFT } from 'contants'
import st from './index.module.css'
import menu from './menu'

const { Sider } = Layout;

const NavBar = props => {
  const { isOpen } = props
  const location = useLocation()
  const navigate = useNavigate()
  // 设置展开项
  const [openKeys, setOpenKeys] = useState([location.pathname.split('/').slice(0, -1).join('/')])
  // 高亮菜单
  const [lightPath, setLightPath] = useState([location.pathname])
  // 展开一级菜单收起其他一级菜单
  const onOpenChange = keys => {
    // console.log(keys)
    const latestOpenKey = keys.find(key => !openKeys.includes(key));
    // console.log(latestOpenKey)
    if (latestOpenKey && latestOpenKey.indexOf('/') !== -1) {
      setOpenKeys([latestOpenKey]);
    } else {
      setOpenKeys([]);
    }
  }

  const getPaths = (path, inverseLevel) => [path.split('/').slice(0, inverseLevel).join('/')]

  useEffect(() => {
    const newOpenKeys = getPaths(location.pathname, 3)
    const newLightPath = getPaths(location.pathname, 4)
    setOpenKeys(newOpenKeys)
    setLightPath(newLightPath)
  }, [location.pathname])

  // 子菜单点击跳转
  const itemClick = (e) => {
    const { key } = e
    navigate(key)
  }

  return (
    <Sider
      trigger={null}
      collapsible collapsed={!isOpen}
      className={st.sider + FADEINLEFT}
    >
      <Logo title="developers 不晚" />
      <Menu
        mode="inline"
        className={st.stickPosition}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        onClick={itemClick}
        defaultSelectedKeys={lightPath}
        items={menu}
      />
    </Sider>
  );
};

const mapStateToProps = state => {
  const { siderMenuReducer: { isOpen } } = state
  return { isOpen }
}

export default connect(mapStateToProps)(NavBar)