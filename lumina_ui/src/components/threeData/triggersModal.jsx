import { useState, useEffect } from 'react'
import { Form, Input, Modal, Select, InputNumber, TimePicker } from 'antd'
import dayjs from 'dayjs'
import { choicesEnvironmentalOptions } from 'network/api'

function TriggersModal(props) {
  const { initValue, openModal, closeModal, onOk } = props
  const [form] = Form.useForm()
  const statusOptions = [
    { label: 'active', value: 'active' },
    { label: 'single_event', value: 'single_event' },
    { label: 'completed', value: 'completed' },
    { label: 'cancelled', value: 'cancelled' }
  ]
  const triggeredOptions = [
    { label: 'true', value: true },
    { label: 'false', value: false },
  ]
  const typeOptions = [
    { label: 'exception', value: 'exception' },
    { label: 'trend', value: 'trend' },
    { label: 'rate', value: 'rate' },
  ]
  const [directionShow, setdirectionShow] = useState(true)
  const [timeframeShow, settimeframeShow] = useState(true)
  const [tioShow, settioShow] = useState(true)
  const [metricOptions, setmetricOptions] = useState([])
  const operatorOptions = [
    { label: 'greater_than', value: 'greater_than' },
    { label: 'greater_than_or_equal_to', value: 'greater_than_or_equal_to' },
    { label: 'less_than', value: 'less_than' },
    { label: 'less_than_or_equal_to', value: 'less_than_or_equal_to' },
    { label: 'not_equal_to', value: 'not_equal_to' },
  ]
  const directionOptions = [
    { label: 'increasing', value: 'increasing' },
    { label: 'decreasing', value: 'decreasing' },
    { label: 'maintaining', value: 'maintaining' }
  ]

  // 监听编辑时的数据变化，动态设置禁用规则
  useEffect(() => {
    form.setFieldsValue(initValue)
    initValue && resetDisable(initValue.type)
  }, [initValue])

  // 请求metric下拉框数据
  useEffect(() => {
    choicesEnvironmentalOptions().then(res => {
      if (res.status) {
        setmetricOptions(res.data)
      }
    }).catch(err => console.log(err))
  }, [])

  // type类型三种禁用规则切换
  const resetDisable = value => {
    if (value === 'exception') {
      setdirectionShow(true)
      settimeframeShow(true)
      settioShow(true)
      form.setFieldsValue({
        direction: '', timeframe: '', toi: ''
      })
    } else if (value === 'trend') {
      setdirectionShow(false)
      settimeframeShow(false)
      settioShow(false)
    } else {
      setdirectionShow(false)
      settimeframeShow(false)
      settioShow(true)
      form.setFieldsValue({ toi: '' })
    }
  }

  // 关窗
  const onCancelModal = () => {
    form.resetFields()
    setdirectionShow(true)
    settimeframeShow(true)
    settioShow(true)
    closeModal()
  }

  // 确定提交
  const onOkModal = () => {
    form.validateFields().then(value => {
      !!value.timeframe ? (value.timeframe = value.timeframe.format('HH:mm:ss')) : (delete value.timeframe)
      !!value.toi ? (value.toi = value.toi.format('HH:mm:ss')) : (delete value.toi)
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

        <Form.Item name='status' label='status：' rules={[
          { required: true, message: '不可为空！' }
        ]}>
          <Select
            options={statusOptions}
            style={{ width: '100%' }}
            placeholder='选择status'
          />
        </Form.Item>

        <Form.Item name='triggered' label='triggered：' rules={[
          { required: true, message: '不可为空！' }
        ]}>
          <Select
            options={triggeredOptions}
            style={{ width: '100%' }}
            placeholder='选择triggered'
          />
        </Form.Item>

        <Form.Item name='type' label='type：' rules={[
          { required: true, message: '不可为空！' }
        ]}>
          <Select
            options={typeOptions}
            style={{ width: '100%' }}
            placeholder='选择type'
            onChange={value => resetDisable(value)}
          />
        </Form.Item>

        <Form.Item name='metric' label='metric：' rules={[
          { required: true, message: '不可为空！' }
        ]}>
          <Select
            options={metricOptions}
            style={{ width: '100%' }}
            placeholder='选择metric'
          />
        </Form.Item>

        <Form.Item name='operator' label='operator：' rules={[
          { required: true, message: '不可为空！' }
        ]}>
          <Select
            options={operatorOptions}
            style={{ width: '100%' }}
            placeholder='选择operator'
          />
        </Form.Item>

        <Form.Item name='threshold' label='threshold：' rules={[
          { required: true, message: '不可为空！' }
        ]}>
          <InputNumber style={{ width: '100%' }} placeholder='请输入threshold值' />
        </Form.Item>

        <Form.Item name='direction' label='direction：' rules={[
          { required: false }
        ]}>

          <Select
            options={directionOptions}
            style={{ width: '100%' }}
            placeholder='选择direction'
            disabled={directionShow}
          />
        </Form.Item>

        <Form.Item name='timeframe' label='timeframe：' rules={[
          { required: false }
        ]}>
          <TimePicker
            format='HH:mm:ss'
            defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
            placeholder='请选择timeframe'
            style={{ width: '100%' }}
            disabled={timeframeShow}
          />
        </Form.Item>

        <Form.Item name='toi' label='toi：' rules={[
          { required: false }
        ]}>
          <TimePicker
            format='HH:mm:ss'
            defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
            placeholder='请选择toi'
            style={{ width: '100%' }}
            disabled={tioShow}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default TriggersModal