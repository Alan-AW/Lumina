/**
 * 面包屑-暂时取消
 */
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Breadcrumb } from 'antd'
import { LocalRouterMap } from 'common/routerMap'
import { useTranslation } from "react-i18next";

const Crumb = () => {
  const location = useLocation()
  const { i18n, t } = useTranslation();
  const pathSnippets = location.pathname.split('/').filter(i => i)
  // 生成面包屑
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    // 递归提取URL
    const key = `/${pathSnippets.slice(0, index + 1).join('/')}`
    const titleText = LocalRouterMap[key]?.title
    let title = <Link to={key}>{titleText}</Link>
    if (index === pathSnippets.length - 1) {
      title = <span>{titleText}</span>
    }
    return { key, title }
  })

  const breadcrumbItems = [
    {
      title: <Link to="/">{t("home")}</Link>,
      key: '/',
    },
  ].concat(extraBreadcrumbItems);
  return (
    <Breadcrumb
      style={{
        paddingLeft: 'var(--content-margin)',
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)"
      }}
      key={i18n.language}
      items={breadcrumbItems}
    />
  )
}

export default Crumb