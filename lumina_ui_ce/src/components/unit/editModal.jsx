/**
 * 机器管理弹窗
 */
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Select, Modal } from 'antd'
import { getRoomAction } from 'state/actions'
import { useTranslation } from "react-i18next";

function EditModal(props) {
    const {
        getRoomAction, roomList,
        initValue, openModal, closeModal, onOk, editSate
    } = props
    const [form] = Form.useForm()
    const { t } = useTranslation()
    const statusChoices = [
        { label: '正常', value: 1 },
        { label: '禁用', value: 0 }
    ]

    // 动态设置编辑时的表单内容
    useEffect(() => {
        openModal && roomList.length === 0 && getRoomAction()
        openModal && initValue && form.setFieldsValue(initValue)
    }, [initValue, openModal, roomList])

    // 关窗
    const onCancelModal = () => {
        form.resetFields()
        closeModal()
    }

    // 确定提交
    const onOkModal = () => {
        form.validateFields().then(value => {
            form.resetFields()
            form.resetFields()
            onOk(value)
        }).catch(err => {
            console.log(err);
        })
    }
    return (
        <Modal
            open={openModal}
            title={editSate ? t('user.EditModalTitle1') : t('user.EditModalTitle2')}
            okText="确定"
            cancelText="取消"
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

                <Form.Item name='status' label={t("unit.tableTitle.status_label") + '：'} rules={[
                    { required: true, message: t("unit.rules.status_label") }
                ]}>
                    <Select
                        allowClear
                        placeholder={t("unit.placeholder.status_label")}
                        style={{ minWidth: '150px' }}
                        options={statusChoices}
                    />
                </Form.Item>

                <Form.Item name='serial_number' label={t("unit.tableTitle.serial_number") + '：'} rules={[
                    { required: true, message: t("unit.rules.serial_number") }
                ]}>
                    <Input
                        placeholder={t("unit.placeholder.serial_number")}
                        style={{ width: '100%' }}
                    />
                </Form.Item>

                <Form.Item name='deviceId' label={t("unit.tableTitle.deviceId") + '：'} rules={[
                    { required: true, message: t("unit.rules.deviceId") }
                ]}>
                    <Input
                        placeholder={t("unit.placeholder.deviceId")}
                        style={{ width: '100%' }}
                    />
                </Form.Item>

                <Form.Item name='deviceSecret' label={t("unit.tableTitle.deviceSecret") + '：'} rules={[
                    { required: true, message: t("unit.rules.deviceSecret") }
                ]}>
                    <Input
                        placeholder={t("unit.placeholder.deviceSecret")}
                        style={{ width: '100%' }}
                    />
                </Form.Item>

                <Form.Item name='room' label={t("unit.tableTitle.room") + '：'} rules={[
                    { required: true, message: t("unit.rules.room") }
                ]}>
                    <Select
                        allowClear
                        placeholder={t("unit.placeholder.room")}
                        style={{ minWidth: '150px' }}
                        options={roomList}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}

const mapStateToProps = state => {
    const { roomList } = state
    return { roomList }
}

const mapDispatchToProps = {
    getRoomAction
}

export default connect(mapStateToProps, mapDispatchToProps)(EditModal)