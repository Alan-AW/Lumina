import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Card, Avatar, Col, Row, Tag,
  notification, message
} from 'antd'
import {
  EditOutlined, EllipsisOutlined, SettingOutlined, UserOutlined
} from '@ant-design/icons'
import { connect } from 'react-redux'
import { USER_INFO } from 'contants/reduxContants'
// import { updateUserInfo, uploadImg } from 'network/api'
import { FADEIN, passwordReg } from 'contants'
import { randomOnePortry, openNotification } from 'utils'
import getBaseUrl from 'network/baseUrl'

const Index = props => {
  const { userInfo } = props
  const { account, avatar, role } = userInfo
  // 路由跳转
  // const navigate = useNavigate()
  // bing每日一图
  const imgCover = "/img/logo.png"
  // 修改用户信息对话框状态
  // const [isModalOpen, setisModalOpen] = useState(false)
  // 修改用户信息表单ref
  const editUserMessage = useRef(null)
  // 修改头像弹窗
  // const [isEditOpen, setisEditOpen] = useState(false)
  // 错误提示
  // const [api, contextHolder] = notification.useNotification()

  // 点击修改信息按钮
  const editClick = isSetting => {
    // if (!userMessage.default) {
    if (isSetting) {
      // setisModalOpen(true)
    } else {
      // setisEditOpen(true)
    }
    // } else {
    //   message.warning('该账户为默认账户，禁止修改任何信息！')
    // }
  }

  // 修改用户信息确认回调
  const handleOk = () => {
    // editUserMessage.current?.validateFields().then(value => {
    //   updateUserInfo(value).then(res => {
    //     if (res.status) {
    //       message.success('账户信息修改成功！请重新登陆！')
    //       // 账户密码修改成功之后，清空用户信息，进入登陆页面
    //       setUserInfo({})
    //       navigate('/login?next=admin')
    //     } else {
    //       openNotification(api, 'error', res.errs)
    //     }
    //   })
    // })
  }

  // 取消修改用户信息
  // const handleCancel = () => {
  //   editUserMessage.current?.resetFields()
  //   setisModalOpen(false)
  // }

  // 头像上传成功返回之后回调
  const uploadSuccess = res => {
    // if (res.status) {
    //   const newUserMessage = { ...useInfo }
    //   newUserMessage.avatar = res.data.avatar_url
    //   setUserInfo(newUserMessage)
    //   message.success(res.info)
    //   setisEditOpen(false)
    // } else {
    //   openNotification(api, 'error', res.errs)
    // }
  }
  // 头像上传失败回调
  // const uploadError = () => {
  //   message.error(`文件上传失败！`)
  // }
  // 上传头像回调
  // const uploadAvatarImg = (fileData) => {
  //   uploadImg({ avatar: fileData.data }).then(uploadSuccess).catch(uploadError)
  // }
  // 修改头像取消
  // const cancelUploadAvatar = () => {
  //   setisEditOpen(false)
  // }

  // 点击...回调
  const otherClick = () => {
    message.destroy()
    const portry = randomOnePortry()
    message.success(portry)
  }

  return (
    <div className={FADEIN}>
      {/* {contextHolder} */}
      <Row gutter={24}>
        <Col span={6}>
          {/* 用户信息 */}
          <Card
            hoverable
            cover={<img
              alt="example"
              src={imgCover}
            />}
            actions={[
              <SettingOutlined key="setting" onClick={() => editClick(true)} />,
              <EditOutlined key="edit" onClick={() => editClick(false)} />,
              <EllipsisOutlined key="ellipsis" onClick={otherClick} />,
            ]}
          >
            <Card.Meta
              avatar={
                <Avatar
                  size={64}
                  src={`${getBaseUrl()}${avatar}`}
                  // style={{ backgroundColor: '#87d068' }}
                  icon={<UserOutlined />}
                />
              }
              title={account}
              description={<Tag color='#c8c8c8'>{role}</Tag>}
            />
          </Card>
        </Col>
      </Row>
      {/* 修改用户信息对话框 */}
      {/* <Modal
        title="修改用户信息"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          ref={editUserMessage}
          name="basic"
          autoComplete="off"
          initialValues={{ account: useInfo.account }}
        >
          <Form.Item
            label="Account"
            name="account"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
              () => ({
                validator(_, value) {
                  if (passwordReg.test(value)) {
                    return Promise.resolve()
                  } else {
                    return Promise.reject(new Error('长度8-16位必须包含大小写字母、数字或特殊字符中的两种！'))
                  }
                }
              })
            ]}
          >
            <Input.Password autoComplete='off' />
          </Form.Item>

          <Form.Item
            label="Password"
            name="confirm_password"
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'))
                },
              })
            ]}
          >
            <Input.Password autoComplete='off' />
          </Form.Item>
        </Form>
      </Modal> */}
      {/* 修改头像对话框 */}
      {/* <Modal
        width="260px"
        style={{ textAlign: 'center' }}
        title="上传新头像"
        open={isEditOpen}
        onCancel={cancelUploadAvatar}
        footer=""
      >
        <UploadImg
          api={uploadAvatarImg} useCrop={true}
        />
      </Modal> */}
    </div>
  )
}

const mapStateToProps = state => {
  const { userInfo } = state
  return { userInfo }
}

const mapDispatchToProps = {
  setUserInfo(value) {
    return { type: USER_INFO, value }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
