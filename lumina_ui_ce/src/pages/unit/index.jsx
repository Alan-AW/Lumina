import { useState, useEffect, useMemo } from 'react'
import { Table, notification, Button, message, Popconfirm } from 'antd'
import { PlusOutlined, DeleteOutlined, QuestionCircleOutlined, EditOutlined, SettingOutlined } from '@ant-design/icons'
import { getUnit, postUnit, patchUnit, deleteUnit } from 'network/api'
import EditModalForm from 'components/unit/editModal'
import SettingModal from 'components/unit/settingModal'
import { FADEIN, pageSize } from 'contants'
import { openNotification } from 'utils'
import { useTranslation } from "react-i18next";


function Unit() {
    const [api, contextHolder] = notification.useNotification()
    const [params, setparams] = useState({ page: 1 })
    const [tableData, settableData] = useState([])
    const [tableDataCount, settableDataCount] = useState(0)
    // 编辑弹窗
    const [openModal, setopenModal] = useState(false)
    const [editSate, seteditSate] = useState(false)
    const [editRow, setEditRow] = useState(null)
    // 设置弹窗
    const [openSettingModal, setOpenSettingModal] = useState(false)
    const [unitId, setUnitId] = useState(null)
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
                    <Button
                        type='primary'
                        shape='circle'
                        icon={<SettingOutlined />}
                        onClick={() => setClick(row)}
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
                settableData(tableData.filter(item => item.id !== parseInt(res.data)))
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
        setEditRow(row)
        seteditSate(true)
        setopenModal(true)
    }

    // 点击设置
    const setClick = row => {
        setUnitId(row.id)
        setOpenSettingModal(true)
    }

    const unitSettingModal = useMemo(() => (
        <SettingModal
            id={unitId}
            openModal={openSettingModal}
            closeModal={() => setOpenSettingModal(false)}
        />
    ), [unitId, openSettingModal])

    // 添加
    const postData = data => {
        postUnit(data).then(res => {
            if (res.status) {
                settableData([res.data, ...tableData])
                settableDataCount(tableDataCount + 1)
                setopenModal(false)
                message.success(res.info)
            } else {
                openNotification(api, 'error', res.errs)
            }
        })
    }

    // 更新
    const patchData = (id, data) => {
        patchUnit(id, data).then(res => {
            if (res.status) {
                settableData(tableData.map(item => {
                    if (item.id === res.data.id) {
                        item = res.data
                    }
                    return item
                }))
                setopenModal(false)
                message.success(res.info)
            } else {
                openNotification(api, 'error', res.errs)
            }
        })
    }

    // 提交
    const onOk = value => {
        // 提出数据
        const { id, ...data } = value
        if (editSate) {
            patchData(id, data)
        } else {
            postData(data)
        }
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

    const editModal = useMemo(() => (
        <EditModalForm
            openModal={openModal}
            closeModal={() => setopenModal(false)}
            initValue={editRow}
            onOk={onOk}
            editSate={editSate}
        />
    ), [openModal, editRow])

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
            {editModal}
            {unitSettingModal}
        </>
    )
}

export default Unit