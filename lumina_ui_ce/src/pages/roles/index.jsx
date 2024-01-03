/**
 * 角色管理页面
 */
import { useState, useEffect, useMemo } from 'react'
import { Table, Button, message, Popconfirm, notification } from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons'
import {
  getRoles, patchRoles, deleteRoles, postRoles
} from 'network/api'
import { FADEIN, pageSize } from 'contants'
import { openNotification } from 'utils'
import RolesEditModal from 'components/roles'

function Roles(props) {
  const [api, contextHolder] = notification.useNotification()
  const [params, setparams] = useState({ page: 1 })
  const [tableData, settableData] = useState([])
  const [tableDataCount, settableDataCount] = useState(0)
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
      title: '角色名称',
      dataIndex: 'title',
      align: 'center',
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
            title="删除角色"
            description="确定要删除该角色吗?"
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
  }, [params])

  // 查询数据
  const getData = () => {
    getRoles(params).then(res => {
      if (res.status) {
        settableData(res.data.results)
        settableDataCount(res.data.count)
      }
    }).catch(err => console.log(err))
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
    deleteRoles(row.id).then(res => {
      if (res.status) {
        settableData(tableData.filter(item => item.id !== res.data))
        settableDataCount(tableDataCount - 1)
        message.success(res.info)
      } else {
        message.error(res.errs)
      }
    })
  }

  // 提交
  const onOk = value => {
    if (editSate) {
      patchRoles(value.id, value).then(res => {
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
          message.error(res.errs)
        }
      })
    } else {
      postRoles(value).then(res => {
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
  }

  // 分页
  const paginationProps = {
    total: tableDataCount,
    pageSize,
    onChange: page => setparams({ page })
  }

  const table = useMemo(() => (
    <Table
      title={() => '角色管理'}
      className={FADEIN}
      dataSource={tableData}
      columns={tableTitle}
      pagination={paginationProps}
      loading={tableDataCount === 0}
      bordered={true}
      rowKey={item => item.id}
    />
  ), [tableData])

  const closeModal = () => {
    setopenModal(false)
  }

  const editModal = useMemo(() => (
    <RolesEditModal
      openModal={openModal}
      closeModal={closeModal}
      onOk={onOk}
      initValue={editRow}
      editSate={editSate}
    />
  ), [editRow, editSate, openModal])

  return (
    <>
      {contextHolder}
      <Button
        children="添加角色"
        style={{ marginBottom: "var(--content-margin)" }}
        type="primary"
        onClick={addClick}
        icon={<PlusOutlined />}
      />
      {table}
      {editModal}
    </>
  )
}

export default Roles