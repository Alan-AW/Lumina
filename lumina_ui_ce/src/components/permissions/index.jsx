import { useEffect, useState } from 'react'
import { Form, Input, Select, Modal, Switch } from 'antd'
import { getNavPermission } from 'network/api'
import {useTranslation} from "react-i18next";

function EditPermission(props) {
  const {
    initValue, openModal, closeModal, onOk, editSate
  } = props
  const [form] = Form.useForm()
  const [naviPermission, setnaviPermission] = useState([])
  const { t ,i18n} = useTranslation()
  useEffect(() => {
    openModal && initValue && form.setFieldsValue(initValue)
    openModal && !naviPermission.length && getNaviPermissions()
  }, [openModal, initValue])

  const getNaviPermissions = () => {
    getNavPermission().then(res => {
      res.data.forEach(item => {
        item.label = item.title
        item.value = item.id
      })
      setnaviPermission(res.data)
    })
  }

  // 关窗
  const onCancelModal = () => {
    form.resetFields()
    closeModal()
  }

  // 确定提交
  const onOkModal = () => {
    form.validateFields().then(value => {
      if (value.pid_id === undefined) {
        value.pid_id = null
      }
      onOk(value)
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <Modal
      open={openModal}
      title={editSate ? t('Permission.EditPermissions') : t('Permission.AddPermissions')}
      onCancel={onCancelModal}
      onOk={onOkModal}
      getContainer={false}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_edit_modal"
      // initialValues={{ isNaviLink: true }}
      >
        <Form.Item name='id' hidden>
          <Input />
        </Form.Item>

        <Form.Item name='title' label={t('Permission.tableTitle.title')} rules={[
          { required: true, message: t('Permission.rules.title') }
        ]}>
          <Input
            placeholder={t('Permission.placeholder.title')}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item name='url' label={t('Permission.tableTitle.url')}  rules={[
          { required: true, message: t('Permission.rules.url')}
        ]}>
          <Input
              placeholder={t('Permission.placeholder.url')}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item name='isNaviLink' valuePropName="checked" label={t('Permission.tableTitle.MenuPermissions')} rules={[
          { required: true, message: t('Permission.rules.isNaviLink')}
        ]}>
          <Switch
            checkedChildren={t('Permission.OK')}
            unCheckedChildren={t('Permission.OFF')}
          // defaultChecked={true}
          />
        </Form.Item>

        <Form.Item name='pid_id'label={t('Permission.tableTitle.pid_id')} rules={[
          { required: false }
        ]}>
          <Select
            allowClear
            placeholder={t('Permission.tableTitle.pid_id')}
            style={{ minWidth: '150px' }}
            options={naviPermission}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditPermission
