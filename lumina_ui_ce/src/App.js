import { useState, useEffect } from 'react'
import { ConfigProvider, theme, FloatButton } from 'antd'
import { useRoutes } from 'react-router-dom'
import { connect } from 'react-redux'
import 'dayjs/locale/zh-cn'
import createUserPermissionRouter from 'router/permission_routers'
// 国际化
import zh from 'antd/locale/zh_CN'
import en from 'antd/locale/en_GB'
import { useTranslation } from "react-i18next";

function App(props) {
    const { color, mode, lntl, userPermissions } = props
    const { i18n } = useTranslation()
    const [router, setRouter] = useState([])
    useEffect(() => {
        i18n.changeLanguage(lntl === 'zh_CN' ? 'zh' : 'en')
    }, []);
    // 实时监听用户的权限变化，动态生成新的路由表
    useEffect(() => {
        let newRouter = createUserPermissionRouter(userPermissions)
        setRouter(newRouter)
    }, [userPermissions])
    // 主题
    const themeMode = mode ? theme.defaultAlgorithm : theme.darkAlgorithm
    const themeConfig = { token: { colorPrimary: color }, algorithm: themeMode }
    // 路由
    let element = useRoutes(router)
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
    const { themeConfig: { color, mode, lntl }, userPermissions } = store
    return { color, mode, lntl, userPermissions }
}

export default connect(mapStateToProps)(App)
