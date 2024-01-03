/**
 * 编辑角色弹窗
 */
import { useEffect, useState } from 'react'
import { Modal, Form, Input, Tree } from 'antd'
import { getPermission } from 'network/api'

function RolesEditModal(props) {
  const {
    initValue, openModal, closeModal, onOk, editSate
  } = props

  const [allPermissions, setAllPermissions] = useState([])
  const [form] = Form.useForm()

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
      onOk(value)
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <Modal
      open={openModal}
      title={editSate ? '编辑角色信息' : '添加角色'}
      okText='ok'
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

        <Form.Item name="title" label="角色名称"
          rules={[
            { required: true, message: '角色名不可为空!' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="permission" valuePropName='checked' label="可访问权限"
          rules={[
            { required: true, message: '每个角色至少有一个权限!' },
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