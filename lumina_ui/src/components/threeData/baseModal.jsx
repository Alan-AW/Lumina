import { useState, useEffect } from 'react'
import { Form, Input, Modal, Select, InputNumber, TimePicker } from 'antd'
import dayjs from 'dayjs'

function BaseModal(props) {
  const { initValue, openModal, closeModal, onOk } = props
  const [form] = Form.useForm()
  const statusOptions = [
    { label: 'active', value: 'active' },
    { label: 'inactive', value: 'inactive' }
  ]
  const typeOptions = [
    { label: 'timed', value: 'timed' },
    { label: 'interval', value: 'interval' }
  ]
  const dowOptions = [
    { label: '周末', value: '1' },
    { label: '周一', value: '2' },
    { label: '周二', value: '3' },
    { label: '周三', value: '4' },
    { label: '周四', value: '5' },
    { label: '周五', value: '6' },
    { label: '周六', value: '7' },
  ]
  // 禁用输入框状态
  const [typeValue, settypeValue] = useState('')

  // 监听编辑时的数据变化，动态设置禁用规则
  useEffect(() => {
    form.setFieldsValue(initValue)
    initValue && settypeValue(initValue.type)
  }, [initValue])

  // 关窗
  const onCancelModal = () => {
    form.resetFields()
    settypeValue('')
    closeModal()
  }

  // 确定提交
  const onOkModal = () => {
    form.validateFields().then(value => {
      if (value.type === 'timed') {
        value.tod = value.tod.format('HH:mm:ss')
      } else {
        value.duration = value.duration.format('HH:mm:ss')
        value.interval = value.interval.format('HH:mm:ss')
      }
      onOk(value)
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <Modal
      open={openModal}
      title='添加或修改Base'
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
          { required: false }
        ]}>
          <Select
            options={statusOptions}
            style={{ width: '100%' }}
            placeholder='选择status'
          />
        </Form.Item>

        <Form.Item name='type' label='type：' rules={[
          { required: false }
        ]}>
          <Select
            options={typeOptions}
            style={{ width: '100%' }}
            placeholder='选择type'
            onChange={value => settypeValue(value)}
          />
        </Form.Item>
        {
          typeValue === 'timed' ? <>
            <Form.Item name='n_weeks' label='n-weeks：' rules={[
              { required: false }
            ]}>
              <InputNumber placeholder='请输入n-weeks值' style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item name='dow' label='dow：' rules={[
              { required: false }
            ]}>
              <Select
                mode="multiple"
                options={dowOptions}
                style={{ width: '100%' }}
              />
            </Form.Item>

            <Form.Item name='tod' label='tod：' rules={[
              { required: false }
            ]}>
              <TimePicker
                format='HH:mm:ss'
                defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
                placeholder='请选择tod'
                style={{ width: '100%' }}
              />
            </Form.Item>
          </> : <>
            <Form.Item name='interval' label='interval：' rules={[
              { required: false }
            ]}>
              <TimePicker
                format='HH:mm:ss'
                defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
                placeholder='请选择interval'
                style={{ width: '100%' }}
              />
            </Form.Item>

            <Form.Item name='duration' label='duration：' rules={[
              { required: false }
            ]}>
              <TimePicker
                format='HH:mm:ss'
                defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
                placeholder='请选择duration'
                style={{ width: '100%' }}
              />
            </Form.Item>
          </>
        }
      </Form>
    </Modal>
  )
}

export default BaseModal