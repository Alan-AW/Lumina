/**
 * 企业管理弹窗
 */
import { useEffect } from 'react'
import { Form, Input, Modal } from 'antd'

function CompanyEditModal(props) {
  const {
    initValue, openModal, closeModal, onOk, editSate
  } = props

  const [form] = Form.useForm()

  useEffect(() => {
    openModal && initValue && form.setFieldsValue(initValue)
  }, [openModal, initValue])

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
      title={editSate ? '编辑企业信息' : '添加企业'}
      okText='ok'
      cancelText='cancel'
      onCancel={onCancelModal}
      onOk={onOkModal}
      getContainer={false}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_edit_modal"
      >
        <Form.Item name='id' hidden>
          <Input />
        </Form.Item>

        <Form.Item name='name' label='企业名称' rules={[
          { required: true, message: '企业名称不可为空!' }
        ]}>
          <Input
            placeholder='请输入企业名称'
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item name='address' label='企业地址' rules={[
          { required: true, message: '企业地址不可为空!' }
        ]}>
          <Input
            placeholder='请输入企业地址'
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item name='legal_rep' label='企业法人' rules={[
          { required: true, message: '企业法人不可为空!' }
        ]}>
          <Input
            placeholder='请输入企业法人'
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item name='tel' label='企业电话' rules={[
          { required: true, message: '企业电话不可为空!' }
        ]}>
          <Input
            placeholder='请输入企业电话'
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item name='email' label='企业邮箱' rules={[
          { required: true, message: '企业邮箱不可为空!' }
        ]}>
          <Input
            placeholder='请输入企业邮箱'
            style={{ width: '100%' }}
          />
        </Form.Item>

      </Form>
    </Modal>
  )
}

export default CompanyEditModal