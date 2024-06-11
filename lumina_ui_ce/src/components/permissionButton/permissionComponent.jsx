/**
 * 一个高阶组件：
 * 如果传递的allowRoles中不包含当前用户角色名称，
 * 那么该组件包裹的children将被隐藏
 */
import { useMemo } from 'react'
import { connect } from 'react-redux'

function PermissionComponent(props) {
  const { children, allowRoles, role } = props
  console.log(role)

  const core = useMemo(() => {
    let flag = allowRoles?.indexOf(role) !== -1;
    return flag ?
      children :
      <></>
  }, [role, allowRoles])

  return core
}

const mapStateToProps = state => {
  const { userInfo: { role } } = state
  return { role }
}

export default connect(mapStateToProps, null)(PermissionComponent)
