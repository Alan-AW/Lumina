/**
 * 用户管理弹窗
 */
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Select, Modal } from 'antd'
import { getRoleAction } from 'state/actions'
import {useTranslation} from "react-i18next";

function EditModal(props) {
  const {
    getRoleAction, roleList,
    initValue, openModal, closeModal, onOk, editSate
  } = props
  const [form] = Form.useForm()
  const statusChoices = [
    { label: '正常', value: 1 },
    { label: '禁用', value: 0 }
  ]
  let { t } =  useTranslation()
  useEffect(() => {
    openModal && roleList.length === 0 && getRoleAction()
  }, [openModal, roleList])

  // 动态设置编辑时的表单内容
  const editRowData = JSON.parse(sessionStorage.getItem('editUserData'))
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
      title={editSate ? t('user.EditModalTitle1'):t('user.EditModalTitle2')}
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
        initialValues={initValue}
      >
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

        <Form.Item name='last_name' label={t("user.tableTitle.last_name") + '：'}  rules={[
          { required: true, message: t("user.rules.last_name")}
        ]}>
          <Input
              placeholder={t("user.placeholder.last_name")}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item name='role' label={t("user.tableTitle.role_label") + '：'} rules={[
          { required: true, message:  t("user.rules.role_label") }
        ]}>
          <Select
            allowClear
            placeholder={t("user.placeholder.role_label")}
            style={{ minWidth: '150px' }}
            options={roleList}
          />
        </Form.Item>

        <Form.Item name='status'  label={t("user.tableTitle.status_label") + '：'} rules={[
          { required: true, message: t("user.rules.status_label") }
        ]}>
          <Select
            allowClear
            placeholder={t("user.placeholder.status_label")}
            style={{ minWidth: '150px' }}
            options={statusChoices}
          />
        </Form.Item>

        <Form.Item name='chinese' label={t("user.tableTitle.chinese_label") + '：'} rules={[
          { required: true, message: t("user.rules.chinese_label") }
        ]}>
          <Select
            allowClear
            placeholder={t("user.placeholder.chinese_label")}
            style={{ minWidth: '150px' }}
            options={[{ label: 'chinese', value: 1 }, { label: 'english', value: 0 }]}
          />
        </Form.Item>

      </Form>
    </Modal>
  )
}

const mapStateToProps = state => {
  const { roleList } = state
  return { roleList }
}

const mapDispatchToProps = {
  getRoleAction
}

export default connect(mapStateToProps, mapDispatchToProps)(EditModal)