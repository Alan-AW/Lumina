/**
 * 区域管理弹窗
 */
import { useEffect } from 'react'
import { Form, Input, Select, Modal } from 'antd'

function EditModal(props) {
  const { initValue, openModal, closeModal, onOk, editSate } = props
  const [form] = Form.useForm()
  const statusChoices = [
    { label: '正常', value: 1 },
    { label: '禁用', value: 0 }
  ]

  // 动态设置编辑时的表单内容
  const editRowData = JSON.parse(sessionStorage.getItem('editZoneData'))
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
      title={editSate ? '编辑区域' : '添加区域'}
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

        <Form.Item name='status' label='区域状态：' rules={[
          { required: true, message: '区域状态必须选择！' }
        ]}>
          <Select
            allowClear
            placeholder="请选择区域状态"
            style={{ minWidth: '150px' }}
            options={statusChoices}
          />
        </Form.Item>

        <Form.Item name='name' label='区域名称：' rules={[
          { required: true, message: '区域名称不可为空！' }
        ]}>
          <Input
            placeholder='请输入区域名称'
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item name='time_zone' label='区域时区：' rules={[
          { required: true, message: '区域时区不可为空！' }
        ]}>
          <Input
            placeholder='请输入区域时区'
            style={{ width: '100%' }}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditModal