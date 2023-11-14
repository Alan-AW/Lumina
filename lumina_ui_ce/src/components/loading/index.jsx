/**
 * 全局加载动画，当路由组件还未被加载出来的时候显示loading页面
 */
import { connect } from 'react-redux'
import st from './index.module.css'
import { FADEIN } from 'contants'

const Loading = props => {
  const { mode } = props
  return (
    <div
      style={{
        backgroundColor: mode ? '#edf1f4' : '#272728'
      }}
      className={`${st.loading}${FADEIN}${st.loader}`}
    >
      <div className={st.loadingComponentItems} id={st.items1}></div>
      <div className={st.loadingComponentItems} id={st.items2}></div>
      <div className={st.loadingComponentItems} id={st.items3}></div>
      <div className={st.loadingComponentItems} id={st.items4}></div>
      <div className={st.loadingComponentItems} id={st.items5}></div>
    </div>
  )
}

const mapStateToProps = state => {
  const { themeConfig: { mode } } = state
  return { mode }
}

export default connect(mapStateToProps)(Loading)