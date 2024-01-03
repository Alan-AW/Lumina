/**
 * 用户管理弹窗
 */
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Select, Modal } from 'antd'
import { getRoleAction, getCompanyAction } from 'state/actions'
import { useTranslation } from "react-i18next";

function EditModal(props) {
  const {
    getRoleAction, getCompanyAction, roleList, companyList,
    initValue, openModal, closeModal, onOk, editSate
  } = props
  const [form] = Form.useForm()
  const statusChoices = [
    { label: '正常', value: 1 },
    { label: '禁用', value: 0 }
  ]
  let { t } = useTranslation()
  useEffect(() => {
    openModal && roleList.length === 0 && getRoleAction()
    openModal && companyList.length === 0 && getCompanyAction()
    openModal && initValue && form.setFieldsValue(initValue)
  }, [openModal, roleList, initValue])

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
      title={editSate ? t('user.EditModalTitle1') : t('user.EditModalTitle2')}
      okText={t('user.EditModalbtnConfirm')}
      cancelText={t('user.EditModalbtnCancel')}
      onCancel={onCancelModal}
      onOk={onOkModal}
      getContainer={false}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_edit_modal"
      >
        <Form.Item name='id' hidden>
          <Input />
        </Form.Item>

        <Form.Item name='account' label={t("user.tableTitle.account") + '：'} rules={[
          { required: true, message: t("user.rules.account") }
        ]}>
          <Input
            placeholder={t("user.placeholder.account")}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item name='password' label={t("user.tableTitle.password") + '：'} rules={[
          { required: true, message: t("user.rules.password") }
        ]}>
          <Input
            placeholder={t("user.placeholder.password")}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item name='first_name' label={t("user.tableTitle.first_name") + '：'} rules={[
          { required: true, message: t("user.rules.first_name") }
        ]}>
          <Input
            placeholder={t("user.placeholder.first_name")}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item name='last_name' label={t("user.tableTitle.last_name") + '：'} rules={[
          { required: true, message: t("user.rules.last_name") }
        ]}>
          <Input
            placeholder={t("user.placeholder.last_name")}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item name='role' label={t("user.tableTitle.role_label") + '：'} rules={[
          { required: true, message: t("user.rules.role_label") }
        ]}>
          <Select
            allowClear
            placeholder={t("user.placeholder.role_label")}
            style={{ minWidth: '150px' }}
            options={roleList}
          />
        </Form.Item>

        <Form.Item name='company' label={t("user.tableTitle.company_label") + '：'} rules={[
          { required: true, message: t("user.rules.company") }
        ]}>
          <Select
            allowClear
            placeholder={t("user.placeholder.company")}
            style={{ minWidth: '150px' }}
            options={companyList}
          />
        </Form.Item>

        <Form.Item name='status' label={t("user.tableTitle.status_label") + '：'} rules={[
          { required: true, message: t("user.rules.status_label") }
        ]}>
          <Select
            allowClear
            placeholder={t("user.placeholder.status_label")}
            style={{ minWidth: '150px' }}
            options={statusChoices}
          />
        </Form.Item>

        <Form.Item name='language' label={t("user.tableTitle.language_label") + '：'} rules={[
          { required: true, message: t("user.rules.language_label") }
        ]}>
          <Select
            allowClear
            placeholder={t("user.placeholder.language_label")}
            style={{ minWidth: '150px' }}
            options={[{ label: '中文', value: 1 }, { label: 'english', value: 0 }]}
          />
        </Form.Item>

      </Form>
    </Modal>
  )
}

const mapStateToProps = state => {
  const { roleList, companyList } = state
  return { roleList, companyList }
}

const mapDispatchToProps = {
  getRoleAction,
  getCompanyAction
}

export default connect(mapStateToProps, mapDispatchToProps)(EditModal)