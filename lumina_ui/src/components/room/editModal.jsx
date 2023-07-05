/**
 * 房间管理弹窗
 */
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Select, Modal } from 'antd'
import { getZoneAction } from 'state/actions'

function EditModal(props) {
  const {
    zoneList, getZoneAction,
    initValue, openModal, closeModal, onOk, editSate
  } = props
  const [form] = Form.useForm()

  useEffect(() => {
    openModal && zoneList.length === 0 && getZoneAction()
  }, [openModal])

  // 动态设置编辑时的表单内容
  const editRowData = JSON.parse(sessionStorage.getItem('editRowData'))
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
      title={editSate ? '编辑房间' : '添加房间'}
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

        <Form.Item name='zone' label='选择区域：' rules={[
          { required: true, message: '区域必须选择！' }
        ]}>
          <Select
            allowClear
            placeholder="请选择区域"
            style={{ minWidth: '150px' }}
            options={zoneList}
          />
        </Form.Item>

        <Form.Item name='serial_number' label='房间编号：' rules={[
          { required: true, message: '房间编号不可为空！' }
        ]}>
          <Input
            placeholder='请输入房间编号！'
            style={{ width: '100%' }}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

const mapStateToProps = state => {
  const { zoneList } = state
  return { zoneList }
}

const mapDispatchToProps = {
  getZoneAction
}

export default connect(mapStateToProps, mapDispatchToProps)(EditModal)