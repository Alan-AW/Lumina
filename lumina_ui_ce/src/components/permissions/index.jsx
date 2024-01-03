import { useEffect, useState } from 'react'
import { Form, Input, Select, Modal, Switch } from 'antd'
import { getNavPermission } from 'network/api'

function EditPermission(props) {
  const {
    initValue, openModal, closeModal, onOk, editSate
  } = props
  const [form] = Form.useForm()
  const [naviPermission, setnaviPermission] = useState([])

  useEffect(() => {
    openModal && initValue && form.setFieldsValue(initValue)
    openModal && !naviPermission.length && getNaviPermissions()
  }, [openModal, initValue])

  const getNaviPermissions = () => {
    getNavPermission().then(res => {
      res.data.forEach(item => {
        item.label = item.title
        item.value = item.id
      })
      setnaviPermission(res.data)
    })
  }

  // 关窗
  const onCancelModal = () => {
    form.resetFields()
    closeModal()
  }

  // 确定提交
  const onOkModal = () => {
    form.validateFields().then(value => {
      if (value.pid_id === undefined) {
        value.pid_id = null
      }
      onOk(value)
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <Modal
      open={openModal}
      title={editSate ? '编辑权限' : '添加权限'}
      onCancel={onCancelModal}
      onOk={onOkModal}
      getContainer={false}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_edit_modal"
      // initialValues={{ isNaviLink: true }}
      >
        <Form.Item name='id' hidden>
          <Input />
        </Form.Item>

        <Form.Item name='title' label='权限名称' rules={[
          { required: true, message: '权限名称不可为空!' }
        ]}>
          <Input
            placeholder='请输入权限名称！'
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item name='url' label='权限地址' rules={[
          { required: true, message: '权限地址不可为空!' }
        ]}>
          <Input
            placeholder='请输入权限地址！'
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item name='isNaviLink' valuePropName="checked" label='菜单权限' rules={[
          { required: true, message: '菜单权限不可为空!' }
        ]}>
          <Switch
            checkedChildren="开启"
            unCheckedChildren="关闭"
          // defaultChecked={true}
          />
        </Form.Item>

        <Form.Item name='pid_id' label='上级权限' rules={[
          { required: false }
        ]}>
          <Select
            allowClear
            placeholder='上级权限'
            style={{ minWidth: '150px' }}
            options={naviPermission}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditPermission