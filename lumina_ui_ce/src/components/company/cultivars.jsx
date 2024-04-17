/**
 * 企业品类管理弹窗
 */
import { useEffect } from 'react'
import { Tree, Modal, Form } from 'antd'
import { connect } from 'react-redux'
import { useTranslation } from "react-i18next";
import { getCultivatsListAction } from 'state/actions'

function CompanyCultivars(props) {
  const {
    cultivarsList, getCultivatsListAction,
    initValue, openModal, closeModal, onOk
  } = props

  const { t } = useTranslation()
  const [form] = Form.useForm()

  useEffect(() => {
    openModal && !cultivarsList.length && getCultivatsListAction('cn')
  }, [openModal, initValue])

  // 节点选中时触发，设置当前表单的permission值
  const onCheck = (value, node) => {
    const { checked } = value
    form.setFieldsValue({ id_list: checked })
  }

  // 确定提交
  const onOkModal = () => {
    form.validateFields().then(data => {
      form.resetFields()
      onOk(data)
    }).catch(err => console.log(err))
  }

  // oncancelModal
  const oncancelModal = () => {
    form.resetFields()
    closeModal()
  }

  return (
    <Modal
      open={openModal}
      title={t('company.EditCompanyCultivarModalTitle')}
      okText={t("public.button.ok")}
      cancelText={t("public.button.cancel")}
      onCancel={oncancelModal}
      onOk={onOkModal}
      getContainer={false}
      destroyOnClose={true}
    >
      <Form form={form}>
        <Form.Item
          name="id_list" valuePropName='checked'
          rules={[{ required: true, message: t('company.rules.editCultivars') }]}
        >
          <Tree
            checkable
            // 默认选中的key
            defaultCheckedKeys={initValue?.allow_cultivars || []}
            onCheck={onCheck}
            // 不强制关联父子选中状态
            checkStrictly={true}
            treeData={cultivarsList}
            fieldNames={{ key: 'id' }}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

const mapStateToProps = state => {
  const { cultivarsList } = state
  return { cultivarsList }
}

const mapDispatchToProps = {
  getCultivatsListAction
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyCultivars)