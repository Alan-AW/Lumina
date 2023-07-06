import { useState, useEffect, useMemo } from 'react'
import { Table, notification, Button, message, Popconfirm } from 'antd'
import { PlusOutlined, DeleteOutlined, QuestionCircleOutlined, EditOutlined } from '@ant-design/icons'
import { getRooms, postRooms, patchRooms, deleteRooms } from 'network/api'
import EditModalForm from 'components/room/editModal'
import { FADEIN, pageSize } from 'contants'
import { openNotification } from 'utils'

function Room() {
  const [api, contextHolder] = notification.useNotification()
  const [params, setparams] = useState({ page: 1 })
  const [tableData, settableData] = useState([])
  const [tableDataCount, settableDataCount] = useState(0)
  const [openModal, setopenModal] = useState(false)
  const [editSate, seteditSate] = useState(false)
  const tableTitle = [
    {
      title: '序号',
      align: 'center',
      render: (row, value, index) => <b>{index + 1}</b>
    },
    {
      title: 'id',
      align: 'center',
      dataIndex: 'id'
    },
    {
      title: '房间编号',
      align: 'center',
      dataIndex: 'serial_number'
    },
    {
      title: '所属地区',
      align: 'center',
      dataIndex: 'zone_name'
    },
    {
      title: '创建时间',
      align: 'center',
      dataIndex: 'create_time'
    },
    {
      title: '更新时间',
      align: 'center',
      dataIndex: 'update_time'
    },
    {
      title: '操作',
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
            title="删除房间"
            description="确定要删除这个房间吗?"
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
    getRooms(params).then(res => {
      if (res.status) {
        settableData(res.data.results)
        settableDataCount(res.data.count)
      }
    })
  }

  // 删除房间回调
  const deleteRow = row => {
    deleteRooms(row.id).then(res => {
      if (res.status) {
        settableData(tableData.filter(item => item.id !== res.data))
        message.success(res.info)
      } else {
        message.error(res.errs)
      }
    })
  }

  // 点击添加房间
  const addClick = () => {
    setopenModal(true)
    seteditSate(false)
  }

  // 点击编辑房间
  const editClick = row => {
    const { id, serial_number, zone } = row
    seteditSate(true)
    sessionStorage.setItem('editRowId', id)
    sessionStorage.setItem('editRowData', JSON.stringify({ serial_number, zone }))
    setopenModal(true)
  }

  // 提交
  const onOk = value => {
    if (editSate) {
      const id = sessionStorage.getItem('editRowId')
      patchRooms(id, value).then(res => {
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
      postRooms(value).then(res => {
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
    sessionStorage.setItem('editRowData', JSON.stringify({ serial_number: '', zone: null }))
    setopenModal(false)
  }

  // 分页
  const paginationProps = {
    total: tableDataCount,
    pageSize,
    onChange: page => setparams({ ...params, page })
  }

  // 表格
  const table = useMemo(() => (
    <Table
      title={() => "房间管理"}
      className={FADEIN}
      dataSource={tableData}
      columns={tableTitle}
      pagination={paginationProps}
      loading={tableDataCount === 0}
      bordered={true}
      rowKey={item => item.id}
    />
  ), [tableData])

  return (
    <>{contextHolder}
      <Button
        children="添加房间"
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

export default Room