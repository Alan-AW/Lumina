import { useState, useEffect, useMemo } from 'react'
import { Table, notification, Button, message, Popconfirm } from 'antd'
import { PlusOutlined, DeleteOutlined, QuestionCircleOutlined, EditOutlined } from '@ant-design/icons'
import { getUnit, postUnit, patchUnit, deleteUnit } from 'network/api'
import EditModalForm from 'components/unit/editModal'
import { FADEIN, pageSize } from 'contants'
import { openNotification } from 'utils'


function Unit() {
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
      title: '机器编号',
      align: 'center',
      dataIndex: 'serial_number'
    },
    {
      title: '房间编号',
      align: 'center',
      dataIndex: 'room_number'
    },
    {
      title: '机器状态',
      align: 'center',
      dataIndex: 'status_label'
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
            title="删除机器"
            description="确定要删除这个机器吗?"
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
    const { id, serial_number, status, room } = row
    seteditSate(true)
    sessionStorage.setItem('editUnitId', id)
    sessionStorage.setItem('editUnitData', JSON.stringify({ serial_number, status, room }))
    setopenModal(true)
  }

  // 提交
  const onOk = value => {
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
      serial_number: '', status: '', room: ''
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
      title={() => "机器管理"}
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
    <>
      {contextHolder}
      <Button
        children="添加机器"
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