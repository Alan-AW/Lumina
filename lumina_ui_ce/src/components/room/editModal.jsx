/**
 * 房间管理弹窗
 */
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Select, Modal } from 'antd'
import { getZoneAction } from 'state/actions'
import {useTranslation} from "react-i18next";

function EditModal(props) {
  const {
    zoneList, getZoneAction,
    initValue, openModal, closeModal, onOk, editSate
  } = props
  const [form] = Form.useForm()
  const { t } =  useTranslation()
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
      title={editSate ? t('room.EditModalTitle1'):t('room.EditModalTitle2')}
      okText={t('room.EditModalbtnConfirm')}
      cancelText={t('room.EditModalbtnCancel')}
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

        <Form.Item name='zone' label={t("room.tableTitle.zone") + '：'} rules={[
          { required: true, message: t("room.rules.zone") }
        ]}>
          <Select
            allowClear
            placeholder={t("room.placeholder.zone")}
            style={{ minWidth: '150px' }}
            options={zoneList}
          />
        </Form.Item>

        <Form.Item name='serial_number' label={t("room.tableTitle.serial_number") + '：'} rules={[
          { required: true, message: t("room.rules.serial_number")}
        ]}>
          <Input
              placeholder={t("room.placeholder.serial_number")}
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