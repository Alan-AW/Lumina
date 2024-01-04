import { useState, useEffect, useMemo } from 'react'
import { Table, Button, message, Switch, Popconfirm, notification } from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons'
import {
  patchPermission, deletePermission, getPermission, postPermission
} from 'network/api'
import { FADEIN } from 'contants'
import { openNotification } from 'utils'
import EditPermissionModal from 'components/permissions'
import { useTranslation } from "react-i18next";

function Permission(props) {
  const [api, contextHolder] = notification.useNotification()
  const [tableData, settableData] = useState([])
  const [openModal, setopenModal] = useState(false)
  const [editSate, seteditSate] = useState(false)
  const [editRow, setEditRow] = useState(null)
  const { t, i18n } = useTranslation()
  const tableTitle = [
    {
      title: t("Permission.tableTitle.index"),
      align: 'center',
      render: (row, value, index) => <b>{index + 1}</b>
    },
    {
      title: t("Permission.tableTitle.title"),
      dataIndex: 'title',
      align: 'center',
    },
    {
      title: t("Permission.tableTitle.url"),
      dataIndex: 'url',
      align: 'center',
    },
    {
      title: t("Permission.tableTitle.MenuPermissions"),
      align: 'center',
      render: row => <Switch
        checkedChildren={t("Permission.OK")}
        unCheckedChildren={t("Permission.OFF")}
        checked={row.isNaviLink}
        onChange={e => changeNaviLink(row, e)}
      />
    },
    {
      title: t("Permission.tableTitle.create_time"),
      align: 'center',
      dataIndex: 'create_time'
    },
    {
      title: t("Permission.tableTitle.update_time"),
      align: 'center',
      dataIndex: 'update_time'
    },
    {
      title: t("Permission.tableTitle.action"),
      align: 'center',
      render: row => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
          <Button
            shape="circle"
            type="primary"
            icon={<EditOutlined />}
            onClick={() => editClick(row)}
          />
          <Popconfirm
            title={t("Permission.DelPermissions")}
            description={t("Permission.DelPermissionsDES")}
            okText="Yes"
            okType='danger'
            cancelText="No"
            onConfirm={() => deleteRow(row)}
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          >
            <Button
              danger
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </div>
      )
    }
  ]
  useEffect(() => {
    getData()
  }, [])

  // 查询数据
  const getData = () => {
    getPermission().then(res => {
      if (res.status) {
        settableData(res.data)
      }
    }).catch(err => console.log(err))
  }

  // 点击修改菜单权限
  const changeNaviLink = (row, value) => {
    const data = { ...row, isNaviLink: value }
    patchData(data)
  }

  const postData = data => {
    postPermission(data).then(res => {
      if (res.status) {
        getData()
        setopenModal(false)
      } else {
        openNotification(api, 'error', res.errs)
      }
    })
  }

  const patchData = data => {
    patchPermission(data).then(res => {
      if (res.status) {
        getData()
        setopenModal(false)
      } else {
        openNotification(api, 'error', res.errs)
      }
    })
  }

  const onOkModal = value => {
    if (editSate) {
      patchData(value)
    } else {
      postData(value)
    }
  }

  // 点击添加
  const addClick = () => {
    setEditRow(null)
    seteditSate(false)
    setopenModal(true)
  }

  // 点击编辑
  const editClick = row => {
    setEditRow(row)
    seteditSate(true)
    setopenModal(true)
  }

  // 点击删除
  const deleteRow = row => {
    deletePermission(row.id).then(res => {
      if (res.status) {
        getData()
        message.success(res.info)
      } else {
        message.error(res.errs)
      }
    })
  }

  const table = useMemo(() => (
    <Table
      title={() => t('Permission.title')}
      className={FADEIN}
      dataSource={tableData}
      columns={tableTitle}
      loading={tableData.length === 0}
      bordered={true}
      rowKey={item => item.id}
    />
  ), [tableData, i18n.language])

  const edit = useMemo(() => (
    <EditPermissionModal
      openModal={openModal}
      closeModal={() => setopenModal(false)}
      onOk={onOkModal}
      initValue={editRow}
      editSate={editSate}
    />
  ), [editSate, openModal, editRow])

  return (
    <>
      {contextHolder}
      <Button
        children={t('Permission.AddPermissions')}
        style={{ marginBottom: "var(--content-margin)" }}
        type="primary"
        onClick={addClick}
        icon={<PlusOutlined />}
      />
      {table}
      {edit}
    </>
  )
}

export default Permission
