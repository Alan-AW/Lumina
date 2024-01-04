/**
 * 房间管理弹窗
 */
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Select, Modal } from 'antd'
import { getCompanyAction } from 'state/actions'
import { useTranslation } from "react-i18next";

function EditModal(props) {
  const {
    companyList, getCompanyAction,
    initValue, openModal, closeModal, onOk, editSate
  } = props
  const [form] = Form.useForm()
  const { t } = useTranslation()

  useEffect(() => {
    openModal && companyList.length === 0 && getCompanyAction()
    openModal && editSate && initValue && form.setFieldsValue(initValue)
  }, [openModal, editSate, initValue])

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
      title={editSate ? t('room.EditModalTitle1') : t('room.EditModalTitle2')}
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
      >

        <Form.Item name='company'  label={t("room.tableTitle.company") + '：'} rules={[
          { required: true, message: t("room.rules.company")}
        ]}>
          <Select
            allowClear
            placeholder={t("room.placeholder.company")}
            style={{ minWidth: '150px' }}
            options={companyList}
          />
        </Form.Item>

        <Form.Item name='serial_number' label={t("room.tableTitle.serial_number") + '：'} rules={[
          { required: true, message: t("room.rules.serial_number") }
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
  const { companyList } = state
  return { companyList }
}

const mapDispatchToProps = {
  getCompanyAction
}

export default connect(mapStateToProps, mapDispatchToProps)(EditModal)
