/**
 * 登陆页面
 */
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import { USER_TOKEN } from 'contants'
import { USER_INFO, USER_PERMISSIONS } from 'contants/reduxContants'
import { storageThatExpries } from 'utils'
import { login } from 'network/api'
import st from './index.module.css'
import { useTranslation } from "react-i18next";


const Login = props => {
  const { setUserInfo, setUserPermissions } = props
  const initValue = { account: 'admin', password: 'Aa110120130.' }
  // 接收params参数
  const navigate = useNavigate()
  const { t } = useTranslation();

  // 修改body样式
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  // 登陆成功的处理
  const sign = data => {
    // 设置token供request读取
    storageThatExpries.set(USER_TOKEN, data.token, '7-d')
    // 更新全局登陆用户信息
    const { account, avatar, role, permissions } = data
    setUserInfo({ account, avatar, role })
    setUserPermissions(permissions)
    // 清除登陆loading提示
    message.destroy("loginLoading")
    // 提示登陆成功
    message.success(t('login.loginSuccess'))
  }

  // 表单验证通过之后回调
  const onFinish = values => {
    message.info({
      key: "loginLoading",
      duration: 0,
      content: "Hold on..."
    })
    // 发送登陆请求
    login(values).then(res => {
      if (res.status) {
        sign(res.data)
        // 跳转页面
        navigate('/logs')
      } else {
        message.destroy("loginLoading")
        message.error(res.errs)
      }
    })
  }

  return (
    <div className={st.loginBody}>
      {/* 背景 */}
      <div className={st.ocean}>
        <div className={st.wave}></div>
        <div className={st.wave}></div>
        <div className={st.wave}></div>
      </div>
      <Form
        name="normal_login"
        className={`${st.loginBox} login-form`}
        onFinish={onFinish}
        initialValues={initValue}
      >
        <h2 className={st.h2}>{t("login.title")}</h2>
        <Form.Item
          name="account"
          rules={[
            {
              required: true,
              message: t('login.Form.rules.account'),
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder={t('login.Form.placeholder.account')} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: t('login.Form.rules.password'),
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder={t('login.Form.placeholder.password')} />

        </Form.Item>

        <Form.Item>
          <div className={st.btnBox}>
            <Button type="primary" htmlType="submit" className="login-form-button">
              {t('login.loginbtn')}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}

const mapDispatchToProps = {
  setUserInfo(value) {
    return { type: USER_INFO, value }
  },
  setUserPermissions(value) {
    return { type: USER_PERMISSIONS, value }
  },
}

export default connect(null, mapDispatchToProps)(Login)
