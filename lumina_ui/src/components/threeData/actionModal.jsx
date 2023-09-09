import { useState, useEffect } from 'react'
import { Form, Input, Modal, Select, TimePicker } from 'antd'
import dayjs from 'dayjs'

function ActionModal(props) {
  const { initValue, openModal, closeModal, onOk } = props
  const [seetValue, setsetValue] = useState('')
  const [form] = Form.useForm()
  const statusOptions = [
    { label: 'active', value: 'active' },
    { label: 'inactive', value: 'inactive' }
  ]
  const typeOptions = [
    { label: 'no_feedback', value: 'no_feedback' },
    { label: 'feedback', value: 'feedback' }
  ]
  const environmental_factorOptions = [
    { label: 'temperature', value: 'temperature' },
    { label: 'humidity', value: 'humidity' },
    { label: 'CO2', value: 'CO2' }
  ]
  const instructionOptions = [
    { label: 'turn_on', value: 'turn_on' },
    { label: 'turn_off', value: 'turn_off' },
    { label: 'set_value', value: 'set_value' },
  ]

  // 监听编辑时的数据变化，动态设置禁用规则
  useEffect(() => {
    form.setFieldsValue(initValue)
  }, [initValue])

  // 关窗
  const onCancelModal = () => {
    form.resetFields()
    setsetValue('')
    closeModal()
  }

  // 确定提交
  const onOkModal = () => {
    form.validateFields().then(value => {
      value.curve_duration = value.curve_duration.format('HH:mm:ss')
      onOk(value)
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <Modal
      open={openModal}
      title='添加或修改信息'
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

        <Form.Item name='status' label='status：' rules={[
          { required: true, message: 'status必须选择' }
        ]}>
          <Select
            options={statusOptions}
            style={{ width: '100%' }}
            placeholder='选择status'
          />
        </Form.Item>

        <Form.Item name='type' label='type：' rules={[
          { required: true, message: 'type必须选择' }
        ]}>
          <Select
            options={typeOptions}
            style={{ width: '100%' }}
            placeholder='选择type'
          />
        </Form.Item>

        <Form.Item name='hardware' label='hardware' rules={[{ required: true, message: 'hardware值不可为空' }]}>
          <Input placeholder='请输入hardware值' />
        </Form.Item>

        <Form.Item name='environmental_factor' label='environmental_factor：' rules={[
          { required: true, message: '必须选择environmental_factor' }
        ]}>
          <Select
            options={environmental_factorOptions}
            style={{ width: '100%' }}
            placeholder='选择environmental_factor'
          />
        </Form.Item>

        <Form.Item name='instruction' label='instruction：' rules={[
          { required: true, message: '必须选择instruction' }
        ]}>
          <Select
            options={instructionOptions}
            style={{ width: '100%' }}
            placeholder='选择instruction'
            onChange={value => setsetValue(value)}
          />
        </Form.Item>

        {
          seetValue === 'set_value' &&
          <Form.Item name='value' label='value：' rules={[
            { required: true, message: 'value值不可为空' }
          ]}>
            <Input placeholder='请输入value值' />
          </Form.Item>
        }

        <Form.Item name='curve' label='curve：' rules={[
          { required: true, message: 'curve值不可为空' }
        ]}>
          <Input placeholder='请输入curve值' />
        </Form.Item>

        <Form.Item name='curve_duration' label='curve_duration：' rules={[
          { required: true, message: '必须选择curve_duration' }
        ]}>
          <TimePicker
            format='HH:mm:ss'
            defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
            placeholder='请选择curve_duration'
            style={{ width: '100%' }}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ActionModal