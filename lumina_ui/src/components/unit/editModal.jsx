/**
 * 机器管理弹窗
 */
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Select, Modal } from 'antd'
import { getRoomAction } from 'state/actions'

function EditModal(props) {
  const {
    getRoomAction, roomList,
    initValue, openModal, closeModal, onOk, editSate
  } = props
  const [form] = Form.useForm()
  const statusChoices = [
    { label: '正常', value: 1 },
    { label: '禁用', value: 0 }
  ]
  useEffect(() => {
    openModal && roomList.length === 0 && getRoomAction()
  }, [openModal, roomList])

  // 动态设置编辑时的表单内容
  const editRowData = JSON.parse(sessionStorage.getItem('editUnitData'))
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
      title={editSate ? '编辑机器' : '添加机器'}
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

        <Form.Item name='status' label='机器状态：' rules={[
          { required: true, message: '机器状态必须选择！' }
        ]}>
          <Select
            allowClear
            placeholder="请选择机器状态"
            style={{ minWidth: '150px' }}
            options={statusChoices}
          />
        </Form.Item>

        <Form.Item name='serial_number' label='机器编号：' rules={[
          { required: true, message: '机器编号不可为空！' }
        ]}>
          <Input
            placeholder='请输入机器编号'
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item name='room' label='所属房间：' rules={[
          { required: true, message: '机器所属房间不可为空！' }
        ]}>
          <Select
            allowClear
            placeholder="请选择房间"
            style={{ minWidth: '150px' }}
            options={roomList}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

const mapStateToProps = state => {
  const { roomList } = state
  return { roomList }
}

const mapDispatchToProps = {
  getRoomAction
}

export default connect(mapStateToProps, mapDispatchToProps)(EditModal)