/**
 * 编辑品类弹窗
 */
import { useEffect, useState } from 'react'
import { Form, Input, Modal, InputNumber, message, Image } from 'antd'
import { useTranslation } from "react-i18next";
import { uploadFileApi } from 'network/api'
import UploadImg from 'components/upload'
import getBaseUrl from 'network/baseUrl'


function CultivarEditModal(props) {
  const {
    initValue, openModal, closeModal, onOk, editSate
  } = props
  const { t } = useTranslation()
  const [form] = Form.useForm()

  const [imgUrl, setimgUrl] = useState('')

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

  // 上传组件回调上传方法
  const uploadCompanyLogo = fileData => {
    const { data } = fileData
    uploadFileApi('cultivar', { file: data }).then(res => {
      if (res.status) {
        // 上传成功
        const { data: { url } } = res
        form.setFieldsValue({ icon: url })
        setimgUrl(`${getBaseUrl()}${url}`)
        message.success(res.info)
      } else {
        message.error(res.errs)
      }
      return true
    }).catch(err => {
      console.log(err)
      return false
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
          <UploadImg
            api={uploadCompanyLogo}
            maxFile={1}
            disabled={false}
            useCrop={true}
          />
          {
            imgUrl && <Image src={imgUrl} width={250} />
          }
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