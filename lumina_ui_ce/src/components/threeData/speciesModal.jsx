import { useEffect } from 'react'
import { Form, Input, Modal } from 'antd'
import { useTranslation } from "react-i18next";

function SpeciesModal(props) {
    const { initValue, openModal, closeModal, onOk } = props
    const [form] = Form.useForm()
    const { t } = useTranslation()
    useEffect(() => {
        form.setFieldsValue(initValue)
    }, [initValue])

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
            title={t('threeTable.EditModalTitle1')}
            okText={t('threeTable.EditModalbtnConfirm')}
            cancelText={t('threeTable.EditModalbtnCancel')}
            onCancel={onCancelModal}
            onOk={onOkModal}
            getContainer={false}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_edit_modal"
            >

                <Form.Item name='id' hidden rules={[{ required: false }]}>
                    <Input />
                </Form.Item>

                <Form.Item name='name_en' label={t("threeTable.tableTitle.name_en") + ': '} rules={[
                    { required: true, message: t("threeTable.rules.message") }
                ]}>
                    <Input
                        placeholder={t("threeTable.placeholder.message", { val: 'name_en' })}
                        style={{ width: '100%' }}
                    />
                </Form.Item>

                <Form.Item name='name_cn' label={t("threeTable.tableTitle.name_en") + ': '} rules={[
                    { required: true, message: t("threeTable.rules.message") }
                ]}>
                    <Input
                        placeholder={t("threeTable.placeholder.message", { val: 'name_cn' })}
                        style={{ width: '100%' }}
                    />
                </Form.Item>

                <Form.Item name='description_en' label={t("threeTable.tableTitle.name_en") + ': '} rules={[
                    { required: true, message: t("threeTable.rules.message") }
                ]}>
                    <Input
                        placeholder={t("threeTable.placeholder.message", { val: 'description_en' })}
                        style={{ width: '100%' }}
                    />
                </Form.Item>

                <Form.Item name='description_cn' label={t("threeTable.tableTitle.name_en") + ': '} rules={[
                    { required: true, message: t("threeTable.rules.message") }
                ]}>
                    <Input
                        placeholder={t("threeTable.placeholder.message", { val: 'description_cn' })}
                        style={{ width: '100%' }}
                    />
                </Form.Item>

            </Form>
        </Modal>
    )
}

export default SpeciesModal