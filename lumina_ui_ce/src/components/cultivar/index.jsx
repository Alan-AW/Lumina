/**
 * 编辑品类弹窗
 */
import { useEffect } from 'react'
import { Form, Input, Modal, InputNumber } from 'antd'
import { useTranslation } from "react-i18next";

function CultivarEditModal(props) {
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
      title={editSate ? t('cultivar.EditCultivar') : t('cultivar.AddCultivar')}
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
        <Form.Item name='id' hidden>
          <Input />
        </Form.Item>

        <Form.Item name='icon' label={t('cultivar.tableTitle.icon')}
          rules={[{ required: true, message: t('cultivar.rules.icon') }]}
        >
          <Input
            placeholder={t('cultivar.placeholder.icon')}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item name='name_cn' label={t('cultivar.tableTitle.name_cn')}
          rules={[{ required: true, message: t('cultivar.rules.name_cn') }]}
        >
          <Input
            placeholder={t('cultivar.placeholder.name_cn')}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item name='name_en' label={t('cultivar.tableTitle.name_en')}
          rules={[{ required: true, message: t('cultivar.rules.name_en') }]}
        >
          <Input
            placeholder={t('cultivar.placeholder.name_en')}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item name='desc_cn' label={t('cultivar.tableTitle.desc_cn')}
          rules={[{ required: true, message: t('cultivar.rules.desc_cn') }]}
        >
          <Input
            placeholder={t('cultivar.placeholder.desc_cn')}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item name='desc_en' label={t('cultivar.tableTitle.desc_en')}
          rules={[{ required: true, message: t('cultivar.rules.desc_en') }]}
        >
          <Input
            placeholder={t('cultivar.placeholder.desc_en')}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item name='cycle' label={t('cultivar.tableTitle.cycle')}
          rules={[{ required: true, message: t('cultivar.rules.cycle') }]}
        >
          <InputNumber
            min={1}
            max={999}
            step={1}
            placeholder={t('cultivar.placeholder.cycle')}
            style={{ width: '100%' }}
          />
        </Form.Item>

      </Form>
    </Modal>
  )
}

export default CultivarEditModal