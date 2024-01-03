/**
 * 左侧导航栏顶部的logo设置
 */
import { connect } from 'react-redux'
import st from './index.module.css'
const logoSrc = '/img/Logo.png'


const Logo = (props) => {
  const { title, isOpen } = props
  return (
    <div className={st.homeLogo}>
      <img className={st.LogoImg} src={logoSrc} alt="logo" />
      {isOpen && <span className={st.title}>{title}</span>}
    </div>
  )
}

const mapStateToProps = state => {
  const { siderMenuReducer: { isOpen } } = state
  return { isOpen }
}

export default connect(mapStateToProps)(Logo)