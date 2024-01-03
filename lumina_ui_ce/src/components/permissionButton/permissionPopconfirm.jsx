/**
 * 该组件为权限的粒度控制冒泡按钮，只需要传递一个点击确定事件的回调函数即可，
 * 其他配置同antd组件库中的 Popconfirm 组件
 */
import { useMemo } from 'react'
import { Popconfirm } from 'antd'
import { connect } from 'react-redux'

function PermissionPopconfirm(props) {
  const { role, allowRoles, callback, ...config } = props

  const core = useMemo(() => {
    let flag = allowRoles?.indexOf(role) !== -1;
    return flag ?
      <Popconfirm
        {...config}
        onConfirm={callback}
      /> :
      null
  }, [role, allowRoles])

  return core
}

const mapStateToProps = state => {
  const { userInfo: { role } } = state
  return { role }
}

export default connect(mapStateToProps)(PermissionPopconfirm)