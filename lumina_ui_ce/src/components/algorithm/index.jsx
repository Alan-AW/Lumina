/**
 * 算法管理表单
 */
import { useEffect, useState } from 'react'
import { Form, Input, Modal, Switch, message } from 'antd'
import ReactJson from 'react-json-view'
import { useTranslation } from "react-i18next";

const defaultInitValue = {
  choices_cn: [],
  choices_en: [],
  cmd: {},
  app_show: true,
  push: true
}

function AlgorithmEditModal(props) {
  const {
    initValue, openModal, closeModal, onOk, editSate
  } = props
  const [jsonVal, setjsonVal] = useState({
    choices_cn: [],
    choices_en: [],
    cmd: {}
  })
  const { t } = useTranslation()
  const [form] = Form.useForm()
  useEffect(() => {
    if (openModal && initValue) {
      form.setFieldsValue(initValue)
      const { choices_cn, choices_en, cmd } = initValue
      setjsonVal({ choices_cn, choices_en, cmd })
    }
    openModal && !initValue && form.setFieldsValue(defaultInitValue)
  }, [openModal, initValue])
  // 关窗
  const onCancelModal = () => {
    form.resetFields()
    closeModal()
  }

  // 确定提交
  const onOkModal = () => {
    form.validateFields().then(value => {
      const jsonResult = validateJson()
      if (!jsonResult) {
        return message.error(t('algorithm.rules.jsonError'))
      }
      form.resetFields()
      onOk({ ...value, ...jsonVal })
    }).catch(err => {
      console.log(err);
    })
  }

  // 提交数据之前验证json数据结构
  const validateJson = () => {
    const { choices_cn, choices_en, cmd } = jsonVal;
    if (choices_cn && choices_en && cmd) {
      return true;
    } else {
      return false;
    }
  }

  // json数据变化回调
  const handleJsonChange = (key, value) => {
    const { updated_src } = value
    setjsonVal({ ...jsonVal, [key]: updated_src })
  }
  return (
    <Modal
      open={openModal}
      title={editSate ? t('algorithm.EditAlgorithm') : t('algorithm.AddAlgorithm')}
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
      >
        <Form.Item name='id' hidden>
          <Input />
        </Form.Item>

        <Form.Item name='subject_cn' label={t('algorithm.tableTitle.subject_cn')}
          rules={[{ required: true, message: t('algorithm.rules.subject_cn') }]}
        >
          <Input
            placeholder={t('algorithm.placeholder.subject_cn')}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item name='subject_en' label={t('algorithm.tableTitle.subject_en')}
          rules={[{ required: true, message: t('algorithm.rules.subject_en') }]}
        >
          <Input
            placeholder={t('algorithm.placeholder.subject_en')}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item name='title_cn' label={t('algorithm.tableTitle.title_cn')}
          rules={[{ required: true, message: t('algorithm.rules.title_cn') }]}
        >
          <Input
            placeholder={t('algorithm.placeholder.title_cn')}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item name='title_en' label={t('algorithm.tableTitle.title_en')}
          rules={[{ required: true, message: t('algorithm.rules.title_en') }]}
        >
          <Input
            placeholder={t('algorithm.placeholder.title_en')}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item name='desc_cn' label={t('algorithm.tableTitle.desc_cn')}
          rules={[{ required: true, message: t('algorithm.rules.desc_cn') }]}
        >
          <Input
            placeholder={t('algorithm.placeholder.desc_cn')}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item name='desc_en' label={t('algorithm.tableTitle.desc_en')}
          rules={[{ required: true, message: t('algorithm.rules.desc_en') }]}
        >
          <Input
            placeholder={t('algorithm.placeholder.desc_en')}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item label={t('algorithm.tableTitle.choices_cn')}
          rules={[{ required: false, message: t('algorithm.rules.choices_cn') }]}
        >
          <ReactJson
            src={initValue?.choices_cn || defaultInitValue.choices_cn}
            name='choices_cn'
            onAdd={value => handleJsonChange('choices_cn', value)}
            onEdit={value => handleJsonChange('choices_cn', value)}
            onDelete={value => handleJsonChange('choices_cn', value)}
            enableClipboard={true}
            theme='rjv-default-dark'
            width='100%'
            height='60px'
          />
        </Form.Item>

        <Form.Item label={t('algorithm.tableTitle.choices_en')}
          rules={[{ required: false, message: t('algorithm.rules.choices_en') }]}
        >
          <ReactJson
            src={initValue?.choices_en || defaultInitValue.choices_en}
            name='choices_en'
            onAdd={value => handleJsonChange('choices_en', value)}
            onEdit={value => handleJsonChange('choices_en', value)}
            onDelete={value => handleJsonChange('choices_en', value)}
            enableClipboard={true}
            theme='rjv-default-dark'
            width='100%'
            height='60px'
          />
        </Form.Item>

        <Form.Item label={t('algorithm.tableTitle.cmd')}
          rules={[{ required: false, message: t('algorithm.rules.cmd') }]}
        >
          <ReactJson
            src={initValue?.cmd || defaultInitValue.cmd}
            name='cmd'
            onAdd={value => handleJsonChange('cmd', value)}
            onEdit={value => handleJsonChange('cmd', value)}
            onDelete={value => handleJsonChange('cmd', value)}
            enableClipboard={true}
            theme='rjv-default-dark'
            width='100%'
            height='60px'
          />
        </Form.Item>

        <Form.Item
          name='app_show'
          valuePropName='checked'
          label={t('algorithm.tableTitle.app_show')}
          rules={[{ required: true, message: t('algorithm.rules.app_show') }]}
        >
          <Switch checkedChildren={t('algorithm.placeholder.on')} unCheckedChildren={t('algorithm.placeholder.off')} defaultChecked />
        </Form.Item>

        <Form.Item
          name='push'
          valuePropName='checked'
          label={t('algorithm.tableTitle.push')}
          rules={[{ required: true, message: t('algorithm.rules.push') }]}
        >
          <Switch checkedChildren={t('algorithm.placeholder.on')} unCheckedChildren={t('algorithm.placeholder.off')} defaultChecked />
        </Form.Item>

      </Form>
    </Modal>
  )
}

export default AlgorithmEditModal