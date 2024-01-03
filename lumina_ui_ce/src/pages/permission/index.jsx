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

function Permission(props) {
  const [api, contextHolder] = notification.useNotification()
  const [tableData, settableData] = useState([])
  const [openModal, setopenModal] = useState(false)
  const [editSate, seteditSate] = useState(false)
  const [editRow, setEditRow] = useState(null)
  const tableTitle = [
    {
      title: '序号',
      align: 'center',
      render: (row, value, index) => <b>{index + 1}</b>
    },
    {
      title: "ID",
      align: 'center',
      dataIndex: 'id'
    },
    {
      title: '权限名称',
      dataIndex: 'title',
      align: 'center',
    },
    {
      title: '权限地址',
      dataIndex: 'url',
      align: 'center',
    },
    {
      title: '菜单权限',
      align: 'center',
      render: row => <Switch
        checkedChildren="开启"
        unCheckedChildren="关闭"
        checked={row.isNaviLink}
        onChange={e => changeNaviLink(row, e)}
      />
    },
    {
      title: "创建时间",
      align: 'center',
      dataIndex: 'create_time'
    },
    {
      title: "更新时间",
      align: 'center',
      dataIndex: 'update_time'
    },
    {
      title: '操作',
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
            title="删除权限"
            description="确定要删除该权限吗?"
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
      title={() => '权限管理'}
      className={FADEIN}
      dataSource={tableData}
      columns={tableTitle}
      loading={tableData.length === 0}
      bordered={true}
      rowKey={item => item.id}
    />
  ), [tableData])

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
        children="添加权限"
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