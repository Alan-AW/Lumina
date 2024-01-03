import { useState, useEffect, useMemo } from 'react'
import { Table, notification, Button, message, Popconfirm } from 'antd'
import { PlusOutlined, DeleteOutlined, QuestionCircleOutlined, EditOutlined } from '@ant-design/icons'
import { getUnit, postUnit, patchUnit, deleteUnit } from 'network/api'
import EditModalForm from 'components/unit/editModal'
import { FADEIN, pageSize } from 'contants'
import { openNotification } from 'utils'
import { useTranslation } from "react-i18next";


function Unit() {
    const [api, contextHolder] = notification.useNotification()
    const [params, setparams] = useState({ page: 1 })
    const [tableData, settableData] = useState([])
    const [tableDataCount, settableDataCount] = useState(0)
    const [openModal, setopenModal] = useState(false)
    const [editSate, seteditSate] = useState(false)
    const { t } = useTranslation()
    const tableTitle = [
        {
            title: t("unit.tableTitle.index"),
            align: 'center',
            render: (row, value, index) => <b>{index + 1}</b>
        },
        {
            title: t("unit.tableTitle.serial_number"),
            align: 'center',
            dataIndex: 'serial_number'
        },
        {
            title: t("unit.tableTitle.deviceId"),
            align: 'center',
            dataIndex: 'deviceId'
        },
        {
            title: t("unit.tableTitle.deviceSecret"),
            align: 'center',
            dataIndex: 'deviceSecret'
        },
        {
            title: t("unit.tableTitle.room_number"),
            align: 'center',
            dataIndex: 'room_number'
        },
        {
            title: t("unit.tableTitle.status_label"),
            align: 'center',
            dataIndex: 'status_label'
        },
        {
            title: t("unit.tableTitle.create_time"),
            align: 'center',
            dataIndex: 'create_time'
        },
        {
            title: t("unit.tableTitle.update_time"),
            align: 'center',
            dataIndex: 'update_time'
        },
        {
            title: t("unit.tableTitle.action"),
            align: 'center',
            render: row => (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
                    <Button
                        type='primary'
                        shape='circle'
                        icon={<EditOutlined />}
                        onClick={() => editClick(row)}
                    />
                    <Popconfirm
                        title={t("unit.deltitle")}
                        description={t("unit.description")}
                        okText="Yes"
                        okType='danger'
                        cancelText="No"
                        onConfirm={() => deleteRow(row)}
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                    >
                        <Button
                            shape='circle'
                            danger
                            icon={<DeleteOutlined />}
                        />
                    </Popconfirm>
                </div>
            )
        }
    ]

    useEffect(() => {
        getData()
    }, [params])

    const getData = () => {
        getUnit(params).then(res => {
            if (res.status) {
                settableData(res.data.results)
                settableDataCount(res.data.count)
            }
        })
    }

    // 删除回调
    const deleteRow = row => {
        deleteUnit(row.id).then(res => {
            if (res.status) {
                settableData(tableData.filter(item => item.id !== res.data))
                settableDataCount(tableDataCount - 1)
                message.success(res.info)
            } else {
                message.error(res.errs)
            }
        })
    }

    // 点击添加
    const addClick = () => {
        setopenModal(true)
        seteditSate(false)
    }

    // 点击编辑
    const editClick = row => {
        const { id, serial_number, deviceId, deviceSecret, components, status, room } = row
        seteditSate(true)
        sessionStorage.setItem('editUnitId', id)
        sessionStorage.setItem('editUnitData', JSON.stringify({
            serial_number,
            status,
            room,
            deviceId,
            deviceSecret,
            components
        }))
        setopenModal(true)
    }

    // 提交
    const onOk = value => {
        // 取出组件列表数据
        const { components } = value
        // 将组件列表字符串为一个数组
        let components_list = components.split(',')
        // 删除空字符串
        components_list = components_list.filter(item => item !== '')
        if (components_list.length === 0) {
            return message.error('组件列表不能只输入 ,')
        }
        value.components = components_list
        if (editSate) {
            const id = sessionStorage.getItem('editUnitId')
            patchUnit(id, value).then(res => {
                if (res.status) {
                    settableData(tableData.map(item => {
                        if (item.id === res.data.id) {
                            item = res.data
                        }
                        return item
                    }))
                    closeModal()
                    message.success(res.info)
                } else {
                    openNotification(api, 'error', res.errs)
                }
            })
        } else {
            postUnit(value).then(res => {
                if (res.status) {
                    settableData([res.data, ...tableData])
                    settableDataCount(tableDataCount + 1)
                    closeModal()
                    message.success(res.info)
                } else {
                    openNotification(api, 'error', res.errs)
                }
            })
        }
    }

    // 关窗
    const closeModal = () => {
        sessionStorage.setItem('editUnitData', JSON.stringify({
            serial_number: '', status: null, room: null,
            deviceId: '', deviceSecret: '', components: ''
        }))
        setopenModal(false)
    }

    // 分页
    const paginationProps = {
        total: tableDataCount,
        pageSize,
        onChange: page => setparams({ page })
    }

    // 表格
    const table = useMemo(() => (
        <Table
            title={() => t("unit.title")}
            className={FADEIN}
            dataSource={tableData}
            columns={tableTitle}
            pagination={paginationProps}
            loading={tableDataCount === 0}
            bordered={true}
            rowKey={item => item.id}
        />
    ), [tableData, t])

    return (
        <>
            {contextHolder}
            <Button
                children={t("unit.addUnit")}
                style={{ marginBottom: "var(--content-margin)" }}
                type="primary"
                onClick={addClick}
                icon={<PlusOutlined />}
            />
            {table}
            <EditModalForm
                openModal={openModal}
                closeModal={closeModal}
                onOk={onOk}
                editSate={editSate}
            />
        </>
    )
}

export default Unit