/**
 * 公司管理
 */
import { useState, useEffect, useMemo } from 'react'
import { Modal, Table, notification, Button, message, Image } from 'antd'
import { PlusOutlined, DeleteOutlined, QuestionCircleOutlined, EditOutlined, UploadOutlined } from '@ant-design/icons'
import baseUrl from 'network/baseUrl'
import { getCompany, postCompany, patchCompany, deleteCompany, uploadCompanyLogoApi } from 'network/api'
import { FADEIN, pageSize } from 'contants'
import { openNotification } from 'utils'
import CompanyEditModal from 'components/company'
import UploadImg from 'components/upload'
import PermissionBtn from 'components/permissionButton/permissionBtn'
import PermissionPopconfirm from 'components/permissionButton/permissionPopconfirm'
import { useTranslation } from "react-i18next";

function Company(props) {
    const [api, contextHolder] = notification.useNotification()
    const [params, setparams] = useState({ page: 1 })
    const [tableData, settableData] = useState([])
    const [tableDataCount, settableDataCount] = useState(0)
    const [openModal, setopenModal] = useState(false)
    const [openUploadModal, setOpenUploadModal] = useState(false)
    const [editSate, seteditSate] = useState(false)
    const [editRow, setEditRow] = useState(null)
    const { t, i18n } = useTranslation()

    const tableTitle = [
        {
            title: t("company.tableTitle.index"),
            align: 'center',
            render: (row, value, index) => <b>{index + 1}</b>
        },
        {
            title: t("company.tableTitle.name"),
            align: 'center',
            dataIndex: 'name'
        },
        {
            title: t("company.tableTitle.address"),
            align: 'center',
            dataIndex: 'address'
        },
        {
            title: t("company.tableTitle.legal_rep"),
            align: 'center',
            dataIndex: 'legal_rep'
        },
        {
            title: t("company.tableTitle.tel"),
            align: 'center',
            dataIndex: 'tel'
        },
        {
            title: t("company.tableTitle.email"),
            align: 'center',
            dataIndex: 'email'
        },
        {
            title: t("company.tableTitle.logo"),
            align: 'center',
            dataIndex: 'logo',
            render: logo => <Image src={`${baseUrl()}${logo}`} height={50} />
        },
        {
            title: t("company.tableTitle.create_time"),
            align: 'center',
            dataIndex: 'create_time'
        },
        {
            title: t("company.tableTitle.update_time"),
            align: 'center',
            dataIndex: 'update_time'
        },
        {
            title: t("company.tableTitle.action"),
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
                        icon={<UploadOutlined />}
                        onClick={() => uploadLogo(row)}
                    />
                    <PermissionPopconfirm
                        title={t("company.DelCompany")}
                        description={t("company.DelCompanyDES")}
                        okText="Yes"
                        okType='danger'
                        cancelText="No"
                        allowRoles={['Administrator']}
                        callback={() => deleteRow(row)}
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                    >
                        <Button
                            shape='circle'
                            danger
                            icon={<DeleteOutlined />}
                        />
                    </PermissionPopconfirm>
                </div>
            )
        }
    ]

    useEffect(() => {
        getData()
    }, [params])

    // 查询数据
    const getData = () => {
        getCompany(params).then(res => {
            if (res.status) {
                settableData(res.data.results)
                settableDataCount(res.data.count)
            }
        })
    }

    // 删除回调
    const deleteRow = row => {
        deleteCompany(row.id).then(res => {
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
        setEditRow(null)
        seteditSate(false)
    }

    // 点击编辑
    const editClick = row => {
        setEditRow(row)
        seteditSate(true)
        setopenModal(true)
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
            title={() => t('company.title')}
            className={FADEIN}
            dataSource={tableData}
            columns={tableTitle}
            pagination={paginationProps}
            loading={tableDataCount === 0}
            bordered={true}
            rowKey={item => item.id}
        />
    ), [tableData, i18n.language])

    // 关窗
    const closeModal = () => {
        setopenModal(false)
    }

    // 提交表单
    const onOk = value => {
        if (editSate) {
            // 编辑
            const { id } = value
            patchCompany(id, value).then(res => {
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
        } else {
            // 添加
            postCompany(value).then(res => {
                if (res.status) {
                    settableData([res.data, ...tableData])
                    settableDataCount(tableDataCount + 1)
                    message.success(res.info)
                    setopenModal(false)
                } else {
                    openNotification(api, 'error', res.errs)
                }
            })
        }
    }

    // 编辑表单弹窗
    const editModal = useMemo(() => (
        <CompanyEditModal
            openModal={openModal}
            closeModal={closeModal}
            onOk={onOk}
            initValue={editRow}
            editSate={editSate}
        />
    ), [editRow, editSate, openModal])

    // 点击上传logo
    const uploadLogo = row => {
        setEditRow(row)
        setOpenUploadModal(true)
    }

    // 上传组件回调上传方法
    const uploadCompanyLogo = data => {
        const { id } = editRow
        uploadCompanyLogoApi(id, data).then(res => {
            if (res.status) {
                settableData(tableData.map(item => {
                    if (item.id === res.data.id) {
                        item.logo = res.data.logo
                    }
                    return item
                }))
                setOpenUploadModal(false)
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

    // 上传logo弹窗
    const uploadModal = useMemo(() => (
        <Modal
            title={t('company.uploadModalTitle')}
            width="260px"
            style={{ textAlign: 'center' }}
            open={openUploadModal}
            onCancel={() => setOpenUploadModal(false)}
            footer=''
        >
            <UploadImg
                api={uploadCompanyLogo}
                maxFile={1}
                disabled={false}
                useCrop={false}
            />
        </Modal>
    ), [openUploadModal])

    return (
        <>
            {contextHolder}
            <PermissionBtn
                callback={addClick}
                allowRoles={['Administrator']}
                children={t('company.AddCompany')}
                style={{ marginBottom: "var(--content-margin)" }}
                type='primary'
                icon={<PlusOutlined />}
            />
            {table}
            {uploadModal}
            {editModal}
        </>
    )
}

export default Company
