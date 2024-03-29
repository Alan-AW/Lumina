import { useEffect } from 'react'
import { Form, Input, Modal } from 'antd'

function CultivarsModal(props) {
  const { initValue, openModal, closeModal, onOk } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue(initValue)
  }, [initValue])

  // 关窗
  const onCancelModal = () => {
    form.resetFields()
    closeModal()
  }

  // 确定提交
  const onOkModal = () => {
    form.validateFields().then(value => {
      form.resetFields()
      onOk(value)
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <Modal
      open={openModal}
      title='添加或修改Cultivars'
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
      >

        <Form.Item name='id' hidden rules={[{ required: false }]}>
          <Input />
        </Form.Item>

        <Form.Item name='name_en' label='name_en：' rules={[
          { required: true, message: '不可为空！' }
        ]}>
          <Input
            placeholder='请输入name_en！'
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item name='name_cn' label='name_cn：' rules={[
          { required: true, message: '不可为空！' }
        ]}>
          <Input
            placeholder='请输入name_cn！'
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item name='description_en' label='description_en：' rules={[
          { required: true, message: '不可为空！' }
        ]}>
          <Input
            placeholder='请输入description_en！'
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item name='description_cn' label='description_cn：' rules={[
          { required: true, message: '不可为空！' }
        ]}>
          <Input
            placeholder='请输入description_cn！'
            style={{ width: '100%' }}
          />
        </Form.Item>

      </Form>
    </Modal>
  )
}

export default CultivarsModal