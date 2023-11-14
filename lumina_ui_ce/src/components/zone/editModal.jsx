/**
 * 区域管理弹窗
 */
import { useEffect } from 'react'
import { Form, Input, Select, Modal } from 'antd'
import {useTranslation} from "react-i18next";

function EditModal(props) {
  const { initValue, openModal, closeModal, onOk, editSate } = props
  const [form] = Form.useForm()
  const  {t} = useTranslation()
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
      title={editSate ? t('Zone.EditModalTitle1'):t('Zone.EditModalTitle2')}
      okText={t('Zone.EditModalbtnConfirm')}
      cancelText={t('Zone.EditModalbtnCancel')}
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

        <Form.Item name='status' label={t("Zone.tableTitle.status_label")+': '} rules={[
          { required: true, message: t("Zone.rules.status_label") }
        ]}>
          <Select
            allowClear
            placeholder={t("Zone.placeholder.status_label")}
            style={{ minWidth: '150px' }}
            options={statusChoices}
          />
        </Form.Item>

        <Form.Item name='name' label={t("Zone.tableTitle.name")+': '} rules={[
          { required: true, message: t("Zone.rules.name")}
        ]}>
          <Input
              placeholder={t("Zone.placeholder.name")}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item name='time_zone' label={t("Zone.tableTitle.time_zone")+': '} rules={[
          { required: true, message:  t("Zone.rules.time_zone") }
        ]}>
          <Input
              placeholder={t("Zone.placeholder.time_zone")}
            style={{ width: '100%' }}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditModal