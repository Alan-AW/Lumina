/**
 * 品类管理页面指令控制分配表单
 */
import { useEffect, useState } from 'react'
import { Form, message, Modal, InputNumber, Tree } from 'antd'
import { connect } from 'react-redux'
import { useTranslation } from "react-i18next";
import { choicesAlgorithm } from 'network/api'


function AlgorithmEditModal(props) {
  const {
    lntl, initValue, openModal, closeModal, onOk
  } = props
  const language = lntl === 'zh_CN' ? 'cn' : 'en'
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [choicesList, setChoicesList] = useState([])

  useEffect(() => {
    openModal && getData()
    openModal && initValue && form.setFieldsValue(initValue)
  }, [openModal, initValue])

  const getData = () => {
    choicesAlgorithm(language).then(res => {
      if (res.status) {
        setChoicesList(res.data)
      } else {
        message.error(res.errs)
      }
    })
  }

  // 关窗
  const onCancelModal = () => {
    form.resetFields()
    closeModal()
  }

  // 节点选中时触发，设置当前表单的algorithm值
  const onCheck = (value, node) => {
    const { checked } = value
    form.setFieldsValue({ id: initValue.id, algorithm: checked })
  }

  // 确定提交
  const onOkModal = () => {
    form.validateFields().then(value => {
      form.resetFields()
      onOk(value)
    }).catch(err => console.log(err))
  }

  return (
    <Modal
      open={openModal}
      title={t('cultivar.EditAlgorithm')}
      destroyOnClose={true}
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
        <Form.Item name="id" hidden><InputNumber /></Form.Item>

        <Form.Item name="algorithm" valuePropName='checked' label={t('cultivar.tableTitle.algorithm')}
          rules={[
            { required: true, message: t('roles.rules.algorithm') },
          ]}
        >
          <Tree
            checkable
            // 默认选中的key
            defaultCheckedKeys={initValue?.algorithm || []}
            onCheck={onCheck}
            // 不强制关联父子选中状态
            checkStrictly={true}
            treeData={choicesList}
            fieldNames={{ key: 'id' }}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

const mapStateToProps = state => {
  const { themeConfig: { lntl } } = state
  return { lntl }
}

export default connect(mapStateToProps)(AlgorithmEditModal)