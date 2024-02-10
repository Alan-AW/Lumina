/**
 * 编辑角色弹窗
 */
import { useEffect, useState } from 'react'
import { Modal, Form, Input, Tree } from 'antd'
import { getPermission } from 'network/api'
import { useTranslation } from "react-i18next";

function RolesEditModal(props) {
  const {
    initValue, openModal, closeModal, onOk, editSate
  } = props

  const [allPermissions, setAllPermissions] = useState([])
  const [form] = Form.useForm()
  const { t, i18n } = useTranslation()
  useEffect(() => {
    // 开窗时当树allPermissions 为空时，获取所有权限树
    openModal && !allPermissions.length && getData()
    // 开窗时当initValue 不为空时，设置表单初始值
    openModal && initValue && form.setFieldsValue(initValue)
  }, [openModal, initValue])

  // 获取所有权限树
  const getData = () => {
    getPermission(null).then(res => {
      if (res.status) {
        setAllPermissions(res.data)
      }
    })
  }

  // 节点选中时触发，设置当前表单的permission值
  const onCheck = (value, node) => {
    const { checked } = value
    form.setFieldsValue({ permission: checked })
  }

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
      title={editSate ? t('roles.EditRoles') : t('roles.AddRoles')}
      okText='ok'
      destroyOnClose={true}
      cancelText='cancel'
      onCancel={onCancelModal}
      onOk={onOkModal}
      getContainer={false}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_edit_modal"
      >
        <Form.Item name="id" hidden>
          <Input />
        </Form.Item>

        <Form.Item name="title" label={t('roles.tableTitle.title')}
          rules={[
            { required: true, message: t('roles.rules.title') },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="permission" valuePropName='checked' label={t('roles.tableTitle.permission')}
          rules={[
            { required: true, message: t('roles.rules.permission') },
          ]}
        >
          <Tree
            checkable
            // 默认展开的key
            // defaultExpandedKeys={['0-0-0', '0-0-1']}
            // 默认选择的key
            // defaultSelectedKeys={['0-0-0', '0-0-1']}
            // 默认选中的key
            defaultCheckedKeys={initValue?.permission || []}
            onCheck={onCheck}
            // 不强制关联父子选中状态
            checkStrictly={true}
            treeData={allPermissions}
            fieldNames={{ key: 'id' }}
          />
        </Form.Item>

      </Form>
    </Modal>
  )
}

export default RolesEditModal
