import { useState, useEffect, useMemo } from 'react'
import { Table, notification, Button, message, Popconfirm } from 'antd'
import { PlusOutlined, DeleteOutlined, QuestionCircleOutlined, EditOutlined } from '@ant-design/icons'
import { getRooms, postRooms, patchRooms, deleteRooms } from 'network/api'
import EditModalForm from 'components/room/editModal'
import { FADEIN, pageSize } from 'contants'
import { openNotification } from 'utils'
import { useTranslation } from "react-i18next";

function Room() {
  const [api, contextHolder] = notification.useNotification()
  const [params, setparams] = useState({ page: 1 })
  const [tableData, settableData] = useState([])
  const [tableDataCount, settableDataCount] = useState(0)
  const [openModal, setopenModal] = useState(false)
  const [editSate, seteditSate] = useState(false)
  const [editRow, seteditRow] = useState()
  const { t } = useTranslation()
  const tableTitle = [
    {
      title: t("room.tableTitle.index"),
      align: 'center',
      render: (row, value, index) => <b>{index + 1}</b>
    },
    {
      title: t("room.tableTitle.company_name"),
      align: 'center',
      dataIndex: 'company_name'
    },
    {
      title: t("room.tableTitle.serial_number"),
      align: 'center',
      dataIndex: 'serial_number'
    },
    {
      title: t("room.tableTitle.create_time"),
      align: 'center',
      dataIndex: 'create_time'
    },
    {
      title: t("room.tableTitle.update_time"),
      align: 'center',
      dataIndex: 'update_time'
    },
    {
      title: t("room.tableTitle.action"),
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
            title={t("room.deltitle")}
            description={t("room.description")}
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
    seteditSate(false)
    seteditRow()
    setopenModal(true)
    seteditSate(false)
  }

  // 点击编辑房间
  const editClick = row => {
    seteditSate(true)
    seteditRow(row)
    setopenModal(true)
  }

  // 提交
  const onOk = value => {
    if (editSate) {
      const { id } = editRow
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
      title={() => t("room.title")}
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
    <>{contextHolder}
      <Button
        children={t("room.addRoom")}
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
        initValue={editRow}
      />
    </>
  )
}

export default Room
