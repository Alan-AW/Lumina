/**
 * 登陆页面
 */
import { useNavigate } from 'react-router-dom'
import { Button, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import { USER_TOKEN } from 'contants'
import { SET_USER_MESSAGE } from 'contants/reduxContants'
import { storageThatExpries } from 'utils'
import { login } from 'network/api'
import st from './index.module.css'


const Login = props => {
  const { setUserMessage } = props
  // 接收params参数
  const navigate = useNavigate()

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
        // 设置token供request读取
        storageThatExpries.set(USER_TOKEN, res.data.token, '7-d')
        // 更新全局登陆用户信息
        const { account, avatar, role } = res.data
        setUserMessage({ account, avatar, role })
        // 清除登陆loading提示
        message.destroy("loginLoading")
        // 提示登陆成功
        message.success("登陆成功！")
        // 跳转页面
        navigate('/')
      } else {
        message.destroy("loginLoading")
        message.error(res.errs)
      }
    })
  }

  return (
    <div className={st.loginBody}>
      <Form
        name="normal_login"
        className={`${st.loginBox} login-form`}
        onFinish={onFinish}
      >
        <h2 className={st.h2}>Login</h2>
        <Form.Item
          name="account"
          rules={[
            {
              required: true,
              message: 'Account can not be null!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Enter Your Account" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Password can not be null!',
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Enter Your Password"
          />
        </Form.Item>

        <Form.Item>
          <div className={st.btnBox}>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Login
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}

const mapDispatchToProps = {
  setUserMessage(value) {
    return { type: SET_USER_MESSAGE, value }
  }
}

export default connect(null, mapDispatchToProps)(Login)
