/**
 * 企业管理弹窗
 */
import { useEffect } from 'react'
import { Form, Input, Modal } from 'antd'
import { useTranslation } from "react-i18next";

function CompanyEditModal(props) {
  const {
    initValue, openModal, closeModal, onOk, editSate
  } = props
  const { t } = useTranslation()
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
      form.resetFields()
      onOk(value)
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <Modal
      open={openModal}
      title={editSate ? t('company.EditCompany') : t('company.AddCompany')}
      okText={t("public.button.ok")}
      cancelText={t("public.button.cancel")}
      onCancel={onCancelModal}
      onOk={onOkModal}
      getContainer={false}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_edit_modal"
        initialValues={{ address: '', legal_rep: '', tel: '', email: '' }}
      >
        <Form.Item name='id' hidden>
          <Input />
        </Form.Item>

        <Form.Item name='name' label={t('company.tableTitle.name')} rules={[
          { required: true, message: t('company.rules.name') }
        ]}>
          <Input
            placeholder={t('company.placeholder.name')}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item name='address' label={t('company.tableTitle.address')} >
          <Input
            placeholder={t('company.placeholder.address')}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item name='legal_rep' label={t('company.tableTitle.legal_rep')}>
          <Input
            placeholder={t('company.placeholder.legal_rep')}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item name='tel' label={t('company.tableTitle.tel')}>
          <Input
            placeholder={t('company.placeholder.tel')}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item name='email' label={t('company.tableTitle.email')} >
          <Input
            placeholder={t('company.placeholder.email')}
            style={{ width: '100%' }}
          />
        </Form.Item>

      </Form>
    </Modal>
  )
}

export default CompanyEditModal
