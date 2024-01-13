/**
 * 设备功能设置弹窗
 */
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Form, Select, Modal, message } from 'antd'
import { getUnitSetListAction } from 'state/actions'
import { useTranslation } from "react-i18next";
import { getUnitSet, patchUnitSet } from 'network/api'

function SettingModal(props) {
  const { lntl, id, openModal, closeModal, unitSetList, getUnitSetListAction } = props
  const [form] = Form.useForm()
  const { t } = useTranslation()

  useEffect(() => {
    const language = lntl === 'zh_CN' ? 'cn' : 'en'
    if (openModal && unitSetList.length === 0) {
      getUnitSetListAction(language)
    }
    openModal && getData()
  }, [openModal, unitSetList, id, lntl])

  const getData = () => {
    getUnitSet(id).then(res => {
      form.setFieldsValue({ settings: res.data.map(item => item.id) })
    })
  }

  // 关窗
  const onCancelModal = () => {
    closeModal()
  }

  // 提交
  const onOkModal = () => {
    form.validateFields().then(data => {
      patchUnitSet(id, data).then(res => {
        if (res.status) {
          message.success(res.info)
          closeModal()
        } else {
          message.error(res.errs)
        }
      })
    }).catch(err => console.log(err))
  }

  return (
    <>
      <Modal
        open={openModal}
        title={t('unit.SettingModal.Title')}
        okText={t('unit.SettingModal.OkText')}
        cancelText={t('unit.SettingModal.CancelText')}
        onCancel={onCancelModal}
        onOk={onOkModal}
        getContainer={false}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_edit_modal"
        >
          <Form.Item
            name="settings"
            label={t('unit.SettingModal.FormLabel')}
            rules={[{ required: true, message: t('unit.SettingModal.rules.settings') }]}
          >
            <Select
              mode='multiple'
              options={unitSetList}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

const mapStateToProps = state => {
  const { unitSetList, themeConfig: { lntl } } = state
  return { unitSetList, lntl }
}

const mapDispatchToProps = {
  getUnitSetListAction
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingModal)