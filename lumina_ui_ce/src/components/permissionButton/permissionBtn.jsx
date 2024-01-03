/**
 * 该组件为权限的粒度控制按钮，只需要传递一个点击事件的回调函数即可，
 * 其他配置同antd组件库中的Button组件
 */
import React, { useMemo } from 'react'
import { Button } from 'antd'
import { connect } from 'react-redux'

function PermissionBtn(props) {
  const { role, allowRoles, callback, ...config } = props
  const core = useMemo(() => {
    let flag = allowRoles.indexOf(role) !== -1;
    return flag ?
      <Button
        {...config}
        onClick={callback}
      /> :
      null
  }, [role, allowRoles])
  return core
}

const mapStateToProps = state => {
  const { userInfo: { role } } = state
  return { role }
}

export default connect(mapStateToProps)(PermissionBtn)