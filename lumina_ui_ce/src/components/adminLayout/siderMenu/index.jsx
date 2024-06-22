/**
 * 左侧导航菜单
 */
import { useState, useEffect, useMemo } from 'react'
import { connect } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import Logo from '../logo'
import { FADEINLEFT } from 'contants'
import st from './index.module.css'
import createMenu from 'common/menuMap'
import { useTranslation, Trans } from "react-i18next";

const { Sider } = Layout;

const NavBar = props => {
    const { isOpen, userPermissions } = props
    const [menu, setMenu] = useState([])
    const location = useLocation()
    const navigate = useNavigate()
    const { i18n, t } = useTranslation();
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

    useEffect(() => {
        const menu = createMenu(userPermissions.filter(item => item.isNaviLink === true))
        setMenu(menu.map(obj => {
            return {
                ...obj,
                label: <Trans i18nKey={'Menu.' + obj.label}></Trans>
            }
        }))
    }, [userPermissions])

    // 子菜单点击跳转
    const itemClick = e => {
        navigate(e.key)
    }

    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={!isOpen}
            className={st.sider + FADEINLEFT}
        >
            <Logo title="MARY墨泉管理后台" />
            <Menu
                key={i18n.language}
                mode="inline"
                theme='dark'
                className={st.stickPosition}
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                onClick={itemClick}
                defaultSelectedKeys={lightPath}
            // items={menu}
            >
                {
                    menu.map((item, index) => (
                        <Menu.Item
                            key={item.key}
                            icon={item.icon}
                            label={<Trans i18nKey={'Menu.' + item.label} />}
                            className={(index === 3 || index === 5 || index === 6) ? st.needLines : ''}
                        >
                            {item.label}
                        </Menu.Item>
                    ))
                }
            </Menu>
        </Sider>
    );
};

const mapStateToProps = state => {
    const { siderMenuReducer: { isOpen }, userPermissions } = state
    return { isOpen, userPermissions }
}

export default connect(mapStateToProps)(NavBar)
