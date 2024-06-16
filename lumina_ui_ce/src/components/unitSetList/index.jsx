import { useEffect } from 'react'
import { Form, Input, Modal, Select } from 'antd'
import { useTranslation } from "react-i18next";

function UnitSetListModal(props) {
  const {
    initValue, openModal, closeModal, onOk, editSate
  } = props
  const { t, i18n } = useTranslation()
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
      title={editSate ? t('unitSetList.EditModal') : t('unitSetList.AddModal')}
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

        <Form.Item name='cmd' label={t('unitSetList.tableTitle.cmd')} rules={[
          { required: true, message: t('unitSetList.rules.cmd') }
        ]}>
          <Input
            placeholder={t('unitSetList.placeholder.cmd')}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item name='category_cn' label={t('unitSetList.tableTitle.category_cn')} rules={[
          { required: true, message: t('unitSetList.rules.category_cn') }
        ]}>
          <Select
            placeholder={t('unitSetList.placeholder.category_cn')}
            style={{ width: '100%' }}
            options={[
              { label: '营养液及灌溉', value: 1 },
              { label: '日夜周期', value: 2 },
              { label: '气候控制', value: 3 },
              { label: '光合作用', value: 4 },
              { label: '系统设备', value: 5 }
            ]}
          />
        </Form.Item>

        <Form.Item name='category_en' label={t('unitSetList.tableTitle.category_en')} rules={[
          { required: true, message: t('unitSetList.rules.category_en') }
        ]}>
          <Select
            placeholder={t('unitSetList.placeholder.category_en')}
            style={{ width: '100%' }}
            options={[
              { label: 'Fertigation', value: 1 },
              { label: 'Day-Night Cycle', value: 2 },
              { label: 'Climate Control', value: 3 },
              { label: 'Photosynthesis', value: 4 },
              { label: 'System', value: 5 }
            ]}
          />
        </Form.Item>

        <Form.Item name='desc_cn' label={t('unitSetList.tableTitle.desc_cn')} rules={[
          { required: true, message: t('unitSetList.rules.desc_cn') }
        ]}>
          <Input
            placeholder={t('unitSetList.placeholder.desc_cn')}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item name='desc_en' label={t('unitSetList.tableTitle.desc_en')} rules={[
          { required: true, message: t('unitSetList.rules.desc_en') }
        ]}>
          <Input
            placeholder={t('unitSetList.placeholder.desc_en')}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item name='component' label={t('unitSetList.tableTitle.component')} rules={[
          { required: true, message: t('unitSetList.rules.component') }
        ]}>
          <Select
            placeholder={t('unitSetList.placeholder.component')}
            style={{ width: '100%' }}
            options={[{ label: 'slide', value: 1 }, { label: 'switch', value: 2 }]}
          />
        </Form.Item>

        <Form.Item name='min_value' label={t('unitSetList.tableTitle.min_value')} rules={[
          { required: false, message: t('unitSetList.rules.min_value') }
        ]}>
          <Input
            placeholder={t('unitSetList.placeholder.min_value')}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item name='max_value' label={t('unitSetList.tableTitle.max_value')} rules={[
          { required: false, message: t('unitSetList.rules.max_value') }
        ]}>
          <Input
            placeholder={t('unitSetList.placeholder.max_value')}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item name='step' label={t('unitSetList.tableTitle.step')} rules={[
          { required: false, message: t('unitSetList.rules.step') }
        ]}>
          <Input
            placeholder={t('unitSetList.placeholder.step')}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item name='unit_cn' label={t('unitSetList.tableTitle.unit_cn')} rules={[
          { required: false, message: t('unitSetList.rules.unit_cn') }
        ]}>
          <Input
            placeholder={t('unitSetList.placeholder.unit_cn')}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item name='unit_en' label={t('unitSetList.tableTitle.unit_en')} rules={[
          { required: false, message: t('unitSetList.rules.unit_en') }
        ]}>
          <Input
            placeholder={t('unitSetList.placeholder.unit_en')}
            style={{ width: '100%' }}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UnitSetListModal