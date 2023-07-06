/**
 * 用户管理弹窗
 */
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Select, Modal } from 'antd'
import { getRoleAction } from 'state/actions'

function EditModal(props) {
  const {
    getRoleAction, roleList,
    initValue, openModal, closeModal, onOk, editSate
  } = props
  const [form] = Form.useForm()
  const statusChoices = [
    { label: '正常', value: 1 },
    { label: '禁用', value: 0 }
  ]
  useEffect(() => {
    openModal && roleList.length === 0 && getRoleAction()
  }, [openModal, roleList])

  // 动态设置编辑时的表单内容
  const editRowData = JSON.parse(sessionStorage.getItem('editUserData'))
  useEffect(() => {
    openModal && editRowData !== {} && form.setFieldsValue(editRowData)
  }, [editRowData, openModal])

  // 关窗
  const onCancelModal = () => {
    form.resetFields()
    closeModal()
  }

  // 确定提交
  const onOkModal = () => {
    form.validateFields().then(value => {
      onOk(value)
    }).catch(err => {
      console.log(err);
    })
  }
  return (
    <Modal
      open={openModal}
      title={editSate ? '编辑用户' : '添加用户'}
      okText="确定"
      cancelText="取消"
      onCancel={onCancelModal}
      onOk={onOkModal}
      getContainer={false}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_edit_modal"
        initialValues={initValue}
      >
        <Form.Item name='account' label='用户账号：' rules={[
          { required: true, message: '用户账号不可为空！' }
        ]}>
          <Input
            placeholder='请输入用户账号'
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item name='password' label='用户密码：' rules={[
          { required: true, message: '用户密码不可为空！' }
        ]}>
          <Input
            placeholder='请输入用户密码'
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item name='first_name' label='用户姓名：' rules={[
          { required: true, message: '用户姓名不可为空！' }
        ]}>
          <Input
            placeholder='请输入用户姓名'
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item name='last_name' label='用户姓名：' rules={[
          { required: true, message: '用户姓名不可为空！' }
        ]}>
          <Input
            placeholder='请输入用户姓名'
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item name='role' label='用户角色：' rules={[
          { required: true, message: '用户状态必须选择！' }
        ]}>
          <Select
            allowClear
            placeholder="请选择用户角色"
            style={{ minWidth: '150px' }}
            options={roleList}
          />
        </Form.Item>

        <Form.Item name='status' label='用户状态：' rules={[
          { required: true, message: '用户状态必须选择！' }
        ]}>
          <Select
            allowClear
            placeholder="请选择用户状态"
            style={{ minWidth: '150px' }}
            options={statusChoices}
          />
        </Form.Item>

        <Form.Item name='chinese' label='用户语言：' rules={[
          { required: true, message: '用户语言必须选择！' }
        ]}>
          <Select
            allowClear
            placeholder="请选择用户语言"
            style={{ minWidth: '150px' }}
            options={[{ label: 'chinese', value: 1 }, { label: 'english', value: 0 }]}
          />
        </Form.Item>

      </Form>
    </Modal>
  )
}

const mapStateToProps = state => {
  const { roleList } = state
  return { roleList }
}

const mapDispatchToProps = {
  getRoleAction
}

export default connect(mapStateToProps, mapDispatchToProps)(EditModal)